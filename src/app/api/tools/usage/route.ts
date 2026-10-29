import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { looksLikeBot, parseUsagePing } from "@/lib/tool-usage";

/**
 * Consent-free usage counter for the free tools. See src/lib/tool-usage.ts.
 *
 * Always answers 204, whether the ping was counted, rejected or rate-limited,
 * so the response tells a caller nothing and the browser never shows an error.
 * Storage is best-effort: if the database is unreachable the tool still works.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 30;
const recent = new Map<string, number[]>();

/** In memory only, per instance. The IP is never written anywhere. */
function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 1000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

/** Only count pings sent from our own pages. */
function fromOurSite(request: Request): boolean {
  const origin = request.headers.get("origin") ?? request.headers.get("referer") ?? "";
  try {
    const host = new URL(origin).hostname;
    return host === "stillawakemedia.com" || host === "www.stillawakemedia.com" || host === "localhost" || host.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

let client: SupabaseClient | null = null;
function db(): SupabaseClient | null {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

const done = () => new Response(null, { status: 204 });

export async function POST(request: Request) {
  if (!fromOurSite(request) || looksLikeBot(request.headers.get("user-agent"))) return done();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return done();

  let body: unknown;
  try {
    body = JSON.parse(await request.text());
  } catch {
    return done();
  }
  const ping = parseUsagePing(body);
  const sb = db();
  if (!ping || !sb) return done();

  const { error } = await sb.rpc("increment_tool_usage", { p_tool: ping.tool, p_event: ping.event, p_detail: ping.detail });
  if (error) console.warn(`[tool-usage] could not count ${ping.tool}/${ping.event}: ${error.message}`);
  return done();
}
