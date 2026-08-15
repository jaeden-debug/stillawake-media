/**
 * THE PUBLIC FLOW — a router, not an interrogation.
 *
 * The previous version asked "what kind of website?" and offered four
 * overlapping answers as though they were alternatives — a restaurant site
 * built to rank with a blog is all four at once. Worse, it then asked about
 * page counts, features and content readiness, which is what the Studio intake
 * asks. Two forms, same questions, one of them with a price at the end.
 *
 * THE RULE THAT FIXES BOTH: this asks nothing about their business. Onboarding
 * asks who you are, what you sell and who it is for. This asks only which
 * service lines, how deep, and what makes their organisation expensive to work
 * with. Zero intersection, so it cannot feel like a repeat.
 *
 * Typical paths are 4–6 screens. The browser posts answer keys only — no line,
 * depth, price or multiplier exists in the wire format, so no crafted request
 * can produce a discount.
 */

import { ADDONS, ORG_FACTORS, SERVICE_LINES } from "./model";
import type { AddonId, EstimateInput, LineSelection, OrgFactorId, ServiceLineId } from "./types";

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

/* ── labels used only by the flow ──────────────────────────────────────── */

import { ADDON_LABELS, DEPTH_LABELS, LINE_BLURBS, LINE_LABELS, ORG_BLURBS, ORG_LABELS } from "./labels";

const LINE_ORDER: ServiceLineId[] = [
  "website",
  "store",
  "brand",
  "seo",
  "content",
  "software",
  "automation",
];

/** Depth prompts are line-specific so they read as a real question. */
const DEPTH_PROMPT: Record<ServiceLineId, L> = {
  brand: t("How far should the brand work go?", "Jusqu'où doit aller le travail de marque?"),
  website: t("How far should the site go?", "Jusqu'où doit aller le site?"),
  store: t("How far should the store go?", "Jusqu'où doit aller la boutique?"),
  seo: t("How far should the search work go?", "Jusqu'où doit aller le travail de référencement?"),
  content: t("Who is producing the content?", "Qui produit le contenu?"),
  software: t("Who is it for?", "À qui s'adresse-t-il?"),
  automation: t("How much should it handle?", "Jusqu'où doit-elle aller?"),
};

/** Add-ons whose single word covers builds an order of magnitude apart. */
const VARIANT_PROMPT: Partial<Record<AddonId, L>> = {
  bookings: t("How should booking work?", "Comment la prise de rendez-vous doit-elle fonctionner?"),
  ordering: t("How should ordering work?", "Comment la commande doit-elle fonctionner?"),
};

/** The line that will carry a given add-on, if any is selected. */
export function ownerOf(addon: AddonId, lines: string[]): ServiceLineId | null {
  for (const id of LINE_ORDER) {
    if (!lines.includes(id)) continue;
    if (SERVICE_LINES[id].addons?.includes(addon)) return id;
  }
  return null;
}

/** Add-ons offered, given the selected lines and their depths. */
function offeredAddons(a: Answers): AddonId[] {
  const lines = many(a, "services");
  const out: AddonId[] = [];
  for (const addon of Object.keys(ADDONS) as AddonId[]) {
    const owner = ownerOf(addon, lines);
    if (!owner) continue;
    // The Launch product is fixed-scope by definition. Offering add-ons on it
    // would quietly turn it back into a custom project.
    const depth = one(a, `depth.${owner}`);
    const spec = SERVICE_LINES[owner].depths.find((d) => d.id === depth);
    if (spec?.productized) continue;
    out.push(addon);
  }
  return out;
}

/**
 * The active questions, in order, for the answers so far.
 *
 * Generated rather than declared, because the depth questions depend on which
 * lines were chosen — a static list cannot express "one question per selected
 * service".
 */
export function activeQuestions(a: Answers): Question[] {
  const qs: Question[] = [];

  qs.push({
    id: "services",
    kind: "multi",
    prompt: t("What do you need?", "De quoi avez-vous besoin?"),
    help: t("Pick everything that applies — most projects are more than one.", "Choisissez tout ce qui s'applique — la plupart des projets en combinent plusieurs."),
    options: LINE_ORDER.map((id) => ({
      key: id,
      label: LINE_LABELS[id],
      blurb: LINE_BLURBS[id],
    })),
  });

  const selected = many(a, "services").filter((s): s is ServiceLineId =>
    Object.hasOwn(SERVICE_LINES, s),
  );
  if (selected.length === 0) return qs;

  for (const id of LINE_ORDER) {
    if (!selected.includes(id)) continue;
    qs.push({
      id: `depth.${id}`,
      kind: "single",
      prompt: DEPTH_PROMPT[id],
      help: LINE_BLURBS[id],
      options: SERVICE_LINES[id].depths.map((d) => ({
        key: d.id,
        label: DEPTH_LABELS[`${id}.${d.id}`] ?? { en: d.id, fr: d.id },
      })),
    });
  }

  /* Only the ADD-ON questions genuinely depend on the depth answers — a
     productized Launch offers none. The tail below does not, so it is not
     gated: keeping it out until every depth was answered made the counter jump
     from "2 of 2" to "3 of 6" mid-flow, which reads as the form growing while
     you fill it in. */
  const depthsAnswered = selected.every((id) => one(a, `depth.${id}`));

  const addons = depthsAnswered ? offeredAddons(a) : [];
  if (addons.length > 0) {
    qs.push({
      id: "addons",
      kind: "multi",
      optional: true,
      prompt: t("Anything else it needs to do?", "Autre chose qu'il doit faire?"),
      options: addons.map((id) => ({ key: id, label: ADDON_LABELS[id] })),
    });

    for (const addon of many(a, "addons")) {
      const spec = Object.hasOwn(ADDONS, addon) ? ADDONS[addon as AddonId] : undefined;
      if (!spec?.variants || !addons.includes(addon as AddonId)) continue;
      qs.push({
        id: `variant.${addon}`,
        kind: "single",
        prompt: VARIANT_PROMPT[addon as AddonId] ?? t("How should this work?", "Comment ça doit fonctionner?"),
        help: t(
          "This changes the cost more than anything else on the page.",
          "C'est ce qui influence le plus le coût dans cette page.",
        ),
        options: spec.variants.map((v) => ({
          key: v.id,
          label: ADDON_LABELS[`${addon}.${v.id}`] ?? { en: v.id, fr: v.id },
        })),
      });
    }
  }

  /**
   * The four cost drivers, in one screen.
   *
   * Deliberately NOT "how big is your company" — that reads as being sized up
   * for a bill, and it is only a proxy anyway. Every item here is real,
   * itemisable work, so a mid-market firm pays more because serving it costs
   * more, not because it can afford to.
   */
  qs.push({
    id: "org",
    kind: "multi",
    optional: true,
    prompt: t("Anything about your organisation we should factor in?", "Quelque chose à propos de votre organisation à prendre en compte?"),
    help: t(
      "These genuinely change the work. Most small businesses pick none.",
      "Ces éléments changent réellement le travail. La plupart des petites entreprises n'en choisissent aucun.",
    ),
    options: (Object.keys(ORG_FACTORS) as OrgFactorId[]).map((id) => ({
      key: id,
      label: ORG_LABELS[id],
      blurb: ORG_BLURBS[id],
    })),
  });

  qs.push({
    id: "timing",
    kind: "single",
    prompt: t("When do you need it?", "Pour quand en avez-vous besoin?"),
    options: [
      { key: "flexible", label: t("No fixed date", "Pas de date fixe") },
      { key: "planned", label: t("Within a few months", "D'ici quelques mois") },
      { key: "urgent", label: t("There's a hard deadline", "Il y a une échéance ferme") },
    ],
  });

  /**
   * Budget ROUTES, it never prices.
   *
   * Someone who says $3,000 sees the Launch product at its published price;
   * someone who says $50,000 sees the custom range at those same published
   * rates. It exists so we can propose the right scope, not a bigger one —
   * and on a site whose whole promise is "the prices are on the page",
   * anything else would be a contradiction.
   */
  qs.push({
    id: "budget",
    kind: "single",
    optional: true,
    prompt: t("Do you have a budget in mind?", "Avez-vous un budget en tête?"),
    help: t(
      "Optional, and it never changes the price — our rates are published. It just helps us point you at the right scope.",
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
 * Runs server-side before mapping, so the mapper only ever sees vocabulary the
 * flow itself declares. An unknown id, an unknown option, or the wrong shape
 * for a question's kind is dropped.
 */
export function sanitizeAnswers(raw: unknown): Answers {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return {};
  const source = raw as Record<string, unknown>;
  const out: Answers = {};

  // Questions are generated from answers, so this resolves in passes: take
  // what is valid now, regenerate, and take what that unlocks.
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
        if (picked.length) out[q.id] = picked.slice(0, q.options.length);
        else delete out[q.id];
      }
    }
    if (JSON.stringify(out) === before) break;
  }
  return out;
}

/** Turns answers into model input. */
export function mapAnswers(a: Answers): EstimateInput {
  const selected = many(a, "services").filter((s): s is ServiceLineId =>
    Object.hasOwn(SERVICE_LINES, s),
  );

  const chosenAddons = many(a, "addons").filter((x): x is AddonId => Object.hasOwn(ADDONS, x));
  const offered = new Set(offeredAddons(a));

  const lines: LineSelection[] = [];
  for (const id of LINE_ORDER) {
    if (!selected.includes(id)) continue;
    const spec = SERVICE_LINES[id];
    const depth = one(a, `depth.${id}`) || spec.depths[0].id;
    const valid = spec.depths.some((d) => d.id === depth) ? depth : spec.depths[0].id;

    const addons = chosenAddons
      .filter((addon) => offered.has(addon) && ownerOf(addon, selected) === id)
      .map((addon) => {
        const spec = ADDONS[addon];
        if (!spec.variants) return { id: addon };
        const picked = one(a, `variant.${addon}`);
        // An unanswered variant falls back to the cheapest reading rather than
        // the average — we never quote high on an ambiguity we failed to ask
        // about clearly enough.
        const variant = spec.variants.some((v) => v.id === picked) ? picked : spec.variants[0].id;
        return { id: addon, variant };
      });

    lines.push({ id, depth: valid, addons });
  }

  const org = many(a, "org").filter((o): o is OrgFactorId => Object.hasOwn(ORG_FACTORS, o));
  const budgetRaw = one(a, "budget");
  const budget = budgetRaw ? (budgetRaw as EstimateInput["budget"]) : undefined;

  return {
    lines,
    org,
    budget,
    undefinedScope: chosenAddons.includes("custom_functionality"),
    rush: one(a, "timing") === "urgent",
  };
}

/** Studio `project_type` for the intake hand-off, from the heaviest line. */
export function studioTypeFor(lines: LineSelection[]): string {
  const byPriority: [ServiceLineId, string][] = [
    ["software", "web_app"],
    ["store", "ecommerce"],
    ["automation", "ai_system"],
    ["website", "website"],
    ["brand", "brand_experience"],
    ["content", "other"],
    ["seo", "other"],
  ];
  for (const [line, type] of byPriority) {
    if (lines.some((l) => l.id === line)) return type;
  }
  return "other";
}
