import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * There is no DOM harness in this repo, so these assert against the component
 * source — the same approach as llms-txt-strings.test.ts. They are guardrails
 * against the specific regressions that would make the payment section either
 * misleading or inaccessible, not a substitute for rendering it.
 */
const src = readFileSync(
  fileURLToPath(new URL("./project-calculator.tsx", import.meta.url)),
  "utf8",
);

describe("payment disclosure is collapsed and accessible", () => {
  it("starts collapsed", () => {
    expect(src).toMatch(/const \[open, setOpen\] = useState\(false\)/);
  });

  it("is a real button, not a click-handler on a div", () => {
    const block = src.slice(src.indexOf("function PaymentOptions"));
    expect(block).toMatch(/<button\s+type="button"/);
  });

  it("announces its state and what it controls", () => {
    const block = src.slice(src.indexOf("function PaymentOptions"));
    expect(block).toMatch(/aria-expanded=\{open\}/);
    expect(block).toMatch(/aria-controls=\{panelId\}/);
    expect(block).toMatch(/id=\{panelId\}/);
  });

  it("carries the shared focus-visible treatment", () => {
    const block = src.slice(src.indexOf("function PaymentOptions"));
    expect(block).toMatch(/\$\{FOCUS\}/);
  });

  it("keeps the caret decorative so it is not announced", () => {
    const block = src.slice(src.indexOf("function PaymentOptions"));
    expect(block).toMatch(/aria-hidden/);
  });

  it("puts every transition behind motion-safe:", () => {
    const block = src.slice(src.indexOf("function PaymentOptions"));
    const animations = block.match(/animate-\[[^\]]+\]/g) ?? [];
    for (const a of animations) {
      const at = block.indexOf(a);
      expect(block.slice(Math.max(0, at - 12), at)).toContain("motion-safe:");
    }
  });
});

describe("payment numbers use the design system green", () => {
  it("styles the amounts emerald, not an invented green", () => {
    const block = src.slice(src.indexOf("function PaymentOptions"));
    expect(block).toMatch(/<dd[^>]*text-emerald-300/);
  });

  it("does not introduce a second green", () => {
    const block = src.slice(src.indexOf("function PaymentOptions"));
    const greens = new Set(
      (block.match(/text-(emerald|green|lime|teal)-\d{3}/g) ?? []).map((g) => g.replace(/\/\d+$/, "")),
    );
    expect([...greens]).toEqual(["text-emerald-300"]);
  });

  it("leaves the project range itself uncoloured", () => {
    /* P15: the request is specifically about payment numbers. The headline
       range must not turn green as a side effect. */
    const headline = src.slice(src.indexOf("{fmt(counted)}") - 400, src.indexOf("{fmt(counted)}") + 200);
    expect(headline).not.toMatch(/emerald/);
  });

  it("keeps the range from breaking with a dangling dash", () => {
    const block = src.slice(src.indexOf("function PaymentOptions"));
    expect(block).toMatch(/whitespace-nowrap/);
  });
});

describe("terminology stays inside what the research supports", () => {
  const banned = [
    "financing offer",
    "0% financing",
    "credit approval",
    "approved financing",
    "guaranteed financing",
    "lease-to-own",
    "loan",
  ];

  it("never uses regulated-credit vocabulary in the promotional strings", () => {
    /* The disclaimer legitimately names these things in order to deny them
       ("not a quote, a credit approval or an offer of financing"). So the ban
       applies to the strings that SELL the option, not to the one that
       disclaims it. */
    const promotional = ["payToggle", "payTitle", "payEach", "payPlural", "payNote", "payLonger"];
    for (const key of promotional) {
      for (const line of src.match(new RegExp(`^\\s{4}${key}:[\\s\\S]*?,$`, "gm")) ?? []) {
        for (const term of banned) {
          expect(line.toLowerCase(), `${key} must not say "${term}"`).not.toContain(term);
        }
      }
    }
  });

  it("distinguishes estimate from quote in both languages", () => {
    expect(src).toMatch(/not a quote, a credit approval or an offer of financing/);
    expect(src).toMatch(/ni une soumission, ni une approbation de crédit, ni une offre de financement/);
  });
});

describe("EN and FR parity", () => {
  const keys = ["payToggle", "payTitle", "payEach", "payPlural", "payNote", "payDisclaimer", "payLonger"];

  it("defines every payment string in both locales", () => {
    for (const key of keys) {
      const hits = src.match(new RegExp(`^\\s{4}${key}:`, "gm")) ?? [];
      expect(hits.length, `${key} should be defined twice (en + fr)`).toBe(2);
    }
  });

  it("uses Québec French terms, not a mechanical translation", () => {
    expect(src).toMatch(/versements/);
    expect(src).toMatch(/soumission/);
    expect(src).not.toMatch(/paiements estimés par mois/);
  });

  it("keeps the arithmetic locale-independent", () => {
    /* Only formatting takes the locale; the division must not. */
    const block = src.slice(src.indexOf("function PaymentOptions"));
    expect(block).toMatch(/Math\.round\(low \/ count\)/);
    expect(block).toMatch(/Math\.round\(high \/ count\)/);
    expect(block).not.toMatch(/locale === "fr"[^\n]*\/ count/);
  });
});

describe("payments are not shown where they would mislead", () => {
  it("hides the section on discovery-routed results", () => {
    expect(src).toMatch(/!result\.needsDiscovery && \(\s*<PaymentOptions/);
  });
});
