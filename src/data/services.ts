/**
 * Canonical SERVICE → PUBLIC PAGE registry.
 *
 * Commercial truth mirrors the StillAwake Studio catalogue
 * (service_products table, verified live 2026-08-12). Prices here are only
 * ever copies of ACTIVE, approved Studio prices — draft/unapproved products
 * carry price: null and present as custom quotes. Never invent a price here;
 * update Studio first, then mirror it.
 */

export type ServiceEntry = {
  id: string; // Studio slug where one exists, else a stable local id
  name: string;
  nameFr: string;
  category: "seo" | "aeo" | "maintenance" | "support" | "development" | "design" | "ecommerce" | "automation";
  enPath: string;
  frPath: string | null; // null = intentional exclusion (documented reason)
  frExclusionReason?: string;
  billing: "monthly" | "one_time" | "custom";
  /** Approved public price in CAD (monthly for subscriptions), or null for custom quote. */
  price: number | null;
  /** Tiered one-time pricing (approved), lowest → highest. */
  tiers?: { label: string; labelFr: string; price: number }[];
  primaryKeywordEn: string;
  primaryKeywordFr: string | null;
  localIntent: boolean;
  remoteIntent: boolean;
  related: string[]; // ids
  active: boolean; // sellable today (Studio active or project-intake service)
};

export const SERVICES: ServiceEntry[] = [
  {
    id: "seo-essentials",
    name: "SEO Growth — Essentials",
    nameFr: "Croissance SEO — Essentiel",
    category: "seo",
    enPath: "/seo-montreal",
    frPath: "/fr/agence-seo-montreal",
    billing: "monthly",
    price: 600,
    primaryKeywordEn: "seo montreal",
    primaryKeywordFr: "agence seo montréal",
    localIntent: true,
    remoteIntent: true,
    related: ["seo-advanced", "ai-search-optimization", "website-maintenance"],
    active: true,
  },
  {
    id: "seo-advanced",
    name: "SEO Growth — Advanced",
    nameFr: "Croissance SEO — Avancé",
    category: "seo",
    enPath: "/seo-montreal",
    frPath: "/fr/agence-seo-montreal",
    billing: "monthly",
    price: 850,
    primaryKeywordEn: "seo agency montreal",
    primaryKeywordFr: "agence seo montréal",
    localIntent: true,
    remoteIntent: true,
    related: ["seo-essentials", "ai-search-optimization"],
    active: true,
  },
  {
    id: "emergency-custom-site",
    name: "Emergency Support — Custom Site",
    nameFr: "Support d'urgence — Site sur mesure",
    category: "support",
    enPath: "/website-maintenance",
    frPath: "/fr/maintenance-site-web",
    billing: "one_time",
    price: null,
    tiers: [
      { label: "Quick fix", labelFr: "Correctif rapide", price: 150 },
      { label: "Priority incident", labelFr: "Incident prioritaire", price: 250 },
      { label: "Heavy incident", labelFr: "Incident majeur", price: 400 },
    ],
    primaryKeywordEn: "emergency website repair",
    primaryKeywordFr: "maintenance site web",
    localIntent: true,
    remoteIntent: true,
    related: ["emergency-ecommerce", "website-maintenance"],
    active: true,
  },
  {
    id: "emergency-ecommerce",
    name: "Emergency Support — Ecommerce",
    nameFr: "Support d'urgence — Ecommerce",
    category: "support",
    enPath: "/website-maintenance",
    frPath: "/fr/maintenance-site-web",
    billing: "one_time",
    price: null,
    tiers: [
      { label: "Store triage", labelFr: "Triage de boutique", price: 250 },
      { label: "Priority ecommerce incident", labelFr: "Incident ecommerce prioritaire", price: 400 },
      { label: "Business-critical", labelFr: "Critique pour l'entreprise", price: 600 },
    ],
    primaryKeywordEn: "fix shopify store",
    primaryKeywordFr: "maintenance boutique en ligne",
    localIntent: true,
    remoteIntent: true,
    related: ["emergency-custom-site", "shopify-development"],
    active: true,
  },
  {
    id: "website-maintenance",
    name: "Website Care Plans",
    nameFr: "Forfaits d'entretien de site web",
    category: "maintenance",
    enPath: "/website-maintenance",
    frPath: "/fr/maintenance-site-web",
    billing: "custom", // Studio Care Plan/Hosting exist as drafts — pricing not yet approved for publication
    price: null,
    primaryKeywordEn: "website maintenance services",
    primaryKeywordFr: "maintenance site web",
    localIntent: true,
    remoteIntent: true,
    related: ["emergency-custom-site", "emergency-ecommerce", "seo-essentials"],
    active: true,
  },
  {
    id: "ai-search-optimization",
    name: "AI Search Optimization (AEO)",
    nameFr: "Optimisation pour moteurs de réponse (AEO)",
    category: "aeo",
    enPath: "/answer-engine-optimization",
    frPath: "/fr/referencement-ia",
    billing: "custom", // Studio draft — price unapproved, presented as custom quote
    price: null,
    primaryKeywordEn: "answer engine optimization",
    primaryKeywordFr: "référencement ia",
    localIntent: true,
    remoteIntent: true,
    related: ["seo-essentials", "seo-advanced"],
    active: true,
  },
  {
    id: "web-design",
    name: "Web Design & Development",
    nameFr: "Création de site web",
    category: "design",
    enPath: "/web-design-montreal",
    frPath: "/fr/agence-web-montreal",
    billing: "custom",
    price: null,
    primaryKeywordEn: "web design montreal",
    primaryKeywordFr: "création site web montréal",
    localIntent: true,
    remoteIntent: true,
    related: ["shopify-development", "website-maintenance", "seo-essentials"],
    active: true,
  },
  {
    id: "shopify-development",
    name: "Shopify Development",
    nameFr: "Développement Shopify",
    category: "ecommerce",
    enPath: "/shopify-development",
    frPath: "/fr/developpement-shopify",
    billing: "custom",
    price: null,
    primaryKeywordEn: "shopify developer",
    primaryKeywordFr: "expert shopify",
    localIntent: true,
    remoteIntent: true,
    related: ["emergency-ecommerce", "web-design", "seo-essentials"],
    active: true,
  },
  {
    id: "software-development",
    name: "Custom Software Development",
    nameFr: "Développement logiciel sur mesure",
    category: "development",
    enPath: "/software-development",
    frPath: null,
    frExclusionReason: "No measured FR demand for the cluster yet (audit 2026-08); revisit after core FR pages index.",
    billing: "custom",
    price: null,
    primaryKeywordEn: "custom web development",
    primaryKeywordFr: null,
    localIntent: false,
    remoteIntent: true,
    related: ["web-design", "ai-automation"],
    active: true,
  },
  {
    id: "branding",
    name: "Branding & Identity",
    nameFr: "Image de marque",
    category: "design",
    enPath: "/branding",
    frPath: null,
    frExclusionReason: "Deferred to a later FR wave — no measured FR keyword priority in the audit.",
    billing: "custom",
    price: null,
    primaryKeywordEn: "branding services",
    primaryKeywordFr: null,
    localIntent: false,
    remoteIntent: true,
    related: ["web-design"],
    active: true,
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    nameFr: "Automatisation IA",
    category: "automation",
    enPath: "/ai-automation",
    frPath: null,
    frExclusionReason: "Deferred to a later FR wave.",
    billing: "custom",
    price: null,
    primaryKeywordEn: "ai automation services",
    primaryKeywordFr: null,
    localIntent: false,
    remoteIntent: true,
    related: ["software-development", "ai-search-optimization"],
    active: true,
  },
  {
    id: "local-seo",
    name: "Local SEO",
    nameFr: "Référencement local",
    category: "seo",
    enPath: "/local-seo",
    frPath: null,
    frExclusionReason: "FR local-SEO intent is served by /fr/agence-seo-montreal (référencement local is a section there).",
    billing: "custom",
    price: null,
    primaryKeywordEn: "local seo services",
    primaryKeywordFr: "référencement local",
    localIntent: true,
    remoteIntent: true,
    related: ["seo-essentials", "web-design"],
    active: true,
  },
  {
    id: "framer-development",
    name: "Framer Development",
    nameFr: "Développement Framer",
    category: "development",
    enPath: "/framer-development",
    frPath: null,
    frExclusionReason: "No measured FR demand (audit 2026-08).",
    billing: "custom",
    price: null,
    primaryKeywordEn: "framer development services",
    primaryKeywordFr: null,
    localIntent: false,
    remoteIntent: true,
    related: ["web-design"],
    active: true,
  },
];

/** Pages that must exist as EN/FR pairs — drives the parity check. */
export const PARITY_PAIRS = SERVICES.filter((s) => s.frPath).map((s) => ({
  en: s.enPath,
  fr: s.frPath as string,
}));
