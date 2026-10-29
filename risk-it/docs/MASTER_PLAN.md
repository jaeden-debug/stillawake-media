# RISK IT! — Master Plan

Studio: StillAwake Media · Platform: Roblox · Version: 0.2.0 (2026-10-26)

Related: [PROGRESS_CHECKLIST](PROGRESS_CHECKLIST.md) · [RESEARCH_AND_DESIGN_DECISIONS](RESEARCH_AND_DESIGN_DECISIONS.md)
· [ARCHITECTURE](ARCHITECTURE.md) · [TEST_PLAN](TEST_PLAN.md) · [PLAYTEST_FINDINGS](PLAYTEST_FINDINGS.md)
· [RELEASE_CHECKLIST](RELEASE_CHECKLIST.md)

## Goal

A solo-complete, instantly understood experience of short challenges where failure is spectacular,
funny and immediately retryable, ready for a controlled public playtest.

## The first five minutes

1. Spawn on the neon hub. Five glowing islands are visible; a sparkle beam points at THE BUTTON;
   a hint says "Walk onto a glowing pad and RISK IT!".
2. ~3 s walk. A branded "RISK IT!" prompt pops (tap/E/X).
3. Intro slab + letterbox + camera framing (1.25 s), then the challenge.
4. Outcome in 5–20 s: win → confetti, headline, +GUTS, medal/best chips; fail → ragdoll launch,
   crowd laugh, headline stamp, "WIPEOUT #n".
5. Land beside the pad facing it; "RISK IT AGAIN" button (R/tap) for an instant retry, or walk to
   the next island. Station signs show your best + medal; 15 medals and the Hot Seat give goals.

## Stages

| Stage | Status | Exit evidence |
|---|---|---|
| 1 Discovery & research | Partial — environment verified; market research not yet done (R-2) | This doc set |
| 2 Playable prototype | VERIFIED in Studio | Regression run, screenshots |
| 3 Core systems | VERIFIED in Studio (except DataStore persistence, which needs a published place) | TEST_PLAN results |
| 4 Creative identity | First pass done; needs human playtest feedback | Screenshots |
| 5 Replayability | 8 challenges, 24 medals, PBs, titles, Hot Seat, cosmetic shop (v0.2) | regression run |
| 6 Testing | Solo functional + abuse tests pass; multiplayer, mobile and latency untested | TEST_PLAN |
| 7 Release prep | Not started: needs publishing, icon, thumbnails, audio swaps | RELEASE_CHECKLIST |
| 8 Iteration | Waiting on real playtest data | PLAYTEST_FINDINGS |

## Next highest-value work (in order)

1. Publish to a private place and verify DataStore save/load, session lock and BindToClose (needs owner).
2. Multiplayer + latency playtest (2–4 real players, one on mobile): ragdoll feel, Sweeper hit fairness.
3. Replace the three low-confidence community sound effects.
4. Market research pass (R-2) to validate the direction and inform the next 3 challenges.
5. ~~Content: 3 more challenges + cosmetic GUTS sink~~ — done in v0.2 (MELTDOWN, COPY THAT,
   LONG SHOT; THE VAULT with 5 trails + 5 bursts). Next content: tune prices from real playtests.
6. Global leaderboard per challenge (OrderedDataStore) once persistence is verified.
