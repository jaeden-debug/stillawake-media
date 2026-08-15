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
 * WHY THESE PRICES AND NOT AGENCY PRICES
 * Reusable architecture and AI-assisted implementation mean a site that takes
 * a conventional studio three weeks takes us a few focused days. Pricing that
 * as though we carried a project manager, a designer and two developers would
 * be charging for overhead we do not have. The efficiency shows up as
 * throughput, not as rate — which is why the implied day rates here sit around
 * $1,200–1,600 rather than the $1,800 planning rate. That is a deliberate
 * commercial trade and it needs volume to work, so the internal estimator
 * reports the implied rate on every estimate and keeps the position visible.
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

export const PRICING_VERSION = "2026.08.3";
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

/** The floor for any build. Below this, scoping and handover cost more than the work. */
export const MINIMUM = 2500;

/**
 * Sheer size. Past here the useful advice is to phase the work rather than
 * quote all of it — but this is only ONE of four discovery triggers and the
 * other three are about uncertainty. A big website is still a website.
 */
export const DISCOVERY_SIZE_THRESHOLD = 40000;

/** Paid discovery: a real product, credited against the build that follows. */
export const DISCOVERY = { from: 2500, creditedAgainstBuild: true };

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
    price: p(2500, 3200, 4000),
    days: d(2, 2.5, 3.5),
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
    additions: ["bookings", "payments", "connect_tools", "content_migration", "custom_functionality"],
  },

  /** THE CENTRE OF THE MODEL. A real local-business website, done properly. */
  website_standard: {
    id: "website_standard",
    price: p(4000, 5500, 7000),
    days: d(3.5, 4.5, 6),
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
    additions: [
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
    price: p(7000, 9000, 12000),
    days: d(6, 7.5, 10),
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
    additions: [
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
    price: p(5000, 6800, 9000),
    days: d(4, 5.5, 7),
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
    additions: ["accounts", "multi_location", "connect_tools", "connect_internal", "content_migration", "custom_functionality"],
  },

  store_large: {
    id: "store_large",
    price: p(9000, 12000, 16000),
    days: d(7, 9.5, 13),
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
    additions: ["accounts", "multi_location", "connect_tools", "connect_internal", "content_migration", "custom_functionality"],
  },

  /** A commerce engine rather than a configured platform. Software, so scoped first. */
  store_custom: {
    id: "store_custom",
    alwaysDiscovery: true,
    price: p(18000, 24000, 34000),
    days: d(14, 19, 27),
    includes: ["custom_commerce", "product_templates", "payments_setup", "operations_workflow", "deployment"],
    additions: ["accounts", "connect_internal", "custom_functionality"],
  },

  brand_refresh: {
    id: "brand_refresh",
    price: p(1200, 1800, 2500),
    days: d(1, 1.5, 2),
    includes: ["logo_refinement", "colour_type", "basic_guidelines"],
    additions: [],
  },
  brand_identity: {
    id: "brand_identity",
    price: p(3000, 4200, 6000),
    days: d(2.5, 3.5, 5),
    includes: ["logo_system", "colour_type", "brand_guidelines", "asset_kit"],
    additions: [],
  },
  brand_positioning: {
    id: "brand_positioning",
    price: p(6000, 8500, 12000),
    days: d(4.5, 6, 8.5),
    includes: ["market_positioning", "naming_messaging", "logo_system", "brand_guidelines", "launch_assets"],
    additions: [],
  },

  /** Advisory work on a site that already exists. No build attached. */
  seo_engagement: {
    id: "seo_engagement",
    price: p(2000, 3200, 5000),
    days: d(1.5, 2, 3),
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
    price: p(14000, 19500, 27000),
    days: d(10.5, 14.5, 20),
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
    price: p(20000, 28000, 40000),
    days: d(15, 21, 30),
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
    price: p(40000, 60000, 90000),
    days: d(30, 45, 68),
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
    price: p(1500, 2500, 4000),
    days: d(1, 1.75, 3),
    includes: ["data_ingestion", "processing_logic", "error_handling", "deployment"],
    additions: ["connect_tools", "connect_internal"],
  },
  automation_workflow: {
    id: "automation_workflow",
    price: p(5000, 8000, 12000),
    days: d(4, 6, 9),
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
    price: p(12000, 18000, 28000),
    days: d(9, 13, 20),
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
  bookings: {
    id: "bookings",
    kind: "integrate",
    variants: [
      { id: "integrate", kind: "integrate", price: p(500, 900, 1500), days: d(0.4, 0.7, 1.2) },
      { id: "build", kind: "build", price: p(6000, 9000, 14000), days: d(4.5, 7, 10), alwaysDiscovery: true },
    ],
  },
  ordering: {
    id: "ordering",
    kind: "integrate",
    externalSystem: true,
    variants: [
      // Toast, ChowNow, Square — they already have one and it already works.
      { id: "integrate", kind: "integrate", price: p(500, 1100, 2000), days: d(0.4, 0.9, 1.6) },
      { id: "build", kind: "build", price: p(8000, 12000, 18000), days: d(6, 9, 14), alwaysDiscovery: true },
    ],
  },
  payments: { id: "payments", kind: "integrate", price: p(500, 900, 1500), days: d(0.4, 0.7, 1.2) },
  accounts: { id: "accounts", kind: "build", price: p(1500, 2400, 3500), days: d(1.2, 1.9, 2.8) },
  /** A handful of products on a site that is not primarily a store. */
  sell_products: { id: "sell_products", kind: "build", price: p(1500, 2500, 4000), days: d(1.2, 2, 3.2) },
  multi_location: { id: "multi_location", kind: "scope", price: p(800, 1300, 2000), days: d(0.6, 1, 1.6) },
  /** Their CRM, mailing list, analytics — documented products with real APIs. */
  connect_tools: {
    id: "connect_tools",
    kind: "integrate",
    price: p(400, 900, 1600),
    days: d(0.3, 0.7, 1.3),
    externalSystem: true,
  },
  /** Their own system. We cannot see inside it before starting. */
  connect_internal: {
    id: "connect_internal",
    kind: "integrate",
    price: p(1500, 2600, 4000),
    days: d(1.2, 2, 3.2),
    externalSystem: true,
  },
  content_migration: { id: "content_migration", kind: "scope", price: p(500, 900, 1500), days: d(0.4, 0.7, 1.2) },
  /**
   * WCAG/AODA conformance: implementation and real testing. A FIXED amount of
   * work, not a percentage of the project — treating it as +45% of everything
   * is what put a law firm's brochure site at $39,000.
   */
  accessibility: { id: "accessibility", kind: "scope", price: p(1000, 1600, 2500), days: d(0.8, 1.3, 2) },
  /**
   * Several approvers genuinely means more review rounds, and that IS
   * proportional. Capped low: it adds coordination, not scope.
   */
  stakeholders: { id: "stakeholders", kind: "process", share: 0.08 },
  custom_functionality: {
    id: "custom_functionality",
    kind: "build",
    price: p(2000, 3500, 6000),
    days: d(1.6, 2.7, 4.6),
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
export const SEO_SCOPES: Record<SeoScopeId, SeoScopeSpec> = {
  none: { id: "none", price: p(0, 0, 0), days: d(0, 0, 0), includes: [] },
  local: {
    id: "local",
    price: p(800, 1200, 1800),
    days: d(0.6, 0.95, 1.4),
    includes: ["local_seo_setup", "google_business_profile", "location_schema"],
  },
  content_strategy: {
    id: "content_strategy",
    price: p(1500, 2400, 3500),
    days: d(1.2, 1.9, 2.8),
    includes: ["keyword_research", "content_plan", "onpage_optimization", "internal_linking"],
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

export const MODEL_CHECKSUM = "2dde70f1e7345b8c";
