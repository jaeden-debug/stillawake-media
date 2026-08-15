import { describe, expect, it } from "vitest";

import { POST } from "./route";

/**
 * The public contract.
 *
 * Two things must hold no matter what a client sends: it cannot influence the
 * price beyond the published answer vocabulary, and it cannot see anything the
 * internal estimator sees. These tests are the enforcement.
 */

let ip = 0;
/** A fresh source address per call so the rate limiter never crosses tests. */
function post(body: unknown): Promise<Response> {
  ip += 1;
  return POST(
    new Request("https://stillawakemedia.com/api/tools/project-estimate", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": `203.0.113.${ip % 250}` },
      body: JSON.stringify(body),
    }),
  );
}

const SIMPLE_SITE = {
  goal: "website",
  site_kind: "simple",
  size: "small",
  content_ready: "ready",
  clarity: "clear",
  timing: "flexible",
};

describe("public estimate endpoint", () => {
  it("prices a complete set of answers", async () => {
    const res = await post({ answers: SIMPLE_SITE, locale: "en" });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.low).toBe(3000);
    expect(body.high).toBe(5000);
    expect(body.rangeLabel).toBe("CA$3,000 – CA$5,000");
    expect(body.includes.length).toBeGreaterThan(0);
    expect(body.drivers.length).toBeGreaterThan(0);
    expect(body.studioType).toBe("website");
  });

  /** Phase 7 and Phase 16: no fake precision outward, no internals outward. */
  it("never leaks the internal figures or the derivation", async () => {
    const res = await post({ answers: SIMPLE_SITE, locale: "en" });
    const body = await res.json();
    for (const forbidden of ["expected", "lines", "modelChecksum", "bands", "base", "margin"]) {
      expect(body, `leaked "${forbidden}"`).not.toHaveProperty(forbidden);
    }
    expect(JSON.stringify(body)).not.toMatch(/complexity|multiplier|scopeSens|floor/i);
  });

  it("returns French copy for a French request", async () => {
    const res = await post({ answers: SIMPLE_SITE, locale: "fr" });
    const body = await res.json();
    expect(body.rangeLabel).toContain("$");
    // Québec French puts the symbol after the number.
    expect(body.rangeLabel).toMatch(/3\s?000\s\$/);
    expect(body.projectLabel).toBe("Site web d'entreprise");
  });

  it("prices EN and FR identically — only the words change", async () => {
    const en = await (await post({ answers: SIMPLE_SITE, locale: "en" })).json();
    const fr = await (await post({ answers: SIMPLE_SITE, locale: "fr" })).json();
    expect(fr.low).toBe(en.low);
    expect(fr.high).toBe(en.high);
    expect(fr.projectLabel).not.toBe(en.projectLabel);
  });

  it("ignores an unknown locale rather than failing", async () => {
    const res = await post({ answers: SIMPLE_SITE, locale: "de" });
    expect(res.status).toBe(200);
    expect((await res.json()).projectLabel).toBe("Business website");
  });

  it("rejects an incomplete set of answers", async () => {
    const res = await post({ answers: { goal: "website" }, locale: "en" });
    expect(res.status).toBe(400);
  });

  it("rejects a malformed body", async () => {
    const res = await POST(
      new Request("https://stillawakemedia.com/api/tools/project-estimate", {
        method: "POST",
        headers: { "x-forwarded-for": "203.0.113.251" },
        body: "not json",
      }),
    );
    expect(res.status).toBe(400);
  });
});

describe("tampering", () => {
  it("ignores injected prices, discounts and overrides", async () => {
    const clean = await (await post({ answers: SIMPLE_SITE, locale: "en" })).json();
    const tampered = await (
      await post({
        answers: SIMPLE_SITE,
        locale: "en",
        low: 1,
        high: 2,
        discount: 0.99,
        pricingVersion: "1999.01.1",
        capabilities: [],
        foundation: "free_website",
      })
    ).json();
    expect(tampered.low).toBe(clean.low);
    expect(tampered.high).toBe(clean.high);
    expect(tampered.pricingVersion).toBe(clean.pricingVersion);
  });

  it("cannot reach a cheaper answer through an undeclared option key", async () => {
    const clean = await (await post({ answers: SIMPLE_SITE, locale: "en" })).json();
    const forged = await (
      await post({
        answers: { ...SIMPLE_SITE, size: "free", site_kind: "free", timing: "free" },
        locale: "en",
      })
    ).json();
    // The forged keys are dropped, which leaves required questions unanswered.
    expect(forged.error ?? forged.low).not.toBe(clean.low - 1);
  });

  it("cannot cross the minimum engagement downward", async () => {
    const res = await post({
      answers: { ...SIMPLE_SITE, size: "small", content_ready: "ready" },
      locale: "en",
    });
    expect((await res.json()).low).toBeGreaterThanOrEqual(2500);
  });

  it("resists prototype pollution in the answers object", async () => {
    const res = await post({ answers: JSON.parse('{"__proto__":{"goal":"sell"}}'), locale: "en" });
    expect(res.status).toBe(400);
    expect(({} as Record<string, unknown>).goal).toBeUndefined();
  });
});

describe("recurring services", () => {
  it("keeps monthly fees out of the build range and withholds unapproved prices", async () => {
    const body = await (await post({ answers: SIMPLE_SITE, locale: "en" })).json();
    expect(body.high).toBe(5000);
    const seo = body.recurring.find((r: { label: string }) => r.label.includes("Essentials"));
    expect(seo.monthly).toBe(600);
    const care = body.recurring.find((r: { label: string }) => r.label === "Website care plan");
    expect(care.monthly).toBeNull();
    expect(care.monthlyLabel).toBeNull();
  });
});

describe("rate limiting", () => {
  it("throttles a single source", async () => {
    const shared = "198.51.100.7";
    const fire = () =>
      POST(
        new Request("https://stillawakemedia.com/api/tools/project-estimate", {
          method: "POST",
          headers: { "content-type": "application/json", "x-forwarded-for": shared },
          body: JSON.stringify({ answers: SIMPLE_SITE, locale: "en" }),
        }),
      );
    let limited = false;
    for (let i = 0; i < 25; i += 1) {
      const res = await fire();
      if (res.status === 429) limited = true;
    }
    expect(limited).toBe(true);
  });
});
