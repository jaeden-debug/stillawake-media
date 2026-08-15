import { describe, expect, it } from "vitest";

import { SCENARIOS } from "./calibration";
import { estimate } from "./engine";
import { GLOBAL_MINIMUM } from "./model";
import type { Estimate } from "./types";

const priced = new Map<string, Estimate>(SCENARIOS.map((s) => [s.id, estimate(s.input)]));
const get = (id: string): Estimate => {
  const e = priced.get(id);
  if (!e) throw new Error(`Scenario "${id}" is missing — calibration coverage regressed.`);
  return e;
};

describe("calibration coverage", () => {
  it("prices at least 20 distinct scenarios", () => {
    expect(SCENARIOS.length).toBeGreaterThanOrEqual(20);
    expect(new Set(SCENARIOS.map((s) => s.id)).size).toBe(SCENARIOS.length);
  });

  it("covers every foundation the model offers", () => {
    const used = new Set(SCENARIOS.map((s) => s.input.foundation));
    for (const f of [
      "marketing_site",
      "website_redesign",
      "ecommerce",
      "business_portal",
      "custom_application",
      "ai_automation",
      "seo_engagement",
      "content_system",
    ]) {
      expect(used, f).toContain(f);
    }
  });
});

describe("every scenario stays sane", () => {
  it.each(SCENARIOS)("$id produces a usable range", (s) => {
    const e = get(s.id);
    expect(e.low).toBeGreaterThan(0);
    expect(e.high).toBeGreaterThan(e.low);
    expect(e.expected).toBeGreaterThanOrEqual(e.low);
    expect(e.expected).toBeLessThanOrEqual(e.high);
    expect(e.includes.length).toBeGreaterThan(0);
    expect(e.drivers.length).toBeGreaterThan(0);
  });

  /**
   * A range wider than 3× is not an estimate, it is a shrug. The only thing
   * that may approach it is genuine unknown-system risk, and even then it has
   * to stay inside a number a business can plan against.
   */
  it.each(SCENARIOS)("$id keeps the range decision-useful", (s) => {
    const e = get(s.id);
    const spread = e.high / e.low;
    expect(spread, `${s.id} spread ${spread.toFixed(2)}×`).toBeLessThanOrEqual(3);
    expect(spread, `${s.id} spread ${spread.toFixed(2)}×`).toBeGreaterThan(1.15);
  });

  it.each(SCENARIOS.filter((s) => s.input.foundation !== "seo_engagement"))(
    "$id never quotes below the minimum engagement",
    (s) => {
      expect(get(s.id).low).toBeGreaterThanOrEqual(GLOBAL_MINIMUM);
    },
  );
});

/**
 * The ranges StillAwake already publishes on /website-cost-canada and
 * /fr/prix-site-web-quebec. A prospect can read those and then use the
 * calculator; the two must not contradict each other.
 */
describe("agrees with the published market ranges", () => {
  it("puts a professionally built small-business site in $3,000–$10,000", () => {
    const e = get("A_simple_business_site");
    expect(e.low).toBeGreaterThanOrEqual(3000);
    expect(e.high).toBeLessThanOrEqual(10000);
  });

  it("puts a custom-designed business site in $8,000–$25,000", () => {
    for (const id of ["D_seo_business_site", "informational_50_pages"]) {
      const e = get(id);
      expect(e.low, id).toBeGreaterThanOrEqual(8000);
      expect(e.high, id).toBeLessThanOrEqual(25000);
    }
  });

  it("starts an ecommerce store at or above $5,000", () => {
    expect(get("shopify_store").low).toBeGreaterThanOrEqual(5000);
  });

  it("starts a custom application at or above the published $15,000", () => {
    for (const id of ["F_business_dashboard", "G_custom_web_application", "saas_mvp", "client_portal"]) {
      expect(get(id).low, id).toBeGreaterThanOrEqual(15000);
    }
  });

  /**
   * From /stillawake-times/custom-software-development-cost-canada:
   * "$35,000–$75,000 — a real multi-user product. Accounts, roles, payments,
   * a handful of integrations, an admin surface."
   */
  it("lands a multi-user product in the $35,000–$75,000 band the article claims", () => {
    for (const id of ["G_custom_web_application", "saas_mvp"]) {
      const e = get(id);
      expect(e.expected, `${id} expected`).toBeGreaterThanOrEqual(35000);
      expect(e.expected, `${id} expected`).toBeLessThanOrEqual(75000);
    }
  });

  it("keeps every scenario under the $100,000 the site calls platform scale", () => {
    for (const s of SCENARIOS) expect(get(s.id).high, s.id).toBeLessThan(100000);
  });
});

describe("the brief's ordering requirements", () => {
  it("makes a restaurant with ordering materially dearer than one without", () => {
    const plain = get("B_restaurant_seo_site");
    const ordering = get("C_restaurant_ordering");
    expect(ordering.low).toBeGreaterThan(plain.high);
    expect(ordering.expected / plain.expected).toBeGreaterThan(1.5);
  });

  it("separates the three readings of 'booking' by an order of magnitude", () => {
    const link = get("booking_link");
    const embedded = get("booking_embedded");
    const custom = get("booking_custom_engine");
    expect(embedded.expected).toBeGreaterThan(link.expected);
    expect(custom.expected).toBeGreaterThan(embedded.expected);
    expect(custom.expected / link.expected).toBeGreaterThan(2.5);
  });

  it("separates the two readings of 'online ordering'", () => {
    expect(get("C_restaurant_ordering").expected).toBeGreaterThan(
      get("restaurant_third_party_ordering").expected * 1.5,
    );
  });

  it("separates a simple automation from an AI platform", () => {
    expect(get("advanced_automation").expected / get("simple_automation").expected).toBeGreaterThan(2.5);
  });

  it("does not let page count dominate software complexity", () => {
    // 50 marketing pages must cost less than one dashboard.
    expect(get("informational_50_pages").expected).toBeLessThan(get("F_business_dashboard").expected);
  });

  it("does not charge a programmatic pipeline per generated page", () => {
    // The whole point of the pipeline is that page 5,000 is nearly free.
    expect(get("programmatic_seo_site").expected).toBeLessThan(get("G_custom_web_application").expected);
  });

  it("keeps an SEO-only engagement priced as a sprint, not a build", () => {
    const e = get("seo_only");
    expect(e.high).toBeLessThan(5000);
    expect(e.recurring.some((r) => r.monthly !== null)).toBe(true);
  });

  it("charges more for a redesign with SEO than a redesign alone", () => {
    expect(get("redesign_with_seo").expected).toBeGreaterThan(get("website_redesign").expected);
  });

  it("widens rather than guesses when an internal system is undocumented", () => {
    const e = get("unknown_legacy_integration");
    expect(e.caveats).toContain("unknown_external_system");
    expect(e.caveats).toContain("undefined_scope");
    expect(e.high / e.low).toBeGreaterThan(2);
  });
});

describe("recurring stays out of the build price", () => {
  it.each(SCENARIOS)("$id never folds a monthly fee into the project", (s) => {
    const e = get(s.id);
    for (const r of e.recurring) {
      if (r.monthly === null) continue;
      // Approved monthly prices are the two SEO plans and nothing else.
      expect([600, 850]).toContain(r.monthly);
    }
  });

  it("never publishes an unapproved catalogue price", () => {
    for (const s of SCENARIOS) {
      for (const r of get(s.id).recurring) {
        if (["website-care-plan", "managed-hosting", "content-creation"].includes(r.id)) {
          expect(r.monthly, `${s.id} → ${r.id}`).toBeNull();
        }
      }
    }
  });
});
