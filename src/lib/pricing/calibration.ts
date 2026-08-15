/**
 * CALIBRATION SCENARIOS — the evidence that the model is commercially sane.
 *
 * Every scenario is a project someone could walk in with, priced by the real
 * engine. `calibration.test.ts` asserts the properties that must hold across
 * the distribution: the day model reconciles, the tiers separate, the
 * enterprise multiple is real, and nothing is quoted that should be scoped.
 *
 * When a number looks wrong, fix the MODEL — the days or the rate. Never
 * special-case a scenario.
 *
 * Print the table with:  npx tsx scripts/pricing-report.mts
 */

import type { EstimateInput } from "./types";

export type Scenario = {
  id: string;
  name: string;
  /** Which property of the model this probes. */
  probes: string;
  input: EstimateInput;
};

export const SCENARIOS: Scenario[] = [
  /* ── the product tier ──────────────────────────────────────────────────── */
  {
    id: "launch_local",
    name: "Local business, already branded — a few pages, launched fast",
    probes: "The productized floor. Must be reachable by a small business.",
    input: { lines: [{ id: "website", depth: "launch" }] },
  },
  {
    id: "launch_with_seo",
    name: "Launch site + search foundations",
    probes: "The most common small sale. Must stay under the custom tier.",
    input: {
      lines: [
        { id: "website", depth: "launch" },
        { id: "seo", depth: "foundations" },
      ],
    },
  },

  /* ── the custom tier ───────────────────────────────────────────────────── */
  {
    id: "custom_site",
    name: "Custom business website",
    probes: "Must match the published $8,000–25,000 custom band.",
    input: { lines: [{ id: "website", depth: "custom" }] },
  },
  {
    id: "clinic_site_seo",
    name: "Clinic — custom site, research-led SEO, bookings",
    probes: "The archetypal high-value non-corporate buyer.",
    input: {
      lines: [
        { id: "website", depth: "custom", addons: [{ id: "bookings", variant: "embedded" }] },
        { id: "seo", depth: "research" },
      ],
    },
  },
  {
    id: "restaurant_local",
    name: "Restaurant — custom site, local search, link to an ordering platform",
    probes: "The cheapest reading of ordering.",
    input: {
      lines: [
        { id: "website", depth: "custom" },
        { id: "store", depth: "simple", addons: [{ id: "ordering", variant: "link" }] },
        { id: "seo", depth: "foundations" },
      ],
    },
  },
  {
    id: "restaurant_full_ordering",
    name: "Restaurant — ordering, delivery, pickup and their till system",
    probes: "Must be far above the link version. External system widens the top.",
    input: {
      lines: [
        { id: "website", depth: "custom" },
        { id: "store", depth: "proper", addons: [{ id: "ordering", variant: "full" }] },
        { id: "seo", depth: "foundations" },
      ],
    },
  },
  {
    id: "brand_and_site",
    name: "New business — identity and a custom site",
    probes: "Two lines combining, which the old model could not express.",
    input: {
      lines: [
        { id: "brand", depth: "identity" },
        { id: "website", depth: "custom" },
      ],
    },
  },
  {
    id: "full_positioning",
    name: "Positioning, identity, flagship site and a content pipeline",
    probes: "Four lines. Advisory rate on the strategy work.",
    input: {
      lines: [
        { id: "brand", depth: "positioning" },
        { id: "website", depth: "flagship" },
        { id: "content", depth: "pipeline" },
        { id: "seo", depth: "programme" },
      ],
    },
  },
  {
    id: "seo_only",
    name: "SEO research on an existing site",
    probes: "Advisory work with no build attached.",
    input: { lines: [{ id: "seo", depth: "research" }] },
  },
  {
    id: "content_pipeline",
    name: "Programmatic content pipeline",
    probes: "A system that produces content, priced as a system.",
    input: { lines: [{ id: "content", depth: "pipeline" }] },
  },
  {
    id: "store_proper",
    name: "A real online store",
    probes: "Commerce above a brochure site.",
    input: { lines: [{ id: "store", depth: "proper" }] },
  },
  {
    id: "store_subscriptions",
    name: "Custom commerce with accounts",
    probes: "Systems rate on custom commerce.",
    input: {
      lines: [{ id: "store", depth: "custom_commerce", addons: [{ id: "accounts" }] }],
    },
  },

  /* ── organisational complexity: the honest enterprise multiple ─────────── */
  {
    id: "custom_site_solo",
    name: "Custom site — owner decides, no compliance, nothing to integrate",
    probes: "Base price. Paired with the next scenario.",
    input: { lines: [{ id: "website", depth: "custom" }], org: [] },
  },
  {
    id: "custom_site_midmarket",
    name: "The same site for a 50-person firm — committee, AODA, their CRM, training",
    probes: "Must be ~3× the identical deliverable, itemisable line by line.",
    input: {
      lines: [{ id: "website", depth: "custom" }],
      org: ["approvals", "compliance", "integrations", "training"],
    },
  },

  /* ── automation ────────────────────────────────────────────────────────── */
  {
    id: "automation_connect",
    name: "Connect two business tools reliably",
    probes: "The smallest automation must not price like an AI platform.",
    input: { lines: [{ id: "automation", depth: "connect" }] },
  },
  {
    id: "automation_intelligent",
    name: "AI system that reads documents and exercises judgement",
    probes: "AI rate, and a wide margin over the simple case.",
    input: { lines: [{ id: "automation", depth: "intelligent" }] },
  },

  /* ── the systems tier: should stop quoting ─────────────────────────────── */
  {
    id: "internal_tool",
    name: "Internal tool for the team",
    probes: "Sits at the discovery boundary.",
    input: { lines: [{ id: "software", depth: "internal_tool" }] },
  },
  {
    id: "client_portal",
    name: "A portal customers log into, with payments",
    probes: "Must route to paid discovery rather than quote a number.",
    input: {
      lines: [{ id: "software", depth: "customer_product", addons: [{ id: "payments" }, { id: "accounts" }] }],
    },
  },
  {
    id: "saas_platform",
    name: "SaaS platform anyone can sign up for",
    probes: "Discovery, emphatically.",
    input: {
      lines: [{ id: "software", depth: "platform" }],
      undefinedScope: true,
    },
  },
  {
    id: "travel_system",
    name: "Travel operator — portal, quotes, payments, commerce, content, AI",
    probes: "A Lisa-shaped system. Nobody quotes this off a form.",
    input: {
      lines: [
        { id: "software", depth: "customer_product", addons: [{ id: "payments" }, { id: "accounts" }] },
        { id: "store", depth: "custom_commerce" },
        { id: "website", depth: "flagship" },
        { id: "content", depth: "pipeline" },
        { id: "automation", depth: "process" },
      ],
      org: ["integrations"],
    },
  },

  /* ── edges ─────────────────────────────────────────────────────────────── */
  {
    id: "booking_link",
    name: "Custom site + a link to a booking tool",
    probes: "Cheapest reading of bookings.",
    input: {
      lines: [{ id: "website", depth: "custom", addons: [{ id: "bookings", variant: "link" }] }],
    },
  },
  {
    id: "booking_custom",
    name: "Custom site + our own availability engine",
    probes: "Most expensive reading. The spread must survive.",
    input: {
      lines: [{ id: "website", depth: "custom", addons: [{ id: "bookings", variant: "custom" }] }],
    },
  },
  {
    id: "rush_custom_site",
    name: "Custom site on a hard deadline",
    probes: "Rush moves the whole band.",
    input: { lines: [{ id: "website", depth: "custom" }], rush: true },
  },
  {
    id: "multi_location_seo",
    name: "Multi-location local search programme",
    probes: "Advisory SEO with a location add-on.",
    input: {
      lines: [{ id: "seo", depth: "programme", addons: [{ id: "multi_location" }] }],
    },
  },
  {
    id: "undefined_custom_work",
    name: "Custom site with something they cannot yet describe",
    probes: "Uncertainty widens the top rather than inventing effort.",
    input: {
      lines: [{ id: "website", depth: "custom", addons: [{ id: "custom_functionality" }] }],
      undefinedScope: true,
    },
  },
  {
    id: "brand_refresh_only",
    name: "Brand refresh, nothing else",
    probes: "A small standalone engagement above the minimum.",
    input: { lines: [{ id: "brand", depth: "refresh" }] },
  },
];
