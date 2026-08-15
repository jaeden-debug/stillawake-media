/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SHARED PRICING KERNEL — 5 of 5 · LABELS
 *
 * CANONICAL SOURCE: stillawake-media (.com). Synced to .dev.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Every key the engine can emit, in English and Québec French. The engine
 * returns keys and never prose, so both public languages and the internal
 * estimator read the same model without any of them carrying its own wording.
 *
 * The French is written for Québec, not translated from the English:
 * "soumission", "cueillette", "prise de rendez-vous" and "mandat" are what a
 * Québec business actually says.
 */

export type Locale = "en" | "fr";
type L = { en: string; fr: string };
const t = (en: string, fr: string): L => ({ en, fr });

export const LINE_LABELS: Record<string, L> = {
  brand: t("Brand & positioning", "Marque et positionnement"),
  website: t("Website", "Site web"),
  store: t("Online store", "Boutique en ligne"),
  seo: t("Search visibility", "Visibilité dans les recherches"),
  content: t("Content", "Contenu"),
  software: t("Custom software", "Logiciel sur mesure"),
  automation: t("Automation & AI", "Automatisation et IA"),
};

/** One line each, in the client's terms — used under the option in the flow. */
export const LINE_BLURBS: Record<string, L> = {
  brand: t("How you look and what you stand for", "Votre image et ce que vous représentez"),
  website: t("The site itself", "Le site lui-même"),
  store: t("Selling online", "Vendre en ligne"),
  seo: t("Being found on Google and in AI answers", "Être trouvé sur Google et dans les réponses IA"),
  content: t("Words, articles, and how they get published", "Textes, articles et publication"),
  software: t("A tool, portal or system built for you", "Un outil, portail ou système sur mesure"),
  automation: t("Work your team stops doing by hand", "Du travail que votre équipe cesse de faire à la main"),
};

/** Depth options, keyed `line.depth`. */
export const DEPTH_LABELS: Record<string, L> = {
  "brand.refresh": t("Tidy up what we already have", "Rafraîchir ce qu'on a déjà"),
  "brand.identity": t("A proper identity — logo, type, colour, how it's applied", "Une vraie identité — logo, typo, couleurs, application"),
  "brand.positioning": t("Full positioning — naming, messaging, identity, launch", "Positionnement complet — nom, message, identité, lancement"),

  "website.launch": t("A focused site — a few key pages, launched fast", "Un site ciblé — quelques pages clés, lancé rapidement"),
  "website.custom": t("A full site, designed for us and built properly", "Un site complet, conçu pour nous et bien bâti"),
  "website.flagship": t("A large or unusual site", "Un grand site ou quelque chose d'inhabituel"),

  "store.simple": t("A straightforward catalogue", "Un catalogue simple"),
  "store.proper": t("A real store — catalogue, operations, the lot", "Une vraie boutique — catalogue, opérations, tout"),
  "store.custom_commerce": t("Custom commerce — subscriptions, systems, integrations", "Commerce sur mesure — abonnements, systèmes, intégrations"),

  "seo.foundations": t("Get the foundations right as we build", "Bien poser les fondations pendant la construction"),
  "seo.research": t("Research and target the terms that matter", "Rechercher et cibler les bons termes"),
  "seo.programme": t("A full programme with a plan and a baseline", "Un programme complet avec plan et point de référence"),

  "content.structure": t("We write it — you structure and publish it", "On l'écrit — vous le structurez et le publiez"),
  "content.produce": t("You write it for us", "Vous l'écrivez pour nous"),
  "content.pipeline": t("Build a system that produces it at scale", "Bâtir un système qui en produit à grande échelle"),

  "software.internal_tool": t("An internal tool for our team", "Un outil interne pour notre équipe"),
  "software.customer_product": t("Something our customers log into", "Quelque chose où nos clients se connectent"),
  "software.platform": t("A platform anyone can sign up for", "Une plateforme ouverte aux inscriptions"),

  "automation.connect": t("Connect two things, reliably", "Connecter deux choses, de façon fiable"),
  "automation.process": t("Automate a process, with a human check", "Automatiser un processus, avec validation humaine"),
  "automation.intelligent": t("A system that exercises judgement", "Un système qui exerce un jugement"),
};

export const ADDON_LABELS: Record<string, L> = {
  bookings: t("Bookings or reservations", "Prise de rendez-vous ou réservations"),
  ordering: t("Online ordering", "Commande en ligne"),
  accounts: t("Customer accounts", "Comptes clients"),
  payments: t("Taking payments", "Paiements"),
  multi_location: t("Several locations", "Plusieurs emplacements"),
  custom_functionality: t("Something custom we haven't described", "Quelque chose de sur mesure non décrit ici"),

  "bookings.link": t("Link out to a tool we already use", "Lien vers un outil qu'on utilise déjà"),
  "bookings.embedded": t("Built into the site, using an existing system", "Intégré au site, avec un système existant"),
  "bookings.custom": t("Our own availability rules and calendar", "Nos propres règles de disponibilité et calendrier"),
  "ordering.link": t("Link out to a platform we already use", "Lien vers une plateforme qu'on utilise déjà"),
  "ordering.onsite": t("Customers order and pay on our site", "Les clients commandent et paient sur notre site"),
  "ordering.full": t("Ordering, delivery, pickup and our till system", "Commande, livraison, cueillette et notre caisse"),
};

export const ORG_LABELS: Record<string, L> = {
  approvals: t("More than a couple of people need to approve it", "Plus de deux personnes doivent l'approuver"),
  compliance: t("We have accessibility or compliance requirements", "On a des exigences d'accessibilité ou de conformité"),
  integrations: t("It needs to connect to systems we already run", "Ça doit se connecter à nos systèmes existants"),
  training: t("Our team will need training and documentation", "Notre équipe aura besoin de formation et de documentation"),
};

/** Plain-language explanation of what each factor buys. */
export const ORG_BLURBS: Record<string, L> = {
  approvals: t("Review rounds with several stakeholders", "Cycles de révision avec plusieurs parties prenantes"),
  compliance: t("Conformance work and real testing", "Travail de conformité et tests réels"),
  integrations: t("Systems we cannot see inside before starting", "Systèmes qu'on ne peut pas voir de l'intérieur avant de commencer"),
  training: t("Sessions and documentation your team can use", "Sessions et documentation utilisables par votre équipe"),
};

export const TIER_LABELS: Record<string, L> = {
  launch: t("Launch", "Lancement"),
  custom: t("Custom project", "Projet sur mesure"),
  systems: t("System build", "Construction de système"),
};

export const INCLUDE_LABELS: Record<string, L> = {
  starter_layout: t("Our proven layout, set up for you", "Notre gabarit éprouvé, configuré pour vous"),
  your_brand_applied: t("Your existing brand applied", "Votre image de marque appliquée"),
  up_to_five_pages: t("Up to 5 pages", "Jusqu'à 5 pages"),
  one_revision_round: t("One round of revisions", "Une ronde de révisions"),
  original_design: t("Original design, made for you", "Design original, fait pour vous"),
  custom_responsive_build: t("Custom responsive build", "Site sur mesure adapté au mobile"),
  design_system: t("A design system, not just pages", "Un système de design, pas juste des pages"),
  content_structure: t("Content structure and hierarchy", "Structure et hiérarchie du contenu"),
  contact_form: t("Contact form", "Formulaire de contact"),
  analytics_search_console: t("Analytics and Search Console", "Analytique et Search Console"),
  technical_seo_foundation: t("Technical SEO foundation", "Fondations SEO techniques"),
  cms_editing: t("Edit the content yourself", "Modifiez le contenu vous-même"),
  deployment: t("Deployment and launch", "Mise en ligne"),
  logo_refinement: t("Logo refinement", "Raffinement du logo"),
  logo_system: t("Logo system", "Système de logo"),
  colour_type: t("Colour and typography", "Couleurs et typographie"),
  basic_guidelines: t("Basic usage guidelines", "Guide d'utilisation de base"),
  brand_guidelines: t("Brand guidelines", "Guide de marque"),
  asset_kit: t("Asset kit", "Trousse d'actifs"),
  market_positioning: t("Market positioning", "Positionnement de marché"),
  naming_messaging: t("Naming and messaging", "Nom et message"),
  launch_assets: t("Launch assets", "Actifs de lancement"),
  storefront_build: t("Storefront build", "Construction de la boutique"),
  custom_storefront: t("Custom storefront", "Boutique sur mesure"),
  product_templates: t("Product page templates", "Gabarits de fiches produits"),
  cart_checkout: t("Cart and checkout", "Panier et paiement"),
  payments_setup: t("Payment setup", "Configuration des paiements"),
  shipping_tax_config: t("Shipping and tax setup", "Configuration livraison et taxes"),
  ecommerce_seo_foundation: t("Ecommerce SEO foundation", "Fondations SEO pour boutique"),
  operations_workflow: t("Operations workflow", "Flux opérationnel"),
  schema_markup: t("Structured data", "Données structurées"),
  keyword_research: t("Keyword and topic research", "Recherche de mots-clés et de sujets"),
  information_architecture: t("Information architecture", "Architecture de l'information"),
  onpage_optimization: t("On-page optimization", "Optimisation on-page"),
  measurement_baseline: t("Measurement baseline", "Point de référence des mesures"),
  technical_audit: t("Technical audit", "Audit technique"),
  content_plan: t("Content plan", "Plan de contenu"),
  written_content: t("Written content", "Contenu rédigé"),
  editorial_schema: t("Editorial content model", "Modèle de contenu éditorial"),
  cms_workflow: t("CMS workflow", "Flux de travail CMS"),
  content_automation: t("Content automation", "Automatisation du contenu"),
  internal_linking_system: t("Internal linking system", "Système de maillage interne"),
  metadata_system: t("Metadata system", "Système de métadonnées"),
  publishing_workflow: t("Publishing workflow", "Flux de publication"),
  authentication: t("User logins", "Connexion des utilisateurs"),
  roles_permissions: t("Roles and permissions", "Rôles et permissions"),
  database_design: t("Database design", "Conception de la base de données"),
  core_screens: t("Core screens", "Écrans principaux"),
  customer_surface: t("Customer-facing area", "Espace client"),
  multiple_surfaces: t("Multiple application areas", "Plusieurs sections applicatives"),
  admin_crud: t("Admin management screens", "Écrans de gestion administrateur"),
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

export const MISC_LABELS: Record<string, L> = {
  organisation: t("Working with your organisation", "Travailler avec votre organisation"),
  rush: t("Compressed timeline", "Échéancier serré"),
  range_aggregation: t("Range aggregation", "Agrégation de la fourchette"),
  minimum: t("Minimum engagement", "Mandat minimum"),
  unknown_external_system: t("Unknown external system", "Système externe inconnu"),
  undefined_scope: t("Scope not yet defined", "Portée encore à définir"),
  discovery: t("Paid discovery", "Cadrage payant"),
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
    "This connects to a system we have not seen inside yet. Rather than guess how hard that will be, we widened the top of the range.",
    "Ça se connecte à un système dont nous n'avons pas encore vu l'intérieur. Plutôt que de deviner la difficulté, nous avons élargi le haut de la fourchette.",
  ),
  undefined_scope: t(
    "Parts of the scope are still open. The range is wider to reflect that, and it narrows once the scope is written down.",
    "Une partie de la portée reste à définir. La fourchette est plus large pour en tenir compte et se resserrera une fois la portée écrite.",
  ),
  rush: t(
    "A compressed timeline costs real money — it moves the whole range, not just the top.",
    "Un échéancier serré coûte réellement plus cher — ça déplace toute la fourchette, pas seulement le haut.",
  ),
};

/** Resolves any engine key against every table, in collision order. */
export function labelForKey(key: string, locale: Locale): string {
  return (
    DEPTH_LABELS[key]?.[locale] ??
    ADDON_LABELS[key]?.[locale] ??
    LINE_LABELS[key]?.[locale] ??
    ORG_LABELS[key]?.[locale] ??
    MISC_LABELS[key]?.[locale] ??
    INCLUDE_LABELS[key]?.[locale] ??
    RECURRING_LABELS[key]?.[locale] ??
    TIER_LABELS[key]?.[locale] ??
    key
  );
}

/** CA$ formatting. Québec French puts the symbol after the number. */
export function formatCad(value: number, locale: Locale): string {
  const n = new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA").format(value);
  return locale === "fr" ? `${n} $` : `CA$${n}`;
}
