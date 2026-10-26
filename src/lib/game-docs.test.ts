import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { gameBundles } from "@/data/games";
import { contentAuditMd, routeInventoryMd, screenshotChecklistMd, screenshotManifestJson } from "@/lib/game-docs";

/**
 * The generated docs must match the registries. Run with UPDATE_DOCS=1 to
 * rewrite them after changing content or media.
 */
const root = path.join(process.cwd(), "docs", "games-platform");

function check(file: string, content: string) {
  const full = path.join(root, file);
  if (process.env.UPDATE_DOCS) {
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  }
  expect(fs.existsSync(full), `${file} missing: run UPDATE_DOCS=1 npx vitest run src/lib/game-docs.test.ts`).toBe(true);
  expect(fs.readFileSync(full, "utf8"), `${file} is stale: regenerate with UPDATE_DOCS=1`).toBe(content);
}

describe("generated games docs", () => {
  it("route inventory is current", () => check("ROUTE-INVENTORY.md", routeInventoryMd()));

  for (const b of gameBundles) {
    it(`${b.game.slug} content audit is current`, () => check(`${b.game.slug}/CONTENT-AUDIT.md`, contentAuditMd(b)));
    it(`${b.game.slug} screenshot checklist is current`, () => check(`${b.game.slug}/SCREENSHOT-CHECKLIST.md`, screenshotChecklistMd(b)));
    it(`${b.game.slug} screenshot manifest is current`, () => check(`${b.game.slug}/screenshot-manifest.json`, screenshotManifestJson(b)));
  }
});
