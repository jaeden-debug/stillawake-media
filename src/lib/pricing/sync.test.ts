import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { PRICING_VERSION } from "./model";

/**
 * CROSS-REPO DRIFT — verified from the canonical side.
 *
 * `model.test.ts` in each repo catches a hand-edit. What it cannot catch is
 * .com moving on without the sync being run, because .dev has no way to see
 * what .com says. So that check lives here, where pricing changes originate.
 */
const KERNEL = ["types.ts", "model.ts", "engine.ts", "checksum.ts", "labels.ts"];
const canonicalDir = fileURLToPath(new URL(".", import.meta.url));
const devDir =
  process.env.PRICING_DEV_DIR ??
  resolve(canonicalDir, "..", "..", "..", "..", "Documents", "Claude", "Projects", "stillawakemedia.dev", "src", "lib", "pricing");
const devPresent = existsSync(devDir);

describe("pricing kernel sync", () => {
  it("passes its own --check", () => {
    const out = execFileSync("node", ["scripts/sync-pricing.mjs", "--check"], {
      cwd: resolve(canonicalDir, "..", "..", ".."),
      encoding: "utf8",
    });
    expect(out).toMatch(/in sync/);
  });

  it.skipIf(!devPresent)("has an identical copy in stillawakemedia.dev", () => {
    for (const file of KERNEL) {
      expect(existsSync(join(devDir, file)), `.dev is missing ${file}`).toBe(true);
      expect(readFileSync(join(devDir, file), "utf8"), `${file} differs — run scripts/sync-pricing.mjs`).toBe(
        readFileSync(join(canonicalDir, file), "utf8"),
      );
    }
  });

  it.skipIf(!devPresent)("serves the same pricing version on both surfaces", () => {
    expect(readFileSync(join(devDir, "model.ts"), "utf8")).toContain(
      `export const PRICING_VERSION = "${PRICING_VERSION}";`,
    );
  });

  it(devPresent ? "checked the .dev copy" : "SKIPPED the .dev copy — not on disk", () => {
    // Makes the skip visible so a green CI run is not mistaken for a verified sync.
    expect(typeof devPresent).toBe("boolean");
  });
});
