import { describe, expect, it } from "vitest";
import {
  analyzePage,
  buildChecks,
  isAllowedByRobots,
  parseRobotsTxt,
  type SiteFacts,
} from "./analyze";

const URL_ = "https://example.com/services/";

const page = (html: string, extra: Partial<Parameters<typeof analyzePage>[0]> = {}) =>
  analyzePage({
    requestedUrl: URL_,
    finalUrl: URL_,
    status: 200,
    redirects: [],
    contentType: "text/html; charset=utf-8",
    xRobotsTag: null,
    html,
    ...extra,
  });

const okSite: SiteFacts = {
  robots: { status: 200, parsed: parseRobotsTxt("User-agent: *\nAllow: /") },
  sitemap: { url: "https://example.com/sitemap.xml", status: 200, isXml: true, listsPage: true },
};

const GOOD = `<!doctype html><html lang="en-CA"><head>
<title>Services | Example</title>
<meta name="description" content="What we do, who it's for and what it costs, in plain language for small businesses.">
<meta name="viewport" content="width=device-width">
<link rel="canonical" href="https://example.com/services">
<meta property="og:title" content="Services"><meta property="og:description" content="x"><meta property="og:image" content="/og.png">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebPage"},{"@type":"Service"}]}</script>
</head><body><h1>Our services</h1><h2>Design</h2><p>${"word ".repeat(300)}</p>
<img src="a.png" alt="A"><a href="/about">About</a></body></html>`;

describe("analyzePage", () => {
  it("reads the basics from a well-formed page", () => {
    const f = page(GOOD);
    expect(f.title).toBe("Services | Example");
    expect(f.lang).toBe("en-CA");
    expect(f.canonicals).toEqual(["https://example.com/services"]);
    expect(f.headings.map((h) => h.level)).toEqual([1, 2]);
    expect(f.jsonLd[0]).toEqual({ types: ["WebPage", "Service"], valid: true });
    expect(f.wordCount).toBeGreaterThan(300);
    expect(f.internalLinks).toBe(1);
  });

  it("does not count script text as content", () => {
    const f = page(`<html><body><script>var a = "${"x ".repeat(500)}";</script><p>Hi there</p></body></html>`);
    expect(f.wordCount).toBe(2);
  });

  it("decodes named, decimal and hex entities in the description", () => {
    const f = page(`<head><meta name="description" content="Don&#x27;t &amp; won&#39;t"></head>`);
    expect(f.description).toBe("Don't & won't");
  });

  it("flags broken JSON-LD instead of throwing", () => {
    const f = page(`<script type="application/ld+json">{"@type": "Organization",}</script>`);
    expect(f.jsonLd).toEqual([{ types: [], valid: false }]);
  });
});

describe("buildChecks", () => {
  const levels = (html: string, extra = {}, site = okSite) =>
    Object.fromEntries(buildChecks(page(html, extra), site).map((c) => [c.id, c.level]));

  it("passes a clean page, treating a trailing-slash canonical as self", () => {
    const l = levels(GOOD);
    expect(l.status).toBe("pass");
    expect(l.noindex).toBe("pass");
    expect(l.canonical).toBe("pass");
    expect(l.robots).toBe("pass");
    expect(l.sitemap).toBe("pass");
    expect(l.h1).toBe("pass");
    expect(l.jsonld).toBe("pass");
  });

  it("catches a noindex sent only as a header", () => {
    expect(levels(GOOD, { xRobotsTag: "noindex, nofollow" }).noindex).toBe("fail");
  });

  it("catches a noindex robots meta tag", () => {
    expect(levels(GOOD.replace("<title>", '<meta name="robots" content="noindex"><title>')).noindex).toBe("fail");
  });

  it("fails conflicting canonicals", () => {
    const html = GOOD.replace("</head>", '<link rel="canonical" href="https://example.com/other"></head>');
    expect(levels(html).canonical).toBe("fail");
  });

  it("warns on a redirect chain", () => {
    expect(levels(GOOD, { redirects: ["http://example.com/services", "https://www.example.com/services"] }).redirects).toBe("warn");
  });

  it("fails when robots.txt blocks the path", () => {
    const site: SiteFacts = { ...okSite, robots: { status: 200, parsed: parseRobotsTxt("User-agent: *\nDisallow: /services") } };
    expect(levels(GOOD, {}, site).robots).toBe("fail");
  });

  it("treats a 5xx robots.txt as a site-wide problem", () => {
    expect(levels(GOOD, {}, { ...okSite, robots: { status: 503, parsed: null } }).robots).toBe("fail");
  });
});

describe("robots.txt matching", () => {
  it("prefers the most specific user-agent group", () => {
    const r = parseRobotsTxt("User-agent: *\nDisallow: /\n\nUser-agent: Googlebot\nAllow: /");
    expect(isAllowedByRobots(r, "Googlebot", "/page")).toBe(true);
    expect(isAllowedByRobots(r, "OtherBot", "/page")).toBe(false);
  });

  it("uses the longest matching rule, and Allow wins a tie", () => {
    const r = parseRobotsTxt("User-agent: *\nDisallow: /shop\nAllow: /shop/public");
    expect(isAllowedByRobots(r, "Googlebot", "/shop/cart")).toBe(false);
    expect(isAllowedByRobots(r, "Googlebot", "/shop/public/item")).toBe(true);
    const tie = parseRobotsTxt("User-agent: *\nDisallow: /a\nAllow: /a");
    expect(isAllowedByRobots(tie, "Googlebot", "/a")).toBe(true);
  });

  it("supports * and $ wildcards", () => {
    const r = parseRobotsTxt("User-agent: *\nDisallow: /*.pdf$\nDisallow: /*?sort=");
    expect(isAllowedByRobots(r, "Googlebot", "/files/a.pdf")).toBe(false);
    expect(isAllowedByRobots(r, "Googlebot", "/files/a.pdf?x=1")).toBe(true);
    expect(isAllowedByRobots(r, "Googlebot", "/list?sort=price")).toBe(false);
  });

  it("ignores an empty Disallow and collects sitemaps", () => {
    const r = parseRobotsTxt("User-agent: *\nDisallow:\nSitemap: https://example.com/sitemap.xml");
    expect(isAllowedByRobots(r, "Googlebot", "/anything")).toBe(true);
    expect(r.sitemaps).toEqual(["https://example.com/sitemap.xml"]);
  });
});
