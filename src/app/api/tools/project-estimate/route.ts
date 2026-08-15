import { NextResponse } from "next/server";

import { estimate, PricingInputError } from "@/lib/pricing/engine";
import { CAVEAT_LABELS, formatCad, labelForKey, type Locale } from "@/lib/pricing/labels";
import { isComplete, mapAnswers, sanitizeAnswers, studioTypeFor } from "@/lib/pricing/public-flow";
import { FOUNDATIONS } from "@/lib/pricing/model";

/**
 * Public project estimator.
 *
 * THE SECURITY MODEL, in one paragraph: the browser posts answer keys from the
 * published question flow and nothing else. It cannot name a capability, a
 * complexity tier, a foundation or a price, because none of those words exist
 * in the request format. `sanitizeAnswers` drops anything the flow does not
 * declare, `mapAnswers` derives the model input, and the engine prices it
 * server-side. There is no request a client can craft that produces a discount,
 * because there is no field that could carry one.
 *
 * WHAT COMES BACK is deliberately less than what the engine computed: a rounded
 * low and high, the drivers, what the build includes, and approved recurring
 * prices. Never `expected`, never the per-capability bands, never a multiplier.
 * Those live on the internal estimator, which is behind an admin session.
 *
 * Nothing is stored. Someone pricing a hypothetical is not a lead, and keeping
 * their answers would be collecting data we have no use for.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Enough for a real person and their second thoughts, not enough to scrape with. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;
const recent = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 1000) recent.clear(); // bound memory; correctness is not at stake
  return hits.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload = (body ?? {}) as Record<string, unknown>;
  const locale: Locale = payload.locale === "fr" ? "fr" : "en";
  const answers = sanitizeAnswers(payload.answers);

  if (!isComplete(answers)) {
    return NextResponse.json({ error: "Some questions still need an answer." }, { status: 400 });
  }

  try {
    const input = mapAnswers(answers);
    const result = estimate(input);

    // Deduplicated so the same inclusion cannot appear twice when a foundation
    // and a capability share a key.
    const includes = [...new Set(result.includes)].map((key) => labelForKey(key, locale));

    return NextResponse.json(
      {
        low: result.low,
        high: result.high,
        rangeLabel: `${formatCad(result.low, locale)} – ${formatCad(result.high, locale)}`,
        currency: "CAD",
        projectLabel: labelForKey(result.lines[0]?.key ?? input.foundation, locale),
        includes,
        drivers: result.drivers.map((key) => labelForKey(key, locale)),
        caveats: result.caveats.map((key) => CAVEAT_LABELS[key]?.[locale]).filter(Boolean),
        recurring: result.recurring.map((r) => ({
          label: labelForKey(r.id, locale),
          monthly: r.monthly,
          monthlyLabel: r.monthly !== null ? formatCad(r.monthly, locale) : null,
        })),
        minimumApplied: result.minimumApplied,
        pricingVersion: result.pricingVersion,
        studioType: studioTypeFor(input.foundation),
        // Named so the client can label the CTA without knowing the model.
        foundationLabel: labelForKey(FOUNDATIONS[input.foundation].id, locale),
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    // A PricingInputError here means the flow produced something the model
    // rejects — a mapping bug, not a client one. Either way the prospect gets
    // a plain message and no internals.
    if (error instanceof PricingInputError) {
      return NextResponse.json({ error: "We could not price that combination." }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
