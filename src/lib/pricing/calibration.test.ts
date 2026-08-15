import { describe, expect, it } from "vitest";

import { SCENARIOS } from "./calibration";
import { estimate } from "./engine";
import { DAY_RATES, MINIMUM } from "./model";
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

  it("covers every service line", () => {
    const used = new Set(SCENARIOS.flatMap((s) => s.input.lines.map((l) => l.id)));
    for (const id of ["brand", "website", "store", "seo", "content", "software", "automation"]) {
      expect(used, id).toContain(id);
    }
  });

  it.each(SCENARIOS)("$id produces a usable estimate", (s) => {
    const e = get(s.id);
    expect(e.low).toBeGreaterThanOrEqual(MINIMUM);
    expect(e.high).toBeGreaterThan(e.low);
    expect(e.days.expected).toBeGreaterThan(0);
    expect(e.includes.length).toBeGreaterThan(0);
    expect(e.drivers.length).toBeGreaterThan(0);
  });

  /**
   * Every number has to survive the question "how many days is that?" — the
   * whole point of the rebuild. Checked against the cheapest rate, since a
   * mix of disciplines can only push the implied rate up.
   */
  it.each(SCENARIOS)("$id reconciles to a plausible day count", (s) => {
    const e = get(s.id);
    const impliedRate = e.expected / e.days.expected;
    expect(impliedRate, `${s.id} implies $${Math.round(impliedRate)}/day`).toBeGreaterThanOrEqual(
      DAY_RATES.build * 0.9,
    );
    expect(impliedRate, `${s.id} implies $${Math.round(impliedRate)}/day`).toBeLessThanOrEqual(
      DAY_RATES.ai * 1.15,
    );
  });

  /** A range wider than 2.5× is a shrug, not an estimate. */
  it.each(SCENARIOS.filter((s) => !s.input.undefinedScope))("$id keeps the range decision-useful", (s) => {
    const spread = get(s.id).high / get(s.id).low;
    expect(spread, `${s.id} spread ${spread.toFixed(2)}×`).toBeLessThanOrEqual(2.5);
    expect(spread).toBeGreaterThan(1.1);
  });
});

describe("the product tier is reachable by a small business", () => {
  it("puts a launched site at the floor", () => {
    const e = get("launch_local");
    expect(e.tier).toBe("launch");
    expect(e.low).toBe(MINIMUM);
    expect(e.high).toBeLessThanOrEqual(4000);
  });

  it("keeps the most common small sale in the product tier", () => {
    // A Launch site plus the search foundations every build already lays.
    expect(get("launch_with_seo").tier).toBe("launch");
    expect(get("launch_with_seo").high).toBeLessThanOrEqual(4000);
  });

  it("leaves a real gap between the product and a custom project", () => {
    // The line between buying a product and hiring a studio. If these ever
    // meet, the Launch product is being sold as a discounted custom build.
    expect(get("custom_site").low).toBeGreaterThan(get("launch_local").high * 1.8);
  });
});

describe("agrees with what the site already publishes", () => {
  it("puts a custom business site in the published $8,000–25,000 band", () => {
    const e = get("custom_site");
    expect(e.low).toBeGreaterThanOrEqual(8000);
    expect(e.high).toBeLessThanOrEqual(25000);
  });

  it("keeps a real store above a brochure site", () => {
    expect(get("store_proper").low).toBeGreaterThan(get("custom_site").low);
  });
});

describe("the routing decisions", () => {
  it("scopes every software build rather than quoting it", () => {
    for (const id of ["internal_tool", "client_portal", "saas_platform", "travel_system"]) {
      expect(get(id).needsDiscovery, id).toBe(true);
    }
  });

  it("still quotes a well-understood mid-market website", () => {
    expect(get("custom_site_midmarket").needsDiscovery).toBe(false);
  });

  it("charges a mid-market firm ~3× for the identical deliverable", () => {
    const multiple = get("custom_site_midmarket").expected / get("custom_site_solo").expected;
    expect(multiple).toBeGreaterThan(2.6);
    expect(multiple).toBeLessThan(3.6);
  });

  it("keeps a Lisa-shaped system out of the quoting path entirely", () => {
    const e = get("travel_system");
    expect(e.needsDiscovery).toBe(true);
    // Independently estimated at $180k–300k for that scope; the model agrees.
    expect(e.expected).toBeGreaterThan(150000);
  });
});

describe("depth separates what one word cannot", () => {
  it("separates a link to an ordering platform from a full ordering stack", () => {
    expect(get("restaurant_full_ordering").expected).toBeGreaterThan(get("restaurant_local").expected * 1.5);
  });

  it("separates the readings of booking", () => {
    expect(get("booking_custom").expected).toBeGreaterThan(get("booking_link").expected * 1.4);
  });

  it("separates connecting two tools from an AI system", () => {
    expect(get("automation_intelligent").expected).toBeGreaterThan(get("automation_connect").expected * 3);
  });

  it("prices strategy above execution", () => {
    // Positioning is advisory work; a refresh is production work.
    const positioning = SCENARIOS.find((s) => s.id === "full_positioning")!;
    expect(positioning.input.lines.some((l) => l.id === "brand" && l.depth === "positioning")).toBe(true);
    expect(get("full_positioning").expected).toBeGreaterThan(get("brand_refresh_only").expected * 5);
  });
});

describe("recurring stays out of the build price", () => {
  it.each(SCENARIOS)("$id publishes only approved monthly prices", (s) => {
    for (const r of get(s.id).recurring) {
      if (r.monthly === null) continue;
      expect([600, 850]).toContain(r.monthly);
    }
  });
});
