/**
 * ═══════════════════════════════════════════════════════════════════════════
 * THE ARCHITECTURE RECOMMENDER — 4 of 5 · LABELS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Every string the recommendation can produce, in both languages.
 *
 * The engine emits keys and never prose, so English and Québec French are two
 * renderings of ONE recommendation rather than two recommendations that happen
 * to agree today. French is written for Québec, not translated from English —
 * the same rule the pricing kernel follows.
 *
 * TWO REGISTERS LIVE HERE, and mixing them is the failure mode this file is
 * organised to prevent:
 *
 *   CLIENT-FACING — `CLASS_LABELS`, `REASON_LABELS`, `LAYER_LABELS` and the
 *     rest. No stack names, no jargon. A restaurant owner reads these.
 *
 *   TECHNICAL — `TECH_LABELS` only, shown behind "view technical details".
 *     This is where Next.js, Supabase and Sanity are allowed to appear.
 *
 * A prospect who wants the stack can open the panel. A prospect who does not
 * should never be shown a proper noun they have to look up.
 */

import type {
  ArchitectureClassId,
  Complexity,
  Confidence,
  EducationalLinkId,
  LayerId,
  Locale,
} from "./types";

type L = { en: string; fr: string };
const t = (en: string, fr: string): L => ({ en, fr });

/* ── the recommendation, named ────────────────────────────────────────────── */

/** The headline. Plain enough to be understood without a follow-up question. */
export const CLASS_LABELS: Record<ArchitectureClassId, L> = {
  none: t("No website or software needed", "Aucun site ni logiciel requis"),
  existing_stack: t("Work on the site you already have", "Travail sur le site que vous avez déjà"),
  static_marketing: t("A straightforward marketing website", "Un site vitrine simple"),
  cms_marketing: t("A marketing website you can edit yourself", "Un site vitrine que vous pouvez modifier vous-même"),
  custom_content: t("A custom-built website with a content system", "Un site sur mesure avec système de contenu"),
  platform_commerce: t("An online store on a proven platform", "Une boutique en ligne sur une plateforme éprouvée"),
  headless_commerce: t("A custom storefront on a proven commerce platform", "Une vitrine sur mesure sur une plateforme de commerce éprouvée"),
  automation_layer: t("An automation between the tools you already use", "Une automatisation entre les outils que vous utilisez déjà"),
  web_application: t("A real web application", "Une véritable application web"),
  business_platform: t("A custom business platform", "Une plateforme d'affaires sur mesure"),
};

/** One sentence of what it actually is, still in the client's language. */
export const CLASS_SUMMARIES: Record<ArchitectureClassId, L> = {
  none: t(
    "What you described is design and identity work. There is no system to build and nothing to host.",
    "Ce que vous décrivez est un travail de design et d'identité. Il n'y a aucun système à bâtir ni à héberger.",
  ),
  existing_stack: t(
    "Nothing needs rebuilding. This is research, structure and content work applied to the website you already run.",
    "Rien n'a besoin d'être refait. C'est du travail de recherche, de structure et de contenu appliqué au site que vous avez déjà.",
  ),
  static_marketing: t(
    "A small set of well-built pages that explain what you do and let people reach you. No accounts, no database, nothing running in the background.",
    "Un petit ensemble de pages bien faites qui expliquent ce que vous faites et permettent aux gens de vous joindre. Aucun compte, aucune base de données, rien qui tourne en arrière-plan.",
  ),
  cms_marketing: t(
    "A professional website on a proven platform, where you can change the words, swap images and add pages without calling anyone.",
    "Un site professionnel sur une plateforme éprouvée, où vous pouvez changer les textes, remplacer les images et ajouter des pages sans appeler personne.",
  ),
  custom_content: t(
    "A website built rather than assembled, with a proper content system behind it — because what you need it to do goes past what a website builder can carry.",
    "Un site bâti plutôt qu'assemblé, avec un vrai système de contenu derrière — parce que ce que vous lui demandez dépasse ce qu'un constructeur de sites peut porter.",
  ),
  platform_commerce: t(
    "A real store on the platform that already solves payments, tax, shipping and inventory — set up and designed properly rather than rebuilt from scratch.",
    "Une vraie boutique sur la plateforme qui règle déjà les paiements, les taxes, la livraison et l'inventaire — bien configurée et bien conçue plutôt que reconstruite.",
  ),
  headless_commerce: t(
    "The commerce platform keeps running your orders, inventory and payments. The storefront in front of it is built by us, because the content and search side of the business needs more than a theme.",
    "La plateforme de commerce continue de gérer vos commandes, votre inventaire et vos paiements. La vitrine devant est bâtie par nous, parce que le contenu et la recherche demandent plus qu'un thème.",
  ),
  automation_layer: t(
    "No new website. A process that runs between the systems you already have, on a schedule or on a trigger, with someone told when it fails.",
    "Aucun nouveau site. Un processus qui tourne entre les systèmes que vous avez déjà, à intervalle ou sur déclencheur, avec une alerte quand ça échoue.",
  ),
  web_application: t(
    "Software, not a website. People sign in, the system stores information that belongs to your business, and it has to be secured, backed up and looked after.",
    "Un logiciel, pas un site web. Des gens s'y connectent, le système conserve de l'information qui appartient à votre entreprise, et il doit être sécurisé, sauvegardé et entretenu.",
  ),
  business_platform: t(
    "Several kinds of user, real permissions between them, and connections to systems you already run. This is an operations platform, and it is scoped before it is priced.",
    "Plusieurs types d'utilisateurs, de vraies permissions entre eux, et des liens avec des systèmes que vous exploitez déjà. C'est une plateforme d'opérations, et elle est cadrée avant d'être chiffrée.",
  ),
};

/* ── layers ───────────────────────────────────────────────────────────────── */

export const LAYER_LABELS: Record<LayerId, L> = {
  frontend: t("What visitors see", "Ce que les visiteurs voient"),
  cms: t("Editing your content", "Modifier votre contenu"),
  hosting: t("Where it lives", "Où c'est hébergé"),
  database: t("Storing information", "Stockage d'information"),
  auth: t("Accounts and logins", "Comptes et connexions"),
  commerce: t("Selling", "Vente"),
  payments: t("Taking money", "Encaissement"),
  email: t("Email", "Courriel"),
  automation: t("Connecting other systems", "Connexion à d'autres systèmes"),
  analytics: t("Measurement", "Mesure"),
};

/** Technical layer names, for the details panel only. */
export const LAYER_TECHNICAL_LABELS: Record<LayerId, L> = {
  frontend: t("Frontend", "Frontend"),
  cms: t("CMS", "CMS"),
  hosting: t("Hosting", "Hébergement"),
  database: t("Database", "Base de données"),
  auth: t("Authentication", "Authentification"),
  commerce: t("Commerce", "Commerce"),
  payments: t("Payments", "Paiements"),
  email: t("Email", "Courriel"),
  automation: t("Automation", "Automatisation"),
  analytics: t("Analytics", "Analytique"),
};

/* ── technology ───────────────────────────────────────────────────────────── */

/**
 * NAMED PRODUCTS, BEHIND A DISCLOSURE.
 *
 * Framer and Shopify appear here as often as Next.js does, and that is the
 * point: a recommendation that can only ever resolve to the thing we most
 * enjoy building is not a recommendation.
 */
export const TECH_LABELS: Record<string, L> = {
  // frontend
  framer: t("Framer", "Framer"),
  webflow: t("Webflow", "Webflow"),
  nextjs: t("Next.js + React", "Next.js + React"),
  shopify_theme: t("Shopify theme (customised)", "Thème Shopify (personnalisé)"),
  shopify_headless_nextjs: t("Next.js storefront on Shopify", "Vitrine Next.js sur Shopify"),
  existing: t("Whatever you run today", "Ce que vous utilisez déjà"),

  // cms
  platform_native: t("The platform's own editor", "L'éditeur intégré de la plateforme"),
  shopify_admin: t("Shopify admin", "Console Shopify"),
  headless_sanity: t("Sanity (headless CMS)", "Sanity (CMS découplé)"),
  custom_admin: t("A custom-built admin", "Une console sur mesure"),

  // hosting
  platform_managed: t("Included with the platform", "Inclus avec la plateforme"),
  shopify_managed: t("Shopify (managed)", "Shopify (géré)"),
  vercel: t("Vercel", "Vercel"),

  // database
  postgres_supabase: t("PostgreSQL (Supabase)", "PostgreSQL (Supabase)"),

  // auth
  supabase_auth: t("Supabase Auth", "Supabase Auth"),
  shopify_accounts: t("Shopify customer accounts", "Comptes clients Shopify"),

  // commerce + payments
  shopify: t("Shopify", "Shopify"),
  shopify_lite: t("Embedded checkout (Shopify Buy Button or Stripe)", "Paiement intégré (Buy Button Shopify ou Stripe)"),
  custom_commerce: t("Custom commerce engine", "Moteur de commerce sur mesure"),
  shopify_payments: t("Shopify Payments", "Shopify Payments"),
  hosted_checkout: t("Hosted checkout", "Paiement hébergé"),
  stripe: t("Stripe", "Stripe"),

  // email
  form_delivery: t("Form delivery to your inbox", "Livraison du formulaire vers votre boîte de réception"),
  /* Distinct from `platform_native`, which is the CMS. Sharing one key made
     the store's email row read "the platform's own editor". */
  platform_email: t("The platform's own order emails", "Les courriels de commande de la plateforme"),
  transactional_provider: t("Transactional email (Resend)", "Courriel transactionnel (Resend)"),

  // automation
  connector_service: t("A connector service (Make, Zapier or similar)", "Un service de connexion (Make, Zapier ou équivalent)"),
  custom_jobs: t("Scheduled jobs we build", "Tâches planifiées que nous bâtissons"),

  // analytics
  ga4_gsc: t("GA4 + Search Console", "GA4 + Search Console"),
  ga4_gsc_behaviour: t("GA4 + Search Console + Clarity", "GA4 + Search Console + Clarity"),
};

/* ── reasons ──────────────────────────────────────────────────────────────── */

/**
 * Why a class was chosen, and why every layer says what it says.
 *
 * The `not_needed` reasons matter most. "No" without a because reads as a
 * limitation of the studio rather than a property of the project.
 */
export const REASON_LABELS: Record<string, L> = {
  // class-level
  brand_no_architecture: t(
    "Brand work does not need a technical setup — there is nothing to host or maintain.",
    "Le travail de marque n'exige aucune configuration technique — il n'y a rien à héberger ni à entretenir.",
  ),
  seo_works_on_existing: t(
    "Search work happens on the website you already have. Rebuilding is a separate decision, and it is not required for this.",
    "Le travail de référencement se fait sur le site que vous avez déjà. Une refonte est une décision distincte, et elle n'est pas nécessaire ici.",
  ),
  few_pages_rarely_change: t(
    "A few pages that do not change often. That does not need a content system, a database or anything running behind it.",
    "Quelques pages qui changent rarement. Ça n'exige ni système de contenu, ni base de données, ni quoi que ce soit qui tourne derrière.",
  ),
  content_you_will_change: t(
    "You will be changing the content yourself, so the setup has to make that easy without involving us.",
    "Vous modifierez le contenu vous-même, alors la configuration doit rendre ça facile sans passer par nous.",
  ),
  normal_business_site: t(
    "A normal business website — services, about, contact and a few more pages.",
    "Un site d'entreprise normal — services, à propos, contact et quelques autres pages.",
  ),
  search_led_growth: t(
    "Search is how you plan to grow, which means structured content and control over how every page is built.",
    "La recherche est votre plan de croissance, ce qui exige du contenu structuré et le contrôle de la construction de chaque page.",
  ),
  content_at_scale: t(
    "There is enough content that it has to be structured and reused, not typed into pages one at a time.",
    "Il y a assez de contenu pour qu'il soit structuré et réutilisé, plutôt que saisi page par page.",
  ),
  pages_per_location: t(
    "Several locations means a real page for each one, generated from one structure rather than copied by hand.",
    "Plusieurs emplacements exigent une vraie page pour chacun, générée à partir d'une seule structure plutôt que copiée à la main.",
  ),
  two_languages_properly: t(
    "Two languages is a structural decision made on day one — separate addresses, correct language signals, and content models that hold both.",
    "Deux langues, c'est une décision structurelle prise dès le départ — adresses distinctes, signaux de langue corrects, et modèles de contenu qui portent les deux.",
  ),
  behaviour_beyond_a_builder: t(
    "You described behaviour a website builder cannot produce, which is what makes a built frontend worth its cost.",
    "Vous décrivez un comportement qu'un constructeur de sites ne peut pas produire, et c'est ce qui justifie une interface bâtie sur mesure.",
  ),
  internal_system_involved: t(
    "It has to reach into a system you run yourself, and that is real integration work rather than a setting.",
    "Ça doit se brancher à un système que vous exploitez vous-même, et c'est un vrai travail d'intégration, pas un réglage.",
  ),
  standard_commerce_requirements: t(
    "Standard commerce requirements. Payments, tax, shipping and inventory are solved problems, and owning that infrastructure yourself is not worth what it costs.",
    "Des besoins de commerce standards. Les paiements, les taxes, la livraison et l'inventaire sont des problèmes déjà résolus, et posséder cette infrastructure ne vaut pas ce qu'elle coûte.",
  ),
  large_catalogue_still_a_catalogue: t(
    "A large catalogue is still a catalogue — size alone is not a reason to leave the platform.",
    "Un grand catalogue reste un catalogue — la taille seule n'est pas une raison de quitter la plateforme.",
  ),
  commerce_plus_content_strategy: t(
    "Selling and search-led content are both central here, and a theme cannot carry the second one at this scale.",
    "La vente et le contenu axé sur la recherche sont tous deux centraux, et un thème ne peut pas porter le second à cette échelle.",
  ),
  storefront_behaviour_platform_lacks: t(
    "The storefront has to do something the platform's own does not.",
    "La vitrine doit faire quelque chose que celle de la plateforme ne fait pas.",
  ),
  commerce_beyond_platform: t(
    "What you described is not a store on a platform — it is commerce a platform cannot model, which makes it software.",
    "Ce que vous décrivez n'est pas une boutique sur une plateforme — c'est du commerce qu'une plateforme ne peut pas modéliser, donc un logiciel.",
  ),
  automation_is_a_workflow: t(
    "The requirement is a process, not an interface. Nobody needs a new website for this.",
    "Le besoin est un processus, pas une interface. Personne n'a besoin d'un nouveau site pour ça.",
  ),
  customers_sign_in: t(
    "Your customers sign in, which means accounts, private data and everything that has to protect them.",
    "Vos clients s'y connectent, ce qui implique des comptes, des données privées et tout ce qui doit les protéger.",
  ),
  private_customer_data: t(
    "Information that belongs to one customer must never be visible to another, and that is enforced in the database, not the design.",
    "L'information qui appartient à un client ne doit jamais être visible par un autre, et ça s'applique dans la base de données, pas dans le design.",
  ),
  anyone_can_sign_up: t(
    "Anyone can sign up, so accounts, billing and separation between customers are all part of the product.",
    "N'importe qui peut s'inscrire, donc les comptes, la facturation et la séparation entre clients font partie du produit.",
  ),
  roles_and_permissions: t(
    "Different people see different things, and permissions are a design problem before they are a code problem.",
    "Des personnes différentes voient des choses différentes, et les permissions sont un problème de conception avant d'être un problème de code.",
  ),
  internal_team_tool: t(
    "Your own team uses it, internally — so it is judged on how fast it makes their day, not on how it looks to the public.",
    "C'est votre équipe qui l'utilise, à l'interne — donc on le juge sur le temps qu'il leur fait gagner, pas sur son apparence publique.",
  ),
  data_the_business_owns: t(
    "The system holds records the business owns and reads back later. That is a database, and it comes with backups and security rules.",
    "Le système conserve des données que l'entreprise possède et relit plus tard. C'est une base de données, avec sauvegardes et règles de sécurité.",
  ),
  integration_and_operations: t(
    "Between the roles, the systems it connects to and how it is run day to day, this is an operations platform rather than a single application.",
    "Entre les rôles, les systèmes connectés et l'exploitation quotidienne, c'est une plateforme d'opérations plutôt qu'une seule application.",
  ),

  // component-level — recommended
  builder_fastest_to_own: t(
    "A design-led builder gets a site this size live quickly and leaves you nothing to maintain.",
    "Un constructeur axé design met en ligne un site de cette taille rapidement et ne vous laisse rien à entretenir.",
  ),
  builder_with_collections: t(
    "This needs pages generated from a list rather than built one by one, which is where a collection-based builder earns its extra setup.",
    "Ça exige des pages générées à partir d'une liste plutôt que bâties une à une, et c'est là qu'un constructeur à collections justifie sa configuration.",
  ),
  custom_frontend_justified: t(
    "Built rather than assembled, because the requirements go past what a builder will carry.",
    "Bâti plutôt qu'assemblé, parce que les besoins dépassent ce qu'un constructeur peut porter.",
  ),
  custom_storefront_justified: t(
    "The storefront is built by us; the commerce engine stays on the platform where it belongs.",
    "La vitrine est bâtie par nous; le moteur de commerce reste sur la plateforme, là où il doit être.",
  ),
  storefront_on_the_platform: t(
    "The platform's own storefront, designed properly. Rebuilding it would buy nothing here.",
    "La vitrine intégrée de la plateforme, bien conçue. La reconstruire n'apporterait rien ici.",
  ),
  application_interface: t(
    "The screens people work in. This is an application interface, not a set of pages.",
    "Les écrans dans lesquels les gens travaillent. C'est une interface applicative, pas un ensemble de pages.",
  ),
  pages_edit_in_place: t(
    "You can edit the pages directly. There is no reason to add a separate content system on top of that.",
    "Vous pouvez modifier les pages directement. Aucune raison d'ajouter un système de contenu par-dessus.",
  ),
  edit_without_calling_anyone: t(
    "Text, images and new pages are yours to change, without a developer and without a ticket.",
    "Textes, images et nouvelles pages sont à vous de modifier, sans développeur et sans billet de support.",
  ),
  structured_content_model: t(
    "Content is stored as structured entries rather than as pages, so it can be reused, translated and generated from.",
    "Le contenu est conservé sous forme d'entrées structurées plutôt que de pages, donc réutilisable, traduisible et générable.",
  ),
  content_alongside_the_catalogue: t(
    "Editorial content lives beside the catalogue, because guides and comparisons are what will bring people to the products.",
    "Le contenu éditorial vit à côté du catalogue, parce que les guides et comparatifs sont ce qui amènera les gens aux produits.",
  ),
  catalogue_is_the_content: t(
    "Your products are the content, and the platform's own admin already manages them well.",
    "Vos produits sont le contenu, et la console de la plateforme les gère déjà bien.",
  ),
  only_if_marketing_pages_too: t(
    "Only if the platform also has public marketing pages. If it is purely the application, skip it.",
    "Seulement si la plateforme a aussi des pages publiques de mise en marché. Si c'est purement l'application, laissez tomber.",
  ),
  hosting_included_in_platform: t(
    "Hosting comes with the platform. There is no server for you to think about.",
    "L'hébergement vient avec la plateforme. Aucun serveur auquel penser.",
  ),
  platform_hosts_the_store: t(
    "The commerce platform hosts the store, including the parts that have to stay online on your busiest day.",
    "La plateforme de commerce héberge la boutique, y compris les parties qui doivent rester en ligne lors de vos pointes.",
  ),
  hosting_for_a_custom_frontend: t(
    "A built site needs somewhere to deploy to, with previews and instant rollback.",
    "Un site bâti a besoin d'un endroit où se déployer, avec aperçus et retour arrière immédiat.",
  ),
  somewhere_for_the_job_to_run: t(
    "Somewhere for the job to run on schedule. There is no website attached to it.",
    "Un endroit où la tâche s'exécute à intervalle. Aucun site web n'y est rattaché.",
  ),
  search_works_on_what_exists: t(
    "This runs on your current setup as it is.",
    "Ça fonctionne sur votre configuration actuelle telle quelle.",
  ),
  platform_owns_the_commerce_data: t(
    "The platform holds your products, orders and customers. You are not running a database.",
    "La plateforme conserve vos produits, commandes et clients. Vous n'exploitez pas de base de données.",
  ),
  somewhere_to_record_what_ran: t(
    "A small store of what ran and what it decided, so a failure can be found rather than guessed at.",
    "Un petit registre de ce qui s'est exécuté et de ce qui a été décidé, pour qu'une panne se retrouve au lieu de se deviner.",
  ),
  platform_already_has_accounts: t(
    "The platform already has customer accounts. Building a second login would be work with no benefit.",
    "La plateforme a déjà des comptes clients. Bâtir une deuxième connexion serait du travail sans bénéfice.",
  ),
  proven_commerce_platform: t(
    "Payments, tax, shipping, inventory and fraud are solved on the platform, and staying on it is what keeps this affordable.",
    "Paiements, taxes, livraison, inventaire et fraude sont réglés sur la plateforme, et y rester est ce qui garde le projet abordable.",
  ),
  few_products_dont_need_a_shop: t(
    "A handful of products does not justify a full store and a second admin. An embedded checkout does the job.",
    "Une poignée de produits ne justifie pas une boutique complète et une deuxième console. Un paiement intégré suffit.",
  ),
  payments_come_with_the_platform: t(
    "Payments come with the platform, already compliant and already tested.",
    "Les paiements viennent avec la plateforme, déjà conformes et déjà éprouvés.",
  ),
  hosted_checkout_keeps_card_data_out: t(
    "A hosted checkout means card details never touch your website, which removes an entire category of risk and paperwork.",
    "Un paiement hébergé signifie que les données de carte ne touchent jamais votre site, ce qui élimine toute une catégorie de risques et de paperasse.",
  ),
  taking_payments_directly: t(
    "You are taking payments directly, so this needs proper payment infrastructure rather than a form.",
    "Vous encaissez directement, donc ça exige une vraie infrastructure de paiement plutôt qu'un formulaire.",
  ),
  subscriptions_need_billing: t(
    "Recurring billing, invoices and failed payments are their own product. Building that yourself is a mistake people only make once.",
    "La facturation récurrente, les factures et les paiements refusés forment un produit en soi. Le bâtir soi-même est une erreur qu'on ne fait qu'une fois.",
  ),
  a_form_just_needs_delivering: t(
    "A contact form needs delivering, not a mail platform. No API keys, no sending reputation to look after.",
    "Un formulaire de contact doit être livré, pas géré par une plateforme d'envoi. Aucune clé d'API, aucune réputation d'expéditeur à surveiller.",
  ),
  system_has_to_send_mail: t(
    "The system has to send mail people depend on — confirmations, resets, alerts — so delivery has to be reliable and traceable.",
    "Le système doit envoyer des courriels dont les gens dépendent — confirmations, réinitialisations, alertes — donc la livraison doit être fiable et traçable.",
  ),
  store_sends_its_own_receipts: t(
    "The store already sends order confirmations and shipping notices.",
    "La boutique envoie déjà les confirmations de commande et les avis d'expédition.",
  ),
  this_is_the_project: t(
    "This is the project itself, not a supporting piece of it.",
    "C'est le projet lui-même, pas une pièce de soutien.",
  ),
  internal_system_needs_syncing: t(
    "Your internal system has to stay in step with this, and that sync has to be built and monitored.",
    "Votre système interne doit rester synchronisé, et cette synchronisation doit être bâtie et surveillée.",
  ),
  documented_tools_connect_cheaply: t(
    "The tools you named have proper interfaces, so connecting them is configuration rather than construction.",
    "Les outils que vous nommez ont de vraies interfaces, donc les connecter relève de la configuration, pas de la construction.",
  ),
  baseline_measurement_always: t(
    "Analytics and Search Console are in every build. You should be able to see what the site is doing without paying extra to find out.",
    "L'analytique et Search Console sont dans chaque projet. Vous devriez pouvoir voir ce que fait le site sans payer pour le savoir.",
  ),
  search_work_needs_measurement: t(
    "Search work is only worth doing if it is measured, including how people actually behave on the pages.",
    "Le travail de référencement ne vaut la peine que s'il est mesuré, y compris le comportement réel des gens sur les pages.",
  ),

  // component-level — not needed. THE IMPORTANT ONES.
  no_data_beyond_pages_and_enquiries: t(
    "Nothing here stores information beyond your pages and the enquiries that get emailed to you. A database would be cost and risk with nothing on the other side.",
    "Rien ici ne conserve d'information au-delà de vos pages et des demandes qui vous sont envoyées par courriel. Une base de données serait un coût et un risque sans contrepartie.",
  ),
  nothing_new_to_store: t(
    "Nothing new is being stored, so nothing new has to be secured or backed up.",
    "Rien de nouveau n'est conservé, donc rien de nouveau à sécuriser ou à sauvegarder.",
  ),
  automation_moves_data_not_stores_it: t(
    "The automation moves information between systems that already store it. It does not need a store of its own.",
    "L'automatisation déplace de l'information entre des systèmes qui la conservent déjà. Elle n'a pas besoin de son propre entrepôt.",
  ),
  nobody_signs_in: t(
    "Nobody signs in, so there are no accounts, no passwords and no password resets to support.",
    "Personne ne s'y connecte, donc aucun compte, aucun mot de passe et aucune réinitialisation à soutenir.",
  ),
  nothing_is_being_sold: t(
    "Nothing is being sold here, so there is no store to run and no store to pay for.",
    "Rien n'est vendu ici, donc aucune boutique à exploiter ni à payer.",
  ),
  no_money_changes_hands_here: t(
    "No money changes hands on the site, so it needs no payment setup and falls under none of the rules that come with one.",
    "Aucun argent ne change de main sur le site, donc aucune configuration de paiement et aucune des règles qui l'accompagnent.",
  ),
  nothing_to_automate_yet: t(
    "Nothing needs connecting to anything else yet. This can be added later without rebuilding what you have.",
    "Rien n'a besoin d'être connecté à autre chose pour l'instant. Ça peut s'ajouter plus tard sans tout refaire.",
  ),
  application_screens_not_pages: t(
    "This is screens, not pages. A content system would sit unused.",
    "Ce sont des écrans, pas des pages. Un système de contenu resterait inutilisé.",
  ),
  automation_has_no_frontend: t(
    "There is no website in this. Selling you one would be selling you something you did not ask for.",
    "Il n'y a aucun site web là-dedans. Vous en vendre un serait vous vendre quelque chose que vous n'avez pas demandé.",
  ),
  automation_has_no_content: t(
    "No pages, so no content system.",
    "Aucune page, donc aucun système de contenu.",
  ),
  brand_not_software: t(
    "This is brand work. There is no software here to build, host or maintain.",
    "C'est du travail de marque. Il n'y a aucun logiciel à bâtir, héberger ou entretenir.",
  ),
};

/* ── alternatives ─────────────────────────────────────────────────────────── */

export const ALTERNATIVE_REASONS: Record<string, L> = {
  cms_unused_if_nothing_changes: t(
    "A content system is worth having when content changes. On the answers you gave it would sit unused, and you would still be paying for it.",
    "Un système de contenu vaut la peine quand le contenu change. D'après vos réponses, il resterait inutilisé, et vous le paieriez quand même.",
  ),
  custom_frontend_not_earned: t(
    "Nothing you described needs behaviour a builder cannot produce. A built frontend would cost more to make and more to keep, for the same result.",
    "Rien de ce que vous décrivez n'exige un comportement qu'un constructeur ne peut produire. Une interface bâtie coûterait plus cher à faire et à garder, pour le même résultat.",
  ),
  you_said_it_will_change: t(
    "You said the content will change, and a site you cannot edit yourself becomes an invoice every time it does.",
    "Vous avez dit que le contenu changera, et un site qu'on ne peut pas modifier soi-même devient une facture chaque fois.",
  ),
  builder_hits_a_ceiling_here: t(
    "A builder would be simpler and cheaper, and it would hit a ceiling on exactly the thing you said matters.",
    "Un constructeur serait plus simple et moins cher, et il plafonnerait précisément sur ce que vous avez dit qui compte.",
  ),
  nobody_signs_in_so_no_app: t(
    "Nobody signs in and nothing is stored, so an application would add a database, a login and a security surface for no benefit.",
    "Personne ne se connecte et rien n'est conservé, donc une application ajouterait une base de données, une connexion et une surface de sécurité sans bénéfice.",
  ),
  headless_costs_a_second_system: t(
    "Splitting the storefront from the commerce engine buys flexibility and costs a second system to maintain forever. On these requirements it does not pay for itself.",
    "Séparer la vitrine du moteur de commerce achète de la flexibilité et coûte un deuxième système à entretenir en permanence. Avec ces besoins, ça ne se rentabilise pas.",
  ),
  platform_storefront_hits_a_ceiling: t(
    "Staying entirely on the platform would be simpler and cheaper, and it caps what the content and search side of this can become.",
    "Rester entièrement sur la plateforme serait plus simple et moins cher, et ça plafonne ce que le contenu et la recherche peuvent devenir.",
  ),
  a_login_is_not_a_website_feature: t(
    "A marketing site would be far cheaper, and it cannot hold private customer data safely. A login is not a feature you bolt onto one.",
    "Un site vitrine serait bien moins cher, et il ne peut pas conserver de données clients privées en sécurité. Une connexion ne se greffe pas à un site vitrine.",
  ),
  one_role_is_not_a_platform: t(
    "One kind of user does not need a permissions system. Building one now would be paying today for a shape the business has not taken yet.",
    "Un seul type d'utilisateur n'a pas besoin d'un système de permissions. En bâtir un maintenant, c'est payer aujourd'hui pour une forme que l'entreprise n'a pas encore prise.",
  ),
  roles_and_integrations_need_more: t(
    "A single application would be simpler, and it cannot carry several kinds of user with real separation between them.",
    "Une application unique serait plus simple, et elle ne peut pas porter plusieurs types d'utilisateurs avec une vraie séparation entre eux.",
  ),
  no_interface_was_asked_for: t(
    "You did not ask for something people use, you asked for something that runs. Building an interface would be scope nobody requested.",
    "Vous n'avez pas demandé quelque chose que les gens utilisent, mais quelque chose qui s'exécute. Bâtir une interface serait une portée que personne n'a demandée.",
  ),
  rebuild_is_a_separate_decision: t(
    "Rebuilding the site is a real option, and it is a separate decision from this one. Nothing here requires it.",
    "Refaire le site est une vraie option, et c'est une décision distincte de celle-ci. Rien ici ne l'exige.",
  ),
};

/* ── the human bits ───────────────────────────────────────────────────────── */

export const CLIENT_MANAGES_LABELS: Record<string, L> = {
  publish_as_you_do_now: t("Publish exactly as you do today", "Publier exactement comme aujourd'hui"),
  edit_text_and_images: t("Edit text and swap images", "Modifier les textes et remplacer les images"),
  add_pages_and_posts: t("Add pages and posts", "Ajouter des pages et des articles"),
  structured_entries: t("Add structured entries — services, locations, case studies", "Ajouter des entrées structurées — services, emplacements, études de cas"),
  products_and_prices: t("Products, prices and photos", "Produits, prix et photos"),
  orders_and_inventory: t("Orders, inventory and shipping", "Commandes, inventaire et expédition"),
  discounts_and_pages: t("Discounts and store pages", "Rabais et pages de la boutique"),
  watch_it_run: t("See what it did and when", "Voir ce qui s'est exécuté et quand"),
  your_own_records: t("Your own records inside the system", "Vos propres données dans le système"),
  user_access: t("Who has access", "Qui a accès"),
  roles_and_teams: t("Roles, teams and permissions", "Rôles, équipes et permissions"),
};

export const STUDIO_HANDLES_LABELS: Record<string, L> = {
  research_and_recommendations: t("Research and recommendations", "Recherche et recommandations"),
  measurement: t("Measurement and reporting", "Mesure et rapports"),
  design_and_build: t("Design and build", "Design et construction"),
  content_model: t("The content structure behind it", "La structure de contenu derrière"),
  domain_and_launch: t("Domain, launch and the technical setup", "Domaine, lancement et configuration technique"),
  deployment_pipeline: t("Deployments, previews and rollback", "Déploiements, aperçus et retour arrière"),
  storefront_build: t("Storefront design and build", "Design et construction de la vitrine"),
  catalogue_setup: t("Catalogue, templates and structure", "Catalogue, gabarits et structure"),
  payments_and_shipping_config: t("Payments, tax and shipping configuration", "Configuration des paiements, taxes et expédition"),
  integration_build: t("Building the integration", "Construction de l'intégration"),
  error_handling: t("What happens when it fails", "Ce qui arrive quand ça échoue"),
  monitoring: t("Monitoring and alerts", "Surveillance et alertes"),
  application_build: t("Building the application", "Construction de l'application"),
  database_and_backups: t("Database design and backups", "Conception de la base de données et sauvegardes"),
  security_rules: t("Security rules on every table", "Règles de sécurité sur chaque table"),
  integrations: t("Integrations with your systems", "Intégrations avec vos systèmes"),
};

export const OPEN_QUESTION_LABELS: Record<string, L> = {
  scope_still_open: t(
    "Parts of the scope are still open, so this could reasonably land somewhere else once they are settled.",
    "Des parties de la portée sont encore ouvertes, alors ça pourrait raisonnablement aboutir ailleurs une fois réglées.",
  ),
  how_often_content_changes: t(
    "How often the content will actually change. It is the difference between needing a content system and not.",
    "À quelle fréquence le contenu changera réellement. C'est la différence entre avoir besoin d'un système de contenu ou non.",
  ),
  second_language_scope: t(
    "A second language is part of this recommendation, but writing or translating that content is not counted in the estimate above.",
    "Une deuxième langue fait partie de cette recommandation, mais la rédaction ou la traduction de ce contenu n'est pas comptée dans l'estimation ci-dessus.",
  ),
  internal_system_unknown: t(
    "We cannot see inside your internal system before starting, so how hard it is to connect to is genuinely unknown until we look.",
    "On ne peut pas voir l'intérieur de votre système interne avant de commencer, alors la difficulté du branchement est réellement inconnue jusqu'à ce qu'on regarde.",
  ),
  custom_behaviour_undefined: t(
    "The custom part is not defined yet, and that is usually the part that decides the architecture.",
    "La partie sur mesure n'est pas encore définie, et c'est habituellement elle qui décide de l'architecture.",
  ),
};

export const COMPLEXITY_LABELS: Record<Complexity, L> = {
  low: t("Low", "Faible"),
  low_moderate: t("Low to moderate", "Faible à modérée"),
  moderate: t("Moderate", "Modérée"),
  substantial: t("Substantial", "Importante"),
  high: t("High", "Élevée"),
};

export const CONFIDENCE_LABELS: Record<Confidence, L> = {
  clear: t("Clear", "Nette"),
  reasonable: t("One of a few reasonable options", "Une option raisonnable parmi quelques-unes"),
  open: t("Provisional", "Provisoire"),
};

export const CONFIDENCE_NOTES: Record<Confidence, L> = {
  clear: t(
    "The answers point at one setup, and it is not a close call.",
    "Les réponses pointent vers une seule configuration, et ce n'est pas serré.",
  ),
  reasonable: t(
    "More than one setup would work here. This is the simplest of them, which is why it is the one shown.",
    "Plus d'une configuration fonctionnerait ici. C'est la plus simple, et c'est pourquoi c'est celle qui est affichée.",
  ),
  open: t(
    "Something material is still undecided, so treat this as a starting point rather than a conclusion.",
    "Quelque chose d'important reste à décider, alors voyez ceci comme un point de départ plutôt qu'une conclusion.",
  ),
};

export const STATUS_LABELS: Record<string, L> = {
  recommended: t("Recommended", "Recommandé"),
  optional: t("Optional", "Optionnel"),
  not_needed: t("Not needed", "Pas nécessaire"),
};

/* ── educational links ────────────────────────────────────────────────────── */

/**
 * Where a result sends someone next.
 *
 * Deep links carry a stable anchor so the reader lands on the section that
 * answers the question the result just raised — not at the top of a long guide
 * they then have to search.
 */
export const EDUCATIONAL_LINKS: Record<EducationalLinkId, { label: L; href: Record<Locale, string> }> = {
  custom_software_guide: {
    label: t("When does a business actually need custom software?", "Quand une entreprise a-t-elle vraiment besoin d'un logiciel sur mesure?"),
    href: { en: "/do-i-need-custom-software", fr: "/fr/logiciel-sur-mesure-ou-solution-existante" },
  },
  /* Anchors are identical in both locales — they are ids in the shared guide
     component, not translated strings. One link table, two languages. */
  custom_software_buy_build: {
    label: t("Buy, configure, integrate, extend or build", "Acheter, configurer, intégrer, étendre ou bâtir"),
    href: {
      en: "/do-i-need-custom-software#routes",
      fr: "/fr/logiciel-sur-mesure-ou-solution-existante#routes",
    },
  },
  custom_software_tco: {
    label: t("What custom software actually costs to own", "Ce qu'un logiciel sur mesure coûte réellement à posséder"),
    href: {
      en: "/do-i-need-custom-software#cost",
      fr: "/fr/logiciel-sur-mesure-ou-solution-existante#cost",
    },
  },
  /* ── the sibling guides ────────────────────────────────────────────────
     Deep-linked by section. The anchors are stable ids in the shared guide
     component and identical in both locales, so a French reader lands in the
     same place a English one does. */
  setup_guide: {
    label: t("What kind of website does your business need?", "Quel type de site web pour votre entreprise?"),
    href: { en: "/website-setup-guide", fr: "/fr/guide-site-web-entreprise" },
  },
  setup_guide_types: {
    label: t("The kinds of website, compared", "Les types de sites, comparés"),
    href: { en: "/website-setup-guide#types", fr: "/fr/guide-site-web-entreprise#types" },
  },
  setup_guide_ecommerce: {
    label: t("When you actually need a store", "Quand vous avez vraiment besoin d'une boutique"),
    href: { en: "/website-setup-guide#type-ecommerce", fr: "/fr/guide-site-web-entreprise#type-ecommerce" },
  },
  setup_guide_cms: {
    label: t("Choosing how you'll edit your content", "Choisir comment vous modifierez votre contenu"),
    href: { en: "/website-setup-guide#cms", fr: "/fr/guide-site-web-entreprise#cms" },
  },
  setup_guide_portal: {
    label: t("When a login changes the project", "Quand une connexion change le projet"),
    href: { en: "/website-setup-guide#type-portal", fr: "/fr/guide-site-web-entreprise#type-portal" },
  },
  website_ownership: {
    label: t("Who owns the accounts, and what you're handed", "Qui possède les comptes, et ce qu'on vous remet"),
    href: { en: "/website-ownership", fr: "/fr/propriete-site-web" },
  },
  software_development: {
    label: t("Custom software development", "Développement logiciel sur mesure"),
    href: { en: "/software-development", fr: "/fr/developpement-logiciel" },
  },
  shopify_development: {
    label: t("Shopify development", "Développement Shopify"),
    href: { en: "/shopify-development", fr: "/fr/developpement-shopify" },
  },
  framer_development: {
    label: t("Framer development", "Développement Framer"),
    href: { en: "/framer-development", fr: "/fr/developpement-framer" },
  },
  website_cost: {
    label: t("What a website costs in Canada", "Ce que coûte un site web au Québec"),
    href: { en: "/website-cost-canada", fr: "/fr/prix-site-web-quebec" },
  },
  software_cost: {
    label: t("What custom software costs in Canada", "Ce que coûte un logiciel sur mesure au Canada"),
    href: {
      en: "/stillawake-times/custom-software-development-cost-canada",
      fr: "/fr/developpement-logiciel",
    },
  },
  seo_cost: {
    label: t("What SEO costs in Canada", "Le prix du référencement au Québec"),
    href: {
      en: "/stillawake-times/how-much-does-seo-cost-canada",
      fr: "/fr/articles/prix-du-seo-au-quebec",
    },
  },
  web_design: {
    label: t("Web design", "Conception web"),
    href: { en: "/web-design-montreal", fr: "/fr/agence-web-montreal" },
  },
  ai_automation: {
    label: t("AI and automation", "IA et automatisation"),
    href: { en: "/ai-automation", fr: "/fr/automatisation-ia" },
  },
  website_maintenance: {
    label: t("What it costs to keep a site running", "Ce que coûte le maintien d'un site"),
    href: { en: "/website-maintenance", fr: "/fr/maintenance-site-web" },
  },
  pricing: {
    label: t("Published rates", "Tarifs publiés"),
    href: { en: "/pricing", fr: "/fr/tarifs" },
  },
  answer_engine_optimization: {
    label: t("Being found by AI answer engines", "Être trouvé par les moteurs de réponse IA"),
    href: { en: "/answer-engine-optimization", fr: "/fr/referencement-ia" },
  },
  local_seo: {
    label: t("Local search", "Référencement local"),
    href: { en: "/local-seo", fr: "/fr/referencement-local" },
  },
  website_redesign: {
    label: t("Website redesign", "Refonte de site web"),
    href: { en: "/website-redesign", fr: "/fr/refonte-site-web" },
  },
  branding: {
    label: t("Branding and identity", "Image de marque et identité"),
    href: { en: "/branding", fr: "/fr/image-de-marque" },
  },
};

/**
 * Resolves any key through every table, so callers never have to know which
 * one a key came from. Falls back to the key itself rather than throwing: a
 * missing label should degrade a sentence, not take down an estimate.
 */
export function architectureLabel(key: string, locale: Locale): string {
  const tables = [
    REASON_LABELS,
    ALTERNATIVE_REASONS,
    TECH_LABELS,
    CLIENT_MANAGES_LABELS,
    STUDIO_HANDLES_LABELS,
    OPEN_QUESTION_LABELS,
    STATUS_LABELS,
  ];
  for (const table of tables) {
    const hit = table[key];
    if (hit) return hit[locale];
  }
  return key;
}
