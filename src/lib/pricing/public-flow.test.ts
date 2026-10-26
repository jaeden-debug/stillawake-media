import { describe, expect, it } from "vitest";

import { estimate } from "./engine";
import { BASES } from "./model";
import { activeQuestions, goalOf, isComplete, mapAnswers, sanitizeAnswers, studioTypeFor, type Answers } from "./public-flow";

const walk = (picks: Answers): Answers => {
  const a: Answers = { ...picks };
  for (let i = 0; i < 12; i += 1) {
    const next = activeQuestions(a).find((q) => !q.optional && a[q.id] === undefined);
    if (!next) break;
    a[next.id] = next.kind === "multi" ? [next.options[0].key] : next.options[0].key;
  }
  return a;
};

const GOALS = ["new_website", "redesign", "store", "seo", "brand", "software", "automation"];

describe("the flow is short and plain", () => {
  it.each(GOALS)("%s asks 3–6 questions", (goal) => {
    const n = activeQuestions(walk({ goal })).length;
    expect(n, `${goal} asked ${n}`).toBeGreaterThanOrEqual(3);
    expect(n, `${goal} asked ${n}`).toBeLessThanOrEqual(6);
  });

  it("never asks how big the company is", () => {
    const ids = new Set<string>();
    const text: string[] = [];
    for (const goal of GOALS) {
      for (const q of activeQuestions(walk({ goal }))) {
        ids.add(q.id);
        text.push(q.prompt.en, ...q.options.map((o) => o.label.en));
      }
    }
    for (const banned of ["employees", "staff", "headcount", "company size", "how many people"]) {
      expect(text.join(" ").toLowerCase(), `flow mentions "${banned}"`).not.toContain(banned);
    }
  });

  /** The rule that stops this being a second onboarding. */
  it("asks nothing the Studio intake owns", () => {
    const ids = new Set<string>();
    for (const goal of GOALS) for (const q of activeQuestions(walk({ goal }))) ids.add(q.id);
    for (const owned of ["business_name", "business_does", "audience", "project_goal", "contact_email", "existing_url"]) {
      expect(ids, `flow asks "${owned}"`).not.toContain(owned);
    }
  });

  it("collects no free text", () => {
    for (const goal of GOALS) {
      for (const q of activeQuestions(walk({ goal }))) expect(["single", "multi"]).toContain(q.kind);
    }
  });
});

describe("not sure works", () => {
  it("resolves the goal from the outcome, never from technology", () => {
    expect(goalOf({ goal: "not_sure", outcome: "sell_online" })).toBe("store");
    expect(goalOf({ goal: "not_sure", outcome: "found_on_google" })).toBe("seo");
    expect(goalOf({ goal: "not_sure", outcome: "look_credible" })).toBe("new_website");
  });

  it("reaches a real estimate", () => {
    const a = walk({ goal: "not_sure", outcome: "look_credible" });
    expect(isComplete(a)).toBe(true);
    expect(estimate(mapAnswers(a)).low).toBeGreaterThan(0);
  });
});

describe("the integrate-or-build follow-up", () => {
  it("appears only when the word is ambiguous", () => {
    const withBookings = activeQuestions({ goal: "new_website", needs: ["bookings"] }).map((q) => q.id);
    expect(withBookings).toContain("how.bookings");
    const withLeads = activeQuestions({ goal: "new_website", needs: ["leads"] }).map((q) => q.id);
    expect(withLeads).not.toContain("how.bookings");
  });

  it("defaults to connecting, never to building", () => {
    // If we somehow failed to ask clearly, we must not quote the expensive one.
    const input = mapAnswers({ goal: "new_website", needs: ["ordering"], size: "standard" });
    expect(input.additions?.find((x) => x.id === "ordering")?.variant).toBe("integrate");
  });
});

describe("mapping", () => {
  it("only ever produces bases and additions the model defines", () => {
    for (const goal of GOALS) {
      const a: Answers = { goal };
      for (let i = 0; i < 12; i += 1) {
        const next = activeQuestions(a).find((q) => a[q.id] === undefined);
        if (!next) break;
        a[next.id] = next.kind === "multi" ? next.options.map((o) => o.key) : next.options[next.options.length - 1].key;
      }
      const input = mapAnswers(a);
      expect(BASES[input.base], `${goal} base`).toBeDefined();
      expect(() => estimate(input), goal).not.toThrow();
    }
  });

  it("always moves content on a redesign, whether or not they said so", () => {
    const input = mapAnswers({ goal: "redesign", size: "standard" });
    expect(input.additions?.some((x) => x.id === "content_migration")).toBe(true);
  });

  it("treats 'not sure' about size as the standard build, not the biggest", () => {
    expect(mapAnswers({ goal: "new_website", size: "unsure" }).base).toBe("website_standard");
  });

  it("lifts a five-page site to a real build when they want to sell", () => {
    expect(mapAnswers({ goal: "new_website", size: "small", needs: ["sell"] }).base).toBe("website_standard");
  });
});

describe("sanitising", () => {
  it("drops unknown questions and options", () => {
    expect(sanitizeAnswers({ goal: "new_website", size: "gratis", discount: "100" })).toEqual({ goal: "new_website" });
  });
  it("rejects the wrong shape", () => {
    expect(sanitizeAnswers({ goal: ["new_website"] })).toEqual({});
  });
  it("returns nothing for non-objects", () => {
    for (const bad of [null, "x", 5, [], undefined]) expect(sanitizeAnswers(bad)).toEqual({});
  });
});

describe("studio hand-off", () => {
  it("only emits a project type Studio accepts", () => {
    const accepted = ["website", "ecommerce", "web_app", "saas", "mobile_app", "ai_system", "brand_experience", "other"];
    for (const base of Object.keys(BASES)) expect(accepted, base).toContain(studioTypeFor(base as never));
  });
});
