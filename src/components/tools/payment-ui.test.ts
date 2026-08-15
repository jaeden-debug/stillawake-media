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

describe("the headline range breaks cleanly", () => {
  it("never strands a dangling dash on the result", () => {
    const at = src.indexOf("{fmt(counted)}");
    const block = src.slice(at - 200, at + 400);
    expect(block).toMatch(/whitespace-nowrap/);
    expect(block).not.toMatch(/<span className="text-\[#8C8080\]"> – <\/span>/);
  });
});

describe("payments are not shown where they would mislead", () => {
  it("hides the section on discovery-routed results", () => {
    expect(src).toMatch(/!result\.needsDiscovery && \(\s*<PaymentOptions/);
  });
});

describe("the form does not resize between questions", () => {
  it("gives question screens a constant, viewport-capped height", () => {
    /* Option counts vary from 4 to 12, and sizing the card to each one moved
       the page ~200px on every answer. */
    expect(src).toMatch(/h-full max-h-\[34rem\] min-h-\[18rem\]/);
  });

  it("measures the page against svh, not vh", () => {
    /* On iOS and Android `vh` is the LARGE viewport — it counts space behind
       the address bar, so a vh-sized section is clipped until the bar
       collapses. The card sizes off the section, so the unit lives there. */
    for (const page of [
      "src/app/(en)/tools/project-cost-calculator/page.tsx",
      "src/app/(fr)/fr/outils/calculateur-cout-projet/page.tsx",
    ]) {
      const p = readFileSync(fileURLToPath(new URL(`../../../${page}`, import.meta.url)), "utf8");
      expect(p, page).toMatch(/h-\[100svh\]/);
      expect(p, page).not.toMatch(/h-\[100vh\]/);
    }
  });

  it("centres the question card in the space it is given", () => {
    const shell = src.slice(src.indexOf("function Shell"), src.indexOf("function ResultCard"));
    expect(shell).toMatch(/flex h-full items-center justify-center/);
  });

  it("scrolls the options inside the card rather than growing it", () => {
    expect(src).toMatch(/min-h-0 flex-1 overflow-y-auto overscroll-contain/);
  });

  it("resets the option list to the top on each new question", () => {
    expect(src).toMatch(/scrollRef\.current\?\.scrollTo\(\{ top: 0 \}\)/);
  });

  it("keeps the advance button out of the scrolling region", () => {
    /* On a short screen it used to sit below the fold of a 12-option list. */
    const footer = src.slice(src.indexOf("Footer stays pinned"));
    expect(footer.slice(0, 900)).toMatch(/shrink-0 border-t/);
  });

  it("lets the result card size itself — it is read, not stepped through", () => {
    expect(src).toMatch(/<Shell steady cardRef=\{shellRef\}>/);
    expect(src).toMatch(/<Shell>\s*<div className="flex flex-wrap items-center gap-3">/);
  });

  it("plants the card in the viewport once, not on every answer", () => {
    /* Re-centring on each answer would yank the page under someone who had
       scrolled deliberately to read the help text. */
    expect(src).toMatch(/const planted = useRef\(false\)/);
    expect(src).toMatch(/if \(!planted\.current && safeIndex > 0 && shellRef\.current\)/);
    expect(src).toMatch(/block: "center"/);
  });

  it("honours reduced motion when it scrolls", () => {
    const hits = src.match(/prefers-reduced-motion: reduce/g) ?? [];
    expect(hits.length).toBeGreaterThanOrEqual(2);
  });

  it("puts share directly under the number, not below the detail sections", () => {
    const payAt = src.indexOf("<PaymentOptions low=");
    const shareAt = src.indexOf("<ShareEstimate");
    /* The USE, not the import at the top of the file. */
    const ctaAt = src.indexOf("onClick={() => trackStudioFromEstimate");
    expect(shareAt).toBeGreaterThan(payAt);
    expect(shareAt).toBeLessThan(ctaAt);
  });

  it("brings the result to the top of the screen", () => {
    expect(src).toMatch(/block: "start"/);
  });
});

describe("share buttons are visible and reachable", () => {
  it("uses solid red with white text, not a ghost button", () => {
    const block = src.slice(src.indexOf("function ShareEstimate"));
    expect(block).toMatch(/bg-\[#D71920\][^"`]*text-white/);
  });

  it("keeps a 44px touch target", () => {
    const block = src.slice(src.indexOf("function ShareEstimate"));
    expect(block).toMatch(/min-h-11/);
  });

  it("announces the copy result to a screen reader", () => {
    const block = src.slice(src.indexOf("function ShareEstimate"));
    expect(block).toMatch(/aria-live="polite"/);
  });

  it("defines share copy in both languages", () => {
    for (const key of ["shareTitle", "shareCopy", "shareCopied", "shareEmail", "shareNative"]) {
      const hits = src.match(new RegExp(`^\\s{4}${key}:`, "gm")) ?? [];
      expect(hits.length, `${key} should be defined twice (en + fr)`).toBe(2);
    }
  });
});
