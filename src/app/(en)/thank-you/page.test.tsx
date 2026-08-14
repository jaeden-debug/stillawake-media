import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import ThankYou, { metadata } from "./page";

/**
 * The CMS half of the sitemap runs through Next's `unstable_cache`, which
 * needs a request context vitest has no way to provide. Stubbing it to empty
 * leaves the part this test is actually about: the hand-maintained static
 * route list, which is where /thank-you would appear if it ever leaked in.
 */
vi.mock("@/lib/cms/adapter", () => ({ getAllPublishedForSitemap: async () => [] }));

const { default: sitemap } = await import("../../sitemap");

/**
 * The thank-you page is the far end of a cross-domain funnel
 * (.com → stillawake.studio → .com/thank-you) and will carry Google Ads
 * conversion measurement. It therefore has to stay reachable, stay out of
 * the index, and stay inert — visiting it must never write anything.
 */

const html = renderToStaticMarkup(<ThankYou />);
const source = readFileSync(new URL("./page.tsx", import.meta.url), "utf8");

describe("/thank-you renders", () => {
  it("renders without throwing, so the route serves 200", () => {
    expect(html.length).toBeGreaterThan(0);
  });

  it("has exactly one h1", () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
  });

  it("confirms the submission and says not to submit again", () => {
    expect(html).toContain("Thanks — your project is in.");
    expect(html).toContain("Project received");
    expect(html).toContain("don&#x27;t need to submit the form again");
  });

  it("promises no response time we have not publicly committed to", () => {
    expect(html).not.toMatch(/\b(24|48|72)\s*(hours|hrs|h)\b/i);
    expect(html).not.toMatch(/within \d+ business days/i);
  });
});

describe("metadata", () => {
  it("does not repeat the brand the root title template already appends", () => {
    expect(String(metadata.title)).not.toMatch(/StillAwake Media/);
  });
});

describe("indexability", () => {
  it("is noindex", () => {
    expect(metadata.robots).toMatchObject({ index: false });
    expect((metadata.robots as { googleBot: { index: boolean } }).googleBot.index).toBe(false);
  });

  it("is nofollow", () => {
    expect(metadata.robots).toMatchObject({ follow: false });
    expect((metadata.robots as { googleBot: { follow: boolean } }).googleBot.follow).toBe(false);
  });

  it("adds no structured data — it is transactional, not an entity", () => {
    expect(html).not.toContain("application/ld+json");
    expect(source).not.toMatch(/PageSchema|JsonLd|schema\.org/);
  });
});

describe("sitemap", () => {
  it("does not list /thank-you", async () => {
    const entries = await sitemap();
    expect(entries.length).toBeGreaterThan(0); // guard: an empty sitemap would pass vacuously
    expect(entries.map((e) => e.url)).not.toContain("https://stillawakemedia.com/thank-you");
    expect(entries.filter((e) => e.url.includes("thank-you"))).toHaveLength(0);
  });
});

describe("CTAs", () => {
  it("primary CTA points to the homepage", () => {
    expect(html).toMatch(/<a[^>]+href="\/"[^>]*>Back to StillAwake Media<\/a>/);
  });

  it("secondary CTA points to the StillAwake Times hub", () => {
    expect(html).toMatch(/<a[^>]+href="\/stillawake-times"[^>]*>Read StillAwake Times<\/a>/);
  });

  it("does not send the visitor back into Studio", () => {
    expect(html).not.toContain("stillawake.studio");
  });

  it("CTAs are semantic links with visible focus states", () => {
    expect(html.match(/<a\s/g)).toHaveLength(2);
    expect(html).toContain("focus-visible:outline");
  });
});

describe("inertness", () => {
  it("visiting the page performs no API call or mutation", () => {
    expect(source).not.toMatch(/\bfetch\(|useEffect|createClient|supabase|recordSubmission/);
    expect(source).not.toMatch(/"use client"|'use client'/);
    expect(source).not.toMatch(/<form|method="post"/i);
  });
});
