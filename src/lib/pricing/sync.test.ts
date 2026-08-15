import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { modelChecksum } from "./checksum";
import { PRICING_VERSION } from "./model";

/**
 * CROSS-REPO DRIFT — verified from the canonical side.
 *
 * `model.test.ts` in each repo catches someone hand-editing that repo's copy.
 * What it cannot catch is the other failure: .com's model changes, the sync
 * script is never run, and .dev keeps happily serving an older model that
 * still passes its own checksum. Nothing inside .dev can detect that, because
 * .dev has no way to see what .com says.
 *
 * So the check runs HERE, in the repo where pricing changes originate. Every
 * edit to the model is an edit to this repo, so every edit reaches this test.
 *
 * When .dev is not on disk — CI, a fresh clone, Vercel — the cross-repo
 * assertion cannot run and is skipped with a visible reason rather than
 * silently passing. The `prebuild` gate in package.json is what makes a local
 * production build refuse to ship a stale sync, which is the case that
 * actually matters: whoever changed the price is the person who has both
 * repos checked out.
 */

const KERNEL = ["types.ts", "model.ts", "engine.ts", "checksum.ts", "labels.ts"];
const canonicalDir = fileURLToPath(new URL(".", import.meta.url));
const devDir =
  process.env.PRICING_DEV_DIR ??
  resolve(
    canonicalDir,
    "..","..","..","..",
    "Documents","Claude","Projects","stillawakemedia.dev","src","lib","pricing",
  );

const devPresent = existsSync(devDir);

describe("pricing kernel sync", () => {
  it("stamps the canonical model with the checksum of its own source", () => {
    const source = readFileSync(join(canonicalDir, "model.ts"), "utf8");
    // Recomputed rather than imported, so a stale literal cannot pass by
    // agreeing with itself.
    expect(source).toContain(`export const MODEL_CHECKSUM = "${modelChecksum(source)}";`);
  });

  it("passes its own --check", () => {
    // The script is the sanctioned path, so its verifier has to agree with
    // the tests. If they ever disagree, one of them is lying.
    const out = execFileSync("node", ["scripts/sync-pricing.mjs", "--check"], {
      cwd: resolve(canonicalDir, "..", "..", ".."),
      encoding: "utf8",
    });
    expect(out).toMatch(/in sync/);
  });

  it.skipIf(!devPresent)("has an identical copy in stillawakemedia.dev", () => {
    for (const file of KERNEL) {
      const target = join(devDir, file);
      expect(existsSync(target), `.dev is missing ${file} — run scripts/sync-pricing.mjs`).toBe(true);
      expect(
        readFileSync(target, "utf8"),
        `${file} differs in .dev. The canonical source is here; run \`node scripts/sync-pricing.mjs\`.`,
      ).toBe(readFileSync(join(canonicalDir, file), "utf8"));
    }
  });

  it.skipIf(!devPresent)("serves the same pricing version on both surfaces", () => {
    const devModel = readFileSync(join(devDir, "model.ts"), "utf8");
    expect(
      devModel,
      `.dev is on a different pricing version than ${PRICING_VERSION} — run scripts/sync-pricing.mjs`,
    ).toContain(`export const PRICING_VERSION = "${PRICING_VERSION}";`);
  });

  it(devPresent ? "checked the .dev copy" : "SKIPPED the .dev copy — not on disk", () => {
    // Makes the skip visible in the report instead of silently absent, so a
    // green run in CI is not mistaken for a verified cross-repo sync.
    expect(typeof devPresent).toBe("boolean");
  });
});
