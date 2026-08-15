/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SHARED PRICING KERNEL — 1 of 5
 *
 * CANONICAL SOURCE: stillawake-media (.com) `src/lib/pricing/`.
 * A byte-identical copy is generated into stillawakemedia.dev by
 * `scripts/sync-pricing.mjs`. Never hand-edit the .dev copy — `model.test.ts`
 * in both repos recomputes the checksum and fails if you do.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * EVERY PRICE HERE IS DERIVED FROM DAYS OF WORK.
 *
 * StillAwake sells fixed-price engagements, never hours — but a fixed price
 * you cannot cost is a guess. So the model estimates effort in days, multiplies
 * by a discipline day rate, and the fixed price falls out of that. The client
 * buys an outcome; the day model is what makes the outcome profitable to
 * deliver. Any band that cannot be traced back to "N days at $R" is a number
 * somebody made up.
 *
 * Days are BANDS, never points, because scope uncertainty is a property of the
 * work itself. A custom availability engine is genuinely 3–7 days depending on
 * what the rules turn out to be, and a model that says "5" is lying.
 */

/** A day-count band. Invariant: low <= expected <= high. */
export type Days = { low: number; expected: number; high: number };

/** A money band in whole CAD, always days × rate. */
export type Band = { low: number; expected: number; high: number };

/**
 * Day rates by discipline.
 *
 * Not four different people — four different kinds of work, which the market
 * prices differently. Advisory rates above execution everywhere, because
 * judgement is what is scarce.
 */
export type Discipline = "build" | "systems" | "ai" | "advisory";

/**
 * What StillAwake is being asked to do. These COMBINE — a client can want
 * positioning and a site and an SEO programme, and pricing that as one
 * "project type" was the flaw in the previous model. Nothing here is mutually
 * exclusive.
 */
export type ServiceLineId =
  | "brand"
  | "website"
  | "store"
  | "seo"
  | "content"
  | "software"
  | "automation";

/** How deep the work goes on a given line. Keys are line-specific. */
export type DepthId = string;

export type DepthSpec = {
  id: DepthId;
  days: Days;
  /** Overrides the line's discipline where this depth is a different kind of work. */
  discipline?: Discipline;
  /**
   * A fixed-scope product rather than a custom engagement. Productized depths
   * are sold at a published price with hard limits — that is what makes them
   * viable at a price no custom engagement could reach.
   */
  productized?: boolean;
  /**
   * Lines that already include this work. Selecting SEO foundations alongside
   * a website is not an extra purchase — every build lays them — and charging
   * for it would be billing twice for one job.
   */
  absorbedBy?: ServiceLineId[];
};

export type ServiceLineSpec = {
  id: ServiceLineId;
  discipline: Discipline;
  depths: DepthSpec[];
  /** Add-ons this line can carry. Only offered above a productized depth. */
  addons?: AddonId[];
};

export type AddonId =
  | "bookings"
  | "ordering"
  | "accounts"
  | "payments"
  | "multi_location"
  | "custom_functionality";

export type AddonSpec = {
  id: AddonId;
  days: Days;
  /**
   * Where one word covers builds an order of magnitude apart, the flow asks a
   * follow-up instead of averaging. "Booking" spans a Calendly link and a
   * multi-resource availability engine; no single band is honest about both.
   */
  variants?: { id: string; days: Days }[];
  discipline?: Discipline;
  /** Targets a system we cannot see inside before starting. Widens HIGH only. */
  externalSystem?: boolean;
};

/**
 * What makes an organisation expensive to work with — the honest mechanism for
 * charging a mid-market firm more than an owner-operator.
 *
 * Not a proxy for company size and not a wallet test. Each of these is real,
 * itemisable work: review rounds with several stakeholders, conformance
 * testing, integration against systems we do not control, training and
 * documentation. A solo operator selects none of them and pays the base price.
 */
export type OrgFactorId = "approvals" | "compliance" | "integrations" | "training";

export type OrgFactorSpec = {
  id: OrgFactorId;
  /** Multiplier on the whole engagement. */
  factor: number;
  /** True when it also widens the top of the range. */
  addsUncertainty?: boolean;
};

/** Which of the three products the engagement lands in. */
export type Tier = "launch" | "custom" | "systems";

export type LineSelection = {
  id: ServiceLineId;
  depth: DepthId;
  addons?: { id: AddonId; variant?: string }[];
};

export type EstimateInput = {
  lines: LineSelection[];
  org?: OrgFactorId[];
  /**
   * Optional, and it routes — it never sets the price. Someone who says $3,000
   * sees the Launch product at its published price; someone who says $50,000
   * sees the custom range at the same published rates. This exists so we
   * propose the right scope, not a bigger one.
   */
  budget?: "under_5k" | "5_15k" | "15_50k" | "50k_plus" | "unsure";
  /** Client cannot describe the scope yet — widens HIGH only. */
  undefinedScope?: boolean;
  /** A real deadline that compresses the schedule. Costs real money. */
  rush?: boolean;
};

export type LineItem = {
  /** Stable key for i18n lookup; never a user-facing string. */
  key: string;
  kind: "line" | "addon" | "org" | "risk" | "aggregation" | "minimum";
  band: Band;
  days?: Days;
  discipline?: Discipline;
  /** Machine-readable reason, resolved to prose by the caller's locale. */
  note?: string;
};

export type Estimate = {
  pricingVersion: string;
  modelChecksum: string;
  /** Rounded, client-safe. Low rounds down, high up — never narrower than computed. */
  low: number;
  high: number;
  /** Internal midpoint. NEVER exposed on the public surface. */
  expected: number;
  /** Total effort, so any band can be checked against "N days at $R". */
  days: Days;
  tier: Tier;
  /**
   * True when the engagement is too large to quote honestly from a form. The
   * public surface shows a starting figure and sells paid discovery instead of
   * pretending a questionnaire can scope a platform.
   */
  needsDiscovery: boolean;
  /** Full derivation. Internal only. */
  lines: LineItem[];
  /** Keys ranked by contribution to `expected`. */
  drivers: string[];
  /** Keys of what the engagement includes. */
  includes: string[];
  /** Recurring options, separated from build cost. Unapproved prices are null. */
  recurring: { id: string; monthly: number | null }[];
  minimumApplied: boolean;
  /** Machine-readable caveats. */
  caveats: string[];
  /** Set when the answers and the stated budget do not meet. */
  budgetSignal: "fits" | "above" | "below" | null;
};

export type RecurringSpec = {
  id: string;
  /** CAD per month, or null when no APPROVED public price exists. */
  monthly: number | null;
  /** Mirrors Supabase `service_products.active`. Only `true` may be published. */
  approved: boolean;
  studioSlug: string | null;
};
