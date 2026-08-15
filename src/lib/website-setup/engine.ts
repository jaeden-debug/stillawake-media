import type { CmsSignal, Question, SiteTypeId } from "./types";

/**
 * The requirement finder's reasoning.
 *
 * Pure, deterministic, and identical in both languages: it reads question ids
 * and returns ids, never copy. That is what lets the French guide be written
 * independently while behaving the same — and it is what makes the output
 * testable rather than a vibe.
 *
 * The design constraint that matters: this must be able to return "you need
 * less than you think". A recommender that can only add capability is a sales
 * form. So weight is *lifecycle ownership*, not build effort, and the
 * conflict check exists specifically to tell someone their answers do not
 * agree with each other.
 */

export type ComplexityBand = "single" | "system" | "two-products" | "software";

export type FinderResult = {
  /** Ticked question ids, in the order the guide declares them. */
  selected: string[];
  /** Shapes ranked by how much of the answer set points at them. */
  ranked: { id: SiteTypeId; score: number }[];
  /** The shape the answers point at hardest, if any answers were given. */
  primary: SiteTypeId | null;
  /** Other shapes carrying real weight — the honest case for a hybrid build. */
  secondary: SiteTypeId[];
  /** Sum of lifecycle weight across the selection. */
  weight: number;
  band: ComplexityBand;
  /** The strongest content-editing signal in the selection. */
  cms: CmsSignal;
  /** Obligations attached to the selection, deduplicated, in declaration order. */
  duties: string[];
  /**
   * True when the reader asked for something nobody will maintain *and* chose
   * enough capability to require maintaining. Surfaced as a warning, because
   * that combination is how sites die.
   */
  conflict: boolean;
};

/** A shape needs this much score before it is worth naming as a second product. */
const SECONDARY_THRESHOLD = 4;

/**
 * ...and it has to be implied by more than one answer.
 *
 * Without this, a single statement that legitimately points at three shapes
 * — "visitors need to log in", which is true of a membership site, a portal
 * and a SaaS product — named all three as "also required" off one tick. That
 * reads as a system upsell rather than a reading of the answers, which is the
 * exact failure this page exists to argue against. A second product has to be
 * evidenced by a second answer.
 */
const SECONDARY_SUPPORT = 2;

/** Above this much lifecycle weight, "nobody will maintain it" stops being possible. */
const NEGLECT_CEILING = 7;

const CMS_RANK: Record<CmsSignal, number> = { none: 0, light: 1, structured: 2 };

function band(weight: number): ComplexityBand {
  if (weight <= 3) return "single";
  if (weight <= 9) return "system";
  if (weight <= 17) return "two-products";
  return "software";
}

/**
 * Scores the ticked statements.
 *
 * A statement contributes `weight + 1` to every shape it implies: the +1 keeps
 * zero-weight answers (the ones that add no ongoing burden) from being
 * invisible, since "we just need to look legitimate" is a real answer that has
 * to be able to win.
 */
export function evaluate(questions: Question[], selectedIds: Iterable<string>): FinderResult {
  const chosen = new Set(selectedIds);
  const selected = questions.filter((q) => chosen.has(q.id));

  const scores = new Map<SiteTypeId, number>();
  const support = new Map<SiteTypeId, number>();
  let weight = 0;
  let cms: CmsSignal = "none";
  const duties: string[] = [];
  let neglect = false;

  for (const q of selected) {
    if (q.constraint) {
      neglect = true;
      continue;
    }
    weight += q.weight;
    if (q.cms && CMS_RANK[q.cms] > CMS_RANK[cms]) cms = q.cms;
    if (q.duty && !duties.includes(q.duty)) duties.push(q.duty);
    for (const type of q.implies) {
      scores.set(type, (scores.get(type) ?? 0) + q.weight + 1);
      support.set(type, (support.get(type) ?? 0) + 1);
    }
  }

  /* Ties are broken by the order the guide declares its shapes, so the same
     answers always produce the same reading — a recommendation that reshuffles
     on a page refresh is not a recommendation. */
  const order = new Map<SiteTypeId, number>();
  for (const q of questions) {
    for (const type of q.implies) if (!order.has(type)) order.set(type, order.size);
  }

  const ranked = [...scores.entries()]
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score || (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));

  const primary = ranked[0]?.id ?? null;
  const secondary = ranked
    .slice(1)
    .filter(
      (entry) =>
        entry.score >= SECONDARY_THRESHOLD &&
        (support.get(entry.id) ?? 0) >= SECONDARY_SUPPORT,
    )
    .map((entry) => entry.id);

  return {
    selected: selected.map((q) => q.id),
    ranked,
    primary,
    secondary,
    weight,
    band: band(weight),
    cms,
    duties,
    conflict: neglect && weight > NEGLECT_CEILING,
  };
}
