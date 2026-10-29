# RISK IT! — Playtest Findings

Related: [TEST_PLAN](TEST_PLAN.md) · [PROGRESS_CHECKLIST](PROGRESS_CHECKLIST.md)

**No human playtests have happened yet. Retention, fun and difficulty are unmeasured.**
The entries below are developer/bot observations in Studio (solo, ~0 ms latency).

## 2026-10-26 — developer pass (Studio, bot + screen captures)

| Finding | Severity | Action | Status |
|---|---|---|---|
| `Lighting.Technology` / `FallenPartsDestroyHeight` can't be set at runtime | Blocker | Moved to edit-time setup | Fixed |
| Scene too dark; floor read as pure black | High | Brighter floor, ambient, exposure | Fixed |
| Camera kept the approach direction, so the challenge was off-screen | High | Camera framed behind player toward the focus on start | Fixed |
| Letterbox covered HUD; own nametag overlapped flash text | Medium | Hide HUD + own tag during challenges | Fixed |
| Pot board showed a solid pink block (glow in front of text) | Medium | Glow moved behind the face | Fixed |
| Headline shown twice (flash + stamp) on fail | Low | Clear flash on result | Fixed |
| Camera inside the ragdoll head mid-flight | Medium | Min zoom 16 while ragdolled | Fixed |
| Flat blue void under the islands looked unfinished | Medium | Synthwave grid abyss at y=-110, thinner fog | Fixed |
| Sweeper center posts block the lane's middle | Design | Kept (forces a line choice); revisit with players | Watch |

## 2026-10-26 — v0.2 developer pass (3 new challenges + shop)

| Finding | Severity | Action | Status |
|---|---|---|---|
| **Space was captured as the action key in every challenge, so players could not jump in THE SWEEPER / DOORS** (v0.1 bug; the bot jumps via code so it was missed) | Critical | Inputs bound only for stand-still challenges; regression check added | Fixed |
| LONG SHOT: the scored landing was correct but ragdolls slid off the ring (horizontal momentum) | High | Client stops horizontal velocity at the solved touchdown time | Fixed |
| 8 islands: hub light towers stood in the walkway entrances | Medium | Towers placed between walkways | Fixed |
| COPY THAT: player's own body covered the bottom arrow on the board | Medium | Board raised to y=14 | Fixed |
| COPY THAT: panel arrow overlapped the WATCH text | Low | Arrow + dots moved below | Fixed |

## 2026-10-26 — cosmetic pass + phone layout pass (v0.2.1)

Every Vault item was bought (Studio-only GUTS grant) and watched in a real fail. Phone layouts were
checked with an in-game phone-frame harness (`tools/tests/phone_frame.client.luau`) at 667×375
(iPhone SE landscape) and 844×390 (modern phone), with an automated OUT/TAP/OVER layout audit.
The official Studio Device Emulator could not be driven from this session (see TEST_PLAN).

| Finding | Severity | Action | Status |
|---|---|---|---|
| **QUICK DRAW catapult plate swatted the player back down mid-launch** (vy +91 → −27 in 0.1 s): every Quick Draw fail was a flop | Critical | Plate is non-solid while it swings | Fixed, measured 20.7 studs rise / 48 studs travel |
| **Server-side `ParticleEmitter:Emit()` never reaches players**: launch bursts AND the win confetti were invisible since v0.1 | Critical | Bursts/confetti now played on each client via a `WorldFX` remote (`shared/Bursts`) | Fixed, visually confirmed |
| Camera got shoved inside the player's head during fails (default camera dodging the swinging prop) | High | Scripted fail chase-cam (side-on, fixed distance; off with Reduced Motion) | Fixed |
| Trails too thin/short to read at chase distance | Medium | Wider (±1.5), longer (0.75 s), matching glow light | Fixed |
| Re-entry looked identical to Liquid Gold; Full Spectrum showed only red→yellow (tail colours faded out) | Medium | Red-hot head colour; rainbow compressed into the visible 60% of the trail | Fixed |
| Overcharged sparks invisible (`fire_sparks_main.dds` renders nothing alone) | Medium | Rebuilt from sparkle texture: cyan aura + streaking sparks | Fixed (still subtle; custom texture would help) |
| Smoke rendered grey in the dark arena | Low | `LightInfluence = 0` on burst particles | Fixed (subtle) |
| Stars/smoke/confetti spawned at the launch point and were left off-camera | Medium | Streamed from the torso for the flight | Fixed |
| Phone: challenge panel was 63% of a 375px-tall screen | High | Panel scales by height too (min 0.7 keeps buttons ≥ 44px) | Fixed |
| Phone: MEDALS counter sat under the mobile jump button | Medium | Moved under the title | Fixed |
| Phone: Vault top cut off by the topbar; shrunk Buy buttons ~24px | High | Vault fills the area under the topbar at full size and scrolls; compact header; 44px buttons/tabs | Fixed |
| Phone: hint touching Hot Seat banner | Low | Re-spaced | Fixed |
| Result stamp could clip at the top on short screens | Medium | Stamp scales with screen height | Fixed (audit clean) |

## 2026-10-26 — Studio Device Simulator pass (iPhone XR, v0.2.2)

| Finding | Severity | Action | Status |
|---|---|---|---|
| Movement challenges: the bottom panel covered the bridge / tile grid / doors in the middle of the phone screen | High | Slim panel docked at the top for movement challenges | Fixed |
| RISK IT! prompt at head height landed on the centred HUD lines (MEDALS text over the prompt) | High | Prompt at pad level; hint hides while a prompt is up | Fixed |
| Own overhead name/title stacked behind the HUD title lines | Medium | Own tag hidden for yourself (others still see it) | Fixed |
| "RISK IT AGAIN" and the RISK IT! prompt both shown, overlapping | Medium | Only the prompt shows when in range | Fixed |
| Win stamp drifted under the top-bar icons (UIScale on a full-screen holder scales toward top-left) | Medium | Stamp scales itself around its centre | Fixed |
| Keyboard hints (SPACE/Q/R) shown on touch | Low | Hidden on touch devices | Fixed |
| Vault kept the previous tab's scroll position | Low | Scroll resets on tab switch | Fixed |
| A sync broke the client (stray `end` from a scripted edit) | Process | Every sync now compile-checks all 31 scripts in Studio | Fixed |

## Questions for the first human playtest

1. Can a new player start a challenge within 10 s without help?
2. Which failure gets the biggest reaction? Which feels unfair?
3. Retry rate after a fail (watch for "RISK IT AGAIN" use vs walking away).
4. Is THE SWEEPER too hard on the first try? (Bot could not clear it with arms live.)
5. Does anyone notice the door lamp tell on their own?
6. Is GUTS income vs. Vault prices right? (Studio pace: ~700 GUTS in ~10 challenge runs → first
   cosmetic in a few minutes, rainbow trail in roughly an hour of play — unvalidated.)
7. Does LONG SHOT read as "win" even though you still fly? Is MELTDOWN fair on the first try?
