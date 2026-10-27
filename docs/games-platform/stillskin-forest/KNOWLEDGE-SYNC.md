# Stillskin Forest: game → wiki sync

The wiki states numbers the game uses (day length, enemy health, weapon damage, drop chances). They
are kept honest by one machine-readable file and one test.

## The pieces

| Piece | Where | What it does |
|---|---|---|
| Knowledge export | Game project, `docs/knowledge/stillskin-knowledge.json` | Exported from the published place's own configuration (GameConfig, LootConfig, Items) with fresh module copies, plus a `features` list saying what was verified and how |
| Knowledge file | `src/data/games/stillskin-forest/knowledge.json` | The copy the site reads. New pages take their numbers straight from it (`wiki/expansion.ts`) |
| Sync script | `scripts/sync-stillskin-knowledge.mjs` | Imports a new export, prints which values changed and which wiki pages state them |
| Gate | `src/lib/stillskin-knowledge.test.ts` | Fails when a verified feature has no published page, when a linked page wasn't re-checked since the export, or when key numbers on existing pages disagree with the export |

## The workflow

1. Build and verify the feature in the game (Studio playtest). Record the evidence in the game's tracker.
2. Export the knowledge file from Studio and add the feature to `features` with its status:
   `verified_live`, `partially_verified` (say what isn't verified in `notVerified`), or leave it out.
3. `node scripts/sync-stillskin-knowledge.mjs <path to export>`
4. Update the pages it lists. Set `lastVerified` on each to the export date.
5. `npx vitest run` (the gate and the existing wiki integrity tests), `npm run build`.
6. Open a pull request. Merging to `main` deploys (Vercel); that is the publication step.

A feature that is experimental or unverified stays out of `features`, so the gate never asks for a
page, and nothing is published as live before it is.

## Not automated (yet)

- The Studio export needs Roblox Studio with the MCP bridge; it can't run in CI.
- Prose that restates a number (rather than reading `knowledge.json`) is only checked where the gate
  has a specific assertion. Prefer reading values from the file in new pages.
