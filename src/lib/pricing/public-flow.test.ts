import { describe, expect, it } from "vitest";

import { estimate } from "./engine";
import { ADDONS, SERVICE_LINES } from "./model";
import { activeQuestions, isComplete, mapAnswers, sanitizeAnswers, studioTypeFor, type Answers } from "./public-flow";
import { studioHandoffUrl, studioSeed } from "./studio-handoff";

/** Answers every required question with its first option. */
function walk(picks: Answers): Answers {
  const a: Answers = { ...picks };
  for (let i = 0; i < 20; i += 1) {
    const next = activeQuestions(a).find((q) => !q.optional && a[q.id] === undefined);
    if (!next) break;
    a[next.id] = next.kind === "multi" ? [next.options[0].key] : next.options[0].key;
  }
  return a;
}

describe("the flow stays short", () => {
  it("asks 4–8 screens for a typical single-service project", () => {
    for (const id of Object.keys(SERVICE_LINES)) {
      const a = walk({ services: [id] });
      const n = activeQuestions(a).length;
      expect(n, `${id} asked ${n}`).toBeGreaterThanOrEqual(4);
      expect(n, `${id} asked ${n}`).toBeLessThanOrEqual(8);
    }
  });

  it("cannot know its own length before a service is chosen", () => {
    // The depth questions do not exist yet, so the UI withholds the total
    // rather than claiming "1 of 1".
    expect(activeQuestions({}).length).toBe(1);
    expect(activeQuestions({ services: ["website"] }).length).toBeGreaterThan(1);
  });
});

/**
 * The rule that stops this being a second onboarding: it asks about OUR work,
 * never about THEIR business. Studio owns the business questions.
 */
describe("no overlap with the Studio intake", () => {
  it("never asks about the business itself", () => {
    const ids = new Set<string>();
    for (const id of Object.keys(SERVICE_LINES)) {
      for (const q of activeQuestions(walk({ services: [id] }))) ids.add(q.id);
    }
    for (const forbidden of [
      "business_name",
      "business_does",
      "audience",
      "project_goal",
      "existing_url",
      "contact_name",
      "contact_email",
      "tone",
      "competitors",
    ]) {
      expect(ids, `flow asks "${forbidden}", which onboarding owns`).not.toContain(forbidden);
    }
  });

  it("collects no free text at all", () => {
    for (const id of Object.keys(SERVICE_LINES)) {
      for (const q of activeQuestions(walk({ services: [id] }))) {
        expect(["single", "multi"]).toContain(q.kind);
        // A one-option multi is a legitimate yes/no (SEO offers only
        // multi-location); what matters is that nothing is a text field.
        expect(q.options.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("services combine", () => {
  it("asks one depth question per selected service", () => {
    const a: Answers = { services: ["brand", "website", "seo"] };
    const ids = activeQuestions(a).map((q) => q.id);
    expect(ids).toContain("depth.brand");
    expect(ids).toContain("depth.website");
    expect(ids).toContain("depth.seo");
  });

  it("prices three services as three lines", () => {
    const a = walk({ services: ["brand", "website", "seo"] });
    const input = mapAnswers(a);
    expect(input.lines.map((l) => l.id).sort()).toEqual(["brand", "seo", "website"]);
  });

  it("drops depth answers for a service that was deselected", () => {
    const withStore = sanitizeAnswers({ services: ["website", "store"], "depth.store": "proper" });
    expect(withStore["depth.store"]).toBe("proper");
    const without = sanitizeAnswers({ services: ["website"], "depth.store": "proper" });
    expect(without["depth.store"]).toBeUndefined();
  });
});

describe("add-ons", () => {
  it("offers none on the fixed-scope product", () => {
    const a: Answers = { services: ["website"], "depth.website": "launch" };
    expect(activeQuestions(a).map((q) => q.id)).not.toContain("addons");
  });

  it("offers them once the project is custom", () => {
    const a: Answers = { services: ["website"], "depth.website": "custom" };
    expect(activeQuestions(a).map((q) => q.id)).toContain("addons");
  });

  it("asks the follow-up only for the genuinely ambiguous ones", () => {
    const a: Answers = { services: ["website"], "depth.website": "custom", addons: ["bookings"] };
    expect(activeQuestions(a).map((q) => q.id)).toContain("variant.bookings");

    const b: Answers = { services: ["website"], "depth.website": "custom", addons: ["accounts"] };
    expect(activeQuestions(b).map((q) => q.id)).not.toContain("variant.accounts");
  });

  it("attaches every add-on to a line that can actually carry it", () => {
    const a: Answers = {
      services: ["website", "store", "seo"],
      "depth.website": "custom",
      "depth.store": "proper",
      "depth.seo": "research",
      addons: Object.keys(ADDONS),
      "variant.bookings": "embedded",
      "variant.ordering": "onsite",
    };
    // The engine rejects an add-on on the wrong line, so this passing IS the
    // assertion that ownership was resolved correctly.
    expect(() => estimate(mapAnswers(a))).not.toThrow();
  });
});

describe("answer sanitising", () => {
  it("drops unknown questions and unknown options", () => {
    const clean = sanitizeAnswers({
      services: ["website", "free_everything"],
      "depth.website": "gratis",
      discount: "100",
      price: 1,
    });
    expect(clean).toEqual({ services: ["website"] });
  });

  it("rejects the wrong shape for a question's kind", () => {
    expect(sanitizeAnswers({ services: "website" })).toEqual({});
    expect(sanitizeAnswers({ services: ["website"], "depth.website": ["custom"] })).toEqual({
      services: ["website"],
    });
  });

  it("returns nothing for non-object input", () => {
    for (const bad of [null, "x", 5, [], undefined]) expect(sanitizeAnswers(bad)).toEqual({});
  });
});

describe("mapping", () => {
  it("only ever produces lines, depths and add-ons the model defines", () => {
    for (const id of Object.keys(SERVICE_LINES)) {
      // Maximal answers for the branch.
      const a: Answers = { services: [id] };
      for (let i = 0; i < 20; i += 1) {
        const next = activeQuestions(a).find((q) => a[q.id] === undefined);
        if (!next) break;
        a[next.id] = next.kind === "multi" ? next.options.map((o) => o.key) : next.options[next.options.length - 1].key;
      }
      expect(isComplete(a), id).toBe(true);
      expect(() => estimate(mapAnswers(a)), id).not.toThrow();
    }
  });

  it("treats something they cannot describe as uncertainty", () => {
    const a: Answers = {
      services: ["website"],
      "depth.website": "custom",
      addons: ["custom_functionality"],
      timing: "flexible",
    };
    expect(mapAnswers(a).undefinedScope).toBe(true);
  });

  it("carries a hard deadline through as rush", () => {
    expect(mapAnswers(walk({ services: ["website"], timing: "urgent" })).rush).toBe(true);
  });

  it("passes budget through without it touching the price", () => {
    const base = walk({ services: ["website"], "depth.website": "custom" });
    const withBudget = { ...base, budget: "under_5k" };
    expect(estimate(mapAnswers(base)).expected).toBe(estimate(mapAnswers(withBudget)).expected);
    expect(estimate(mapAnswers(withBudget)).budgetSignal).toBe("above");
  });
});

describe("studio hand-off", () => {
  const accepted = ["website", "ecommerce", "web_app", "saas", "mobile_app", "ai_system", "brand_experience", "other"];

  it("only emits a project type the Studio intake accepts", () => {
    for (const id of Object.keys(SERVICE_LINES)) {
      const input = mapAnswers(walk({ services: [id] }));
      expect(accepted, id).toContain(studioTypeFor(input.lines));
    }
  });

  it("picks the heaviest line when several are selected", () => {
    const input = mapAnswers(walk({ services: ["website", "software"] }));
    expect(studioTypeFor(input.lines)).toBe("web_app");
  });

  it("only seeds keys Studio's discovery defines", () => {
    const vocab: Record<string, string[]> = {
      project_type: accepted,
      new_or_existing: ["new", "existing", "rebuild"],
      pages_scale: ["1_5", "5_15", "15_50", "50_plus", "unsure"],
      site_features: ["cms", "blog", "multilingual", "seo", "local_seo", "customer_login", "forms"],
    };
    for (const id of Object.keys(SERVICE_LINES)) {
      const a = walk({ services: [id] });
      const input = mapAnswers(a);
      const e = estimate(input);
      const seed = studioSeed({ answers: a, input, low: e.low, high: e.high, pricingVersion: e.pricingVersion, locale: "en" });
      for (const [key, value] of Object.entries(seed)) {
        expect(vocab[key], `${id}: unexpected seed key "${key}"`).toBeDefined();
        for (const v of Array.isArray(value) ? value : [value]) {
          expect(vocab[key], `${id}: "${key}" emitted "${v}"`).toContain(v);
        }
      }
    }
  });

  /** Studio's budget question asks what the CLIENT has in mind, not what we think. */
  it("never answers Studio's budget question on the client's behalf", () => {
    const a = walk({ services: ["website"] });
    const input = mapAnswers(a);
    const e = estimate(input);
    const seed = studioSeed({ answers: a, input, low: e.low, high: e.high, pricingVersion: e.pricingVersion, locale: "en" });
    expect(seed.budget).toBeUndefined();
  });

  it("puts nothing personal in the hand-off URL", () => {
    const a = walk({ services: ["website"] });
    const input = mapAnswers(a);
    const e = estimate(input);
    const url = studioHandoffUrl({ answers: a, input, low: e.low, high: e.high, pricingVersion: e.pricingVersion, locale: "en" });
    expect(url).not.toMatch(/name=|email=|@/);
    expect(new URL(url).searchParams.get("sa_est")).toBe(`${e.low}-${e.high}`);
    expect(url.length).toBeLessThan(2000);
  });

  it("sends French visitors to the French intake", () => {
    const a = walk({ services: ["website"] });
    const input = mapAnswers(a);
    const e = estimate(input);
    const url = studioHandoffUrl({ answers: a, input, low: e.low, high: e.high, pricingVersion: e.pricingVersion, locale: "fr" });
    expect(new URL(url).pathname).toBe("/fr/demarrer");
  });
});

describe("the counter does not move while you answer", () => {
  /**
   * The tail (organisation, timing, budget) does not depend on depth, so it is
   * present as soon as the services are known. Gating it made the total jump
   * from "2 of 2" to "3 of 6", which reads as the form growing as you fill it.
   */
  it("knows its length as soon as the services are chosen", () => {
    const before = activeQuestions({ services: ["website"] }).length;
    const after = activeQuestions({ services: ["website"], "depth.website": "launch" }).length;
    expect(after).toBe(before);
  });

  it("only grows when an answer genuinely unlocks add-ons", () => {
    // Launch is fixed-scope and offers none; custom does.
    const launch = activeQuestions({ services: ["website"], "depth.website": "launch" }).length;
    const custom = activeQuestions({ services: ["website"], "depth.website": "custom" }).length;
    expect(custom).toBe(launch + 1);
  });
});
