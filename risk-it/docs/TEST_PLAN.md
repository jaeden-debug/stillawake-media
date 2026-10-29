# RISK IT! — Test Plan & Results

Related: [PROGRESS_CHECKLIST](PROGRESS_CHECKLIST.md) · [ARCHITECTURE](ARCHITECTURE.md)

Environment for all results below: Roblox Studio, local solo playtest (1 player, ~0 ms latency),
place not published (DataStores unavailable → offline profile), 2026-10-26.
**These are Studio results, not production data.**

## Automated: `tools/tests/regression.client.luau`

End-to-end bot on the client using the same remotes as the real UI.
v0.1 run: 14/14 PASS. **v0.2 run (8 challenges + shop): 25/25 PASS**, no server errors.

| # | Preconditions | Action | Expected | Actual | Result |
|---|---|---|---|---|---|
| T1 | At THE BUTTON pad | retry, press once, cash out | win, payout 20 | win, 20 | PASS |
| T2 | At THE BUTTON pad | press until drop | fail style trapdoor | "FLOOR SAID NO", trapdoor | PASS |
| T3 | During T2 fail | read `Ragdolled` attr | true | true | PASS |
| T4 | After T2 | wait for `recovered` | attr cleared, humanoid not in Physics | cleared, Running | PASS |
| T5 | PERFECT STOP | press at zone center x3 | win gold, 3 perfects | "3 PERFECTS", gold | PASS |
| T6 | QUICK DRAW | press 200 ms after green | win | 250 ms, win | PASS |
| T7 | QUICK DRAW | press before green | flinch fail (catapult) | FLINCHED | PASS |
| T8 | DOORS | random doors until a clear | win on full clear | 4.85 s gold | PASS |
| T9 | DOORS | (same run) | trap door blasts | 2 blasts seen | PASS |
| T10 | SWEEPER | run the bridge | resolves | swept | PASS |
| T11 | Hub, 96 studs from pad | retry button | no session | none | PASS |
| T12 | No session | NaN/inf/garbage payloads, 60-input burst | no GUTS, no errors | none, no errors | PASS |
| T13 | Whole run | compare GUTS | increased | 0 → 420 | PASS |
| T14 | THE SWEEPER running | `GetBoundActionInfo("RiskItPrimary")` | nothing bound (Space = jump) | empty | PASS |
| T15 | COPY THAT | repeat 3 shown arrows, bank | win, score 3 | 3 ARROWS | PASS |
| T16 | COPY THAT | wrong 2nd arrow | fail style launch | MEMORY: DELETED | PASS |
| T17 | LONG SHOT | lock on the 250 marks | win | 500 PTS · BULLSEYE | PASS |
| T18 | LONG SHOT | after T17 landing | root on ring (y > -6) | y = -2.9 | PASS |
| T19 | LONG SHOT | power +0.3 off | misfire fail | MISSED | PASS |
| T20 | MELTDOWN | stand still | fall fail | MELTED | PASS |
| T21 | Shop | buy 3500 item with less | refused, GUTS unchanged | unchanged | PASS |
| T22 | Shop | buy 400 item twice | deducted once | 821 → 421 | PASS |
| T23 | Shop | after T22 | auto-equipped | trail_gold | PASS |
| T24 | Shop | equip unowned item | refused | unchanged | PASS |

Server log during the run: no errors; analytics funnel/custom/economy events fired.

## Manual / scripted checks done in Studio

| Check | Result | Evidence |
|---|---|---|
| Server boot, all 5 stations build | PASS | console "v0.1.0 ready: 5 challenges" |
| Sweeper win detection + time medal | PASS | arms ghosted for test; walked bridge: 5.08 s gold, 316 GUTS (Hot Seat 2x) |
| Hot Seat 2x applied | PASS | 158 → 316 payout above |
| Intro, panel, meter, lights, stamp, retry UI render | PASS | screen captures in session |
| Camera framing on start | PASS (after fix) | capture 6 |
| Duplicate headline (flash + stamp) | FIXED | flash cleared on result |
| MELTDOWN dodging bot survives 15 s | PASS | win, 2 close calls, silver |
| LONG SHOT far ring (1000) + near ring (200) bullseyes stick | PASS | root y ≈ -2.8 on each ring |
| THE VAULT opens via real mouse click on HUD button | PASS | capture 10 |
| Death mid-challenge (Health = 0 during THE BUTTON) | PASS | result `cancel`, no wipeout counted, station occupant cleared, new character can start again; no console errors |

## Cosmetic visual pass (v0.2.1)

Method: buy every item (Studio-only `studio_grant`), equip trail+burst pairs, trigger a QUICK DRAW
flinch, capture 0.3 s into the flight. Final state:

| Item | Visible in fail | Notes |
|---|---|---|
| Signature trail | PASS | challenge colour |
| Liquid Gold | PASS | |
| Void Walker | PASS | purple → black |
| Re-entry | PASS | red-hot, distinct from gold after fix |
| Full Spectrum | PASS | full rainbow after fix |
| Party Pooper | PASS | square confetti pop + stream |
| Seeing Stars | PASS | large glints around the body |
| Cartoon Poof | PASS (subtle) | white puffs |
| Overcharged | PASS (subtle) | cyan aura + sparks |
| None | PASS | no burst |

## Phone layout pass (v0.2.1)

Tool: `tools/tests/phone_frame.client.luau` — wraps all RISK IT! ScreenGuis in an exact phone frame
(mobile topbar inset 58px), forces `Theme.viewport()` to that size, and audits for elements outside
the frame (OUT), buttons under 44px (TAP) and overlapping top-level elements (OVER).
**This is an emulation of layout math, not the Studio Device Emulator** (that session couldn't reach the
place's Studio window: two Studio processes share one app id, and full-screen control wasn't approved).

| Screen | 667×375 | 844×390 |
|---|---|---|
| Hub HUD + hint | clean | clean |
| THE BUTTON panel (before/after press) | clean | clean |
| Result stamp | clean | clean |
| Retry button | clean | clean |
| COPY THAT input (4 arrow buttons, 61×44 each) | clean | clean |
| THE VAULT (opened by real click) | clean (modal over HUD expected) | — |

Not covered: real touch hit-testing, device DPI/notch safe areas, the actual Roblox mobile controls
overlay, portrait orientation.

## Studio Device Simulator pass (v0.2.2) — iPhone XR landscape

Real Studio Device Simulator (Test → Device Simulator), viewport 801×413, touch enabled, top inset
58px, real Roblox mobile controls (thumbstick, jump) and top-bar buttons visible. Inputs were real
taps/drags on the emulated screen. Note: Studio's MCP `screen_capture` omits BillboardGuis in
PlayerGui (the RISK IT! prompt), so phone checks used real screen captures.

| Check | Result |
|---|---|
| HUD clear of thumbstick, jump button, top-bar buttons and notch | PASS |
| RISK IT! prompt visible and tappable; tap starts THE BUTTON | PASS (after moving it to pad level — it overlapped HUD text) |
| PRESS ×2 / CASH OUT taps register; SAFE! flash; both buttons fit | PASS |
| Win stamp + client confetti on phone | PASS (after fixing stamp drifting under the top bar) |
| One retry call-to-action after recovery | PASS (after fix: retry button and prompt overlapped) |
| THE VAULT opens by tap, 3 columns, finger-drag scroll, tab tap, X close | PASS |
| Movement challenge: jump button present (JumpHeight 7.2), play area visible | PASS (after docking a slim panel at the top; the bottom panel covered the bridge/grid) |
| Touch devices show no keyboard hints (SPACE/Q/R) | PASS |

## Not yet tested (blocked or needs people)

| Area | Why not | How to run |
|---|---|---|
| DataStore save/load, session lock, BindToClose | Place unpublished | Publish privately; join, earn, leave, rejoin; kill server mid-session |
| Multiplayer (occupancy lock, spectating, two players same station) | MCP playtest is 1 player | Studio Test → Local Server, 2–4 players |
| Real latency (ragdoll, Sweeper fairness, timestamp clamps) | Studio ≈ 0 ms | Studio network simulation (Incoming Replication Lag 150–250 ms) or live test |
| Physical phone (performance, real notch, portrait) | Only the Studio Device Simulator was used | Team Test on a real phone; try iPhone SE + a small Android |
| Leaving mid-challenge | Code path present, not exercised | Leave mid-run in Local Server; confirm station frees for player 2 |
| Performance budgets | Not measured | MicroProfiler + Developer Console on a mid-range phone |
