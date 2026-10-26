/**
 * CALIBRATION — the ten businesses that actually walk in.
 *
 * Answers are written the way a prospect would click them, then run through
 * the real flow, so these prove the whole public chain rather than the engine
 * in isolation.
 *
 * Scenarios 1–6 are the ones that matter most: if a local business ever sees a
 * number here that would make them close the page, the model is wrong and the
 * model is what changes.
 *
 * Print the table with:  npx tsx scripts/pricing-report.mts
 */

import type { Answers } from "./public-flow";

export type Scenario = { id: string; name: string; asked: string; probes: string; answers: Answers };

export const SCENARIOS: Scenario[] = [
  {
    id: "cafe",
    name: "Local café",
    asked: "Menu, hours, contact, findable nearby.",
    probes: "The floor. A small business must be able to buy this.",
    answers: {
      goal: "new_website",
      needs: ["explain", "menu", "found_local"],
      content: "ready",
      size: "small",
      budget: "under_5k",
    },
  },
  {
    id: "plumber",
    name: "Plumber",
    asked: "Home, about, six service pages, service areas, quote form.",
    probes: "The commonest project of all. This IS the centre of the model.",
    answers: {
      goal: "new_website",
      needs: ["explain", "leads", "found_local"],
      content: "ready",
      size: "standard",
      budget: "5_15k",
    },
  },
  {
    id: "dentist",
    name: "Dentist",
    asked: "Professional site, services, patients booking online, found locally.",
    probes: "Bookings via the tool they already use — integration, not construction.",
    answers: {
      goal: "new_website",
      needs: ["explain", "leads", "bookings", "found_local"],
      "how.bookings": "integrate",
      content: "help",
      size: "standard",
      budget: "5_15k",
    },
  },
  {
    id: "lawyer",
    name: "Law firm",
    asked: "Several practice areas, lead generation, partners approve, accessibility required.",
    probes: "The scenario the old model broke on. Complexity must be additive.",
    answers: {
      goal: "new_website",
      needs: ["explain", "leads", "found_search"],
      content: "help",
      size: "large",
      complexity: ["stakeholders"],
      budget: "15_50k",
    },
  },
  {
    id: "restaurant",
    name: "Restaurant",
    asked: "Menu, reservations, social, local search — ordering stays on the platform they use.",
    probes: "Connecting Toast must not price like building ordering.",
    answers: {
      goal: "new_website",
      needs: ["explain", "menu", "bookings", "ordering", "found_local"],
      "how.bookings": "integrate",
      "how.ordering": "integrate",
      content: "ready",
      size: "small",
      budget: "5_15k",
    },
  },
  {
    id: "salon",
    name: "Salon",
    asked: "Services and pricing, team, booking, Instagram, found locally.",
    probes: "Same shape as the dentist. Should land in the same band.",
    answers: {
      goal: "new_website",
      needs: ["explain", "menu", "bookings", "found_local"],
      "how.bookings": "integrate",
      content: "ready",
      size: "small",
      budget: "5_15k",
    },
  },
  {
    id: "ecommerce",
    name: "Small ecommerce business",
    asked: "Shopify, normal catalogue, payments, shipping, basic SEO.",
    probes: "A configured platform, not a commerce engine.",
    answers: { goal: "store", kind: "standard", search: "local", budget: "5_15k" },
  },
  {
    id: "multi_location",
    name: "Multi-location business",
    asked: "Professional site, three locations, location SEO, forms.",
    probes: "Locations are real scope. Headcount is not, and is never asked.",
    answers: {
      goal: "new_website",
      needs: ["explain", "leads", "found_local"],
      content: "help",
      size: "large",
      complexity: ["multi_location"],
      budget: "15_50k",
    },
  },
  {
    id: "dashboard",
    name: "Business dashboard",
    asked: "Login, database, internal dashboard, reporting.",
    probes: "Software must stay well above any website.",
    answers: { goal: "software", kind: "dashboard", complexity: [], budget: "15_50k" },
  },
  {
    id: "portal",
    name: "Custom client portal",
    asked: "Accounts, permissions, data, workflows and integrations.",
    probes: "Requirements are the product — scoped before priced.",
    answers: {
      goal: "software",
      kind: "portal",
      complexity: ["connect_internal"],
      budget: "50k_plus",
    },
  },
  {
    id: "consultant",
    name: "Solo consultant",
    asked: "A simple, credible professional presence.",
    probes: "The entry floor. Must be genuinely reachable.",
    answers: { goal: "new_website", needs: ["explain"], content: "ready", size: "small" },
  },
  {
    id: "electrician",
    name: "Electrician",
    asked: "Normal local lead-generation website.",
    probes: "Level 2. Should sit beside the plumber.",
    answers: {
      goal: "new_website",
      needs: ["explain", "leads", "found_local"],
      content: "ready",
      size: "standard",
    },
  },
  {
    id: "dental_group",
    name: "Larger dental group",
    asked: "Three locations, several practitioners, booking, substantial content.",
    probes: "Level 4. Locations and content are real scope.",
    answers: {
      goal: "new_website",
      needs: ["explain", "leads", "bookings", "found_local"],
      "how.bookings": "integrate",
      content: "full",
      size: "large",
      complexity: ["multi_location"],
    },
  },
  {
    id: "shopify_erp",
    name: "Shopify store + unusual ERP integration",
    asked: "Normal catalogue, but stock and orders sync with their own ERP.",
    probes: "An unknown internal system must widen the top, not the floor.",
    answers: {
      goal: "store",
      kind: "standard",
      search: "local",
      complexity: ["connect_internal"],
    },
  },
  {
    id: "saas_mvp",
    name: "Custom SaaS MVP",
    asked: "Authentication, billing, dashboard and the core workflow.",
    probes: "Proof that lowering website floors did not break software pricing.",
    answers: { goal: "software", kind: "platform" },
  },
];