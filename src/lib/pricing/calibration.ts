/**
 * CALIBRATION SCENARIOS — the evidence that the model is commercially sane.
 *
 * Not a test fixture that happens to live here: this is the artefact Phase 6
 * asks for. Every scenario is a project someone could actually walk in with,
 * priced by the real engine, and `calibration.test.ts` asserts the properties
 * that must hold across the whole distribution — monotonicity, the published
 * market bands, the minimum, and the specific claims made on
 * /website-cost-canada.
 *
 * When a number here looks wrong, fix the MODEL. Never special-case a
 * scenario: a model that needs manual correction per project is not a model.
 *
 * Print the table with:  npx tsx scripts/pricing-report.mts
 */

import type { EstimateInput } from "./types";

export type Scenario = {
  id: string;
  /** Plain-language name, as a prospect would describe it. */
  name: string;
  /** Why this scenario exists — which property of the model it probes. */
  probes: string;
  input: EstimateInput;
};

const base = (input: Partial<EstimateInput> & Pick<EstimateInput, "foundation">): EstimateInput => ({
  scope: "small",
  bilingual: false,
  capabilities: [],
  ...input,
});

export const SCENARIOS: Scenario[] = [
  /* ── The brief's named scenarios ───────────────────────────────────────── */
  {
    id: "A_simple_business_site",
    name: "Simple business website (Home, About, Services, Contact + a few pages)",
    probes: "StillAwake's legitimate minimum. Must not be nickel-and-dimed per page.",
    input: base({ foundation: "marketing_site" }),
  },
  {
    id: "B_restaurant_seo_site",
    name: "Restaurant website with local SEO",
    probes: "Local business build: menu content, maps, structured data, local search.",
    input: base({
      foundation: "marketing_site",
      capabilities: [
        { id: "local_seo", complexity: "moderate" },
        { id: "schema_markup", complexity: "standard" },
        { id: "cms", complexity: "standard" },
        { id: "copywriting", complexity: "standard" },
      ],
    }),
  },
  {
    id: "C_restaurant_ordering",
    name: "Restaurant website + custom online ordering, payments, delivery, POS",
    probes: "Must be materially above scenario B. Commerce + unknown POS.",
    input: base({
      foundation: "marketing_site",
      capabilities: [
        { id: "local_seo", complexity: "moderate" },
        { id: "schema_markup", complexity: "standard" },
        { id: "cms", complexity: "standard" },
        { id: "copywriting", complexity: "standard" },
        { id: "online_ordering", complexity: "moderate" },
        { id: "delivery_pickup", complexity: "moderate" },
        { id: "notifications", complexity: "standard" },
        { id: "pos_integration", complexity: "moderate" },
      ],
    }),
  },
  {
    id: "D_seo_business_site",
    name: "Service company, 10–15 page site built for SEO",
    probes: "Page-count scope with diminishing returns, plus a full SEO scope.",
    input: base({
      foundation: "marketing_site",
      scope: "large",
      capabilities: [
        { id: "keyword_research", complexity: "standard" },
        { id: "advanced_onpage", complexity: "moderate" },
        { id: "schema_markup", complexity: "standard" },
        { id: "local_seo", complexity: "standard" },
        { id: "content_strategy", complexity: "standard" },
        { id: "cms", complexity: "standard" },
        { id: "copywriting", complexity: "moderate" },
      ],
    }),
  },
  {
    id: "E_content_engine",
    name: "Existing site, wants an AI-assisted content and SEO engine",
    probes: "Content system foundation absorbs CMS/linking/metadata rather than charging for each.",
    input: base({
      foundation: "content_system",
      scope: "standard",
      capabilities: [
        { id: "keyword_research", complexity: "moderate" },
        { id: "content_strategy", complexity: "advanced" },
        { id: "cms", complexity: "standard" },
        { id: "content_automation", complexity: "moderate" },
        { id: "advanced_onpage", complexity: "standard" },
      ],
    }),
  },
  {
    id: "F_business_dashboard",
    name: "Business dashboard — login, customers, orders, roles, reporting",
    probes: "Portal foundation includes auth/DB/dashboard; only the extras are priced.",
    input: base({
      foundation: "business_portal",
      capabilities: [
        { id: "authentication", complexity: "standard" },
        { id: "roles_permissions", complexity: "moderate" },
        { id: "dashboard_reporting", complexity: "moderate" },
        { id: "admin_portal", complexity: "standard" },
        { id: "notifications", complexity: "standard" },
      ],
    }),
  },
  {
    id: "G_custom_web_application",
    name: "Custom web application — roles, workflows, payments, APIs, admin",
    probes: "Must clear the published $15k custom-application floor with room to spare.",
    input: base({
      foundation: "custom_application",
      capabilities: [
        { id: "roles_permissions", complexity: "advanced" },
        { id: "workflow_management", complexity: "advanced" },
        { id: "app_payments", complexity: "moderate" },
        { id: "dashboard_reporting", complexity: "advanced" },
        { id: "third_party_api", complexity: "moderate" },
        { id: "notifications", complexity: "moderate" },
      ],
    }),
  },
  {
    id: "H_ai_automation",
    name: "AI document automation — upload, extract, classify, approve, act, report",
    probes: "AI foundation plus AI capabilities; human-in-the-loop is included, not extra.",
    input: base({
      foundation: "ai_automation",
      capabilities: [
        { id: "document_processing", complexity: "advanced" },
        { id: "classification_extraction", complexity: "advanced" },
        { id: "workflow_automation", complexity: "moderate" },
        { id: "business_intelligence", complexity: "standard" },
        { id: "documents_uploads", complexity: "standard" },
      ],
    }),
  },

  /* ── Edge cases the brief names in Phase 22 ────────────────────────────── */
  {
    id: "landing_page",
    name: "Single landing page",
    probes: "Floors at the minimum engagement rather than quoting below it.",
    input: base({ foundation: "marketing_site" }),
  },
  {
    id: "informational_50_pages",
    name: "50-page informational site",
    probes: "Page count must not dominate — 50 pages is not 10× a 5-page site.",
    input: base({
      foundation: "marketing_site",
      scope: "very_large",
      capabilities: [
        { id: "cms", complexity: "standard" },
        { id: "copywriting", complexity: "moderate" },
      ],
    }),
  },
  {
    id: "restaurant_third_party_ordering",
    name: "Restaurant site + link to a third-party ordering platform",
    probes: "Same words as scenario C, a fraction of the cost. Complexity must carry that.",
    input: base({
      foundation: "marketing_site",
      capabilities: [
        { id: "local_seo", complexity: "moderate" },
        { id: "schema_markup", complexity: "standard" },
        { id: "cms", complexity: "standard" },
        { id: "copywriting", complexity: "standard" },
        { id: "online_ordering", complexity: "standard" },
      ],
    }),
  },
  {
    id: "bilingual_business_site",
    name: "Bilingual business website (EN + FR)",
    probes: "A second language multiplies content scope, not the whole project.",
    input: base({
      foundation: "marketing_site",
      scope: "standard",
      bilingual: true,
      capabilities: [
        { id: "cms", complexity: "standard" },
        { id: "copywriting", complexity: "standard" },
      ],
    }),
  },
  {
    id: "website_redesign",
    name: "Website redesign",
    probes: "Migration and redirects are part of the foundation, not add-ons.",
    input: base({
      foundation: "website_redesign",
      scope: "standard",
      capabilities: [
        { id: "content_migration", complexity: "standard" },
        { id: "cms", complexity: "standard" },
      ],
    }),
  },
  {
    id: "redesign_with_seo",
    name: "Website redesign + serious SEO programme",
    probes: "Redesign plus SEO must exceed redesign alone.",
    input: base({
      foundation: "website_redesign",
      scope: "large",
      capabilities: [
        { id: "content_migration", complexity: "moderate" },
        { id: "cms", complexity: "standard" },
        { id: "keyword_research", complexity: "standard" },
        { id: "advanced_onpage", complexity: "moderate" },
        { id: "schema_markup", complexity: "standard" },
        { id: "content_strategy", complexity: "standard" },
      ],
    }),
  },
  {
    id: "shopify_store",
    name: "Shopify store, standard theme, modest catalogue",
    probes: "Ecommerce floor. Must sit above a comparable brochure site.",
    input: base({
      foundation: "ecommerce",
      capabilities: [{ id: "large_catalogue", complexity: "standard" }],
    }),
  },
  {
    id: "shopify_custom_theme",
    name: "Shopify store, custom theme, inventory sync, CRM and email",
    probes: "Integration stacking plus an external inventory system.",
    input: base({
      foundation: "ecommerce",
      scope: "standard",
      capabilities: [
        { id: "large_catalogue", complexity: "moderate" },
        { id: "customer_accounts", complexity: "standard" },
        { id: "inventory_sync", complexity: "moderate" },
        { id: "email_marketing", complexity: "standard" },
        { id: "crm_integration", complexity: "standard" },
      ],
    }),
  },
  {
    id: "subscription_commerce",
    name: "Subscription ecommerce with customer accounts",
    probes: "Recurring-revenue commerce sits above a plain store.",
    input: base({
      foundation: "ecommerce",
      capabilities: [
        { id: "subscriptions", complexity: "moderate" },
        { id: "customer_accounts", complexity: "moderate" },
      ],
    }),
  },
  {
    id: "booking_link",
    name: "Business site + link to a booking tool",
    probes: "Cheapest reading of 'booking'.",
    input: base({
      foundation: "marketing_site",
      capabilities: [{ id: "booking", complexity: "standard" }],
    }),
  },
  {
    id: "booking_embedded",
    name: "Business site + embedded reservation system",
    probes: "Middle reading of 'booking'. Must exceed the link version.",
    input: base({
      foundation: "marketing_site",
      capabilities: [{ id: "booking", complexity: "moderate" }],
    }),
  },
  {
    id: "booking_custom_engine",
    name: "Business site + custom availability engine with payments",
    probes: "Most expensive reading of 'booking'. The 15× spread must survive.",
    input: base({
      foundation: "marketing_site",
      capabilities: [
        { id: "booking", complexity: "advanced" },
        { id: "notifications", complexity: "standard" },
        { id: "app_payments", complexity: "standard" },
      ],
    }),
  },
  {
    id: "seo_only",
    name: "SEO engagement only, no build",
    probes: "Onboarding sprint plus a monthly plan — never priced as a big build.",
    input: base({ foundation: "seo_engagement" }),
  },
  {
    id: "multi_location_local_seo",
    name: "Multi-location local SEO programme",
    probes: "Location strategy on top of an SEO engagement.",
    input: base({
      foundation: "seo_engagement",
      scope: "standard",
      capabilities: [
        { id: "local_seo", complexity: "advanced" },
        { id: "multi_location", complexity: "moderate" },
        { id: "schema_markup", complexity: "moderate" },
      ],
    }),
  },
  {
    id: "client_portal",
    name: "Client portal with documents, roles and notifications",
    probes: "Portal foundation plus a genuine second surface.",
    input: base({
      foundation: "business_portal",
      capabilities: [
        { id: "client_portal", complexity: "moderate" },
        { id: "documents_uploads", complexity: "standard" },
        { id: "roles_permissions", complexity: "moderate" },
        { id: "notifications", complexity: "standard" },
      ],
    }),
  },
  {
    id: "saas_mvp",
    name: "SaaS MVP — accounts, billing, roles, dashboard, integrations",
    probes: "Top of the published range. Scope is genuinely open, so the band widens.",
    input: base({
      foundation: "custom_application",
      undefinedScope: true,
      capabilities: [
        { id: "roles_permissions", complexity: "moderate" },
        { id: "app_payments", complexity: "moderate" },
        { id: "subscriptions", complexity: "moderate" },
        { id: "dashboard_reporting", complexity: "moderate" },
        { id: "third_party_api", complexity: "moderate" },
        { id: "notifications", complexity: "moderate" },
      ],
    }),
  },
  {
    id: "simple_automation",
    name: "Simple automation — connect two business tools reliably",
    probes: "The automation foundation must not price a small job like an AI platform.",
    input: base({
      foundation: "ai_automation",
      capabilities: [{ id: "workflow_automation", complexity: "standard" }],
    }),
  },
  {
    id: "advanced_automation",
    name: "Advanced AI pipeline with classification and external systems",
    probes: "Must clear the simple automation by a wide margin.",
    input: base({
      foundation: "ai_automation",
      capabilities: [
        { id: "custom_ai_pipeline", complexity: "advanced" },
        { id: "classification_extraction", complexity: "advanced" },
        { id: "third_party_api", complexity: "moderate" },
        { id: "business_intelligence", complexity: "moderate" },
      ],
    }),
  },
  {
    id: "many_integrations",
    name: "Business site with four integrations",
    probes: "Interaction premium and the external-system caveat.",
    input: base({
      foundation: "marketing_site",
      scope: "standard",
      capabilities: [
        { id: "crm_integration", complexity: "moderate" },
        { id: "email_marketing", complexity: "standard" },
        { id: "third_party_api", complexity: "moderate" },
        { id: "advanced_analytics", complexity: "standard" },
      ],
    }),
  },
  {
    id: "unknown_legacy_integration",
    name: "Portal that must talk to an undocumented in-house system",
    probes: "Uncertainty widens the top of the range instead of inventing effort.",
    input: base({
      foundation: "business_portal",
      undefinedScope: true,
      capabilities: [
        { id: "legacy_system", complexity: "complex" },
        { id: "roles_permissions", complexity: "moderate" },
      ],
    }),
  },
  {
    id: "programmatic_seo_site",
    name: "Programmatic content site with generated pages",
    probes: "Generated pages priced as a pipeline, not as thousands of pages.",
    input: base({
      foundation: "content_system",
      scope: "xl",
      capabilities: [
        { id: "programmatic_content", complexity: "advanced" },
        { id: "dynamic_content", complexity: "moderate" },
        { id: "keyword_research", complexity: "moderate" },
      ],
    }),
  },
  {
    id: "bilingual_ecommerce_rush",
    name: "Bilingual store on a hard deadline",
    probes: "Rush moves the whole band; bilingual only touches content scope.",
    input: base({
      foundation: "ecommerce",
      scope: "standard",
      bilingual: true,
      rush: true,
      capabilities: [
        { id: "large_catalogue", complexity: "standard" },
        { id: "customer_accounts", complexity: "standard" },
      ],
    }),
  },
];
