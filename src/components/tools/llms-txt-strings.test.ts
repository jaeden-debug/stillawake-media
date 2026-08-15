import { describe, expect, it } from "vitest";
import { TOOL_STRINGS, findingCopy } from "./llms-txt-strings";
import { buildFindings, type EntityFacts, type Finding } from "@/lib/llms-txt/analyze";

/**
 * The locale layer's contract.
 *
 * The risk being guarded against is not a missing translation — it is a
 * translation that silently stops matching the check it describes. Findings are
 * keyed by a stable id, so these tests assert that every id the analyzer can
 * emit is covered in French, and that English output is byte-identical to what
 * the analyzer produced before the locale layer existed.
 */

const EMPTY_FACTS: EntityFacts = {
  organizationName: null,
  organizationType: null,
  description: null,
  founder: null,
  sameAs: [],
  areaServed: [],
  hasPricingSignal: false,
  hasContactSignal: false,
  languages: [],
  hasExistingLlmsTxt: false,
  schemaTypes: [],
};

const FULL_FACTS: EntityFacts = {
  organizationName: "StillAwake Media",
  organizationType: "Organization",
  description: "A studio.",
  founder: "Jaeden Doody",
  sameAs: ["https://example.com/a", "https://example.com/b"],
  areaServed: ["Montréal", "Canada"],
  hasPricingSignal: true,
  hasContactSignal: true,
  languages: ["en", "fr"],
  hasExistingLlmsTxt: true,
  schemaTypes: ["Organization"],
};

describe("finding ids", () => {
  it("every emitted finding carries a stable id", () => {
    for (const facts of [EMPTY_FACTS, FULL_FACTS]) {
      const { findings } = buildFindings(facts);
      for (const f of findings) {
        expect(f.id, `finding "${f.label}" has no id`).toBeTruthy();
      }
    }
  });

  it("ids are unique within a run, so they are safe as React keys", () => {
    const { findings } = buildFindings(EMPTY_FACTS);
    expect(new Set(findings.map((f) => f.id)).size).toBe(findings.length);
  });
});

describe("French coverage", () => {
  it("covers every finding id the analyzer can emit", () => {
    const ids = new Set(buildFindings(EMPTY_FACTS).findings.map((f) => f.id));
    for (const id of ids) {
      expect(TOOL_STRINGS.fr.findings[id], `no French copy for finding "${id}"`).toBeDefined();
    }
  });

  it("localizes both the pass and fail wording of every covered check", () => {
    for (const [id, copy] of Object.entries(TOOL_STRINGS.fr.findings)) {
      expect(copy!.ok.length, `${id}.ok is empty`).toBeGreaterThan(0);
      expect(copy!.notOk.length, `${id}.notOk is empty`).toBeGreaterThan(0);
      expect(copy!.why.length, `${id}.why is empty`).toBeGreaterThan(0);
    }
  });

  it("interpolates detected values instead of leaving the placeholder visible", () => {
    const { findings } = buildFindings(FULL_FACTS);
    const org = findings.find((f) => f.id === "organization")!;
    const rendered = findingCopy(org, TOOL_STRINGS.fr);
    expect(rendered.label).toContain("StillAwake Media");
    expect(rendered.label).not.toContain("{value}");
  });

  it("never leaves a placeholder when a value is absent", () => {
    const { findings } = buildFindings(EMPTY_FACTS);
    for (const f of findings) {
      expect(findingCopy(f, TOOL_STRINGS.fr).label).not.toContain("{value}");
    }
  });

  it("sends French readers to the French AEO page", () => {
    expect(TOOL_STRINGS.fr.gapsHref).toBe("/fr/referencement-ia");
    expect(TOOL_STRINGS.en.gapsHref).toBe("/answer-engine-optimization");
  });
});

describe("English is unchanged by the locale layer", () => {
  it("renders the analyzer's own copy verbatim", () => {
    for (const facts of [EMPTY_FACTS, FULL_FACTS]) {
      for (const f of buildFindings(facts).findings) {
        const rendered = findingCopy(f, TOOL_STRINGS.en);
        expect(rendered.label).toBe(f.label);
        expect(rendered.why).toBe(f.why);
      }
    }
  });

  it("falls back to server copy when a locale lacks an entry", () => {
    const orphan = {
      id: "organization",
      level: "ok",
      label: "Server label",
      why: "Server reason",
    } as Finding;
    const rendered = findingCopy(orphan, { ...TOOL_STRINGS.fr, findings: {} });
    expect(rendered.label).toBe("Server label");
    expect(rendered.why).toBe("Server reason");
  });
});

describe("pluralization", () => {
  it("agrees in both languages", () => {
    expect(TOOL_STRINGS.en.gapsHeading(1)).toContain("gap worth");
    expect(TOOL_STRINGS.en.gapsHeading(3)).toContain("gaps worth");
    expect(TOOL_STRINGS.fr.gapsHeading(1)).toContain("lacune à");
    expect(TOOL_STRINGS.fr.gapsHeading(3)).toContain("lacunes à");
  });
});
