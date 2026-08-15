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
 * Everything below is DAYS OF WORK × A DAY RATE. Nothing is a market
 * observation and nothing is a round number someone liked the look of. If a
 * price cannot be read back as "N days at $R", it does not belong here.
 *
 * The previous model (2026.08.1) was calibrated against the ranges published
 * on /website-cost-canada, which turned out to be the wrong anchor: it priced
 * a custom small site at $3,000–5,000, i.e. under two days of work, while
 * promising a custom responsive build. That is a productized price attached to
 * custom promises. Rebuilt on the day model, the same site is 4.5–7 days —
 * $8,000–13,000 — which is what StillAwake's own published page already said
 * custom-designed sites cost.
 *
 * The gap that opened between $3,500 and $8,000 is deliberate. It is the line
 * between buying a PRODUCT and hiring a STUDIO, and having a real product on
 * the near side of it is what stops small clients being either overcharged or
 * turned away.
 *
 * CHANGING PRICES
 * Edit the days or the rates, bump PRICING_VERSION, run
 * `node scripts/sync-pricing.mjs`, then `npm test` in both repos.
 */

import type {
  AddonId,
  AddonSpec,
  Days,
  Discipline,
  OrgFactorId,
  OrgFactorSpec,
  RecurringSpec,
  ServiceLineId,
  ServiceLineSpec,
} from "./types";

/** Bump on ANY change below. Every stored estimate records the version that produced it. */
export const PRICING_VERSION = "2026.08.2";

export const CURRENCY = "CAD";

/**
 * DAY RATES.
 *
 * Derived from cost recovery, not aspiration: roughly 220 working days a year,
 * of which a solo operator bills about 55% once sales, admin and marketing are
 * paid for — call it 120 billable days. $1,800 × 120 is a realistic senior
 * independent income in Canada, and it is the planning rate everything else
 * hangs off.
 *
 * The tiers above it are not different people. They are different kinds of
 * work, and the market prices judgement above execution everywhere.
 */
export const DAY_RATES: Record<Discipline, number> = {
  build: 1800,
  systems: 2100,
  ai: 2500,
  advisory: 2500,
};

/**
 * The floor for a BUILD engagement.
 *
 * Below this the scoping, review, deployment and handover cost more than the
 * work. It is also, deliberately, the price of the Launch product: the
 * smallest thing StillAwake sells is a real product with hard limits, not a
 * discounted custom project.
 */
export const MINIMUM = 2500;

/**
 * Above this expected value, a form cannot honestly scope the work.
 *
 * Agencies do not quote platforms off a questionnaire — they sell a paid
 * discovery phase that produces a specification, then price the build from it.
 * Past this line the calculator stops emitting a range and starts selling
 * discovery, because a confident number here would be the least honest thing
 * on the page.
 */
export const DISCOVERY_THRESHOLD = 40000;

/**
 * Software is ALWAYS scoped before it is priced, whatever the number says.
 *
 * A $30,000 website is a well-understood deliverable and quotable from a form.
 * A $30,000 application is not: the requirements are the expensive part and
 * they do not exist yet. Value alone was the wrong trigger — it sent a
 * mid-market brochure site to discovery while letting a small internal tool
 * through with a confident number.
 */
export const DISCOVERY_ALWAYS_LINES: ServiceLineId[] = ["software"];

/**
 * Paid discovery: a real product, credited against the build that follows.
 *
 * Roughly 1.5–3 advisory days producing a written scope, an architecture and a
 * fixed build price. It is the honest answer to "what would something like
 * this cost" — you find out by paying someone to find out.
 */
export const DISCOVERY = { from: 3500, creditedAgainstBuild: true };

const days = (low: number, expected: number, high: number): Days => ({ low, expected, high });

/**
 * SERVICE LINES — what StillAwake is being asked to do.
 *
 * These COMBINE. A clinic can want positioning, a site and an SEO programme,
 * and that is three lines, not one "project type". The old model forced a
 * single foundation and demoted everything else to add-ons, which is why its
 * first question offered four overlapping options as though they were
 * alternatives.
 */
export const SERVICE_LINES: Record<ServiceLineId, ServiceLineSpec> = {
  brand: {
    id: "brand",
    discipline: "build",
    depths: [
      { id: "refresh", days: days(1.5, 2, 2.5) },
      { id: "identity", days: days(4, 6, 8) },
      // Naming, messaging and positioning is strategy work before it is design
      // work, so it prices at the advisory rate.
      { id: "positioning", days: days(7, 10, 14), discipline: "advisory" },
    ],
  },

  website: {
    id: "website",
    discipline: "build",
    depths: [
      /**
       * The product. Viable at this price ONLY because scope is capped: our
       * own starter, their existing brand applied to a known layout, final
       * copy supplied, one revision round. Roughly two days.
       */
      { id: "launch", days: days(1.4, 1.7, 2), productized: true },
      { id: "custom", days: days(4.5, 5.5, 7) },
      { id: "flagship", days: days(10, 14, 20) },
    ],
    addons: ["bookings", "ordering", "accounts", "payments", "multi_location", "custom_functionality"],
  },

  store: {
    id: "store",
    discipline: "build",
    depths: [
      { id: "simple", days: days(3, 4, 5.5) },
      { id: "proper", days: days(7, 9, 12) },
      { id: "custom_commerce", days: days(15, 20, 28), discipline: "systems" },
    ],
    addons: ["ordering", "accounts", "multi_location", "custom_functionality"],
  },

  seo: {
    id: "seo",
    discipline: "build",
    depths: [
      // Technical foundations laid during a build: crawlability, schema,
      // metadata, Search Console. Execution, not strategy — and absorbed by
      // any build, because every StillAwake build already lays them.
      { id: "foundations", days: days(1, 1.5, 2), absorbedBy: ["website", "store"] },
      { id: "research", days: days(2.5, 3.5, 4.5), discipline: "advisory" },
      { id: "programme", days: days(4, 5.5, 7.5), discipline: "advisory" },
    ],
    addons: ["multi_location"],
  },

  content: {
    id: "content",
    discipline: "build",
    depths: [
      { id: "structure", days: days(1, 1.5, 2.5) },
      { id: "produce", days: days(3, 5, 8) },
      { id: "pipeline", days: days(8, 12, 16), discipline: "systems" },
    ],
  },

  software: {
    id: "software",
    discipline: "systems",
    depths: [
      { id: "internal_tool", days: days(12, 16, 22) },
      { id: "customer_product", days: days(20, 28, 40) },
      { id: "platform", days: days(35, 50, 75) },
    ],
    addons: ["accounts", "payments", "custom_functionality"],
  },

  automation: {
    id: "automation",
    discipline: "ai",
    depths: [
      { id: "connect", days: days(2, 3, 4), discipline: "systems" },
      { id: "process", days: days(6, 8, 12) },
      { id: "intelligent", days: days(12, 18, 24) },
    ],
  },
};

/**
 * ADD-ONS — things that materially change the build without changing the line.
 *
 * Kept deliberately short. A long menu of small surcharges is how these tools
 * become absurd; only items that move the number by a meaningful fraction of a
 * day earn a place.
 */
export const ADDONS: Record<AddonId, AddonSpec> = {
  /**
   * The clearest case for variants. "Booking" spans a styled link to a
   * scheduling tool and a custom availability engine with staff and resource
   * rules — a tenfold spread that no single band describes honestly.
   */
  bookings: {
    id: "bookings",
    days: days(1, 1.5, 2.5),
    variants: [
      { id: "link", days: days(0.3, 0.5, 0.8) },
      { id: "embedded", days: days(1, 1.5, 2.5) },
      { id: "custom", days: days(3, 4.5, 7) },
    ],
  },
  ordering: {
    id: "ordering",
    days: days(2.5, 3.5, 5),
    variants: [
      { id: "link", days: days(0.5, 0.8, 1.2) },
      { id: "onsite", days: days(2.5, 3.5, 5) },
      // Ordering plus dispatch, pickup and the till system they already run.
      { id: "full", days: days(6, 8, 12) },
    ],
    externalSystem: true,
  },
  accounts: { id: "accounts", days: days(1, 1.5, 2.5) },
  payments: { id: "payments", days: days(1, 1.5, 2.5) },
  multi_location: { id: "multi_location", days: days(1, 1.5, 2.5) },
  custom_functionality: {
    id: "custom_functionality",
    days: days(2, 3.5, 6),
    // By definition not yet described, so it widens the top rather than
    // pretending to a number.
    externalSystem: true,
  },
};

/**
 * ORGANISATIONAL COMPLEXITY — why a mid-market firm pays more for the same site.
 *
 * Every one of these is real, itemisable work, which is the whole point. This
 * is NOT a proxy for company size and NOT a test of what the buyer will
 * tolerate: a solo operator selects none and pays the base price, and a
 * fifty-person firm selects all four because serving them genuinely involves
 * all four. Published, consistent, and explainable line by line — which
 * matters for a studio whose brand is "the prices are on the page".
 *
 * All four together is ~3×, which is the honest multiple on enterprise
 * overhead and matches what agencies charge for the same deliverable.
 */
export const ORG_FACTORS: Record<OrgFactorId, OrgFactorSpec> = {
  /** Several stakeholders, several review rounds, calendars that do not align. */
  approvals: { id: "approvals", factor: 1.4 },
  /** WCAG/AODA conformance: real implementation and real testing. */
  compliance: { id: "compliance", factor: 1.45 },
  /** Systems we do not control and cannot see inside before starting. */
  integrations: { id: "integrations", factor: 1.3, addsUncertainty: true },
  /** Training sessions and documentation their team can actually use. */
  training: { id: "training", factor: 1.15 },
};

/**
 * RISK — widens the range, never invents effort.
 *
 * When the scope is genuinely open we do not get to guess how big it is; we
 * say the top is higher. `rush` is the exception: a compressed schedule is
 * real cost, so it moves all three numbers.
 */
export const RISK = {
  unknownSystemHighShare: 0.25,
  undefinedScopeHighShare: 0.15,
  rushAll: 0.15,
};

/**
 * RANGE AGGREGATION — how independent lines combine.
 *
 * Adding bands linearly says every part of an engagement overruns at once. It
 * does not: across four lines some come in under and some over, and the total
 * is far more predictable than the sum of the worst cases. Combining
 * deviations in quadrature is the standard treatment of independent
 * uncertainties. Set to 1 for linear addition.
 */
export const AGGREGATION_EXPONENT = 2;

/** Rounding steps by magnitude. Low rounds DOWN, high rounds UP. */
export const ROUNDING: { upTo: number; step: number }[] = [
  { upTo: 10000, step: 250 },
  { upTo: 30000, step: 500 },
  { upTo: Infinity, step: 1000 },
];

/** Budget bands, matching the Studio intake's own options. */
export const BUDGET_BANDS: Record<string, { low: number; high: number }> = {
  under_5k: { low: 0, high: 5000 },
  "5_15k": { low: 5000, high: 15000 },
  "15_50k": { low: 15000, high: 50000 },
  "50k_plus": { low: 50000, high: Infinity },
};

/**
 * What each depth actually ships. Drives the "includes approximately" list, so
 * it has to describe the deliverable honestly — a productized launch must not
 * borrow a custom build's promises.
 */
export const DEPTH_INCLUDES: Record<string, string[]> = {
  "website.launch": [
    "starter_layout",
    "your_brand_applied",
    "up_to_five_pages",
    "contact_form",
    "analytics_search_console",
    "technical_seo_foundation",
    "one_revision_round",
    "deployment",
  ],
  "website.custom": [
    "original_design",
    "custom_responsive_build",
    "content_structure",
    "contact_form",
    "analytics_search_console",
    "technical_seo_foundation",
    "cms_editing",
    "deployment",
  ],
  "website.flagship": [
    "original_design",
    "custom_responsive_build",
    "design_system",
    "content_structure",
    "cms_editing",
    "analytics_search_console",
    "technical_seo_foundation",
    "deployment",
  ],
  "brand.refresh": ["logo_refinement", "colour_type", "basic_guidelines"],
  "brand.identity": ["logo_system", "colour_type", "brand_guidelines", "asset_kit"],
  "brand.positioning": ["market_positioning", "naming_messaging", "logo_system", "brand_guidelines", "launch_assets"],
  "store.simple": ["storefront_build", "product_templates", "cart_checkout", "payments_setup", "shipping_tax_config", "deployment"],
  "store.proper": ["storefront_build", "product_templates", "cart_checkout", "payments_setup", "shipping_tax_config", "ecommerce_seo_foundation", "cms_editing", "deployment"],
  "store.custom_commerce": ["custom_storefront", "product_templates", "cart_checkout", "payments_setup", "operations_workflow", "ecommerce_seo_foundation", "deployment"],
  "seo.foundations": ["technical_seo_foundation", "schema_markup", "analytics_search_console"],
  "seo.research": ["keyword_research", "information_architecture", "onpage_optimization", "measurement_baseline"],
  "seo.programme": ["technical_audit", "keyword_research", "information_architecture", "onpage_optimization", "content_plan", "measurement_baseline"],
  "content.structure": ["editorial_schema", "cms_workflow", "publishing_workflow"],
  "content.produce": ["content_plan", "written_content", "internal_linking_system", "metadata_system"],
  "content.pipeline": ["editorial_schema", "cms_workflow", "content_automation", "internal_linking_system", "metadata_system", "publishing_workflow"],
  "software.internal_tool": ["authentication", "database_design", "core_screens", "admin_crud", "hosting_environment", "deployment"],
  "software.customer_product": ["authentication", "roles_permissions", "database_design", "customer_surface", "admin_surface", "hosting_environment", "deployment"],
  "software.platform": ["authentication", "roles_permissions", "database_design", "multiple_surfaces", "admin_surface", "hosting_environment", "deployment"],
  "automation.connect": ["data_ingestion", "processing_logic", "error_handling", "deployment"],
  "automation.process": ["data_ingestion", "processing_logic", "human_review_step", "result_storage", "error_handling", "deployment"],
  "automation.intelligent": ["data_ingestion", "ai_processing", "classification_extraction", "human_review_step", "result_storage", "error_handling", "deployment"],
};

/**
 * RECURRING SERVICES — mirrored from Supabase `service_products`, verified
 * 2026-08-14.
 *
 * `approved: false` rows carry the catalogue's candidate price for the
 * operator's reference but MUST NOT be published: they are draft rows that
 * have not been activated, and publishing one would be inventing a price
 * StillAwake has not agreed to charge. The public surface reads `monthly` only
 * when `approved` is true.
 *
 * Recurring pricing is out of scope for this revision and is being revisited
 * separately; these values are carried across unchanged from 2026.08.1.
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

/** Which recurring services genuinely follow from a line. */
export const LINE_RECURRING: Partial<Record<ServiceLineId, string[]>> = {
  website: ["website-care-plan"],
  store: ["website-care-plan"],
  seo: ["seo-essentials"],
  content: ["seo-advanced"],
  software: ["website-care-plan"],
};

/**
 * Checksum of the model content above, written by `scripts/sync-pricing.mjs`.
 * `model.test.ts` recomputes it, so an unsynced hand-edit fails the suite in
 * whichever repo it happened.
 */
export const MODEL_CHECKSUM = "ad57e5ce4780883d";
