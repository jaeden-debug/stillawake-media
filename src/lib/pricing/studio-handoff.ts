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

import type { EstimateInput } from "./types";
import { studioTypeFor, type Answers } from "./public-flow";

/** Studio's `pages_scale` buckets, from its own discovery definitions. */
const PAGES_SCALE: Record<string, string> = {
  launch: "1_5",
  custom: "5_15",
  flagship: "15_50",
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
  /** Kept for callers and future mappings; the seed reads `input`. */
  answers: Answers;
  input: EstimateInput;
  low: number;
  high: number;
  pricingVersion: string;
  locale: "en" | "fr";
};

/** The seed object, in Studio's vocabulary. Exported for testing. */
export function studioSeed(ctx: HandoffContext): Record<string, unknown> {
  const { input } = ctx;
  const seed: Record<string, unknown> = {};
  const line = (id: string) => input.lines.find((l) => l.id === id);

  seed.project_type = studioTypeFor(input.lines);

  const website = line("website");
  const store = line("store");

  // Studio's new / existing / rebuild, inferred from what they are buying.
  // A brand or SEO engagement with no build is work on something that already
  // exists; anything else is new until they tell Studio otherwise.
  if (website || store) seed.new_or_existing = "new";
  else if (line("seo") || line("brand") || line("content")) seed.new_or_existing = "existing";

  if (website && PAGES_SCALE[website.depth]) seed.pages_scale = PAGES_SCALE[website.depth];

  const features: string[] = [];
  if (website && website.depth !== "launch") features.push("cms");
  if (line("content")) features.push("blog");
  if (line("seo")) features.push("seo");
  const addons = input.lines.flatMap((l) => l.addons ?? []);
  if (addons.some((a) => a.id === "accounts")) features.push("customer_login");
  if (addons.some((a) => a.id === "multi_location")) features.push("local_seo");
  if (features.length) seed.site_features = [...new Set(features)];

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
  params.set("type", studioTypeFor(ctx.input.lines));
  const seed = encode(studioSeed(ctx));
  if (seed) params.set("sa", seed);
  params.set("sa_est", `${ctx.low}-${ctx.high}`);
  params.set("sa_pv", ctx.pricingVersion);

  return `${base}?${params.toString()}`;
}
