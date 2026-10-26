import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { allGuides, publishedGuides, getPublishedGuide } from "@/data/llms-txt-guides";
import { isPublishable, validateGuide, type PlatformGuide } from "./types";

/**
 * The quality gate, enforced.
 *
 * These tests exist because the failure mode of a programmatic content system
 * is not a crash — it is quietly publishing forty pages that say the same
 * thing with a different noun. The mechanical checks live in validateGuide;
 * the editorial one ("would this still be true for another platform?") is the
 * distinctiveness suite below.
 */

const published = publishedGuides("en");

function boilerplateRatio(a: string, b: string): number {
  const sentences = (s: string) =>
    new Set(
      s
        .toLowerCase()
        .split(/(?<=[.!?])\s+/)
        .map((x) => x.replace(/\s+/g, " ").trim())
        .filter((x) => x.length > 40),
    );
  const A = sentences(a);
  const B = sentences(b);
  if (A.size === 0 || B.size === 0) return 0;
  let shared = 0;
  for (const s of A) if (B.has(s)) shared++;
  return shared / Math.min(A.size, B.size);
}

/** Everything a reader would consider the substance of the page. */
function substance(guide: PlatformGuide): string {
  return [
    guide.intro,
    guide.supportStatus.summary,
    guide.fileLocation,
    guide.implementationMethod,
    ...guide.prerequisites,
    ...guide.steps.flatMap((s) => [s.title, s.body, s.code?.content ?? ""]),
    guide.example.content,
    ...guide.gotchas.flatMap((g) => [g.title, g.body]),
    ...guide.verificationMethod.flatMap((s) => [s.title, s.body, s.code?.content ?? ""]),
    ...guide.limitations,
  ].join("\n");
}

describe("platform guide schema", () => {
  it("has at least one publishable guide", () => {
    expect(published.length).toBeGreaterThan(0);
  });

  it.each(allGuides().map((g) => [g.slug, g] as const))(
    "%s satisfies the evidence schema",
    (_slug, guide) => {
      const result = validateGuide(guide);
      if (!result.ok) throw new Error(result.errors.join("\n"));
      expect(result.ok).toBe(true);
    },
  );

  it("never publishes a draft", () => {
    for (const guide of allGuides()) {
      if (guide.status !== "verified") expect(isPublishable(guide)).toBe(false);
    }
  });

  it("rejects a record that is complete but not yet verified", () => {
    const draft: PlatformGuide = { ...published[0], slug: "draft-platform", status: "draft" };
    expect(isPublishable(draft)).toBe(false);
  });

  it("rejects a thin record even when it is marked verified", () => {
    const thin: PlatformGuide = {
      ...published[0],
      slug: "thin-platform",
      status: "verified",
      intro: "You can add llms.txt to this platform.",
      steps: [],
      gotchas: [],
      sources: [],
    };
    expect(isPublishable(thin)).toBe(false);
    const result = validateGuide(thin);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.join(" ")).toMatch(/implementation steps/);
      expect(result.errors.join(" ")).toMatch(/primary source/);
    }
  });
});

describe("platform guides are genuinely platform-specific", () => {
  const pairs = published.flatMap((a, i) => published.slice(i + 1).map((b) => [a, b] as const));

  it.each(pairs.map(([a, b]) => [`${a.slug} vs ${b.slug}`, a, b] as const))(
    "%s do not share boilerplate",
    (_label, a, b) => {
      // Any shared long sentence between two guides is a template leaking
      // through. A small amount is tolerable (shared caveats about llms.txt
      // being a proposal); anything above this is Mad-Libs.
      expect(boilerplateRatio(substance(a), substance(b))).toBeLessThan(0.15);
    },
  );

  it.each(published.map((g) => [g.slug, g] as const))(
    "%s names its own platform in the substance of the page",
    (_slug, guide) => {
      const body = substance(guide).toLowerCase();
      const platform = guide.platform.toLowerCase();
      // A guide that never names the platform outside the title is describing
      // llms.txt in general, not llms.txt on this platform.
      const mentions = body.split(platform).length - 1;
      expect(mentions).toBeGreaterThanOrEqual(3);
    },
  );

  it.each(published.map((g) => [g.slug, g] as const))(
    "%s has a file location and mechanism unique to it",
    (_slug, guide) => {
      const others = published.filter((g) => g.slug !== guide.slug);
      for (const other of others) {
        expect(guide.fileLocation).not.toBe(other.fileLocation);
        expect(guide.implementationMethod).not.toBe(other.implementationMethod);
        expect(guide.example.content).not.toBe(other.example.content);
      }
    },
  );
});

describe("routing and metadata", () => {
  it("resolves every published slug and nothing else", () => {
    for (const guide of published) {
      expect(getPublishedGuide(guide.slug, "en")).not.toBeNull();
    }
    expect(getPublishedGuide("wix", "en")).toBeNull();
    expect(getPublishedGuide("../../etc/passwd", "en")).toBeNull();
  });

  it("gives every guide a unique title and description", () => {
    const titles = published.map((g) => g.title);
    const descriptions = published.map((g) => g.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("keeps every primary keyword distinct", () => {
    const keywords = published.map((g) => g.primaryKeyword);
    expect(new Set(keywords).size).toBe(keywords.length);
  });

  it("only links to commercial pages that actually exist", () => {
    // Checked against the filesystem rather than a registry: the registry is
    // partial, and the thing worth catching is a guide linking to a route
    // nobody ever built.
    for (const guide of published) {
      for (const service of guide.relatedServices) {
        const route = service.href.replace(/^\//, "");
        const page = join(process.cwd(), "src/app/(en)", route, "page.tsx");
        expect(existsSync(page), `${guide.slug} links to ${service.href}, which has no page.tsx`).toBe(
          true,
        );
      }
    }
  });

  it("only cross-links to guides that are themselves published", () => {
    const slugs = new Set(published.map((g) => g.slug));
    for (const guide of published) {
      for (const related of guide.relatedGuides) {
        expect(slugs.has(related)).toBe(true);
        expect(related).not.toBe(guide.slug);
      }
    }
  });

  it("verified dates are real and not in the future", () => {
    const now = Date.now();
    for (const guide of published) {
      const t = Date.parse(guide.verifiedDate);
      expect(Number.isNaN(t)).toBe(false);
      expect(t).toBeLessThanOrEqual(now);
    }
  });
});
