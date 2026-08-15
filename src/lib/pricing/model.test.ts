import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { modelChecksum } from "./checksum";
import {
  CAPABILITIES,
  COMPLEXITY_FACTORS,
  FOUNDATIONS,
  GLOBAL_MINIMUM,
  MODEL_CHECKSUM,
  PRICING_VERSION,
  RECURRING,
  SCOPE_FACTORS,
  SCOPE_SENSITIVITY,
} from "./model";
import {
  CAPABILITY_LABELS,
  FOUNDATION_LABELS,
  INCLUDE_LABELS,
  RECURRING_LABELS,
  SCOPE_LABELS,
} from "./labels";
import type { Complexity } from "./types";

const TIERS: Complexity[] = ["standard", "moderate", "advanced", "complex"];

describe("model integrity", () => {
  it("carries the checksum of its own source", () => {
    const source = readFileSync(fileURLToPath(new URL("./model.ts", import.meta.url)), "utf8");
    expect(MODEL_CHECKSUM).toBe(modelChecksum(source));
  });

  it("uses a dated version string", () => {
    expect(PRICING_VERSION).toMatch(/^\d{4}\.\d{2}\.\d+$/);
  });
});

describe("foundations", () => {
  it.each(Object.values(FOUNDATIONS))("$id has an ordered band", (f) => {
    expect(f.band.low).toBeLessThanOrEqual(f.band.expected);
    expect(f.band.expected).toBeLessThanOrEqual(f.band.high);
  });

  it.each(Object.values(FOUNDATIONS))("$id floors at or below its own low", (f) => {
    expect(f.floor).toBeLessThanOrEqual(f.band.low);
  });

  /**
   * The policy constant is enforced here rather than clamped in the engine, so
   * a foundation can never be added below the minimum engagement by accident.
   * `seo_engagement` is exempt by design: it is a retainer onboarding sprint.
   */
  it("keeps every build foundation at or above the minimum engagement", () => {
    for (const f of Object.values(FOUNDATIONS)) {
      if (f.id === "seo_engagement") continue;
      expect(f.floor, `${f.id} floor`).toBeGreaterThanOrEqual(GLOBAL_MINIMUM);
    }
  });

  it("prices a store above a brochure site", () => {
    expect(FOUNDATIONS.ecommerce.band.low).toBeGreaterThan(FOUNDATIONS.marketing_site.band.low);
    expect(FOUNDATIONS.ecommerce.band.expected).toBeGreaterThan(FOUNDATIONS.marketing_site.band.expected);
  });

  it("prices an application above a portal above a store", () => {
    expect(FOUNDATIONS.custom_application.band.expected).toBeGreaterThan(
      FOUNDATIONS.business_portal.band.expected,
    );
    expect(FOUNDATIONS.business_portal.band.expected).toBeGreaterThan(FOUNDATIONS.ecommerce.band.expected);
  });

  it.each(Object.values(FOUNDATIONS))("$id lists what it includes", (f) => {
    expect(f.includes.length).toBeGreaterThan(0);
    for (const key of f.includes) {
      expect(INCLUDE_LABELS[key] ?? CAPABILITY_LABELS[key], `label for "${key}"`).toBeDefined();
    }
  });
});

describe("capabilities", () => {
  it("has unique ids", () => {
    const ids = CAPABILITIES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(CAPABILITIES)("$id has an ordered base band", (c) => {
    expect(c.base.low).toBeLessThanOrEqual(c.base.expected);
    expect(c.base.expected).toBeLessThanOrEqual(c.base.high);
    expect(c.base.low).toBeGreaterThan(0);
  });

  it.each(CAPABILITIES)("$id offers at least one tier", (c) => {
    expect(c.allowed.length).toBeGreaterThan(0);
    for (const tier of c.allowed) expect(TIERS).toContain(tier);
  });

  /** A harder build must never be cheaper than an easier one for the same thing. */
  it.each(CAPABILITIES.filter((c) => c.bands))("$id qualitative tiers increase", (c) => {
    const declared = TIERS.filter((t) => c.bands?.[t]);
    for (let i = 1; i < declared.length; i += 1) {
      const prev = c.bands![declared[i - 1]]!;
      const next = c.bands![declared[i]]!;
      expect(next.low, `${c.id} ${declared[i]} low`).toBeGreaterThan(prev.low);
      expect(next.expected).toBeGreaterThan(prev.expected);
      expect(next.high).toBeGreaterThan(prev.high);
    }
  });

  it.each(CAPABILITIES)("$id is labelled in both languages", (c) => {
    expect(CAPABILITY_LABELS[c.id]?.en).toBeTruthy();
    expect(CAPABILITY_LABELS[c.id]?.fr).toBeTruthy();
  });

  it.each(CAPABILITIES.filter((c) => c.includedIn))("$id only claims real foundations", (c) => {
    for (const f of c.includedIn!) expect(FOUNDATIONS[f], `${c.id} includedIn ${f}`).toBeDefined();
  });

  it("keeps scope sensitivity within 0–1", () => {
    for (const c of CAPABILITIES) {
      if (c.scopeSensitivity === undefined) continue;
      expect(c.scopeSensitivity).toBeGreaterThanOrEqual(0);
      expect(c.scopeSensitivity).toBeLessThanOrEqual(1);
    }
    for (const v of Object.values(SCOPE_SENSITIVITY)) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });
});

describe("multipliers", () => {
  it("makes each complexity tier cost more and widen", () => {
    for (let i = 1; i < TIERS.length; i += 1) {
      const [pl, pe, ph] = COMPLEXITY_FACTORS[TIERS[i - 1]];
      const [l, e, h] = COMPLEXITY_FACTORS[TIERS[i]];
      expect(l).toBeGreaterThan(pl);
      expect(e).toBeGreaterThan(pe);
      expect(h).toBeGreaterThan(ph);
      // Uncertainty grows with difficulty: the band widens, it does not just shift.
      expect(h / l).toBeGreaterThan(ph / pl);
    }
  });

  it("scales page count with diminishing returns", () => {
    const order = ["small", "standard", "large", "very_large", "xl"] as const;
    expect(SCOPE_FACTORS.small).toBe(1);
    for (let i = 1; i < order.length; i += 1) {
      expect(SCOPE_FACTORS[order[i]]).toBeGreaterThan(SCOPE_FACTORS[order[i - 1]]);
      expect(SCOPE_LABELS[order[i]]?.fr).toBeTruthy();
    }
    // Roughly 10× the pages must cost far less than 10× the money.
    expect(SCOPE_FACTORS.xl).toBeLessThan(3);
  });
});

describe("recurring services", () => {
  /**
   * Mirrors Supabase `service_products`, verified 2026-08-14. If Studio's
   * catalogue changes, this test is the tripwire — the numbers may not drift
   * silently on the public site.
   */
  it("matches the approved Studio catalogue", () => {
    const approved = RECURRING.filter((r) => r.approved);
    expect(approved.map((r) => [r.id, r.monthly])).toEqual([
      ["seo-essentials", 600],
      ["seo-advanced", 850],
    ]);
  });

  it("never treats a draft catalogue row as publishable", () => {
    for (const r of RECURRING) {
      if (r.approved) continue;
      expect(["website-care-plan", "managed-hosting", "content-creation"]).toContain(r.id);
    }
  });

  it("labels every service in both languages", () => {
    for (const r of RECURRING) {
      expect(RECURRING_LABELS[r.id]?.en, r.id).toBeTruthy();
      expect(RECURRING_LABELS[r.id]?.fr, r.id).toBeTruthy();
    }
  });

  it("only suggests services that exist", () => {
    const ids = new Set(RECURRING.map((r) => r.id));
    for (const f of Object.values(FOUNDATIONS)) {
      for (const id of f.suggestedRecurring) expect(ids, `${f.id} → ${id}`).toContain(id);
    }
  });
});

describe("labels", () => {
  it("covers every foundation in both languages", () => {
    for (const id of Object.keys(FOUNDATIONS)) {
      expect(FOUNDATION_LABELS[id]?.en, id).toBeTruthy();
      expect(FOUNDATION_LABELS[id]?.fr, id).toBeTruthy();
    }
  });
});
