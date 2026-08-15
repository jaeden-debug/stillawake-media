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
 * A STALE SYNC is the other failure, and it is caught somewhere else on
 * purpose. Nothing inside .dev can detect that .com has moved on — .dev has no
 * way to see what .com says. So that check lives in the canonical repo, where
 * every pricing change necessarily happens:
 *
 *   · `sync.test.ts` (.com) compares both copies file by file and asserts the
 *     versions match, skipping visibly when .dev is not on disk
 *   · `prebuild` runs `sync-pricing.mjs --check`, so a local production build
 *     refuses to ship a stale sync — and whoever changed a price is by
 *     definition the person with both repos checked out
 *
 * What remains uncovered is narrow and worth naming: a CI or Vercel build has
 * no .dev checkout, so the cross-repo assertion skips there. That is why every
 * stored estimate also records `pricing_version` and `model_checksum` — if a
 * mismatch ever did ship, the affected estimates are identifiable rather than
 * merely suspected. A private package remains the tidier answer once there is
 * a reason to pay for the publishing step.
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
