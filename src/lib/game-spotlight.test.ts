import { describe, expect, it } from "vitest";
import { gameBundles } from "@/data/games";
import { entryPath, publishedEntries } from "@/lib/games";

describe("game spotlight data", () => {
  for (const bundle of gameBundles) {
    const spot = bundle.game.spotlight;
    if (!spot) continue;
    it(`${bundle.game.slug}: every link points at a real page and has both labels`, () => {
      const wikiPaths = new Set(publishedEntries(bundle).map((e) => entryPath(bundle.game.slug, e)));
      const base = `/games/${bundle.game.slug}`;
      for (const link of spot.links) {
        expect(link.labelEn.length).toBeGreaterThan(0);
        expect(link.labelFr.length).toBeGreaterThan(0);
        expect(link.href === base || link.href === `${base}/wiki` || wikiPaths.has(link.href)).toBe(true);
      }
      expect(spot.blurbEn.length).toBeLessThanOrEqual(200);
      expect(spot.blurbFr.length).toBeLessThanOrEqual(220);
    });
  }
});
