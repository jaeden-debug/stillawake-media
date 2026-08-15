/**
 * THE PUBLIC FLOW — plain language, four to six steps.
 *
 * The previous version asked "How far should the site go?" and made a client
 * answer a depth question per service line. That is our taxonomy, not their
 * problem. It also asked about organisational complexity in a way that read as
 * being sized up for a bill.
 *
 * TWO RULES SHAPE THIS FILE:
 *
 *  1. It asks nothing about their business. Who they are, what they sell and
 *     who it is for belong to the Studio intake. This asks only what they need
 *     built. Zero overlap, so it cannot feel like a second onboarding.
 *
 *  2. It never asks how big the company is. Size is a proxy for nothing.
 *     Question five asks about the handful of things that genuinely create
 *     work, and a business with fifty staff and one decision-maker ticks none
 *     of them.
 *
 * The browser posts answer keys only — no base, addition, price or multiplier
 * exists in the wire format, so no crafted request can produce a discount.
 */

import { ADDITIONS, BASES, SEO_SCOPES } from "./model";
import type { AdditionId, BaseId, EstimateInput, SeoScopeId } from "./types";
import { ADDITION_LABELS } from "./labels";

export type Locale = "en" | "fr";
type L = { en: string; fr: string };
const t = (en: string, fr: string): L => ({ en, fr });

export type Answers = Record<string, string | string[]>;
export type Option = { key: string; label: L; blurb?: L };
export type Question = {
  id: string;
  kind: "single" | "multi";
  prompt: L;
  help?: L;
  options: Option[];
  optional?: boolean;
};

const one = (a: Answers, id: string) => (typeof a[id] === "string" ? (a[id] as string) : "");
const many = (a: Answers, id: string) => (Array.isArray(a[id]) ? (a[id] as string[]) : []);
const has = (a: Answers, id: string, key: string) => many(a, id).includes(key);

/* ── 1. what do you need ─────────────────────────────────────────────────── */

const GOALS: Option[] = [
  { key: "new_website", label: t("A new website", "Un nouveau site web") },
  { key: "redesign", label: t("Redesign my existing website", "Refaire mon site actuel") },
  { key: "store", label: t("Sell products online", "Vendre des produits en ligne") },
  { key: "seo", label: t("Get found on Google", "Être trouvé sur Google") },
  { key: "brand", label: t("Brand and identity work", "Travail de marque et d'identité") },
  { key: "software", label: t("A custom system or app", "Un système ou une application sur mesure") },
  { key: "automation", label: t("Automate something", "Automatiser quelque chose") },
  { key: "not_sure", label: t("I'm not sure yet", "Je ne sais pas encore") },
];

/** "Not sure" is answered by outcome, never by technology. */
const OUTCOMES: Option[] = [
  { key: "look_credible", label: t("We need to look credible and get enquiries", "On doit avoir l'air crédible et recevoir des demandes") },
  { key: "found_on_google", label: t("People can't find us", "Les gens ne nous trouvent pas") },
  { key: "sell_online", label: t("We want to sell online", "On veut vendre en ligne") },
  { key: "stop_manual", label: t("We're doing too much by hand", "On fait trop de choses à la main") },
  { key: "need_a_tool", label: t("We need a tool that doesn't exist", "Il nous faut un outil qui n'existe pas") },
];

/** The effective goal. "Not sure" resolves through the outcome. */
export function goalOf(a: Answers): string {
  const goal = one(a, "goal");
  if (goal !== "not_sure") return goal;
  return (
    { look_credible: "new_website", found_on_google: "seo", sell_online: "store", stop_manual: "automation", need_a_tool: "software" }[
      one(a, "outcome")
    ] ?? ""
  );
}

const isWebsite = (a: Answers) => ["new_website", "redesign"].includes(goalOf(a));

/* ── 2. what does it need to do ──────────────────────────────────────────── */

/** Plain outcomes. The mapping to additions happens in `mapAnswers`, not here. */
const NEEDS: Option[] = [
  { key: "explain", label: t("Explain what we do", "Expliquer ce qu'on fait") },
  { key: "leads", label: t("Get enquiries and leads", "Générer des demandes") },
  { key: "menu", label: t("Show menus, services or pricing", "Afficher menus, services ou prix") },
  { key: "bookings", label: t("Take bookings or appointments", "Prendre des rendez-vous") },
  { key: "ordering", label: t("Take orders", "Prendre des commandes") },
  { key: "sell", label: t("Sell products", "Vendre des produits") },
  { key: "payments", label: t("Take payments", "Accepter des paiements") },
  { key: "logins", label: t("Give customers a login", "Donner un accès aux clients") },
  { key: "connect", label: t("Connect to software we already use", "Se connecter à un logiciel qu'on utilise déjà") },
  { key: "found_local", label: t("Be found by people nearby", "Être trouvé par les gens à proximité") },
  { key: "found_search", label: t("Rank for what people search for", "Se classer pour ce que les gens cherchent") },
  { key: "custom", label: t("Something custom", "Quelque chose de sur mesure") },
];

/* ── 3. how much content ─────────────────────────────────────────────────── */

const SIZES: Option[] = [
  { key: "small", label: t("Small — a few core pages", "Petit — quelques pages essentielles") },
  { key: "standard", label: t("Standard — services, about, contact and a few more", "Standard — services, à propos, contact et quelques autres") },
  { key: "large", label: t("Larger — many services, locations or sections", "Plus grand — plusieurs services, emplacements ou sections") },
  { key: "unsure", label: t("Not sure yet", "Pas encore certain") },
];

/* ── 5. real complexity — never company size ─────────────────────────────── */

const COMPLEXITY: Option[] = [
  { key: "multi_location", label: t("We have several locations", "On a plusieurs emplacements") },
  { key: "connect_internal", label: t("It has to connect to our own internal system", "Ça doit se connecter à notre système interne") },
  { key: "accessibility", label: t("We have accessibility or compliance requirements", "On a des exigences d'accessibilité ou de conformité") },
  { key: "stakeholders", label: t("Several people need to approve it", "Plusieurs personnes doivent l'approuver") },
  { key: "content_migration", label: t("Content has to move from our old site", "Il faut transférer le contenu de notre ancien site") },
];

/**
 * The ONLY follow-ups. Both exist because one word covers two products that
 * differ by an order of magnitude: connecting the tool they already run, or
 * building them one.
 */
const BUILD_OR_INTEGRATE: Record<string, { prompt: L; options: Option[] }> = {
  bookings: {
    prompt: t("How should bookings work?", "Comment les rendez-vous doivent-ils fonctionner?"),
    options: [
      { key: "integrate", label: ADDITION_LABELS["bookings.integrate"], blurb: t("Calendly, Square, whatever you use now", "Calendly, Square, ce que vous utilisez déjà") },
      { key: "build", label: ADDITION_LABELS["bookings.build"], blurb: t("Your own availability rules, staff and resources", "Vos propres règles de disponibilité, personnel et ressources") },
    ],
  },
  ordering: {
    prompt: t("How should ordering work?", "Comment les commandes doivent-elles fonctionner?"),
    options: [
      { key: "integrate", label: ADDITION_LABELS["ordering.integrate"], blurb: t("Toast, Square, Uber Eats and the like", "Toast, Square, Uber Eats et compagnie") },
      { key: "build", label: ADDITION_LABELS["ordering.build"], blurb: t("Your own ordering and fulfilment", "Votre propre système de commande et de traitement") },
    ],
  },
};

/** Sub-choices for goals that split into obviously different products. */
const KIND_QUESTIONS: Record<string, { prompt: L; options: Option[] }> = {
  store: {
    prompt: t("What sort of store?", "Quel genre de boutique?"),
    options: [
      { key: "standard", label: t("A normal catalogue on a proven platform", "Un catalogue normal sur une plateforme éprouvée"), blurb: t("Shopify or similar, set up properly", "Shopify ou équivalent, bien configuré") },
      { key: "large", label: t("A large catalogue, or heavier operations", "Un grand catalogue ou des opérations plus lourdes") },
      { key: "custom", label: t("Something a platform can't do", "Quelque chose qu'une plateforme ne peut pas faire") },
    ],
  },
  brand: {
    prompt: t("How far should the brand work go?", "Jusqu'où doit aller le travail de marque?"),
    options: [
      { key: "refresh", label: t("Tidy up what we already have", "Rafraîchir ce qu'on a déjà") },
      { key: "identity", label: t("A proper identity — logo, colour, type, guidelines", "Une vraie identité — logo, couleurs, typo, guide") },
      { key: "positioning", label: t("Naming, messaging and positioning too", "Nom, message et positionnement aussi") },
    ],
  },
  software: {
    prompt: t("Who uses it?", "Qui l'utilise?"),
    options: [
      { key: "dashboard", label: t("Just our team, internally", "Seulement notre équipe, à l'interne") },
      { key: "portal", label: t("Our customers log in", "Nos clients s'y connectent") },
      { key: "platform", label: t("Anyone can sign up", "N'importe qui peut s'inscrire") },
    ],
  },
  automation: {
    prompt: t("How much should it handle?", "Jusqu'où doit-elle aller?"),
    options: [
      { key: "connect", label: t("Move information between two tools", "Déplacer l'information entre deux outils") },
      { key: "workflow", label: t("Run a process, with someone checking it", "Exécuter un processus, avec une validation") },
      { key: "ai", label: t("Read, judge and decide things", "Lire, juger et décider") },
    ],
  },
};

export function activeQuestions(a: Answers): Question[] {
  const qs: Question[] = [];

  qs.push({ id: "goal", kind: "single", prompt: t("What do you need?", "De quoi avez-vous besoin?"), options: GOALS });

  if (one(a, "goal") === "not_sure") {
    qs.push({
      id: "outcome",
      kind: "single",
      prompt: t("What would success look like?", "À quoi ressemblerait le succès?"),
      help: t("You don't need to know what to build. Tell us what should be true afterwards.", "Pas besoin de savoir quoi construire. Dites-nous ce qui devrait être vrai après."),
      options: OUTCOMES,
    });
  }

  const goal = goalOf(a);
  if (!goal) return qs;

  if (KIND_QUESTIONS[goal]) {
    qs.push({ id: "kind", kind: "single", ...KIND_QUESTIONS[goal] });
  }

  if (isWebsite(a)) {
    qs.push({
      id: "needs",
      kind: "multi",
      optional: true,
      prompt: t("What does the website need to do?", "Que doit faire le site web?"),
      help: t("Pick everything that applies.", "Choisissez tout ce qui s'applique."),
      options: NEEDS,
    });

    for (const key of ["bookings", "ordering"]) {
      if (!has(a, "needs", key)) continue;
      qs.push({ id: `how.${key}`, kind: "single", ...BUILD_OR_INTEGRATE[key] });
    }

    qs.push({
      id: "size",
      kind: "single",
      prompt: t("How much content?", "Combien de contenu?"),
      help: t("A best guess is fine — it only moves the estimate a little.", "Une estimation approximative suffit — ça ne change que légèrement le prix."),
      options: SIZES,
    });
  }

  /* Websites fold this into "what does it need to do?" — one screen fewer for
     everyone. Stores and SEO engagements have no needs list, so they still ask. */
  if (["store", "seo"].includes(goal)) {
    qs.push({
      id: "search",
      kind: "single",
      prompt: t("Do you want help getting found?", "Voulez-vous de l'aide pour être trouvé?"),
      help: t(
        "Technical SEO is in every build already. This is what goes beyond it.",
        "Le SEO technique est déjà inclus dans chaque projet. Ceci va au-delà.",
      ),
      options: [
        { key: "none", label: t("No, not right now", "Non, pas pour l'instant") },
        { key: "local", label: t("Local — people nearby should find us", "Local — les gens près de nous doivent nous trouver") },
        { key: "content_strategy", label: t("Research and a content plan", "Recherche et plan de contenu") },
      ],
    });
  }

  /**
   * Real complexity, and nothing about headcount. A fifty-person company with
   * one decision-maker ticks none of these and pays the base price.
   */
  qs.push({
    id: "complexity",
    kind: "multi",
    optional: true,
    prompt: t("Anything that adds real complexity?", "Quelque chose qui ajoute une vraie complexité?"),
    help: t("Most projects have none of these.", "La plupart des projets n'en ont aucune."),
    options: COMPLEXITY,
  });

  qs.push({
    id: "budget",
    kind: "single",
    optional: true,
    prompt: t("Do you have a budget in mind?", "Avez-vous un budget en tête?"),
    help: t(
      "Optional, and it never changes the price — our rates are published. It only helps us suggest the right scope.",
      "Facultatif, et ça ne change jamais le prix — nos tarifs sont publics. Ça nous aide seulement à proposer la bonne envergure.",
    ),
    options: [
      { key: "under_5k", label: t("Under $5,000", "Moins de 5 000 $") },
      { key: "5_15k", label: t("$5,000 – $15,000", "5 000 $ – 15 000 $") },
      { key: "15_50k", label: t("$15,000 – $50,000", "15 000 $ – 50 000 $") },
      { key: "50k_plus", label: t("$50,000+", "50 000 $ et plus") },
      { key: "unsure", label: t("Not sure yet", "Pas encore certain") },
    ],
  });

  return qs;
}

export function isComplete(a: Answers): boolean {
  return activeQuestions(a).every((q) => {
    if (q.optional) return true;
    const v = a[q.id];
    return q.kind === "multi" ? Array.isArray(v) && v.length > 0 : typeof v === "string" && v.length > 0;
  });
}

/** Strips anything the flow does not define, so the mapper sees only its own vocabulary. */
export function sanitizeAnswers(raw: unknown): Answers {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return {};
  const source = raw as Record<string, unknown>;
  const out: Answers = {};
  // Questions are generated from answers, so resolve in passes.
  for (let pass = 0; pass < 4; pass += 1) {
    const before = JSON.stringify(out);
    for (const q of activeQuestions(out)) {
      const value = Object.hasOwn(source, q.id) ? source[q.id] : undefined;
      if (value === undefined) continue;
      const valid = new Set(q.options.map((o) => o.key));
      if (q.kind === "single") {
        if (typeof value === "string" && valid.has(value)) out[q.id] = value;
      } else if (Array.isArray(value)) {
        const picked = [...new Set(value.filter((v): v is string => typeof v === "string" && valid.has(v)))];
        if (picked.length) out[q.id] = picked;
        else delete out[q.id];
      }
    }
    if (JSON.stringify(out) === before) break;
  }
  return out;
}

/** Turns plain answers into model input. */
export function mapAnswers(a: Answers): EstimateInput {
  const goal = goalOf(a);
  const kind = one(a, "kind");
  const size = one(a, "size");
  const needs = many(a, "needs");
  const complexity = many(a, "complexity");

  /* ── which base ──────────────────────────────────────────────────────── */
  let base: BaseId = "website_standard";
  if (goal === "store") {
    base = kind === "large" ? "store_large" : kind === "custom" ? "store_custom" : "store_standard";
  } else if (goal === "brand") {
    base = kind === "positioning" ? "brand_positioning" : kind === "identity" ? "brand_identity" : "brand_refresh";
  } else if (goal === "software") {
    base = kind === "platform" ? "software_platform" : kind === "portal" ? "software_portal" : "software_dashboard";
  } else if (goal === "automation") {
    base = kind === "ai" ? "automation_ai" : kind === "workflow" ? "automation_workflow" : "automation_connect";
  } else if (goal === "seo") {
    base = "seo_engagement";
  } else {
    // A website. Size decides the tier; "not sure" lands on the standard build
    // rather than guessing high.
    base = size === "small" ? "website_small" : size === "large" ? "website_large" : "website_standard";
    /* Selling on a brochure site is a small addition, but a real catalogue is a
       store — so asking to sell products lifts a small site to standard rather
       than pretending it stays a five-page build. */
    if (needs.includes("sell") && base === "website_small") base = "website_standard";
  }

  const spec = BASES[base];
  const additions: { id: AdditionId; variant?: string }[] = [];
  const push = (id: AdditionId, variant?: string) => {
    if (!spec.additions.includes(id)) return;
    if (additions.some((x) => x.id === id)) return;
    additions.push({ id, variant });
  };

  /* ── what it needs to do ─────────────────────────────────────────────── */
  if (needs.includes("bookings")) push("bookings", one(a, "how.bookings") || "integrate");
  if (needs.includes("ordering")) push("ordering", one(a, "how.ordering") || "integrate");
  if (needs.includes("payments")) push("payments");
  if (needs.includes("logins")) push("accounts");
  if (needs.includes("sell")) push("sell_products");
  if (needs.includes("connect")) push("connect_tools");
  if (needs.includes("custom")) push("custom_functionality");

  /* ── real complexity ─────────────────────────────────────────────────── */
  if (complexity.includes("multi_location")) push("multi_location");
  if (complexity.includes("connect_internal")) push("connect_internal");
  if (complexity.includes("accessibility")) push("accessibility");
  if (complexity.includes("stakeholders")) push("stakeholders");
  if (complexity.includes("content_migration")) push("content_migration");
  // A redesign always moves content, whether or not they thought to say so.
  if (goal === "redesign") push("content_migration");

  /* Search scope comes from the needs list on a website, and from its own
     question everywhere else. "Rank for what people search for" is the deeper
     of the two, so it wins when both are ticked. */
  let seo: SeoScopeId = "none";
  if (needs.includes("found_search")) seo = "content_strategy";
  else if (needs.includes("found_local")) seo = "local";
  else {
    const searchRaw = one(a, "search");
    if (Object.hasOwn(SEO_SCOPES, searchRaw)) seo = searchRaw as SeoScopeId;
  }

  const budgetRaw = one(a, "budget");
  return {
    base,
    additions,
    seo,
    budget: budgetRaw ? (budgetRaw as EstimateInput["budget"]) : undefined,
    undefinedScope: needs.includes("custom") || size === "unsure",
    rush: false,
  };
}

/** Studio `project_type` for the intake hand-off. */
export function studioTypeFor(base: BaseId): string {
  if (base.startsWith("store")) return "ecommerce";
  if (base.startsWith("software")) return "web_app";
  if (base.startsWith("automation")) return "ai_system";
  if (base.startsWith("brand")) return "brand_experience";
  if (base.startsWith("website")) return "website";
  return "other";
}
