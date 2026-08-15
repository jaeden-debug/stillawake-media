import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { APPROVED_ONE_TIME_PRICES, EMERGENCY, ONE_TIME, RECURRING } from "./model";
import { ONE_TIME_LABELS, RECURRING_LABELS } from "./labels";

/**
 * Published copy must not contradict the pricing model.
 *
 * This test exists because it caught a real one: the SEO cost article called
 * the plans "Essential" and "Growth" while the catalogue, /pricing and the
 * calculator all called them "Essentials" and "Advanced" — and a dead $900
 * draft row was literally named "SEO Growth". Three names for two products,
 * live on the site, discoverable by anyone comparing two pages.
 *
 * Prices themselves are checked the same way: an approved monthly price that
 * appears in prose has to be the one the model would charge.
 */

const CONTENT_DIRS = ["src/content/stillawake-times", "src/content/fr/stillawake-times"];

function markdownFiles(): { path: string; body: string }[] {
  const out: { path: string; body: string }[] = [];
  for (const dir of CONTENT_DIRS) {
    let names: string[];
    try {
      names = readdirSync(dir);
    } catch {
      continue; // a locale with no articles yet is not a failure
    }
    for (const name of names) {
      if (!name.endsWith(".md")) continue;
      out.push({ path: join(dir, name), body: readFileSync(join(dir, name), "utf8") });
    }
  }
  return out;
}

const FILES = markdownFiles();
const PAGES = [
  "src/app/(en)/pricing/page.tsx",
  "src/app/(fr)/fr/tarifs/page.tsx",
  "src/app/(en)/website-cost-canada/page.tsx",
  "src/app/(fr)/fr/prix-site-web-quebec/page.tsx",
].map((path) => ({ path, body: readFileSync(path, "utf8") }));

describe("published copy agrees with the pricing model", () => {
  it("reads some content at all", () => {
    expect(FILES.length).toBeGreaterThan(10);
  });

  /**
   * The retired names. "SEO Growth" on its own is the family name and appears
   * inside both real product names, so the patterns anchor on the full
   * retired label rather than the bare word.
   */
  const RETIRED = [
    /Growth SEO\s*[—–-]\s*Essential\b/,
    /Growth SEO\s*[—–-]\s*Growth\b/,
    /SEO Growth\s*[—–-]\s*Growth\b/,
    /\$600 CAD\/month \(Essential\)/,
    /\$850 CAD\/month \(Growth\)/,
  ];

  it.each([...FILES, ...PAGES])("$path uses no retired plan name", ({ body }) => {
    for (const pattern of RETIRED) {
      expect(body, `matched retired name ${pattern}`).not.toMatch(pattern);
    }
  });

  /**
   * Prose puts the price on either side of the name — "$600 CAD/month (SEO
   * Growth — Essentials)" and "SEO Growth — Essentials, $600 CAD/month" are
   * both natural — so a one-directional proximity match produces false
   * positives. Instead: look at every figure within a window on BOTH sides,
   * require the product's own price to be among them, and require every
   * figure in that window to be an approved price. That still catches
   * "Essentials at $700" while allowing a sentence that names both plans.
   */
  it("quotes the approved monthly prices correctly wherever it names them", () => {
    const approved = RECURRING.filter((r) => r.approved);
    /**
     * Any approved price may legitimately sit beside a plan name — a card that
     * reads "care plan $150/mo, or a one-off audit at $150" is correct copy.
     * What must never appear is a figure StillAwake does not actually charge.
     */
    const approvedAmounts = new Set<number | null>([
      ...approved.map((r) => r.monthly),
      ...APPROVED_ONE_TIME_PRICES,
    ]);
    const WINDOW = 60;

    for (const product of approved) {
      const name = RECURRING_LABELS[product.id].en;
      // Em dash vs hyphen varies between prose and JSX props.
      const namePattern = new RegExp(name.replace(/\s*[—–-]\s*/g, "\\s*[—–-]\\s*"), "g");

      for (const { path, body } of [...FILES, ...PAGES]) {
        for (const hit of body.matchAll(namePattern)) {
          const at = hit.index ?? 0;
          const window = body.slice(Math.max(0, at - WINDOW), at + hit[0].length + WINDOW);
          const amounts = [...window.matchAll(/\$\s?([\d,]+)/g)].map((m) =>
            Number(m[1].replace(/,/g, "")),
          );
          if (amounts.length === 0) continue; // named without a price is fine

          expect(
            amounts,
            `${path}: "${name}" appears near ${amounts.map((a) => `$${a}`).join(", ")} — its own price is missing`,
          ).toContain(product.monthly);

          for (const amount of amounts) {
            expect(
              approvedAmounts,
              `${path}: "${name}" appears near unapproved figure $${amount}`,
            ).toContain(amount);
          }
        }
      }
    }
  });

  /**
   * Draft catalogue rows carry candidate prices the operator can see, but
   * publishing one would be inventing a price StillAwake has not agreed to
   * charge.
   *
   * As of 2026-08-15 the whole ladder is approved, so this currently guards
   * nothing — deliberately. It is derived from the model rather than
   * hardcoded, which means the next drafted price is protected the moment it
   * is added, with no test to remember to write. Do not delete it for looking
   * vacuous; that is the point.
   */
  it("never publishes an unapproved catalogue price", () => {
    const unapproved = RECURRING.filter((r) => !r.approved && r.monthly !== null);

    for (const { path, body } of [...FILES, ...PAGES]) {
      for (const row of unapproved) {
        const amount = row.monthly!.toLocaleString("en-US");
        const pattern = new RegExp(
          `\\$${amount.replace(",", ",?")}\\s*(CAD)?\\s*(\\/|per )\\s*month`,
          "i",
        );
        expect(body, `${path} publishes the unapproved price for ${row.id}`).not.toMatch(pattern);
      }
    }
  });

  /**
   * EMERGENCY SUPPORT lived only in JSX and in Stripe until 2026-08-15 — three
   * hand-kept copies of six numbers with nothing comparing them. These two
   * tests are the comparison that was missing.
   */
  describe("emergency support matches the kernel", () => {
    const TIERS = Object.values(EMERGENCY).flatMap((track) =>
      track.tiers.map((tier) => ({ ...tier, track: track.id })),
    );
    const TIER_PRICES = new Set(TIERS.map((t) => t.price));

    /**
     * The pages that SELL emergency support render every figure from EMERGENCY,
     * so the strongest thing to assert is the absence of a hardcoded one. A
     * literal reappearing here is someone quietly re-introducing the fourth
     * copy of these numbers.
     */
    const RENDERED = [
      "src/app/(en)/pricing/page.tsx",
      "src/app/(fr)/fr/tarifs/page.tsx",
      "src/app/(en)/website-maintenance/page.tsx",
      "src/app/(fr)/fr/maintenance-site-web/page.tsx",
    ].map((path) => ({ path, body: readFileSync(path, "utf8") }));

    it.each(RENDERED)("$path hardcodes no emergency price", ({ body }) => {
      for (const price of TIER_PRICES) {
        /**
         * "$150" (en) or "150 $" (fr) written out as a literal, not computed.
         *
         * The French form needs both lookbehinds: Québec French separates
         * thousands with a space, so "4 250 $" ends in the exact characters
         * "250 $" and a naive \b would flag every store price on the page.
         */
        expect(body, `hardcodes $${price} — render it from EMERGENCY instead`).not.toMatch(
          new RegExp(`(\\$\\s?${price}\\b|(?<!\\d)(?<!\\d )${price}\\s?\\$(?!\\{))`),
        );
      }
    });

    it("renders each emergency track from the kernel on both locales", () => {
      for (const { path, body } of RENDERED) {
        expect(body, `${path} no longer reads EMERGENCY`).toMatch(/EMERGENCY/);
      }
    });

    /**
     * Prose is still hand-written, and prose is where a remembered price gets
     * typed. Any figure sitting next to the word "emergency" has to be one we
     * actually charge.
     */
    it("quotes no invented figure beside the word emergency", () => {
      const WINDOW = 130;
      /**
       * Prose only. The rendering pages are covered by the stronger check
       * above, and scanning their source here matches the IDENTIFIER
       * `EMERGENCY` rather than the English word — which drags the whole
       * pricing kernel import into the window and reports figures that exist
       * nowhere in the published copy.
       */
      const PROSE = [...FILES, ...PAGES.filter((p) => /website-cost-canada|prix-site-web/.test(p.path))];

      for (const { path, body } of PROSE) {
        for (const hit of body.matchAll(/\b(emergency|urgence)\b/g)) {
          const at = hit.index ?? 0;
          const window = body.slice(Math.max(0, at - WINDOW), at + WINDOW);
          /* "$150" and Québec French's "1 500 $". Both patterns must OPEN on a
             digit: `[\d,]+` happily matches a bare comma or run of spaces,
             which Number() then reports as a phantom $0 nobody wrote. */
          const amounts = [
            ...window.matchAll(/\$\s?(\d[\d,]*)/g),
            ...window.matchAll(/(\d[\d ,]*)\s\$/g),
          ].map((m) => Number(m[1].replace(/[,\s]/g, "")));

          for (const amount of amounts) {
            /* Care plans and monthly figures legitimately sit in the same
               paragraph — what must not appear is an emergency-shaped price
               that is not an emergency price. */
            if (amount > 1000) continue;
            expect(
              [...TIER_PRICES, ...APPROVED_ONE_TIME_PRICES, ...RECURRING.map((r) => r.monthly)],
              `${path}: $${amount} appears beside "${hit[0]}" but is not a price we charge`,
            ).toContain(amount);
          }
        }
      }
    });
  });

  /**
   * The one-time entry products are the cheapest thing StillAwake sells, which
   * makes them the ones most likely to be quoted from memory in an article.
   */
  it("quotes the one-time services at their kernel price wherever it names them", () => {
    const approvedFigures = new Set<number>([
      ...APPROVED_ONE_TIME_PRICES,
      ...RECURRING.filter((r) => r.approved).map((r) => r.monthly!),
    ]);
    const WINDOW = 50;

    for (const service of Object.values(ONE_TIME).filter((s) => s.approved)) {
      const name = ONE_TIME_LABELS[service.id].en;
      for (const { path, body } of [...FILES, ...PAGES]) {
        for (const hit of body.matchAll(new RegExp(escapeRegExp(name), "g"))) {
          const at = hit.index ?? 0;
          const window = body.slice(Math.max(0, at - WINDOW), at + hit[0].length + WINDOW);
          const amounts = [...window.matchAll(/\$\s?([\d,]+)/g)].map((m) =>
            Number(m[1].replace(/,/g, "")),
          );
          if (amounts.length === 0) continue;

          expect(
            amounts,
            `${path}: "${name}" appears near ${amounts.map((a) => `$${a}`).join(", ")} — its own price is missing`,
          ).toContain(service.price);

          for (const amount of amounts) {
            expect(
              approvedFigures,
              `${path}: "${name}" appears near unapproved figure $${amount}`,
            ).toContain(amount);
          }
        }
      }
    }
  });
});

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
