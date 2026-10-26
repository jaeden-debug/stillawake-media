import { describe, expect, it } from "vitest";
import { getPublishedGuide } from "./index";

/**
 * Factual regression guards for the WordPress guides.
 *
 * These pin claims that were verified against Yoast's own functional
 * specification on 2026-08-15, because one of them shipped backwards once
 * already: the guide said a dynamically-served file outranks Yoast's generated
 * one, when the spec says the opposite ("since it has higher prio, it will be
 * displayed"). Prose is free to change; the direction of that claim is not.
 *
 * Source of truth:
 * https://developer.yoast.com/features/llms-txt/functional-specification/
 */

const SPEC_URL = "https://developer.yoast.com/features/llms-txt/functional-specification/";

describe("WordPress guide — Yoast static vs dynamic priority", () => {
  for (const locale of ["en", "fr"] as const) {
    it(`${locale}: does not claim a dynamic file outranks Yoast's generated file`, () => {
      const guide = getPublishedGuide("wordpress", locale);
      expect(guide, `wordpress guide missing for ${locale}`).toBeTruthy();
      const blob = JSON.stringify(guide).toLowerCase();

      // The exact inversion that shipped before, in both languages.
      expect(blob).not.toContain("dynamically served file takes priority");
      expect(blob).not.toContain("dynamically served file takes precedence");
      expect(blob).not.toContain("fichier servi dynamiquement a priorité");
    });

    it(`${locale}: attributes the precedence to the web server, not to WordPress`, () => {
      const guide = getPublishedGuide("wordpress", locale)!;
      const blob = JSON.stringify(guide).toLowerCase();
      const mentionsServer =
        locale === "en"
          ? blob.includes("web server") || blob.includes("document root")
          : blob.includes("serveur web") || blob.includes("racine documentaire");
      expect(mentionsServer, "precedence must be explained by server behaviour").toBe(true);
    });
  }
});

describe("WordPress guide — Yoast content selection", () => {
  it("en: keeps the twelve-month cutoff and cornerstone priority (both are in the spec)", () => {
    const guide = getPublishedGuide("wordpress", "en")!;
    const blob = JSON.stringify(guide).toLowerCase();
    expect(blob).toContain("twelve months");
    expect(blob).toContain("cornerstone");
  });

  it("fr: states the same two constraints", () => {
    const guide = getPublishedGuide("wordpress", "fr")!;
    const blob = JSON.stringify(guide).toLowerCase();
    expect(blob).toContain("douze derniers mois");
    expect(blob).toContain("cornerstone");
  });
});

describe("WordPress guide — evidence contract", () => {
  for (const locale of ["en", "fr"] as const) {
    it(`${locale}: cites the Yoast functional specification as a primary source`, () => {
      const guide = getPublishedGuide("wordpress", locale)!;
      const spec = guide.sources.find((s) => s.url === SPEC_URL);
      expect(spec, "functional specification must be cited").toBeTruthy();
      expect(spec!.kind).toBe("primary");
    });

    it(`${locale}: records the date the claims were re-verified`, () => {
      const guide = getPublishedGuide("wordpress", locale)!;
      expect(guide.verifiedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(guide.verifiedDate))).toBe(false);
    });

    it(`${locale}: still refuses to promise a ranking or citation benefit`, () => {
      const guide = getPublishedGuide("wordpress", locale)!;
      const limits = guide.limitations.join(" ").toLowerCase();
      expect(limits.length).toBeGreaterThan(0);
      const disclaims =
        locale === "en"
          ? /no guarantee|does not guarantee|cannot guarantee|proposed convention/.test(limits)
          : /aucune garantie|ne garantit|convention proposée|qu'une proposition|n'est tenu/.test(limits);
      expect(disclaims, "limitations must not imply guaranteed AI benefit").toBe(true);
    });
  }
});
