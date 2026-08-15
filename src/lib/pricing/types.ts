/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SHARED PRICING KERNEL — 1 of 5
 *
 * CANONICAL SOURCE: stillawake-media (.com) `src/lib/pricing/`.
 * Synced byte-identical into stillawakemedia.dev by `scripts/sync-pricing.mjs`.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * WE PRICE WHAT WE SELL, AND WE TRACK WHAT IT COSTS US. THOSE ARE TWO NUMBERS.
 *
 * The previous model (2026.08.2) computed `days × day rate × org multiplier`
 * and published the result. It was internally consistent and commercially
 * wrong: a twelve-person law firm asking for a website saw $39,000–60,000,
 * and would have closed the page long before anyone explained the arithmetic.
 *
 * Three things caused that, and this file is shaped to prevent all three.
 *
 *   1. Organisational complexity multiplied the ENTIRE project. Two checkboxes
 *      doubled work that stakeholders never touch. Complexity is now additive
 *      and specific: accessibility is a fixed amount of conformance work, not
 *      +45% of everything.
 *
 *   2. The day rate behaved as a retail formula, so 5.5 days set a $9,900
 *      floor under every custom site. StillAwake's speed is a competitive
 *      advantage, not a reason to charge agency prices for agency headcount we
 *      do not carry. Every element now carries a SELL PRICE directly; `days`
 *      rides alongside as an internal check.
 *
 *   3. Integration was priced like construction. Connecting the ordering
 *      platform a restaurant already runs is not building one. That
 *      distinction is now structural — see `AdditionSpec.kind`.
 *
 * The day estimate has not gone away. `internalRate` on every estimate reports
 * what the price implies per day, the internal estimator shows it against the
 * planning rate, and a test fails if any element implies less than the floor.
 * That is the honest role for a day rate: catching underpricing, not setting
 * retail.
 */

/** A money band in whole CAD — what a client is quoted. */
export type Band = { low: number; expected: number; high: number };

/** A day-count band — what it costs us. Internal only, never published. */
export type Days = { low: number; expected: number; high: number };

/** Everything priced carries both: what we sell it for, and what it takes. */
export type Priced = { price: Band; days: Days };

/**
 * What the project fundamentally is. Exactly one is chosen, and it sets the
 * centre of the estimate — everything else is an addition to it.
 */
export type BaseId =
  | "website_small"
  | "website_standard"
  | "website_large"
  | "store_standard"
  | "store_large"
  | "store_custom"
  | "brand_refresh"
  | "brand_identity"
  | "brand_positioning"
  | "seo_engagement"
  | "software_dashboard"
  | "software_portal"
  | "software_platform"
  | "automation_connect"
  | "automation_workflow"
  | "automation_ai";

export type BaseSpec = Priced & {
  id: BaseId;
  /** What the client actually receives. Drives the "includes" list. */
  includes: string[];
  /**
   * What the two ends of the range actually MEAN, in the client's terms. The
   * bounds are not a confidence interval — the low is the simplest realistic
   * build of what they picked, the high is the involved version. Saying so
   * turns a scary spread into a useful one.
   */
  lowAssumption: string;
  highAssumption: string;
  /** Additions this base can carry. */
  additions: AdditionId[];
  /**
   * Requirements are the product here, so no questionnaire can price it
   * honestly. Routes to paid discovery whatever the number says.
   */
  alwaysDiscovery?: boolean;
  /** A fixed-scope product sold at a published price with hard limits. */
  productized?: boolean;
};

export type AdditionId =
  | "bookings"
  | "ordering"
  | "payments"
  | "accounts"
  | "sell_products"
  | "multi_location"
  | "connect_tools"
  | "connect_internal"
  | "content_migration"
  | "accessibility"
  | "stakeholders"
  | "content_help"
  | "content_full"
  | "custom_functionality";

/**
 * THE DISTINCTION THAT MATTERS MOST.
 *
 * `integrate` — wiring up something that already exists and already works.
 *   Calendly, Toast, Stripe Checkout, their CRM. Configuration, styling,
 *   testing. Usually under a day, and priced like it.
 *
 * `build` — creating the thing. A scheduling engine, an ordering platform, a
 *   billing system. That is software, and software routes to discovery.
 *
 * The old model collapsed these into one "ordering" line at eight days, which
 * is how a restaurant with a working Toast account got quoted $40,000.
 */
export type AdditionKind = "integrate" | "build" | "scope" | "process";

export type AdditionSpec = {
  id: AdditionId;
  kind: AdditionKind;
  /** Flat addition. Omitted when the addition is proportional (see `share`). */
  price?: Band;
  days?: Days;
  /**
   * Proportional additions, as a fraction of the base — used where the work
   * genuinely scales with the project. Content production does; accessibility
   * conformance does not.
   *
   * ASYMMETRIC BY DESIGN. `shareLow` is the simplest realistic version of the
   * work; `shareHigh` is what it becomes once it turns out to be involved.
   * Copy help might be a light editing pass or a full rewrite, and collapsing
   * those into one number is what pushes an attractive floor out of reach.
   */
  shareLow?: number;
  shareHigh?: number;
  /** Where one word covers integration AND construction, the flow must ask. */
  variants?: { id: string; kind: AdditionKind; price: Band; days: Days; alwaysDiscovery?: boolean }[];
  /** Targets a system we cannot see inside before starting. Widens HIGH only. */
  externalSystem?: boolean;
  /** Bases that already include this, so it is never charged twice. */
  includedIn?: BaseId[];
};

/** Search scope, sold alongside any base. Technical foundations are included in every base. */
export type SeoScopeId = "none" | "local" | "content_strategy";

export type SeoScopeSpec = Priced & { id: SeoScopeId; includes: string[] };

export type Tier = "launch" | "project" | "discovery";

export type EstimateInput = {
  base: BaseId;
  additions?: { id: AdditionId; variant?: string }[];
  seo?: SeoScopeId;
  /**
   * Optional, and it routes — it never sets the price. Our rates are
   * published; a stated budget only tells us which scope to propose.
   */
  budget?: "under_5k" | "5_15k" | "15_50k" | "50k_plus" | "unsure";
  /** They have told us the scope is still open. Widens HIGH and routes to discovery. */
  undefinedScope?: boolean;
  rush?: boolean;
};

export type LineItem = {
  key: string;
  kind: "base" | "addition" | "seo" | "complexity" | "risk" | "aggregation" | "minimum";
  band: Band;
  days?: Days;
  /** integrate vs build, so the internal breakdown shows which was priced. */
  addKind?: AdditionKind;
  note?: string;
};

export type Estimate = {
  pricingVersion: string;
  modelChecksum: string;
  /** Rounded and client-safe. Low rounds down, high up. */
  low: number;
  high: number;
  /** Internal midpoint. NEVER published. */
  expected: number;
  /** Internal effort estimate. NEVER published. */
  days: Days;
  /**
   * What a conventional studio would charge for this effort at the planning
   * day rate. The gap between this and the public range is the value of our
   * reusable architecture — visible internally, never to a prospect.
   */
  internalValue: Band;
  /**
   * What the price implies per day. The honest role of a day rate: a check
   * against underpricing, not the formula that sets retail.
   */
  internalRate: number;
  tier: Tier;
  needsDiscovery: boolean;
  /** Why discovery was triggered, so the reason can be shown rather than a bare refusal. */
  discoveryReason: string | null;
  lines: LineItem[];
  drivers: string[];
  includes: string[];
  /** Named so a prospect knows what was NOT counted. */
  excludes: string[];
  /** What the low and high ends of the range assume. Public, and reassuring. */
  lowAssumption: string;
  highAssumption: string;
  /** Scope a prospect might add later. Public — sets expectations without pressure. */
  possibleAdditions: string[];
  recurring: { id: string; monthly: number | null }[];
  minimumApplied: boolean;
  caveats: string[];
  budgetSignal: "above" | null;
};

export type RecurringSpec = {
  id: string;
  monthly: number | null;
  /** Mirrors Supabase `service_products.active`. Only `true` may be published. */
  approved: boolean;
  studioSlug: string | null;
};
