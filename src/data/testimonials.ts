/**
 * Client testimonials.
 *
 * THIS FILE IS DELIBERATELY EMPTY OF TESTIMONIALS.
 *
 * The site has never had social proof, and the temptation when building the
 * plumbing is to fill it with plausible-sounding placeholder quotes. Nothing
 * here is invented: a testimonial is added only after a real person has said
 * a real thing and given permission to publish it with their name attached.
 * Every surface that renders these degrades to showing nothing, so an empty
 * registry is a working state, not a broken one.
 *
 * ## Adding one
 *
 * 1. Get the quote in writing (email is fine — it is the evidence trail).
 * 2. Confirm they are happy to be named, with company and role.
 * 3. Set `permission: "granted"` and record `permissionEvidence` — where the
 *    approval lives, so a future question about it has an answer.
 * 4. `source` records where it came from. A `google-review` with a public
 *    `sourceUrl` is worth more than a private email, because a reader can
 *    check it.
 *
 * ## What this is NOT
 *
 * These do not become `Review` or `AggregateRating` structured data. Google's
 * rules only permit review markup for reviews collected independently and
 * displayed as such — self-selected quotes on your own marketing page do not
 * qualify, and marking them up is a manual-action risk. When real Google
 * reviews exist on a verified Business Profile, THOSE are what Google reads,
 * directly from the profile. No markup needed on our side.
 */

export type TestimonialSource =
  /** Public review on the Google Business Profile — the strongest kind. */
  | "google-review"
  /** Written directly to us. Verifiable by us, not by the reader. */
  | "email"
  /** Public post the client made themselves. */
  | "linkedin"
  /** Said during a project, written down and approved afterwards. */
  | "project-feedback";

export type Testimonial = {
  /** Stable key — used for React keys and for referencing in placements. */
  id: string;
  /** Real name. Never "A. Client" or an initial — an unnameable quote is not proof. */
  name: string;
  company: string;
  /** Only where the person actually holds a title worth stating. */
  role?: string;
  quote: string;
  /** Slug of the related case study, when one exists. */
  project?: string;
  source: TestimonialSource;
  /** Public URL backing the quote. Required for `google-review`. */
  sourceUrl?: string;
  /** ISO date the quote was given. */
  date: string;
  /**
   * Nothing renders unless this is "granted". "pending" means collected but
   * not yet cleared to publish — it stays in the file as a record, invisible.
   */
  permission: "granted" | "pending";
  /** Where the approval is recorded, e.g. "email 2026-08-20 from …". */
  permissionEvidence?: string;
  /**
   * Which surfaces may show this quote. Placing the same testimonial
   * everywhere reads as having exactly one happy client — which, when you
   * have one, is the impression to avoid creating.
   */
  placements: TestimonialPlacement[];
};

export type TestimonialPlacement =
  | "home"
  | "pricing"
  | "work"
  | "global"
  | "contact"
  | "service:shopify"
  | "service:seo"
  | "service:software"
  | "service:ai-automation"
  | "service:branding"
  | "service:web-design";

/** Real, permitted testimonials. Empty until someone has actually said something. */
export const TESTIMONIALS: Testimonial[] = [];

/** Publishable quotes for a surface, in file order. */
export function testimonialsFor(placement: TestimonialPlacement): Testimonial[] {
  return TESTIMONIALS.filter(
    (t) => t.permission === "granted" && t.placements.includes(placement),
  );
}

/** True when any surface has something to show. Useful for layout decisions. */
export const HAS_TESTIMONIALS = TESTIMONIALS.some((t) => t.permission === "granted");
