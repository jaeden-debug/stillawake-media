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
 * Everything priced here is a BAND, never a point. That is the central design
 * decision: scope uncertainty is a property of the thing being built, not a
 * fudge factor bolted onto a total. "Booking" is genuinely a 15× spread
 * depending on what the client means, and a model that prices it at one number
 * and then widens the total is lying about where the uncertainty lives.
 */

/** A cost band in whole CAD. Invariant: low <= expected <= high. */
export type Band = { low: number; expected: number; high: number };

/**
 * Implementation effort tiers.
 *
 * These describe the SAME capability built to different depths — not
 * different capabilities. "Booking" at `standard` is a styled Calendly embed;
 * at `complex` it is a multi-resource availability engine with payments and
 * overbooking rules. The engine must understand that distinction, so
 * capabilities may declare qualitatively different bands per tier rather than
 * scaling one base (see `CapabilitySpec.bands`).
 */
export type Complexity = "standard" | "moderate" | "advanced" | "complex";

/** The minimum meaningful implementation StillAwake would actually ship. */
export type FoundationId =
  | "marketing_site"
  | "website_redesign"
  | "ecommerce"
  | "business_portal"
  | "custom_application"
  | "ai_automation"
  | "seo_engagement"
  | "content_system";

/**
 * Capability groups.
 *
 * `content` scope is what a second language and a bigger page count actually
 * multiply. `app` scope is not: translating a dashboard's strings is not the
 * same job as adapting fifteen pages of marketing copy for Québec. The engine
 * relies on this split, so a capability's group is a pricing decision, not a
 * label.
 */
export type CapabilityGroup =
  | "content"
  | "seo"
  | "commerce"
  | "business"
  | "integration"
  | "ai";

export type CapabilityId = string;

export type CapabilitySpec = {
  id: CapabilityId;
  group: CapabilityGroup;
  /** Effort at `standard`. Other tiers scale from this unless overridden. */
  base: Band;
  /**
   * Qualitative per-tier bands. Present only where a tier means a materially
   * different build rather than a harder version of the same build. Where
   * absent, `COMPLEXITY_FACTORS` scales `base`.
   */
  bands?: Partial<Record<Complexity, Band>>;
  /** Tiers offered for this capability. First entry is the default. */
  allowed: Complexity[];
  /**
   * How much page count moves this capability's cost, 0–1. Overrides the
   * group default. A programmatic content pipeline is 0: the pipeline is the
   * cost, and the page count it produces is precisely what it makes free.
   */
  scopeSensitivity?: number;
  /**
   * True when the capability targets an external system whose internals we
   * cannot see before starting. Selecting one widens the HIGH end instead of
   * inventing implementation effort we have no basis for.
   */
  externalSystem?: boolean;
  /** Foundations that already include this. Selecting it there costs nothing. */
  includedIn?: FoundationId[];
};

/** Page-count tiers. A mild multiplier with diminishing returns, never a per-page price. */
export type ScopeSize = "small" | "standard" | "large" | "very_large" | "xl";

export type FoundationSpec = {
  id: FoundationId;
  band: Band;
  /**
   * Hard floor for this foundation. The engine never quotes below it, and it
   * is the ONLY floor the engine applies — `GLOBAL_MINIMUM` is a policy
   * constant the model table is tested against, not a second clamp.
   */
  floor: number;
  /** Groups whose capabilities this foundation already covers at a basic level. */
  includes: string[];
  /** Which Studio `project_type` an intake hand-off should carry. */
  studioType: string;
  /** Recurring services that genuinely fit this foundation. */
  suggestedRecurring: string[];
};

export type RecurringSpec = {
  id: string;
  /** CAD per month, or null when no APPROVED public price exists. */
  monthly: number | null;
  /** Mirrors Supabase `service_products.active`. Only `true` may be published. */
  approved: boolean;
  /** Studio catalogue slug this mirrors, where one exists. */
  studioSlug: string | null;
};

/** Everything the engine needs to produce an estimate. Fully serialisable. */
export type EstimateInput = {
  foundation: FoundationId;
  scope: ScopeSize;
  bilingual: boolean;
  /** Omitting `complexity` selects the capability's own default tier. */
  capabilities: { id: CapabilityId; complexity?: Complexity }[];
  /** Client cannot describe the scope yet — widens HIGH only. */
  undefinedScope?: boolean;
  /** A real deadline that compresses the schedule. Costs real money. */
  rush?: boolean;
};

export type LineItem = {
  /** Stable key for i18n lookup; never a user-facing string. */
  key: string;
  kind: "foundation" | "capability" | "scope" | "bilingual" | "interaction" | "risk" | "minimum";
  band: Band;
  complexity?: Complexity;
  group?: CapabilityGroup;
  /** Machine-readable reason, resolved to prose by the caller's locale. */
  note?: string;
};

export type Estimate = {
  pricingVersion: string;
  modelChecksum: string;
  /** Rounded, client-safe. Low is rounded down, high up — never narrower than computed. */
  low: number;
  high: number;
  /** Internal midpoint. NEVER exposed on the public surface. */
  expected: number;
  /** Full derivation. Internal only. */
  lines: LineItem[];
  /** Capability/foundation keys ranked by contribution to `expected`. */
  drivers: string[];
  /** Keys of what a build at this range includes. */
  includes: string[];
  /** Recurring options, separated from build cost. Unapproved prices are null. */
  recurring: { id: string; monthly: number | null }[];
  /** True when a floor raised the number above the computed band. */
  minimumApplied: boolean;
  /** Machine-readable caveats (unknown external systems, undefined scope). */
  caveats: string[];
};
