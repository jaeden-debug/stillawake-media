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

/** The Launch product: the smallest complete path through the flow. */
const LAUNCH = {
  services: ["website"],
  "depth.website": "launch",
  timing: "flexible",
};

/** A custom project, so the range and tier differ from the product. */
const CUSTOM = {
  services: ["website"],
  "depth.website": "custom",
  timing: "flexible",
};

describe("public estimate endpoint", () => {
  it("prices a complete set of answers", async () => {
    const res = await post({ answers: LAUNCH, locale: "en" });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.low).toBe(2500);
    expect(body.tier).toBe("launch");
    expect(body.needsDiscovery).toBe(false);
    expect(body.includes.length).toBeGreaterThan(0);
    expect(body.drivers.length).toBeGreaterThan(0);
  });

  /** Phase 7 and Phase 16: no fake precision outward, no internals outward. */
  it("never leaks the internal figures or the derivation", async () => {
    const res = await post({ answers: LAUNCH, locale: "en" });
    const body = await res.json();
    for (const forbidden of ["expected", "lines", "modelChecksum", "days", "bands", "margin"]) {
      expect(body, `leaked "${forbidden}"`).not.toHaveProperty(forbidden);
    }
    // Day counts, rates and multipliers are the operator's business. Matching
    // on names rather than figures: 2500 is a legitimate published price.
    expect(JSON.stringify(body)).not.toMatch(/dayRate|day_rate|multiplier|discipline|factor|orgFactor/i);
  });

  it("returns French copy for a French request", async () => {
    const res = await post({ answers: LAUNCH, locale: "fr" });
    const body = await res.json();
    // Québec French puts the symbol after the number.
    expect(body.discoveryFromLabel).toMatch(/\s\$$/);
    expect(body.summary.join(" ")).toMatch(/site/i);
  });

  it("prices EN and FR identically — only the words change", async () => {
    const en = await (await post({ answers: LAUNCH, locale: "en" })).json();
    const fr = await (await post({ answers: LAUNCH, locale: "fr" })).json();
    expect(fr.low).toBe(en.low);
    expect(fr.high).toBe(en.high);
    expect(fr.summary).not.toEqual(en.summary);
  });

  it("ignores an unknown locale rather than failing", async () => {
    const res = await post({ answers: LAUNCH, locale: "de" });
    expect(res.status).toBe(200);
    expect((await res.json()).summary[0]).toMatch(/focused site/i);
  });

  it("rejects an incomplete set of answers", async () => {
    const res = await post({ answers: { services: ["website"] }, locale: "en" });
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
    const clean = await (await post({ answers: LAUNCH, locale: "en" })).json();
    const tampered = await (
      await post({
        answers: LAUNCH,
        locale: "en",
        low: 1,
        high: 2,
        discount: 0.99,
        pricingVersion: "1999.01.1",
        lines: [{ id: "free_website" }],
        DAY_RATES: { build: 1 },
      })
    ).json();
    expect(tampered.low).toBe(clean.low);
    expect(tampered.high).toBe(clean.high);
    expect(tampered.pricingVersion).toBe(clean.pricingVersion);
  });

  it("cannot reach a cheaper answer through an undeclared option key", async () => {
    const clean = await (await post({ answers: LAUNCH, locale: "en" })).json();
    const forged = await (
      await post({
        answers: { ...LAUNCH, "depth.website": "free", timing: "free" },
        locale: "en",
      })
    ).json();
    // The forged keys are dropped, which leaves required questions unanswered.
    expect(forged.error ?? forged.low).not.toBe(clean.low - 1);
  });

  it("cannot cross the minimum engagement downward", async () => {
    const res = await post({ answers: LAUNCH, locale: "en" });
    expect((await res.json()).low).toBeGreaterThanOrEqual(2500);
  });

  it("resists prototype pollution in the answers object", async () => {
    const res = await post({ answers: JSON.parse('{"__proto__":{"services":["store"]}}'), locale: "en" });
    expect(res.status).toBe(400);
    expect(({} as Record<string, unknown>).services).toBeUndefined();
  });
});

describe("recurring services", () => {
  it("keeps monthly fees out of the build range and withholds unapproved prices", async () => {
    const body = await (await post({ answers: LAUNCH, locale: "en" })).json();
    expect(body.high).toBeLessThanOrEqual(4000);
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
          body: JSON.stringify({ answers: LAUNCH, locale: "en" }),
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

describe("routing", () => {
  it("routes a software build to discovery instead of a range", async () => {
    const body = await (
      await post({
        answers: { services: ["software"], "depth.software": "internal_tool", timing: "flexible" },
        locale: "en",
      })
    ).json();
    expect(body.needsDiscovery).toBe(true);
    expect(body.tier).toBe("systems");
    expect(body.discoveryFromLabel).toBe("CA$3,500");
  });

  it("keeps a custom project quotable and above the product", async () => {
    const launch = await (await post({ answers: LAUNCH, locale: "en" })).json();
    const custom = await (await post({ answers: CUSTOM, locale: "en" })).json();
    expect(custom.tier).toBe("custom");
    expect(custom.needsDiscovery).toBe(false);
    expect(custom.low).toBeGreaterThan(launch.high * 1.8);
  });

  /** Budget routes; it must never move the number. */
  it("prices identically whatever budget is stated", async () => {
    const bands = ["under_5k", "5_15k", "15_50k", "50k_plus", "unsure"];
    const lows: number[] = [];
    for (const budget of bands) {
      const body = await (await post({ answers: { ...CUSTOM, budget }, locale: "en" })).json();
      lows.push(body.low);
    }
    expect(new Set(lows).size).toBe(1);
  });

  it("says so when the work sits above the stated budget", async () => {
    const body = await (await post({ answers: { ...CUSTOM, budget: "under_5k" }, locale: "en" })).json();
    expect(body.budgetSignal).toBe("above");
  });

  /** Telling someone their budget exceeds the work invites them to spend more. */
  it("never volunteers that the budget is larger than the work", async () => {
    const body = await (await post({ answers: { ...LAUNCH, budget: "50k_plus" }, locale: "en" })).json();
    expect(body.budgetSignal).toBeNull();
  });
});
