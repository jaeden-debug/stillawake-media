/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SHARED PRICING KERNEL — 5 of 5 · LABELS
 *
 * CANONICAL SOURCE: stillawake-media (.com). Synced to .dev.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Every key the engine can emit — foundations, capabilities, tiers, scope,
 * inclusion items, risk notes, recurring services — in English and Québec
 * French. The engine returns keys, never prose, so the two public languages
 * and the internal estimator all read the same model without any of them
 * carrying its own copy of the wording.
 *
 * The French is written for Québec, not translated from the English. "Site
 * web transactionnel", "prise de rendez-vous", "cueillette" and "soumission"
 * are the terms a Québec business actually uses; the literal renderings of
 * "ecommerce", "booking", "pickup" and "quote" are not.
 */

export type Locale = "en" | "fr";
type L = { en: string; fr: string };

const t = (en: string, fr: string): L => ({ en, fr });

export const FOUNDATION_LABELS: Record<string, L> = {
  marketing_site: t("Business website", "Site web d'entreprise"),
  website_redesign: t("Website redesign", "Refonte de site web"),
  ecommerce: t("Online store", "Boutique en ligne"),
  business_portal: t("Business dashboard or portal", "Tableau de bord ou portail d'entreprise"),
  custom_application: t("Custom web application", "Application web sur mesure"),
  ai_automation: t("AI automation system", "Système d'automatisation IA"),
  seo_engagement: t("SEO engagement", "Mandat de référencement"),
  content_system: t("Content and SEO system", "Système de contenu et de référencement"),
};

export const COMPLEXITY_LABELS: Record<string, L> = {
  standard: t("Standard", "Standard"),
  moderate: t("Moderate", "Modéré"),
  advanced: t("Advanced", "Avancé"),
  complex: t("Complex", "Complexe"),
};

export const SCOPE_LABELS: Record<string, L> = {
  small: t("Up to 6 pages", "Jusqu'à 6 pages"),
  standard: t("7–12 pages", "7 à 12 pages"),
  large: t("13–25 pages", "13 à 25 pages"),
  very_large: t("26–60 pages", "26 à 60 pages"),
  xl: t("60+ pages or generated pages", "Plus de 60 pages ou pages générées"),
};

export const CAPABILITY_LABELS: Record<string, L> = {
  /* content */
  copywriting: t("Copywriting", "Rédaction"),
  content_migration: t("Content migration", "Migration de contenu"),
  blog_system: t("Blog or resource section", "Blogue ou section ressources"),
  cms: t("Client-editable content", "Contenu modifiable par le client"),
  dynamic_content: t("Dynamic content collections", "Collections de contenu dynamique"),

  /* seo */
  keyword_research: t("Keyword research", "Recherche de mots-clés"),
  local_seo: t("Local SEO", "Référencement local"),
  advanced_onpage: t("Advanced on-page SEO", "Optimisation on-page avancée"),
  schema_markup: t("Structured data", "Données structurées"),
  multi_location: t("Multiple locations", "Plusieurs emplacements"),
  content_strategy: t("Content strategy", "Stratégie de contenu"),
  programmatic_content: t("Programmatic content pipeline", "Chaîne de contenu programmatique"),

  /* commerce */
  large_catalogue: t("Large product catalogue", "Grand catalogue de produits"),
  subscriptions: t("Subscriptions", "Abonnements"),
  online_ordering: t("Online ordering", "Commande en ligne"),
  delivery_pickup: t("Delivery and pickup", "Livraison et cueillette"),
  inventory_sync: t("Inventory sync", "Synchronisation des stocks"),
  customer_accounts: t("Customer accounts", "Comptes clients"),
  pos_integration: t("Point-of-sale integration", "Intégration au point de vente"),

  /* business */
  authentication: t("User logins", "Connexion des utilisateurs"),
  roles_permissions: t("Roles and permissions", "Rôles et permissions"),
  dashboard_reporting: t("Dashboard and reporting", "Tableau de bord et rapports"),
  client_portal: t("Client portal", "Portail client"),
  admin_portal: t("Admin portal", "Portail d'administration"),
  documents_uploads: t("Documents and uploads", "Documents et téléversements"),
  notifications: t("Notifications", "Notifications"),
  workflow_management: t("Workflow management", "Gestion des flux de travail"),
  app_payments: t("In-app payments", "Paiements dans l'application"),
  booking: t("Booking or reservations", "Prise de rendez-vous ou réservations"),

  /* integration */
  crm_integration: t("CRM integration", "Intégration CRM"),
  email_marketing: t("Email marketing integration", "Intégration infolettre"),
  advanced_analytics: t("Advanced analytics", "Analytique avancée"),
  third_party_api: t("Third-party API", "API tierce"),
  legacy_system: t("Existing internal system", "Système interne existant"),

  /* ai */
  ai_assistant: t("AI assistant", "Assistant IA"),
  document_processing: t("Document processing", "Traitement de documents"),
  content_automation: t("Content automation", "Automatisation de contenu"),
  classification_extraction: t("Classification and extraction", "Classification et extraction"),
  workflow_automation: t("Workflow automation", "Automatisation des processus"),
  business_intelligence: t("Business intelligence", "Intelligence d'affaires"),
  custom_ai_pipeline: t("Custom AI pipeline", "Chaîne IA sur mesure"),
};

/** What a build at the estimated range actually ships. */
export const INCLUDE_LABELS: Record<string, L> = {
  custom_responsive_build: t("Custom responsive build", "Site sur mesure adapté au mobile"),
  up_to_six_pages: t("Up to 6 pages", "Jusqu'à 6 pages"),
  contact_form: t("Contact form", "Formulaire de contact"),
  analytics_search_console: t("Analytics and Search Console", "Analytique et Search Console"),
  technical_seo_foundation: t("Technical SEO foundation", "Fondations SEO techniques"),
  basic_onpage_seo: t("On-page SEO basics", "Optimisation on-page de base"),
  deployment: t("Deployment and launch", "Mise en ligne"),
  existing_site_audit: t("Audit of the existing site", "Audit du site actuel"),
  url_mapping_redirects: t("URL mapping and redirects", "Correspondance d'URL et redirections"),
  content_transfer: t("Content transfer", "Transfert du contenu"),
  storefront_build: t("Storefront build", "Construction de la boutique"),
  product_templates: t("Product page templates", "Gabarits de fiches produits"),
  cart_checkout: t("Cart and checkout", "Panier et paiement"),
  payments_setup: t("Payment setup", "Configuration des paiements"),
  shipping_tax_config: t("Shipping and tax setup", "Configuration livraison et taxes"),
  ecommerce_seo_foundation: t("Ecommerce SEO foundation", "Fondations SEO pour boutique"),
  database_design: t("Database design", "Conception de la base de données"),
  core_dashboard: t("Core dashboard", "Tableau de bord principal"),
  admin_crud: t("Admin management screens", "Écrans de gestion administrateur"),
  hosting_environment: t("Hosting environment", "Environnement d'hébergement"),
  custom_domain_model: t("Custom data model", "Modèle de données sur mesure"),
  multiple_app_surfaces: t("Multiple application areas", "Plusieurs sections applicatives"),
  admin_surface: t("Admin area", "Section administration"),
  one_production_pipeline: t("One production automation", "Une automatisation en production"),
  data_ingestion: t("Data intake", "Réception des données"),
  processing_logic: t("Processing logic", "Logique de traitement"),
  result_storage: t("Result storage", "Stockage des résultats"),
  human_review_step: t("Human review step", "Étape de validation humaine"),
  error_handling: t("Error handling", "Gestion des erreurs"),
  technical_audit: t("Technical audit", "Audit technique"),
  information_architecture: t("Information architecture", "Architecture de l'information"),
  initial_fixes: t("Initial fixes", "Premiers correctifs"),
  measurement_baseline: t("Measurement baseline", "Point de référence des mesures"),
  editorial_schema: t("Editorial content model", "Modèle de contenu éditorial"),
  cms_workflow: t("CMS workflow", "Flux de travail CMS"),
  internal_linking_system: t("Internal linking system", "Système de maillage interne"),
  metadata_system: t("Metadata system", "Système de métadonnées"),
  publishing_workflow: t("Publishing workflow", "Flux de publication"),
};

/** Non-capability lines the engine can emit. */
export const LINE_LABELS: Record<string, L> = {
  bilingual: t("Bilingual implementation", "Implémentation bilingue"),
  interaction: t("Cross-system complexity", "Complexité entre systèmes"),
  range_aggregation: t("Range aggregation", "Agrégation de la fourchette"),
  minimum: t("Minimum engagement", "Mandat minimum"),
  unknown_external_system: t("Unknown external system", "Système externe inconnu"),
  undefined_scope: t("Scope not yet defined", "Portée encore à définir"),
  rush: t("Compressed timeline", "Échéancier serré"),
};

export const RECURRING_LABELS: Record<string, L> = {
  "seo-essentials": t("SEO Growth — Essentials", "Croissance SEO — Essentiel"),
  "seo-advanced": t("SEO Growth — Advanced", "Croissance SEO — Avancé"),
  "website-care-plan": t("Website care plan", "Forfait d'entretien"),
  "managed-hosting": t("Managed hosting", "Hébergement géré"),
  "content-creation": t("Content production", "Production de contenu"),
};

/** Plain-language explanation of what a caveat means for the number. */
export const CAVEAT_LABELS: Record<string, L> = {
  unknown_external_system: t(
    "Your project connects to a system we have not seen inside yet. Rather than guess how hard that will be, we widened the top of the range.",
    "Votre projet se connecte à un système dont nous n'avons pas encore vu l'intérieur. Plutôt que de deviner la difficulté, nous avons élargi le haut de la fourchette.",
  ),
  undefined_scope: t(
    "Parts of the scope are still open. The range is wider to reflect that, and it will narrow once the scope is written down.",
    "Une partie de la portée reste à définir. La fourchette est plus large pour en tenir compte et se resserrera une fois la portée écrite.",
  ),
  rush: t(
    "A compressed timeline costs real money — it is reflected across the whole range, not just the top.",
    "Un échéancier serré coûte réellement plus cher — c'est reflété dans toute la fourchette, pas seulement en haut.",
  ),
};

export function label(table: Record<string, L>, key: string, locale: Locale): string {
  return table[key]?.[locale] ?? key;
}

/** Resolves any engine key against every table, in the order keys can collide. */
export function labelForKey(key: string, locale: Locale): string {
  return (
    FOUNDATION_LABELS[key]?.[locale] ??
    CAPABILITY_LABELS[key]?.[locale] ??
    LINE_LABELS[key]?.[locale] ??
    SCOPE_LABELS[key]?.[locale] ??
    INCLUDE_LABELS[key]?.[locale] ??
    RECURRING_LABELS[key]?.[locale] ??
    key
  );
}

/** CA$ formatting. Québec French puts the symbol after the number. */
export function formatCad(value: number, locale: Locale): string {
  const n = new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA").format(value);
  return locale === "fr" ? `${n} $` : `CA$${n}`;
}
