/**
 * ARCHETYPE TESTS — and they are mostly assertions about what is ABSENT.
 *
 * A recommendation engine that only ever gets tested on what it recommends
 * will pass every test while quietly proposing Postgres to a dog groomer. So
 * every archetype here asserts the negative space: no database, no auth, no
 * payments, no custom backend — for the eight cases out of twelve where none
 * of those are warranted.
 *
 * Tests run through the REAL calculator vocabulary (`Answers` →
 * `requirementsFrom` → `recommend`) rather than hand-built requirement
 * objects. A signal that stops being derivable from the flow should fail here,
 * not silently degrade in production.
 */

import { describe, expect, it } from "vitest";

import { estimate } from "@/lib/pricing/engine";
import type { Answers } from "@/lib/pricing/public-flow";
import { activeQuestions, mapAnswers, sanitizeAnswers } from "@/lib/pricing/public-flow";

import { recommend } from "./engine";
import { requirementsFrom } from "./requirements";
import { present } from "./present";
import type { LayerId, Recommendation } from "./types";
import {
  ALTERNATIVE_REASONS,
  CLASS_LABELS,
  CLASS_SUMMARIES,
  CLIENT_MANAGES_LABELS,
  EDUCATIONAL_LINKS,
  OPEN_QUESTION_LABELS,
  REASON_LABELS,
  STUDIO_HANDLES_LABELS,
  TECH_LABELS,
} from "./labels";

const run = (answers: Answers): Recommendation => recommend(requirementsFrom(answers));

const layer = (rec: Recommendation, id: LayerId) => {
  const found = rec.components.find((c) => c.layer === id);
  if (!found) throw new Error(`no component for layer ${id}`);
  return found;
};

/** The four things that must never appear without being earned. */
function expectNoApplicationInfrastructure(rec: Recommendation) {
  expect(layer(rec, "database").status).toBe("not_needed");
  expect(layer(rec, "auth").status).toBe("not_needed");
  expect(layer(rec, "database").choice).toBeNull();
  expect(layer(rec, "auth").choice).toBeNull();
  expect(rec.classId).not.toBe("web_application");
  expect(rec.classId).not.toBe("business_platform");
}

/* ── the twelve archetypes ────────────────────────────────────────────────── */

describe("archetype recommendations", () => {
  it("1 · five-page local business gets a plain marketing site and nothing else", () => {
    const rec = run({
      goal: "new_website",
      needs: ["explain", "leads"],
      content: "ready",
      size: "small",
    });

    expect(rec.classId).toBe("static_marketing");
    expect(rec.complexity).toBe("low");
    expectNoApplicationInfrastructure(rec);
    expect(layer(rec, "commerce").status).toBe("not_needed");
    expect(layer(rec, "payments").status).toBe("not_needed");
    expect(layer(rec, "automation").status).toBe("not_needed");
    // A contact form is delivered, not routed through a mail platform.
    expect(layer(rec, "email").choice).toBe("form_delivery");
    expect(layer(rec, "frontend").choice).toBe("framer");
    // Measurement is the one thing that IS always there.
    expect(layer(rec, "analytics").status).toBe("recommended");
  });

  it("2 · SEO-led professional service earns a custom frontend but no backend", () => {
    const rec = run({
      goal: "new_website",
      needs: ["explain", "leads", "found_search"],
      content: "help",
      size: "standard",
    });

    expect(rec.classId).toBe("custom_content");
    expectNoApplicationInfrastructure(rec);
    expect(layer(rec, "cms").choice).toBe("headless_sanity");
    expect(rec.reasons).toContain("search_led_growth");
  });

  it("3 · frequently edited publisher gets a content system, not an application", () => {
    const rec = run({
      goal: "new_website",
      needs: ["explain", "content_updates"],
      content: "ready",
      size: "large",
    });

    expect(rec.classId).toBe("custom_content");
    expectNoApplicationInfrastructure(rec);
    expect(rec.reasons).toContain("content_at_scale");
    expect(rec.clientManages).toContain("add_pages_and_posts");
  });

  it("4 · ordinary store stays on the platform — no custom commerce, no database of ours", () => {
    const rec = run({ goal: "store", kind: "standard", search: "local" });

    expect(rec.classId).toBe("platform_commerce");
    expect(layer(rec, "commerce").choice).toBe("shopify");
    expect(layer(rec, "payments").choice).toBe("shopify_payments");
    expect(layer(rec, "frontend").choice).toBe("shopify_theme");
    // The platform owns the data. We are not standing up Postgres for a shop.
    expect(layer(rec, "database").choice).toBe("platform_managed");
    expect(layer(rec, "database").choice).not.toBe("postgres_supabase");
    expect(rec.classId).not.toBe("headless_commerce");
  });

  it("5 · commerce a platform cannot model becomes software, and says so", () => {
    const rec = run({ goal: "store", kind: "custom", search: "none" });

    expect(rec.classId).toBe("business_platform");
    expect(layer(rec, "commerce").choice).toBe("custom_commerce");
    expect(layer(rec, "database").choice).toBe("postgres_supabase");
    expect(rec.complexity).toBe("high");
  });

  it("6 · booking-led service company connects the tool it already uses", () => {
    const rec = run({
      goal: "new_website",
      needs: ["explain", "leads", "bookings"],
      "how.bookings": "integrate",
      content: "ready",
      size: "standard",
    });

    expect(rec.classId).toBe("cms_marketing");
    expectNoApplicationInfrastructure(rec);
    expect(layer(rec, "commerce").status).toBe("not_needed");
  });

  it("7 · customer portal is an application, with everything that implies", () => {
    const rec = run({ goal: "software", kind: "portal" });

    expect(rec.classId).toBe("web_application");
    expect(layer(rec, "auth").choice).toBe("supabase_auth");
    expect(layer(rec, "database").choice).toBe("postgres_supabase");
    expect(layer(rec, "cms").status).toBe("not_needed");
    expect(rec.studioHandles).toContain("security_rules");
  });

  it("8 · internal operations dashboard gets no CMS and no commerce", () => {
    const rec = run({ goal: "software", kind: "dashboard" });

    expect(rec.classId).toBe("web_application");
    expect(layer(rec, "cms").status).toBe("not_needed");
    expect(layer(rec, "commerce").status).toBe("not_needed");
    expect(layer(rec, "payments").status).toBe("not_needed");
    expect(layer(rec, "auth").choice).toBe("supabase_auth");
  });

  it("9 · subscription SaaS gets billing, roles and a real platform", () => {
    const rec = run({ goal: "software", kind: "platform" });

    expect(rec.classId).toBe("business_platform");
    expect(layer(rec, "payments").choice).toBe("stripe");
    expect(layer(rec, "auth").choice).toBe("supabase_auth");
    expect(rec.reasons).toContain("anyone_can_sign_up");
  });

  it("10 · bilingual marketing site gets collection-based tooling, still no backend", () => {
    const rec = run({
      goal: "new_website",
      needs: ["explain", "leads"],
      content: "ready",
      size: "standard",
      complexity: ["multilingual"],
    });

    expect(rec.classId).toBe("cms_marketing");
    expect(layer(rec, "frontend").choice).toBe("webflow");
    expectNoApplicationInfrastructure(rec);
    // The estimate did not move for the second language, so the result says so.
    expect(rec.openQuestions).toContain("second_language_scope");
  });

  it("11 · forms without stored data means no database and no mail platform", () => {
    const rec = run({
      goal: "new_website",
      needs: ["explain", "leads", "menu"],
      content: "ready",
      size: "standard",
    });

    expect(rec.classId).toBe("cms_marketing");
    expect(layer(rec, "database").status).toBe("not_needed");
    expect(layer(rec, "database").why).toBe("no_data_beyond_pages_and_enquiries");
    expect(layer(rec, "email").choice).toBe("form_delivery");
    expect(layer(rec, "email").choice).not.toBe("transactional_provider");
  });

  it("12 · custom workflow across internal systems becomes an operations platform", () => {
    const rec = run({
      goal: "software",
      kind: "portal",
      complexity: ["connect_internal"],
    });

    expect(rec.classId).toBe("business_platform");
    expect(layer(rec, "automation").choice).toBe("custom_jobs");
    expect(rec.openQuestions).toContain("internal_system_unknown");
    expect(rec.confidence).not.toBe("clear");
  });
});

/* ── boundaries: one answer changes, the architecture legitimately changes ── */

describe("boundaries", () => {
  const marketing: Answers = {
    goal: "new_website",
    needs: ["explain", "leads"],
    content: "ready",
    size: "standard",
  };

  it("adding customer logins turns a marketing site into an application", () => {
    const before = run(marketing);
    const after = run({ ...marketing, needs: ["explain", "leads", "logins"] });

    expect(before.classId).toBe("cms_marketing");
    expectNoApplicationInfrastructure(before);

    expect(after.classId).toBe("web_application");
    expect(layer(after, "auth").status).toBe("recommended");
    expect(layer(after, "database").status).toBe("recommended");
  });

  it("content that never changes drops the content system", () => {
    const rarely = run({ ...marketing, size: "small" });
    const often = run({ ...marketing, size: "small", needs: ["explain", "leads", "content_updates"] });

    expect(rarely.classId).toBe("static_marketing");
    expect(rarely.components.find((c) => c.layer === "cms")?.status).toBe("optional");

    expect(often.classId).toBe("cms_marketing");
    expect(often.components.find((c) => c.layer === "cms")?.status).toBe("recommended");
  });

  it("search as the growth plan is what earns a custom frontend", () => {
    const withoutSearch = run(marketing);
    const withSearch = run({ ...marketing, needs: ["explain", "leads", "found_search"] });

    expect(withoutSearch.classId).toBe("cms_marketing");
    expect(withSearch.classId).toBe("custom_content");
    // Neither one gains a backend from it.
    expectNoApplicationInfrastructure(withoutSearch);
    expectNoApplicationInfrastructure(withSearch);
  });

  it("a large catalogue alone does not justify leaving the platform", () => {
    const large = run({ goal: "store", kind: "large", search: "content_strategy" });
    const largeBilingual = run({
      goal: "store",
      kind: "large",
      search: "content_strategy",
      complexity: ["multilingual"],
    });

    expect(large.classId).toBe("platform_commerce");
    expect(largeBilingual.classId).toBe("headless_commerce");
  });

  it("selling a handful of products does not turn a website into a store", () => {
    const rec = run({ ...marketing, needs: ["explain", "leads", "sell"] });

    expect(rec.classId).toBe("cms_marketing");
    expect(layer(rec, "commerce").choice).toBe("shopify_lite");
    expect(layer(rec, "payments").choice).toBe("hosted_checkout");
    expectNoApplicationInfrastructure(rec);
  });

  it("an automation is not sold a website", () => {
    const rec = run({ goal: "automation", kind: "connect" });

    expect(rec.classId).toBe("automation_layer");
    expect(layer(rec, "frontend").status).toBe("not_needed");
    expect(layer(rec, "cms").status).toBe("not_needed");
    expect(layer(rec, "database").status).toBe("not_needed");
  });

  it("a search engagement recommends no rebuild", () => {
    const rec = run({ goal: "seo", search: "local" });

    expect(rec.classId).toBe("existing_stack");
    expect(layer(rec, "frontend").choice).toBe("existing");
    expect(layer(rec, "database").status).toBe("not_needed");
    expect(rec.alternatives[0]?.classId).toBe("custom_content");
  });

  it("brand work recommends no architecture at all", () => {
    const rec = run({ goal: "brand", kind: "identity" });

    expect(rec.classId).toBe("none");
    for (const c of rec.components) expect(c.status).toBe("not_needed");
  });

  it("undefined scope is provisional, and still does not add infrastructure", () => {
    const rec = run({ ...marketing, needs: ["explain", "leads", "custom"], size: "unsure" });

    expect(rec.confidence).toBe("open");
    expect(rec.openQuestions).toContain("scope_still_open");
    expectNoApplicationInfrastructure(rec);
  });
});

/* ── invariants ───────────────────────────────────────────────────────────── */

describe("invariants", () => {
  /**
   * Every combination the published flow can actually produce.
   *
   * Kinds are PAIRED to their goal rather than crossed with all of them —
   * "a brand project of kind `portal`" is not a state the flow can reach, and
   * generating tens of thousands of impossible answer sets bought nothing
   * except a test that took half a minute to run.
   *
   * `sanitizeAnswers` is deliberately not called here. It is exercised by its
   * own test below, and running it per combination made this loop dominated by
   * question-tree rebuilding rather than by the engine under test.
   */
  const GOAL_KINDS: [string, string[]][] = [
    ["new_website", [""]],
    ["redesign", [""]],
    ["store", ["standard", "large", "custom"]],
    ["seo", [""]],
    ["brand", ["refresh", "identity", "positioning"]],
    ["software", ["dashboard", "portal", "platform"]],
    ["automation", ["connect", "workflow", "ai"]],
  ];

  function* everyFlow(): Generator<Answers> {
    const needsSets = [
      [],
      ["explain", "leads"],
      ["explain", "leads", "content_updates"],
      ["explain", "leads", "found_search"],
      ["bookings", "ordering", "payments", "sell", "connect"],
      ["logins", "custom", "content_updates"],
    ];
    const sizes = ["small", "standard", "large", "unsure"];
    const complexities: string[][] = [
      [],
      ["multilingual"],
      ["multi_location"],
      ["connect_internal", "accessibility"],
      ["multi_location", "multilingual", "connect_internal"],
    ];

    for (const [goal, kinds] of GOAL_KINDS)
      for (const kind of kinds)
        for (const needs of needsSets)
          for (const size of sizes)
            for (const complexity of complexities)
              yield { goal, kind, needs, size, complexity, content: "ready" };
  }

  it("never recommends a database or auth without someone signing in or something being stored", () => {
    for (const answers of everyFlow()) {
      const req = requirementsFrom(answers);
      const rec = recommend(req);
      const db = rec.components.find((c) => c.layer === "database");
      const auth = rec.components.find((c) => c.layer === "auth");

      if (auth?.status === "recommended") {
        expect(req.accounts, JSON.stringify(answers)).not.toBe("none");
      }
      /* A database is only ever OURS when the business stores something.
         `platform_managed` is the store's own data and does not count. */
      if (db?.choice === "postgres_supabase") {
        expect(req.persistentData || req.customWorkflow, JSON.stringify(answers)).toBe(true);
      }
    }
  });

  it("always answers every layer, in both languages, with no bare keys", () => {
    const layers: LayerId[] = [
      "frontend", "cms", "hosting", "database", "auth",
      "commerce", "payments", "email", "automation", "analytics",
    ];

    for (const answers of everyFlow()) {
      const rec = recommend(requirementsFrom(answers));
      const seen = rec.components.map((c) => c.layer);
      for (const id of layers) expect(seen, JSON.stringify(answers)).toContain(id);
      // No layer decided twice — a duplicate would render two contradictory rows.
      expect(new Set(seen).size).toBe(seen.length);

      for (const c of rec.components) {
        expect(REASON_LABELS[c.why], `missing reason label: ${c.why}`).toBeDefined();
        if (c.choice) expect(TECH_LABELS[c.choice], `missing tech label: ${c.choice}`).toBeDefined();
      }
      for (const key of rec.reasons) expect(REASON_LABELS[key], `missing reason label: ${key}`).toBeDefined();
      for (const alt of rec.alternatives) {
        expect(ALTERNATIVE_REASONS[alt.why], `missing alternative reason: ${alt.why}`).toBeDefined();
        expect(CLASS_LABELS[alt.classId]).toBeDefined();
      }
      for (const key of rec.clientManages) expect(CLIENT_MANAGES_LABELS[key], `missing: ${key}`).toBeDefined();
      for (const key of rec.studioHandles) expect(STUDIO_HANDLES_LABELS[key], `missing: ${key}`).toBeDefined();
      for (const key of rec.openQuestions) expect(OPEN_QUESTION_LABELS[key], `missing: ${key}`).toBeDefined();
      for (const id of rec.links) expect(EDUCATIONAL_LINKS[id], `missing link: ${id}`).toBeDefined();

      expect(CLASS_LABELS[rec.classId]).toBeDefined();
      expect(CLASS_SUMMARIES[rec.classId]).toBeDefined();
    }
  });

  it("never shows more than three pieces of further reading, and never a duplicate", () => {
    for (const answers of everyFlow()) {
      const rec = recommend(requirementsFrom(answers));
      expect(rec.links.length).toBeLessThanOrEqual(3);
      expect(new Set(rec.links).size).toBe(rec.links.length);
    }
  });

  it("renders in both locales without leaking a key into the copy", () => {
    for (const answers of everyFlow()) {
      const rec = recommend(requirementsFrom(answers));
      for (const locale of ["en", "fr"] as const) {
        const view = present(rec, locale);
        expect(view.headline.length).toBeGreaterThan(0);
        expect(view.summary.length).toBeGreaterThan(0);
        const strings = [
          view.headline, view.summary, view.complexity, view.confidence, view.confidenceNote,
          ...view.reasons, ...view.clientManages, ...view.studioHandles, ...view.openQuestions,
          ...view.notNeeded.flatMap((n) => [n.label, n.why]),
          ...view.technical.map((t) => t.why),
        ];
        // A snake_case string in client copy means a label table fell through.
        for (const s of strings) expect(s, `unlabelled key: ${s}`).not.toMatch(/^[a-z0-9]+(_[a-z0-9]+)+$/);
      }
    }
  });
});

/* ── the flow itself ──────────────────────────────────────────────────────── */

describe("the two architecture signals", () => {
  const websiteAnswers: Answers = { goal: "new_website", needs: ["explain"], content: "ready", size: "small" };

  it("cost the visitor no extra screens", () => {
    /* The whole reason they ride inside existing questions. The pricing flow's
       own test caps this at six; if that ever stops holding, the architecture
       layer should be the thing that gives way, not the flow. */
    expect(activeQuestions(websiteAnswers).length).toBeLessThanOrEqual(6);
    expect(activeQuestions(websiteAnswers).map((q) => q.id)).not.toContain("publishing");
    expect(activeQuestions(websiteAnswers).map((q) => q.id)).not.toContain("languages");
  });

  it("are offered on the questions that already exist", () => {
    const qs = activeQuestions(websiteAnswers);
    const needs = qs.find((q) => q.id === "needs");
    const complexity = qs.find((q) => q.id === "complexity");

    expect(needs?.options.map((o) => o.key)).toContain("content_updates");
    expect(complexity?.options.map((o) => o.key)).toContain("multilingual");
    // Both live on optional questions, so neither can block anyone.
    expect(needs?.optional).toBe(true);
    expect(complexity?.optional).toBe(true);
  });

  it("survive the sanitiser, and anything invented does not", () => {
    const clean = sanitizeAnswers({
      goal: "new_website",
      needs: ["explain", "content_updates"],
      content: "ready",
      size: "small",
      complexity: ["multilingual"],
    });
    expect(clean.needs).toContain("content_updates");
    expect(clean.complexity).toContain("multilingual");

    const dirty = sanitizeAnswers({
      goal: "new_website",
      needs: ["explain", "hourly_updates"],
      complexity: ["klingon"],
    });
    expect(dirty.needs).not.toContain("hourly_updates");
    expect(dirty.complexity).toBeUndefined();
  });

  /**
   * THE LOAD-BEARING GUARANTEE.
   *
   * Both signals are read by the architecture layer and by nothing else. If
   * either ever starts moving a quote, this fails — which is the only thing
   * standing between "we added a signal" and "everyone's price changed".
   */
  it("never move the price", () => {
    const base: Answers = { goal: "new_website", needs: ["explain", "leads"], content: "ready", size: "standard" };
    const withBoth: Answers = {
      ...base,
      needs: ["explain", "leads", "content_updates"],
      complexity: ["multilingual"],
    };

    expect(mapAnswers(withBoth)).toEqual(mapAnswers(base));
    const before = estimate(mapAnswers(base));
    const after = estimate(mapAnswers(withBoth));
    expect(after.low).toBe(before.low);
    expect(after.high).toBe(before.high);

    // ...but they DO move the recommendation, or they would be pointless.
    // `content_updates` moves the class: no content system, then one.
    const small: Answers = { ...base, size: "small" };
    expect(run(small).classId).toBe("static_marketing");
    expect(run({ ...small, needs: ["explain", "leads", "content_updates"] }).classId).toBe("cms_marketing");

    // `multilingual` moves the tooling rather than the class, which is right:
    // a second language does not make a brochure site an application.
    const oneLanguage = run(base);
    const twoLanguages = run({ ...base, complexity: ["multilingual"] });
    expect(oneLanguage.classId).toBe(twoLanguages.classId);
    expect(oneLanguage.components.find((c) => c.layer === "frontend")?.choice).toBe("framer");
    expect(twoLanguages.components.find((c) => c.layer === "frontend")?.choice).toBe("webflow");
    expect(twoLanguages.openQuestions).toContain("second_language_scope");
  });
});
