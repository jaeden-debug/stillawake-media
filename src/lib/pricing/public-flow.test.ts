import { describe, expect, it } from "vitest";

import { estimate } from "./engine";
import { CAPABILITY_BY_ID, FOUNDATIONS } from "./model";
import {
  QUESTIONS,
  activeQuestions,
  branchOf,
  isComplete,
  mapAnswers,
  sanitizeAnswers,
  studioTypeFor,
  type Answers,
} from "./public-flow";

/** Answers a flow all the way through by taking the given picks, then defaults. */
function answer(picks: Answers): Answers {
  const a: Answers = { ...picks };
  for (let i = 0; i < 12; i += 1) {
    const next = activeQuestions(a).find((q) => !q.optional && a[q.id] === undefined);
    if (!next) break;
    a[next.id] = next.kind === "multi" ? [next.options[0].key] : next.options[0].key;
  }
  return a;
}

describe("question flow", () => {
  it("has unique question and option ids", () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of QUESTIONS) {
      const keys = q.options.map((o) => o.key);
      expect(new Set(keys).size, q.id).toBe(keys.length);
      expect(keys.length, q.id).toBeGreaterThan(1);
    }
  });

  /** Phase 8: a normal business owner should not face 40 checkboxes. */
  it("keeps a typical path to 5–8 questions", () => {
    for (const goal of ["website", "redesign", "sell", "seo", "automate", "software"]) {
      const a = answer({ goal });
      const count = activeQuestions(a).length;
      expect(count, `${goal} asked ${count} questions`).toBeGreaterThanOrEqual(4);
      expect(count, `${goal} asked ${count} questions`).toBeLessThanOrEqual(8);
    }
  });

  it("never shows a question from another branch", () => {
    const website = activeQuestions(answer({ goal: "website" })).map((q) => q.id);
    expect(website).toContain("site_kind");
    expect(website).not.toContain("who_uses");
    expect(website).not.toContain("automate_what");

    const software = activeQuestions(answer({ goal: "software" })).map((q) => q.id);
    expect(software).toContain("who_uses");
    expect(software).not.toContain("site_kind");
    // Page count is meaningless for software and must not be asked.
    expect(software).not.toContain("size");
  });

  it("asks the follow-up only when the answer is genuinely ambiguous", () => {
    const withBooking = answer({ goal: "website", needs: ["bookings"] });
    expect(activeQuestions(withBooking).map((q) => q.id)).toContain("booking_depth");

    const without = answer({ goal: "website", needs: ["self_edit"] });
    expect(activeQuestions(without).map((q) => q.id)).not.toContain("booking_depth");
  });
});

/** Phase 9: "not sure" must reach a real estimate, not a dead end. */
describe("not sure", () => {
  it("resolves a branch from the outcome instead of the technology", () => {
    expect(branchOf({ goal: "not_sure", outcome: "buy_from_us" })).toBe("sell");
    expect(branchOf({ goal: "not_sure", outcome: "stop_manual_work" })).toBe("automate");
    expect(branchOf({ goal: "not_sure", outcome: "found_on_google" })).toBe("seo");
  });

  it("prices the restaurant owner who only knows they want online orders", () => {
    const a = answer({
      goal: "not_sure",
      outcome: "buy_from_us",
      sell_what: "physical",
      catalogue: "few",
    });
    expect(isComplete(a)).toBe(true);
    const input = mapAnswers(a);
    expect(input.foundation).toBe("ecommerce");
    const e = estimate(input);
    expect(e.low).toBeGreaterThanOrEqual(FOUNDATIONS.ecommerce.floor);
  });

  it("asks the outcome question only after 'not sure'", () => {
    expect(activeQuestions({ goal: "website" }).map((q) => q.id)).not.toContain("outcome");
    expect(activeQuestions({ goal: "not_sure" }).map((q) => q.id)).toContain("outcome");
  });
});

describe("answer sanitising", () => {
  it("drops unknown questions and unknown options", () => {
    const clean = sanitizeAnswers({
      goal: "website",
      discount: "100",
      price: 1,
      site_kind: "free_tier",
      needs: ["self_edit", "free_everything"],
      __proto__: { goal: "seo" },
    });
    expect(clean).toEqual({ goal: "website", needs: ["self_edit"] });
  });

  it("rejects an array sent to a single-choice question", () => {
    expect(sanitizeAnswers({ goal: ["website", "sell"] })).toEqual({});
  });

  it("rejects a string sent to a multi-choice question", () => {
    expect(sanitizeAnswers({ goal: "website", needs: "bookings" })).toEqual({ goal: "website" });
  });

  it("deduplicates repeated selections", () => {
    const clean = sanitizeAnswers({ goal: "website", needs: ["blog", "blog", "blog"] });
    expect(clean.needs).toEqual(["blog"]);
  });

  it("returns nothing for non-object input", () => {
    for (const bad of [null, "x", 5, [], undefined]) expect(sanitizeAnswers(bad)).toEqual({});
  });
});

describe("mapping to model input", () => {
  it("only ever produces capabilities the model defines", () => {
    const goals = ["website", "redesign", "sell", "seo", "automate", "software"];
    for (const goal of goals) {
      // Select everything on every multi question — the maximal scope for the branch.
      const a: Answers = { goal };
      for (let i = 0; i < 12; i += 1) {
        const next = activeQuestions(a).find((q) => a[q.id] === undefined);
        if (!next) break;
        a[next.id] =
          next.kind === "multi" ? next.options.map((o) => o.key) : next.options[next.options.length - 1].key;
      }
      const input = mapAnswers(a);
      expect(FOUNDATIONS[input.foundation], `${goal} foundation`).toBeDefined();
      for (const c of input.capabilities) {
        const spec = CAPABILITY_BY_ID[c.id];
        expect(spec, `${goal} → ${c.id}`).toBeDefined();
        expect(spec.allowed, `${goal} → ${c.id} @ ${c.complexity}`).toContain(c.complexity);
      }
      // And the result must actually price.
      expect(() => estimate(input)).not.toThrow();
    }
  });

  it("routes each goal to the right foundation", () => {
    expect(mapAnswers(answer({ goal: "website" })).foundation).toBe("marketing_site");
    expect(mapAnswers(answer({ goal: "redesign" })).foundation).toBe("website_redesign");
    expect(mapAnswers(answer({ goal: "sell" })).foundation).toBe("ecommerce");
    expect(mapAnswers(answer({ goal: "automate" })).foundation).toBe("ai_automation");
  });

  it("sends an internal tool to a portal and a signup product to an application", () => {
    expect(mapAnswers(answer({ goal: "software", who_uses: "team" })).foundation).toBe("business_portal");
    expect(mapAnswers(answer({ goal: "software", who_uses: "public" })).foundation).toBe(
      "custom_application",
    );
  });

  it("sells a site to someone who wants SEO but has no website", () => {
    expect(mapAnswers(answer({ goal: "seo", has_site: "no" })).foundation).toBe("marketing_site");
    expect(mapAnswers(answer({ goal: "seo", has_site: "yes" })).foundation).toBe("seo_engagement");
  });

  it("reads the follow-up rather than averaging the three bookings", () => {
    const price = (depth: string) =>
      estimate(mapAnswers(answer({ goal: "website", needs: ["bookings"], booking_depth: depth }))).high;
    expect(price("link")).toBeLessThan(price("embedded"));
    expect(price("embedded")).toBeLessThan(price("custom"));
  });

  it("reads the follow-up for ordering too", () => {
    const price = (depth: string) =>
      estimate(mapAnswers(answer({ goal: "website", needs: ["ordering"], ordering_depth: depth }))).high;
    expect(price("link")).toBeLessThan(price("onsite"));
    expect(price("onsite")).toBeLessThan(price("full"));
  });

  it("never leaves page count applied after a branch change", () => {
    // A stale `size` from an abandoned website branch must not inflate software.
    const input = mapAnswers({ goal: "software", who_uses: "team", size: "xl", clarity: "clear", timing: "flexible" });
    expect(input.scope).toBe("small");
  });

  it("treats an unknown internal system as uncertainty, not as effort", () => {
    const input = mapAnswers(answer({ goal: "automate", connects_to: "unknown" }));
    expect(input.undefinedScope).toBe(true);
    const internal = mapAnswers(answer({ goal: "automate", connects_to: "internal" }));
    expect(internal.capabilities.some((c) => c.id === "legacy_system")).toBe(true);
    expect(estimate(internal).caveats).toContain("unknown_external_system");
  });

  it("carries a hard deadline through as rush", () => {
    expect(mapAnswers(answer({ goal: "website", timing: "urgent" })).rush).toBe(true);
    expect(mapAnswers(answer({ goal: "website", timing: "flexible" })).rush).toBe(false);
  });

  it("maps bilingual from plain-language answers on every branch that offers it", () => {
    expect(mapAnswers(answer({ goal: "website", needs: ["bilingual"] })).bilingual).toBe(true);
    expect(mapAnswers(answer({ goal: "sell", store_needs: ["bilingual"] })).bilingual).toBe(true);
    expect(mapAnswers(answer({ goal: "software", software_needs: ["bilingual"] })).bilingual).toBe(true);
    expect(mapAnswers(answer({ goal: "seo", seo_needs: ["bilingual"] })).bilingual).toBe(true);
  });
});

describe("studio hand-off", () => {
  it("only emits project types the Studio intake accepts", () => {
    // Mirrors PROJECT_TYPE_OPTIONS in stillawake.studio/src/lib/discovery.ts.
    const accepted = [
      "website",
      "ecommerce",
      "web_app",
      "saas",
      "mobile_app",
      "ai_system",
      "brand_experience",
      "other",
    ];
    for (const id of Object.keys(FOUNDATIONS)) {
      expect(accepted, id).toContain(studioTypeFor(id as never));
    }
  });
});

describe("every reachable path prices", () => {
  it("produces a valid estimate for both the minimal and maximal answer on each goal", () => {
    for (const goal of ["website", "redesign", "sell", "seo", "automate", "software", "not_sure"]) {
      for (const maximal of [false, true]) {
        const a: Answers = { goal };
        if (goal === "not_sure") a.outcome = "look_credible";
        for (let i = 0; i < 12; i += 1) {
          const next = activeQuestions(a).find((q) => a[q.id] === undefined);
          if (!next) break;
          a[next.id] = maximal
            ? next.kind === "multi"
              ? next.options.map((o) => o.key)
              : next.options[next.options.length - 1].key
            : next.kind === "multi"
              // A required multi has to pick something — the UI blocks
              // advancing past one with nothing selected.
              ? (next.optional ? [] : [next.options[0].key])
              : next.options[0].key;
        }
        expect(isComplete(a), `${goal} ${maximal ? "maximal" : "minimal"}`).toBe(true);
        const e = estimate(mapAnswers(a));
        expect(e.low, `${goal} ${maximal}`).toBeGreaterThan(0);
        expect(e.high, `${goal} ${maximal}`).toBeGreaterThan(e.low);
        expect(e.high, `${goal} ${maximal}`).toBeLessThan(250000);
      }
    }
  });
});
