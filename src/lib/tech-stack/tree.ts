import type { AnswerKey, OutcomeId, QuestionId } from "./types";

/**
 * The decision tree, as logic rather than as copy.
 *
 * Written to mirror how the project calculator already interrogates a brief
 * (`src/lib/pricing/public-flow.ts`): ask about the business, never about the
 * technology, and treat "integrate what exists" and "build the thing" as two
 * different products rather than two sizes of one. That distinction is the
 * single largest source of over-engineering in this market, so it appears
 * twice here — once for commerce, once for logins.
 *
 * Order is deliberate. Payment, then private data, then who publishes, then
 * search. Each question can only ever move a reader UP the ladder, and the
 * first one that fires wins, so a business lands on the simplest rung that
 * still satisfies a requirement it actually stated.
 *
 * The workflow question is the exception, and it is the most important node in
 * the tree: an odd internal process is a reason to build a piece of software,
 * NOT a reason to rebuild the website around it. Answering yes therefore
 * returns an outcome that deliberately keeps the site where it was.
 */

type Step =
  | { kind: "question"; id: QuestionId; next: Record<AnswerKey, Step> }
  | { kind: "outcome"; id: OutcomeId };

const out = (id: OutcomeId): Step => ({ kind: "outcome", id });

/**
 * Search only ever separates "a site that exists" from "a site that competes",
 * so it is one shared sub-tree reached from several places rather than three
 * near-identical branches.
 */
const SEARCH_STEP: Step = {
  kind: "question",
  id: "search",
  next: {
    /* People arrive already knowing the name — referral, word of mouth, a card. */
    known: out("simple-site"),
    /* Search is a channel: service pages, locations, comparisons, a blog. */
    channel: out("marketing-site"),
    /* Search is THE channel, at a volume a page builder starts losing. */
    primary: out("custom-marketing-site"),
  },
};

/**
 * Reached once the site itself is settled. "Yes" does not upgrade the website —
 * it splits the project in two, which is the whole point of asking.
 */
const WORKFLOW_STEP: Step = {
  kind: "question",
  id: "workflow",
  next: {
    no: SEARCH_STEP,
    manual: out("separate-system"),
  },
};

const EDITING_STEP: Step = {
  kind: "question",
  id: "editing",
  next: {
    /* Changed a few times a year, and asking someone is fine. */
    rarely: WORKFLOW_STEP,
    /* A non-technical team publishes regularly and cannot wait for a developer. */
    team: WORKFLOW_STEP,
    /* Several editors, drafts, scheduling, categories, media — a newsroom. */
    editorial: out("publisher"),
  },
};

const ACCOUNTS_STEP: Step = {
  kind: "question",
  id: "accounts",
  next: {
    no: EDITING_STEP,
    /* Customers see records that belong to them. Often already solved by a tool. */
    clients: {
      kind: "question",
      id: "portal_scope",
      next: {
        maybe: out("buy-before-build"),
        no: out("portal"),
      },
    },
    /* Only staff. Still software, but the buy-first test applies hardest here. */
    staff: out("internal-tool"),
    /* Anyone signs up and is billed. This is a product, not a website. */
    public: out("saas"),
  },
};

const ROOT: Step = {
  kind: "question",
  id: "selling",
  next: {
    no: ACCOUNTS_STEP,
    /* A handful of items, deposits, or invoices — a checkout is not the answer. */
    occasional: out("payments-link"),
    /* A real catalogue. The only question left is whether it is a normal one. */
    catalogue: {
      kind: "question",
      id: "commerce_fit",
      next: {
        normal: out("shopify"),
        /* Sells fine, but the business also publishes seriously. */
        content: out("shopify-content"),
        /* Per-customer pricing, rentals, configurators, marketplaces. */
        unusual: out("headless-commerce"),
      },
    },
    /* Recurring access to something, rather than goods. Falls through to logins. */
    subscription: ACCOUNTS_STEP,
  },
};

export const TREE_ROOT: Step = ROOT;

export type Path = { question: QuestionId; answer: AnswerKey }[];

export type Resolution =
  | { done: false; question: QuestionId; answers: AnswerKey[] }
  | { done: true; outcome: OutcomeId };

/**
 * Walks the tree with the answers given so far.
 *
 * Returns either the next question to ask (with its legal answers, so the UI
 * never has to hold its own copy of the edges) or the outcome. An answer that
 * does not exist on the current node ends the walk at that node rather than
 * throwing — a stale link or a hand-edited URL should re-ask a question, not
 * take the page down.
 */
export function resolve(path: Path): Resolution {
  let step: Step = ROOT;

  for (const { answer } of path) {
    if (step.kind === "outcome") break;
    const next: Step | undefined = step.next[answer];
    if (!next) break;
    step = next;
  }

  if (step.kind === "outcome") return { done: true, outcome: step.id };
  return { done: false, question: step.id, answers: Object.keys(step.next) };
}

/** Every outcome the tree can actually reach. Used by the test and the page. */
export function reachableOutcomes(): OutcomeId[] {
  const found = new Set<OutcomeId>();
  const walk = (step: Step) => {
    if (step.kind === "outcome") {
      found.add(step.id);
      return;
    }
    for (const child of Object.values(step.next)) walk(child);
  };
  walk(ROOT);
  return [...found];
}

/** Every question the tree can actually reach. */
export function reachableQuestions(): QuestionId[] {
  const found = new Set<QuestionId>();
  const walk = (step: Step) => {
    if (step.kind === "outcome") return;
    found.add(step.id);
    for (const child of Object.values(step.next)) walk(child);
  };
  walk(ROOT);
  return [...found];
}
