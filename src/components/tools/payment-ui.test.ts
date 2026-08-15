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

describe("the card resizes cleanly but never moves the screen", () => {
  it("centres the card rather than pinning it to a fixed height", () => {
    /* The requirement is a fixed CENTRE, not a fixed height: a card that grows
       symmetrically about its middle leaves the centre where it was, so the
       page never scrolls under the reader. */
    for (const page of [
      "src/app/(en)/tools/project-cost-calculator/page.tsx",
      "src/app/(fr)/fr/outils/calculateur-cout-projet/page.tsx",
    ]) {
      const p = readFileSync(fileURLToPath(new URL(`../../../${page}`, import.meta.url)), "utf8");
      expect(p, page).toMatch(/min-h-\[100svh\] items-center justify-center/);
    }
  });

  it("measures the page against svh, not vh", () => {
    /* On iOS and Android `vh` is the LARGE viewport — it counts space behind
       the address bar, so a vh-sized section is clipped until the bar hides. */
    for (const page of [
      "src/app/(en)/tools/project-cost-calculator/page.tsx",
      "src/app/(fr)/fr/outils/calculateur-cout-projet/page.tsx",
    ]) {
      const p = readFileSync(fileURLToPath(new URL(`../../../${page}`, import.meta.url)), "utf8");
      expect(p, page).toMatch(/min-h-\[100svh\]/);
      expect(p, page).not.toMatch(/\[100vh\]/);
    }
  });

  it("never scrolls the options — a hidden option is one nobody picks", () => {
    expect(src).not.toMatch(/overflow-y-auto/);
    expect(src).not.toMatch(/overscroll-contain/);
  });

  it("keeps one option per row — never a second column", () => {
    /* A stacked list is read top to bottom and nothing gets missed. Long lists
       get shorter rows instead. */
    expect(src).toMatch(/const dense = \(current\?\.options\.length \?\? 0\) > 6/);
    const optionsGrid = src.slice(src.indexOf("One option per row"), src.indexOf("current.options.map"));
    expect(optionsGrid).not.toMatch(/grid-cols-2/);
  });

  it("drops the instruction line on a long list", () => {
    /* On a twelve-option screen it costs a row of its own, and the options
       already say what to do. */
    expect(src).toMatch(/\{current\.help && !dense &&/);
  });

  it("shortens rows on a short viewport rather than clipping them", () => {
    /* Written out in full: Tailwind scans source text, so a prefix built by
       concatenation would generate no CSS at all. */
    const hits = src.match(/\[@media\(max-height:720px\)\]:/g) ?? [];
    expect(hits.length).toBeGreaterThanOrEqual(6);
  });

  it("does not stagger the options in", () => {
    /* fill-mode `both` left them at opacity 0 wherever animations do not
       advance — a background tab — and pushed the last row past the card's
       rounded clip. */
    const optionBlock = src.slice(src.indexOf("current.options.map"), src.indexOf("</button>"));
    expect(optionBlock).not.toMatch(/animationDelay/);
    expect(optionBlock).not.toMatch(/sam-rise/);
  });

  it("keeps the advance button out of the option list", () => {
    const footer = src.slice(src.indexOf("Footer stays pinned"));
    expect(footer.slice(0, 900)).toMatch(/shrink-0 border-t/);
  });

  it("plants the card in the viewport once, not on every answer", () => {
    expect(src).toMatch(/const planted = useRef\(false\)/);
    expect(src).toMatch(/if \(!planted\.current && safeIndex > 0 && shellRef\.current\)/);
  });

  it("honours reduced motion when it scrolls", () => {
    const hits = src.match(/prefers-reduced-motion: reduce/g) ?? [];
    expect(hits.length).toBeGreaterThanOrEqual(2);
  });

  it("puts share directly under the number, not below the detail sections", () => {
    const payAt = src.indexOf("<PaymentOptions low=");
    const shareAt = src.indexOf("<ShareEstimate");
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

  it("offers copy and share only — no email button", () => {
    const block = src.slice(src.indexOf("function ShareEstimate"));
    expect(block).toMatch(/T\.shareCopy/);
    expect(block).toMatch(/T\.shareNative/);
    expect(block).not.toMatch(/mailto:/);
    expect(block).not.toMatch(/T\.shareEmail/);
  });

  it("swaps the copy icon for a tick, and only on a real copy", () => {
    const block = src.slice(src.indexOf("function ShareEstimate"));
    expect(block).toMatch(/copied \? \(/);
    expect(block).toMatch(/<rect/);
    expect(block).toMatch(/if \(!ok\) return;/);
  });

  it("falls back when the Clipboard API refuses", () => {
    /* It rejects without document focus, which is exactly when someone is
       arranging windows in order to paste. */
    expect(src).toMatch(/async function copyToClipboard/);
    expect(src).toMatch(/document\.execCommand\("copy"\)/);
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
    for (const key of ["shareTitle", "shareCopy", "shareNative"]) {
      const hits = src.match(new RegExp(`^\\s{4}${key}:`, "gm")) ?? [];
      expect(hits.length, `${key} should be defined twice (en + fr)`).toBe(2);
    }
  });
});
