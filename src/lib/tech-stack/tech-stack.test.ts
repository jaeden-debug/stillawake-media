import { describe, expect, it } from "vitest";

import { EN } from "./en";
import { FR } from "./fr";
import { reachableOutcomes, reachableQuestions, resolve, type Path } from "./tree";
import {
  ANCHORS,
  APPROACH_ORDER,
  ARCHITECTURE_EXPLANATIONS,
  CRITERION_ORDER,
  LEVEL_ORDER,
  PATHS,
  explanationHref,
  type TechStackContent,
} from "./types";

const LOCALES: [string, TechStackContent][] = [
  ["en", EN],
  ["fr", FR],
];

/**
 * These tests protect the two things that cannot be checked by reading the
 * page: that the two languages describe the same resource, and that the
 * decision tree can actually reach every answer it claims to offer.
 */

describe.each(LOCALES)("%s content", (_locale, content) => {
  it("covers every level, scenario, layer and myth the types declare", () => {
    expect(Object.keys(content.levels).sort()).toEqual([...LEVEL_ORDER].sort());
    // Records are typed exhaustively, so this is really a guard against a key
    // being present but empty — which TypeScript cannot see.
    for (const level of Object.values(content.levels)) {
      expect(level.name.length).toBeGreaterThan(0);
      expect(level.rightWhen.length).toBeGreaterThan(0);
      expect(level.diagram.length).toBeGreaterThan(0);
    }
    for (const scenario of Object.values(content.scenarios)) {
      expect(scenario.needs.length).toBeGreaterThan(0);
      expect(scenario.alternatives.length).toBeGreaterThan(0);
      expect(scenario.overkill.length).toBeGreaterThan(0);
    }
    for (const myth of Object.values(content.myths)) {
      expect(myth.justifiedWhen.length).toBeGreaterThan(0);
      expect(myth.instead.length).toBeGreaterThan(0);
    }
    for (const layer of Object.values(content.layers)) {
      expect(layer.entries.length).toBeGreaterThan(0);
    }
  });

  it("rates every approach against every criterion", () => {
    for (const approach of APPROACH_ORDER) {
      const row = content.matrix[approach];
      expect(Object.keys(row).sort()).toEqual([...CRITERION_ORDER].sort());
    }
  });

  it("asks every question the tree can reach, and answers every branch of it", () => {
    for (const id of reachableQuestions()) {
      const copy = content.questions[id];
      expect(copy, `missing question copy: ${id}`).toBeDefined();
      expect(copy.prompt.length).toBeGreaterThan(0);
    }
  });

  it("writes copy for every outcome the tree can reach", () => {
    for (const id of reachableOutcomes()) {
      const copy = content.outcomes[id];
      expect(copy, `missing outcome copy: ${id}`).toBeDefined();
      expect(copy.stack.length).toBeGreaterThan(0);
      expect(copy.why.length).toBeGreaterThan(0);
      expect(content.levels[copy.level]).toBeDefined();
      expect(content.scenarios[copy.scenario]).toBeDefined();
    }
  });

  it("offers a label for every legal answer at every question", () => {
    // Walk the tree exhaustively rather than trusting the copy's own key list:
    // an answer the tree accepts but the copy cannot render is an unreachable
    // dead end in the UI, which is exactly the bug this catches.
    const walk = (path: Path) => {
      const state = resolve(path);
      if (state.done) return;
      const copy = content.questions[state.question];
      for (const answer of state.answers) {
        expect(
          copy.answers[answer],
          `${state.question} has no label for answer "${answer}"`,
        ).toBeDefined();
        walk([...path, { question: state.question, answer }]);
      }
    };
    walk([]);
  });
});

describe("the two languages stay in step", () => {
  it("describes the same scenarios, levels, layers and myths", () => {
    expect(Object.keys(FR.levels).sort()).toEqual(Object.keys(EN.levels).sort());
    expect(Object.keys(FR.scenarios).sort()).toEqual(Object.keys(EN.scenarios).sort());
    expect(Object.keys(FR.layers).sort()).toEqual(Object.keys(EN.layers).sort());
    expect(Object.keys(FR.myths).sort()).toEqual(Object.keys(EN.myths).sort());
    expect(Object.keys(FR.outcomes).sort()).toEqual(Object.keys(EN.outcomes).sort());
  });

  it("places each scenario on the same rung in both languages", () => {
    for (const id of Object.keys(EN.scenarios) as (keyof typeof EN.scenarios)[]) {
      expect(FR.scenarios[id].level).toBe(EN.scenarios[id].level);
    }
  });

  it("gives each outcome the same rung and the same onward section", () => {
    for (const id of Object.keys(EN.outcomes) as (keyof typeof EN.outcomes)[]) {
      expect(FR.outcomes[id].level).toBe(EN.outcomes[id].level);
      expect(FR.outcomes[id].scenario).toBe(EN.outcomes[id].scenario);
    }
  });

  it("reaches the same verdict in every matrix cell", () => {
    // Ratings are a judgement about the technology, not about the reader, so a
    // cell that says "strong" in English and "limited" in French would be two
    // different recommendations wearing one page.
    for (const approach of APPROACH_ORDER) {
      for (const criterion of CRITERION_ORDER) {
        expect(
          FR.matrix[approach][criterion].rating,
          `${approach}/${criterion} disagrees between languages`,
        ).toBe(EN.matrix[approach][criterion].rating);
      }
    }
  });
});

describe("the decision tree", () => {
  it("starts by asking whether money changes hands", () => {
    const start = resolve([]);
    expect(start.done).toBe(false);
    if (!start.done) expect(start.question).toBe("selling");
  });

  it("reaches an outcome from every path a visitor can take", () => {
    let leaves = 0;
    const walk = (path: Path, depth: number) => {
      expect(depth, `path did not terminate: ${JSON.stringify(path)}`).toBeLessThan(10);
      const state = resolve(path);
      if (state.done) {
        leaves += 1;
        return;
      }
      for (const answer of state.answers) {
        walk([...path, { question: state.question, answer }], depth + 1);
      }
    };
    walk([], 0);
    expect(leaves).toBeGreaterThan(0);
  });

  it("does not strand a visitor on an answer it does not recognise", () => {
    const state = resolve([{ question: "selling", answer: "not-a-real-answer" }]);
    expect(state.done).toBe(false);
    if (!state.done) expect(state.question).toBe("selling");
  });

  it("keeps a simple brochure site at level 1", () => {
    const state = resolve([
      { question: "selling", answer: "no" },
      { question: "accounts", answer: "no" },
      { question: "editing", answer: "rarely" },
      { question: "workflow", answer: "no" },
      { question: "search", answer: "known" },
    ]);
    expect(state).toEqual({ done: true, outcome: "simple-site" });
    expect(EN.outcomes["simple-site"].level).toBe("l1");
  });

  it("sends a normal catalogue to a commerce platform rather than a custom build", () => {
    const state = resolve([
      { question: "selling", answer: "catalogue" },
      { question: "commerce_fit", answer: "normal" },
    ]);
    expect(state).toEqual({ done: true, outcome: "shopify" });
  });

  it("tries an existing product before recommending a custom portal", () => {
    const unexplored = resolve([
      { question: "selling", answer: "no" },
      { question: "accounts", answer: "clients" },
      { question: "portal_scope", answer: "maybe" },
    ]);
    expect(unexplored).toEqual({ done: true, outcome: "buy-before-build" });

    const explored = resolve([
      { question: "selling", answer: "no" },
      { question: "accounts", answer: "clients" },
      { question: "portal_scope", answer: "no" },
    ]);
    expect(explored).toEqual({ done: true, outcome: "portal" });
  });

  it("splits a manual workflow off instead of upgrading the website", () => {
    const state = resolve([
      { question: "selling", answer: "no" },
      { question: "accounts", answer: "no" },
      { question: "editing", answer: "rarely" },
      { question: "workflow", answer: "manual" },
    ]);
    expect(state).toEqual({ done: true, outcome: "separate-system" });
  });

  it("never recommends a database to someone who described a brochure site", () => {
    // The point of the whole resource, asserted: no path that answers "no" to
    // payment, "no" to logins and "no" to workflow may land above level 3.
    const brochure: Path[] = [
      [
        { question: "selling", answer: "no" },
        { question: "accounts", answer: "no" },
        { question: "editing", answer: "rarely" },
        { question: "workflow", answer: "no" },
      ],
      [
        { question: "selling", answer: "no" },
        { question: "accounts", answer: "no" },
        { question: "editing", answer: "team" },
        { question: "workflow", answer: "no" },
      ],
    ];
    for (const prefix of brochure) {
      for (const answer of ["known", "channel", "primary"]) {
        const state = resolve([...prefix, { question: "search", answer }]);
        expect(state.done).toBe(true);
        if (state.done) {
          const level = EN.outcomes[state.outcome].level;
          expect(["l1", "l2", "l3"]).toContain(level);
        }
      }
    }
  });
});

describe("calculator deep links", () => {
  it("points every architecture class at a section this page renders", () => {
    const rendered = new Set<string>([
      ANCHORS.ladder,
      ANCHORS.scenarios,
      ANCHORS.matrix,
      ANCHORS.layers,
      ANCHORS.myths,
      ANCHORS.tree,
      ANCHORS.principles,
      ANCHORS.faq,
      ...Object.keys(EN.levels).map((id) => ANCHORS.level(id as never)),
      ...Object.keys(EN.scenarios).map((id) => ANCHORS.scenario(id as never)),
      ...Object.keys(EN.layers).map((id) => ANCHORS.layer(id as never)),
      ...Object.keys(EN.myths).map((id) => ANCHORS.myth(id as never)),
    ]);

    for (const [classId, anchor] of Object.entries(ARCHITECTURE_EXPLANATIONS)) {
      expect(rendered.has(anchor), `${classId} points at a section that does not exist`).toBe(true);
    }
  });

  it("builds a language-correct href", () => {
    expect(explanationHref("platform_commerce", "en")).toBe(
      `${PATHS.en}#${ANCHORS.scenario("ecommerce")}`,
    );
    expect(explanationHref("platform_commerce", "fr")).toBe(
      `${PATHS.fr}#${ANCHORS.scenario("ecommerce")}`,
    );
  });
});
