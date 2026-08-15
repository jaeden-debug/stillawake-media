#!/usr/bin/env node
/**
 * Syncs the canonical pricing kernel from .com to .dev.
 *
 * Run this after ANY edit to src/lib/pricing/{types,model,engine,checksum,labels}.ts.
 * It stamps model.ts with a fresh checksum and copies all five files verbatim
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

const FILES = ["types.ts", "model.ts", "engine.ts", "checksum.ts", "labels.ts"];
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

if (!existsSync(devDir)) {
  if (checkOnly) {
    console.log(`.dev copy not reachable at ${devDir} — skipping cross-repo check.`);
  } else {
    mkdirSync(devDir, { recursive: true });
  }
}

if (existsSync(devDir)) {
  for (const file of FILES) {
    const source = file === "model.ts" ? model : readFileSync(join(canonicalDir, file), "utf8");
    const target = join(devDir, file);
    const current = existsSync(target) ? readFileSync(target, "utf8") : null;
    if (current === source) continue;
    if (checkOnly) problems.push(`${file} differs in .dev`);
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
