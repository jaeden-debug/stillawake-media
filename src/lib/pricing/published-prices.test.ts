import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { RECURRING } from "./model";
import { RECURRING_LABELS } from "./labels";

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
    const approvedAmounts = new Set(approved.map((r) => r.monthly));
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
   * charge. $40 hosting and $1,200 content are the two most likely to leak.
   */
  it("never publishes an unapproved catalogue price", () => {
    for (const { path, body } of [...FILES, ...PAGES]) {
      expect(body, `${path} mentions the unapproved hosting price`).not.toMatch(
        /\$40\s*(CAD)?\s*(\/|per )\s*month/i,
      );
      expect(body, `${path} mentions the unapproved content price`).not.toMatch(
        /\$1,?200\s*(CAD)?\s*(\/|per )\s*month/i,
      );
    }
  });
});
