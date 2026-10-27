#!/usr/bin/env node
// Imports a new Stillskin Forest knowledge export and reports which wiki pages it affects.
//
//   node scripts/sync-stillskin-knowledge.mjs <path/to/stillskin-knowledge.json>
//
// The export comes from the game project (docs/knowledge/stillskin-knowledge.json), written by the
// Studio export script from the game's own configuration after features are verified. This script:
//   1. diffs the new values against src/data/games/stillskin-forest/knowledge.json,
//   2. lists the wiki pages tied to changed values or newly verified features,
//   3. writes the new file in place.
// Then run `npx vitest run src/lib/stillskin-knowledge.test.ts`: it fails until every affected page
// states the new numbers and carries the new verification date. Nothing is published by this script;
// publishing is the normal pull request to main (Vercel deploys main).
import fs from "node:fs";
import path from "node:path";

const target = path.resolve("src/data/games/stillskin-forest/knowledge.json");
const source = process.argv[2];
if (!source) {
  console.error("usage: node scripts/sync-stillskin-knowledge.mjs <stillskin-knowledge.json>");
  process.exit(1);
}
const next = JSON.parse(fs.readFileSync(source, "utf8"));
const prev = fs.existsSync(target) ? JSON.parse(fs.readFileSync(target, "utf8")) : { values: {}, features: [] };

const changed = [];
(function walk(a, b, at) {
  const keys = new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})]);
  for (const k of keys) {
    const x = a?.[k], y = b?.[k], p = at ? `${at}.${k}` : k;
    if (x && y && typeof x === "object" && typeof y === "object") walk(x, y, p);
    else if (JSON.stringify(x) !== JSON.stringify(y)) changed.push({ path: p, from: x, to: y });
  }
})(prev.values, next.values, "");

// value areas -> wiki pages that state them
const PAGES = {
  cycle: ["day-night-cycle"], headlamp: ["headlamp", "headlamp-upgrades"], zombies: ["enemy-comparison", "soldier"],
  helmetHeadshot: ["soldier"], nightHunt: ["night-survival"], night: ["night-survival"], ammoDrops: ["night-survival", "ammunition"],
  military: ["blackpine-airfield"], armor: ["military-armor"], generators: ["generators-and-gas-cans"],
  building: ["doors-and-building"], items: ["weapons-compared", "mini-ak", "military-armor"], airfield: ["soldier"],
};
const affected = new Set();
for (const c of changed) for (const page of PAGES[c.path.split(".")[0]] ?? []) affected.add(page);
const known = new Set((prev.features ?? []).map((f) => `${f.id}:${f.status}`));
for (const f of next.features ?? []) if (!known.has(`${f.id}:${f.status}`)) for (const page of f.wiki ?? []) affected.add(page);

fs.writeFileSync(target, JSON.stringify(next, null, 2) + "\n");
console.log(`${changed.length} value(s) changed${changed.length ? ":" : "."}`);
for (const c of changed.slice(0, 60)) console.log(`  ${c.path}: ${JSON.stringify(c.from)} -> ${JSON.stringify(c.to)}`);
console.log(`Wiki pages to review (${affected.size}): ${[...affected].sort().join(", ") || "none"}`);
console.log("Next: update those pages, then run `npx vitest run src/lib/stillskin-knowledge.test.ts`.");
