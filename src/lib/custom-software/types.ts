/**
 * The custom software guide's content model.
 *
 * This guide answers the question the other three in the cluster assume has
 * already been settled. `/website-setup-guide` asks *what should this consist
 * of*; `/website-ownership` asks *who holds the keys afterwards*. This one
 * asks the prior question: **does any of this need to be built at all, or does
 * it already exist and just need buying?**
 *
 * THE STRUCTURE ENFORCES THE ARGUMENT.
 *
 * `Route` has five members and `build` is the last of them. Every requirement
 * in this guide is evaluated against buy → configure → integrate → extend →
 * build in that order, and the type makes it impossible to describe a
 * requirement without naming what the cheaper routes would have cost. A guide
 * written by a studio that sells custom software has exactly one way to be
 * trustworthy, and it is to make the case against itself first.
 *
 * `CounterSignal.buyInstead` is REQUIRED, not optional. A section headed "when
 * you probably don't need this" that fails to name the thing you should buy
 * instead is not advice, it is throat-clearing before a pitch.
 *
 * Both locales are written independently — French is written for Québec rather
 * than translated — but they share these types and the same ids, so the
 * sections, anchors and tests behave identically in both languages.
 */

export type Locale = "en" | "fr";

export type InternalLink = { label: string; href: string };

/**
 * The vocabulary problem, which is most of why these conversations go wrong.
 *
 * A business owner says "we need a system". That word covers a CRM they could
 * buy this afternoon and a platform that would take six months. Naming the
 * categories precisely is the cheapest intervention available.
 */
export type SystemKind = {
  id: string;
  name: string;
  /** What it is, in one sentence, without naming a vendor. */
  oneLine: string;
  /** The condition under which this is genuinely the thing you need. */
  needItWhen: string;
  /** The category it gets confused with — the confusion is the expensive part. */
  notToBeConfusedWith: string;
  /** Whether a proven product usually exists for this. Drives the routes section. */
  provenProductsExist: boolean;
};

/**
 * THE FIVE ROUTES. The centre of the guide.
 *
 * Ordered cheapest-and-most-proven to most-expensive-and-most-owned, and every
 * requirement gets walked down the list in that order. `build` is not the
 * climax — it is what is left when the four above it have been genuinely ruled
 * out for a stated reason.
 */
export type RouteId = "buy" | "configure" | "integrate" | "extend" | "build";

export type Route = {
  id: RouteId;
  name: string;
  /** What this route actually means, mechanically. */
  meaning: string;
  /** The conditions under which this is the right route. */
  chooseWhen: string[];
  /** What it costs you — in money, in constraint, or in both. */
  cost: string;
  /** What goes wrong when this route is chosen for the wrong reason. */
  failureMode: string;
  /** A concrete case, so the abstraction lands. */
  example: string;
};

/** A reason custom software is genuinely warranted. */
export type Signal = {
  id: string;
  title: string;
  body: string;
  /** The test that separates this from wanting it to be true. */
  test: string;
};

/**
 * A reason it probably is not — and what to buy instead.
 *
 * `buyInstead` is mandatory by design. See the file header.
 */
export type CounterSignal = {
  id: string;
  title: string;
  body: string;
  buyInstead: string;
};

/**
 * A line in the total cost of ownership.
 *
 * `timing` exists because the entire failure of custom-software budgeting is
 * treating a permanent obligation as a one-time cost. The build is the part
 * people plan for; it is rarely the part that hurts.
 */
export type CostLine = {
  id: string;
  name: string;
  body: string;
  timing: "build" | "ongoing";
};

export type Step = { label: string; body: string };

export type GuideContent = {
  locale: Locale;
  path: string;
  otherPath: string;

  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };

  hero: {
    eyebrow: string;
    h1: string;
    standfirst: string;
    /** The direct answer, written to be quotable by an answer engine. */
    answer: string;
  };

  kinds: {
    title: string;
    intro: string;
    items: SystemKind[];
  };

  routes: {
    title: string;
    intro: string;
    items: Route[];
    /** The rule that makes the ladder mean something. */
    rule: string;
  };

  when: {
    title: string;
    intro: string;
    items: Signal[];
  };

  whenNot: {
    title: string;
    intro: string;
    items: CounterSignal[];
  };

  cost: {
    title: string;
    intro: string;
    items: CostLine[];
    /** Why no dollar figures appear here. */
    note: string;
    comparison: string;
  };

  decide: {
    title: string;
    intro: string;
    steps: Step[];
  };

  faq: [string, string][];

  cta: {
    title: string;
    body: string;
    calculator: InternalLink;
  };

  related: {
    title: string;
    links: InternalLink[];
  };
};
