/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SHARED PRICING KERNEL — 2 of 5 · THE CANONICAL PRICING MODEL
 *
 * CANONICAL SOURCE: stillawake-media (.com). Synced to .dev by
 * `scripts/sync-pricing.mjs`. Hand-editing the .dev copy fails its own test.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * THESE ARE SELLING PRICES, NOT COST ACCOUNTING.
 *
 * Each entry carries what StillAwake charges AND what it takes to deliver. The
 * price is the primary number; the days are the check. That inversion is the
 * point of this revision — the previous model multiplied days by a rate and
 * published the answer, producing numbers no local business would sit still
 * for.
 *
 * THE CENTRE OF THE MODEL is a professional local-business website: home,
 * about, contact, three to eight service pages, responsive, forms, analytics,
 * Search Console, schema, technical SEO, CMS editing, launch. That is
 * $4,000–7,000, and everything else is calibrated outward from it.
 *
 * THE BANDS ARE ASYMMETRIC, AND THAT IS THE WHOLE MECHANISM.
 *
 * The low is the simplest realistic build of what was selected — supplied
 * content, normal scope, no surprises. The high is the same selection once
 * content, design involvement, integrations, locations, migration and revision
 * rounds turn out to be substantial. They are NOT a confidence interval around
 * one number, and they must never move together: collapsing a $2,500–$5,500
 * project into a $5,000 floor because the involved version costs $5,500 is
 * precisely how an approachable estimate becomes an intimidating one.
 *
 * Additions follow the same rule. Connecting a booking provider is +$250 at
 * the low end and +$1,400 at the high, because the simple case is genuinely
 * embedding and configuring, while the involved case is styling, syncing and
 * mapping data.
 *
 * WHY THESE PRICES AND NOT AGENCY PRICES
 * Reusable architecture and AI-assisted implementation mean a site that takes
 * a conventional studio three weeks takes us a few focused days. Pricing that
 * as though we carried a project manager, a designer and two developers would
 * be charging for overhead we do not have. The efficiency shows up as
 * throughput, not as rate — the implied day rates here sit around $1,200–1,300
 * against an $1,800 planning rate, and `internalValue` on every estimate makes
 * that gap visible internally so the position is chosen rather than drifted
 * into.
 *
 * CHANGING PRICES
 * Edit the values, bump PRICING_VERSION, run `node scripts/sync-pricing.mjs`,
 * then `npm test` in both repos.
 */

import type {
  AdditionId,
  AdditionSpec,
  Band,
  BaseId,
  BaseSpec,
  Days,
  RecurringSpec,
  SeoScopeId,
  SeoScopeSpec,
} from "./types";

export const PRICING_VERSION = "2026.08.4";
export const CURRENCY = "CAD";

const p = (low: number, expected: number, high: number): Band => ({ low, expected, high });
const d = (low: number, expected: number, high: number): Days => ({ low, expected, high });

/**
 * The internal planning rate — what a day of StillAwake's time is worth.
 *
 * NOT the retail formula. It exists so the internal estimator can show whether
 * a price leaves money on the table, and so tests can fail if anything drifts
 * below the floor. Selling under it deliberately, because we are fast, is a
 * strategy. Selling under it by accident is a leak.
 */
export const PLANNING_DAY_RATE = 1800;

/** Nothing may imply less than this per day — a tripwire against silent underpricing. */
export const MIN_IMPLIED_DAY_RATE = 1000;

/**
 * The entry floor. Genuinely reachable, and it means genuinely limited scope:
 * one to three primary templates, existing branding, client-supplied content,
 * responsive build, a contact route, analytics, launch. Nothing here silently
 * includes copywriting, ten service pages, locations, commerce or integrations
 * — every one of those is a priced addition, so the floor cannot quietly
 * absorb them.
 */
export const MINIMUM = 1800;

/**
 * Sheer size. Past here the useful advice is to phase the work rather than
 * quote all of it — but this is only ONE of four discovery triggers and the
 * other three are about uncertainty. A big website is still a website.
 */
export const DISCOVERY_SIZE_THRESHOLD = 40000;

/** Paid discovery: a real product, credited against the build that follows. */
export const DISCOVERY = { from: 1800, creditedAgainstBuild: true };

/**
 * BASES — what the project fundamentally is. Exactly one.
 *
 * Website tiers are sized by content in the client's terms: a few core pages,
 * a normal business site, or one with many services, locations or sections.
 * Never by asking them to count components.
 */
export const BASES: Record<BaseId, BaseSpec> = {
  /** The product. Our layout, their brand, hard caps — that is what makes the price. */
  website_small: {
    id: "website_small",
    productized: true,
    price: p(1600, 2100, 2900),
    days: d(1.3, 1.7, 2.3),
    lowAssumption: "supplied_content_simple",
    highAssumption: "more_pages_or_design",
    includes: [
      "polished_design",
      "up_to_five_pages",
      "responsive",
      "contact_form",
      "cms_editing",
      "analytics_search_console",
      "technical_seo",
      "schema",
      "deployment",
    ],
    additions: ["content_help", "content_full", "bookings", "payments", "connect_tools", "content_migration", "custom_functionality"],
  },

  /** THE CENTRE OF THE MODEL. A real local-business website, done properly. */
  website_standard: {
    id: "website_standard",
    price: p(2200, 3200, 4800),
    days: d(1.8, 2.6, 3.9),
    lowAssumption: "supplied_content_normal",
    highAssumption: "more_content_and_design",
    includes: [
      "custom_design",
      "home_about_contact",
      "service_pages",
      "responsive",
      "lead_forms",
      "cms_editing",
      "analytics_search_console",
      "technical_seo",
      "schema",
      "social_links",
      "deployment",
    ],
    additions: ["content_help", "content_full", 
      "bookings",
      "ordering",
      "payments",
      "accounts",
      "sell_products",
      "multi_location",
      "connect_tools",
      "connect_internal",
      "content_migration",
      "accessibility",
      "stakeholders",
      "custom_functionality",
    ],
  },

  website_large: {
    id: "website_large",
    price: p(3600, 5400, 8200),
    days: d(2.9, 4.3, 6.6),
    lowAssumption: "clear_structure_supplied_content",
    highAssumption: "original_content_and_architecture",
    includes: [
      "custom_design",
      "design_system",
      "many_service_pages",
      "responsive",
      "lead_forms",
      "cms_editing",
      "content_structure",
      "analytics_search_console",
      "technical_seo",
      "schema",
      "deployment",
    ],
    additions: ["content_help", "content_full", 
      "bookings",
      "ordering",
      "payments",
      "accounts",
      "sell_products",
      "multi_location",
      "connect_tools",
      "connect_internal",
      "content_migration",
      "accessibility",
      "stakeholders",
      "custom_functionality",
    ],
  },

  /** Shopify configured properly — not a custom commerce engine. */
  store_standard: {
    id: "store_standard",
    price: p(3600, 5400, 8000),
    days: d(2.9, 4.3, 6.4),
    lowAssumption: "catalogue_supplied",
    highAssumption: "catalogue_and_theme_work",
    includes: [
      "storefront_setup",
      "theme_customised",
      "product_templates",
      "normal_catalogue",
      "payments_setup",
      "shipping_tax_config",
      "analytics_search_console",
      "technical_seo",
      "deployment",
    ],
    additions: ["content_help", "content_full", "accounts", "multi_location", "connect_tools", "connect_internal", "content_migration", "custom_functionality"],
  },

  store_large: {
    id: "store_large",
    price: p(8000, 11000, 16000),
    days: d(6.4, 8.8, 12.8),
    lowAssumption: "catalogue_supplied",
    highAssumption: "operations_and_theme_work",
    includes: [
      "storefront_setup",
      "custom_theme",
      "product_templates",
      "large_catalogue",
      "payments_setup",
      "shipping_tax_config",
      "operations_workflow",
      "analytics_search_console",
      "technical_seo",
      "deployment",
    ],
    additions: ["content_help", "content_full", "accounts", "multi_location", "connect_tools", "connect_internal", "content_migration", "custom_functionality"],
  },

  /** A commerce engine rather than a configured platform. Software, so scoped first. */
  store_custom: {
    id: "store_custom",
    alwaysDiscovery: true,
    price: p(16000, 22000, 32000),
    days: d(12, 17, 25),
    lowAssumption: "scoped_before_build",
    highAssumption: "scoped_before_build",
    includes: ["custom_commerce", "product_templates", "payments_setup", "operations_workflow", "deployment"],
    additions: ["accounts", "connect_internal", "custom_functionality"],
  },

  brand_refresh: {
    id: "brand_refresh",
    price: p(900, 1400, 2200),
    days: d(0.7, 1.1, 1.8),
    lowAssumption: "existing_assets_usable",
    highAssumption: "more_exploration",
    includes: ["logo_refinement", "colour_type", "basic_guidelines"],
    additions: [],
  },
  brand_identity: {
    id: "brand_identity",
    price: p(2500, 3600, 5500),
    days: d(2, 2.9, 4.4),
    lowAssumption: "clear_direction",
    highAssumption: "more_exploration",
    includes: ["logo_system", "colour_type", "brand_guidelines", "asset_kit"],
    additions: [],
  },
  brand_positioning: {
    id: "brand_positioning",
    price: p(5000, 7500, 11000),
    days: d(4, 6, 8.8),
    lowAssumption: "clear_direction",
    highAssumption: "more_exploration",
    includes: ["market_positioning", "naming_messaging", "logo_system", "brand_guidelines", "launch_assets"],
    additions: [],
  },

  /** Advisory work on a site that already exists. No build attached. */
  seo_engagement: {
    id: "seo_engagement",
    price: p(1500, 2600, 4500),
    days: d(1.2, 2, 3.5),
    lowAssumption: "single_location_focused",
    highAssumption: "competitive_or_multi_location",
    includes: [
      "technical_audit",
      "keyword_research",
      "information_architecture",
      "onpage_optimization",
      "measurement_baseline",
    ],
    additions: ["multi_location", "connect_tools"],
  },

  software_dashboard: {
    id: "software_dashboard",
    price: p(12000, 17000, 25000),
    days: d(9.5, 13.5, 20),
    lowAssumption: "known_requirements",
    highAssumption: "more_workflows_and_integrations",
    includes: [
      "authentication",
      "database_design",
      "core_screens",
      "reporting",
      "admin_crud",
      "hosting_environment",
      "deployment",
    ],
    additions: ["accounts", "payments", "connect_tools", "connect_internal", "custom_functionality"],
  },
  software_portal: {
    id: "software_portal",
    alwaysDiscovery: true,
    price: p(18000, 26000, 38000),
    days: d(14, 20.5, 30),
    lowAssumption: "scoped_before_build",
    highAssumption: "scoped_before_build",
    includes: [
      "authentication",
      "roles_permissions",
      "database_design",
      "customer_surface",
      "admin_surface",
      "hosting_environment",
      "deployment",
    ],
    additions: ["payments", "connect_tools", "connect_internal", "custom_functionality"],
  },
  software_platform: {
    id: "software_platform",
    alwaysDiscovery: true,
    price: p(35000, 55000, 85000),
    days: d(28, 44, 68),
    lowAssumption: "scoped_before_build",
    highAssumption: "scoped_before_build",
    includes: [
      "authentication",
      "roles_permissions",
      "database_design",
      "multiple_surfaces",
      "admin_surface",
      "hosting_environment",
      "deployment",
    ],
    additions: ["payments", "connect_tools", "connect_internal", "custom_functionality"],
  },

  /** Wiring two things together reliably. Not an AI project. */
  automation_connect: {
    id: "automation_connect",
    price: p(1200, 2000, 3500),
    days: d(1, 1.6, 2.8),
    lowAssumption: "documented_tools",
    highAssumption: "undocumented_or_messy_data",
    includes: ["data_ingestion", "processing_logic", "error_handling", "deployment"],
    additions: ["connect_tools", "connect_internal"],
  },
  automation_workflow: {
    id: "automation_workflow",
    price: p(4000, 6500, 10000),
    days: d(3.2, 5.2, 8),
    lowAssumption: "documented_tools",
    highAssumption: "more_steps_and_exceptions",
    includes: [
      "data_ingestion",
      "processing_logic",
      "human_review_step",
      "result_storage",
      "error_handling",
      "deployment",
    ],
    additions: ["connect_tools", "connect_internal", "custom_functionality"],
  },
  automation_ai: {
    id: "automation_ai",
    alwaysDiscovery: true,
    price: p(10000, 16000, 25000),
    days: d(8, 12.8, 20),
    lowAssumption: "scoped_before_build",
    highAssumption: "scoped_before_build",
    includes: [
      "data_ingestion",
      "ai_processing",
      "classification_extraction",
      "human_review_step",
      "result_storage",
      "error_handling",
      "deployment",
    ],
    additions: ["connect_tools", "connect_internal", "custom_functionality"],
  },
};

/**
 * ADDITIONS — real scope, priced as what it is.
 *
 * The `integrate` / `build` split is load-bearing. Connecting the booking tool
 * a salon already uses is configuration and testing; building a scheduling
 * engine with staff, resources and rules is software. Same word, two products,
 * and the flow asks which one rather than averaging them.
 */
export const ADDITIONS: Record<AdditionId, AdditionSpec> = {
  /**
   * ASYMMETRIC THROUGHOUT. The low end is the simple case that genuinely
   * happens most of the time; the high end is the same feature once it needs
   * styling, syncing, data mapping or a workflow change. A local business
   * asking for bookings should not see a four-figure jump on the floor.
   */
  bookings: {
    id: "bookings",
    kind: "integrate",
    variants: [
      // Embed, style, test. Calendly, Square, whatever they already run.
      { id: "integrate", kind: "integrate", price: p(250, 600, 1400), days: d(0.2, 0.5, 1.1) },
      { id: "build", kind: "build", price: p(5000, 8000, 13000), days: d(4, 6.4, 10), alwaysDiscovery: true },
    ],
  },
  ordering: {
    id: "ordering",
    kind: "integrate",
    externalSystem: true,
    variants: [
      // Toast, ChowNow, Square — it exists and it works. Menu sync and a link.
      { id: "integrate", kind: "integrate", price: p(250, 700, 1800), days: d(0.2, 0.55, 1.4) },
      { id: "build", kind: "build", price: p(7000, 11000, 17000), days: d(5.6, 8.8, 13.6), alwaysDiscovery: true },
    ],
  },
  payments: { id: "payments", kind: "integrate", price: p(250, 600, 1300), days: d(0.2, 0.5, 1) },
  accounts: { id: "accounts", kind: "build", price: p(900, 1800, 3200), days: d(0.7, 1.4, 2.5) },
  /** A handful of products on a site that is not primarily a store. */
  sell_products: { id: "sell_products", kind: "build", price: p(900, 1900, 3500), days: d(0.7, 1.5, 2.8) },
  /** Real scope: location pages, location schema, per-location content. */
  multi_location: { id: "multi_location", kind: "scope", price: p(500, 1200, 2400), days: d(0.4, 1, 1.9) },
  /** Their CRM, mailing list, analytics — documented products with real APIs. */
  connect_tools: {
    id: "connect_tools",
    kind: "integrate",
    price: p(250, 650, 1500),
    days: d(0.2, 0.5, 1.2),
    externalSystem: true,
  },
  /** Their own system. We cannot see inside it before starting. */
  connect_internal: {
    id: "connect_internal",
    kind: "integrate",
    price: p(900, 2000, 4000),
    days: d(0.7, 1.6, 3.2),
    externalSystem: true,
  },
  content_migration: { id: "content_migration", kind: "scope", price: p(300, 750, 1600), days: d(0.25, 0.6, 1.3) },
  /**
   * WCAG/AODA conformance: implementation and real testing. A FIXED amount of
   * work, never a percentage of the project.
   */
  accessibility: { id: "accessibility", kind: "scope", price: p(600, 1300, 2400), days: d(0.5, 1, 1.9) },
  /**
   * Several approvers means more review rounds, which does scale with the
   * project — but it might be one extra pass or it might be four, so it is
   * asymmetric and capped low. It adds coordination, never scope.
   */
  stakeholders: { id: "stakeholders", kind: "process", shareLow: 0.03, shareHigh: 0.12 },
  /**
   * CONTENT IS THE BIGGEST HIDDEN VARIABLE IN ANY WEBSITE PROJECT, so it is
   * asked outright rather than assumed. Proportional because more pages means
   * more writing, and asymmetric because "some help" spans a tidy-up and a
   * near-rewrite.
   */
  content_help: { id: "content_help", kind: "scope", shareLow: 0.08, shareHigh: 0.28 },
  content_full: { id: "content_full", kind: "scope", shareLow: 0.25, shareHigh: 0.65 },
  custom_functionality: {
    id: "custom_functionality",
    kind: "build",
    price: p(1200, 2800, 5500),
    days: d(1, 2.2, 4.4),
    externalSystem: true,
  },
};

/**
 * SEARCH SCOPE.
 *
 * Technical SEO, schema and Search Console are in EVERY base — we do not ship
 * a site without them and we do not bill them separately. These are what goes
 * beyond that.
 */
/**
 * SEARCH SCOPE.
 *
 * Crawlability, metadata, semantic markup, performance, schema, analytics,
 * Search Console and a sitemap are in EVERY base — we do not ship a site
 * without them and we do not bill them separately. A client should never pay a
 * large separate SEO fee just to get a technically competent website.
 *
 * `local` is the FOUNDATION: location targeting, Google Business, local schema,
 * basic keyword mapping. `content_strategy` is a real ENGAGEMENT: deeper
 * research, competitor analysis, a content plan, large-scale on-page work.
 * Those are different scopes and priced as such.
 */
export const SEO_SCOPES: Record<SeoScopeId, SeoScopeSpec> = {
  none: { id: "none", price: p(0, 0, 0), days: d(0, 0, 0), includes: [] },
  local: {
    id: "local",
    price: p(300, 700, 1300),
    days: d(0.25, 0.55, 1),
    includes: ["local_seo_setup", "google_business_profile", "location_schema", "keyword_mapping"],
  },
  content_strategy: {
    id: "content_strategy",
    price: p(1200, 2400, 4200),
    days: d(1, 1.9, 3.3),
    includes: ["keyword_research", "competitor_analysis", "content_plan", "onpage_optimization", "internal_linking"],
  },
};

/** Uncertainty widens the top. It never invents effort. */
export const RISK = {
  unknownSystemHighShare: 0.25,
  undefinedScopeHighShare: 0.2,
  /** A compressed schedule is real cost, so it moves all three numbers. */
  rushAll: 0.12,
};

/**
 * Independent scope items combine in quadrature. Adding bands linearly claims
 * every part of a project overruns at once; across five items some come in
 * under and some over.
 */
export const AGGREGATION_EXPONENT = 2;

export const ROUNDING: { upTo: number; step: number }[] = [
  { upTo: 15000, step: 250 },
  { upTo: 40000, step: 500 },
  { upTo: Infinity, step: 1000 },
];

export const BUDGET_BANDS: Record<string, { low: number; high: number }> = {
  under_5k: { low: 0, high: 5000 },
  "5_15k": { low: 5000, high: 15000 },
  "15_50k": { low: 15000, high: 50000 },
  "50k_plus": { low: 50000, high: Infinity },
};

/**
 * What is NOT in the price. Naming these is worth more to a prospect than
 * another bullet about what is — it prevents an awkward conversation later.
 */
export const EXCLUSIONS = ["third_party_fees", "stock_media", "ongoing_services", "paid_advertising"];

/**
 * RECURRING — mirrored from Supabase `service_products`, verified 2026-08-14.
 * Unchanged here; subscriptions are the next exercise. Only `approved` rows
 * may ever be published.
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

/** Which recurring services genuinely follow from a base. */
export const BASE_RECURRING: Partial<Record<BaseId, string[]>> = {
  website_small: ["website-care-plan"],
  website_standard: ["website-care-plan"],
  website_large: ["website-care-plan"],
  store_standard: ["website-care-plan"],
  store_large: ["website-care-plan"],
  store_custom: ["website-care-plan"],
  seo_engagement: ["seo-essentials"],
  software_dashboard: ["website-care-plan"],
  software_portal: ["website-care-plan"],
  software_platform: ["website-care-plan"],
};

export const MODEL_CHECKSUM = "e49f098fe5ee2001";
