import { describe, expect, it } from "vitest";

import { PricingInputError, estimate, validateInput } from "./engine";
import { CAPABILITIES, FOUNDATIONS, GLOBAL_MINIMUM, PRICING_VERSION, SCOPE_FACTORS } from "./model";
import type { Complexity, EstimateInput, FoundationId } from "./types";

const input = (over: Partial<EstimateInput> & Pick<EstimateInput, "foundation">): EstimateInput => ({
  scope: "small",
  bilingual: false,
  capabilities: [],
  ...over,
});

describe("input validation", () => {
  it("rejects a foundation the model does not define", () => {
    expect(() => validateInput({ foundation: "free_website", scope: "small" })).toThrow(PricingInputError);
  });

  it("rejects a capability the model does not define", () => {
    expect(() =>
      validateInput({ foundation: "marketing_site", scope: "small", capabilities: [{ id: "free_stuff" }] }),
    ).toThrow(PricingInputError);
  });

  it("rejects a tier the capability does not offer", () => {
    // `blog_system` deliberately stops at moderate — asking for "complex"
    // must fail rather than silently fall back to the cheapest tier.
    expect(() =>
      validateInput({
        foundation: "marketing_site",
        scope: "small",
        capabilities: [{ id: "blog_system", complexity: "complex" }],
      }),
    ).toThrow(PricingInputError);
  });

  it("rejects a scope size the model does not define", () => {
    expect(() => validateInput({ foundation: "marketing_site", scope: "free" })).toThrow(PricingInputError);
  });

  /** The tamper case that matters: a client cannot smuggle prices in. */
  it("ignores injected pricing fields entirely", () => {
    const clean = validateInput({
      foundation: "marketing_site",
      scope: "small",
      capabilities: [{ id: "cms", complexity: "standard", price: 1, band: { low: 0, high: 0 } }],
      low: 1,
      high: 2,
      discount: 0.9,
      pricingVersion: "1999.01.1",
      __proto__: { evil: true },
    });
    expect(clean).toEqual({
      foundation: "marketing_site",
      scope: "small",
      bilingual: false,
      capabilities: [{ id: "cms", complexity: "standard" }],
      undefinedScope: false,
      rush: false,
    });
    const e = estimate(clean);
    expect(e.low).toBeGreaterThanOrEqual(FOUNDATIONS.marketing_site.floor);
    expect(e.pricingVersion).toBe(PRICING_VERSION);
  });

  it("cannot be reached through prototype pollution", () => {
    expect(() => validateInput({ foundation: "constructor", scope: "small" })).toThrow(PricingInputError);
    expect(() => validateInput({ foundation: "toString", scope: "small" })).toThrow(PricingInputError);
    expect(() =>
      validateInput({ foundation: "marketing_site", scope: "small", capabilities: [{ id: "constructor" }] }),
    ).toThrow(PricingInputError);
  });

  it("bounds the capability list", () => {
    const many = Array.from({ length: 41 }, () => ({ id: "cms" }));
    expect(() => validateInput({ foundation: "marketing_site", scope: "small", capabilities: many })).toThrow(
      PricingInputError,
    );
  });

  it("tolerates duplicate selections", () => {
    const clean = validateInput({
      foundation: "marketing_site",
      scope: "small",
      capabilities: [{ id: "cms" }, { id: "cms" }],
    });
    expect(clean.capabilities).toHaveLength(1);
  });

  it("defaults a capability to its first offered tier", () => {
    const clean = validateInput({
      foundation: "marketing_site",
      scope: "small",
      capabilities: [{ id: "booking" }],
    });
    expect(clean.capabilities[0].complexity).toBe("standard");
  });

  it("rejects non-object input", () => {
    for (const bad of [null, "x", 3, [], undefined]) {
      expect(() => validateInput(bad)).toThrow(PricingInputError);
    }
  });
});

describe("minimums", () => {
  it("never quotes a build below the minimum engagement", () => {
    for (const id of Object.keys(FOUNDATIONS) as FoundationId[]) {
      const e = estimate(input({ foundation: id }));
      const expectedFloor = id === "seo_engagement" ? FOUNDATIONS[id].floor : GLOBAL_MINIMUM;
      expect(e.low, id).toBeGreaterThanOrEqual(expectedFloor);
      expect(e.low, id).toBeGreaterThanOrEqual(FOUNDATIONS[id].floor);
    }
  });

  it("puts the bare-minimum website at the published small-business entry point", () => {
    const e = estimate(input({ foundation: "marketing_site" }));
    expect(e.low).toBe(3000);
    expect(e.high).toBe(5000);
  });
});

describe("range shape", () => {
  it("always returns an ordered, non-degenerate range", () => {
    for (const id of Object.keys(FOUNDATIONS) as FoundationId[]) {
      const e = estimate(input({ foundation: id, scope: "large" }));
      expect(e.low, id).toBeLessThan(e.high);
      expect(e.expected, id).toBeGreaterThanOrEqual(e.low);
      expect(e.expected, id).toBeLessThanOrEqual(e.high);
    }
  });

  it("returns whole dollars on round steps", () => {
    const e = estimate(
      input({
        foundation: "ecommerce",
        scope: "standard",
        capabilities: [{ id: "subscriptions", complexity: "moderate" }],
      }),
    );
    expect(e.low % 250).toBe(0);
    expect(e.high % 250).toBe(0);
  });

  it("reconciles every line to the reported total", () => {
    const e = estimate(
      input({
        foundation: "marketing_site",
        scope: "large",
        bilingual: true,
        rush: true,
        capabilities: [
          { id: "cms", complexity: "standard" },
          { id: "local_seo", complexity: "moderate" },
          { id: "crm_integration", complexity: "moderate" },
        ],
      }),
    );
    const sum = e.lines.reduce((a, l) => ({ low: a.low + l.band.low, high: a.high + l.band.high }), {
      low: 0,
      high: 0,
    });
    // Lines sum to the pre-rounding total, so they must bracket the rounded one.
    expect(sum.low).toBeGreaterThanOrEqual(e.low);
    expect(sum.low).toBeLessThan(e.low + 250);
    expect(sum.high).toBeLessThanOrEqual(e.high);
    expect(sum.high).toBeGreaterThan(e.high - 500);
  });
});

describe("monotonicity", () => {
  const baseline = estimate(input({ foundation: "marketing_site" }));

  it("never gets cheaper when a capability is added", () => {
    for (const cap of CAPABILITIES) {
      const e = estimate(
        input({ foundation: "marketing_site", capabilities: [{ id: cap.id, complexity: cap.allowed[0] }] }),
      );
      if (cap.includedIn?.includes("marketing_site")) {
        expect(e.low, cap.id).toBe(baseline.low);
        continue;
      }
      expect(e.low, `${cap.id} low`).toBeGreaterThanOrEqual(baseline.low);
      expect(e.high, `${cap.id} high`).toBeGreaterThan(baseline.high);
    }
  });

  it("never gets cheaper at a harder tier", () => {
    const TIERS: Complexity[] = ["standard", "moderate", "advanced", "complex"];
    for (const cap of CAPABILITIES) {
      const tiers = TIERS.filter((t) => cap.allowed.includes(t));
      let prev = 0;
      for (const tier of tiers) {
        const e = estimate(
          input({ foundation: "custom_application", capabilities: [{ id: cap.id, complexity: tier }] }),
        );
        expect(e.high, `${cap.id} @ ${tier}`).toBeGreaterThanOrEqual(prev);
        prev = e.high;
      }
    }
  });

  it("never gets cheaper as the site grows", () => {
    const order = ["small", "standard", "large", "very_large", "xl"] as const;
    let prev = 0;
    for (const scope of order) {
      const e = estimate(input({ foundation: "marketing_site", scope, capabilities: [{ id: "cms" }] }));
      expect(e.high, scope).toBeGreaterThanOrEqual(prev);
      prev = e.high;
    }
  });

  it("charges more for a second language", () => {
    const one = estimate(input({ foundation: "marketing_site", capabilities: [{ id: "copywriting" }] }));
    const two = estimate(
      input({ foundation: "marketing_site", bilingual: true, capabilities: [{ id: "copywriting" }] }),
    );
    expect(two.expected).toBeGreaterThan(one.expected);
  });
});

describe("foundation inclusions", () => {
  it("does not charge for what the foundation already ships", () => {
    const withAuth = estimate(
      input({ foundation: "business_portal", capabilities: [{ id: "authentication" }] }),
    );
    const without = estimate(input({ foundation: "business_portal" }));
    expect(withAuth.low).toBe(without.low);
    expect(withAuth.high).toBe(without.high);

    const line = withAuth.lines.find((l) => l.key === "authentication");
    expect(line?.note).toBe("included_in_foundation");
    expect(line?.band.expected).toBe(0);
  });

  it("still charges for auth where the foundation has none", () => {
    const withAuth = estimate(input({ foundation: "marketing_site", capabilities: [{ id: "authentication" }] }));
    expect(withAuth.expected).toBeGreaterThan(estimate(input({ foundation: "marketing_site" })).expected);
  });
});

describe("risk handling", () => {
  it("widens the top for an unknown external system without inventing effort", () => {
    const known = estimate(
      input({ foundation: "ecommerce", capabilities: [{ id: "customer_accounts", complexity: "moderate" }] }),
    );
    const unknown = estimate(
      input({ foundation: "ecommerce", capabilities: [{ id: "pos_integration", complexity: "moderate" }] }),
    );
    expect(unknown.caveats).toContain("unknown_external_system");
    const risk = unknown.lines.find((l) => l.key === "unknown_external_system");
    expect(risk?.band.low).toBe(0);
    expect(risk?.band.expected).toBe(0);
    expect(risk!.band.high).toBeGreaterThan(0);
    expect(unknown.high / unknown.low).toBeGreaterThan(known.high / known.low);
  });

  it("widens only the top when scope is undefined", () => {
    const defined = estimate(input({ foundation: "business_portal" }));
    const open = estimate(input({ foundation: "business_portal", undefinedScope: true }));
    expect(open.low).toBe(defined.low);
    expect(open.high).toBeGreaterThan(defined.high);
    expect(open.caveats).toContain("undefined_scope");
  });

  it("moves the whole band for a compressed timeline", () => {
    const normal = estimate(input({ foundation: "ecommerce" }));
    const rushed = estimate(input({ foundation: "ecommerce", rush: true }));
    expect(rushed.low).toBeGreaterThan(normal.low);
    expect(rushed.expected).toBeGreaterThan(normal.expected);
    expect(rushed.high).toBeGreaterThan(normal.high);
  });
});

describe("recurring services", () => {
  it("keeps recurring out of the build number", () => {
    const e = estimate(input({ foundation: "marketing_site" }));
    expect(e.recurring.length).toBeGreaterThan(0);
    // A monthly fee must never have been folded into the project total.
    expect(e.high).toBe(5000);
  });

  it("publishes an approved price and withholds an unapproved one", () => {
    const e = estimate(input({ foundation: "marketing_site" }));
    expect(e.recurring.find((r) => r.id === "seo-essentials")?.monthly).toBe(600);
    expect(e.recurring.find((r) => r.id === "website-care-plan")?.monthly).toBeNull();
  });

  it("never offers both SEO tiers at once", () => {
    const e = estimate(
      input({ foundation: "marketing_site", capabilities: [{ id: "content_strategy" }, { id: "local_seo" }] }),
    );
    const ids = e.recurring.map((r) => r.id);
    expect(ids).toContain("seo-advanced");
    expect(ids).not.toContain("seo-essentials");
  });
});

describe("determinism", () => {
  it("produces identical output for identical input", () => {
    const i = input({
      foundation: "custom_application",
      scope: "large",
      bilingual: true,
      capabilities: [{ id: "roles_permissions", complexity: "advanced" }, { id: "third_party_api" }],
    });
    expect(estimate(i)).toEqual(estimate(i));
  });

  it("stamps the pricing version and model checksum on every estimate", () => {
    const e = estimate(input({ foundation: "marketing_site" }));
    expect(e.pricingVersion).toBe(PRICING_VERSION);
    expect(e.modelChecksum).toMatch(/^[0-9a-f]{16}$/);
  });

  it("covers every scope size", () => {
    for (const scope of Object.keys(SCOPE_FACTORS)) {
      expect(() => estimate(input({ foundation: "marketing_site", scope: scope as never }))).not.toThrow();
    }
  });
});

describe("what the estimate says it includes", () => {
  it("advertises the page count the client actually chose", () => {
    const small = estimate(input({ foundation: "marketing_site", scope: "small" }));
    expect(small.includes).toContain("up_to_six_pages");

    // Saying "up to 6 pages" to someone who selected and paid for 13–25
    // understates the deliverable.
    const large = estimate(input({ foundation: "marketing_site", scope: "large" }));
    expect(large.includes).not.toContain("up_to_six_pages");
    expect(large.includes).toContain("large");
  });

  it("never lists the same inclusion twice", () => {
    const e = estimate(
      input({ foundation: "content_system", scope: "standard", capabilities: [{ id: "cms" }, { id: "blog_system" }] }),
    );
    expect(new Set(e.includes).size).toBe(e.includes.length);
  });
});
