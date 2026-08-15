/**
 * THE PUBLIC QUESTION FLOW — business language in, model input out.
 *
 * The prospect never names a capability, a complexity tier or a foundation.
 * They answer questions about their business, and this module decides what
 * that implies. That separation is deliberate on two counts:
 *
 *  1. A restaurant owner who wants online ordering should not have to know
 *     whether they need Shopify, Stripe, an API or a POS integration. They
 *     describe the outcome; the engine works out the implementation.
 *
 *  2. Security. The browser posts ANSWER KEYS, never prices or capability ids,
 *     so there is no request a client can craft that names a cheaper
 *     capability, a lower tier or a discount — those words do not appear in
 *     the wire format at all.
 *
 * Lives in the shared kernel's folder but is NOT synced to .dev: the internal
 * estimator picks capabilities directly and has no use for the simplified
 * flow. It is public-surface-only, and .com is where it belongs.
 */

import type { CapabilityId, Complexity, EstimateInput, ScopeSize } from "./types";

export type Locale = "en" | "fr";
type L = { en: string; fr: string };
const t = (en: string, fr: string): L => ({ en, fr });

export type Answers = Record<string, string | string[]>;

export type Option = { key: string; label: L; help?: L };
export type Question = {
  id: string;
  kind: "single" | "multi";
  prompt: L;
  help?: L;
  options: Option[];
  /** Shown only when this returns true. Keeps the form to what is relevant. */
  when?: (a: Answers) => boolean;
  /** A multi question may be skipped; a single one must be answered. */
  optional?: boolean;
};

const one = (a: Answers, id: string): string => (typeof a[id] === "string" ? (a[id] as string) : "");
const many = (a: Answers, id: string): string[] => (Array.isArray(a[id]) ? (a[id] as string[]) : []);
const has = (a: Answers, id: string, key: string) => many(a, id).includes(key);

/**
 * The effective branch.
 *
 * "Not sure" is a first-class answer, not a dead end — Phase 9. Someone who
 * cannot name the technology still knows what they want to be true afterwards,
 * so the outcome question resolves the branch for them and the rest of the
 * flow is identical to having picked it outright.
 */
export function branchOf(a: Answers): string {
  const goal = one(a, "goal");
  if (goal !== "not_sure") return goal;
  const outcome = one(a, "outcome");
  return (
    {
      found_on_google: "seo",
      buy_from_us: "sell",
      look_credible: "website",
      stop_manual_work: "automate",
      tool_doesnt_exist: "software",
    }[outcome] ?? ""
  );
}

const isBranch = (...names: string[]) => (a: Answers) => names.includes(branchOf(a));

export const QUESTIONS: Question[] = [
  {
    id: "goal",
    kind: "single",
    prompt: t("What are you looking to do?", "Qu'est-ce que vous voulez faire?"),
    options: [
      { key: "website", label: t("Build a website", "Créer un site web") },
      { key: "redesign", label: t("Redesign my website", "Refaire mon site web") },
      { key: "sell", label: t("Sell online", "Vendre en ligne") },
      { key: "seo", label: t("Be found on Google", "Être trouvé sur Google") },
      { key: "automate", label: t("Automate part of my business", "Automatiser une partie de mon entreprise") },
      { key: "software", label: t("Build custom software", "Créer un logiciel sur mesure") },
      { key: "not_sure", label: t("I'm not sure yet", "Je ne sais pas encore") },
    ],
  },
  {
    id: "outcome",
    kind: "single",
    when: (a) => one(a, "goal") === "not_sure",
    prompt: t("What would success look like?", "À quoi ressemblerait le succès?"),
    help: t(
      "You don't need to know what to build. Tell us what should be true afterwards.",
      "Pas besoin de savoir quoi construire. Dites-nous ce qui devrait être vrai après.",
    ),
    options: [
      { key: "found_on_google", label: t("More people find us on Google", "Plus de gens nous trouvent sur Google") },
      { key: "buy_from_us", label: t("People can buy or order from us online", "Les gens peuvent acheter ou commander en ligne") },
      { key: "look_credible", label: t("We look credible and people get in touch", "On a l'air crédible et les gens nous contactent") },
      { key: "stop_manual_work", label: t("Our team stops doing something by hand", "Notre équipe arrête de faire quelque chose à la main") },
      { key: "tool_doesnt_exist", label: t("We need a tool that doesn't exist yet", "On a besoin d'un outil qui n'existe pas encore") },
    ],
  },

  /* ── website / redesign ────────────────────────────────────────────────── */
  {
    id: "site_kind",
    kind: "single",
    when: isBranch("website"),
    prompt: t("What kind of website?", "Quel type de site web?"),
    options: [
      { key: "simple", label: t("A straightforward business website", "Un site d'entreprise simple") },
      { key: "seo_focused", label: t("A website built to rank on Google", "Un site conçu pour bien se classer sur Google") },
      { key: "local", label: t("A restaurant or local business", "Un restaurant ou un commerce local") },
      { key: "content", label: t("A content-heavy website", "Un site riche en contenu") },
    ],
  },
  {
    id: "size",
    kind: "single",
    when: isBranch("website", "redesign", "sell", "seo"),
    prompt: t("Roughly how many pages?", "Environ combien de pages?"),
    help: t("A best guess is fine.", "Une estimation approximative suffit."),
    options: [
      { key: "small", label: t("A handful — up to 6", "Quelques-unes — jusqu'à 6") },
      { key: "standard", label: t("7 to 12", "7 à 12") },
      { key: "large", label: t("13 to 25", "13 à 25") },
      { key: "very_large", label: t("26 to 60", "26 à 60") },
      { key: "xl", label: t("More than 60", "Plus de 60") },
    ],
  },
  {
    id: "needs",
    kind: "multi",
    optional: true,
    when: isBranch("website", "redesign"),
    prompt: t("What does it need to do?", "Que doit-il faire?"),
    help: t("Pick everything that applies.", "Choisissez tout ce qui s'applique."),
    options: [
      { key: "bookings", label: t("Take bookings or reservations", "Prendre des rendez-vous ou des réservations") },
      { key: "ordering", label: t("Take orders for food or products", "Prendre des commandes") },
      { key: "payments", label: t("Take payments online", "Accepter des paiements en ligne") },
      { key: "accounts", label: t("Let customers have an account", "Permettre aux clients d'avoir un compte") },
      { key: "bilingual", label: t("Work in English and French", "Fonctionner en anglais et en français") },
      { key: "blog", label: t("Have a blog or resource section", "Avoir un blogue ou une section ressources") },
      { key: "self_edit", label: t("Let us edit the content ourselves", "Nous permettre de modifier le contenu nous-mêmes") },
      { key: "seo", label: t("Be seriously optimised for search", "Être sérieusement optimisé pour la recherche") },
      { key: "locations", label: t("Cover several locations", "Couvrir plusieurs emplacements") },
      { key: "custom", label: t("Something custom we haven't described", "Quelque chose de sur mesure non décrit ici") },
    ],
  },
  {
    id: "booking_depth",
    kind: "single",
    when: (a) => has(a, "needs", "bookings"),
    prompt: t("How should booking work?", "Comment la prise de rendez-vous doit-elle fonctionner?"),
    help: t(
      "This changes the cost more than almost anything else on the page.",
      "C'est ce qui influence le plus le coût dans cette page.",
    ),
    options: [
      { key: "link", label: t("Link out to a tool we already use", "Rediriger vers un outil qu'on utilise déjà") },
      { key: "embedded", label: t("Built into the site, using an existing system", "Intégré au site, avec un système existant") },
      { key: "custom", label: t("Our own availability rules and calendar", "Nos propres règles de disponibilité et calendrier") },
    ],
  },
  {
    id: "ordering_depth",
    kind: "single",
    when: (a) => has(a, "needs", "ordering"),
    prompt: t("How should ordering work?", "Comment la commande doit-elle fonctionner?"),
    options: [
      { key: "link", label: t("Link out to a platform we already use", "Rediriger vers une plateforme qu'on utilise déjà") },
      { key: "onsite", label: t("Customers order and pay on our site", "Les clients commandent et paient sur notre site") },
      { key: "full", label: t("Ordering plus delivery, pickup and our till system", "Commande, livraison, cueillette et notre système de caisse") },
    ],
  },

  /* ── sell online ───────────────────────────────────────────────────────── */
  {
    id: "sell_what",
    kind: "single",
    when: isBranch("sell"),
    prompt: t("What are you selling?", "Que vendez-vous?"),
    options: [
      { key: "physical", label: t("Physical products", "Des produits physiques") },
      { key: "digital", label: t("Digital products", "Des produits numériques") },
      { key: "subscription", label: t("Subscriptions or memberships", "Des abonnements ou adhésions") },
      { key: "services", label: t("Services or bookings", "Des services ou des rendez-vous") },
    ],
  },
  {
    id: "catalogue",
    kind: "single",
    when: isBranch("sell"),
    prompt: t("How many products?", "Combien de produits?"),
    options: [
      { key: "few", label: t("Under 25", "Moins de 25") },
      { key: "some", label: t("25 to 250", "25 à 250") },
      { key: "many", label: t("More than 250", "Plus de 250") },
    ],
  },
  {
    id: "store_needs",
    kind: "multi",
    optional: true,
    when: isBranch("sell"),
    prompt: t("What else does the store need?", "De quoi d'autre la boutique a-t-elle besoin?"),
    options: [
      { key: "accounts", label: t("Customer accounts", "Comptes clients") },
      { key: "subscriptions", label: t("Recurring or subscription orders", "Commandes récurrentes ou par abonnement") },
      { key: "inventory", label: t("Stock kept in sync with another system", "Stocks synchronisés avec un autre système") },
      { key: "pos", label: t("Connect to our in-store till system", "Connexion à notre caisse en magasin") },
      { key: "delivery", label: t("Delivery and pickup options", "Options de livraison et de cueillette") },
      { key: "bilingual", label: t("Work in English and French", "Fonctionner en anglais et en français") },
      { key: "email", label: t("Connect to our email marketing", "Connexion à notre infolettre") },
      { key: "seo", label: t("Be seriously optimised for search", "Être sérieusement optimisé pour la recherche") },
    ],
  },

  /* ── SEO ───────────────────────────────────────────────────────────────── */
  {
    id: "has_site",
    kind: "single",
    when: isBranch("seo"),
    prompt: t("Do you already have a website?", "Avez-vous déjà un site web?"),
    options: [
      { key: "yes", label: t("Yes, and it stays as it is", "Oui, et il reste tel quel") },
      { key: "rebuild", label: t("Yes, but it needs rebuilding", "Oui, mais il doit être refait") },
      { key: "no", label: t("No, not yet", "Non, pas encore") },
    ],
  },
  {
    id: "seo_needs",
    kind: "multi",
    optional: true,
    when: isBranch("seo"),
    prompt: t("What matters most?", "Qu'est-ce qui compte le plus?"),
    options: [
      { key: "local", label: t("Being found by people nearby", "Être trouvé par les gens à proximité") },
      { key: "locations", label: t("Several locations or service areas", "Plusieurs emplacements ou zones desservies") },
      { key: "content", label: t("Publishing content regularly", "Publier du contenu régulièrement") },
      { key: "scale", label: t("Pages generated at scale", "Des pages générées à grande échelle") },
      { key: "bilingual", label: t("Ranking in English and French", "Se classer en anglais et en français") },
    ],
  },

  /* ── automation ────────────────────────────────────────────────────────── */
  {
    id: "automate_what",
    kind: "multi",
    when: isBranch("automate"),
    prompt: t("What should it do for you?", "Que doit-elle faire pour vous?"),
    help: t(
      "Describe the outcome — we'll work out what it takes to build.",
      "Décrivez le résultat — on déterminera ce qu'il faut pour le construire.",
    ),
    options: [
      { key: "documents", label: t("Read documents and pull the information out", "Lire des documents et en extraire l'information") },
      { key: "sort", label: t("Sort and route things that come in", "Trier et acheminer ce qui entre") },
      { key: "move_data", label: t("Move information between our tools", "Déplacer l'information entre nos outils") },
      { key: "answer", label: t("Answer questions from our own information", "Répondre à des questions à partir de nos informations") },
      { key: "content", label: t("Produce content or drafts", "Produire du contenu ou des ébauches") },
      { key: "report", label: t("Report on what's happening", "Faire des rapports sur ce qui se passe") },
    ],
  },
  {
    id: "connects_to",
    kind: "single",
    when: isBranch("automate", "software"),
    prompt: t("What does it need to connect to?", "À quoi doit-elle se connecter?"),
    help: t(
      "If we cannot see inside a system before starting, we widen the estimate rather than guess.",
      "Si on ne peut pas voir l'intérieur d'un système avant de commencer, on élargit l'estimation plutôt que de deviner.",
    ),
    options: [
      { key: "nothing", label: t("Nothing — it stands alone", "Rien — c'est indépendant") },
      { key: "common", label: t("Common tools most businesses use", "Des outils courants") },
      { key: "internal", label: t("Our own internal system", "Notre propre système interne") },
      { key: "unknown", label: t("I'm not sure yet", "Je ne sais pas encore") },
    ],
  },

  /* ── custom software ───────────────────────────────────────────────────── */
  {
    id: "who_uses",
    kind: "single",
    when: isBranch("software"),
    prompt: t("Who will use it?", "Qui va l'utiliser?"),
    options: [
      { key: "team", label: t("Just our team", "Seulement notre équipe") },
      { key: "team_customers", label: t("Our team and our customers", "Notre équipe et nos clients") },
      { key: "public", label: t("Anyone who signs up", "N'importe qui s'inscrit") },
    ],
  },
  {
    id: "software_needs",
    kind: "multi",
    optional: true,
    when: isBranch("software"),
    prompt: t("What does it need?", "De quoi a-t-il besoin?"),
    options: [
      { key: "roles", label: t("Different people see different things", "Différentes personnes voient différentes choses") },
      { key: "dashboard", label: t("Dashboards and reporting", "Tableaux de bord et rapports") },
      { key: "documents", label: t("Uploading and managing documents", "Téléversement et gestion de documents") },
      { key: "payments", label: t("Taking payments", "Accepter des paiements") },
      { key: "subscriptions", label: t("Recurring billing", "Facturation récurrente") },
      { key: "notifications", label: t("Emails and notifications", "Courriels et notifications") },
      { key: "workflows", label: t("Multi-step approval or workflows", "Approbations ou flux en plusieurs étapes") },
      { key: "portal", label: t("A portal our customers log into", "Un portail où nos clients se connectent") },
      { key: "bilingual", label: t("Work in English and French", "Fonctionner en anglais et en français") },
    ],
  },

  /* ── everyone ──────────────────────────────────────────────────────────── */
  {
    id: "content_ready",
    kind: "single",
    when: isBranch("website", "redesign", "sell"),
    prompt: t("Do you have the words and images?", "Avez-vous les textes et les images?"),
    options: [
      { key: "ready", label: t("Yes, they're ready", "Oui, ils sont prêts") },
      { key: "existing", label: t("We have them, but they need reworking", "On les a, mais ils doivent être retravaillés") },
      { key: "help", label: t("We need help writing them", "On a besoin d'aide pour les écrire") },
    ],
  },
  {
    id: "clarity",
    kind: "single",
    prompt: t("How settled is the scope?", "À quel point la portée est-elle définie?"),
    options: [
      { key: "clear", label: t("We know what we want", "On sait ce qu'on veut") },
      { key: "rough", label: t("We have a rough idea", "On a une idée générale") },
      { key: "open", label: t("We're still figuring it out", "On est encore en train de le définir") },
    ],
  },
  {
    id: "timing",
    kind: "single",
    prompt: t("When do you need it?", "Pour quand en avez-vous besoin?"),
    options: [
      { key: "flexible", label: t("No fixed date", "Pas de date fixe") },
      { key: "planned", label: t("Within a few months", "D'ici quelques mois") },
      { key: "urgent", label: t("There's a hard deadline", "Il y a une échéance ferme") },
    ],
  },
];

/** The questions that actually apply to the answers so far, in order. */
export function activeQuestions(a: Answers): Question[] {
  return QUESTIONS.filter((q) => !q.when || q.when(a));
}

/** True once every non-optional active question has an answer. */
export function isComplete(a: Answers): boolean {
  return activeQuestions(a).every((q) => {
    if (q.optional) return true;
    const v = a[q.id];
    return q.kind === "multi" ? Array.isArray(v) && v.length > 0 : typeof v === "string" && v.length > 0;
  });
}

/**
 * Strips anything the flow does not define.
 *
 * Runs server-side before mapping. An unknown question id, an unknown option
 * key, or a multi-select answer sent to a single-choice question is dropped —
 * so the mapper only ever sees vocabulary the flow itself declares.
 */
export function sanitizeAnswers(raw: unknown): Answers {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return {};
  const source = raw as Record<string, unknown>;
  const out: Answers = {};
  for (const q of QUESTIONS) {
    const value = Object.hasOwn(source, q.id) ? source[q.id] : undefined;
    if (value === undefined) continue;
    const valid = new Set(q.options.map((o) => o.key));
    if (q.kind === "single") {
      if (typeof value === "string" && valid.has(value)) out[q.id] = value;
    } else if (Array.isArray(value)) {
      const picked = value.filter((v): v is string => typeof v === "string" && valid.has(v));
      if (picked.length) out[q.id] = [...new Set(picked)].slice(0, q.options.length);
    }
  }
  return out;
}

type Cap = { id: CapabilityId; complexity: Complexity };

/**
 * Turns answers into model input.
 *
 * Every branch resolves to exactly one foundation. Where an answer is
 * genuinely ambiguous about depth, the flow asked a follow-up (booking,
 * ordering) rather than guessing — that follow-up is what the tier reads.
 */
export function mapAnswers(a: Answers): EstimateInput {
  const branch = branchOf(a);
  const caps: Cap[] = [];
  const add = (id: CapabilityId, complexity: Complexity = "standard") => {
    if (!caps.some((c) => c.id === id)) caps.push({ id, complexity });
  };

  let foundation: EstimateInput["foundation"] = "marketing_site";
  let scope: ScopeSize = (["small", "standard", "large", "very_large", "xl"] as ScopeSize[]).includes(
    one(a, "size") as ScopeSize,
  )
    ? (one(a, "size") as ScopeSize)
    : "small";
  let bilingual = false;

  /* ── foundation ──────────────────────────────────────────────────────── */
  if (branch === "redesign") foundation = "website_redesign";
  else if (branch === "sell") foundation = "ecommerce";
  else if (branch === "automate") foundation = "ai_automation";
  else if (branch === "software") {
    // "Anyone who signs up" is a product, not an internal tool — that is the
    // line between a portal and a full application, and it is the single
    // biggest driver on this branch.
    foundation = one(a, "who_uses") === "team" ? "business_portal" : "custom_application";
  } else if (branch === "seo") {
    const site = one(a, "has_site");
    if (site === "no" || site === "rebuild") {
      // Someone who needs a site before they can rank is buying a site.
      foundation = site === "rebuild" ? "website_redesign" : "marketing_site";
      add("keyword_research");
      add("advanced_onpage", "moderate");
      add("schema_markup");
    } else {
      foundation = has(a, "seo_needs", "content") || has(a, "seo_needs", "scale")
        ? "content_system"
        : "seo_engagement";
    }
  } else if (branch === "website") {
    foundation = "marketing_site";
  }

  // Page count is meaningless on the software and automation branches, and
  // letting a stale answer leak across a branch change would silently inflate
  // the estimate.
  if (branch === "automate" || branch === "software") scope = "small";

  /* ── website / redesign ──────────────────────────────────────────────── */
  if (branch === "website" || branch === "redesign") {
    const kind = one(a, "site_kind");
    if (kind === "seo_focused") {
      add("keyword_research");
      add("advanced_onpage", "moderate");
      add("schema_markup");
      add("content_strategy");
    }
    if (kind === "local") {
      add("local_seo", "moderate");
      add("schema_markup");
    }
    if (kind === "content") {
      add("blog_system");
      add("cms");
      add("content_strategy");
    }
    if (branch === "redesign") add("content_migration");

    if (has(a, "needs", "self_edit")) add("cms");
    if (has(a, "needs", "blog")) add("blog_system");
    if (has(a, "needs", "accounts")) add("customer_accounts");
    if (has(a, "needs", "locations")) {
      add("multi_location", "moderate");
      add("local_seo", "moderate");
    }
    if (has(a, "needs", "seo")) {
      add("keyword_research");
      add("advanced_onpage", "moderate");
      add("schema_markup");
      add("content_strategy");
    }
    if (has(a, "needs", "bilingual")) bilingual = true;

    const booking = one(a, "booking_depth");
    if (booking === "link") add("booking", "standard");
    if (booking === "embedded") add("booking", "moderate");
    if (booking === "custom") {
      add("booking", "advanced");
      add("notifications");
    }

    const ordering = one(a, "ordering_depth");
    if (ordering === "link") add("online_ordering", "standard");
    if (ordering === "onsite") {
      add("online_ordering", "moderate");
      add("notifications");
    }
    if (ordering === "full") {
      add("online_ordering", "moderate");
      add("delivery_pickup", "moderate");
      add("pos_integration", "moderate");
      add("notifications");
    }

    // "Take payments" on a brochure site means a checkout, not a storefront —
    // unless they are also ordering, in which case ordering already covers it.
    if (has(a, "needs", "payments") && !ordering) add("app_payments");
  }

  /* ── sell online ─────────────────────────────────────────────────────── */
  if (branch === "sell") {
    const size = one(a, "catalogue");
    if (size === "some") add("large_catalogue", "standard");
    if (size === "many") add("large_catalogue", "moderate");
    if (one(a, "sell_what") === "subscription") add("subscriptions", "moderate");
    if (one(a, "sell_what") === "services") add("booking", "moderate");

    if (has(a, "store_needs", "accounts")) add("customer_accounts");
    if (has(a, "store_needs", "subscriptions")) add("subscriptions", "moderate");
    if (has(a, "store_needs", "inventory")) add("inventory_sync", "moderate");
    if (has(a, "store_needs", "pos")) add("pos_integration", "moderate");
    if (has(a, "store_needs", "delivery")) add("delivery_pickup");
    if (has(a, "store_needs", "email")) add("email_marketing");
    if (has(a, "store_needs", "bilingual")) bilingual = true;
    if (has(a, "store_needs", "seo")) {
      add("keyword_research");
      add("advanced_onpage", "moderate");
      add("schema_markup");
    }
  }

  /* ── SEO ─────────────────────────────────────────────────────────────── */
  if (branch === "seo") {
    if (has(a, "seo_needs", "local")) add("local_seo", "moderate");
    if (has(a, "seo_needs", "locations")) {
      add("multi_location", "moderate");
      add("local_seo", "advanced");
    }
    if (has(a, "seo_needs", "content")) add("content_strategy", "moderate");
    if (has(a, "seo_needs", "scale")) {
      add("programmatic_content", "advanced");
      add("dynamic_content", "moderate");
    }
    if (has(a, "seo_needs", "bilingual")) bilingual = true;
  }

  /* ── automation ──────────────────────────────────────────────────────── */
  if (branch === "automate") {
    if (has(a, "automate_what", "documents")) add("document_processing", "moderate");
    if (has(a, "automate_what", "sort")) add("classification_extraction", "moderate");
    if (has(a, "automate_what", "move_data")) add("workflow_automation");
    if (has(a, "automate_what", "answer")) add("ai_assistant", "moderate");
    if (has(a, "automate_what", "content")) add("content_automation", "moderate");
    if (has(a, "automate_what", "report")) add("business_intelligence");
  }

  /* ── custom software ─────────────────────────────────────────────────── */
  if (branch === "software") {
    if (has(a, "software_needs", "roles")) add("roles_permissions", "moderate");
    if (has(a, "software_needs", "dashboard")) add("dashboard_reporting", "moderate");
    if (has(a, "software_needs", "documents")) add("documents_uploads");
    if (has(a, "software_needs", "payments")) add("app_payments", "moderate");
    if (has(a, "software_needs", "subscriptions")) add("subscriptions", "moderate");
    if (has(a, "software_needs", "notifications")) add("notifications");
    if (has(a, "software_needs", "workflows")) add("workflow_management", "moderate");
    if (has(a, "software_needs", "portal")) add("client_portal", "moderate");
    if (has(a, "software_needs", "bilingual")) bilingual = true;
  }

  /* ── what it connects to ─────────────────────────────────────────────── */
  const connects = one(a, "connects_to");
  if (connects === "common") add("third_party_api", "moderate");
  if (connects === "internal") add("legacy_system", "advanced");

  /* ── copy ────────────────────────────────────────────────────────────── */
  const content = one(a, "content_ready");
  if (content === "help") add("copywriting", scope === "small" ? "standard" : "moderate");
  if (content === "existing") add("copywriting", "standard");

  /* ── uncertainty ─────────────────────────────────────────────────────── */
  const clarity = one(a, "clarity");
  const undefinedScope =
    clarity === "open" ||
    connects === "unknown" ||
    has(a, "needs", "custom") ||
    (branch === "software" && clarity === "rough");

  return {
    foundation,
    scope,
    bilingual,
    capabilities: caps,
    undefinedScope,
    rush: one(a, "timing") === "urgent",
  };
}

/** Studio `project_type` for the intake hand-off. Mirrors PROJECT_TYPE_OPTIONS there. */
export function studioTypeFor(foundation: EstimateInput["foundation"]): string {
  return (
    {
      marketing_site: "website",
      website_redesign: "website",
      ecommerce: "ecommerce",
      business_portal: "web_app",
      custom_application: "web_app",
      ai_automation: "ai_system",
      seo_engagement: "other",
      content_system: "other",
    }[foundation] ?? "other"
  );
}
