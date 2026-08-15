import { describe, expect, it } from "vitest";

import { estimate } from "./engine";
import { activeQuestions, mapAnswers, type Answers } from "./public-flow";
import { studioHandoffUrl, studioSeed } from "./studio-handoff";

/**
 * The hand-off contract.
 *
 * These keys and option values must match stillawake.studio's
 * `src/lib/discovery.ts`. Studio validates against that file and silently
 * drops anything it does not recognise — a safe failure, but a silent one, so
 * this test pins the vocabulary from our side. If Studio's discovery changes,
 * these literals are the tripwire.
 */

const STUDIO_VOCAB = {
  project_type: ["website", "ecommerce", "web_app", "saas", "mobile_app", "ai_system", "brand_experience", "other"],
  new_or_existing: ["new", "existing", "rebuild"],
  pages_scale: ["1_5", "5_15", "15_50", "50_plus", "unsure"],
  site_features: ["cms", "blog", "multilingual", "seo", "local_seo", "customer_login", "forms"],
};

function answer(picks: Answers): Answers {
  const a: Answers = { ...picks };
  for (let i = 0; i < 12; i += 1) {
    const next = activeQuestions(a).find((q) => !q.optional && a[q.id] === undefined);
    if (!next) break;
    a[next.id] = next.kind === "multi" ? [next.options[0].key] : next.options[0].key;
  }
  return a;
}

function ctxFor(answers: Answers) {
  const input = mapAnswers(answers);
  const e = estimate(input);
  return { answers, input, low: e.low, high: e.high, pricingVersion: e.pricingVersion, locale: "en" as const };
}

describe("studio seed vocabulary", () => {
  it("only emits keys and values Studio's discovery defines", () => {
    const goals = ["website", "redesign", "sell", "seo", "automate", "software"];
    for (const goal of goals) {
      // Maximal answers — the widest seed the branch can produce.
      const a: Answers = { goal };
      for (let i = 0; i < 12; i += 1) {
        const next = activeQuestions(a).find((q) => a[q.id] === undefined);
        if (!next) break;
        a[next.id] =
          next.kind === "multi" ? next.options.map((o) => o.key) : next.options[next.options.length - 1].key;
      }
      const seed = studioSeed(ctxFor(a));

      for (const [key, value] of Object.entries(seed)) {
        if (key === "languages") {
          expect(typeof value).toBe("string");
          expect((value as string).length).toBeLessThanOrEqual(120);
          continue;
        }
        const allowed = STUDIO_VOCAB[key as keyof typeof STUDIO_VOCAB];
        expect(allowed, `${goal}: unexpected seed key "${key}"`).toBeDefined();
        for (const v of Array.isArray(value) ? value : [value]) {
          expect(allowed, `${goal}: "${key}" emitted "${v}"`).toContain(v);
        }
      }
    }
  });

  it("always carries the project type", () => {
    for (const goal of ["website", "redesign", "sell", "seo", "automate", "software"]) {
      expect(studioSeed(ctxFor(answer({ goal }))).project_type).toBeTruthy();
    }
  });

  it("tells Studio a redesign is a rebuild, not a new project", () => {
    expect(studioSeed(ctxFor(answer({ goal: "redesign" }))).new_or_existing).toBe("rebuild");
    expect(studioSeed(ctxFor(answer({ goal: "website" }))).new_or_existing).toBe("new");
    expect(studioSeed(ctxFor(answer({ goal: "seo", has_site: "yes" }))).new_or_existing).toBe("existing");
  });

  it("does not send a page count where Studio does not ask for one", () => {
    expect(studioSeed(ctxFor(answer({ goal: "software" }))).pages_scale).toBeUndefined();
    expect(studioSeed(ctxFor(answer({ goal: "automate" }))).pages_scale).toBeUndefined();
    expect(studioSeed(ctxFor(answer({ goal: "website", size: "xl" }))).pages_scale).toBe("50_plus");
  });

  it("carries what they said the site needs", () => {
    const seed = studioSeed(
      ctxFor(answer({ goal: "website", needs: ["self_edit", "blog", "bilingual", "accounts"] })),
    );
    expect(seed.site_features).toEqual(expect.arrayContaining(["cms", "blog", "multilingual", "customer_login"]));
    expect(seed.languages).toBe("English and French");
  });

  it("marks a restaurant as needing local visibility", () => {
    const seed = studioSeed(ctxFor(answer({ goal: "website", site_kind: "local" })));
    expect(seed.site_features).toContain("local_seo");
  });

  /**
   * The deliberate omission. Studio's `budget` asks what the CLIENT has in
   * mind; seeding it with our estimate would show our own number back to us as
   * though they had said it.
   */
  it("never answers Studio's budget question on the client's behalf", () => {
    for (const goal of ["website", "sell", "software"]) {
      expect(studioSeed(ctxFor(answer({ goal }))).budget).toBeUndefined();
    }
  });

  it("never seeds free-form questions the calculator cannot know", () => {
    const seed = studioSeed(ctxFor(answer({ goal: "website" })));
    for (const key of ["business_name", "business_does", "project_goal", "audience", "must_do"]) {
      expect(seed[key]).toBeUndefined();
    }
  });
});

describe("handoff url", () => {
  it("keeps the legacy type param so an older Studio deploy still works", () => {
    const url = new URL(studioHandoffUrl(ctxFor(answer({ goal: "sell" }))));
    expect(url.origin + url.pathname).toBe("https://stillawake.studio/start");
    expect(url.searchParams.get("type")).toBe("ecommerce");
  });

  it("sends French visitors to the French intake", () => {
    const url = new URL(studioHandoffUrl({ ...ctxFor(answer({ goal: "website" })), locale: "fr" }));
    expect(url.origin + url.pathname).toBe("https://stillawake.studio/fr/demarrer");
  });

  it("round-trips the seed through the encoded parameter", () => {
    const ctx = ctxFor(answer({ goal: "website", needs: ["bilingual", "self_edit"], size: "large" }));
    const url = new URL(studioHandoffUrl(ctx));
    const raw = url.searchParams.get("sa")!;
    const b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const decoded = JSON.parse(Buffer.from(padded, "base64").toString("utf8"));
    expect(decoded).toEqual(studioSeed(ctx));
    expect(decoded.site_features).toContain("multilingual");
  });

  it("carries the estimate as context, in a shape Studio can validate", () => {
    const ctx = ctxFor(answer({ goal: "website" }));
    const url = new URL(studioHandoffUrl(ctx));
    expect(url.searchParams.get("sa_est")).toMatch(/^\d+-\d+$/);
    expect(url.searchParams.get("sa_est")).toBe(`${ctx.low}-${ctx.high}`);
    expect(url.searchParams.get("sa_pv")).toMatch(/^\d{4}\.\d{2}\.\d+$/);
  });

  it("stays short enough to survive a query string", () => {
    // Maximal website answers — the biggest realistic payload.
    const a: Answers = { goal: "website" };
    for (let i = 0; i < 12; i += 1) {
      const next = activeQuestions(a).find((q) => a[q.id] === undefined);
      if (!next) break;
      a[next.id] = next.kind === "multi" ? next.options.map((o) => o.key) : next.options[0].key;
    }
    const url = studioHandoffUrl(ctxFor(a));
    // Studio rejects an `sa` payload over 2048 chars.
    expect(new URL(url).searchParams.get("sa")!.length).toBeLessThan(2048);
    expect(url.length).toBeLessThan(2000);
  });

  it("puts nothing personal in the URL", () => {
    const url = studioHandoffUrl(ctxFor(answer({ goal: "website" })));
    // The calculator never collects a name, email or free text, and the
    // hand-off must not become the first place that changes.
    expect(url).not.toMatch(/name=|email=|@/);
  });
});
