import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { GUIDES } from "./index";
import { evaluate } from "./engine";
import type { GuideContent, InternalLink, SiteTypeId } from "./types";
import { getAllPosts } from "@/lib/content";
import { REDIRECT_SOURCES } from "@/data/redirects.mjs";

/**
 * What this file protects.
 *
 * 1. The two guides stay structurally identical while being written
 *    independently. French is not a translation here, so the only thing
 *    keeping the checklist honest in both languages is that the ids match.
 * 2. Every internal link points at a route that exists and is not redirected.
 *    A planning guide's entire value is being trustworthy; a 404 in it is
 *    worse than a missing link.
 * 3. The finder can still say "you need less than you think". A recommender
 *    that only ever adds capability is a sales form, and the test asserts the
 *    smallest possible answer still comes out small.
 */

const locales = ["en", "fr"] as const;
const repoRoot = join(__dirname, "..", "..", "..");

/** Routes rendered by a file in the app router, as "/path" with no trailing slash. */
function routeExists(path: string): boolean {
  const clean = path.replace(/#.*$/, "").replace(/\/$/, "") || "/";

  /* Articles live in the content tree rather than as route files. */
  const article = clean.match(/^\/stillawake-times\/(.+)$/);
  if (article) return getAllPosts().some((post) => post.slug === article[1]);
  const articleFr = clean.match(/^\/fr\/articles\/(.+)$/);
  if (articleFr) return getAllPosts("fr").some((post) => post.slug === articleFr[1]);

  const segments = clean === "/" ? [] : clean.slice(1).split("/");
  const group = segments[0] === "fr" ? "(fr)" : "(en)";
  return existsSync(join(repoRoot, "src", "app", group, ...segments, "page.tsx"));
}

function allLinks(content: GuideContent): InternalLink[] {
  return [
    content.flow.handoff,
    ...content.next.links,
    ...content.types.items.flatMap((type) => type.links ?? []),
    ...content.scenarios.items.flatMap((scenario) => scenario.links ?? []),
  ];
}

describe("website setup guide", () => {
  it.each(locales)("%s declares its own path and its counterpart", (locale) => {
    const content = GUIDES[locale];
    const other = GUIDES[locale === "en" ? "fr" : "en"];
    expect(content.path).toBe(other.otherPath);
    expect(content.otherPath).toBe(other.path);
    expect(routeExists(content.path), `${content.path} has no page`).toBe(true);
  });

  it("keeps both locales structurally identical", () => {
    const [en, fr] = [GUIDES.en, GUIDES.fr];
    const ids = (c: GuideContent) => c.finder.questions.map((q) => q.id);
    expect(ids(fr)).toEqual(ids(en));
    expect(fr.types.items.map((t) => t.id)).toEqual(en.types.items.map((t) => t.id));
    expect(fr.scenarios.items.map((s) => s.id)).toEqual(en.scenarios.items.map((s) => s.id));
    expect(fr.finder.groups.map((g) => g.id)).toEqual(en.finder.groups.map((g) => g.id));
    expect(fr.control.rows.map((r) => r.owner)).toEqual(en.control.rows.map((r) => r.owner));
    expect(fr.flow.steps).toHaveLength(en.flow.steps.length);
    expect(fr.cms.options).toHaveLength(en.cms.options.length);
    expect(fr.faqs).toHaveLength(en.faqs.length);
  });

  it.each(locales)("%s scores every question against a declared shape", (locale) => {
    const content = GUIDES[locale];
    const shapes = new Set<SiteTypeId>(content.types.items.map((t) => t.id));
    const groups = new Set(content.finder.groups.map((g) => g.id));
    const seen = new Set<string>();

    for (const question of content.finder.questions) {
      expect(seen.has(question.id), `duplicate question id ${question.id}`).toBe(false);
      seen.add(question.id);
      expect(groups.has(question.group), `${question.id} is in an undeclared group`).toBe(true);
      expect(question.implies.length, `${question.id} implies nothing`).toBeGreaterThan(0);
      for (const shape of question.implies) {
        expect(shapes.has(shape), `${question.id} implies unknown shape ${shape}`).toBe(true);
      }
    }

    /* Every shape has to be reachable, or the card is decoration. */
    for (const shape of shapes) {
      const reachable = content.finder.questions.some((q) => q.implies.includes(shape));
      expect(reachable, `no question can produce ${shape}`).toBe(true);
    }
  });

  it.each(locales)("%s links only to routes that exist and are not redirected", (locale) => {
    for (const link of allLinks(GUIDES[locale])) {
      const path = link.href.replace(/\/$/, "") || "/";
      expect(REDIRECT_SOURCES.has(path), `${link.href} is a redirect source`).toBe(false);
      expect(routeExists(link.href), `${link.href} does not resolve to a page`).toBe(true);
    }
  });

  it.each(locales)("%s keeps the FAQ answers quotable and self-contained", (locale) => {
    for (const faq of GUIDES[locale].faqs) {
      /* Answer engines quote these near-verbatim, so a fragment that only
         makes sense beside the question is a liability rather than an asset. */
      expect(faq.a.length, `"${faq.q}" is too short to stand alone`).toBeGreaterThan(220);
      expect(faq.q.endsWith("?") || faq.q.endsWith("?")).toBe(true);
    }
  });
});

describe("requirement finder engine", () => {
  const questions = GUIDES.en.finder.questions;

  it("returns nothing when nothing is selected", () => {
    const result = evaluate(questions, []);
    expect(result.primary).toBeNull();
    expect(result.secondary).toEqual([]);
    expect(result.weight).toBe(0);
    expect(result.band).toBe("single");
    expect(result.cms).toBe("none");
  });

  it("can still answer 'you need less than you think'", () => {
    /* The smallest honest answer has to survive the machinery: someone who
       only needs to look legitimate must not be sold a system. */
    const result = evaluate(questions, ["credibility"]);
    expect(result.primary).toBe("brochure");
    expect(result.secondary).toEqual([]);
    expect(result.band).toBe("single");
    expect(result.cms).toBe("none");
  });

  it("reads a services business as lead generation, not commerce", () => {
    const result = evaluate(questions, ["credibility", "leads", "crm"]);
    expect(result.primary).toBe("lead-gen");
    expect(result.band).toBe("single");
  });

  it("names the second product when the answers describe two", () => {
    const result = evaluate(questions, [
      "leads",
      "organic",
      "accounts",
      "client-area",
      "integrations",
    ]);
    expect(result.primary).toBe("portal");
    expect(result.secondary).toContain("lead-gen");
    expect(result.band).toBe("two-products");
  });

  it("does not name a second product on the strength of one answer", () => {
    /* "Visitors need to log in" is legitimately true of a membership site, a
       portal and a SaaS product. Listing all three off one tick reads as an
       upsell rather than a reading of the answers. */
    const result = evaluate(questions, ["accounts"]);
    expect(result.ranked.map((r) => r.id)).toEqual(
      expect.arrayContaining(["membership", "portal", "saas"]),
    );
    expect(result.secondary).toEqual([]);
  });

  it("escalates to discovery rather than pretending to price a platform", () => {
    const result = evaluate(questions, [
      "leads",
      "organic",
      "products",
      "inventory",
      "payments",
      "accounts",
      "client-area",
      "software",
      "integrations",
      "automation",
    ]);
    expect(result.band).toBe("software");
  });

  it("surfaces the obligations that come attached", () => {
    const result = evaluate(questions, ["accounts", "payments"]);
    expect(result.duties).toHaveLength(2);
    expect(result.duties.every((d) => d.length > 40)).toBe(true);
  });

  it("flags the contradiction between neglect and capability", () => {
    expect(evaluate(questions, ["neglect", "credibility"]).conflict).toBe(false);
    expect(
      evaluate(questions, ["neglect", "products", "inventory", "accounts"]).conflict,
    ).toBe(true);
  });

  it("does not let a constraint add weight or pick a shape on its own", () => {
    const withNeglect = evaluate(questions, ["leads", "neglect"]);
    const without = evaluate(questions, ["leads"]);
    expect(withNeglect.weight).toBe(without.weight);
    expect(withNeglect.primary).toBe(without.primary);
  });

  it("is deterministic regardless of selection order", () => {
    const a = evaluate(questions, ["organic", "leads", "structured"]);
    const b = evaluate(questions, ["structured", "leads", "organic"]);
    expect(b).toEqual(a);
  });

  it("takes the strongest content signal, not the last one", () => {
    expect(evaluate(questions, ["who-edits", "approvals"]).cms).toBe("structured");
    expect(evaluate(questions, ["approvals", "who-edits"]).cms).toBe("structured");
    expect(evaluate(questions, ["who-edits"]).cms).toBe("light");
  });
});
