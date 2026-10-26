/**
 * ═══════════════════════════════════════════════════════════════════════════
 * THE ARCHITECTURE RECOMMENDER — 5 of 5 · PRESENTATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Renders a `Recommendation` into the shape the browser receives.
 *
 * THE SPLIT THIS FILE ENFORCES: everything above `technical` is written for
 * someone who runs a restaurant, and `technical` is written for whoever they
 * forward it to. The client-facing half never names a product — it says "you
 * can edit text and add pages", not "Sanity". The technical half names
 * everything, and sits behind a disclosure the reader has to open.
 *
 * A result that leads with "Next.js + Supabase + Sanity" has told a prospect
 * nothing they can act on and quite a lot they now have to look up.
 */

import { explanationHref } from "@/lib/tech-stack/types";

import type { Locale, Recommendation } from "./types";
import {
  ALTERNATIVE_REASONS,
  CLASS_LABELS,
  CLASS_SUMMARIES,
  CLIENT_MANAGES_LABELS,
  COMPLEXITY_LABELS,
  CONFIDENCE_LABELS,
  CONFIDENCE_NOTES,
  EDUCATIONAL_LINKS,
  LAYER_LABELS,
  LAYER_TECHNICAL_LABELS,
  OPEN_QUESTION_LABELS,
  REASON_LABELS,
  STATUS_LABELS,
  STUDIO_HANDLES_LABELS,
  TECH_LABELS,
} from "./labels";

export type PresentedRecommendation = {
  version: string;
  headline: string;
  summary: string;
  complexity: string;
  confidence: string;
  confidenceNote: string;
  reasons: string[];
  clientManages: string[];
  studioHandles: string[];
  /** The "you do not need" list, in plain language. The most useful section here. */
  notNeeded: { label: string; why: string }[];
  openQuestions: string[];
  /** One alternative, named, with the reason it lost. More than one is noise. */
  alternative: { label: string; why: string } | null;
  /**
   * "Why this recommendation" — a deep link into the technology guide's
   * section for this exact class.
   *
   * The mapping lives in `@/lib/tech-stack/types` rather than here, so the
   * guide can be restructured without touching the recommender. The engine
   * stays language-free and knows nothing about that page; this is the one
   * seam between them.
   */
  whyThisHref: string;
  links: { label: string; href: string }[];
  /** Behind "view technical details". Product names live only here. */
  technical: { layer: string; status: string; choice: string | null; why: string }[];
};

export function present(rec: Recommendation, locale: Locale): PresentedRecommendation {
  const alt = rec.alternatives[0] ?? null;

  return {
    version: rec.version,
    headline: CLASS_LABELS[rec.classId][locale],
    summary: CLASS_SUMMARIES[rec.classId][locale],
    complexity: COMPLEXITY_LABELS[rec.complexity][locale],
    confidence: CONFIDENCE_LABELS[rec.confidence][locale],
    confidenceNote: CONFIDENCE_NOTES[rec.confidence][locale],

    reasons: rec.reasons.map((key) => REASON_LABELS[key]?.[locale]).filter((s): s is string => Boolean(s)),
    clientManages: rec.clientManages.map((key) => CLIENT_MANAGES_LABELS[key]?.[locale]).filter((s): s is string => Boolean(s)),
    studioHandles: rec.studioHandles.map((key) => STUDIO_HANDLES_LABELS[key]?.[locale]).filter((s): s is string => Boolean(s)),

    /* Plain-language layer names, not technical ones: "Storing information —
       not needed" is a sentence a business owner can act on. "Database — none"
       is one they have to translate first. */
    notNeeded: rec.components
      .filter((c) => c.status === "not_needed")
      .map((c) => ({
        label: LAYER_LABELS[c.layer][locale],
        why: REASON_LABELS[c.why]?.[locale] ?? "",
      }))
      .filter((c) => c.why),

    openQuestions: rec.openQuestions.map((key) => OPEN_QUESTION_LABELS[key]?.[locale]).filter((s): s is string => Boolean(s)),

    alternative: alt
      ? {
          label: CLASS_LABELS[alt.classId][locale],
          why: ALTERNATIVE_REASONS[alt.why]?.[locale] ?? "",
        }
      : null,

    whyThisHref: explanationHref(rec.classId, locale),

    links: rec.links.map((id) => ({
      label: EDUCATIONAL_LINKS[id].label[locale],
      href: EDUCATIONAL_LINKS[id].href[locale],
    })),

    technical: rec.components.map((c) => ({
      layer: LAYER_TECHNICAL_LABELS[c.layer][locale],
      status: STATUS_LABELS[c.status][locale],
      choice: c.choice ? (TECH_LABELS[c.choice]?.[locale] ?? c.choice) : null,
      why: REASON_LABELS[c.why]?.[locale] ?? "",
    })),
  };
}
