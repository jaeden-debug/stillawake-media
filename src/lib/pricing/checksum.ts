/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SHARED PRICING KERNEL — 4 of 5 · DRIFT DETECTION
 *
 * CANONICAL SOURCE: stillawake-media (.com). Synced to .dev.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * .com and .dev are separate repos and separate deployments, so nothing at
 * runtime can stop the two copies of the model diverging. What CAN be stopped
 * is the failure mode that actually happens: someone opens the .dev copy,
 * nudges a number to make one estimate look right, and ships a second pricing
 * reality nobody knows exists.
 *
 * So the checksum is computed over the model's own source with the checksum
 * literal itself blanked out, and written INTO the file. Each repo's
 * `model.test.ts` recomputes it from disk. Hand-edit either copy and that
 * repo's suite fails; the only way to change a price is to edit the canonical
 * file and re-run `scripts/sync-pricing.mjs`, which rewrites both.
 *
 * Known limit, stated plainly: this catches hand-editing, not a stale sync.
 * If .com's model changes and the script is never run, .dev keeps an older
 * model that still passes its own test. The mitigation is that every stored
 * estimate records both `pricing_version` and `model_checksum`, so a drifted
 * estimate is identifiable after the fact. A private package or submodule is
 * the real fix once there is a reason to pay for one.
 */

import { createHash } from "node:crypto";

/** Matches the literal the sync script writes, whatever its current value. */
const CHECKSUM_LINE = /export const MODEL_CHECKSUM = "[^"]*";/;

export const CHECKSUM_PLACEHOLDER = '__MODEL_CHECKSUM__';

/**
 * Hashes model source with the checksum literal neutralised, so the value can
 * live in the same file it describes without chasing its own tail.
 */
export function modelChecksum(source: string): string {
  const normalised = source
    .replace(CHECKSUM_LINE, 'export const MODEL_CHECKSUM = "";')
    // Windows checkouts must not produce a different hash than macOS ones.
    .replace(/\r\n/g, "\n");
  return createHash("sha256").update(normalised, "utf8").digest("hex").slice(0, 16);
}
