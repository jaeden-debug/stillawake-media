/**
 * ═══════════════════════════════════════════════════════════════════════════
 * THE ARCHITECTURE RECOMMENDER — 1 of 5 · TYPES
 *
 * DELIBERATELY OUTSIDE `src/lib/pricing/`. That directory is a kernel synced
 * byte-identical into a second repository by `scripts/sync-pricing.mjs`, and
 * nothing here belongs in it: what a project costs and what it should be built
 * on are two different questions with two different answers. A restaurant site
 * and a law-firm site can price identically and want completely different
 * stacks; a Shopify store and a headless storefront can want the same stack at
 * ten times the price.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * WHAT THIS MODEL IS FOR
 *
 * It answers "what is the least complicated thing that does this?" — not "what
 * is the most capable thing we could build?". Those produce different answers
 * and only one of them is honest.
 *
 * The failure mode it exists to prevent is specific and it is ours: a studio
 * that can build Next.js + Postgres + auth + Stripe will reach for Next.js +
 * Postgres + auth + Stripe, because that is the shape its hands already know.
 * A five-page electrician site does not need a database. Saying so out loud,
 * in the client-facing result, is the whole point.
 *
 * MINIMUM SUFFICIENT ARCHITECTURE is the rule, in that priority order:
 *
 *   simplicity → requirements fit → maintainability → client usability →
 *   cost → scalability
 *
 * Scalability is LAST on purpose. Designing a local business's website for
 * traffic it will never see is not prudence, it is a bill.
 *
 * EVERY OUTPUT IS A KEY, NEVER PROSE. Same discipline as the pricing kernel:
 * the engine is deterministic and language-free, and `labels.ts` renders it in
 * English or Québec French. A recommendation that read differently in the two
 * languages would be two recommendations.
 */

export type Locale = "en" | "fr";

/**
 * THE TAXONOMY.
 *
 * Ten classes, not a combinatorial explosion of stacks. Each is a genuinely
 * different shape of project with a genuinely different maintenance story, and
 * a taxonomy anyone can hold in their head is one that stays correct when it
 * is extended.
 *
 * The ordering is the complexity ladder, and the engine walks DOWN it: it
 * takes the first class whose requirements are actually met, never the most
 * capable class the requirements would permit.
 */
export type ArchitectureClassId =
  /** No architecture is being bought. Brand work. */
  | "none"
  /** Works on whatever already exists. Search engagements. */
  | "existing_stack"
  /** A few pages that rarely change. No CMS, no database, no backend. */
  | "static_marketing"
  /** Content-managed marketing site on a proven platform. Still no database. */
  | "cms_marketing"
  /** Custom frontend + structured headless CMS. Still no database, still no auth. */
  | "custom_content"
  /** A normal catalogue on a proven commerce platform. */
  | "platform_commerce"
  /** Commerce platform for the shop, custom frontend for everything else. */
  | "headless_commerce"
  /** The requirement is a workflow between systems, not a new interface. */
  | "automation_layer"
  /** Real application: accounts, persistent data, a backend that is ours. */
  | "web_application"
  /** Multiple roles, real permissions, integrations, operations. */
  | "business_platform";

/** The layers a recommendation reasons about, one decision each. */
export type LayerId =
  | "frontend"
  | "cms"
  | "hosting"
  | "database"
  | "auth"
  | "commerce"
  | "payments"
  | "email"
  | "automation"
  | "analytics";

/**
 * `not_needed` IS THE MOST IMPORTANT VALUE HERE.
 *
 * A layer that is absent from the output reads as an oversight. A layer that
 * says "Database — not needed, because nothing here stores information beyond
 * your pages and your form submissions" is the sentence that stops a $30,000
 * architecture being proposed for a $4,000 problem. So every layer is always
 * present in the output, and most of them, most of the time, say no.
 */
export type ComponentStatus = "recommended" | "optional" | "not_needed";

export type Component = {
  layer: LayerId;
  status: ComponentStatus;
  /** Technology key — resolved through `TECH_LABELS`. Null when nothing is needed. */
  choice: string | null;
  /** Reason key — resolved through `REASON_LABELS`. Always present, including for `not_needed`. */
  why: string;
};

/**
 * A real alternative, with the specific reason it lost.
 *
 * "Why we didn't choose it" is not a courtesy. Where two options are genuinely
 * close, saying which one we rejected and on what signal is the difference
 * between advice and a sales pitch — and it is checkable, which a pitch is not.
 */
export type Alternative = {
  classId: ArchitectureClassId;
  /** Reason key for the rejection. */
  why: string;
};

/**
 * How firmly the recommendation is held.
 *
 * `clear`      — the requirements point at one answer and it is not close.
 * `reasonable` — more than one setup would work; this is the simplest of them.
 * `open`       — something material is undecided, and the answer may move.
 *
 * Pretending to `clear` when the honest answer is `open` is how a
 * recommendation engine becomes a lead-scoring gimmick.
 */
export type Confidence = "clear" | "reasonable" | "open";

/** Client-facing complexity, in plain terms. Never a story-point score. */
export type Complexity = "low" | "low_moderate" | "moderate" | "substantial" | "high";

/**
 * WHAT THE VISITOR ANSWERED, NORMALISED.
 *
 * Derived from the public calculator's own answer vocabulary — see
 * `requirements.ts`. Nothing in here is asked twice: all but two of these
 * fields come from questions the flow already asked for pricing.
 */
export type ProjectRequirements = {
  goal: "website" | "store" | "software" | "automation" | "brand" | "seo" | "unknown";
  /** The sub-choice for goals that split (store/software/automation kinds). */
  kind: string;

  /** How many pages, roughly. Drives CMS need, not stack power. */
  contentScale: "minimal" | "standard" | "large" | "unknown";
  /**
   * Whether they will be updating it themselves. Decides the CMS layer.
   *
   * `unstated` rather than `rare`, because it comes from an unticked checkbox
   * and silence is not a denial. Where the difference changes the answer, the
   * recommendation raises it as an open question instead of guessing.
   */
  editing: "frequent" | "unstated";
  /** A second language is a routing and content-model decision, not a translation task. */
  languages: "two_plus" | "unstated";

  commerce: "none" | "few_products" | "catalogue" | "large_catalogue" | "beyond_platform";
  bookings: "none" | "integrate" | "build";
  ordering: "none" | "integrate" | "build";
  payments: boolean;

  /** Who signs in. `none` is what keeps auth and a database out of the stack. */
  accounts: "none" | "customers" | "staff" | "public_signup";
  /** Data the business owns beyond pages and form submissions. The database test. */
  persistentData: boolean;
  /** A proprietary process no existing product models. The custom-build test. */
  customWorkflow: boolean;

  integrations: "none" | "documented" | "internal";
  multiLocation: boolean;
  seo: "baseline" | "local" | "strategic";
  compliance: boolean;
  /** Scope the visitor told us is still open. Caps confidence; never inflates the stack. */
  openScope: boolean;
};

/**
 * Where a recommendation sends someone next.
 *
 * Chosen BY the recommendation, never rendered as four identical calls to
 * action. A Shopify answer and a customer-portal answer have almost nothing
 * useful in common to read next.
 */
export type EducationalLinkId =
  | "custom_software_guide"
  | "custom_software_buy_build"
  | "custom_software_tco"
  /* The sibling guides in the same cluster. Deep-linked to the section that
     answers the question this result just raised — landing someone at the top
     of a long guide and letting them hunt is not a recommendation. */
  | "setup_guide"
  | "setup_guide_types"
  | "setup_guide_ecommerce"
  | "setup_guide_cms"
  | "setup_guide_portal"
  | "website_ownership"
  | "software_development"
  | "shopify_development"
  | "framer_development"
  | "website_cost"
  | "software_cost"
  | "seo_cost"
  | "web_design"
  | "ai_automation"
  | "website_maintenance"
  | "pricing"
  | "answer_engine_optimization"
  | "local_seo"
  | "website_redesign"
  | "branding";

export type Recommendation = {
  /** Bumped when the rules change, so a shared result can be read in context. */
  version: string;
  classId: ArchitectureClassId;
  complexity: Complexity;
  confidence: Confidence;
  /** Ordered reason keys — why this class, in the client's terms. */
  reasons: string[];
  /** Every layer, always. Including the ones that say no. */
  components: Component[];
  /** The alternatives worth naming, each with the signal that ruled it out. */
  alternatives: Alternative[];
  /** What the client will be able to change without calling anyone. */
  clientManages: string[];
  /** What StillAwake carries. */
  studioHandles: string[];
  /** What is genuinely undecided, so the confidence has something to point at. */
  openQuestions: string[];
  /** Contextual reading, selected by this recommendation. Never a generic block of four. */
  links: EducationalLinkId[];
};
