import { describe, it, expect } from "vitest";
import { assertSafeUrl, UnsafeUrlError } from "./safe-fetch";
import {
  analyzeEntity,
  buildFindings,
  extractJsonLd,
  extractTitle,
  extractDescription,
  renderLlmsTxt,
} from "./analyze";

/**
 * The SSRF tests matter more than the rest of this file put together.
 * This endpoint fetches whatever a stranger types, from inside our
 * infrastructure. A regression here is a proxy into the private network,
 * not a cosmetic bug — so the blocked ranges are asserted individually
 * rather than through one representative case.
 */
describe("assertSafeUrl", () => {
  const blocked = [
    ["loopback v4", "http://127.0.0.1/"],
    ["loopback name", "http://localhost/"],
    ["localhost subdomain", "http://foo.localhost/"],
    ["private 10/8", "http://10.0.0.5/"],
    ["private 172.16/12", "http://172.16.4.4/"],
    ["private 192.168/16", "http://192.168.1.1/"],
    ["link-local / cloud metadata", "http://169.254.169.254/latest/meta-data/"],
    ["carrier-grade NAT", "http://100.64.1.1/"],
    ["this-network", "http://0.0.0.0/"],
    ["multicast", "http://224.0.0.1/"],
    ["IPv6 loopback", "http://[::1]/"],
    ["IPv6 link-local", "http://[fe80::1]/"],
    ["IPv6 unique-local", "http://[fd00::1]/"],
    ["IPv4-mapped IPv6 loopback", "http://[::ffff:127.0.0.1]/"],
    ["internal TLD", "http://service.internal/"],
  ] as const;

  it.each(blocked)("rejects %s", async (_label, url) => {
    await expect(assertSafeUrl(url)).rejects.toBeInstanceOf(UnsafeUrlError);
  });

  it("rejects non-http protocols", async () => {
    await expect(assertSafeUrl("file:///etc/passwd")).rejects.toBeInstanceOf(UnsafeUrlError);
    await expect(assertSafeUrl("gopher://x/")).rejects.toBeInstanceOf(UnsafeUrlError);
  });

  it("rejects embedded credentials", async () => {
    await expect(assertSafeUrl("http://user:pass@example.com/")).rejects.toBeInstanceOf(
      UnsafeUrlError,
    );
  });

  it("rejects malformed input", async () => {
    await expect(assertSafeUrl("not a url")).rejects.toBeInstanceOf(UnsafeUrlError);
  });
});

describe("html extraction", () => {
  it("pulls title and description", () => {
    const html = `<html><head><title>  Acme  Ltd </title>
      <meta name="description" content="We make anvils."></head></html>`;
    expect(extractTitle(html)).toBe("Acme Ltd");
    expect(extractDescription(html)).toBe("We make anvils.");
  });

  it("flattens @graph and bare arrays", () => {
    const html = `
      <script type="application/ld+json">{"@graph":[{"@type":"Organization","name":"A"},{"@type":"Person","name":"B"}]}</script>
      <script type="application/ld+json">[{"@type":"WebSite","name":"C"}]</script>`;
    const nodes = extractJsonLd(html);
    expect(nodes.map((n) => n.name)).toEqual(["A", "B", "C"]);
  });

  it("survives a malformed block without losing the good ones", () => {
    const html = `
      <script type="application/ld+json">{ this is not json }</script>
      <script type="application/ld+json">{"@type":"Organization","name":"Fine"}</script>`;
    expect(extractJsonLd(html).map((n) => n.name)).toEqual(["Fine"]);
  });
});

describe("analyzeEntity", () => {
  const rich = `<html lang="en-CA"><head><title>Acme</title>
    <link rel="alternate" hreflang="fr-CA" href="/fr">
    <script type="application/ld+json">{"@graph":[
      {"@type":["Organization","ProfessionalService"],"name":"Acme Ltd",
       "description":"Anvils since 1949","founder":{"name":"W. Coyote"},
       "sameAs":["https://linkedin.com/company/acme"],
       "areaServed":["Canada","United States"]}]}</script>
    </head><body><a href="/contact">Contact</a><p>From $250 CAD</p></body></html>`;

  it("reads the entity facts out of structured data", () => {
    const f = analyzeEntity(rich, rich, { hasExistingLlmsTxt: false });
    expect(f.organizationName).toBe("Acme Ltd");
    expect(f.founder).toBe("W. Coyote");
    expect(f.areaServed).toEqual(["Canada", "United States"]);
    expect(f.sameAs).toHaveLength(1);
    expect(f.hasPricingSignal).toBe(true);
    expect(f.hasContactSignal).toBe(true);
    expect(f.languages).toContain("fr-ca");
  });

  it("does not claim a pricing signal that is not there", () => {
    const bare = `<html><head><title>X</title></head><body>Call us for a quote.</body></html>`;
    const f = analyzeEntity(bare, bare, { hasExistingLlmsTxt: false });
    expect(f.hasPricingSignal).toBe(false);
    expect(f.organizationName).toBeNull();
  });
});

describe("buildFindings", () => {
  it("scores a site with nothing at the bottom and flags the fatal gaps", () => {
    const { findings, score } = buildFindings({
      organizationName: null,
      organizationType: null,
      description: null,
      founder: null,
      sameAs: [],
      areaServed: [],
      hasPricingSignal: false,
      hasContactSignal: false,
      languages: [],
      hasExistingLlmsTxt: false,
      schemaTypes: [],
    });
    expect(score).toBe(0);
    // Missing identity and missing description are failures, not warnings —
    // everything else is recoverable, those two are disqualifying.
    expect(findings.filter((f) => f.level === "fail")).toHaveLength(2);
  });

  it("scores a complete site at 100", () => {
    const { score } = buildFindings({
      organizationName: "Acme",
      organizationType: "Organization",
      description: "Anvils",
      founder: "W. Coyote",
      sameAs: ["https://example.com"],
      areaServed: ["Canada"],
      hasPricingSignal: true,
      hasContactSignal: true,
      languages: ["en"],
      hasExistingLlmsTxt: true,
      schemaTypes: ["Organization"],
    });
    expect(score).toBe(100);
  });

  it("every finding explains why it matters", () => {
    const { findings } = buildFindings({
      organizationName: "Acme", organizationType: "Organization", description: "d",
      founder: null, sameAs: [], areaServed: [], hasPricingSignal: false,
      hasContactSignal: false, languages: [], hasExistingLlmsTxt: false, schemaTypes: [],
    });
    for (const f of findings) expect(f.why.length).toBeGreaterThan(30);
  });
});

describe("renderLlmsTxt", () => {
  it("renders the entity facts and pages", () => {
    const out = renderLlmsTxt(
      "acme.com",
      {
        organizationName: "Acme Ltd", organizationType: "Organization",
        description: "Anvils since 1949", founder: "W. Coyote",
        sameAs: ["https://linkedin.com/company/acme"], areaServed: ["Canada"],
        hasPricingSignal: true, hasContactSignal: true, languages: ["en-ca"],
        hasExistingLlmsTxt: false, schemaTypes: [],
      },
      [{ url: "https://acme.com/anvils", title: "Anvils", description: "Heavy." }],
    );
    expect(out).toContain("# Acme Ltd");
    expect(out).toContain("> Anvils since 1949");
    expect(out).toContain("Founder: W. Coyote.");
    expect(out).toContain("[Anvils](https://acme.com/anvils): Heavy.");
  });

  it("falls back to the domain when no organization was found", () => {
    const out = renderLlmsTxt("acme.com", {
      organizationName: null, organizationType: null, description: null, founder: null,
      sameAs: [], areaServed: [], hasPricingSignal: false, hasContactSignal: false,
      languages: [], hasExistingLlmsTxt: false, schemaTypes: [],
    }, []);
    expect(out).toContain("# acme.com");
  });
});

/**
 * Regression guard for a bypass the first implementation had.
 * The URL parser rewrites `::ffff:127.0.0.1` to `::ffff:7f00:1`, so a check
 * that only matched the dotted spelling let loopback through.
 */
describe("IPv4-mapped IPv6 in hex form", () => {
  const cases = [
    "http://[::ffff:7f00:1]/",      // 127.0.0.1
    "http://[::ffff:a00:1]/",       // 10.0.0.1
    "http://[::ffff:a9fe:a9fe]/",   // 169.254.169.254 — cloud metadata
    "http://[::ffff:c0a8:1]/",      // 192.168.0.1
    "http://[0:0:0:0:0:ffff:7f00:1]/", // fully expanded loopback
  ];
  it.each(cases)("rejects %s", async (url) => {
    await expect(assertSafeUrl(url)).rejects.toBeInstanceOf(UnsafeUrlError);
  });
});

/**
 * Both of these were found by running the tool against our own site.
 * They are the kind of bug that only shows up on a real page.
 */
describe("regressions found by dogfooding", () => {
  it("resolves a founder declared as an @id reference", () => {
    // The correct way to model a shared entity, and the first version
    // reported "no founder" for sites that did it properly.
    const html = `<html><head><script type="application/ld+json">{"@graph":[
      {"@type":"Organization","name":"Acme","founder":{"@id":"https://acme.com/founder#person"}},
      {"@type":"Person","@id":"https://acme.com/founder#person","name":"W. Coyote"}]}</script></head></html>`;
    expect(analyzeEntity(html, html, { hasExistingLlmsTxt: false }).founder).toBe("W. Coyote");
  });

  it("credits an @id reference whose node lives on another page", () => {
    const html = `<html><head><script type="application/ld+json">{
      "@type":"Organization","name":"Acme","founder":{"@id":"https://acme.com/founder#person"}
    }</script></head></html>`;
    expect(analyzeEntity(html, html, { hasExistingLlmsTxt: false }).founder).toBeTruthy();
  });

  it("decodes HTML entities in titles", () => {
    expect(extractTitle("<title>Web &amp; SEO &#39;26</title>")).toBe("Web & SEO '26");
  });
});
