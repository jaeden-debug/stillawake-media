/**
 * Platform implementation guides for llms.txt.
 *
 * This is a programmatic content system, and the whole point of the schema is
 * that it makes a thin page *hard to build*. Adding `platform: "Wix"` to a list
 * must not be enough to put a URL in the sitemap.
 *
 * The rule every record has to satisfy is the one a reader would apply:
 *
 *   "What does this page tell me that would still be true if you swapped the
 *    platform name for another platform?"
 *
 * If the answer is "almost nothing", the record is thin. Validation below
 * enforces the mechanical part of that (required evidence, minimum counts,
 * primary sources, a verification procedure, a verified date). The editorial
 * part — that the facts are genuinely platform-specific — is enforced by
 * `assertDistinct` in the test suite, which fails when two guides share
 * boilerplate.
 *
 * A record that fails validation is not a build error in production: it is
 * simply not published. `publishedGuides()` is the only thing routing, the
 * sitemap and the index read from, so an incomplete draft can sit in the repo
 * without ever reaching Google.
 */

export type GuideStatus =
  /** Being written. Never routed, never indexed, never in the sitemap. */
  | "draft"
  /** Facts checked against primary documentation on `verifiedDate`. Publishable. */
  | "verified";

export type GuideStep = {
  title: string;
  /** What to do. Prose, not a fragment — this is the substance of the page. */
  body: string;
  /** Optional code/config, shown verbatim. */
  code?: { language: string; content: string; caption?: string };
};

export type Gotcha = {
  title: string;
  /** Why it bites, and what to do instead. */
  body: string;
};

export type GuideSource = {
  label: string;
  url: string;
  /**
   * Primary = the platform's own documentation or changelog. At least one
   * primary source is required; third-party sources may only supplement.
   */
  kind: "primary" | "secondary";
};

export type PlatformGuide = {
  slug: string;
  platform: string;
  locale: "en" | "fr";
  status: GuideStatus;

  primaryKeyword: string;
  secondaryKeywords: string[];

  title: string;
  description: string;
  /** One-paragraph answer to the query, above everything else. */
  intro: string;

  /**
   * The single most important line on the page: does this platform give you
   * an llms.txt already, and what does that mean for the reader?
   */
  supportStatus: {
    /** "native" | "plugin" | "manual" | "none" — how you get a file at all. */
    kind: "native" | "plugin" | "manual" | "none";
    /** Plain-language summary shown in the answer box. */
    summary: string;
  };

  /** Where the file actually comes from on this platform. */
  fileLocation: string;
  /** How it is implemented — template, rewrite rule, physical file, route. */
  implementationMethod: string;

  prerequisites: string[];
  steps: GuideStep[];
  /** A real example appropriate to this platform. */
  example: { caption: string; language: string; content: string };
  gotchas: Gotcha[];
  /** How the reader confirms it actually worked. */
  verificationMethod: GuideStep[];
  /** What this platform's approach cannot do. */
  limitations: string[];

  /** ISO date the platform facts were last checked against primary docs. */
  verifiedDate: string;
  sources: GuideSource[];

  /** Internal links out — paths only, resolved and checked by tests. */
  relatedServices: { label: string; href: string }[];
  relatedGuides: string[];
};

/** Minimum evidence for a guide to be worth a URL. Tuned to reject Mad-Libs. */
const MIN = {
  steps: 3,
  gotchas: 2,
  verificationSteps: 2,
  limitations: 2,
  prerequisites: 1,
  introChars: 220,
  exampleChars: 120,
  stepBodyChars: 90,
} as const;

export type ValidationResult = { ok: true } | { ok: false; errors: string[] };

/**
 * Mechanical quality gate.
 *
 * Deliberately strict about *evidence*, not about prose length. A guide can be
 * short and still pass, as long as it names a real mechanism, a real file
 * location, real gotchas, a way to verify, and a primary source.
 */
export function validateGuide(guide: PlatformGuide): ValidationResult {
  const errors: string[] = [];
  const need = (cond: boolean, msg: string) => {
    if (!cond) errors.push(`${guide.slug}: ${msg}`);
  };

  need(/^[a-z0-9-]+$/.test(guide.slug), "slug must be kebab-case");
  need(guide.title.trim().length > 0, "title is required");
  need(guide.description.trim().length > 0, "description is required");
  need(guide.primaryKeyword.trim().length > 0, "primaryKeyword is required");

  need(
    guide.intro.trim().length >= MIN.introChars,
    `intro must answer the query up front (>= ${MIN.introChars} chars)`,
  );
  need(guide.supportStatus.summary.trim().length > 0, "supportStatus.summary is required");
  need(guide.fileLocation.trim().length > 0, "fileLocation is required — where does the file live?");
  need(
    guide.implementationMethod.trim().length > 0,
    "implementationMethod is required — template, rewrite, physical file or route?",
  );

  need(guide.prerequisites.length >= MIN.prerequisites, `needs >= ${MIN.prerequisites} prerequisite`);
  need(guide.steps.length >= MIN.steps, `needs >= ${MIN.steps} implementation steps`);
  need(
    guide.steps.every((s) => s.body.trim().length >= MIN.stepBodyChars),
    `every step needs a real explanation (>= ${MIN.stepBodyChars} chars)`,
  );
  need(guide.gotchas.length >= MIN.gotchas, `needs >= ${MIN.gotchas} platform-specific gotchas`);
  need(
    guide.verificationMethod.length >= MIN.verificationSteps,
    `needs >= ${MIN.verificationSteps} verification steps`,
  );
  need(guide.limitations.length >= MIN.limitations, `needs >= ${MIN.limitations} stated limitations`);

  need(
    guide.example.content.trim().length >= MIN.exampleChars,
    `example must be substantive (>= ${MIN.exampleChars} chars)`,
  );

  need(
    /^\d{4}-\d{2}-\d{2}$/.test(guide.verifiedDate) && !Number.isNaN(Date.parse(guide.verifiedDate)),
    "verifiedDate must be an ISO date (YYYY-MM-DD)",
  );
  need(
    guide.sources.some((s) => s.kind === "primary"),
    "needs at least one primary source (the platform's own docs)",
  );
  need(
    guide.sources.every((s) => /^https:\/\//.test(s.url)),
    "every source needs an absolute https URL",
  );

  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}

/** A guide may be routed and indexed only if it is verified *and* complete. */
export function isPublishable(guide: PlatformGuide): boolean {
  return guide.status === "verified" && validateGuide(guide).ok;
}
