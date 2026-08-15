/**
 * The website setup guide's content model.
 *
 * The guide answers a different question from a technology comparison. A
 * platform page ("Shopify vs WooCommerce", "why Next.js") asks *what should
 * power this*. This asks *what should this consist of* — and the answer is a
 * set of requirements, which is what a technology choice is supposed to be
 * derived from.
 *
 * That distinction is enforced structurally rather than editorially: nothing
 * in these types can name a platform. A `SiteType` describes a shape of
 * website and what that shape genuinely requires; a `Question` is a statement
 * about the business that a reader can confirm. Neither has a field for
 * "recommended stack", so the guide cannot quietly become a stack guide.
 *
 * Both locales are written independently — French is written for Québec, not
 * translated — but they share these types and the same ids, so the engine,
 * the tests and the checklist behave identically in both languages.
 */

export type Locale = "en" | "fr";

/** A link to somewhere else on this site. Validated against real routes in the tests. */
export type InternalLink = { label: string; href: string };

/**
 * The shapes a business website can take.
 *
 * Deliberately not a taxonomy of technology. "Ecommerce" here means *a
 * catalogue, stock and a checkout exist*, not "Shopify"; "saas" means the
 * software is the product, not "Next.js and Supabase".
 */
export type SiteTypeId =
  | "brochure"
  | "lead-gen"
  | "content"
  | "ecommerce"
  | "booking"
  | "membership"
  | "portal"
  | "internal"
  | "saas";

export type SiteType = {
  id: SiteTypeId;
  name: string;
  /** One sentence: the job this shape does. */
  job: string;
  /** When this shape is genuinely enough — the part most agencies skip. */
  sufficientWhen: string;
  /** What it actually takes to work. Not features — obligations. */
  requires: string[];
  /** The expensive mistake people make with this shape. */
  mistake: string;
  /** Where buying proven software beats building it. Absent when it rarely applies. */
  buyInstead?: string;
  links?: InternalLink[];
};

/** The six things a website decision actually turns on. */
export type QuestionGroupId =
  | "outcome"
  | "selling"
  | "people"
  | "content"
  | "systems"
  | "scale";

export type QuestionGroup = {
  id: QuestionGroupId;
  name: string;
  /** Why this group of answers changes the build. */
  intro: string;
};

/**
 * How much of a CMS an answer implies.
 *
 * `none` — the page is edited by whoever ships the site.
 * `light` — someone non-technical changes words and images.
 * `structured` — repeating records with fields, relationships and a workflow.
 */
export type CmsSignal = "none" | "light" | "structured";

/**
 * One tickable statement about the business.
 *
 * Phrased as something a reader knows to be true or false about their own
 * company, never as a feature request. "People book time with us" is a fact;
 * "I want a booking system" is a decision that has already skipped the step
 * this guide exists to restore.
 */
export type Question = {
  id: string;
  group: QuestionGroupId;
  /** The statement, in the reader's terms. */
  ask: string;
  /** What confirming it actually decides about the build. */
  decides: string;
  /** The shapes this answer points at. */
  implies: SiteTypeId[];
  /**
   * Lifecycle weight — how much permanent ownership this adds, not how hard
   * it is to build once. 0 is a page; 3 is a system somebody has to run
   * forever. The totals drive the complexity band, which is the honest output.
   */
  weight: 0 | 1 | 2 | 3;
  cms?: CmsSignal;
  /** A legal or data obligation that comes attached. Québec answers carry more of these. */
  duty?: string;
  /**
   * A constraint rather than a capability: it does not add work, it limits
   * how much work the finished thing can be allowed to demand.
   */
  constraint?: true;
};

/** One layer of the requirements-before-technology sequence. */
export type FlowStep = {
  label: string;
  /** What you write down at this layer. */
  body: string;
};

/** A CMS option, and the case where it is the right answer. */
export type CmsOption = {
  name: string;
  what: string;
  justifiedWhen: string;
  cost: string;
};

/** A worked example: a real business shape, reasoned through rather than assigned a stack. */
export type Scenario = {
  id: string;
  business: string;
  /** What the business actually needs to happen. */
  goal: string;
  /** The requirements that follow, in order. */
  requirements: string[];
  /** The shape that falls out, and why. */
  verdict: string;
  /** What we would deliberately not build. */
  restraint: string;
  links?: InternalLink[];
};

/** A capability the business should be able to change without a developer. */
export type ControlRow = {
  item: string;
  /** "client" — theirs to change. "build" — changed through development and deployment. */
  owner: "client" | "build";
  why: string;
};

export type Faq = { q: string; a: string };

/** Everything one language of the guide renders from. */
export type GuideContent = {
  locale: Locale;
  path: string;
  otherPath: string;
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  hero: { eyebrow: string; h1: string; standfirst: string; answer: string };
  /**
   * `handoff` is the deliberate hand-off to the technology guide. It sits at
   * the bottom of the sequence rather than the top, because that is the whole
   * argument of this page: the stack is the ninth decision, not the first.
   */
  flow: {
    title: string;
    intro: string;
    steps: FlowStep[];
    warning: string;
    handoff: InternalLink;
  };
  finder: { title: string; intro: string; groups: QuestionGroup[]; questions: Question[] };
  types: { title: string; intro: string; items: SiteType[]; hybrid: string };
  cms: { title: string; intro: string; deciders: string[]; options: CmsOption[]; verdict: string };
  control: { title: string; intro: string; rows: ControlRow[] };
  complexity: { title: string; intro: string; costs: { name: string; body: string }[]; rule: string };
  scenarios: { title: string; intro: string; items: Scenario[] };
  checklist: { title: string; intro: string; sections: { name: string; items: string[] }[]; outro: string };
  next: { title: string; intro: string; links: InternalLink[] };
  faqs: Faq[];
};
