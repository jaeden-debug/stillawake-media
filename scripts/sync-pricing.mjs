#!/usr/bin/env node
/**
 * Syncs the canonical pricing kernel from .com to .dev.
 *
 * Run this after ANY edit to src/lib/pricing/{types,model,engine,checksum,labels,payments}.ts.
 * It stamps model.ts with a fresh checksum and copies all six files verbatim
 * into stillawakemedia.dev, which is what makes the copies byte-identical and
 * lets both repos' `model.test.ts` verify the same hash.
 *
 *   node scripts/sync-pricing.mjs            # sync
 *   node scripts/sync-pricing.mjs --check    # verify only, non-zero on drift
 *
 * The .dev path is resolved relative to this repo because the two projects sit
 * side by side in the same workspace. Override with PRICING_DEV_DIR when they
 * do not.
 */

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const canonicalDir = resolve(here, "..", "src", "lib", "pricing");

const devDir =
  process.env.PRICING_DEV_DIR ??
  resolve(here, "..", "..", "Documents", "Claude", "Projects", "stillawakemedia.dev", "src", "lib", "pricing");

/* Studio needs the kernel too, so the intake can offer a rough estimate from
   the answers someone has already given. It only ever runs it on the server —
   shipping model.ts to a browser would publish the whole price list. */
const studioDir =
  process.env.PRICING_STUDIO_DIR ??
  resolve(here, "..", "..", "Documents", "Claude", "Projects", "stillawake.studio", "src", "lib", "pricing");

const FILES = ["types.ts", "model.ts", "engine.ts", "checksum.ts", "labels.ts", "payments.ts", "intake-mapping.ts", "breakdown.ts"];
const CHECKSUM_LINE = /export const MODEL_CHECKSUM = "[^"]*";/;

/** Must stay identical to `modelChecksum` in checksum.ts. */
function computeChecksum(source) {
  const normalised = source
    .replace(CHECKSUM_LINE, 'export const MODEL_CHECKSUM = "";')
    .replace(/\r\n/g, "\n");
  return createHash("sha256").update(normalised, "utf8").digest("hex").slice(0, 16);
}

const checkOnly = process.argv.includes("--check");

const modelPath = join(canonicalDir, "model.ts");
let model = readFileSync(modelPath, "utf8");
if (!CHECKSUM_LINE.test(model)) {
  console.error("model.ts has no MODEL_CHECKSUM export — cannot stamp it.");
  process.exit(1);
}

const checksum = computeChecksum(model);
const stamped = model.replace(CHECKSUM_LINE, `export const MODEL_CHECKSUM = "${checksum}";`);

const problems = [];

if (stamped !== model) {
  if (checkOnly) problems.push("model.ts checksum is stale");
  else {
    writeFileSync(modelPath, stamped, "utf8");
    console.log(`stamped model.ts → ${checksum}`);
  }
  model = stamped;
}

/* Both consumers of the kernel. Studio is optional in the sense that a machine
   without it checked out should not fail the check — but when it is there, it
   must match byte for byte like .dev does. */
const targets = [
  { name: ".dev", dir: devDir },
  { name: "studio", dir: studioDir },
];

for (const { name, dir } of targets) {
  if (!existsSync(dir)) {
    if (checkOnly) {
      console.log(`${name} copy not reachable at ${dir} — skipping cross-repo check.`);
      continue;
    }
    mkdirSync(dir, { recursive: true });
  }

  for (const file of FILES) {
    const source = file === "model.ts" ? model : readFileSync(join(canonicalDir, file), "utf8");
    const target = join(dir, file);
    const current = existsSync(target) ? readFileSync(target, "utf8") : null;
    if (current === source) continue;
    if (checkOnly) problems.push(`${file} differs in ${name}`);
    else {
      writeFileSync(target, source, "utf8");
      console.log(`synced ${file} → ${target}`);
    }
  }
}

if (problems.length) {
  console.error("Pricing kernel is out of sync:\n  " + problems.join("\n  "));
  console.error("Run: node scripts/sync-pricing.mjs");
  process.exit(1);
}

if (checkOnly) console.log(`pricing kernel in sync (checksum ${checksum})`);
