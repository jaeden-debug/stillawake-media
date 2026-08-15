/**
 * CARRY-OVER INTO THE STUDIO INTAKE.
 *
 * Someone who has just answered eight questions about their restaurant should
 * not be asked what they are building on the very next screen. This maps the
 * calculator's answers onto stillawake.studio's own discovery vocabulary so
 * the intake opens already knowing what they said.
 *
 * THE WIRE FORMAT is one base64url `sa` parameter holding a small JSON object
 * of Studio's own answer ids. Studio re-validates every key and value against
 * its `DISCOVERY` definitions before accepting any of it — a crafted payload
 * can seed nothing that a visitor could not have clicked. `type` is still sent
 * separately because Studio has read it since before this existed, so an old
 * Studio deploy degrades to exactly the previous behaviour rather than
 * breaking.
 *
 * WHAT IS DELIBERATELY NOT CARRIED: the estimate itself, into Studio's
 * `budget` question. Studio asks "is there a budget range in mind?" — a
 * question about the client's intent. Answering it with our own estimate would
 * put words in their mouth and then show them back to the operator as though
 * the client had said them. The range travels as separate context instead
 * (`sa_est`), clearly ours and clearly unverified.
 *
 * Keys here MUST match stillawake.studio/src/lib/discovery.ts. The Studio side
 * validates against that file, so a drifted key is dropped rather than
 * mis-seeded — a safe failure, but a silent one, so keep them in step.
 */

import type { EstimateInput, ScopeSize } from "./types";
import { branchOf, type Answers } from "./public-flow";
import { studioTypeFor } from "./public-flow";

/** Studio's `pages_scale` buckets, from its own discovery definitions. */
const PAGES_SCALE: Record<ScopeSize, string> = {
  small: "1_5",
  standard: "5_15",
  large: "15_50",
  very_large: "15_50",
  xl: "50_plus",
};

/** Base64url so the value survives a query string without escaping. */
function encode(payload: unknown): string | null {
  const json = JSON.stringify(payload);
  // btoa exists in every browser and in Node ≥16, so this is belt-and-braces.
  // Returning null rather than "" makes the caller omit the parameter, which
  // degrades cleanly to the legacy `type`-only hand-off instead of sending an
  // empty value that looks like a seed and is not one.
  if (typeof btoa !== "function") return null;
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export type HandoffContext = {
  answers: Answers;
  input: EstimateInput;
  low: number;
  high: number;
  pricingVersion: string;
  locale: "en" | "fr";
};

/** The seed object, in Studio's vocabulary. Exported for testing. */
export function studioSeed(ctx: HandoffContext): Record<string, unknown> {
  const { answers, input } = ctx;
  const branch = branchOf(answers);
  const seed: Record<string, unknown> = {};

  seed.project_type = studioTypeFor(input.foundation);

  // Studio's "new / existing / rebuild" maps onto how they reached us.
  if (branch === "redesign") seed.new_or_existing = "rebuild";
  else if (branch === "seo") {
    const site = typeof answers.has_site === "string" ? answers.has_site : "";
    if (site === "yes") seed.new_or_existing = "existing";
    if (site === "rebuild") seed.new_or_existing = "rebuild";
    if (site === "no") seed.new_or_existing = "new";
  } else if (branch === "website" || branch === "sell") seed.new_or_existing = "new";

  // Page count, but only where Studio actually asks it.
  if (["website", "redesign", "seo"].includes(branch)) {
    seed.pages_scale = PAGES_SCALE[input.scope];
  }

  // Studio's `site_features` multi, derived from what they told us they need.
  const features: string[] = [];
  const needs = Array.isArray(answers.needs) ? answers.needs : [];
  const seoNeeds = Array.isArray(answers.seo_needs) ? answers.seo_needs : [];
  if (needs.includes("self_edit")) features.push("cms");
  if (needs.includes("blog")) features.push("blog");
  if (input.bilingual) features.push("multilingual");
  if (needs.includes("seo") || branch === "seo") features.push("seo");
  if (
    needs.includes("locations") ||
    seoNeeds.includes("local") ||
    seoNeeds.includes("locations") ||
    answers.site_kind === "local"
  ) {
    features.push("local_seo");
  }
  if (needs.includes("accounts")) features.push("customer_login");
  if (features.length) seed.site_features = [...new Set(features)];

  // `languages` is a free-text follow-up that only fires when multilingual is
  // selected, so it is only sent alongside it.
  if (input.bilingual) {
    seed.languages = ctx.locale === "fr" ? "Français et anglais" : "English and French";
  }

  return seed;
}

/**
 * Builds the Studio intake URL.
 *
 * `sa_est` is our estimate travelling as context, never as the client's stated
 * budget. Studio labels it as unverified because anyone can edit a query
 * string, and an operator must never read it as a commitment.
 */
export function studioHandoffUrl(ctx: HandoffContext): string {
  const base =
    ctx.locale === "fr" ? "https://stillawake.studio/fr/demarrer" : "https://stillawake.studio/start";
  const params = new URLSearchParams();

  // Kept for Studio deploys that predate the `sa` reader.
  params.set("type", studioTypeFor(ctx.input.foundation));
  const seed = encode(studioSeed(ctx));
  if (seed) params.set("sa", seed);
  params.set("sa_est", `${ctx.low}-${ctx.high}`);
  params.set("sa_pv", ctx.pricingVersion);

  return `${base}?${params.toString()}`;
}
