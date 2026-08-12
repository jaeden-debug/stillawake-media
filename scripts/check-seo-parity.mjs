/**
 * SEO parity gate: every registry service with a frPath must have BOTH page
 * files on disk, and removed cannibal articles must stay gone.
 * Run: node scripts/check-seo-parity.mjs   (fails CI on violation)
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registry = fs.readFileSync(path.join(root, "src/data/services.ts"), "utf8");
const enPaths = [...registry.matchAll(/enPath: "([^"]+)"/g)].map((m) => m[1]);
const frPaths = [...registry.matchAll(/frPath: "([^"]+)"/g)].map((m) => m[1]);

const pageFile = (p) =>
  p.startsWith("/fr/")
    ? path.join(root, "src/app/(fr)", p.slice(1), "page.tsx")
    : path.join(root, "src/app/(en)", p.slice(1), "page.tsx");

let failures = 0;
for (const p of [...new Set([...enPaths, ...frPaths])]) {
  if (!fs.existsSync(pageFile(p))) {
    console.error(`MISSING PAGE: ${p} -> ${pageFile(p)}`);
    failures++;
  }
}

for (const slug of ["web-design-montreal", "seo-montreal", "agence-web-montreal"]) {
  const f = path.join(root, "src/content/stillawake-times", `${slug}.md`);
  if (fs.existsSync(f)) {
    console.error(`CANNIBAL ARTICLE RESTORED: ${f} (duplicates a service page)`);
    failures++;
  }
}

const pairs = [...registry.matchAll(/enPath: "([^"]+)",\s*\n\s*frPath: "([^"]+)"/g)].map((m) => [m[1], m[2]]);
for (const [en, fr] of pairs) {
  const enSrc = fs.existsSync(pageFile(en)) ? fs.readFileSync(pageFile(en), "utf8") : "";
  const frSrc = fs.existsSync(pageFile(fr)) ? fs.readFileSync(pageFile(fr), "utf8") : "";
  if (enSrc && !enSrc.includes(`stillawakemedia.com${fr}`)) {
    console.error(`HREFLANG MISSING: ${en} does not reference ${fr}`);
    failures++;
  }
  if (frSrc && !frSrc.includes(`stillawakemedia.com${en}`)) {
    console.error(`HREFLANG MISSING: ${fr} does not reference ${en}`);
    failures++;
  }
}

if (failures) {
  console.error(`\nseo-parity: ${failures} failure(s)`);
  process.exit(1);
}
console.log(`seo-parity: OK (${pairs.length} EN/FR pairs, ${new Set([...enPaths, ...frPaths]).size} routes)`);
