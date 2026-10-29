import { NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { safeFetch, assertSafeUrl, UnsafeUrlError } from "@/lib/llms-txt/safe-fetch";
import {
  analyzePage,
  buildChecks,
  parseRobotsTxt,
  summarize,
  type SiteFacts,
} from "@/lib/seo-audit/analyze";

/**
 * Public single-page SEO audit.
 *
 * Node runtime for the same reason as the llms.txt analyser: the SSRF guard
 * resolves DNS itself and validates every redirect hop, and node:dns is not
 * available on edge. The request budget is fixed and small — the page, its
 * robots.txt and at most two sitemap files — so the endpoint can't be turned
 * into a crawler.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const USER_AGENT = "StillAwakeSEOAuditBot/1.0 (+https://stillawakemedia.com/tools/seo-audit)";

/** Crude per-instance throttle, same shape as the llms.txt route. */
const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 6;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 500) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

const locs = (xml: string) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1].trim());

async function readSitemap(origin: string, declared: string[], pageUrl: string): Promise<SiteFacts["sitemap"]> {
  // Only sitemaps on the audited host are followed; robots.txt may point
  // anywhere, and we don't fetch third-party hosts on a visitor's behalf.
  const candidates = [...declared, `${origin}/sitemap.xml`].filter((u) => {
    try {
      return new URL(u).origin === origin;
    } catch {
      return false;
    }
  });
  const first = candidates[0];
  if (!first) return { url: null, status: null, isXml: false, listsPage: null };

  const res = await safeFetch(first, { userAgent: USER_AGENT });
  if (!res) return { url: first, status: null, isXml: false, listsPage: null };
  const isXml = /<(urlset|sitemapindex)\b/i.test(res.body);
  if (res.status !== 200 || !isXml) return { url: first, status: res.status, isXml, listsPage: null };

  const wanted = pageUrl.replace(/\/$/, "");
  const has = (list: string[]) => list.some((u) => u.replace(/\/$/, "") === wanted);

  if (!/<sitemapindex\b/i.test(res.body)) return { url: first, status: 200, isXml, listsPage: has(locs(res.body)) };

  // Sitemap index: look in one child, so the request budget stays fixed.
  const child = locs(res.body).find((u) => u.startsWith(origin));
  if (!child) return { url: first, status: 200, isXml, listsPage: null };
  const sub = await safeFetch(child, { userAgent: USER_AGENT });
  if (!sub || sub.status !== 200) return { url: first, status: 200, isXml, listsPage: null };
  return { url: first, status: 200, isXml, listsPage: has(locs(sub.body)) ? true : null };
}

export async function POST(request: Request) {
  let isBot: boolean;
  try {
    ({ isBot } = await checkBotId());
  } catch (e) {
    // BotID only works on Vercel. There it fails closed, like the contact
    // form; on a local `next start` it's skipped so the tool can be tested.
    if (process.env.VERCEL) {
      console.error("[seo-audit] bot check failed", e);
      return NextResponse.json({ error: "The check is temporarily unavailable. Try again shortly." }, { status: 503 });
    }
    isBot = false;
  }
  if (isBot) {
    return NextResponse.json({ error: "Automated requests aren't accepted." }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many checks from this address. Try again in a minute." }, { status: 429 });
  }

  let input: string;
  try {
    const body = (await request.json()) as { url?: unknown };
    if (typeof body.url !== "string" || body.url.length > 500) {
      return NextResponse.json({ error: "Enter a page URL." }, { status: 400 });
    }
    input = body.url.trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const candidate = /^https?:\/\//i.test(input) ? input : `https://${input}`;
  try {
    await assertSafeUrl(candidate);
  } catch (e) {
    const message = e instanceof UnsafeUrlError ? e.message : "That URL could not be checked.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const page = await safeFetch(candidate, { userAgent: USER_AGENT });
  if (!page) {
    return NextResponse.json(
      { error: "That page didn't respond, or redirected too many times. Check the address and try again." },
      { status: 502 },
    );
  }

  const origin = new URL(page.url).origin;
  const robotsRes = await safeFetch(`${origin}/robots.txt`, { userAgent: USER_AGENT });
  const robotsParsed =
    robotsRes && robotsRes.status === 200 && !/<html\b/i.test(robotsRes.body) ? parseRobotsTxt(robotsRes.body) : null;

  const site: SiteFacts = {
    robots: { status: robotsRes?.status ?? null, parsed: robotsParsed },
    sitemap: await readSitemap(origin, robotsParsed?.sitemaps ?? [], page.url),
  };

  const facts = analyzePage({
    requestedUrl: candidate,
    finalUrl: page.url,
    status: page.status,
    redirects: page.redirects,
    contentType: page.contentType,
    xRobotsTag: page.xRobotsTag,
    html: page.body,
  });
  const checks = buildChecks(facts, site);

  return NextResponse.json(
    {
      url: page.url,
      checkedAt: new Date().toISOString(),
      summary: summarize(checks),
      checks,
      headings: facts.headings.slice(0, 40),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
