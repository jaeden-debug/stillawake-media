/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SHARED PRICING KERNEL — 2 of 5 · THE CANONICAL PRICING MODEL
 *
 * CANONICAL SOURCE: stillawake-media (.com). Synced to .dev by
 * `scripts/sync-pricing.mjs`. Hand-editing the .dev copy fails its own test.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * WHERE THESE NUMBERS COME FROM
 *
 * Approved commercial truth (Supabase `service_products`, active rows, verified
 * 2026-08-14) covers RECURRING and SUPPORT only: SEO at $600/$850 per month and
 * the two tiered emergency products. StillAwake has never published a project
 * price, and the billing tables (`proposals`, `invoices`,
 * `project_billing_profiles`, `payment_milestones`) are empty — there is no
 * historical invoice to calibrate against.
 *
 * The build bands below are therefore calibrated against the two things that
 * ARE real: the market ranges StillAwake already publishes on
 * /website-cost-canada and /fr/prix-site-web-quebec, and the deterministic
 * fallback in stillawake.studio's `lib/ai/pricing.ts`. Where those two
 * disagreed, the published page won — it is the promise a prospect has already
 * read. See `calibration.test.ts`, which asserts the published bands hold.
 *
 * CHANGING PRICES
 * Edit the values, bump PRICING_VERSION, run `node scripts/sync-pricing.mjs`,
 * then `npm test` in both repos. Stored estimates keep their old version and
 * stay explainable.
 */

import type {
  Band,
  CapabilityGroup,
  CapabilitySpec,
  Complexity,
  FoundationId,
  FoundationSpec,
  RecurringSpec,
  ScopeSize,
} from "./types";

/** Bump on ANY change below. Every stored estimate records the version that produced it. */
export const PRICING_VERSION = "2026.08.1";

export const CURRENCY = "CAD";

/**
 * StillAwake will not take a BUILD engagement below this.
 *
 * Not a market observation — a capacity decision. Below this the fixed cost of
 * scoping, design review, deployment and handover eats the engagement.
 *
 * The engine does not clamp against this directly; each foundation carries its
 * own floor and `model.test.ts` asserts every build foundation's floor clears
 * this line. `seo_engagement` is the deliberate exception — it is an
 * onboarding sprint attached to a monthly plan, not a build, and floors at its
 * own $1,500.
 */
export const GLOBAL_MINIMUM = 2500;

const band = (low: number, expected: number, high: number): Band => ({ low, expected, high });

/**
 * FOUNDATIONS — the minimum meaningful implementation, not a starting point to
 * be nickel-and-dimed upward.
 *
 * `marketing_site` deliberately absorbs everything Scenario A asks for: up to
 * six pages, responsive build, contact form, analytics + Search Console,
 * technical SEO foundation, basic on-page work, deployment. A five-page
 * business site is ONE project, not five mini-projects plus a form plus
 * analytics — pricing it that way is the single most common way these
 * calculators become absurd.
 */
export const FOUNDATIONS: Record<FoundationId, FoundationSpec> = {
  marketing_site: {
    id: "marketing_site",
    band: band(3000, 3800, 5000),
    floor: 3000,
    includes: [
      "custom_responsive_build",
      "up_to_six_pages",
      "contact_form",
      "analytics_search_console",
      "technical_seo_foundation",
      "basic_onpage_seo",
      "deployment",
    ],
    studioType: "website",
    suggestedRecurring: ["seo-essentials", "website-care-plan"],
  },
  website_redesign: {
    id: "website_redesign",
    band: band(3400, 4400, 6000),
    floor: 3400,
    includes: [
      "existing_site_audit",
      "custom_responsive_build",
      "url_mapping_redirects",
      "content_transfer",
      "analytics_search_console",
      "technical_seo_foundation",
      "deployment",
    ],
    studioType: "website",
    suggestedRecurring: ["seo-essentials", "website-care-plan"],
  },
  /**
   * Above `marketing_site` on purpose. The published /website-cost-canada table
   * shows ecommerce starting at $5,000 and custom sites at $8,000, which reads
   * as "a store is cheaper than a site" — it is not, and Studio's own model
   * (9000 vs 6500) already said so. Contradiction resolved in favour of
   * monotonicity; the published table describes the whole Canadian market
   * including template stores, which is a different claim.
   */
  ecommerce: {
    id: "ecommerce",
    band: band(6500, 8500, 12000),
    floor: 6500,
    includes: [
      "storefront_build",
      "product_templates",
      "cart_checkout",
      "payments_setup",
      "shipping_tax_config",
      "ecommerce_seo_foundation",
      "analytics_search_console",
      "deployment",
    ],
    studioType: "ecommerce",
    suggestedRecurring: ["seo-essentials", "website-care-plan"],
  },
  business_portal: {
    id: "business_portal",
    band: band(12000, 16500, 23000),
    floor: 12000,
    includes: [
      "authentication",
      "database_design",
      "core_dashboard",
      "admin_crud",
      "hosting_environment",
      "deployment",
    ],
    studioType: "web_app",
    suggestedRecurring: ["website-care-plan"],
  },
  custom_application: {
    id: "custom_application",
    band: band(18000, 25000, 36000),
    floor: 18000,
    includes: [
      "authentication",
      "custom_domain_model",
      "multiple_app_surfaces",
      "admin_surface",
      "database_design",
      "hosting_environment",
      "deployment",
    ],
    studioType: "web_app",
    suggestedRecurring: ["website-care-plan"],
  },
  /**
   * One automation running in production, with the parts that make it survive
   * contact with real data: intake, processing, storage, a human check, and
   * error handling. Deliberately NOT "AI" by default — the AI capabilities add
   * that. A business that wants two tools connected reliably is buying this,
   * and pricing it as if every automation needs a model would be wrong.
   */
  ai_automation: {
    id: "ai_automation",
    band: band(6500, 9000, 14000),
    floor: 6500,
    includes: [
      "one_production_pipeline",
      "data_ingestion",
      "processing_logic",
      "result_storage",
      "human_review_step",
      "error_handling",
      "deployment",
    ],
    studioType: "ai_system",
    suggestedRecurring: [],
  },
  /**
   * SEO is sold as a monthly plan. The project component is the onboarding
   * sprint that has to happen before a retainer can do anything — audit,
   * research, architecture, measurement setup, first fixes. Pricing an SEO
   * engagement as a big build would misrepresent how StillAwake actually
   * sells it.
   */
  seo_engagement: {
    id: "seo_engagement",
    band: band(1500, 2200, 3200),
    floor: 1500,
    includes: [
      "technical_audit",
      "keyword_research",
      "information_architecture",
      "analytics_search_console",
      "initial_fixes",
      "measurement_baseline",
    ],
    studioType: "marketing",
    suggestedRecurring: ["seo-essentials", "seo-advanced"],
  },
  content_system: {
    id: "content_system",
    band: band(4000, 5500, 8000),
    floor: 4000,
    includes: [
      "editorial_schema",
      "cms_workflow",
      "internal_linking_system",
      "metadata_system",
      "publishing_workflow",
      "analytics_search_console",
    ],
    studioType: "marketing",
    suggestedRecurring: ["seo-advanced"],
  },
};

/**
 * COMPLEXITY LADDER — used only where a capability has no qualitative
 * per-tier band.
 *
 * HIGH grows faster than LOW as the tier rises. That is the point: harder work
 * is not just more expensive, it is less predictable, and the range has to say
 * so rather than staying a fixed percentage of a bigger number.
 */
export const COMPLEXITY_FACTORS: Record<Complexity, [number, number, number]> = {
  standard: [1.0, 1.0, 1.0],
  moderate: [1.25, 1.35, 1.5],
  advanced: [1.65, 1.9, 2.2],
  complex: [2.2, 2.8, 3.6],
};

/**
 * SCOPE — diminishing returns, applied only to content-bearing subtotal.
 *
 * Ten static pages can be less work than one application screen, so page count
 * never touches app scope. Doubling from 6 to 12 pages adds 25%; going from 26
 * to 60 adds 40% on top of standard, not 400%.
 */
export const SCOPE_FACTORS: Record<ScopeSize, number> = {
  small: 1.0,
  standard: 1.25,
  large: 1.55,
  very_large: 1.95,
  xl: 2.4,
};

/**
 * How much page count moves each capability group, 0–1.
 *
 * Content work scales with pages almost one-for-one — fifteen pages is fifteen
 * pages of copy and layout. SEO work does not: keyword research, an
 * architecture and a schema strategy are mostly fixed jobs that grow slowly
 * with the site. Commerce, application, integration and AI work do not scale
 * with page count at all, which is the guard against a dashboard getting more
 * expensive because the marketing site around it grew.
 *
 * Without this split a 15-page SEO site priced ~40% above where it belongs,
 * because every SEO line was being multiplied as hard as the copywriting.
 */
export const SCOPE_SENSITIVITY: Record<CapabilityGroup, number> = {
  content: 1,
  seo: 0.4,
  commerce: 0,
  business: 0,
  integration: 0,
  ai: 0,
};

/**
 * BILINGUAL — a fixed implementation cost plus a share of content scope.
 *
 * Routing, hreflang, locale switching and dual sitemaps are a fixed job.
 * Adapting copy is proportional to how much copy there is. Application strings
 * are a much smaller share, hence the split.
 */
export const BILINGUAL = {
  implementation: band(800, 1200, 1800),
  contentShare: 0.35,
  appShare: 0.12,
};

/**
 * INTERACTION — systems that must talk to each other cost more than their sum.
 *
 * Counts advanced/complex capabilities plus integrations, because that is what
 * actually creates cross-system work. Applied evenly across the band: this is
 * real cost, not uncertainty, and the uncertainty already lives in each
 * capability's own spread. Capped so it can never dominate.
 */
export const INTERACTION = { perUnit: 0.05, cap: 0.3 };

/**
 * RANGE AGGREGATION — how independent scope items combine.
 *
 * Adding bands linearly says every part of a project overruns at once. It does
 * not: on a six-capability build some come in under and some over, and the
 * total is far more predictable than the sum of the worst cases. Combining the
 * deviations in quadrature (root-sum-square) is the standard treatment of
 * independent uncertainties, and it is why a well-specified restaurant site
 * quotes a $4k-wide range instead of an $8k one.
 *
 * Set to 1 to fall back to linear addition. Values below 1 would claim the
 * items are anti-correlated, which nothing justifies.
 */
export const AGGREGATION_EXPONENT = 2;

/**
 * RISK — widens the range, never invents effort.
 *
 * Phase 21's rule: when an external system's implementation is unknown, we do
 * not get to guess how hard it is. We say the top of the range is higher.
 * `rush` is the exception — a compressed schedule is real cost, not
 * uncertainty, so it moves all three numbers.
 */
export const RISK = {
  unknownSystemHighShare: 0.25,
  undefinedScopeHighShare: 0.15,
  rushAll: 0.15,
};

/** Rounding steps by magnitude. Low rounds DOWN, high rounds UP — never narrower than computed. */
export const ROUNDING: { upTo: number; step: number }[] = [
  { upTo: 10000, step: 250 },
  { upTo: 30000, step: 500 },
  { upTo: Infinity, step: 1000 },
];

/**
 * CAPABILITIES.
 *
 * Grouped implementation effort, not a surcharge menu. Anything a foundation
 * already ships is declared in `includedIn` and priced at zero there, so a
 * client cannot be charged for "analytics" on a site that always includes it.
 */
export const CAPABILITIES: CapabilitySpec[] = [
  /* ── CONTENT / STRUCTURE ───────────────────────────────────────────────── */
  {
    id: "copywriting",
    group: "content",
    base: band(1200, 1800, 2800),
    allowed: ["standard", "moderate", "advanced"],
  },
  {
    id: "content_migration",
    group: "content",
    base: band(600, 1000, 1800),
    allowed: ["standard", "moderate", "advanced"],
    includedIn: ["website_redesign"],
  },
  {
    id: "blog_system",
    group: "content",
    base: band(900, 1400, 2200),
    allowed: ["standard", "moderate"],
    includedIn: ["content_system"],
  },
  {
    id: "cms",
    group: "content",
    base: band(1200, 1800, 2800),
    allowed: ["standard", "moderate", "advanced"],
    includedIn: ["content_system"],
  },
  {
    id: "dynamic_content",
    group: "content",
    base: band(2000, 3000, 4800),
    allowed: ["standard", "moderate", "advanced", "complex"],
    // A collection template is built once; more entries barely move it.
    scopeSensitivity: 0.2,
  },

  /* ── SEO ───────────────────────────────────────────────────────────────── */
  {
    id: "keyword_research",
    group: "seo",
    base: band(700, 1000, 1500),
    allowed: ["standard", "moderate"],
    includedIn: ["seo_engagement"],
  },
  {
    id: "local_seo",
    group: "seo",
    base: band(800, 1200, 1800),
    allowed: ["standard", "moderate", "advanced"],
  },
  {
    id: "advanced_onpage",
    group: "seo",
    base: band(900, 1400, 2200),
    allowed: ["standard", "moderate", "advanced"],
    includedIn: ["seo_engagement"],
  },
  {
    id: "schema_markup",
    group: "seo",
    base: band(500, 800, 1200),
    allowed: ["standard", "moderate", "advanced"],
  },
  {
    id: "multi_location",
    group: "seo",
    base: band(1200, 1800, 3000),
    allowed: ["standard", "moderate", "advanced", "complex"],
  },
  {
    id: "content_strategy",
    group: "seo",
    base: band(900, 1400, 2200),
    allowed: ["standard", "moderate", "advanced"],
    includedIn: ["content_system"],
  },
  {
    id: "programmatic_content",
    group: "seo",
    base: band(3500, 5500, 9000),
    allowed: ["moderate", "advanced", "complex"],
    // The pipeline is the cost. Charging it per generated page would price
    // away the one thing programmatic content is for.
    scopeSensitivity: 0,
  },

  /* ── COMMERCE ──────────────────────────────────────────────────────────── */
  {
    id: "large_catalogue",
    group: "commerce",
    base: band(1200, 2000, 3500),
    allowed: ["standard", "moderate", "advanced"],
  },
  {
    id: "subscriptions",
    group: "commerce",
    base: band(1800, 2800, 4500),
    allowed: ["standard", "moderate", "advanced"],
  },
  /**
   * The clearest case for qualitative tiers. "Online ordering" spans an
   * embedded third-party widget and a full native ordering stack with dispatch
   * — an eightfold spread that no multiplier on one base can honestly express.
   */
  {
    id: "online_ordering",
    group: "commerce",
    base: band(1500, 2400, 4000),
    bands: {
      standard: band(1500, 2400, 4000),
      moderate: band(3500, 5500, 9000),
      advanced: band(7000, 11000, 18000),
      complex: band(12000, 19000, 32000),
    },
    allowed: ["standard", "moderate", "advanced", "complex"],
  },
  {
    id: "delivery_pickup",
    group: "commerce",
    base: band(1500, 2400, 4000),
    allowed: ["standard", "moderate", "advanced"],
  },
  {
    id: "inventory_sync",
    group: "commerce",
    base: band(1500, 2500, 4500),
    allowed: ["standard", "moderate", "advanced", "complex"],
    externalSystem: true,
  },
  {
    id: "customer_accounts",
    group: "commerce",
    base: band(1200, 2000, 3500),
    allowed: ["standard", "moderate", "advanced"],
  },
  {
    id: "pos_integration",
    group: "commerce",
    base: band(1200, 2000, 3500),
    bands: {
      standard: band(1200, 2000, 3500),
      moderate: band(2500, 4200, 7500),
      advanced: band(5000, 8500, 15000),
      complex: band(9000, 15000, 28000),
    },
    allowed: ["standard", "moderate", "advanced", "complex"],
    externalSystem: true,
  },

  /* ── BUSINESS FUNCTIONALITY ────────────────────────────────────────────── */
  {
    id: "authentication",
    group: "business",
    base: band(1200, 1800, 2800),
    allowed: ["standard", "moderate", "advanced"],
    includedIn: ["business_portal", "custom_application"],
  },
  {
    id: "roles_permissions",
    group: "business",
    base: band(1500, 2400, 4000),
    allowed: ["standard", "moderate", "advanced", "complex"],
  },
  {
    id: "dashboard_reporting",
    group: "business",
    base: band(2000, 3200, 5500),
    allowed: ["standard", "moderate", "advanced", "complex"],
  },
  {
    id: "client_portal",
    group: "business",
    base: band(3000, 4800, 8000),
    allowed: ["standard", "moderate", "advanced", "complex"],
  },
  {
    id: "admin_portal",
    group: "business",
    base: band(2500, 4000, 6500),
    allowed: ["standard", "moderate", "advanced"],
    // Both portal foundations already ship admin management screens.
    includedIn: ["business_portal", "custom_application"],
  },
  {
    id: "documents_uploads",
    group: "business",
    base: band(1200, 2000, 3500),
    allowed: ["standard", "moderate", "advanced"],
  },
  {
    id: "notifications",
    group: "business",
    base: band(800, 1400, 2400),
    allowed: ["standard", "moderate", "advanced"],
  },
  {
    id: "workflow_management",
    group: "business",
    base: band(2500, 4200, 7500),
    allowed: ["standard", "moderate", "advanced", "complex"],
  },
  {
    id: "app_payments",
    group: "business",
    base: band(1800, 2800, 4500),
    allowed: ["standard", "moderate", "advanced", "complex"],
  },
  /**
   * Booking is the Phase 5 worked example. A link to Calendly and a custom
   * multi-resource availability engine are the same word and a 15× cost
   * difference, so the tiers are declared outright.
   */
  {
    id: "booking",
    group: "business",
    base: band(400, 700, 1200),
    bands: {
      standard: band(400, 700, 1200),
      moderate: band(1400, 2200, 3800),
      advanced: band(3500, 5500, 9000),
      complex: band(6000, 9500, 16000),
    },
    allowed: ["standard", "moderate", "advanced", "complex"],
  },

  /* ── INTEGRATIONS ──────────────────────────────────────────────────────── */
  {
    id: "crm_integration",
    group: "integration",
    base: band(700, 1200, 2200),
    allowed: ["standard", "moderate", "advanced"],
    externalSystem: true,
  },
  {
    id: "email_marketing",
    group: "integration",
    base: band(500, 900, 1600),
    allowed: ["standard", "moderate"],
    externalSystem: true,
  },
  {
    id: "advanced_analytics",
    group: "integration",
    base: band(700, 1200, 2000),
    allowed: ["standard", "moderate", "advanced"],
  },
  {
    id: "third_party_api",
    group: "integration",
    base: band(700, 1200, 2200),
    allowed: ["standard", "moderate", "advanced", "complex"],
    externalSystem: true,
  },
  /**
   * Deliberately the widest band in the model. An undocumented in-house system
   * is the one thing we genuinely cannot size before touching it, and Phase 21
   * forbids pretending otherwise.
   */
  {
    id: "legacy_system",
    group: "integration",
    base: band(1200, 2500, 6000),
    allowed: ["moderate", "advanced", "complex"],
    externalSystem: true,
  },

  /* ── AI / AUTOMATION ───────────────────────────────────────────────────── */
  {
    id: "ai_assistant",
    group: "ai",
    base: band(3000, 5000, 9000),
    allowed: ["standard", "moderate", "advanced", "complex"],
  },
  {
    id: "document_processing",
    group: "ai",
    base: band(2500, 4200, 7500),
    allowed: ["standard", "moderate", "advanced", "complex"],
    includedIn: ["ai_automation"],
  },
  {
    id: "content_automation",
    group: "ai",
    base: band(2000, 3500, 6000),
    allowed: ["standard", "moderate", "advanced"],
  },
  {
    id: "classification_extraction",
    group: "ai",
    base: band(2000, 3200, 5500),
    allowed: ["standard", "moderate", "advanced", "complex"],
  },
  {
    id: "workflow_automation",
    group: "ai",
    base: band(1500, 2500, 4500),
    allowed: ["standard", "moderate", "advanced", "complex"],
  },
  {
    id: "business_intelligence",
    group: "ai",
    base: band(2500, 4000, 7000),
    allowed: ["standard", "moderate", "advanced"],
  },
  {
    id: "custom_ai_pipeline",
    group: "ai",
    base: band(5000, 8500, 15000),
    allowed: ["moderate", "advanced", "complex"],
  },
];

export const CAPABILITY_BY_ID: Record<string, CapabilitySpec> = Object.fromEntries(
  CAPABILITIES.map((c) => [c.id, c]),
);

/**
 * RECURRING SERVICES — mirrored from Supabase `service_products`, verified
 * 2026-08-14.
 *
 * `approved: false` rows carry the catalogue's candidate price for the
 * operator's reference but MUST NOT be published: they are draft rows Jaeden
 * has not activated, and Phase 21 forbids inventing or leaking a price
 * StillAwake has not agreed to charge. The public surface reads `monthly` only
 * when `approved` is true, and shows "quoted in writing" otherwise.
 *
 * `ai-search-optimization` is deliberately absent. It exists as a $600 draft
 * AND inside SEO Advanced at $850; offering both would double-charge for the
 * same work.
 */
export const RECURRING: RecurringSpec[] = [
  { id: "seo-essentials", monthly: 600, approved: true, studioSlug: "seo-essentials" },
  { id: "seo-advanced", monthly: 850, approved: true, studioSlug: "seo-advanced" },
  { id: "website-care-plan", monthly: 150, approved: false, studioSlug: "website-care-plan" },
  { id: "managed-hosting", monthly: 40, approved: false, studioSlug: "managed-hosting" },
  { id: "content-creation", monthly: 1200, approved: false, studioSlug: "content-creation" },
];

export const RECURRING_BY_ID: Record<string, RecurringSpec> = Object.fromEntries(
  RECURRING.map((r) => [r.id, r]),
);

/**
 * Checksum of the model content above, from `scripts/sync-pricing.mjs`.
 * `model.test.ts` recomputes it, so an unsynced hand-edit fails the suite in
 * whichever repo it happened.
 */
export const MODEL_CHECKSUM = "1ec58d2b77e203e6";
