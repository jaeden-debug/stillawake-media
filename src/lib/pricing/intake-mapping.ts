/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SHARED PRICING KERNEL — INTAKE → ESTIMATE
 * CANONICAL SOURCE: stillawake-media (.com). Synced to .dev.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * The reverse of studio-handoff.ts. That file carries calculator answers INTO
 * the Studio intake; this one reads a completed intake back OUT and prices it,
 * so an operator can drop a finished form in and get a starting estimate rather
 * than re-keying twenty answers into the estimator by hand.
 *
 * IT IS A DRAFT, NOT A QUOTE. The intake asks things the pricing model has no
 * opinion about, and the model needs things the intake never asks. Everything
 * this cannot map is reported in `unmapped` rather than silently dropped — an
 * operator who cannot see what was ignored will trust a number built on half
 * the form.
 *
 * Keys MUST match stillawake.studio/src/lib/discovery.ts. A drifted key lands
 * in `unmapped`, which is visible, rather than being mis-mapped, which is not.
 */

import type { AdditionId, BaseId, EstimateInput, SeoScopeId } from "./types";

/** The intake's answer shape: choice ids, multi-select arrays, and free text. */
export type IntakeAnswers = Record<string, unknown>;

export type IntakeMapping = {
  input: EstimateInput;
  /** Human-readable list of what drove the mapping, for the operator to check. */
  matched: string[];
  /** Answers we read but could not price, and answers the model wanted and did
   *  not get. Shown to the operator so the gap is never invisible. */
  unmapped: string[];
  /** True when the intake is too thin to price without a conversation. */
  needsReview: boolean;
};

const str = (v: unknown): string => (typeof v === "string" ? v : "");
const list = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

/** Studio `pages_scale` → how much site there is to build. */
const SITE_BY_SCALE: Record<string, BaseId> = {
  "1_5": "website_small",
  "5_15": "website_standard",
  "15_50": "website_large",
  "50_plus": "website_large",
};

/**
 * Which software product the app questions describe.
 *
 * Deliberately coarse. The intake cannot tell the difference between a portal
 * and a platform in a way worth trusting, so this leans on the count of heavy
 * capabilities and anything past the first tier routes to discovery anyway.
 */
function softwareBase(needs: string[]): BaseId {
  const heavy = ["accounts_auth", "payments", "subscriptions", "realtime", "ai", "admin"];
  const weight = needs.filter((n) => heavy.includes(n)).length;
  if (weight >= 5) return "software_platform";
  if (weight >= 3) return "software_portal";
  return "software_dashboard";
}

/** Site capabilities that map onto a priced addition. */
const SITE_FEATURE_ADDITIONS: Record<string, AdditionId> = {
  customer_login: "accounts",
  multilingual: "content_migration",
};

/** What the site is FOR, where that implies a capability we price. */
const SITE_GOAL_ADDITIONS: Record<string, AdditionId> = {
  booking: "bookings",
  sell: "sell_products",
};

/** App capabilities that map onto a priced addition. */
const APP_NEED_ADDITIONS: Record<string, AdditionId> = {
  accounts_auth: "accounts",
  payments: "payments",
  scheduling: "bookings",
};

/**
 * Answers the intake collects that the pricing model has no vocabulary for.
 * Listed explicitly so they are reported as "read, not priced" instead of
 * looking like a mapping we forgot to write.
 */
const KNOWN_UNPRICED = new Set([
  "business_name", "business_does", "project_goal", "audience", "must_do",
  "existing_url", "existing_system", "languages", "local_area", "platform_which",
  "app_problem", "app_users_roles", "app_core_workflow", "payments_model",
  "app_ai_purpose", "mobile_workflows", "mobile_backend_what", "ai_problem",
  "ai_knowledge", "integrations", "references", "brand_colors", "colors_avoid",
  "success_metric", "internal_team", "anything_else", "referral_source",
  "referral_detail", "other_description", "migration_from", "feel",
  "contact_name", "contact_email", "decision_makers",
]);

export function estimateInputFromIntake(answers: IntakeAnswers): IntakeMapping {
  const matched: string[] = [];
  const unmapped: string[] = [];
  const additions = new Map<AdditionId, string | undefined>();

  const type = str(answers.project_type);
  const scale = str(answers.pages_scale);
  const siteFeatures = list(answers.site_features);
  const siteGoals = list(answers.site_goals);
  const appNeeds = list(answers.app_needs);

  /* ── base ─────────────────────────────────────────────────────────────── */
  let base: BaseId;
  let undefinedScope = false;

  if (type === "ecommerce") {
    const count = str(answers.product_count);
    base = count === "1000_plus" || count === "100_1000" ? "store_large" : "store_standard";
    matched.push(`Store (${count || "size not given"})`);
  } else if (type === "saas" || type === "web_app") {
    base = softwareBase(appNeeds);
    matched.push(`Software — ${appNeeds.length} capabilities named`);
  } else if (type === "mobile_app" || type === "ai_system") {
    /* The model prices web software. A native app or a bespoke AI system is
       priced from a conversation, not from a form. */
    base = "software_portal";
    undefinedScope = true;
    matched.push(`${type} — routed to discovery`);
  } else if (type === "brand_experience") {
    base = "website_standard";
    matched.push("Brand experience — treated as a standard site");
  } else if (type === "website") {
    base = SITE_BY_SCALE[scale] ?? "website_standard";
    matched.push(scale ? `Website, ${scale.replace("_", "–")} pages` : "Website, size not given");
    if (!scale || scale === "unsure") unmapped.push("pages_scale — not answered, assumed standard");
  } else {
    /* No project type, or "other". Price the middle and flag it rather than
       guessing at something we were not told. */
    base = "website_standard";
    undefinedScope = true;
    unmapped.push(`project_type "${type || "(none)"}" — cannot be priced from the form`);
  }

  /* ── capabilities ─────────────────────────────────────────────────────── */
  for (const f of siteFeatures) {
    const id = SITE_FEATURE_ADDITIONS[f];
    if (id) {
      additions.set(id, undefined);
      matched.push(`Feature: ${f}`);
    }
  }
  for (const g of siteGoals) {
    const id = SITE_GOAL_ADDITIONS[g];
    if (id) {
      /* Integration is the default reading. Someone asking for bookings on a
         business site wants their existing system connected far more often
         than they want one built, and the difference is thousands of dollars —
         so the cheaper reading is the assumption and the operator can raise it. */
      additions.set(id, id === "bookings" || id === "ordering" ? "integrate" : undefined);
      matched.push(`Goal: ${g}`);
    }
  }
  for (const n of appNeeds) {
    const id = APP_NEED_ADDITIONS[n];
    if (id) {
      additions.set(id, undefined);
      matched.push(`App need: ${n}`);
    }
  }
  if (list(answers.store_operations).length > 0 || list(answers.store_features).length > 0) {
    additions.set("connect_tools", undefined);
    matched.push("Store operations / features");
  }
  if (list(answers.migration_needs).some((m) => m !== "nothing")) {
    additions.set("content_migration", undefined);
    matched.push("Content migration");
  }
  if (list(answers.constraints).includes("accessibility")) {
    additions.set("accessibility", undefined);
    matched.push("Accessibility requirement");
  }
  if (["team", "board"].includes(str(answers.decision_makers))) {
    additions.set("stakeholders", undefined);
    matched.push("Multiple decision makers");
  }

  /* ── content ──────────────────────────────────────────────────────────── */
  const owner = str(answers.content_owner);
  if (owner === "studio") {
    additions.set("content_full", undefined);
    matched.push("We write the content");
  } else if (owner === "shared") {
    additions.set("content_help", undefined);
    matched.push("We help with content");
  } else if (owner === "client") {
    matched.push("Client supplies content");
  } else {
    unmapped.push("content_owner — not answered; assumed the client supplies it");
  }

  /* ── search ───────────────────────────────────────────────────────────── */
  let seo: SeoScopeId = "none";
  if (siteFeatures.includes("local_seo")) {
    seo = "local";
    matched.push("Local search");
  } else if (siteFeatures.includes("seo")) {
    seo = "content_strategy";
    matched.push("Search strategy");
  }

  /* ── routing signals ──────────────────────────────────────────────────── */
  const budget = str(answers.budget);
  const validBudget = ["under_5k", "5_15k", "15_50k", "50k_plus", "unsure"].includes(budget)
    ? (budget as EstimateInput["budget"])
    : undefined;
  if (budget && !validBudget) unmapped.push(`budget "${budget}" — unrecognised`);

  const rush = str(answers.timeline) === "asap";
  if (rush) matched.push("Timeline: as soon as possible");

  /* Anything the form collected that this cannot price. Reported, not hidden. */
  for (const key of Object.keys(answers)) {
    const v = answers[key];
    const empty = v == null || v === "" || (Array.isArray(v) && v.length === 0);
    if (empty || KNOWN_UNPRICED.has(key)) continue;
    const consumed = [
      "project_type", "pages_scale", "site_features", "site_goals", "app_needs",
      "product_count", "product_complexity", "store_operations", "store_features",
      "migration_needs", "constraints", "content_owner", "budget", "timeline",
      "decision_makers", "new_or_existing", "brand_exists", "brand_assets",
      "brand_needed", "color_direction", "already_have", "platform_pref",
      "app_mobile", "mobile_platforms", "mobile_device_features", "mobile_backend",
      "ai_users", "ai_actions", "ai_oversight", "calculator_estimate",
      "calculator_pricing_version",
    ];
    if (!consumed.includes(key)) unmapped.push(`${key} — no pricing rule`);
  }

  return {
    input: {
      base,
      additions: [...additions.entries()].map(([id, variant]) => ({ id, variant })),
      seo,
      budget: validBudget,
      undefinedScope,
      rush,
    },
    matched,
    unmapped,
    needsReview: undefinedScope || matched.length < 3,
  };
}
