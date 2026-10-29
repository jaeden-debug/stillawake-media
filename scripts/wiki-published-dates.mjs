#!/usr/bin/env node
/**
 * Records the date each game wiki entry was first published, for the
 * Article `datePublished` in its structured data.
 *
 * "Published" means the entry's slug first reached origin/main, which is what
 * Vercel deploys. That is read from git history, never estimated. Entries that
 * are not on main yet are stamped with today's date, on the assumption that
 * this runs as part of shipping them.
 *
 * Existing dates are never rewritten, so the file stays stable once an entry
 * has a date. Run after adding wiki entries:
 *
 *   node scripts/wiki-published-dates.mjs
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const outFile = path.join(root, "src/data/games/wiki-published.json");
const gamesDir = path.join(root, "src/data/games");
const today = new Date().toISOString().slice(0, 10);

const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();

const existing = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, "utf8")) : {};
const out = {};

for (const game of fs.readdirSync(gamesDir).sort()) {
  const wikiDir = path.join(gamesDir, game, "wiki");
  if (!fs.existsSync(wikiDir)) continue;
  const rel = path.relative(root, wikiDir);
  const slugs = new Set();
  for (const file of fs.readdirSync(wikiDir)) {
    const src = fs.readFileSync(path.join(wikiDir, file), "utf8");
    for (const m of src.matchAll(/\bslug: "([^"]+)"/g)) slugs.add(m[1]);
  }
  out[game] = {};
  for (const slug of [...slugs].sort()) {
    const known = existing[game]?.[slug];
    if (known) {
      out[game][slug] = known;
      continue;
    }
    const dates = git("log", "origin/main", "--first-parent", "--format=%cs", `-Sslug: "${slug}"`, "--", rel);
    out[game][slug] = dates ? dates.split("\n").at(-1) : today;
  }
}

fs.writeFileSync(outFile, `${JSON.stringify(out, null, 2)}\n`);
console.log(`wrote ${path.relative(root, outFile)}`);
