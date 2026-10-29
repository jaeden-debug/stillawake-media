# RISK IT! — Research & Design Decisions

Related: [MASTER_PLAN](MASTER_PLAN.md) · [ARCHITECTURE](ARCHITECTURE.md) · [PLAYTEST_FINDINGS](PLAYTEST_FINDINGS.md)

## Honest scope of research so far (2026-10-26)

The owner asked to "start building" with a "cinematic, hilarious, crispy, polished, premium, modern"
direction, so research was time-boxed. **No live market data (Roblox charts, CCU, retention benchmarks,
short-form trend sampling) has been collected yet.** Everything below labelled *hypothesis* is design
reasoning, not evidence. Market research is task R-2 in the [checklist](PROGRESS_CHECKLIST.md).

What *was* gathered with tools:
- Roblox Creator Store audio search (2026-10-26) to find licensed, free SFX/music (see Audio licensing).
- Installed tooling: Roblox Studio + Studio MCP (connected), no Rojo/Wally/Selene/StyLua installed.

## Direction chosen: "Late-night neon game show in the void"

A floating neon hub over a synthwave abyss, five challenge islands on a ring, each a short walk away.
Brand palette: hot pink-red `#FF2E63`, volt yellow `#FFD60A`, cyan, lime, violet on near-black.

Why (hypotheses):
- **Readable at a glance / in a thumbnail**: high-contrast neon on dark reads instantly on phones and in
  short clips; each challenge owns one color so a clip identifies the challenge without explanation.
- **Cheap to make premium**: neon + bloom + atmosphere + bold type looks finished without bespoke meshes,
  so effort goes into feel (timing, camera, sound) rather than asset production.
- **Comedy contrast**: a slick, serious TV-studio presentation makes the ragdoll failures funnier.
- **Expandable**: new islands slot onto the ring; seasonal palettes are a config change.

Alternatives considered and set aside: bright meme simulator (crowded, forgettable), horror (wrong tone
for failure comedy), realistic gameshow set (asset-heavy).

## Core loop decisions

| Decision | Reason |
|---|---|
| Spawn in the hub with all 5 pads visible, a guide beam to THE BUTTON for first-timers | First interaction within ~5 s; no menus |
| One tap/keypress to start (custom "RISK IT!" prompt) | Minimal friction |
| Challenges 5–20 s | Short outcome cycle, frequent payoffs |
| Failure = ragdoll launch with per-challenge style + stamped headline + crowd laugh | Failure is content, not punishment |
| Recovery 2.6 s, land next to the pad facing it, "RISK IT AGAIN" button | Retry within ~3 s |
| Honest odds on THE BUTTON (risk % shown) | Tension without deception |
| Every challenge has a skill/read component (timing, reaction, movement, lamp tell); THE BUTTON is the pure-luck one | Mastery motivation beyond luck |
| Solo-complete; multiplayer adds spectating (shared world FX, occupant lock) | Works in an empty server |

## Progression decisions

Kept: GUTS currency (score), per-challenge personal bests, bronze/silver/gold medals (15 total),
wipeout-based titles (failure is progress), daily "Hot Seat" 2x challenge (UTC rotation).

Deliberately excluded from v0.1: shop/cosmetics (nothing to spend GUTS on yet), monetization, global
leaderboards (OrderedDataStore), friends features, daily login rewards, more challenges. Rationale:
prove the core loop is fun first; avoid systems that add grind before there is data.

## Fairness & anti-manipulation

- Server decides every outcome; client timestamps are clamped to a small latency window.
- No paid randomness, no artificial timers, no energy systems.
- The idle auto-cash-out on THE BUTTON banks the pot instead of punishing AFK players.

## Audio licensing

All audio is free Creator Store audio referenced by id in `src/shared/Sounds.luau`:

| Key | Asset | Uploader | Confidence |
|---|---|---|---|
| Music | 91109027785901 "Timed Trial" | DistrokidOfficial (Roblox licensed partner) | High |
| Laugh | 9114011902 | ProSoundEffects (licensed partner) | High |
| Boo | 9120974911 | ProSoundEffects | High |
| Whoosh | 9120724273 | ProSoundEffects | High |
| DrumRoll | 1842251033 | APMOfficial (licensed partner) | High |
| Boing | 111237552536869 | RBLXEssentials | Medium — verify uploader |
| Cheer | 126615573673174 | HalfBaKon (community) | **Low — replace before release** |
| Punch | 132504023010884 | NickySergal (community) | **Low — replace before release** |
| Cash | 134810204798705 | CoderSays (community) | **Low — replace before release** |
| Explosion/Fall/Land | rbxasset://sounds/* | Ships with the Roblox client | High |

## Initial design risks

1. Ragdoll feel under real latency is unverified (Studio is near-zero latency).
2. THE SWEEPER arm hit detection uses server `Touched` against client-owned characters; with latency
   a visual near-miss may count as a hit. Fall detection is the backstop.
3. Perfect Stop/Quick Draw trust a clamped client timestamp; a cheater can gain at most ~100–400 ms
   of "rewind". Rewards are cosmetic score only.
4. Content depth: 5 challenges may feel thin after ~15 minutes. Mitigation = medals + Hot Seat; real
   fix = more challenges (backlog).
