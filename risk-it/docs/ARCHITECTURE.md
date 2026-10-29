# RISK IT! — Architecture

Related: [MASTER_PLAN](MASTER_PLAN.md) · [TEST_PLAN](TEST_PLAN.md) · [PROGRESS_CHECKLIST](PROGRESS_CHECKLIST.md)

## Layout (Rojo-compatible, see `default.project.json`)

| Source | Studio location | Role |
|---|---|---|
| `src/shared/` | `ReplicatedStorage.RiskIt` | Config (content + tuning), Sounds registry, Net (remotes) |
| `src/server/` | `ServerScriptService.RiskItServer` | Everything authoritative |
| `src/client/` | `StarterPlayerScripts.RiskItClient` | Presentation only |

Rojo is not installed on this machine. `tools/studio_sync.py` generates the same layout as Luau chunks that
are run in Studio (Edit mode); see [README](../README.md).

## Server

- **Main.server** — boot order: remotes → PlayerData → Arena.build → ChallengeService.init.
- **PlayerData** — profile per player. `UpdateAsync` load with a soft session lock (`_lock = {job, t}`,
  stale after 10 min, stolen on the last retry), exponential backoff, 120 s autosave, save on leave,
  `BindToClose` flush. Falls back to an in-memory "offline" profile if DataStores are unavailable and
  tells the player in the HUD. Schema versioned (`v`) with `reconcile` for additive migrations.
- **Arena** — builds the whole world procedurally (lighting, hub, 5 islands, walkways, signs, pads,
  synthwave abyss). Returns station records `{def, model, pad, prompt, cf, padCF, returnCF}`.
  Station local space: `+Z` points to the hub, `-Z` outward; challenges build in that frame.
- **ChallengeService** — the lifecycle owner:
  - `start` validates: profile loaded, no active session, not recovering, alive, not ragdolled,
    station free, within 18 studs of the pad, 0.5 s cooldown.
  - A `Session` object gives challenge modules `waitInput(allowed, timeout)`, `ui(state)`, `sleep`,
    `localPos`, `rng`; it is cancelled on death, character removal, leave, or `maxDuration`.
  - `resolve` runs **once** (guarded by `session.resolved`): rewards, stats, medals, PBs, analytics,
    result event, then the physical aftermath (ragdoll + launch + recovery, or confetti + return).
  - Input remote: token bucket (15/s), type checks, finite-number checks; only `primary`,
    `secondary`, `retry` are accepted. Client timestamps are clamped to `[recv - window, recv]`.
  - Void catcher: players below y=-80 outside a session are returned to the hub.
- **Ragdoll** — swaps Motor6Ds for BallSocketConstraints server-side (replicates to all), then tells the
  owning client to enter `Physics` and apply the launch velocity (the client owns its physics).
  Restore re-enables motors, removes constraints, pivots to the station's return spot.
- **WorldFX** — replicated blast rings, trails, positional sounds. Particle bursts (confetti, launch
  bursts) are sent to clients over the `WorldFX` remote and played by `shared/Bursts` — server-side
  `ParticleEmitter:Emit()` does not replicate.
- **Analytics** — `AnalyticsService` wrapper (funnel + custom + economy events), all `pcall`ed.
- **Shop** — `ShopRequest` handler: `buy` (validates item, not owned, enough GUTS; deducts once,
  auto-equips) and `equip` (owned only). 0.25 s per-player cooldown. Economy sink events.
  Catalog lives in `Config.Shop` (fixed prices, cosmetic only, no randomness).
- **Wins that launch** — a result may carry `launch` on a win (LONG SHOT). `launch.stopAfter` tells the
  client to kill horizontal velocity at touchdown on its own physics clock so the landing sticks.

### Challenge module contract (`server/Challenges/*`)

```
build(station, Build) -> ctx           -- ctx.playerStart: CFrame (required), ctx.cameraFocus: CFrame (optional)
run(session, ctx) -> result | nil      -- nil when cancelled
reset(ctx)                             -- restore props
result = { outcome="win", payout, score?, scoreText?, medal?, headline? }
       | { outcome="fail", style, launch={velocity, spin?}, followUp=fn(session)?, headline? }
```

Adding a challenge = one module + one entry in `Config.Challenges`. The ring layout adapts to the count.

| Id | Interaction | Fail style |
|---|---|---|
| button | risk/reward (press-your-luck, honest odds shown) | trapdoor → pit bounce |
| stop | timing (needle in shrinking zone, 3 rounds) | spring glove |
| draw | reaction (wait for green, yellow fake-outs) | catapult plate |
| sweeper | movement (bridge, 3 physics arms) | swept / net bounce |
| doors | choice + observation (trap lamp flickers) | blast |
| meltdown | survival movement (tiles warn 0.9 s, then drop; half of each wave targets you) | fall → net bounce |
| copy | memory (arrow sequences, bank or go again +1) | spring launch |
| longshot | aim + power → fired from a cannon at rings (landing solved analytically) | misfire splashdown; wins fly too |

## Client

- **Main.client** — boot; hides backpack/health core UI.
- **State** — mirror of the last `DataSync` + current session.
- **Hud** — GUTS/Wipeouts pills, title, medal count, Hot Seat banner, onboarding hint, toasts.
- **ChallengeUI** — intro slab, letterbox, control panel (timer bar, big/sub text, meter, traffic
  lights, primary/secondary buttons), result stamp + chips, instant retry button. Input via
  ContextActionService (Space/E/A/R2, Q/B, arrows/WASD/D-pad) **only for stand-still challenges**, so
  movement challenges keep Space for jumping; plus tap/click anywhere for timing challenges.
- **Effects** — scripted fail chase-cam while ragdolled, FOV punches, camera shake via `Humanoid.CameraOffset` (skipped with Reduced Motion),
  color-grade flashes, blur pulses, client ragdoll state/velocity, music with ducking.
- **ShopUI** — THE VAULT modal (HUD button or V): tabs, item cards with previews, buy/equip states.
  Hidden during challenges.
- **World** — local animation of tagged props (spinning title, sweeping lights, pulsing pads, Perfect
  Stop needle from attributes), branded ProximityPrompt billboards (tappable on mobile), per-player
  best/medal line on station signs, first-time guide beam.

## Remotes

| Remote | Dir | Payload |
|---|---|---|
| ChallengeInput | C→S | `action: "primary"\|"secondary"\|"up"\|"down"\|"left"\|"right"\|"retry"`, `{t?: number, station?: string}` |
| ChallengeEvent | S→C | `start`, `ui`, `result`, `recovered`, `hint` |
| Ragdoll | S→C | `"on"\|"impulse"\|"off"`, velocity, spin |
| DataSync | S→C | public profile view (incl. `owned`, `equipped`) |
| ShopRequest | C→S | `"buy"\|"equip"`, itemId (`"studio_grant"` only works in Studio) |
| WorldFX | S→C | `("confetti", pos, color?, scale?)` \| `("burst", burstId, torso)` |

## Analytics (schema v1)

Funnel (`LogOnboardingFunnelStepEvent`): 1 Joined · 2 First Challenge Started · 3 First Challenge
Resolved · 4 First Retry · 5 First Win · 6 Tried 3 Different Challenges.

Custom events (`v1_` prefix, CustomField01 = challenge id, CustomField02 = extra):
`challenge_start`, `challenge_retry`, `challenge_win` (value = payout), `challenge_fail`
(field 2 = fail style), `challenge_cancel` (field 2 = reason). Economy: `GUTS` source events per win.
No personal data is collected beyond what Roblox attaches to the player.

## Edit-time place settings (cannot be set by scripts at runtime)

- `Lighting.Technology = Future` (set by hand in Properties).
- `Workspace.FallenPartsDestroyHeight = -1500` (`tools/place_setup.luau`).
- Delete the default Baseplate and SpawnLocation.
