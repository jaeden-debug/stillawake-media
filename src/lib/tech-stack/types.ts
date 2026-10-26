/**
 * The technology decision resource — shared shape.
 *
 * Every identifier in this file is deliberately locale-neutral. The English
 * and French pages render from two separately written content files, but both
 * are indexed by the SAME ids, which buys three things:
 *
 *   1. TypeScript refuses to compile a locale that is missing a scenario, a
 *      matrix cell or a tree node, so the two languages cannot drift apart.
 *   2. The anchors are identical in both languages, so one link table serves
 *      both — including the calculator's future "why this recommendation"
 *      deep links, which must not have to know what language the reader is in.
 *   3. The decision logic lives in `tree.ts` once, in one language-free form,
 *      rather than being re-implemented per locale.
 *
 * The French copy is written for Québec rather than translated, which is the
 * site's standing practice. Only the structure is shared.
 */

import type { ArchitectureClassId } from "@/lib/architecture/types";

/* ── The simplicity ladder ───────────────────────────────────────────────── */

/**
 * Five rungs, from least to most machinery. The whole resource argues that you
 * move up ONLY when a requirement forces you to, so the ordering is load
 * bearing: `LEVEL_ORDER` is what lets an outcome say "this is a rung higher
 * than you need".
 */
export type LevelId = "l1" | "l2" | "l3" | "l4" | "l5";

export const LEVEL_ORDER: LevelId[] = ["l1", "l2", "l3", "l4", "l5"];

/** One band in a stack diagram — a layer, and what actually fills it. */
export type StackLayer = {
  /** e.g. "Content", "Data" */
  role: string;
  /** e.g. "Framer CMS collections" */
  fill: string;
  /**
   * Layers a level does not have are still drawn, greyed, because the absence
   * is the point: a Level 1 site has no database and that is a feature.
   */
  absent?: boolean;
};

export type Level = {
  id: LevelId;
  /** "Level 1 — Hosted builder" */
  name: string;
  /** One sentence: what this actually is. */
  summary: string;
  /** Typical named tools. Not exhaustive, and not an endorsement ranking. */
  examples: string;
  /** The business situations this is the right answer for. */
  rightWhen: string[];
  /** The specific requirement that forces the next rung. */
  outgrowWhen: string[];
  /** What it costs to run, in plain terms. Never a quote. */
  runningCost: string;
  /** Who can change the site once it exists. */
  whoEdits: string;
  diagram: StackLayer[];
};

/* ── Business scenarios ──────────────────────────────────────────────────── */

export type ScenarioId =
  | "simple-business"
  | "marketing-seo"
  | "publisher"
  | "ecommerce"
  | "booking"
  | "membership"
  | "saas"
  | "internal-tools"
  | "custom-platform";

export type Scenario = {
  id: ScenarioId;
  /** "Simple business website" */
  name: string;
  /** Who this is — concrete trades and professions, not personas. */
  who: string;
  /** What the business actually needs the thing to do. */
  needs: string[];
  /** The rung this normally lands on. */
  level: LevelId;
  /** The recommendation, named. */
  recommendation: string;
  /** Why that, in the business's terms rather than the technology's. */
  why: string;
  /** Alternatives that are also defensible, and the condition that picks each. */
  alternatives: { option: string; when: string }[];
  /** The over-engineering this scenario specifically invites. */
  overkill: string;
  /** The requirement that legitimately moves this scenario up a rung. */
  escalation: string;
};

/* ── Decision matrix ─────────────────────────────────────────────────────── */

/**
 * The approaches compared. Rows are approaches rather than individual products
 * because the choice a business actually makes is architectural: "a hosted
 * builder" is a decision, "Framer rather than Squarespace" is a preference.
 */
export type ApproachId =
  | "hosted_builder"
  | "visual_cms"
  | "wordpress"
  | "shopify"
  | "custom_cms"
  | "custom_app";

export type CriterionId =
  | "setup"
  | "maintenance"
  | "editing"
  | "seo"
  | "performance"
  | "ecommerce"
  | "auth"
  | "database"
  | "workflows"
  | "scale"
  | "build_cost"
  | "run_cost"
  | "lock_in"
  | "portability"
  | "expertise";

export const CRITERION_ORDER: CriterionId[] = [
  "setup",
  "maintenance",
  "editing",
  "seo",
  "performance",
  "ecommerce",
  "auth",
  "database",
  "workflows",
  "scale",
  "build_cost",
  "run_cost",
  "lock_in",
  "portability",
  "expertise",
];

export const APPROACH_ORDER: ApproachId[] = [
  "hosted_builder",
  "visual_cms",
  "wordpress",
  "shopify",
  "custom_cms",
  "custom_app",
];

/**
 * Four ordinal ratings, and no numbers anywhere.
 *
 * Scoring platforms out of ten reads as measurement and is not: nobody can
 * defend why Webflow's SEO is a 7 and WordPress's an 8. What CAN be defended
 * is the decision each rating implies, so the vocabulary is written as advice:
 *
 *   strong     — this is a reason to choose it
 *   workable   — fine, with a caveat you should know before you commit
 *   limited    — possible, but it will fight you
 *   wrong_tool — do not choose this approach for this requirement
 *
 * Ratings are judgement from building and maintaining these stacks, not
 * benchmarks, and the page says so where a reader can see it.
 */
export type Rating = "strong" | "workable" | "limited" | "wrong_tool";

export type Cell = {
  rating: Rating;
  /** The fact behind the rating. Omitted only where the rating says it all. */
  note?: string;
};

export type MatrixRow = Record<CriterionId, Cell>;

/* ── Technologies, by architectural layer ────────────────────────────────── */

/**
 * Layers exist to stop the page creating false equivalencies. Stripe and
 * Framer are not competitors; they do not even sit on the same shelf. Grouping
 * by layer makes that structural rather than something the copy has to keep
 * asserting.
 */
export type LayerId =
  | "presentation"
  | "content"
  | "commerce"
  | "data"
  | "auth"
  | "payments"
  | "email"
  | "hosting"
  | "measurement"
  | "source";

export type Layer = {
  id: LayerId;
  name: string;
  /** What this layer is for, and when a project genuinely needs one. */
  purpose: string;
  entries: {
    /** "Shopify" */
    tech: string;
    /** What it is, in one line. */
    what: string;
    /** The condition under which StillAwake reaches for it. */
    when: string;
  }[];
  /** The thing people get wrong about this layer specifically. */
  caution?: string;
};

/* ── "You probably don't need…" ──────────────────────────────────────────── */

export type MythId =
  | "database"
  | "auth"
  | "custom-ecommerce"
  | "custom-cms"
  | "microservices"
  | "ai"
  | "headless"
  | "mobile-app";

export type Myth = {
  id: MythId;
  /** "…a database" */
  claim: string;
  /** Why it usually is not needed. */
  usually: string;
  /** The specific requirement that makes it genuinely correct. */
  justifiedWhen: string[];
  /** What to do instead, when it is not. */
  instead: string;
};

/* ── Decision tree ───────────────────────────────────────────────────────── */

export type QuestionId =
  | "selling"
  | "commerce_fit"
  | "accounts"
  | "portal_scope"
  | "editing"
  | "workflow"
  | "search";

export type OutcomeId =
  | "simple-site"
  | "marketing-site"
  | "custom-marketing-site"
  | "publisher"
  | "payments-link"
  | "shopify"
  | "shopify-content"
  | "headless-commerce"
  | "buy-before-build"
  | "portal"
  | "internal-tool"
  | "saas"
  | "separate-system";

/** An answer key, scoped to its question — `selling.catalogue`, `editing.rarely`. */
export type AnswerKey = string;

export type QuestionCopy = {
  /** The question as a person would ask it. */
  prompt: string;
  /** Optional clarification, shown under the prompt. */
  help?: string;
  answers: Record<AnswerKey, { label: string; blurb?: string }>;
};

export type OutcomeCopy = {
  /** "Start with a hosted builder" */
  title: string;
  /** The named stack. This is the answer. */
  stack: string;
  /** Why, in one paragraph. */
  why: string;
  /** What would legitimately change this answer. */
  changesIf: string;
  /** Rung this sits on, shown as a badge and used to link to the ladder. */
  level: LevelId;
  /** Scenario section this reader should read next. */
  scenario: ScenarioId;
};

/* ── The whole content set for one language ──────────────────────────────── */

export type Chrome = {
  /**
   * Page metadata, kept beside the copy rather than inline in the route.
   *
   * The structured-data registry reads the same fields, so the description a
   * crawler is given and the description in <head> cannot drift apart — the
   * convention the ownership and setup guides already established.
   */
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  eyebrow: string;
  h1: string;
  standfirst: string;
  intro: string[];
  /** Section headings and small UI strings. */
  ui: {
    ladderHeading: string;
    ladderIntro: string;
    scenariosHeading: string;
    scenariosIntro: string;
    matrixHeading: string;
    matrixIntro: string;
    matrixMethodology: string;
    matrixLegend: Record<Rating, string>;
    /** Header of the table's first column, which lists the criteria. */
    criterionColumn: string;
    criteria: Record<CriterionId, string>;
    approaches: Record<ApproachId, { name: string; sub: string }>;
    layersHeading: string;
    layersIntro: string;
    mythsHeading: string;
    mythsIntro: string;
    mythsUsually: string;
    mythsJustified: string;
    mythsInstead: string;
    treeHeading: string;
    treeIntro: string;
    treeStart: string;
    treeRestart: string;
    treeBack: string;
    treeAnswerLabel: string;
    treeStackLabel: string;
    treeWhyLabel: string;
    treeChangesLabel: string;
    treeReadMore: string;
    treeCalculator: string;
    treeDisclaimer: string;
    /**
     * The word before the rung number — "Level" / "Niveau".
     *
     * A string rather than a `(n: number) => string` formatter on purpose: the
     * whole content object is handed to the decision tree, which is a client
     * component, and React cannot serialise a function across that boundary.
     * The build fails outright rather than degrading, so the constraint is
     * recorded here where the next person will see it.
     */
    levelBadge: string;
    rightWhen: string;
    outgrowWhen: string;
    runningCost: string;
    whoEdits: string;
    scenarioWho: string;
    scenarioNeeds: string;
    scenarioRecommendation: string;
    scenarioAlternatives: string;
    scenarioOverkill: string;
    scenarioEscalation: string;
    layerCaution: string;
    diagramLabel: string;
    absentLabel: string;
    readNext: string;
    honesty: string;
  };
  /** The closing "how we actually decide" section. */
  principles: { title: string; body: string }[];
  principlesHeading: string;
  faq: { q: string; a: string }[];
  faqHeading: string;
  related: { label: string; href: string }[];
  relatedHeading: string;
  cta: { heading: string; body: string; primary: string; secondary: string };
};

export type TechStackContent = {
  locale: "en" | "fr";
  chrome: Chrome;
  levels: Record<LevelId, Level>;
  scenarios: Record<ScenarioId, Scenario>;
  matrix: Record<ApproachId, MatrixRow>;
  layers: Record<LayerId, Layer>;
  myths: Record<MythId, Myth>;
  questions: Record<QuestionId, QuestionCopy>;
  outcomes: Record<OutcomeId, OutcomeCopy>;
};

/* ── Anchors ─────────────────────────────────────────────────────────────── */

/**
 * Stable section ids, identical in both languages.
 *
 * These are a published interface, not markup detail: the calculator will link
 * a reader straight from "Recommended: Shopify" to the ecommerce explanation,
 * and any external page may deep link too. Renaming one breaks an inbound
 * link, so they are declared here rather than typed inline in JSX, and the
 * anchor test asserts every one of them is actually rendered.
 */
export const ANCHORS = {
  ladder: "ladder",
  level: (id: LevelId) => `level-${id.slice(1)}`,
  scenarios: "scenarios",
  scenario: (id: ScenarioId) => `scenario-${id}`,
  matrix: "matrix",
  layers: "layers",
  layer: (id: LayerId) => `layer-${id}`,
  myths: "you-probably-dont-need",
  myth: (id: MythId) => `no-${id}`,
  tree: "decision-tree",
  principles: "how-we-decide",
  faq: "questions",
} as const;

/* ── Calculator deep links ───────────────────────────────────────────────── */

/** The page's own route in each language. Declared once, used by both pages. */
export const PATHS: Record<"en" | "fr", string> = {
  en: "/choosing-website-technology",
  fr: "/fr/choisir-technologie-site-web",
};

/**
 * Where a calculator recommendation should send someone for "why this".
 *
 * The project calculator already runs an architecture recommender
 * (`src/lib/architecture/`) that classifies a brief into one of ten classes.
 * That engine is deliberately language-free and this page is deliberately not
 * part of it, so the coupling between them is exactly one thing: this table.
 *
 * `import type` is the whole dependency — there is no runtime import of the
 * recommender here, and nothing in the recommender has to know this page
 * exists. What the type buys is exhaustiveness: adding an eleventh
 * architecture class will not compile until someone decides which explanation
 * it belongs to, which is the failure this table exists to prevent.
 */
export const ARCHITECTURE_EXPLANATIONS: Record<ArchitectureClassId, string> = {
  /* Brand work — no architecture is being bought, so start at the ladder. */
  none: ANCHORS.ladder,
  /* A search engagement on whatever exists. Same. */
  existing_stack: ANCHORS.ladder,
  static_marketing: ANCHORS.scenario("simple-business"),
  cms_marketing: ANCHORS.scenario("marketing-seo"),
  custom_content: ANCHORS.scenario("marketing-seo"),
  platform_commerce: ANCHORS.scenario("ecommerce"),
  headless_commerce: ANCHORS.myth("custom-ecommerce"),
  /* The workflow answer: software beside the website, not a bigger website. */
  automation_layer: ANCHORS.scenario("internal-tools"),
  web_application: ANCHORS.scenario("membership"),
  business_platform: ANCHORS.scenario("custom-platform"),
};

/**
 * The full href for a recommendation's "why this recommendation" link.
 *
 * Kept here rather than in the calculator so that if this page is ever
 * restructured, every inbound deep link moves with it in one edit.
 */
export function explanationHref(classId: ArchitectureClassId, locale: "en" | "fr"): string {
  return `${PATHS[locale]}#${ARCHITECTURE_EXPLANATIONS[classId]}`;
}
