import { describe, expect, it } from "vitest";
import { REDIRECTS, REDIRECT_SOURCES } from "./redirects.mjs";
import { publishedGuides } from "./llms-txt-guides";

/**
 * Invariants for the redirect table.
 *
 * The expensive mistakes here are silent: a chain that costs a hop, a source
 * that is also a live page, or a sitemap that advertises a redirected URL.
 * None of those break a build.
 */
describe("redirect table", () => {
  it("has no duplicate sources", () => {
    const sources = REDIRECTS.map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("has no chains — a destination is never itself a source", () => {
    for (const redirect of REDIRECTS) {
      expect(
        REDIRECT_SOURCES.has(redirect.destination),
        `${redirect.source} → ${redirect.destination}, which is itself redirected`,
      ).toBe(false);
    }
  });

  it("never redirects a URL to itself", () => {
    for (const redirect of REDIRECTS) {
      expect(redirect.source).not.toBe(redirect.destination);
    }
  });

  it("uses absolute internal paths on both sides", () => {
    for (const redirect of REDIRECTS) {
      expect(redirect.source.startsWith("/")).toBe(true);
      expect(redirect.destination.startsWith("/")).toBe(true);
    }
  });

  it("is permanent throughout — these are consolidations, not experiments", () => {
    for (const redirect of REDIRECTS) {
      expect(redirect.permanent).toBe(true);
    }
  });

  it("never redirects a route the platform guides publish", () => {
    // A guide URL that is also a redirect source would be unreachable while
    // still being routed and listed by publishedGuides().
    for (const guide of publishedGuides("en")) {
      expect(REDIRECT_SOURCES.has(`/tools/llms-txt/${guide.slug}`)).toBe(false);
    }
    expect(REDIRECT_SOURCES.has("/tools")).toBe(false);
    expect(REDIRECT_SOURCES.has("/tools/llms-txt-generator")).toBe(false);
  });

  it("retires the merged AEO explainer into the surviving guide", () => {
    const merged = REDIRECTS.find(
      (r) => r.source === "/stillawake-times/what-is-aeo-answer-engine-optimization",
    );
    expect(merged).toBeDefined();
    expect(merged?.destination).toBe("/stillawake-times/what-is-generative-engine-optimization");
  });
});
