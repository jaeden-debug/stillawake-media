/**
 * Consent-free usage counts for the free tools.
 *
 * GA4 only loads after a visitor accepts analytics, so it undercounts tool
 * use by everyone who declines or ignores the banner. These counters fill
 * that gap without needing consent, because they record nothing about the
 * visitor: the server adds 1 to a daily total for (tool, event, detail) in
 * `tool_usage_daily`. No IP, user agent, URL or anything typed is stored.
 *
 * The allow-list is the whole security model. A request can only increment a
 * counter that exists here, with a detail drawn from a fixed set, so the
 * endpoint can't be used to write arbitrary text into the database.
 */

const SCORE_BANDS = ["", "0_39", "40_69", "70_89", "90_100"] as const;
const ESTIMATE_BANDS = ["", "under_5k", "5k_10k", "10k_25k", "25k_50k", "over_50k"] as const;
const SCHEMA_TYPES = ["Organization", "LocalBusiness", "Article", "Product", "BreadcrumbList", "FAQPage", "Person"] as const;

export const USAGE_EVENTS = {
  schema_generator: { events: ["type_selected", "edited", "copied"], details: SCHEMA_TYPES },
  llms_txt: { events: ["run", "run_failed", "copied", "downloaded"], details: SCORE_BANDS },
  calculator: { events: ["started", "completed", "studio_from_estimate"], details: ESTIMATE_BANDS },
} as const;

export type UsageTool = keyof typeof USAGE_EVENTS;
export type UsagePing = { tool: UsageTool; event: string; detail: string };

/** Returns a clean ping, or null if anything is outside the allow-list. */
export function parseUsagePing(body: unknown): UsagePing | null {
  if (!body || typeof body !== "object") return null;
  const { tool, event, detail = "" } = body as Record<string, unknown>;
  if (typeof tool !== "string" || !(tool in USAGE_EVENTS)) return null;
  const spec = USAGE_EVENTS[tool as UsageTool];
  if (typeof event !== "string" || !(spec.events as readonly string[]).includes(event)) return null;
  if (typeof detail !== "string" || !(spec.details as readonly string[]).includes(detail)) return null;
  return { tool: tool as UsageTool, event, detail };
}

/** Rough crawler filter. Bots that execute JS and click are rare; this catches the honest ones. */
export function looksLikeBot(userAgent: string | null): boolean {
  return !userAgent || /bot|crawl|spider|slurp|headless|lighthouse|preview|python|curl|wget/i.test(userAgent);
}

/**
 * Browser side. Fire-and-forget: a failed ping must never affect the tool.
 * sendBeacon survives the page being closed right after a copy.
 */
export function pingUsage(tool: UsageTool, event: string, detail = "") {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({ tool, event, detail });
    if (navigator.sendBeacon?.("/api/tools/usage", new Blob([body], { type: "application/json" }))) return;
    void fetch("/api/tools/usage", { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } }).catch(() => {});
  } catch {
    // Counting is best-effort.
  }
}
