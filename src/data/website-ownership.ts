/**
 * The ownership resource, as data.
 *
 * The English and French pages render the same structure — the stack layers,
 * the ownership matrix, the project workflow, the credential model and the
 * FAQ. Keeping that structure here rather than duplicating it in two page
 * files means a row cannot exist in one language and quietly not the other,
 * which is the usual way a bilingual table drifts.
 *
 * Prose stays in the pages. This file holds only what is genuinely tabular,
 * plus the FAQ — which `page-schema-map.ts` also reads, so the answers a
 * search engine is offered and the answers on the page are one text.
 *
 * The French is written for Québec, not translated word-for-word. Product
 * names (Vercel, Supabase, Stripe, Shopify, GitHub, DNS, CMS) stay in
 * English because that is what people actually say.
 */

export type Bi = { en: string; fr: string };
export type Locale = "en" | "fr";

export const t = (v: Bi, locale: Locale) => v[locale];

/* ────────────────────────────────────────────────────────────────────────
   The five layers of a website
   ──────────────────────────────────────────────────────────────────────── */

export type StackLayer = {
  id: string;
  /** "01".."05" — rendered, so it lives with the data. */
  index: string;
  name: Bi;
  /** One line a non-technical owner can repeat back. */
  plain: Bi;
  /** What it is called when a developer says it. */
  examples: Bi;
  /** Whether a simple marketing site needs this layer at all. */
  required: Bi;
};

export const STACK_LAYERS: StackLayer[] = [
  {
    id: "name",
    index: "01",
    name: { en: "The name", fr: "Le nom" },
    plain: {
      en: "Your address on the internet, and the settings that point it at everything else — the site, your email, your verification records.",
      fr: "Votre adresse sur Internet, et les réglages qui la dirigent vers le reste — le site, vos courriels, vos enregistrements de vérification.",
    },
    examples: { en: "Domain name, DNS, registrar", fr: "Nom de domaine, DNS, registraire" },
    required: { en: "Always", fr: "Toujours" },
  },
  {
    id: "code",
    index: "02",
    name: { en: "The code", fr: "Le code" },
    plain: {
      en: "The actual files the website is made of, and the history of every change to them. This is the thing that gets rebuilt, moved or handed to someone else.",
      fr: "Les fichiers dont le site est fait, et l’historique de chaque modification. C’est ce qui se reconstruit, se déplace ou se remet à quelqu’un d’autre.",
    },
    examples: { en: "GitHub repository, version control", fr: "Dépôt GitHub, gestion de versions" },
    required: {
      en: "Always for custom builds — replaced by the platform on Shopify, Framer or Webflow",
      fr: "Toujours pour un site sur mesure — remplacé par la plateforme sur Shopify, Framer ou Webflow",
    },
  },
  {
    id: "delivery",
    index: "03",
    name: { en: "The delivery", fr: "La livraison" },
    plain: {
      en: "The machines that take that code and serve it to a visitor in Montréal or Melbourne in under a second, plus the certificate that makes the padlock appear.",
      fr: "Les machines qui prennent ce code et le servent à un visiteur de Montréal ou de Melbourne en moins d’une seconde, plus le certificat qui affiche le cadenas.",
    },
    examples: { en: "Vercel, managed hosting, CDN, SSL", fr: "Vercel, hébergement géré, CDN, SSL" },
    required: { en: "Always", fr: "Toujours" },
  },
  {
    id: "content",
    index: "04",
    name: { en: "The content", fr: "Le contenu" },
    plain: {
      en: "Where the words and images live, and who can change them without a developer. A CMS is a convenience, not a requirement.",
      fr: "Où vivent les textes et les images, et qui peut les modifier sans développeur. Un CMS est une commodité, pas une obligation.",
    },
    examples: {
      en: "WordPress, Webflow, Framer, Sanity, Shopify content, custom admin",
      fr: "WordPress, Webflow, Framer, Sanity, contenu Shopify, admin sur mesure",
    },
    required: {
      en: "Only if the content changes often enough that waiting on a developer is a real cost",
      fr: "Seulement si le contenu change assez souvent pour qu’attendre après un développeur devienne un coût réel",
    },
  },
  {
    id: "systems",
    index: "05",
    name: { en: "The business systems", fr: "Les systèmes d’affaires" },
    plain: {
      en: "Anything that stores customer data, takes money, sends mail or measures behaviour. This layer is where ownership matters most, because it is where your customers and your revenue are.",
      fr: "Tout ce qui conserve des données clients, encaisse de l’argent, envoie des courriels ou mesure les comportements. C’est la couche où la propriété compte le plus : vos clients et vos revenus sont là.",
    },
    examples: {
      en: "Supabase, Postgres, authentication, Stripe, Shopify, Resend, GA4, Search Console",
      fr: "Supabase, Postgres, authentification, Stripe, Shopify, Resend, GA4, Search Console",
    },
    required: {
      en: "Only what the business actually does — most brochure sites need none of it",
      fr: "Seulement ce que l’entreprise fait réellement — la plupart des sites vitrines n’en ont besoin d’aucun",
    },
  },
];

/* ────────────────────────────────────────────────────────────────────────
   The ownership matrix
   ──────────────────────────────────────────────────────────────────────── */

/**
 * `varies` marks a row where ownership is a legitimate commercial decision
 * rather than a rule. Saying "the client always owns the repository" would be
 * an overclaim — plenty of honest studios license code instead of assigning
 * it — so those rows are labelled rather than flattened.
 */
export type OwnershipRow = {
  id: string;
  group: Bi;
  asset: Bi;
  owner: Bi;
  role: Bi;
  pays: Bi;
  varies?: boolean;
};

export const OWNERSHIP_MATRIX: OwnershipRow[] = [
  {
    id: "domain",
    group: { en: "Foundations", fr: "Fondations" },
    asset: { en: "Domain name", fr: "Nom de domaine" },
    owner: {
      en: "Client — registered to the legal business name, in a registrar account the client controls",
      fr: "Client — enregistré au nom légal de l’entreprise, dans un compte de registraire que le client contrôle",
    },
    role: {
      en: "Technical contact when asked. We configure records; we do not hold the account",
      fr: "Contact technique sur demande. Nous configurons les enregistrements; nous ne détenons pas le compte",
    },
    pays: { en: "Client, direct to the registrar (~$15–$60 CAD/year)", fr: "Client, directement au registraire (~15–60 $ CAD/an)" },
  },
  {
    id: "dns",
    group: { en: "Foundations", fr: "Fondations" },
    asset: { en: "DNS / nameservers", fr: "DNS / serveurs de noms" },
    owner: { en: "Client — it lives inside the registrar or hosting account they own", fr: "Client — cela vit dans le compte de registraire ou d’hébergement qui lui appartient" },
    role: { en: "Delegated access to create and change records", fr: "Accès délégué pour créer et modifier les enregistrements" },
    pays: { en: "Included with the domain or the host", fr: "Inclus avec le domaine ou l’hébergement" },
  },
  {
    id: "email",
    group: { en: "Foundations", fr: "Fondations" },
    asset: { en: "Business email (Google Workspace, Microsoft 365)", fr: "Courriel d’entreprise (Google Workspace, Microsoft 365)" },
    owner: { en: "Client, without exception — it is the recovery method for everything else", fr: "Client, sans exception — c’est la méthode de récupération de tout le reste" },
    role: { en: "None, unless we are asked to set up DNS and deliverability records", fr: "Aucun, sauf si on nous demande de configurer le DNS et la délivrabilité" },
    pays: { en: "Client, per mailbox per month", fr: "Client, par boîte et par mois" },
  },
  {
    id: "repo",
    group: { en: "Build", fr: "Construction" },
    asset: { en: "Source code repository (GitHub)", fr: "Dépôt de code source (GitHub)" },
    owner: {
      en: "Client owns the delivered code. The repository itself is usually transferred at handoff",
      fr: "Le client possède le code livré. Le dépôt lui-même est habituellement transféré à la remise",
    },
    role: { en: "We build in it, and transfer or mirror it to the client organisation", fr: "Nous y développons, puis le transférons ou le copions vers l’organisation du client" },
    pays: { en: "Nothing at this size — private repositories are free", fr: "Rien à cette échelle — les dépôts privés sont gratuits" },
    varies: true,
  },
  {
    id: "hosting",
    group: { en: "Build", fr: "Construction" },
    asset: { en: "Hosting / deployment (Vercel, managed hosting)", fr: "Hébergement / déploiement (Vercel, hébergement géré)" },
    owner: {
      en: "Client account is the default. Hosting under our account is a valid managed-service choice — but say so in writing",
      fr: "Un compte au nom du client par défaut. L’hébergement sous notre compte est un choix de service géré valable — mais écrivez-le noir sur blanc",
    },
    role: { en: "Deploy, monitor, configure domains and environment variables", fr: "Déployer, surveiller, configurer les domaines et les variables d’environnement" },
    pays: {
      en: "Client directly, or bundled into managed hosting / a care plan",
      fr: "Client directement, ou inclus dans l’hébergement géré / un forfait d’entretien",
    },
    varies: true,
  },
  {
    id: "cms",
    group: { en: "Build", fr: "Construction" },
    asset: { en: "CMS (WordPress, Webflow, Framer, Sanity, custom)", fr: "CMS (WordPress, Webflow, Framer, Sanity, sur mesure)" },
    owner: { en: "Client — the owner seat on the account, and every piece of content in it", fr: "Client — le siège propriétaire du compte, et tout le contenu qui s’y trouve" },
    role: { en: "Build it, configure it, train your team, keep an editor or developer seat", fr: "Le bâtir, le configurer, former votre équipe, garder un siège éditeur ou développeur" },
    pays: { en: "Client, if the CMS is paid software. A CMS built into the site has no separate fee", fr: "Client, si le CMS est un logiciel payant. Un CMS intégré au site n’a pas de frais distincts" },
  },
  {
    id: "database",
    group: { en: "Data", fr: "Données" },
    asset: { en: "Database & backend (Supabase, Postgres)", fr: "Base de données et infonuagique (Supabase, Postgres)" },
    owner: { en: "Client organisation — it holds your customers’ data, so it holds your legal obligations", fr: "Organisation du client — elle contient les données de vos clients, donc vos obligations légales" },
    role: { en: "Developer access to build the schema, functions and security policies", fr: "Accès développeur pour bâtir le schéma, les fonctions et les politiques de sécurité" },
    pays: { en: "Client. Free tiers cover most projects at launch", fr: "Client. Les forfaits gratuits suffisent à la plupart des projets au lancement" },
  },
  {
    id: "auth",
    group: { en: "Data", fr: "Données" },
    asset: { en: "Authentication & user accounts", fr: "Authentification et comptes utilisateurs" },
    owner: { en: "Client — it is part of the same backend project", fr: "Client — cela fait partie du même projet infonuagique" },
    role: { en: "Implement sign-in, roles, permissions and session security", fr: "Implanter la connexion, les rôles, les permissions et la sécurité des sessions" },
    pays: { en: "Client, usually inside the backend plan", fr: "Client, habituellement inclus au forfait infonuagique" },
  },
  {
    id: "stripe",
    group: { en: "Money", fr: "Argent" },
    asset: { en: "Payments (Stripe)", fr: "Paiements (Stripe)" },
    owner: {
      en: "Client’s business entity. Not negotiable — the account is verified against your identity and pays out to your bank",
      fr: "L’entité juridique du client. Non négociable — le compte est vérifié contre votre identité et verse dans votre banque",
    },
    role: { en: "Restricted API access to build and test the integration", fr: "Accès API restreint pour bâtir et tester l’intégration" },
    pays: { en: "Client — per-transaction fees, deducted from payouts", fr: "Client — frais par transaction, déduits des versements" },
  },
  {
    id: "shopify",
    group: { en: "Money", fr: "Argent" },
    asset: { en: "Ecommerce platform (Shopify)", fr: "Plateforme ecommerce (Shopify)" },
    owner: { en: "Client — store owner seat, products, inventory, orders and customer list", fr: "Client — siège propriétaire, produits, inventaire, commandes et liste de clients" },
    role: { en: "Staff or Collaborator access, scoped to what the work needs", fr: "Accès Personnel ou Collaborateur, limité à ce que le mandat exige" },
    pays: { en: "Client — monthly subscription, apps, and transaction fees", fr: "Client — abonnement mensuel, applications et frais de transaction" },
  },
  {
    id: "transactional",
    group: { en: "Money", fr: "Argent" },
    asset: { en: "Transactional email (Resend, Postmark)", fr: "Courriel transactionnel (Resend, Postmark)" },
    owner: {
      en: "Client where the volume or the sender reputation matters. Ours is reasonable on a fully managed build — it should be stated either way",
      fr: "Client lorsque le volume ou la réputation d’expéditeur compte. Le nôtre est raisonnable sur un mandat entièrement géré — dans les deux cas, ça s’écrit",
    },
    role: { en: "Wire it into the site and set the SPF, DKIM and DMARC records", fr: "L’intégrer au site et configurer les enregistrements SPF, DKIM et DMARC" },
    pays: { en: "Client. Free tiers usually cover contact-form volume", fr: "Client. Les forfaits gratuits couvrent habituellement le volume d’un formulaire" },
    varies: true,
  },
  {
    id: "ga4",
    group: { en: "Measurement", fr: "Mesure" },
    asset: { en: "Google Analytics 4", fr: "Google Analytics 4" },
    owner: { en: "Client’s Google account owns the property — years of history live in it", fr: "Le compte Google du client possède la propriété — des années d’historique s’y trouvent" },
    role: { en: "Administrator or Editor role, granted by the client", fr: "Rôle Administrateur ou Éditeur, accordé par le client" },
    pays: { en: "Free", fr: "Gratuit" },
  },
  {
    id: "gsc",
    group: { en: "Measurement", fr: "Mesure" },
    asset: { en: "Google Search Console", fr: "Google Search Console" },
    owner: { en: "Client — verify with a DNS record so verification survives a site rebuild", fr: "Client — vérifiez par un enregistrement DNS pour que la vérification survive à une refonte" },
    role: { en: "Delegated Full user, for indexing, coverage and query data", fr: "Utilisateur Complet délégué, pour l’indexation, la couverture et les requêtes" },
    pays: { en: "Free", fr: "Gratuit" },
  },
  {
    id: "ads",
    group: { en: "Measurement", fr: "Mesure" },
    asset: { en: "Google Ads", fr: "Google Ads" },
    owner: { en: "Client — the account, the billing profile and the conversion history", fr: "Client — le compte, le profil de facturation et l’historique de conversions" },
    role: { en: "Manager (MCC) access, so the account stays the client’s when management ends", fr: "Accès gestionnaire (MCC), pour que le compte reste celui du client à la fin du mandat" },
    pays: { en: "Client — ad spend billed to the client’s card, plus any management fee", fr: "Client — dépenses publicitaires sur sa carte, plus les honoraires de gestion" },
  },
  {
    id: "clarity",
    group: { en: "Measurement", fr: "Mesure" },
    asset: { en: "Behaviour analytics (Microsoft Clarity)", fr: "Analytique comportementale (Microsoft Clarity)" },
    owner: { en: "Client, or shared — it records sessions, so treat it as customer data", fr: "Client, ou partagé — il enregistre des sessions, donc traitez-le comme des données clients" },
    role: { en: "Install and read it; recommend a consent gate before it loads", fr: "L’installer et le lire; recommander un consentement avant son chargement" },
    pays: { en: "Free", fr: "Gratuit" },
  },
  {
    id: "gbp",
    group: { en: "Measurement", fr: "Mesure" },
    asset: { en: "Google Business Profile", fr: "Fiche d’établissement Google" },
    owner: { en: "Client — it is a verified record of a real business, and that business is yours", fr: "Client — c’est un registre vérifié d’une vraie entreprise, et cette entreprise est la vôtre" },
    role: { en: "Manager access to optimise listings, photos, posts and categories", fr: "Accès gestionnaire pour optimiser la fiche, les photos, les publications et les catégories" },
    pays: { en: "Free", fr: "Gratuit" },
  },
  {
    id: "assets",
    group: { en: "Work product", fr: "Livrables" },
    asset: { en: "Design files, brand assets, written content", fr: "Fichiers de design, actifs de marque, contenu rédigé" },
    owner: { en: "Client on final payment — including editable source files, not just exports", fr: "Client au paiement final — fichiers sources modifiables inclus, pas seulement des exports" },
    role: { en: "We produce them and hand them over", fr: "Nous les produisons et les remettons" },
    pays: { en: "Included in the project fee", fr: "Inclus dans les honoraires du projet" },
  },
];

/* ────────────────────────────────────────────────────────────────────────
   The project workflow
   ──────────────────────────────────────────────────────────────────────── */

export type WorkflowStep = {
  id: string;
  phase: Bi;
  name: Bi;
  detail: Bi;
  /** What the client does at this step, in one clause. */
  client: Bi;
};

export const WORKFLOW: WorkflowStep[] = [
  {
    id: "discovery",
    phase: { en: "Before the build", fr: "Avant la construction" },
    name: { en: "Discovery", fr: "Découverte" },
    detail: {
      en: "What the business does, who buys from it, what the site has to accomplish, and what already exists — including accounts nobody has logged into for two years.",
      fr: "Ce que l’entreprise fait, qui achète, ce que le site doit accomplir, et ce qui existe déjà — y compris les comptes auxquels personne ne s’est connecté depuis deux ans.",
    },
    client: { en: "Answers questions; digs up old logins", fr: "Répond aux questions; retrouve les vieux accès" },
  },
  {
    id: "architecture",
    phase: { en: "Before the build", fr: "Avant la construction" },
    name: { en: "Architecture decision", fr: "Décision d’architecture" },
    detail: {
      en: "Which of the five layers this project actually needs. A brochure site is decided here, and so is the difference between a $4,000 build and a $40,000 one.",
      fr: "Lesquelles des cinq couches ce projet exige réellement. C’est ici qu’on décide d’un site vitrine — et l’écart entre un mandat de 4 000 $ et un de 40 000 $.",
    },
    client: { en: "Approves the stack in writing", fr: "Approuve la pile technologique par écrit" },
  },
  {
    id: "provisioning",
    phase: { en: "Setup", fr: "Mise en place" },
    name: { en: "Account provisioning", fr: "Création des comptes" },
    detail: {
      en: "Each account is created once, on the client’s email, with the client’s multi-factor authentication. Doing it in this order costs twenty minutes; doing it later costs a migration.",
      fr: "Chaque compte est créé une seule fois, sur le courriel du client, avec son authentification à deux facteurs. Le faire dans cet ordre coûte vingt minutes; le faire plus tard coûte une migration.",
    },
    client: { en: "Creates the accounts, keeps the recovery codes", fr: "Crée les comptes, conserve les codes de récupération" },
  },
  {
    id: "ownership",
    phase: { en: "Setup", fr: "Mise en place" },
    name: { en: "Ownership established", fr: "Propriété établie" },
    detail: {
      en: "Owner and billing seats sit with the business before a single line of code is written. This is the step that makes every later step reversible.",
      fr: "Les sièges propriétaire et facturation appartiennent à l’entreprise avant qu’une seule ligne de code soit écrite. C’est l’étape qui rend toutes les suivantes réversibles.",
    },
    client: { en: "Holds owner and billing on every account", fr: "Détient propriétaire et facturation sur chaque compte" },
  },
  {
    id: "access",
    phase: { en: "Setup", fr: "Mise en place" },
    name: { en: "StillAwake access granted", fr: "Accès accordé à StillAwake" },
    detail: {
      en: "We are invited as administrator, developer or collaborator — a separate account with separate credentials, scoped to the work. No shared passwords.",
      fr: "Nous sommes invités comme administrateur, développeur ou collaborateur — un compte distinct, des identifiants distincts, limités au mandat. Aucun mot de passe partagé.",
    },
    client: { en: "Invites us; can revoke in one click", fr: "Nous invite; peut révoquer en un clic" },
  },
  {
    id: "build",
    phase: { en: "Build", fr: "Construction" },
    name: { en: "Design & development", fr: "Design et développement" },
    detail: {
      en: "Design direction, then the build itself, committed to a repository where every change is attributable and reversible.",
      fr: "La direction visuelle, puis la construction, versée dans un dépôt où chaque modification est attribuable et réversible.",
    },
    client: { en: "Reviews; approves rounds", fr: "Révise; approuve les rondes" },
  },
  {
    id: "integrations",
    phase: { en: "Build", fr: "Construction" },
    name: { en: "Integrations", fr: "Intégrations" },
    detail: {
      en: "Payments, forms, email, commerce, analytics and consent are connected using API keys issued from the client’s accounts — never keys borrowed from ours.",
      fr: "Paiements, formulaires, courriels, commerce, analytique et consentement sont branchés avec des clés API émises depuis les comptes du client — jamais empruntées aux nôtres.",
    },
    client: { en: "Issues keys; nothing to configure", fr: "Émet les clés; rien à configurer" },
  },
  {
    id: "staging",
    phase: { en: "Build", fr: "Construction" },
    name: { en: "Staging & testing", fr: "Préproduction et tests" },
    detail: {
      en: "A private copy of the real site on real infrastructure. Payments run in test mode, email goes nowhere near a customer, and the whole thing gets checked on a phone.",
      fr: "Une copie privée du vrai site sur la vraie infrastructure. Les paiements roulent en mode test, les courriels ne touchent aucun client, et tout est vérifié sur un téléphone.",
    },
    client: { en: "Clicks through it; signs off", fr: "Le parcourt; donne son accord" },
  },
  {
    id: "launch",
    phase: { en: "Live", fr: "En ligne" },
    name: { en: "Launch", fr: "Lancement" },
    detail: {
      en: "DNS is pointed, certificates issue, redirects from the old URLs are in place, analytics and Search Console are verified, and the sitemap is submitted.",
      fr: "Le DNS est pointé, les certificats sont émis, les redirections des anciennes adresses sont en place, l’analytique et Search Console sont vérifiées, le plan du site est soumis.",
    },
    client: { en: "Approves the DNS change", fr: "Approuve le changement DNS" },
  },
  {
    id: "monitoring",
    phase: { en: "Live", fr: "En ligne" },
    name: { en: "Monitoring & maintenance", fr: "Surveillance et entretien" },
    detail: {
      en: "Uptime, backups, dependency updates, broken-form alerts and search performance. Either you watch this, or someone is paid to.",
      fr: "Disponibilité, sauvegardes, mises à jour, alertes de formulaires brisés et performance en recherche. Soit vous surveillez, soit quelqu’un est payé pour le faire.",
    },
    client: { en: "Chooses self-managed or a care plan", fr: "Choisit l’autogestion ou un forfait d’entretien" },
  },
  {
    id: "handoff",
    phase: { en: "Live", fr: "En ligne" },
    name: { en: "Handoff or ongoing management", fr: "Remise ou gestion continue" },
    detail: {
      en: "A written inventory of every account, what it does, who owns it and what it costs — delivered whether you keep working with us or not.",
      fr: "Un inventaire écrit de chaque compte, son rôle, son propriétaire et son coût — remis que vous continuiez avec nous ou non.",
    },
    client: { en: "Receives the inventory; owns everything in it", fr: "Reçoit l’inventaire; possède tout ce qu’il contient" },
  },
];

/* ────────────────────────────────────────────────────────────────────────
   Credential model
   ──────────────────────────────────────────────────────────────────────── */

export const CREDENTIAL_MODEL = {
  client: {
    title: { en: "Client", fr: "Client" },
    subtitle: { en: "Owner account", fr: "Compte propriétaire" },
    items: [
      { en: "Owner or admin seat on every account", fr: "Siège propriétaire ou admin sur chaque compte" },
      { en: "A company email address, not a personal one", fr: "Une adresse courriel d’entreprise, pas une personnelle" },
      { en: "Their own multi-factor authentication", fr: "Sa propre authentification à deux facteurs" },
      { en: "Their own recovery codes, stored offline", fr: "Ses propres codes de récupération, conservés hors ligne" },
      { en: "The billing method for anything they pay for", fr: "Le mode de paiement de tout ce qu’ils paient" },
      { en: "The power to remove anyone, including us", fr: "Le pouvoir de retirer n’importe qui, nous inclus" },
    ],
  },
  agency: {
    title: { en: "StillAwake Media", fr: "StillAwake Media" },
    subtitle: { en: "Administrator / developer account", fr: "Compte administrateur / développeur" },
    items: [
      { en: "A separate invited account, never a shared login", fr: "Un compte invité distinct, jamais une connexion partagée" },
      { en: "Separate credentials on our own email domain", fr: "Des identifiants distincts sur notre propre domaine" },
      { en: "Our own multi-factor authentication", fr: "Notre propre authentification à deux facteurs" },
      { en: "Permissions scoped to the work, not blanket ownership", fr: "Des permissions limitées au mandat, pas une propriété globale" },
      { en: "API keys issued from the client’s account", fr: "Des clés API émises depuis le compte du client" },
      { en: "Access that ends when the engagement ends", fr: "Un accès qui prend fin avec le mandat" },
    ],
  },
} as const;

/* ────────────────────────────────────────────────────────────────────────
   FAQ — read by the page and by page-schema-map.ts
   ──────────────────────────────────────────────────────────────────────── */

/**
 * Answers are written to survive being quoted on their own, because that is
 * what an answer engine does with them. Each one states the recommendation
 * and, where ownership legitimately varies, says so rather than pretending
 * there is a single rule.
 */
export const OWNERSHIP_FAQ: { q: Bi; a: Bi }[] = [
  {
    q: {
      en: "Who owns the website when an agency builds it?",
      fr: "Qui possède le site web quand une agence le construit?",
    },
    a: {
      en: "The client should own every account the business depends on: the domain, hosting, CMS, database, payment processing, analytics and Search Console. The agency should hold administrator or developer access to those accounts instead of owning them. Ownership of the design and code itself depends on the contract — assignment on final payment is the most common arrangement, and a licence is a legitimate alternative if it is stated in writing before the project starts.",
      fr: "Le client devrait posséder chaque compte dont l’entreprise dépend : le domaine, l’hébergement, le CMS, la base de données, le traitement des paiements, l’analytique et Search Console. L’agence devrait détenir un accès administrateur ou développeur à ces comptes plutôt que d’en être propriétaire. La propriété du design et du code dépend du contrat — la cession au paiement final est l’arrangement le plus courant, et une licence reste légitime si elle est écrite avant le début du projet.",
    },
  },
  {
    q: { en: "Who should buy the domain name — me or my agency?", fr: "Qui devrait acheter le nom de domaine : moi ou mon agence?" },
    a: {
      en: "You should. Register it yourself, to your legal business name, in a registrar account you control, using a company email address you will still have in five years. Your agency can manage the DNS records and the renewals for you — that is a service. The registration itself should not be delegated, because a domain registered in someone else’s account is the single hardest thing to recover if the relationship ends badly.",
      fr: "Vous. Enregistrez-le vous-même, au nom légal de votre entreprise, dans un compte de registraire que vous contrôlez, avec une adresse courriel d’entreprise que vous aurez encore dans cinq ans. Votre agence peut gérer les enregistrements DNS et les renouvellements — c’est un service. L’enregistrement lui-même ne se délègue pas : un domaine inscrit dans le compte de quelqu’un d’autre est ce qu’il y a de plus difficile à récupérer si la relation tourne mal.",
    },
  },
  {
    q: { en: "Do I own my website’s source code?", fr: "Est-ce que je possède le code source de mon site?" },
    a: {
      en: "Only if your agreement says so. In most custom builds the code is assigned to the client on final payment and the repository is transferred at handoff. Some studios license the code instead, and some platforms — Shopify, Framer, Webflow — do not produce portable code at all. None of these is dishonest. What is dishonest is leaving it unwritten. Ask the question before you sign, not after.",
      fr: "Seulement si votre entente le dit. Dans la plupart des mandats sur mesure, le code est cédé au client au paiement final et le dépôt est transféré à la remise. Certains studios accordent plutôt une licence, et certaines plateformes — Shopify, Framer, Webflow — ne produisent pas de code portable du tout. Aucune de ces approches n’est malhonnête. Ce qui l’est, c’est de ne pas l’écrire. Posez la question avant de signer, pas après.",
    },
  },
  {
    q: { en: "Who owns the Vercel or hosting account?", fr: "À qui appartient le compte Vercel ou d’hébergement?" },
    a: {
      en: "By default, the client. Hosting held under an agency account is a legitimate managed-service model — it is often how a fixed monthly hosting fee is delivered — but it must be disclosed, and the agreement must say what happens to the deployment if you leave. The test is simple: if the answer to “can I move this myself” is no, that should have been a decision, not a surprise.",
      fr: "Par défaut, le client. Un hébergement détenu sous le compte d’une agence est un modèle de service géré légitime — c’est souvent ainsi qu’un forfait mensuel fixe est livré — mais cela doit être divulgué, et l’entente doit préciser ce qui arrive au déploiement si vous partez. Le test est simple : si la réponse à « puis-je déplacer ça moi-même » est non, ç’aurait dû être une décision, pas une surprise.",
    },
  },
  {
    q: { en: "What happens if I stop working with my web agency?", fr: "Qu’arrive-t-il si j’arrête de travailler avec mon agence web?" },
    a: {
      en: "If the infrastructure was set up properly, almost nothing. You already own the domain, the hosting, the CMS, the database, Stripe and the analytics, so the site keeps running and you keep every login. You remove the agency’s access, receive the code and a written account inventory, and either bring in someone else or keep it as it is. If losing your agency means losing your website, the problem was never the departure — it was the setup.",
      fr: "Si l’infrastructure a été montée correctement, presque rien. Vous possédez déjà le domaine, l’hébergement, le CMS, la base de données, Stripe et l’analytique : le site continue de rouler et vous gardez chaque accès. Vous retirez les accès de l’agence, recevez le code et un inventaire écrit des comptes, puis vous embauchez quelqu’un d’autre ou vous laissez le site tel quel. Si perdre votre agence signifie perdre votre site, le problème n’était pas le départ — c’était la mise en place.",
    },
  },
  {
    q: { en: "Do I need to create all these accounts myself?", fr: "Dois-je créer tous ces comptes moi-même?" },
    a: {
      en: "You create the ones your business depends on, and it takes about an hour in total — usually a domain, a hosting account, and whichever of Stripe, Shopify, Google Analytics or a database the project actually needs. We tell you exactly which ones, in what order, and sit on a call while you do it if that is easier. You never have to work out what a nameserver is; you only have to be the person holding the account.",
      fr: "Vous créez ceux dont votre entreprise dépend, et ça prend environ une heure au total — habituellement un domaine, un compte d’hébergement, puis Stripe, Shopify, Google Analytics ou une base de données selon les besoins réels du projet. Nous vous disons exactement lesquels, dans quel ordre, et nous restons en ligne pendant que vous le faites si c’est plus simple. Vous n’avez jamais à comprendre ce qu’est un serveur de noms; vous n’avez qu’à être la personne qui détient le compte.",
    },
  },
  {
    q: { en: "Who pays for hosting, the domain and the other services?", fr: "Qui paie l’hébergement, le domaine et les autres services?" },
    a: {
      en: "The client pays the vendors directly, on the client’s card, for anything the business owns — typically $15–$60 CAD a year for a domain and free-to-modest monthly fees for hosting, a database and email at small-business volume. Analytics, Search Console and Google Business Profile are free. Alternatively, a managed plan bundles hosting and upkeep into one predictable monthly fee: StillAwake Media publishes managed hosting and a website care plan rather than quoting them privately.",
      fr: "Le client paie les fournisseurs directement, sur sa carte, pour tout ce que l’entreprise possède — généralement 15 à 60 $ CAD par année pour un domaine, et des frais mensuels nuls à modestes pour l’hébergement, une base de données et les courriels à l’échelle d’une PME. L’analytique, Search Console et la fiche Google sont gratuites. Autrement, un forfait géré regroupe l’hébergement et l’entretien en un montant mensuel prévisible : StillAwake Media affiche publiquement son hébergement géré et son forfait d’entretien plutôt que de les chiffrer en privé.",
    },
  },
  {
    q: { en: "What is a CMS, and do I need one?", fr: "Qu’est-ce qu’un CMS, et m’en faut-il un?" },
    a: {
      en: "A CMS — content management system — is the admin screen where someone changes the words and images on a site without touching code. WordPress, Webflow, Framer, Sanity and Shopify’s content tools are all CMSs, and a custom site can have a small one built in. You need one when content changes often enough that waiting on a developer becomes a real cost. A five-page site rewritten twice a year does not need one, and adding it anyway buys you an update obligation and a security surface for nothing.",
      fr: "Un CMS — système de gestion de contenu — c’est l’écran d’administration où quelqu’un modifie les textes et les images sans toucher au code. WordPress, Webflow, Framer, Sanity et les outils de contenu de Shopify sont tous des CMS, et un site sur mesure peut en intégrer un petit. Il en faut un quand le contenu change assez souvent pour qu’attendre après un développeur devienne un coût réel. Un site de cinq pages réécrit deux fois par année n’en a pas besoin, et l’ajouter quand même vous achète une obligation de mise à jour et une surface d’attaque pour rien.",
    },
  },
  {
    q: { en: "Do I need WordPress?", fr: "Ai-je besoin de WordPress?" },
    a: {
      en: "No. WordPress is one CMS among several, and it is a reasonable choice for a content-heavy site with editors who already know it. It is not a requirement for having a website, it is not required for SEO, and it carries a real maintenance obligation: core, theme and plugin updates are the most common cause of a site breaking or being compromised. Choose it because the editing workflow suits your team, not because someone implied it is the default.",
      fr: "Non. WordPress est un CMS parmi d’autres, et c’est un choix raisonnable pour un site à fort volume de contenu dont les éditeurs le connaissent déjà. Ce n’est pas une condition pour avoir un site web, ce n’est pas exigé par le référencement, et ça comporte une vraie obligation d’entretien : les mises à jour du noyau, du thème et des extensions sont la cause la plus fréquente de bris ou de compromission. Choisissez-le parce que le flux d’édition convient à votre équipe, pas parce qu’on a laissé entendre que c’est la norme.",
    },
  },
  {
    q: { en: "Does my website need a database?", fr: "Mon site a-t-il besoin d’une base de données?" },
    a: {
      en: "Usually not. A marketing or brochure website — pages, services, a portfolio, a contact form — needs no custom database at all, and adding one adds cost, backups and a security obligation for no benefit. You need one when the site stores something specific to each visitor: user accounts, bookings, saved data, memberships, an internal dashboard. If a supplier proposes a database for a five-page site, ask what it stores.",
      fr: "Habituellement non. Un site vitrine — des pages, des services, un portfolio, un formulaire — n’a besoin d’aucune base de données sur mesure, et en ajouter une ajoute des coûts, des sauvegardes et une obligation de sécurité sans bénéfice. Il en faut une quand le site conserve quelque chose de propre à chaque visiteur : comptes utilisateurs, réservations, données sauvegardées, adhésions, tableau de bord interne. Si un fournisseur propose une base de données pour un site de cinq pages, demandez ce qu’elle stockerait.",
    },
  },
  {
    q: { en: "What is Vercel?", fr: "Qu’est-ce que Vercel?" },
    a: {
      en: "Vercel is a hosting platform: it takes the code from a repository, builds it, and serves the finished site from servers around the world, handling SSL certificates and previews of every change along the way. For a business owner it is simply where the website runs — the modern equivalent of a web host. The account should be in your business’s name unless you have deliberately chosen a managed-hosting arrangement.",
      fr: "Vercel est une plateforme d’hébergement : elle prend le code d’un dépôt, le compile et sert le site fini depuis des serveurs répartis dans le monde, en gérant au passage les certificats SSL et un aperçu de chaque modification. Pour un propriétaire d’entreprise, c’est simplement l’endroit où le site roule — l’équivalent moderne d’un hébergeur. Le compte devrait être au nom de votre entreprise, sauf si vous avez délibérément choisi une formule d’hébergement géré.",
    },
  },
  {
    q: { en: "What is Supabase?", fr: "Qu’est-ce que Supabase?" },
    a: {
      en: "Supabase is a hosted backend: a PostgreSQL database, user authentication and file storage, packaged so a small team can run them without managing servers. A website only needs it if it stores per-user data — accounts, bookings, submissions, an internal tool. When a project does use it, the Supabase organisation should belong to the client, because it is the client’s customer data sitting inside it.",
      fr: "Supabase est un ensemble de services infonuagiques : une base de données PostgreSQL, l’authentification des utilisateurs et le stockage de fichiers, réunis pour qu’une petite équipe les exploite sans gérer de serveurs. Un site n’en a besoin que s’il conserve des données par utilisateur — comptes, réservations, soumissions, outil interne. Quand un projet l’utilise, l’organisation Supabase doit appartenir au client : ce sont ses données clients qui s’y trouvent.",
    },
  },
  {
    q: { en: "Why would my website need Stripe?", fr: "Pourquoi mon site aurait-il besoin de Stripe?" },
    a: {
      en: "Only if you take money on the site — a deposit, a subscription, a booking fee, a digital product, or checkout on a custom store. Stripe is the payment processor: it handles the card details so your site never touches them, then pays out to your bank. The account must be opened by your business, in your business’s legal name, because it is verified against your identity and it is your bank account receiving the money. No agency should own a client’s Stripe account.",
      fr: "Seulement si vous encaissez de l’argent sur le site — un dépôt, un abonnement, des frais de réservation, un produit numérique ou un paiement sur une boutique sur mesure. Stripe est le processeur de paiement : il gère les données de carte pour que votre site n’y touche jamais, puis verse dans votre compte bancaire. Le compte doit être ouvert par votre entreprise, à son nom légal, parce qu’il est vérifié contre votre identité et que c’est votre compte bancaire qui reçoit l’argent. Aucune agence ne devrait posséder le compte Stripe d’un client.",
    },
  },
  {
    q: { en: "Who should own Google Analytics and Search Console?", fr: "Qui devrait posséder Google Analytics et Search Console?" },
    a: {
      en: "Your business, on a Google account you control. Both are free, both accumulate history you cannot recreate, and both are routinely lost when an agency creates them under its own login. Grant your agency Administrator access in Analytics and delegate a Full user in Search Console. Verify Search Console with a DNS record rather than a file or a tag, so verification survives the next rebuild.",
      fr: "Votre entreprise, sur un compte Google que vous contrôlez. Les deux sont gratuits, les deux accumulent un historique impossible à recréer, et les deux se perdent régulièrement quand une agence les crée sous sa propre session. Accordez à votre agence un accès Administrateur dans Analytics et déléguez un utilisateur Complet dans Search Console. Vérifiez Search Console par un enregistrement DNS plutôt que par un fichier ou une balise, pour que la vérification survive à la prochaine refonte.",
    },
  },
  {
    q: { en: "Should I share my passwords with my web agency?", fr: "Dois-je partager mes mots de passe avec mon agence web?" },
    a: {
      en: "No. Every platform worth using — Google, Shopify, Stripe, Vercel, GitHub, Supabase — lets you invite a separate user with its own credentials and its own multi-factor authentication. A shared login means you cannot tell who did what, you cannot revoke one person without locking out everyone, and your access depends on somebody else’s phone. Invite an account instead. It takes the same thirty seconds and it is reversible in one click.",
      fr: "Non. Chaque plateforme sérieuse — Google, Shopify, Stripe, Vercel, GitHub, Supabase — permet d’inviter un utilisateur distinct avec ses propres identifiants et sa propre authentification à deux facteurs. Une connexion partagée signifie qu’on ne sait plus qui a fait quoi, qu’on ne peut retirer une personne sans bloquer tout le monde, et que votre accès dépend du téléphone de quelqu’un d’autre. Invitez un compte à la place. Ça prend les mêmes trente secondes et ça se révoque en un clic.",
    },
  },
  {
    q: { en: "What happens to everything after launch?", fr: "Qu’arrive-t-il à tout ça après le lancement?" },
    a: {
      en: "The accounts keep costing what they cost, the software keeps needing updates, and the search data keeps accumulating whether anyone reads it or not. Someone has to own that: either your team watches uptime, backups, updates and forms, or you buy a plan that does. What should not happen is the third option — nobody watching, which is how sites quietly break and stay broken for months.",
      fr: "Les comptes continuent de coûter ce qu’ils coûtent, les logiciels continuent d’exiger des mises à jour, et les données de recherche continuent de s’accumuler que quelqu’un les lise ou non. Quelqu’un doit en répondre : soit votre équipe surveille la disponibilité, les sauvegardes, les mises à jour et les formulaires, soit vous achetez un forfait qui le fait. Ce qu’il faut éviter, c’est la troisième option — personne ne surveille, et c’est ainsi qu’un site se brise en silence et le reste pendant des mois.",
    },
  },
];

/** Shape the schema registry wants. */
export const faqFor = (locale: Locale) =>
  OWNERSHIP_FAQ.map(({ q, a }) => ({ q: q[locale], a: a[locale] }));

/** Shape `FaqBlock` wants. */
export const faqPairs = (locale: Locale): [string, string][] =>
  OWNERSHIP_FAQ.map(({ q, a }) => [q[locale], a[locale]]);
