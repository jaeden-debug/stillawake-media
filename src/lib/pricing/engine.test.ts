import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { modelChecksum } from "./checksum";
import { PricingInputError, estimate, validateInput } from "./engine";
import {
  ADDITIONS,
  BASES,
  DISCOVERY,
  EMERGENCY,
  MINIMUM,
  MIN_IMPLIED_DAY_RATE,
  MODEL_CHECKSUM,
  ONE_TIME,
  PLANNING_DAY_RATE,
  PRICING_VERSION,
  RECURRING,
  SEO_SCOPES,
} from "./model";
import {
  ADDITION_LABELS,
  BASE_LABELS,
  EMERGENCY_DESCRIPTIONS,
  EMERGENCY_LABELS,
  EXCLUDE_LABELS,
  INCLUDE_LABELS,
  ONE_TIME_DESCRIPTIONS,
  ONE_TIME_LABELS,
  RECURRING_LABELS,
} from "./labels";
import type { BaseId, EstimateInput } from "./types";

const inp = (o: Partial<EstimateInput> & Pick<EstimateInput, "base">): EstimateInput => ({ ...o });

describe("model integrity", () => {
  it("carries the checksum of its own source", () => {
    const src = readFileSync(fileURLToPath(new URL("./model.ts", import.meta.url)), "utf8");
    expect(MODEL_CHECKSUM).toBe(modelChecksum(src));
  });

  it("uses a dated version", () => expect(PRICING_VERSION).toMatch(/^\d{4}\.\d{2}\.\d+$/));

  it.each(Object.values(BASES))("$id has an ordered price and day band", (b) => {
    expect(b.price.low).toBeLessThanOrEqual(b.price.expected);
    expect(b.price.expected).toBeLessThanOrEqual(b.price.high);
    expect(b.days.low).toBeLessThanOrEqual(b.days.high);
    expect(BASE_LABELS[b.id]?.fr, `${b.id} FR`).toBeTruthy();
  });

  /**
   * THE UNDERPRICING TRIPWIRE. Day rates no longer set retail, so this is what
   * stops prices quietly sliding below what the work is worth as they are tuned.
   */
  it.each(Object.values(BASES))("$id implies a defensible day rate", (b) => {
    const rate = b.price.expected / b.days.expected;
    expect(rate, `${b.id} implies $${Math.round(rate)}/day`).toBeGreaterThanOrEqual(MIN_IMPLIED_DAY_RATE);
    // And never above the planning rate — that would mean we are charging
    // agency prices for our own efficiency.
    expect(rate, `${b.id} implies $${Math.round(rate)}/day`).toBeLessThanOrEqual(PLANNING_DAY_RATE * 1.1);
  });

  it("labels every addition and inclusion in both languages", () => {
    for (const id of Object.keys(ADDITIONS)) expect(ADDITION_LABELS[id]?.fr, id).toBeTruthy();
    for (const b of Object.values(BASES)) {
      for (const key of b.includes) expect(INCLUDE_LABELS[key], `include "${key}"`).toBeDefined();
      for (const a of b.additions) expect(ADDITIONS[a], `${b.id} → ${a}`).toBeDefined();
    }
    for (const e of estimate(inp({ base: "website_standard" })).excludes) {
      expect(EXCLUDE_LABELS[e], e).toBeDefined();
    }
  });

  /**
   * The published ladder, pinned deliberately. Approving a catalogue row is a
   * business decision with a price attached, so it should require editing a
   * test that names the price — not slip through because a boolean flipped.
   *
   * Revised 2026-08-15: hosting and the care plan were approved, a $250
   * starter SEO rung added, and content production approved at $1,200 — taking
   * the ladder from two rungs ($600–$850) to six ($40–$1,200).
   */
  it("publishes only the approved Studio prices", () => {
    expect(RECURRING.filter((r) => r.approved).map((r) => [r.id, r.monthly])).toEqual([
      ["managed-hosting", 40],
      ["website-care-plan", 150],
      ["seo-starter", 250],
      ["seo-essentials", 600],
      ["seo-advanced", 850],
      ["content-creation", 1200],
    ]);
    for (const r of RECURRING) expect(RECURRING_LABELS[r.id]?.fr, r.id).toBeTruthy();
  });

  /**
   * Every plan needs a group, because the pages file them by it. This replaced
   * an `id.startsWith("seo-")` check that would have quietly filed content
   * production — a $1,200 writing retainer — under "keeping it running".
   */
  it("groups every recurring plan", () => {
    for (const r of RECURRING) {
      expect(["care", "seo", "content"], `${r.id}`).toContain(r.group);
    }
    /* Each group a page renders must actually have something in it. */
    for (const group of ["care", "seo", "content"]) {
      expect(
        RECURRING.filter((r) => r.approved && r.group === group).length,
        `no approved plan in group "${group}" — a page section would render empty`,
      ).toBeGreaterThan(0);
    }
  });

  /** The ladder only works as an upgrade path if it actually ascends. */
  it("keeps the recurring ladder monotonic", () => {
    const approved = RECURRING.filter((r) => r.approved).map((r) => r.monthly!);
    expect(approved).toEqual([...approved].sort((a, b) => a - b));
    expect(new Set(approved).size, "two plans at the same price is not a ladder").toBe(approved.length);
  });

  /**
   * A draft row carries a candidate price the operator can see internally. The
   * engine must never hand one to a prospect — that would be quoting a price
   * StillAwake has not agreed to charge.
   */
  it("withholds every unapproved catalogue price from an estimate", () => {
    const unapproved = new Set(RECURRING.filter((r) => !r.approved).map((r) => r.id));
    for (const id of Object.keys(BASES) as BaseId[]) {
      for (const r of estimate(inp({ base: id })).recurring) {
        if (unapproved.has(r.id)) expect(r.monthly, `${id} → ${r.id}`).toBeNull();
      }
    }
  });

  it("labels and prices every one-time service in both languages", () => {
    for (const s of Object.values(ONE_TIME)) {
      expect(ONE_TIME_LABELS[s.id]?.fr, s.id).toBeTruthy();
      expect(ONE_TIME_DESCRIPTIONS[s.id]?.fr, s.id).toBeTruthy();
      /* Same tripwire as the bases: nothing may imply a giveaway day rate. */
      expect(s.price / s.days, `${s.id}`).toBeGreaterThanOrEqual(MIN_IMPLIED_DAY_RATE);
      expect(s.price / s.days, `${s.id}`).toBeLessThanOrEqual(PLANNING_DAY_RATE * 1.1);
    }
  });

  it("keeps every emergency track ordered and labelled", () => {
    for (const track of Object.values(EMERGENCY)) {
      expect(EMERGENCY_LABELS[track.id]?.fr, track.id).toBeTruthy();
      const prices = track.tiers.map((t) => t.price);
      expect(prices, `${track.id} tiers must ascend`).toEqual([...prices].sort((a, b) => a - b));
      for (const tier of track.tiers) {
        const key = `${track.id}.${tier.id}`;
        expect(EMERGENCY_LABELS[key]?.fr, key).toBeTruthy();
        expect(EMERGENCY_DESCRIPTIONS[key]?.fr, key).toBeTruthy();
        expect(tier.price / tier.days, key).toBeGreaterThanOrEqual(MIN_IMPLIED_DAY_RATE);
      }
    }
  });

  /**
   * Emergency support is the only thing sold while a client is panicking, so
   * the ecommerce track must never undercut the custom-site one for the same
   * urgency — a store outage is strictly more expensive to be wrong about.
   */
  it("prices an ecommerce emergency at or above the equivalent site emergency", () => {
    const site = EMERGENCY.custom_site.tiers.map((t) => t.price);
    const store = EMERGENCY.ecommerce.tiers.map((t) => t.price);
    expect(store.length).toBe(site.length);
    store.forEach((price, i) => expect(price).toBeGreaterThan(site[i]));
  });
});

/* ── the principles, not the numbers ─────────────────────────────────────── */

describe("a normal local business project stays normal", () => {
  /**
   * The centre of the model. A normal local-business website has to be
   * something a plumber will actually consider, so the floor matters more than
   * the ceiling here.
   */
  it("centres a full business website where a local business can reach it", () => {
    const e = estimate(inp({ base: "website_standard" }));
    expect(e.low).toBeLessThanOrEqual(2500);
    expect(e.high).toBeLessThanOrEqual(5500);
  });

  it("makes the entry floor genuinely reachable", () => {
    const e = estimate(inp({ base: "website_small" }));
    expect(e.low).toBe(MINIMUM);
    expect(MINIMUM).toBeLessThanOrEqual(1800);
  });

  /** ...but the floor must not silently absorb real scope. */
  it("never lets the entry price contain major scope", () => {
    const floor = estimate(inp({ base: "website_small" })).low;
    for (const addition of ["bookings", "payments", "custom_functionality"] as const) {
      const withScope = estimate(
        inp({
          base: "website_small",
          additions: [addition === "bookings" ? { id: addition, variant: "integrate" } : { id: addition }],
        }),
      );
      expect(withScope.low, `${addition} vanished into the floor`).toBeGreaterThan(floor);
    }
    expect(estimate(inp({ base: "website_small", seo: "local" })).low).toBeGreaterThan(floor);
  });

  /** Content is the biggest hidden variable, so it must cost something. */
  it("charges more when we write the content than when it is supplied", () => {
    const supplied = estimate(inp({ base: "website_standard" }));
    const some = estimate(inp({ base: "website_standard", additions: [{ id: "content_help" }] }));
    const all = estimate(inp({ base: "website_standard", additions: [{ id: "content_full" }] }));
    expect(some.expected).toBeGreaterThan(supplied.expected);
    expect(all.expected).toBeGreaterThan(some.expected);
    // And it must lift the ceiling more than the floor — a light pass is cheap.
    expect(all.high - supplied.high).toBeGreaterThan(all.low - supplied.low);
  });

  /** The mechanism that keeps the floor attractive. */
  it("moves the ceiling more than the floor when scope is uncertain", () => {
    const plain = estimate(inp({ base: "website_standard" }));
    const withBooking = estimate(
      inp({ base: "website_standard", additions: [{ id: "bookings", variant: "integrate" }] }),
    );
    expect(withBooking.high - plain.high).toBeGreaterThan(withBooking.low - plain.low);
  });

  it("reports internal opportunity value without publishing it", () => {
    const e = estimate(inp({ base: "website_standard" }));
    // Our efficiency shows up as a gap between what a studio would charge for
    // the effort and what we sell it for.
    expect(e.internalValue.expected).toBeGreaterThan(0);
    expect(e.internalRate).toBeLessThan(PLANNING_DAY_RATE);
  });

  it("never routes a straightforward local site to discovery", () => {
    for (const base of ["website_small", "website_standard", "website_large"] as BaseId[]) {
      const e = estimate(inp({ base, seo: "local" }));
      expect(e.needsDiscovery, base).toBe(false);
    }
  });

  it("keeps a site with the usual extras well under five figures", () => {
    // Dentist shape: site, booking integration, local search.
    const e = estimate(
      inp({ base: "website_standard", additions: [{ id: "bookings", variant: "integrate" }], seo: "local" }),
    );
    expect(e.high).toBeLessThan(10000);
  });
});

describe("complexity is additive and specific", () => {
  /** Employee count is never an input. Only work that actually happens counts. */
  it("accessibility adds a fixed amount, not a share of everything", () => {
    const small = estimate(inp({ base: "website_small", additions: [{ id: "custom_functionality" }] }));
    const plainSmall = estimate(inp({ base: "website_small" }));
    const large = estimate(inp({ base: "website_large", additions: [{ id: "accessibility" }] }));
    const plainLarge = estimate(inp({ base: "website_large" }));

    const smallDelta = small.expected - plainSmall.expected;
    const largeDelta = large.expected - plainLarge.expected;
    // A fixed addition must not scale with the size of the project it sits on.
    expect(largeDelta).toBeLessThan(3000);
    expect(smallDelta).toBeGreaterThan(0);
  });

  it("stakeholder review is proportional but small", () => {
    const plain = estimate(inp({ base: "website_large" }));
    const withReview = estimate(inp({ base: "website_large", additions: [{ id: "stakeholders" }] }));
    const ratio = withReview.expected / plain.expected;
    expect(ratio).toBeGreaterThan(1);
    expect(ratio, "review rounds must not multiply the project").toBeLessThan(1.15);
  });

  it("cannot double a project through complexity alone", () => {
    const plain = estimate(inp({ base: "website_large" }));
    const everything = estimate(
      inp({
        base: "website_large",
        additions: [
          { id: "accessibility" },
          { id: "stakeholders" },
          { id: "multi_location" },
          { id: "content_migration" },
        ],
      }),
    );
    expect(everything.expected / plain.expected, "complexity must not behave like a multiplier").toBeLessThan(1.75);
  });
});

describe("integration is not construction", () => {
  it.each(["bookings", "ordering"])("%s costs far less to connect than to build", (id) => {
    // Compared as ADDITIONS, since that is the claim — the base is common to
    // both and would dilute the ratio.
    const plain = estimate(inp({ base: "website_standard" })).expected;
    const connect =
      estimate(inp({ base: "website_standard", additions: [{ id: id as "bookings", variant: "integrate" }] }))
        .expected - plain;
    const build =
      estimate(inp({ base: "website_standard", additions: [{ id: id as "bookings", variant: "build" }] })).expected -
      plain;
    expect(build, `${id}: building must dwarf connecting`).toBeGreaterThan(connect * 5);
    // Connecting something that already works is a small addition, full stop.
    expect(connect, `${id}: connecting is configuration`).toBeLessThan(2000);
  });

  it("sends BUILDING a system to discovery, and connecting one nowhere near it", () => {
    expect(
      estimate(inp({ base: "website_standard", additions: [{ id: "ordering", variant: "integrate" }] })).needsDiscovery,
    ).toBe(false);
    const build = estimate(inp({ base: "website_standard", additions: [{ id: "ordering", variant: "build" }] }));
    expect(build.needsDiscovery).toBe(true);
    expect(build.discoveryReason).toBe("building_not_integrating");
  });

  it("prices a configured store nothing like a commerce engine", () => {
    const configured = estimate(inp({ base: "store_standard" }));
    const engine = estimate(inp({ base: "store_custom" }));
    expect(configured.needsDiscovery).toBe(false);
    expect(configured.high).toBeLessThan(12000);
    expect(engine.expected).toBeGreaterThan(configured.expected * 2.5);
    expect(engine.needsDiscovery).toBe(true);
  });

  it("refuses to average an ambiguous addition", () => {
    expect(() => estimate(inp({ base: "website_standard", additions: [{ id: "bookings" }] }))).toThrow(/needs a level/i);
  });
});

describe("software still costs what software costs", () => {
  it("prices every software base far above any website", () => {
    const biggestSite = estimate(inp({ base: "website_large", seo: "content_strategy" })).expected;
    for (const base of ["software_dashboard", "software_portal", "software_platform"] as BaseId[]) {
      expect(estimate(inp({ base })).expected, base).toBeGreaterThan(biggestSite);
    }
  });

  it("scopes portals and platforms before pricing them", () => {
    expect(estimate(inp({ base: "software_portal" })).discoveryReason).toBe("software_requirements");
    expect(estimate(inp({ base: "software_platform" })).needsDiscovery).toBe(true);
    // A dashboard is well-understood enough to quote.
    expect(estimate(inp({ base: "software_dashboard" })).needsDiscovery).toBe(false);
  });

  it("scopes anything the client says is still open", () => {
    const e = estimate(inp({ base: "website_standard", undefinedScope: true }));
    expect(e.needsDiscovery).toBe(true);
    expect(e.discoveryReason).toBe("scope_undefined");
  });

  it("gives every discovery a reason that can be shown", () => {
    for (const base of Object.keys(BASES) as BaseId[]) {
      const e = estimate(inp({ base }));
      if (e.needsDiscovery) expect(e.discoveryReason, base).toBeTruthy();
    }
  });
});

describe("the Launch product", () => {
  it("is a single published price with nothing bolted on", () => {
    const e = estimate(inp({ base: "website_small" }));
    expect(e.tier).toBe("launch");
    expect(e.low).toBe(MINIMUM);
  });

  /** A range is not a fixed price — adding anything ends the product. */
  it("stops being a product the moment anything is added", () => {
    expect(estimate(inp({ base: "website_small", seo: "local" })).tier).toBe("project");
    expect(estimate(inp({ base: "website_small", additions: [{ id: "payments" }] })).tier).toBe("project");
  });
});

describe("guardrails", () => {
  it("never quotes below the minimum", () => {
    for (const base of Object.keys(BASES) as BaseId[]) {
      expect(estimate(inp({ base })).low, base).toBeGreaterThanOrEqual(MINIMUM);
    }
  });

  it("prices identically whatever budget is stated", () => {
    const prices = (["under_5k", "5_15k", "15_50k", "50k_plus", "unsure"] as const).map(
      (budget) => estimate(inp({ base: "website_large", budget })).expected,
    );
    expect(new Set(prices).size).toBe(1);
  });

  it("says so when the work sits above the stated budget", () => {
    expect(estimate(inp({ base: "software_dashboard", budget: "under_5k" })).budgetSignal).toBe("above");
    expect(estimate(inp({ base: "website_small", budget: "50k_plus" })).budgetSignal).toBeNull();
  });

  it("widens only the top for an unknown external system", () => {
    const known = estimate(inp({ base: "website_standard", additions: [{ id: "payments" }] }));
    const unknown = estimate(inp({ base: "website_standard", additions: [{ id: "connect_internal" }] }));
    expect(unknown.caveats).toContain("unknown_external_system");
    expect(unknown.high / unknown.low).toBeGreaterThan(known.high / known.low);
  });

  it("rejects anything the model does not define", () => {
    expect(() => validateInput({ base: "free_site" })).toThrow(PricingInputError);
    expect(() => validateInput({ base: "constructor" })).toThrow(PricingInputError);
    // An addition the base does not carry.
    expect(() => validateInput({ base: "brand_refresh", additions: [{ id: "bookings" }] })).toThrow(/does not apply/i);
  });

  it("ignores injected prices and rates", () => {
    const clean = validateInput({
      base: "website_small",
      price: 1,
      discount: 0.9,
      PLANNING_DAY_RATE: 1,
      __proto__: { evil: true },
    });
    expect(clean).toEqual({
      base: "website_small",
      additions: [],
      seo: "none",
      budget: undefined,
      undefinedScope: false,
      rush: false,
    });
    expect(estimate(clean).low).toBe(MINIMUM);
  });

  it("reports the implied day rate on every estimate", () => {
    for (const base of Object.keys(BASES) as BaseId[]) {
      const e = estimate(inp({ base }));
      expect(e.internalRate, base).toBeGreaterThanOrEqual(MIN_IMPLIED_DAY_RATE);
    }
  });

  it("keeps discovery affordable — it is a product, not a barrier", () => {
    expect(DISCOVERY.from).toBeLessThanOrEqual(MINIMUM);
    expect(DISCOVERY.creditedAgainstBuild).toBe(true);
  });

  it("covers every search scope", () => {
    for (const seo of Object.keys(SEO_SCOPES)) {
      expect(() => estimate(inp({ base: "website_standard", seo: seo as "none" }))).not.toThrow();
    }
  });
});
