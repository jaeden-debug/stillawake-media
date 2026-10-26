/**
 * ═══════════════════════════════════════════════════════════════════════════
 * THE ARCHITECTURE RECOMMENDER — 2 of 5 · SIGNALS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Turns the public calculator's answers into architecture signals.
 *
 * THE RULE THAT SHAPED THIS FILE: reuse, do not re-ask. The flow already asks
 * eight to ten questions to produce a price, and almost every architectural
 * signal is already sitting in those answers — "give customers a login" is the
 * authentication decision, "connect to our own internal system" is the
 * integration decision, "several locations" is the routing decision. Adding a
 * second questionnaire on top of the first would be the fastest way to make
 * people abandon both.
 *
 * TWO SIGNALS ARE GENUINELY NEW, and only two, because only two change the
 * architecture and cannot be derived from anything already asked:
 *
 *   `content_updates` — whether they will be updating the site themselves,
 *     regularly. This decides the CMS layer outright, and it is NOT the same
 *     question as the existing `content` one: that asks whether the words
 *     exist yet (a build-time cost), this asks what happens for the next three
 *     years (an architecture decision). A site whose content is written and
 *     then left alone should not carry a CMS, and a site whose owner posts
 *     weekly should never need to call us to publish.
 *
 *   `multilingual` — a second language is a routing and content-model decision
 *     made on day one, not a translation task bolted on later. In this market
 *     it is also extremely common, and it genuinely rules some builders out.
 *
 * BOTH RIDE INSIDE QUESTIONS THE FLOW ALREADY ASKS — one option on the needs
 * list, one on the complexity list. The public flow is capped at six questions
 * by a test that exists because brevity is the product, and two extra screens
 * would have been a worse trade than two extra checkboxes. It also means an
 * architecture recommendation costs a visitor nothing at all.
 *
 * NEITHER TOUCHES THE PRICE. `mapAnswers` in the pricing flow does not read
 * them and must not: the pricing kernel is synced to a second repository, its
 * behaviour is calibrated, and "the architecture layer wanted a signal" is not
 * a reason to move anyone's quote. The recommendation says out loud when a
 * second language sits outside the estimate — see the `second_language_scope`
 * open question — which is the honest way to handle a question whose answer we
 * use but do not charge for.
 */

import type { Answers } from "@/lib/pricing/public-flow";
import { goalOf } from "@/lib/pricing/public-flow";

import type { ProjectRequirements } from "./types";

const one = (a: Answers, id: string) => (typeof a[id] === "string" ? (a[id] as string) : "");
const many = (a: Answers, id: string) => (Array.isArray(a[id]) ? (a[id] as string[]) : []);
const has = (a: Answers, id: string, key: string) => many(a, id).includes(key);

/** The pricing flow's goal vocabulary, mapped onto ours. */
function goalFrom(a: Answers): ProjectRequirements["goal"] {
  const goal = goalOf(a);
  if (goal === "new_website" || goal === "redesign") return "website";
  if (goal === "store") return "store";
  if (goal === "software") return "software";
  if (goal === "automation") return "automation";
  if (goal === "brand") return "brand";
  if (goal === "seo") return "seo";
  return "unknown";
}

/**
 * WHAT COUNTS AS PERSISTENT DATA — the single most consequential test in the
 * whole model, because it is what puts a database in the stack.
 *
 * Form submissions do NOT count. A contact form emails someone; it does not
 * need a table, a migration, a backup policy or a privacy review of its own.
 * Treating "we get enquiries" as "we need a database" is exactly the reasoning
 * that turns a brochure site into an application, and it is wrong.
 *
 * What does count: anything a person signs in to see, anything the business
 * reads back later as a record, and any workflow whose state has to survive
 * the request that created it.
 */
function persistentDataFrom(a: Answers, goal: ProjectRequirements["goal"], kind: string): boolean {
  if (goal === "software") return true;
  if (goal === "store") return kind === "custom";
  // A login is a stored account by definition, and accounts imply rows.
  if (has(a, "needs", "logins")) return true;
  // Their own internal system is a data source we have to read from and write to.
  if (has(a, "complexity", "connect_internal")) return true;
  return false;
}

/**
 * A PROPRIETARY WORKFLOW — the test for whether custom software is warranted
 * at all, as opposed to configuration of something that already exists.
 *
 * "Something custom" ticked on the needs list is the visitor telling us, in
 * their own words, that no product they have found does the thing. That is the
 * closest signal a questionnaire can get to it, and it is deliberately not
 * inferred from anything else: wanting bookings is not a proprietary workflow,
 * and neither is wanting to sell things.
 */
function customWorkflowFrom(a: Answers, goal: ProjectRequirements["goal"], kind: string): boolean {
  if (has(a, "needs", "custom")) return true;
  if (goal === "store" && kind === "custom") return true;
  if (goal === "software" && kind === "platform") return true;
  if (goal === "automation" && (kind === "workflow" || kind === "ai")) return true;
  return false;
}

function commerceFrom(a: Answers, goal: ProjectRequirements["goal"], kind: string): ProjectRequirements["commerce"] {
  if (goal === "store") {
    if (kind === "custom") return "beyond_platform";
    if (kind === "large") return "large_catalogue";
    return "catalogue";
  }
  // Selling on a site that is primarily something else. A handful of products,
  // not a shop — and that distinction decides whether a commerce platform is
  // worth its own monthly fee and its own admin.
  if (has(a, "needs", "sell")) return "few_products";
  return "none";
}

function accountsFrom(a: Answers, goal: ProjectRequirements["goal"], kind: string): ProjectRequirements["accounts"] {
  if (goal === "software") {
    if (kind === "platform") return "public_signup";
    if (kind === "portal") return "customers";
    return "staff";
  }
  if (has(a, "needs", "logins")) return "customers";
  return "none";
}

function contentScaleFrom(a: Answers, goal: ProjectRequirements["goal"]): ProjectRequirements["contentScale"] {
  if (goal !== "website") return "unknown";
  const size = one(a, "size");
  if (size === "small") return "minimal";
  if (size === "standard") return "standard";
  if (size === "large") return "large";
  return "unknown";
}

/**
 * Search scope, from wherever the flow happened to ask it.
 *
 * Websites fold search into the needs list; stores and search engagements get
 * their own question. "Rank for what people search for" is the deeper of the
 * two and wins when both are ticked — same precedence the pricing mapper uses,
 * so the two layers cannot disagree about what was asked for.
 */
function seoFrom(a: Answers, goal: ProjectRequirements["goal"]): ProjectRequirements["seo"] {
  if (goal === "seo") return "strategic";
  if (has(a, "needs", "found_search")) return "strategic";
  if (has(a, "needs", "found_local")) return "local";
  const search = one(a, "search");
  if (search === "content_strategy") return "strategic";
  if (search === "local") return "local";
  return "baseline";
}

export function requirementsFrom(a: Answers): ProjectRequirements {
  const goal = goalFrom(a);
  const kind = one(a, "kind");

  return {
    goal,
    kind,

    contentScale: contentScaleFrom(a, goal),
    /**
     * A checkbox, so an unticked box means "not asked for" rather than a
     * definite no. It is read as `unstated`, and the recommendation carries an
     * open question wherever that ambiguity actually changed the answer —
     * which is only ever the static-versus-managed decision. Treating silence
     * as a firm "never" would be the engine putting words in someone's mouth
     * on the one question it cannot see.
     */
    editing: has(a, "needs", "content_updates") ? "frequent" : "unstated",
    languages: has(a, "complexity", "multilingual") ? "two_plus" : "unstated",

    commerce: commerceFrom(a, goal, kind),
    bookings: has(a, "needs", "bookings") ? (one(a, "how.bookings") === "build" ? "build" : "integrate") : "none",
    ordering: has(a, "needs", "ordering") ? (one(a, "how.ordering") === "build" ? "build" : "integrate") : "none",
    payments: has(a, "needs", "payments"),

    accounts: accountsFrom(a, goal, kind),
    persistentData: persistentDataFrom(a, goal, kind),
    customWorkflow: customWorkflowFrom(a, goal, kind),

    integrations: has(a, "complexity", "connect_internal")
      ? "internal"
      : has(a, "needs", "connect")
        ? "documented"
        : "none",
    multiLocation: has(a, "complexity", "multi_location"),
    seo: seoFrom(a, goal),
    compliance: has(a, "complexity", "accessibility"),
    /* Uncertainty caps confidence and opens a question. It never adds a layer:
       "we are not sure yet" is not a reason to sell someone a database. */
    openScope: has(a, "needs", "custom") || one(a, "size") === "unsure" || one(a, "goal") === "not_sure",
  };
}
