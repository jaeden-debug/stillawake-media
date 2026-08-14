import { NextResponse } from "next/server";
import { safeFetch, assertSafeUrl, UnsafeUrlError } from "@/lib/llms-txt/safe-fetch";
import {
  analyzeEntity,
  buildFindings,
  extractDescription,
  extractTitle,
  renderLlmsTxt,
  type PageInfo,
} from "@/lib/llms-txt/analyze";

/**
 * Public llms.txt analyser.
 *
 * Node runtime, not edge: the SSRF guard resolves DNS itself so it can
 * validate the addresses a hostname points at before connecting, and
 * node:dns is unavailable on edge. Losing that check to gain edge latency
 * would be a bad trade on an endpoint that fetches arbitrary URLs.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Pages fetched beyond the homepage. Enough to judge a site, cheap enough to abuse-proof. */
const MAX_PAGES = 12;

/** Crude per-instance throttle. Not a substitute for a real limiter, but it
 *  stops one client turning this into a crawler on a single warm lambda. */
const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 500) recent.clear(); // bound memory; correctness is not at stake
  return hits.length > MAX_PER_WINDOW;
}

/** Pulls <loc> values out of a sitemap, following one level of sitemap index. */
async function urlsFromSitemap(origin: string): Promise<string[]> {
  const res = await safeFetch(`${origin}/sitemap.xml`);
  if (!res || res.status !== 200) return [];
  const locs = [...res.body.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
  if (!/<sitemapindex/i.test(res.body)) return locs;

  const out: string[] = [];
  for (const child of locs.slice(0, 2)) {
    const sub = await safeFetch(child);
    if (!sub || sub.status !== 200) continue;
    out.push(...[...sub.body.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]));
  }
  return out;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many checks from this address. Try again in a minute." },
      { status: 429 },
    );
  }

  let input: string;
  try {
    const body = (await request.json()) as { url?: unknown };
    if (typeof body.url !== "string" || body.url.length > 300) {
      return NextResponse.json({ error: "Provide a website URL." }, { status: 400 });
    }
    input = body.url.trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bare domains are what people actually type.
  const candidate = /^https?:\/\//i.test(input) ? input : `https://${input}`;

  let origin: string;
  let domain: string;
  try {
    const url = await assertSafeUrl(candidate);
    origin = url.origin;
    domain = url.hostname;
  } catch (e) {
    const message =
      e instanceof UnsafeUrlError ? e.message : "That URL could not be checked.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const home = await safeFetch(origin);
  if (!home || home.status >= 400) {
    return NextResponse.json(
      { error: "That site did not respond. Check the address and try again." },
      { status: 502 },
    );
  }

  /**
   * Re-derive the origin from where the homepage actually landed.
   *
   * Typing `anthropic.com` redirects to `www.anthropic.com`, and the sitemap
   * then lists `https://www.anthropic.com/...`. Filtering those against the
   * origin the user typed discards every one of them, so the tool analysed a
   * single page and reported a low score for a site that had done nothing
   * wrong. Apex-to-www is one of the most common configurations on the web,
   * so this was failing on a large share of real input.
   */
  try {
    const landed = new URL(home.url);
    origin = landed.origin;
    domain = landed.hostname;
  } catch {
    // Keep the validated origin if the resolved URL is somehow unparseable.
  }

  const existing = await safeFetch(`${origin}/llms.txt`);
  const hasExistingLlmsTxt =
    !!existing && existing.status === 200 && existing.body.trim().length > 0;

  // Sitemap order is the site's own statement of what matters; fall back to
  // homepage links when there is no sitemap.
  let candidates = await urlsFromSitemap(origin);
  if (candidates.length === 0) {
    candidates = [...home.body.matchAll(/href=["'](\/[^"'#?]*)["']/gi)]
      .map((m) => `${origin}${m[1]}`)
      .filter((u) => !/\.(png|jpe?g|svg|webp|css|js|ico|pdf|xml)$/i.test(u));
  }

  const seen = new Set<string>([origin, `${origin}/`]);
  const targets = candidates
    .filter((u) => u.startsWith(origin))
    .filter((u) => (seen.has(u) ? false : (seen.add(u), true)))
    .slice(0, MAX_PAGES);

  const pages: PageInfo[] = [];
  let combined = home.body;
  for (const target of targets) {
    const res = await safeFetch(target);
    if (!res || res.status !== 200 || !res.contentType.includes("html")) continue;
    combined += res.body;
    const title = extractTitle(res.body);
    if (!title) continue;
    pages.push({ url: target, title, description: extractDescription(res.body) });
  }

  const facts = analyzeEntity(home.body, combined, { hasExistingLlmsTxt });
  const { findings, score } = buildFindings(facts);

  return NextResponse.json({
    domain,
    score,
    findings,
    facts,
    pagesAnalyzed: pages.length + 1,
    llmsTxt: renderLlmsTxt(domain, facts, pages),
  });
}
