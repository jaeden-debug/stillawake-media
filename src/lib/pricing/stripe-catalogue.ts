/**
 * THE STRIPE CATALOGUE — what is actually sellable, and under what key.
 *
 * Deliberately NOT part of the synced kernel. `model.ts` is what StillAwake
 * charges; this is where those charges are collected, and only .com needs to
 * know that. Keeping it out of `sync-pricing.mjs` also keeps the model
 * checksum stable when a payment detail changes but no price does.
 *
 * EVERY ENTRY IS A LOOKUP KEY, NEVER A PRICE ID. `price_1U4ncV...` is opaque,
 * unsearchable, and different in every mode; `sa_seo_starter_monthly_cad` says
 * what it is and survives a price being replaced (Stripe prices are immutable
 * — changing an amount means creating a new price and moving the key across).
 *
 * WHAT IS NOT HERE, AND WHY
 * Banded project work — `website_standard` at $2,200–$4,800 and everything
 * like it. A band is not a price and Stripe cannot hold one. Those are sold
 * through a written proposal that fixes a single number first, and then
 * collected through `project_instalment`, whose amount is set per-invoice from
 * the agreed price. See `buildSchedule` in payments.ts, which is the only
 * supported way to produce those amounts.
 */

import { EMERGENCY, ONE_TIME, RECURRING } from "./model";

/** Prefix for every StillAwake service key, so the account can be filtered. */
export const LOOKUP_PREFIX = "sa_";

/** Monthly plans, keyed by catalogue id. Only approved rows may appear. */
export const RECURRING_LOOKUP_KEYS: Record<string, string> = {
  "managed-hosting": "sa_managed_hosting_monthly_cad",
  "website-care-plan": "sa_website_care_plan_monthly_cad",
  "seo-starter": "sa_seo_starter_monthly_cad",
  "seo-essentials": "sa_seo_essentials_monthly_cad",
  "seo-advanced": "sa_seo_advanced_monthly_cad",
  "content-creation": "sa_content_production_monthly_cad",
};

/** One-time fixed-price entry services. */
export const ONE_TIME_LOOKUP_KEYS: Record<string, string> = {
  "site-audit": "sa_site_audit_cad",
  "llms-txt-setup": "sa_llms_txt_setup_cad",
  "gbp-setup": "sa_gbp_setup_cad",
  "speed-fix": "sa_speed_fix_cad",
};

/** Emergency tiers, keyed `${track}.${tier}` to match the label maps. */
export const EMERGENCY_LOOKUP_KEYS: Record<string, string> = {
  "custom_site.quick_fix": "sa_emergency_custom_site_quick_fix_cad",
  "custom_site.priority": "sa_emergency_custom_site_priority_cad",
  "custom_site.heavy": "sa_emergency_custom_site_heavy_cad",
  "ecommerce.triage": "sa_emergency_ecommerce_triage_cad",
  "ecommerce.priority": "sa_emergency_ecommerce_priority_cad",
  "ecommerce.critical": "sa_emergency_ecommerce_critical_cad",
};

/** Paid discovery, credited against the build that follows. */
export const DISCOVERY_LOOKUP_KEY = "sa_project_discovery_cad";

/**
 * A single instalment of an AGREED project price. Custom-amount, because the
 * amount comes from a signed proposal rather than from the calculator's range.
 *
 * The minimum matches `MIN_PAYMENT` in payments.ts — a schedule that would
 * produce a smaller instalment is refused there before it ever reaches Stripe.
 */
export const INSTALMENT_LOOKUP_KEY = "sa_project_instalment_cad";

/**
 * WHAT A STRANGER MAY BUY WITHOUT A HUMAN IN THE LOOP.
 *
 * This is an ALLOWLIST, and the checkout route accepts nothing outside it. The
 * request format has no field for a price, an amount or a Stripe id — only a
 * catalogue id from this list — so there is no way for a client to ask for a
 * different number than the one published.
 *
 * TWO DELIBERATE EXCLUSIONS, both of which would be bugs if they crept in:
 *
 *   · `project-instalment` — a custom-amount price. Whoever names the amount
 *     sets the price, so a public endpoint that accepted it would let a
 *     stranger pay $4 for a $12,000 build. It is only ever invoiced against a
 *     signed proposal, by us.
 *
 *   · every EMERGENCY tier — the published copy on both maintenance pages
 *     says a three-question workload check sets the tier before payment. A
 *     self-serve button would make that copy false, and would let someone in a
 *     panic buy the wrong tier for an incident we have not looked at. We
 *     triage, then send a payment link.
 *
 * Adding an id here is a decision to let it be bought unattended. Its test
 * asserts these two stay out.
 */
export const PUBLIC_CHECKOUT_ITEMS: string[] = [
  "managed-hosting",
  "website-care-plan",
  "seo-starter",
  "seo-essentials",
  "seo-advanced",
  "content-creation",
  "site-audit",
  "llms-txt-setup",
  "gbp-setup",
  "speed-fix",
  "project-discovery",
];

/** Stripe `mode` for a checkout session. Recurring plans subscribe; the rest are one-off. */
export function checkoutMode(item: string): "subscription" | "payment" {
  return item in RECURRING_LOOKUP_KEYS ? "subscription" : "payment";
}

/**
 * Resolve a catalogue id to its lookup key, or null if it is not publicly
 * purchasable. Returning null rather than throwing keeps the route's failure
 * path a plain 404 — an unknown id and a deliberately-excluded one are the
 * same answer to a stranger, and that is intentional.
 */
export function publicLookupKey(item: unknown): string | null {
  if (typeof item !== "string" || !PUBLIC_CHECKOUT_ITEMS.includes(item)) return null;
  if (item === "project-discovery") return DISCOVERY_LOOKUP_KEY;
  return RECURRING_LOOKUP_KEYS[item] ?? ONE_TIME_LOOKUP_KEYS[item] ?? null;
}

/** Everything sellable, for the completeness test and for admin tooling. */
export function allLookupKeys(): string[] {
  return [
    ...Object.values(RECURRING_LOOKUP_KEYS),
    ...Object.values(ONE_TIME_LOOKUP_KEYS),
    ...Object.values(EMERGENCY_LOOKUP_KEYS),
    DISCOVERY_LOOKUP_KEY,
    INSTALMENT_LOOKUP_KEY,
  ];
}

/**
 * The catalogue ids that MUST have a Stripe key: every approved price in the
 * model. Derived, so approving a row surfaces the missing key as a test
 * failure rather than as a checkout that cannot be completed.
 */
export function sellableIds(): { recurring: string[]; oneTime: string[]; emergency: string[] } {
  return {
    recurring: RECURRING.filter((r) => r.approved && r.monthly !== null).map((r) => r.id),
    oneTime: Object.values(ONE_TIME)
      .filter((s) => s.approved)
      .map((s) => s.id),
    emergency: Object.values(EMERGENCY).flatMap((track) =>
      track.tiers.map((tier) => `${track.id}.${tier.id}`),
    ),
  };
}
