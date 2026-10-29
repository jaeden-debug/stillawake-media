# RISK IT! — Progress Checklist

Updated 2026-10-26 (v0.2.2). Statuses: NOT STARTED · IN PROGRESS · BLOCKED · FAILED · VERIFIED.
VERIFIED means the acceptance check ran and the result is recorded in [TEST_PLAN](TEST_PLAN.md).

## Next actions (resume here)

1. **Owner:** save the Studio place (currently the unsaved "Place1" tab) and publish it privately → unblocks P-1.
2. Run Local Server 2–4 players + network lag simulation → M-1, M-2, L-1.
3. Swap the three low-confidence sounds (A-2).
4. Try it on a physical phone via Team Test (performance, portrait, small Android).
5. Market research pass (R-2).

| ID | Task | Pri | Deps | Status | Verification | Actual result / evidence | Blocker |
|---|---|---|---|---|---|---|---|
| E-1 | Inspect environment & tools | P0 | — | VERIFIED | list tools/studios | Studio MCP connected; no Rojo/Wally/Selene; new place created | — |
| R-1 | Choose creative direction | P0 | — | VERIFIED | doc written | [decisions](RESEARCH_AND_DESIGN_DECISIONS.md) | — |
| R-2 | Market + short-form research | P1 | — | NOT STARTED | sources with dates in decisions doc | — | Time-boxed out by "start building" |
| C-1 | Project layout + sync tooling | P0 | — | VERIFIED | sync runs in Studio | 24 scripts synced via `tools/studio_sync.py` | — |
| C-2 | Arena build (hub, 5 islands, lighting, abyss) | P0 | C-1 | VERIFIED | boot + screenshots | "ready: 5 challenges"; captures 7–9 | — |
| C-3 | Challenge lifecycle + single resolution | P0 | C-1 | VERIFIED | regression T1–T13 | 14/14 PASS | — |
| C-4 | Ragdoll + recovery | P0 | C-3 | VERIFIED (solo) | T3/T4 | on during fail, off + standing after | latency untested (L-1) |
| C-5 | THE BUTTON | P0 | C-3 | VERIFIED | T1/T2 | win 20 / trapdoor fail | — |
| C-6 | PERFECT STOP | P0 | C-3 | VERIFIED | T5 | gold, 3 perfects | — |
| C-7 | QUICK DRAW | P0 | C-3 | VERIFIED | T6/T7 | 250 ms win; flinch fail | — |
| C-8 | THE SWEEPER | P0 | C-3 | VERIFIED (solo) | T10 + manual win | swept fail; 5.08 s gold win | hit fairness under lag (L-1) |
| C-9 | DOOR NUMBER WHO | P0 | C-3 | VERIFIED | T8/T9 | 4.85 s gold; blasts | — |
| S-1 | Remote validation + rate limit | P0 | C-3 | VERIFIED | T11/T12 | no session/GUTS from abuse | — |
| S-2 | Death mid-challenge cleanup | P0 | C-3 | VERIFIED | manual script | cancel, station freed, restart OK | — |
| S-3 | Leave mid-challenge cleanup | P1 | C-3 | NOT STARTED | Local Server test | — | needs multi-client |
| P-1 | DataStore persistence (load/save/lock/BindToClose) | P0 | — | BLOCKED | publish + rejoin test | offline fallback works in Studio | place unpublished (owner action) |
| P-2 | Medals, PBs, titles, Hot Seat | P1 | C-3 | VERIFIED (session) | payouts, chips | medal chips; 2x payout 316 | persistence via P-1 |
| U-1 | HUD, intro, panel, stamp, retry | P0 | C-3 | VERIFIED (desktop) | screen captures | captures 3–6 | — |
| U-2 | Mobile layout + touch | P0 | U-1 | VERIFIED (simulator) | Studio Device Simulator, real taps | iPhone XR: prompt, panel, Vault, stamp, retry, movement HUD all pass | physical phone not tested |
| U-3 | Camera framing, FOV, shake (reduced-motion aware) | P1 | U-1 | VERIFIED (desktop) | captures | fixed facing + ragdoll zoom | — |
| A-1 | Licensed audio wired | P1 | — | VERIFIED | ids load in Studio | see decisions doc | — |
| A-2 | Replace 3 low-confidence community SFX | P1 | A-1 | NOT STARTED | ids from licensed uploaders | — | — |
| N-1 | Analytics funnel/custom/economy events | P1 | C-3 | VERIFIED (fires) | console | events fired | dashboard data needs publish |
| M-1 | Multiplayer: occupancy, spectating | P1 | — | NOT STARTED | Local Server 3 players | — | — |
| M-2 | Two players racing for one pad | P1 | M-1 | NOT STARTED | Local Server | — | — |
| L-1 | Latency: ragdoll feel, timing clamps, Sweeper hits | P0 | — | NOT STARTED | 200 ms lag sim | — | — |
| F-1 | Performance budget check | P1 | — | NOT STARTED | MicroProfiler on phone | — | — |
| X-1 | Release assets (icon, thumbnails, description) | P1 | — | NOT STARTED | see release checklist | — | — |
| C-10 | MELTDOWN | P1 | C-3 | VERIFIED | T20 + dodge bot | idle fail; dodge win silver | — |
| C-11 | COPY THAT | P1 | C-3 | VERIFIED | T15/T16 | bank win; wrong-arrow launch | — |
| C-12 | LONG SHOT (+ wins that launch) | P1 | C-3 | VERIFIED | T17–T19 | bullseye win, sticks ring; misfire | latency feel untested (L-1) |
| U-4 | Jump key free in movement challenges | P0 | U-1 | VERIFIED | T14 | Space not captured | — |
| SH-1 | Shop server (buy/equip validation) | P1 | P-1 | VERIFIED (session) | T21–T24 | all refusals correct | persistence via P-1 |
| SH-2 | THE VAULT UI | P1 | SH-1 | VERIFIED (desktop) | capture 10 | renders, click opens | mobile via U-2 |
| SH-3 | Cosmetics applied on fails (trails + bursts) | P1 | SH-1 | VERIFIED | visual check per item | all 10 visible in a real fail (2 subtle) | — |
| FX-1 | Particles visible to players (client-played bursts) | P0 | — | VERIFIED | captures | confetti/bursts render | — |
| FX-2 | QUICK DRAW launch not blocked by its plate | P0 | — | VERIFIED | trajectory sample | 20.7 studs rise | — |
| U-5 | Fail chase-cam | P1 | — | VERIFIED (desktop) | captures | no camera clipping | — |
| SH-4 | GUTS economy tuning | P2 | SH-1 | NOT STARTED | playtest income vs prices | — | needs players |
