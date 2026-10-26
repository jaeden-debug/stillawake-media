import { NextResponse } from "next/server";

import { recommend } from "@/lib/architecture/engine";
import { present } from "@/lib/architecture/present";
import { requirementsFrom } from "@/lib/architecture/requirements";
import { estimate, PricingInputError } from "@/lib/pricing/engine";
import { ASSUMPTION_LABELS, BASE_LABELS, CAVEAT_LABELS, DISCOVERY_REASONS, formatCad, labelForKey, type Locale } from "@/lib/pricing/labels";
import { DISCOVERY } from "@/lib/pricing/model";
import { isComplete, mapAnswers, sanitizeAnswers } from "@/lib/pricing/public-flow";

/**
 * Public project estimator.
 *
 * THE SECURITY MODEL, in one paragraph: the browser posts answer keys from the
 * published question flow and nothing else. It cannot name a service line, a
 * depth, an add-on, a multiplier or a price, because none of those words exist
 * in the request format. `sanitizeAnswers` drops anything the flow does not
 * declare, `mapAnswers` derives the model input, and the engine prices it
 * server-side. There is no field a client could use to ask for a discount.
 *
 * WHAT COMES BACK is deliberately less than what the engine computed: the
 * rounded band, the tier, what it includes, and approved recurring prices.
 * Never `expected`, never the day counts, never a rate or a multiplier. Those
 * live on the internal estimator, behind an admin session.
 *
 * Nothing is stored. Someone pricing a hypothetical is not a lead.
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

    /**
     * The architecture recommendation runs on the SAME answers and shares
     * nothing else with the estimate.
     *
     * Two separate models on one questionnaire, on purpose. What a project
     * costs and what it should be built on are different questions: a
     * bilingual brochure site and a single-language one price identically and
     * want different tooling, and a Shopify store and a headless storefront
     * can want the same stack an order of magnitude apart in price. Coupling
     * them would mean every pricing recalibration silently moved the technical
     * advice, which is precisely the drift that makes advice untrustworthy.
     *
     * It is also non-fatal. A prospect asked for a price; if the recommender
     * throws, they still get one.
     */
    let architecture = null;
    try {
      architecture = present(recommend(requirementsFrom(answers)), locale);
    } catch {
      architecture = null;
    }

    /** "A full business website · Bookings" — what they asked for, in their words. */
    const summary = [
      BASE_LABELS[input.base]?.[locale] ?? input.base,
      ...(input.additions ?? []).map((a) => labelForKey(a.id, locale)),
    ];

    return NextResponse.json(
      {
        low: result.low,
        high: result.high,
        currency: "CAD",
        tier: result.tier,
        needsDiscovery: result.needsDiscovery,
        // The reason is shown instead of a bare refusal to quote.
        discoveryReason: result.discoveryReason
          ? (DISCOVERY_REASONS[result.discoveryReason]?.[locale] ?? null)
          : null,
        discoveryFromLabel: formatCad(DISCOVERY.from, locale),
        excludes: result.excludes.map((key) => labelForKey(key, locale)),
        /* What each end of the range assumes. The bounds are not a confidence
           interval, and saying so is what turns a spread into information
           rather than anxiety. */
        lowAssumption: ASSUMPTION_LABELS[result.lowAssumption]?.[locale] ?? null,
        highAssumption: ASSUMPTION_LABELS[result.highAssumption]?.[locale] ?? null,
        possibleAdditions: result.possibleAdditions.map((key) => labelForKey(key, locale)),
        summary,
        includes: [...new Set(result.includes)].map((key) => labelForKey(key, locale)),
        drivers: result.drivers.map((key) => labelForKey(key, locale)),
        caveats: result.caveats.map((key) => CAVEAT_LABELS[key]?.[locale]).filter(Boolean),
        recurring: result.recurring.map((r) => ({
          label: labelForKey(r.id, locale),
          monthly: r.monthly,
          monthlyLabel: r.monthly !== null ? formatCad(r.monthly, locale) : null,
        })),
        // Only ever "above" reaches the client: telling someone their budget is
        // larger than the work would be an invitation to spend more, which is
        // the opposite of what asking the question is for.
        budgetSignal: result.budgetSignal === "above" ? "above" : null,
        pricingVersion: result.pricingVersion,
        /* Already localised — unlike the pricing fields, which are keys the
           route resolves above. The recommender owns its own label tables, so
           it renders itself and hands back finished copy. */
        architecture,
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
