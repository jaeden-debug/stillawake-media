import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { modelChecksum } from "./checksum";
import { PricingInputError, estimate, validateInput } from "./engine";
import {
  ADDONS,
  DAY_RATES,
  DISCOVERY,
  DISCOVERY_THRESHOLD,
  MINIMUM,
  MODEL_CHECKSUM,
  ORG_FACTORS,
  PRICING_VERSION,
  RECURRING,
  SERVICE_LINES,
} from "./model";
import { ADDON_LABELS, DEPTH_LABELS, INCLUDE_LABELS, LINE_LABELS, ORG_LABELS, RECURRING_LABELS } from "./labels";
import type { EstimateInput, ServiceLineId } from "./types";

const inp = (over: Partial<EstimateInput> & Pick<EstimateInput, "lines">): EstimateInput => ({ ...over });

/* ── model integrity ─────────────────────────────────────────────────────── */

describe("model integrity", () => {
  it("carries the checksum of its own source", () => {
    const source = readFileSync(fileURLToPath(new URL("./model.ts", import.meta.url)), "utf8");
    expect(MODEL_CHECKSUM).toBe(modelChecksum(source));
  });

  it("uses a dated version string", () => {
    expect(PRICING_VERSION).toMatch(/^\d{4}\.\d{2}\.\d+$/);
  });

  it("rates judgement above execution", () => {
    expect(DAY_RATES.systems).toBeGreaterThan(DAY_RATES.build);
    expect(DAY_RATES.advisory).toBeGreaterThan(DAY_RATES.build);
    expect(DAY_RATES.ai).toBeGreaterThan(DAY_RATES.build);
  });

  it.each(Object.values(SERVICE_LINES))("$id has ordered, increasing depths", (line) => {
    let prev = 0;
    for (const d of line.depths) {
      expect(d.days.low, `${line.id}.${d.id}`).toBeLessThanOrEqual(d.days.expected);
      expect(d.days.expected).toBeLessThanOrEqual(d.days.high);
      expect(d.days.expected, `${line.id}.${d.id} must cost more than the tier below`).toBeGreaterThan(prev);
      prev = d.days.expected;
      expect(DEPTH_LABELS[`${line.id}.${d.id}`]?.fr, `${line.id}.${d.id} FR label`).toBeTruthy();
    }
  });

  it.each(Object.values(ADDONS))("$id variants increase", (addon) => {
    if (!addon.variants) return;
    let prev = 0;
    for (const v of addon.variants) {
      expect(v.days.expected, `${addon.id}.${v.id}`).toBeGreaterThan(prev);
      prev = v.days.expected;
      expect(ADDON_LABELS[`${addon.id}.${v.id}`]?.fr).toBeTruthy();
    }
  });

  it("only lets a line carry add-ons that exist", () => {
    for (const line of Object.values(SERVICE_LINES)) {
      for (const a of line.addons ?? []) expect(ADDONS[a], `${line.id} → ${a}`).toBeDefined();
    }
  });

  it("labels every line, add-on and org factor in both languages", () => {
    for (const id of Object.keys(SERVICE_LINES)) {
      expect(LINE_LABELS[id]?.en).toBeTruthy();
      expect(LINE_LABELS[id]?.fr).toBeTruthy();
    }
    for (const id of Object.keys(ADDONS)) expect(ADDON_LABELS[id]?.fr, id).toBeTruthy();
    for (const id of Object.keys(ORG_FACTORS)) expect(ORG_LABELS[id]?.fr, id).toBeTruthy();
  });

  it("labels every inclusion the model can emit", () => {
    for (const line of Object.values(SERVICE_LINES)) {
      for (const d of line.depths) {
        const e = estimate(inp({ lines: [{ id: line.id, depth: d.id }] }));
        for (const key of e.includes) {
          expect(INCLUDE_LABELS[key] ?? ADDON_LABELS[key], `label for "${key}"`).toBeDefined();
        }
      }
    }
  });

  it("mirrors only the approved Studio catalogue prices", () => {
    expect(RECURRING.filter((r) => r.approved).map((r) => [r.id, r.monthly])).toEqual([
      ["seo-essentials", 600],
      ["seo-advanced", 850],
    ]);
    for (const r of RECURRING) expect(RECURRING_LABELS[r.id]?.fr, r.id).toBeTruthy();
  });
});

/* ── the day model ───────────────────────────────────────────────────────── */

describe("every price is days × a rate", () => {
  it("prices a single line at exactly its days times its rate", () => {
    const e = estimate(inp({ lines: [{ id: "website", depth: "custom" }] }));
    const spec = SERVICE_LINES.website.depths.find((d) => d.id === "custom")!;
    expect(e.lines[0].band.expected).toBe(spec.days.expected * DAY_RATES.build);
    expect(e.days.expected).toBe(spec.days.expected);
  });

  it("uses the advisory rate where the depth says so", () => {
    const e = estimate(inp({ lines: [{ id: "seo", depth: "research" }] }));
    expect(e.lines[0].discipline).toBe("advisory");
    expect(e.lines[0].band.expected).toBe(3.5 * DAY_RATES.advisory);
  });

  it("reports total days alongside the money", () => {
    const e = estimate(inp({ lines: [{ id: "website", depth: "custom" }, { id: "brand", depth: "identity" }] }));
    expect(e.days.expected).toBeCloseTo(5.5 + 6, 5);
  });
});

/* ── validation and tampering ────────────────────────────────────────────── */

describe("input validation", () => {
  it("rejects an empty or unknown selection", () => {
    expect(() => validateInput({ lines: [] })).toThrow(PricingInputError);
    expect(() => validateInput({ lines: [{ id: "free_stuff" }] })).toThrow(PricingInputError);
  });

  it("rejects a depth the line does not offer", () => {
    expect(() => validateInput({ lines: [{ id: "website", depth: "gratis" }] })).toThrow(PricingInputError);
  });

  it("rejects an add-on the line does not carry", () => {
    // `bookings` belongs to website, never to seo.
    expect(() => validateInput({ lines: [{ id: "seo", depth: "research", addons: [{ id: "bookings" }] }] })).toThrow(
      /does not apply/i,
    );
  });

  it("rejects an unknown variant", () => {
    expect(() =>
      validateInput({ lines: [{ id: "website", depth: "custom", addons: [{ id: "bookings", variant: "free" }] }] }),
    ).toThrow(PricingInputError);
  });

  it("refuses to average an ambiguous add-on with no level chosen", () => {
    // "Booking" spans a tenfold range. Guessing the middle is the dishonesty
    // the variants exist to prevent, so the engine insists on an answer.
    expect(() =>
      estimate(inp({ lines: [{ id: "website", depth: "custom", addons: [{ id: "bookings" }] }] })),
    ).toThrow(/needs a level/i);
  });

  it("ignores injected prices, discounts and rates", () => {
    const clean = validateInput({
      lines: [{ id: "website", depth: "launch", price: 1, dayRate: 10 }],
      low: 1,
      high: 2,
      discount: 0.9,
      DAY_RATES: { build: 1 },
      __proto__: { evil: true },
    });
    expect(clean).toEqual({
      lines: [{ id: "website", depth: "launch", addons: [] }],
      org: [],
      budget: undefined,
      undefinedScope: false,
      rush: false,
    });
    expect(estimate(clean).low).toBe(MINIMUM);
  });

  it("cannot be reached through prototype pollution", () => {
    expect(() => validateInput({ lines: [{ id: "constructor" }] })).toThrow(PricingInputError);
    expect(() => validateInput({ lines: [{ id: "toString" }] })).toThrow(PricingInputError);
  });

  it("bounds the selection", () => {
    expect(() => validateInput({ lines: Array.from({ length: 8 }, () => ({ id: "website" })) })).toThrow(
      PricingInputError,
    );
  });

  it("drops an unknown org factor rather than failing", () => {
    const clean = validateInput({ lines: [{ id: "website", depth: "custom" }], org: ["approvals", "free_pass"] });
    expect(clean.org).toEqual(["approvals"]);
  });
});

/* ── the three tiers ─────────────────────────────────────────────────────── */

describe("tiers and routing", () => {
  it("puts the productized site at the floor and calls it Launch", () => {
    const e = estimate(inp({ lines: [{ id: "website", depth: "launch" }] }));
    expect(e.tier).toBe("launch");
    expect(e.low).toBe(MINIMUM);
    expect(e.high).toBeLessThanOrEqual(4000);
    expect(e.needsDiscovery).toBe(false);
  });

  it("does not charge twice for foundations a build already lays", () => {
    const alone = estimate(inp({ lines: [{ id: "website", depth: "launch" }] }));
    const withSeo = estimate(
      inp({ lines: [{ id: "website", depth: "launch" }, { id: "seo", depth: "foundations" }] }),
    );
    expect(withSeo.low).toBe(alone.low);
    expect(withSeo.high).toBe(alone.high);
    // Still Launch: absorbed work must not silently promote the tier.
    expect(withSeo.tier).toBe("launch");
    expect(withSeo.lines.find((l) => l.key === "seo.foundations")?.note).toBe("included_in_build");
  });

  it("charges for SEO foundations when there is no build to absorb them", () => {
    const e = estimate(inp({ lines: [{ id: "seo", depth: "foundations" }] }));
    expect(e.low).toBeGreaterThan(0);
    expect(e.lines[0].note).toBeUndefined();
  });

  it("puts a custom site in the published $8,000–25,000 band", () => {
    const e = estimate(inp({ lines: [{ id: "website", depth: "custom" }] }));
    expect(e.tier).toBe("custom");
    expect(e.low).toBeGreaterThanOrEqual(8000);
    expect(e.high).toBeLessThanOrEqual(25000);
  });

  it("always scopes software before pricing it, whatever the number", () => {
    for (const depth of ["internal_tool", "customer_product", "platform"]) {
      const e = estimate(inp({ lines: [{ id: "software", depth }] }));
      expect(e.needsDiscovery, depth).toBe(true);
      expect(e.tier).toBe("systems");
    }
  });

  it("routes anything past the threshold to discovery", () => {
    const e = estimate(inp({ lines: [{ id: "brand", depth: "positioning" }, { id: "website", depth: "flagship" }] }));
    expect(e.expected).toBeGreaterThan(DISCOVERY_THRESHOLD);
    expect(e.needsDiscovery).toBe(true);
  });

  it("keeps a well-understood mid-market website quotable", () => {
    // ~$30k, but a brochure site is a known deliverable — value alone must not
    // send it to discovery.
    const e = estimate(
      inp({
        lines: [{ id: "website", depth: "custom" }],
        org: ["approvals", "compliance", "integrations", "training"],
      }),
    );
    expect(e.needsDiscovery).toBe(false);
    expect(e.tier).toBe("custom");
  });

  it("prices discovery as a real product", () => {
    expect(DISCOVERY.from).toBeGreaterThan(0);
    expect(DISCOVERY.creditedAgainstBuild).toBe(true);
  });
});

/* ── the enterprise multiple ─────────────────────────────────────────────── */

describe("organisational complexity", () => {
  it("charges roughly 3× for the same deliverable at a mid-market firm", () => {
    const solo = estimate(inp({ lines: [{ id: "website", depth: "custom" }] }));
    const firm = estimate(
      inp({
        lines: [{ id: "website", depth: "custom" }],
        org: ["approvals", "compliance", "integrations", "training"],
      }),
    );
    const multiple = firm.expected / solo.expected;
    expect(multiple).toBeGreaterThan(2.6);
    expect(multiple).toBeLessThan(3.6);
  });

  it("charges nothing extra when none apply", () => {
    const a = estimate(inp({ lines: [{ id: "website", depth: "custom" }] }));
    const b = estimate(inp({ lines: [{ id: "website", depth: "custom" }], org: [] }));
    expect(a.expected).toBe(b.expected);
  });

  it("is itemised rather than hidden in the total", () => {
    const e = estimate(inp({ lines: [{ id: "website", depth: "custom" }], org: ["approvals"] }));
    const line = e.lines.find((l) => l.kind === "org");
    expect(line).toBeDefined();
    expect(line!.band.expected).toBeGreaterThan(0);
    expect(line!.note).toContain("approvals");
  });

  it("treats integrating with their systems as uncertainty too", () => {
    const e = estimate(inp({ lines: [{ id: "website", depth: "custom" }], org: ["integrations"] }));
    expect(e.caveats).toContain("unknown_external_system");
  });
});

/* ── monotonicity ────────────────────────────────────────────────────────── */

describe("monotonicity", () => {
  it("never gets cheaper at a deeper level", () => {
    for (const line of Object.values(SERVICE_LINES)) {
      let prev = 0;
      for (const d of line.depths) {
        const e = estimate(inp({ lines: [{ id: line.id, depth: d.id }] }));
        expect(e.high, `${line.id}.${d.id}`).toBeGreaterThanOrEqual(prev);
        prev = e.high;
      }
    }
  });

  it("never gets cheaper when a service is added", () => {
    const base = estimate(inp({ lines: [{ id: "website", depth: "custom" }] }));
    for (const id of Object.keys(SERVICE_LINES) as ServiceLineId[]) {
      if (id === "website") continue;
      const spec = SERVICE_LINES[id];
      const depth = spec.depths[0];
      const e = estimate(inp({ lines: [{ id: "website", depth: "custom" }, { id, depth: depth.id }] }));
      // SEO foundations are absorbed by the build, so equal is correct there.
      if (depth.absorbedBy?.includes("website")) expect(e.expected).toBe(base.expected);
      else expect(e.expected, id).toBeGreaterThan(base.expected);
    }
  });

  it("separates the three readings of booking by an order of magnitude", () => {
    const price = (variant: string) =>
      estimate(inp({ lines: [{ id: "website", depth: "custom", addons: [{ id: "bookings", variant }] }] })).expected;
    expect(price("embedded")).toBeGreaterThan(price("link"));
    expect(price("custom")).toBeGreaterThan(price("embedded"));
  });

  it("never quotes below the minimum", () => {
    for (const line of Object.values(SERVICE_LINES)) {
      for (const d of line.depths) {
        expect(estimate(inp({ lines: [{ id: line.id, depth: d.id }] })).low, `${line.id}.${d.id}`).toBeGreaterThanOrEqual(
          MINIMUM,
        );
      }
    }
  });
});

/* ── risk, recurring, determinism ────────────────────────────────────────── */

describe("risk", () => {
  it("widens only the top when scope is undefined", () => {
    const a = estimate(inp({ lines: [{ id: "website", depth: "custom" }] }));
    const b = estimate(inp({ lines: [{ id: "website", depth: "custom" }], undefinedScope: true }));
    expect(b.low).toBe(a.low);
    expect(b.high).toBeGreaterThan(a.high);
  });

  it("moves the whole band for a hard deadline", () => {
    const a = estimate(inp({ lines: [{ id: "website", depth: "custom" }] }));
    const b = estimate(inp({ lines: [{ id: "website", depth: "custom" }], rush: true }));
    expect(b.low).toBeGreaterThan(a.low);
    expect(b.high).toBeGreaterThan(a.high);
  });
});

describe("recurring and budget", () => {
  it("keeps monthly fees out of the build price and withholds unapproved ones", () => {
    const e = estimate(inp({ lines: [{ id: "website", depth: "launch" }] }));
    expect(e.high).toBeLessThanOrEqual(4000);
    expect(e.recurring.find((r) => r.id === "website-care-plan")?.monthly).toBeNull();
  });

  it("never offers both SEO tiers at once", () => {
    const e = estimate(inp({ lines: [{ id: "seo", depth: "research" }, { id: "content", depth: "pipeline" }] }));
    const ids = e.recurring.map((r) => r.id);
    expect(ids).toContain("seo-advanced");
    expect(ids).not.toContain("seo-essentials");
  });

  /** Budget routes; it must never move the number. */
  it("prices identically whatever budget is stated", () => {
    const prices = (["under_5k", "5_15k", "15_50k", "50k_plus", "unsure"] as const).map(
      (budget) => estimate(inp({ lines: [{ id: "website", depth: "custom" }], budget })).expected,
    );
    expect(new Set(prices).size).toBe(1);
  });

  it("reports when the work sits above the stated budget", () => {
    const e = estimate(inp({ lines: [{ id: "website", depth: "custom" }], budget: "under_5k" }));
    expect(e.budgetSignal).toBe("above");
    expect(e.low).toBeGreaterThanOrEqual(8000);
  });
});

describe("determinism", () => {
  it("produces identical output for identical input", () => {
    const i = inp({
      lines: [
        { id: "website", depth: "custom", addons: [{ id: "bookings", variant: "embedded" }] },
        { id: "seo", depth: "research" },
      ],
      org: ["approvals"],
    });
    expect(estimate(i)).toEqual(estimate(i));
  });

  it("stamps the version and checksum on every estimate", () => {
    const e = estimate(inp({ lines: [{ id: "website", depth: "launch" }] }));
    expect(e.pricingVersion).toBe(PRICING_VERSION);
    expect(e.modelChecksum).toMatch(/^[0-9a-f]{16}$/);
  });
});
