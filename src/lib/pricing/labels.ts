/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SHARED PRICING KERNEL — 5 of 5 · LABELS
 * CANONICAL SOURCE: stillawake-media (.com). Synced to .dev.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * The engine returns keys and never prose, so both languages and the internal
 * estimator read one model. French is written for Québec, not translated.
 */

export type Locale = "en" | "fr";
type L = { en: string; fr: string };
const t = (en: string, fr: string): L => ({ en, fr });

/** What the project is, in the client's words. */
export const BASE_LABELS: Record<string, L> = {
  website_small: t("A few core pages", "Quelques pages essentielles"),
  website_standard: t("A full business website", "Un site d'entreprise complet"),
  website_large: t("A larger site", "Un site plus grand"),
  store_standard: t("An online store", "Une boutique en ligne"),
  store_large: t("A larger online store", "Une boutique en ligne plus grande"),
  store_custom: t("Custom commerce", "Commerce sur mesure"),
  brand_refresh: t("Brand refresh", "Rafraîchissement de marque"),
  brand_identity: t("Brand identity", "Identité de marque"),
  brand_positioning: t("Brand positioning", "Positionnement de marque"),
  seo_engagement: t("Search engagement", "Mandat de référencement"),
  software_dashboard: t("Business dashboard", "Tableau de bord d'entreprise"),
  software_portal: t("Customer portal", "Portail client"),
  software_platform: t("Platform", "Plateforme"),
  automation_connect: t("Connect two tools", "Connecter deux outils"),
  automation_workflow: t("Automate a process", "Automatiser un processus"),
  automation_ai: t("AI system", "Système d'IA"),
};

export const ADDITION_LABELS: Record<string, L> = {
  bookings: t("Bookings or appointments", "Rendez-vous ou réservations"),
  "bookings.integrate": t("Connect the booking tool we already use", "Connecter l'outil de réservation qu'on utilise déjà"),
  "bookings.build": t("Build us a scheduling system", "Nous bâtir un système de réservation"),
  ordering: t("Online ordering", "Commande en ligne"),
  "ordering.integrate": t("Connect the ordering platform we already use", "Connecter la plateforme de commande qu'on utilise déjà"),
  "ordering.build": t("Build us an ordering system", "Nous bâtir un système de commande"),
  payments: t("Take payments", "Accepter des paiements"),
  accounts: t("Customer logins", "Comptes clients"),
  sell_products: t("Sell a few products", "Vendre quelques produits"),
  multi_location: t("Several locations", "Plusieurs emplacements"),
  connect_tools: t("Connect the tools we already use", "Connecter les outils qu'on utilise déjà"),
  connect_internal: t("Connect our own internal system", "Connecter notre propre système interne"),
  content_migration: t("Move content from our old site", "Transférer le contenu de notre ancien site"),
  accessibility: t("Accessibility or compliance requirements", "Exigences d'accessibilité ou de conformité"),
  stakeholders: t("Several people need to approve it", "Plusieurs personnes doivent l'approuver"),
  content_help: t("Help with the writing", "Aide pour la rédaction"),
  content_full: t("We write the content", "On rédige le contenu"),
  custom_functionality: t("Something custom we haven't described", "Quelque chose de sur mesure non décrit ici"),
};

export const SEO_LABELS: Record<string, L> = {
  "seo.none": t("No extra search work", "Aucun travail de référencement supplémentaire"),
  "seo.local": t("Local search setup", "Configuration du référencement local"),
  "seo.content_strategy": t("Search strategy and content plan", "Stratégie de recherche et plan de contenu"),
};

export const INCLUDE_LABELS: Record<string, L> = {
  polished_design: t("Polished design", "Design soigné"),
  custom_design: t("Custom design, made for you", "Design sur mesure, fait pour vous"),
  design_system: t("A design system, not just pages", "Un système de design, pas juste des pages"),
  up_to_five_pages: t("Up to 5 pages", "Jusqu'à 5 pages"),
  home_about_contact: t("Home, about and contact", "Accueil, à propos et contact"),
  service_pages: t("3–8 service or content pages", "3 à 8 pages de services ou de contenu"),
  many_service_pages: t("Many service or content pages", "Plusieurs pages de services ou de contenu"),
  content_structure: t("Content structure and hierarchy", "Structure et hiérarchie du contenu"),
  responsive: t("Works properly on phones", "Fonctionne bien sur mobile"),
  contact_form: t("Contact form", "Formulaire de contact"),
  lead_forms: t("Contact and enquiry forms", "Formulaires de contact et de demande"),
  cms_editing: t("Edit the content yourself", "Modifiez le contenu vous-même"),
  analytics_search_console: t("Analytics and Search Console", "Analytique et Search Console"),
  technical_seo: t("Technical SEO foundation", "Fondations SEO techniques"),
  schema: t("Structured data", "Données structurées"),
  social_links: t("Social links", "Liens vers les réseaux sociaux"),
  deployment: t("Launch and handover", "Mise en ligne et transfert"),
  storefront_setup: t("Storefront set up", "Boutique configurée"),
  theme_customised: t("Theme customised to your brand", "Thème adapté à votre marque"),
  custom_theme: t("Custom theme", "Thème sur mesure"),
  product_templates: t("Product page templates", "Gabarits de fiches produits"),
  normal_catalogue: t("Your catalogue loaded", "Votre catalogue chargé"),
  large_catalogue: t("A large catalogue loaded", "Un grand catalogue chargé"),
  payments_setup: t("Payments set up", "Paiements configurés"),
  shipping_tax_config: t("Shipping and tax set up", "Livraison et taxes configurées"),
  operations_workflow: t("Operations workflow", "Flux opérationnel"),
  custom_commerce: t("Custom commerce engine", "Moteur de commerce sur mesure"),
  logo_refinement: t("Logo refinement", "Raffinement du logo"),
  logo_system: t("Logo system", "Système de logo"),
  colour_type: t("Colour and typography", "Couleurs et typographie"),
  basic_guidelines: t("Basic usage guidelines", "Guide d'utilisation de base"),
  brand_guidelines: t("Brand guidelines", "Guide de marque"),
  asset_kit: t("Asset kit", "Trousse d'actifs"),
  market_positioning: t("Market positioning", "Positionnement de marché"),
  naming_messaging: t("Naming and messaging", "Nom et message"),
  launch_assets: t("Launch assets", "Actifs de lancement"),
  technical_audit: t("Technical audit", "Audit technique"),
  keyword_research: t("Keyword and topic research", "Recherche de mots-clés et de sujets"),
  competitor_analysis: t("Competitor analysis", "Analyse de la concurrence"),
  keyword_mapping: t("Basic keyword mapping", "Cartographie de base des mots-clés"),
  information_architecture: t("Information architecture", "Architecture de l'information"),
  onpage_optimization: t("On-page optimization", "Optimisation on-page"),
  measurement_baseline: t("Measurement baseline", "Point de référence des mesures"),
  local_seo_setup: t("Local search setup", "Configuration du référencement local"),
  google_business_profile: t("Google Business Profile", "Fiche d'établissement Google"),
  location_schema: t("Location structured data", "Données structurées d'emplacement"),
  content_plan: t("Content plan", "Plan de contenu"),
  internal_linking: t("Internal linking", "Maillage interne"),
  authentication: t("User logins", "Connexion des utilisateurs"),
  roles_permissions: t("Roles and permissions", "Rôles et permissions"),
  database_design: t("Database design", "Conception de la base de données"),
  core_screens: t("Core screens", "Écrans principaux"),
  reporting: t("Reporting", "Rapports"),
  admin_crud: t("Admin management screens", "Écrans de gestion administrateur"),
  customer_surface: t("Customer-facing area", "Espace client"),
  multiple_surfaces: t("Multiple application areas", "Plusieurs sections applicatives"),
  admin_surface: t("Admin area", "Section administration"),
  hosting_environment: t("Hosting environment", "Environnement d'hébergement"),
  data_ingestion: t("Data intake", "Réception des données"),
  processing_logic: t("Processing logic", "Logique de traitement"),
  ai_processing: t("AI processing", "Traitement par IA"),
  classification_extraction: t("Classification and extraction", "Classification et extraction"),
  human_review_step: t("Human review step", "Étape de validation humaine"),
  result_storage: t("Result storage", "Stockage des résultats"),
  error_handling: t("Error handling", "Gestion des erreurs"),
};

/** Named so a prospect knows what was not counted. */
export const EXCLUDE_LABELS: Record<string, L> = {
  third_party_fees: t("Third-party fees (hosting, domains, platform plans)", "Frais de tiers (hébergement, domaines, forfaits de plateforme)"),
  stock_media: t("Stock photography or video", "Photos ou vidéos de banque"),
  ongoing_services: t("Ongoing services — quoted separately", "Services récurrents — chiffrés séparément"),
  paid_advertising: t("Paid advertising budget", "Budget publicitaire"),
};

/**
 * What the two ends of the range MEAN. The bounds are not a confidence
 * interval — saying what each assumes is what turns a spread into information
 * rather than anxiety.
 */
export const ASSUMPTION_LABELS: Record<string, L> = {
  supplied_content_simple: t(
    "you supply the words and images, and the scope stays close to what you picked",
    "vous fournissez les textes et les images, et la portée reste proche de ce que vous avez choisi",
  ),
  supplied_content_normal: t(
    "you supply most of the content and the page structure is straightforward",
    "vous fournissez l'essentiel du contenu et la structure des pages reste simple",
  ),
  clear_structure_supplied_content: t(
    "the structure is clear up front and most content already exists",
    "la structure est claire dès le départ et l'essentiel du contenu existe déjà",
  ),
  more_pages_or_design: t(
    "more pages, more design involvement, or content we produce for you",
    "plus de pages, plus de travail de design, ou du contenu qu'on produit pour vous",
  ),
  more_content_and_design: t(
    "more service pages, original content, and more rounds on the design",
    "plus de pages de services, du contenu original, et plus de rondes de design",
  ),
  original_content_and_architecture: t(
    "substantial original content and a deeper content architecture",
    "beaucoup de contenu original et une architecture de contenu plus poussée",
  ),
  catalogue_supplied: t(
    "you supply product information and images, on a standard platform setup",
    "vous fournissez les informations et images de produits, sur une configuration standard",
  ),
  catalogue_and_theme_work: t(
    "a larger catalogue, more theme work, or operational setup",
    "un plus grand catalogue, plus de travail sur le thème, ou de la configuration opérationnelle",
  ),
  operations_and_theme_work: t(
    "heavier operations, a custom theme, or unusual fulfilment needs",
    "des opérations plus lourdes, un thème sur mesure, ou des besoins d'expédition inhabituels",
  ),
  existing_assets_usable: t("your existing assets are usable as a starting point", "vos actifs existants servent de point de départ"),
  clear_direction: t("the direction is clear from the start", "la direction est claire dès le départ"),
  more_exploration: t("more exploration and more rounds before it lands", "plus d'exploration et plus de rondes avant d'arriver au bon résultat"),
  single_location_focused: t("one location and a focused set of terms", "un seul emplacement et un ensemble de termes ciblé"),
  competitive_or_multi_location: t("a competitive market or several locations to cover", "un marché concurrentiel ou plusieurs emplacements à couvrir"),
  documented_tools: t("the tools involved are documented and behave predictably", "les outils concernés sont documentés et se comportent de façon prévisible"),
  undocumented_or_messy_data: t("undocumented tools or messy data to work around", "des outils non documentés ou des données à démêler"),
  more_steps_and_exceptions: t("more steps, and more exceptions to handle", "plus d'étapes et plus d'exceptions à gérer"),
  known_requirements: t("the requirements are known before we start", "les exigences sont connues avant de commencer"),
  more_workflows_and_integrations: t("more workflows and more systems to connect", "plus de flux de travail et plus de systèmes à connecter"),
  scoped_before_build: t("this is scoped in writing before anything is built", "c'est cadré par écrit avant de construire quoi que ce soit"),
};

export const MISC_LABELS: Record<string, L> = {
  stakeholders: t("Extra review rounds", "Rondes de révision supplémentaires"),
  rush: t("Compressed timeline", "Échéancier serré"),
  range_aggregation: t("Range aggregation", "Agrégation de la fourchette"),
  minimum: t("Minimum engagement", "Mandat minimum"),
  unknown_external_system: t("Unknown external system", "Système externe inconnu"),
  undefined_scope: t("Scope not yet defined", "Portée encore à définir"),
};

export const RECURRING_LABELS: Record<string, L> = {
  "seo-essentials": t("SEO Growth — Essentials", "Croissance SEO — Essentiel"),
  "seo-advanced": t("SEO Growth — Advanced", "Croissance SEO — Avancé"),
  "website-care-plan": t("Website care plan", "Forfait d'entretien"),
  "managed-hosting": t("Managed hosting", "Hébergement géré"),
  "content-creation": t("Content production", "Production de contenu"),
};

export const CAVEAT_LABELS: Record<string, L> = {
  unknown_external_system: t(
    "This connects to a system we have not seen inside yet, so the top of the range is wider rather than guessed at.",
    "Ça se connecte à un système dont on n'a pas encore vu l'intérieur, alors le haut de la fourchette est plus large plutôt que deviné.",
  ),
  undefined_scope: t(
    "Parts of this are still open. The range reflects that, and narrows once the scope is written down.",
    "Une partie reste à définir. La fourchette en tient compte et se resserrera une fois la portée écrite.",
  ),
  rush: t(
    "A compressed timeline costs real money — it moves the whole range, not just the top.",
    "Un échéancier serré coûte réellement plus cher — ça déplace toute la fourchette.",
  ),
};

/** Why the estimate routed to discovery, in the client's terms. */
export const DISCOVERY_REASONS: Record<string, L> = {
  software_requirements: t(
    "Software like this is scoped before it is priced. The requirements are the expensive part and they do not exist yet — so we find them out properly rather than guess at a number.",
    "Un logiciel comme celui-ci se cadre avant d'être chiffré. Les exigences sont la partie coûteuse et elles n'existent pas encore — on les établit correctement plutôt que de deviner un chiffre.",
  ),
  building_not_integrating: t(
    "You asked us to build the system, not connect one you already use. That is a software project, and it gets scoped first.",
    "Vous nous demandez de bâtir le système, pas d'en connecter un que vous utilisez déjà. C'est un projet logiciel, et il se cadre d'abord.",
  ),
  scope_undefined: t(
    "You told us parts of this are still being worked out. A written scope is worth more to you right now than a number we would have to revise.",
    "Vous nous dites qu'une partie reste à définir. Une portée écrite vous vaut plus qu'un chiffre qu'on devrait réviser.",
  ),
  phase_it: t(
    "At this size the useful advice is to phase the work rather than quote all of it at once. Discovery decides what comes first.",
    "À cette taille, le bon conseil est de découper le travail en phases plutôt que de tout chiffrer d'un coup. Le cadrage détermine par où commencer.",
  ),
};

export function labelForKey(key: string, locale: Locale): string {
  return (
    BASE_LABELS[key]?.[locale] ??
    ADDITION_LABELS[key]?.[locale] ??
    SEO_LABELS[key]?.[locale] ??
    MISC_LABELS[key]?.[locale] ??
    ASSUMPTION_LABELS[key]?.[locale] ??
    INCLUDE_LABELS[key]?.[locale] ??
    EXCLUDE_LABELS[key]?.[locale] ??
    RECURRING_LABELS[key]?.[locale] ??
    key
  );
}

/** CA$ formatting. Québec French puts the symbol after the number. */
export function formatCad(value: number, locale: Locale): string {
  const n = new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA").format(value);
  return locale === "fr" ? `${n} $` : `CA$${n}`;
}
