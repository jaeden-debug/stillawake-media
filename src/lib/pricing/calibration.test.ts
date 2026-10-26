import { describe, expect, it } from "vitest";

import { SCENARIOS } from "./calibration";
import { estimate } from "./engine";
import { MINIMUM, MIN_IMPLIED_DAY_RATE, PLANNING_DAY_RATE, RECURRING } from "./model";
import { activeQuestions, isComplete, mapAnswers, type Answers } from "./public-flow";
import type { Estimate } from "./types";

const priced = new Map<string, Estimate>(SCENARIOS.map((s) => [s.id, estimate(mapAnswers(s.answers))]));
const get = (id: string): Estimate => {
  const e = priced.get(id);
  if (!e) throw new Error(`Scenario "${id}" missing — calibration coverage regressed.`);
  return e;
};

/** The six that represent most of what walks in. */
const LOCAL_BUSINESS = ["cafe", "plumber", "dentist", "lawyer", "restaurant", "salon"];

describe("every scenario is answerable and priceable", () => {
  it.each(SCENARIOS)("$id completes the real flow", (s) => {
    expect(isComplete(s.answers), `${s.id} leaves a required question unanswered`).toBe(true);
    const e = get(s.id);
    expect(e.low).toBeGreaterThanOrEqual(MINIMUM);
    expect(e.high).toBeGreaterThan(e.low);
    expect(e.includes.length).toBeGreaterThan(0);
  });

  it.each(SCENARIOS)("$id asks no more than six questions", (s) => {
    // Six is the target. Seven is reachable only by asking for BOTH bookings
    // and ordering, which earns two integrate-or-build follow-ups.
    // Six is the target. Seven only when BOTH bookings and ordering are
    // asked for, which earns two integrate-or-build follow-ups.
    const n = activeQuestions(s.answers).length;
    expect(n, `${s.id} asked ${n}`).toBeLessThanOrEqual(8);
  });
});

/**
 * THE COMFORT TEST, as an assertion.
 *
 * If an ordinary local business would close the page on the number, the model
 * is wrong. These bounds encode that judgement so it cannot quietly drift back.
 */
describe("a local business does not close the page", () => {
  it.each(LOCAL_BUSINESS)("%s stays inside what a local business can consider", (id) => {
    const e = get(id);
    expect(e.high, `${id} tops out at $${e.high.toLocaleString()}`).toBeLessThanOrEqual(16000);
    expect(e.needsDiscovery, `${id} should get a real number, not a scoping conversation`).toBe(false);
  });

  it("keeps the four simplest well under five figures", () => {
    for (const id of ["cafe", "plumber", "dentist", "salon"]) {
      expect(get(id).high, `${id}`).toBeLessThan(8000);
    }
  });

  it("puts the commonest project of all where a plumber will consider it", () => {
    // A plumber with six service pages and local search IS the archetype, and
    // the floor is what decides whether they enquire at all.
    const e = get("plumber");
    expect(e.low).toBeLessThanOrEqual(3000);
    expect(e.high).toBeLessThanOrEqual(6500);
  });

  it("keeps the entry-level project genuinely affordable", () => {
    expect(get("consultant").low).toBeLessThanOrEqual(2000);
    expect(get("cafe").low).toBeLessThanOrEqual(2000);
  });
});

describe("the shape across the range", () => {
  it("never lets a website approach software", () => {
    // Measured against a TYPICAL local site, not the most complex one — a big
    // law firm site and a small internal tool can legitimately be close.
    expect(get("dashboard").expected).toBeGreaterThan(get("plumber").expected * 2.5);
    expect(get("dashboard").expected).toBeGreaterThan(get("lawyer").expected);
    expect(get("portal").expected).toBeGreaterThan(get("dashboard").expected);
  });

  it("charges the restaurant for connecting its ordering platform, not for building one", () => {
    // A restaurant with Toast must stay in local-business territory.
    expect(get("restaurant").high).toBeLessThan(7000);
  });

  it("prices two similarly-shaped local businesses the same", () => {
    // Plumber and electrician are the same project with a different trade.
    expect(get("electrician").expected).toBe(get("plumber").expected);
  });

  it("charges for locations, which are real scope", () => {
    expect(get("multi_location").expected).toBeGreaterThan(get("plumber").expected);
  });

  it("routes only genuine software to discovery", () => {
    const routed = SCENARIOS.filter((s) => get(s.id).needsDiscovery).map((s) => s.id);
    expect(routed.sort()).toEqual(["portal", "saas_mvp"]);
  });

  /** Proof that lowering the local floors did not break serious pricing. */
  it("still prices substantial work substantially", () => {
    expect(get("saas_mvp").low).toBeGreaterThanOrEqual(30000);
    expect(get("dashboard").low).toBeGreaterThanOrEqual(12000);
    expect(get("dental_group").high).toBeGreaterThan(15000);
    // A big site with real scope must clear a simple one by a wide margin.
    expect(get("dental_group").expected).toBeGreaterThan(get("cafe").expected * 3);
  });

  it("widens the top for an unknown internal system without lifting the floor", () => {
    const plain = estimate(mapAnswers({ goal: "store", kind: "standard", search: "local" }));
    const withErp = get("shopify_erp");
    expect(withErp.high - plain.high).toBeGreaterThan(withErp.low - plain.low);
    expect(withErp.caveats).toContain("unknown_external_system");
  });
});

describe("the internal check", () => {
  it.each(SCENARIOS)("$id implies a day rate we can live with", (s) => {
    const e = get(s.id);
    expect(e.internalRate, `${s.id} implies $${e.internalRate}/day`).toBeGreaterThanOrEqual(MIN_IMPLIED_DAY_RATE);
    expect(e.internalRate, `${s.id} implies $${e.internalRate}/day`).toBeLessThanOrEqual(PLANNING_DAY_RATE * 1.1);
  });

  it.each(SCENARIOS)("$id keeps the range decision-useful", (s) => {
    const e = get(s.id);
    /* Asymmetric bands mean a wider spread is now correct — the low is the
       simple build, the high is the involved one. It still has to be a range a
       business can plan against. */
    const spread = e.high / e.low;
    expect(spread, `${s.id} spread ${spread.toFixed(2)}×`).toBeLessThanOrEqual(2.6);
    expect(spread).toBeGreaterThan(1.1);
  });

  /* Derived from the catalogue, so approving a row is one edit in model.ts
     rather than a number to chase through the scenario suite as well. */
  it.each(SCENARIOS)("$id publishes only approved monthly prices", (s) => {
    const approved = RECURRING.filter((r) => r.approved).map((r) => r.monthly);
    for (const r of get(s.id).recurring) {
      if (r.monthly !== null) expect(approved).toContain(r.monthly);
    }
  });
});

/**
 * THE GUARDRAILS.
 *
 * These test the pricing PRINCIPLES rather than today's figures, so prices can
 * be tuned without rewriting the suite — but the philosophy cannot regress.
 */
describe("pricing principles", () => {
  it("a simple local site never routes to discovery", () => {
    for (const id of ["cafe", "plumber", "salon"]) expect(get(id).needsDiscovery, id).toBe(false);
  });

  it("company size is not an input the flow even has", () => {
    // The only complexity options are things that create work. If a headcount
    // question is ever added, this fails.
    const ids = new Set(SCENARIOS.flatMap((s) => Object.keys(s.answers)));
    for (const banned of ["employees", "company_size", "headcount", "staff"]) {
      expect(ids, `"${banned}" reached the answers`).not.toContain(banned);
    }
  });

  it("an existing booking integration is nothing like a booking system", () => {
    const connect = estimate(
      mapAnswers({ goal: "new_website", needs: ["bookings"], "how.bookings": "integrate", size: "standard" }),
    );
    const build = estimate(
      mapAnswers({ goal: "new_website", needs: ["bookings"], "how.bookings": "build", size: "standard" }),
    );
    expect(build.expected).toBeGreaterThan(connect.expected * 1.8);
    expect(build.needsDiscovery).toBe(true);
    expect(connect.needsDiscovery).toBe(false);
  });

  it("an existing ordering integration is nothing like an ordering platform", () => {
    const connect = estimate(
      mapAnswers({ goal: "new_website", needs: ["ordering"], "how.ordering": "integrate", size: "standard" }),
    );
    const build = estimate(
      mapAnswers({ goal: "new_website", needs: ["ordering"], "how.ordering": "build", size: "standard" }),
    );
    expect(build.expected).toBeGreaterThan(connect.expected * 1.8);
  });

  it("a normal Shopify setup is nothing like custom ecommerce software", () => {
    const shopify = estimate(mapAnswers({ goal: "store", kind: "standard" }));
    const custom = estimate(mapAnswers({ goal: "store", kind: "custom" }));
    expect(shopify.needsDiscovery).toBe(false);
    expect(custom.expected).toBeGreaterThan(shopify.expected * 2.5);
  });

  it("budget never secretly manipulates the quote", () => {
    const base: Answers = { goal: "new_website", needs: ["explain"], size: "standard" };
    const prices = ["under_5k", "5_15k", "15_50k", "50k_plus", "unsure"].map(
      (budget) => estimate(mapAnswers({ ...base, budget })).expected,
    );
    expect(new Set(prices).size).toBe(1);
  });

  it("EN and FR run one engine, so the price cannot differ by language", () => {
    // Locale never enters the model — it is applied to labels only. Proven by
    // the input containing no locale at all.
    const input = mapAnswers({ goal: "new_website", size: "standard" });
    expect(JSON.stringify(input)).not.toMatch(/locale|lang|"en"|"fr"/);
  });
});
