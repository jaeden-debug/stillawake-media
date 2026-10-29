---
title: "How to Fix Lag in Roblox Games: A Developer's Optimization Guide"
date: "2026-10-29"
excerpt: "To fix lag in a Roblox game, first find which kind it is (client frame rate, server heartbeat or network) with the MicroProfiler and Developer Console, then fix that cause."
category: "Game Development"
featured: false
author: "Jaeden Doody"
---

**To fix lag in a Roblox game, first find out which kind of lag you have (low client frame rate, a slow server heartbeat, or network delay), measure it with the MicroProfiler, Developer Console and Performance Stats, and only then change the cause: too many draw calls, expensive lighting, busy scripts, unnecessary physics, chatty remotes or a world that isn't streaming.** Players describe all of these as "lag," but each has a different fix. Optimizing blind usually means removing detail that wasn't the problem.

This guide is written for developers. Tool names, properties and shortcuts are checked against Roblox's Creator Hub documentation as of October 2026, and the examples come from our own Roblox projects at StillAwake Media: [RISK IT!](/games/risk-it), which is public on Roblox, and [Stillskin Forest](/games/stillskin-forest), a co-op survival-horror game still in development. We don't quote frame-rate gains here, because your results depend on your game, your players' devices and what you measure.

If you're still building your first game, start with [how to make a Roblox game](/stillawake-times/how-to-make-a-roblox-game).

## Step 1: Diagnose before you change anything

Roblox's [performance identification guide](https://create.roblox.com/docs/performance-optimization/identify) splits problems into frame rate (compute), memory and load time, plus ping. Use the right tool for each:

| Symptom | Likely layer | Tool |
|---|---|---|
| Choppy camera, stutter on one device | Client frame rate | MicroProfiler, Debug Stats (Shift+F5 summary) |
| Everyone sees delayed hits, rubber-banding NPCs | Server heartbeat | Developer Console (F9) > Server Jobs, server MicroProfiler dumps |
| Actions take a moment to register | Network or data ping | Performance Stats, Shift+F3 for per-client data ping |
| Crashes on phones, long join times | Memory or load | Developer Console > Memory, Print Join Size Breakdown in Studio settings |

### The MicroProfiler

The [MicroProfiler](https://create.roblox.com/docs/studio/microprofiler) shows what each frame spent its time on. Its documentation lists **Ctrl+F6** (⌘F6 on Mac) to open it, and the performance guide also lists Ctrl+Alt+F6. Pause with Ctrl+P to inspect a spike. The colour of the frame bars tells you where to look:

- **Orange:** worker jobs (scripts, physics, animation) took longer than rendering.
- **Blue:** rendering is the bottleneck.
- **Red:** rendering is the bottleneck and the GPU wait is over 2.5 ms.

The target is 16.67 ms per frame for 60 FPS on both client and server. Wrap your own suspicious code in `debug.profilebegin("Label")` and `debug.profileend()` so it shows up by name instead of as an anonymous script block.

### The Developer Console

Press **F9** in a running game. The [Developer Console](https://create.roblox.com/docs/studio/developer-console) has **Log**, **Memory** (including a **Luau heap** snapshot tool for script memory), **Network** (web calls) and **Script Profiler** (CPU time per script). The server heartbeat appears under Server Jobs. The server heartbeat is capped at 60, so a value well below that means the server, not the player's device, is behind.

### Measure in a real client

Studio adds its own overhead, and solo Studio testing runs at near-zero latency. Use **Server & Clients** for multiplayer tests and the **Network Simulator** (Alt+S in Studio) to add latency, jitter and packet loss. Then confirm on a published place in the real Roblox client and on the devices your players use. Our RISK IT! test plan labels every result "Studio results, not production data" for this reason.

## Rendering: draw calls, parts and meshes

When the MicroProfiler bars are blue or red, the GPU or the render thread is the problem. The usual causes:

**Draw calls.** Each distinct mesh-and-material combination costs a draw call. Roblox's [performance improvement guide](https://create.roblox.com/docs/performance-optimization/improve) says identical meshes batch into one draw call only when their mesh content and their textures or materials match. In practice:

- Import a mesh once and duplicate it in Studio, instead of importing a whole scene where every copy becomes its own asset.
- Reuse a small set of materials and textures rather than giving every prop a unique one.

**MeshParts vs unions.** A reused MeshPart can batch. Each union you create in Studio is its own geometry, so a scene built from hundreds of unique unions gets none of that reuse. Unions are convenient for blocking out shapes. For anything you repeat, export it as a mesh.

**RenderFidelity.** Set `MeshPart.RenderFidelity` to `Automatic` or `Performance` and avoid `Precise` on large numbers of meshes.

**Part count and transparency.** Overlapping transparent objects, dense decals and textures, and constantly changing `ParticleEmitter` properties add up. Fewer, larger parts usually beat many tiny ones for static scenery.

**Avatars and distant models.** Instance streaming lets you set `Model.LevelOfDetail` to `SLIM` for distant models, and `Workspace.EnableSLIMAvatars` does the same for avatars.

## Lighting: shadows and light count

Lighting is one of the easiest ways to spend GPU time without noticing.

**Know which lighting setting your place uses.** Many tutorials, and older places, set `Lighting.Technology` to `Future` or `ShadowMap`. As of October 2026, the Lighting class reference marks `Technology` as deprecated, and the [lighting docs](https://create.roblox.com/docs/environment/lighting) describe `LightingStyle` instead: `Realistic` for the most advanced lighting and shadows, and `Soft` for a flatter, retro look. A related property, `PrioritizeLightingQuality`, decides whether shading quality or view distance is reduced first when a device has to scale rendering down. (RISK IT!'s setup notes still say to set Technology to Future by hand in Properties, because that setting can't be changed by a script at runtime. If you inherit an older place, check what it's actually using.)

Whatever the style:

- **Turn off shadows where nobody will see them.** Set `BasePart.CastShadow` to false on small or distant parts, and `Light.Shadows` to false on lights that don't need them.
- **Use fewer lights, with smaller range and angle.** Ten overlapping point lights in a room usually look little different from three well-placed ones, and cost more.
- **Budget effects together.** Stillskin Forest's gap audit flags exactly this risk: fog, lights, particles, ragdolls and prompts can each be reasonable alone and expensive together. Its backlog includes an effects budget where particles, fog and dynamic lights scale by quality and distance. That work is planned, not finished.

## Scripts: loops, connections and the task library

Orange MicroProfiler bars usually mean scripts, physics or animation.

**Keep high-frequency events small.** `RunService.Heartbeat`, `PreRender`, `PreSimulation` and `PostSimulation` fire every frame. Use them only for work that truly has to happen every frame, such as the camera. Everything else can run on a throttled interval:

```lua
local RunService = game:GetService("RunService")

local SCAN_INTERVAL = 0.25 -- seconds between scans, not every frame
local elapsed = 0

RunService.Heartbeat:Connect(function(dt: number)
	elapsed += dt
	if elapsed < SCAN_INTERVAL then
		return
	end
	elapsed = 0

	debug.profilebegin("EnemyScan")
	-- check distances, update targets, etc.
	debug.profileend()
end)
```

**Split big jobs across frames.** If you have to process thousands of items, do a batch, then `task.wait()`, and continue. Use the `task` library (`task.wait`, `task.spawn`, `task.defer`, `task.delay`) rather than the legacy global `wait`.

**Fix connection and memory leaks.** Every `:Connect` returns an `RBXScriptConnection`. If the object it belongs to outlives its purpose, call `:Disconnect()` or `Destroy()` the instance. Tables keyed by player grow forever unless you clear them. RISK IT!'s challenge service clears each player's rate-limit bucket on `PlayerRemoving` for exactly this reason. Roblox's docs also note that player and character objects can persist after a player leaves unless you enable `Workspace.PlayerCharacterDestroyBehavior` or destroy them yourself. Watch the Luau heap in the Developer Console during a long session. If it only goes up, something is leaking.

**Don't make every NPC think every frame.** Stillskin Forest's infected are driven by a scheduler on a Heartbeat loop that lets zombies sleep and wakes them by checking the living players. One bug we fixed there was that the wake check only counted players who weren't hiding, so a hiding player could leave nearby zombies asleep. The fix was to count all living players for waking and keep the stricter list for targeting. The design brief for its locker encounter states the rule plainly: no expensive per-frame searches across every zombie, and only activate the cinematic controller when an encounter qualifies.

## Physics: anchoring, collisions and network ownership

- **Anchor everything that doesn't need to move.** Anchored parts aren't simulated.
- **Turn off what a part doesn't use.** Decorative parts can set `CanCollide`, `CanTouch` and `CanQuery` to false.
- **Pick collision fidelity on purpose.** `CollisionFidelity = Box` is the cheapest. `Default` and `Precise` options cost the most. In the Explorer, filter by `CollisionFidelity=PreciseConvexDecomposition` to find expensive meshes.
- **Keep adaptive timestepping** (the default). Fixed stepping simulates everything at 240 Hz and costs much more.
- **Reduce constraints and joints**, and use no-collision constraints between ragdoll limbs.

**Network ownership** decides whether the server or a client simulates an unanchored part. Roblox's [network ownership docs](https://create.roblox.com/docs/physics/network-ownership) explain that client ownership makes physics responsive for that player and takes load off the server, but clients can send bad physics data for parts they own and can fire `Touched` on them, so you must validate the results. `SetNetworkOwner(nil)` forces server ownership, and the docs warn that it can make interactions jittery for clients. `SetNetworkOwnershipAuto()` hands control back to the engine. Anchored parts are always server-owned.

RISK IT! shows the trade-off. Its ragdoll swaps joints for constraints on the server so every player sees it, then tells the owning client to apply the launch velocity, because the client owns its own character's physics. The project's risk notes flag the consequence: hit detection on one challenge uses server `Touched` against client-owned characters, so under real latency a visual near-miss may count as a hit. That's why a 200 ms latency test is a release blocker in its checklist.

**Humanoids.** Disable unused states with `Humanoid:SetStateEnabled()`, use an `AnimationController` for NPCs that never walk, and pool NPCs that respawn often instead of creating new ones.

## Network replication: remote spam and payload size

Network lag is often self-inflicted.

- **Send changes, not frames.** Replicate state when it changes. Throttle input-driven remotes.
- **Send only what the client needs.** Not the whole inventory when one slot changed.
- **Tween and animate on the client.** Server-side `TweenService` replicates every step. RISK IT!'s spinning signs, sweeping lights and pulsing pads are tagged on the server and animated locally by each client in one render loop.
- **Create visual effects on clients.** In RISK IT!, particle bursts emitted with `ParticleEmitter:Emit()` on the server never reached players at all. Confetti and launch bursts were invisible from the first version until a developer pass caught it. They're now sent as a small message and played by each client.
- **Use `UnreliableRemoteEvent` for continuous, non-critical data.** It can drop or reorder messages, so include a sequence number or timestamp and never use it for actions that change game state. Roblox notes that payloads over 1,000 bytes may be dropped.
- **Budget noisy events on the server too.** In Stillskin Forest's code, gameplay "sound events" that alert enemies (footsteps, gunshots, alarms) each have a per-emitter cooldown, from 0.08 seconds for gunshots to 2 seconds for alarms, so a burst of input can't flood the AI.

Rate limits protect you as well as your bandwidth. RISK IT!'s input remote allows 15 inputs per second per player with a token bucket. A player mashing a button, or an exploit script, can't turn into thousands of server calls.

## Instance streaming

**Instance streaming** sends the client only the part of the world near the player. As of October 2026, Roblox's [streaming docs](https://create.roblox.com/docs/workspace/streaming) say `Workspace.StreamingEnabled` is on by default for new places and can't be set by scripts. The settings that matter:

- **`StreamingMinRadius`** (default 64) and **`StreamingTargetRadius`** (default 1024): lower them for more aggressive streaming on large maps.
- **`StreamOutBehavior`:** `Opportunistic` is recommended over the default `LowMemory`.
- **`StreamingIntegrityMode`:** the docs recommend `PauseOutsideLoadedArea`.
- **`ModelStreamingMode`** on each model: `Nonatomic` (default), `Atomic` (the model streams in and out as a whole), `Persistent` (always present) and `PersistentPerPlayer`.
- **`Player:RequestStreamAroundAsync()`** pre-loads an area before a teleport or cutscene.

Streaming changes how client code must be written. A part that exists on the server may not exist on the client yet. Never assume `workspace.Map.Door` is there. Wait for it, react to it appearing, and handle it disappearing. For `Atomic` models, wait on the model itself rather than its children.

Stillskin Forest is a large open map, and this is an active area of work for us. Its Green Lake atmosphere controller was changed to look up its zone in a streaming-safe way. A full streaming test (clues, prompts, lake effects, objectives, zombie paths and cinematics recovering after streaming out and back in) is still on its backlog, and a console-focused performance pass covering streaming, zombie population, foliage and lights is in progress. We'll report results when they're measured.

## Asset streaming and load times

- Keep `ReplicatedStorage` and `ReplicatedFirst` lean. Everything in them is sent to every client.
- Use `ContentProvider:PreloadAsync()` only for assets needed immediately, like the loading screen or first sounds, not the whole Workspace.
- Keep textures modest: Roblox suggests about 512×512 for most images and 256×256 for minor ones.
- Enable **Print Join Size Breakdown** in Studio settings to see what's making the join heavy.

## Mobile and console

Phones and consoles have less memory and thermal headroom than a desktop. Practical rules:

- **Test on the target.** The Device Simulator checks layout and touch input, not real performance. RISK IT!'s phone pass used the Device Simulator and an in-game phone-frame harness. When its live test started, real-phone testing was still outstanding.
- **Watch client memory.** In the Developer Console's Memory tab, check GraphicsMeshParts, GraphicsTexture and Sounds under PlaceMemory. Roblox suggests investigating if crash rates rise above 2 to 3%.
- **Let quality scale.** Shadows, lights and particles that scale with distance or quality setting matter more on low-end devices than any single optimization.
- **Design input for the platform.** On consoles and phones, an interface that hides the action makes the game feel slow even at 60 FPS. RISK IT! moved its challenge panel to the top of the screen for movement challenges because it covered the floor on phones.

## A quick checklist

1. Reproduce the lag, then identify the layer: client, server or network.
2. Capture a MicroProfiler dump during the spike and label your own code.
3. Rendering: reuse meshes and materials, cut unique unions, reduce shadows and lights.
4. Scripts: throttle per-frame work, disconnect connections, clear per-player tables.
5. Physics: anchor, disable unused collision flags, simplify collision fidelity, choose ownership deliberately.
6. Network: replicate on change, keep payloads small, run effects and tweens on clients, rate-limit remotes.
7. Streaming: tune radii and model modes, and write client code that waits for instances.
8. Re-measure on real devices after every change. Keep what helped and undo what didn't.

## Next step

Fixing lag is easier when the architecture was built with it in mind. Our guides to [making a Roblox game](/stillawake-times/how-to-make-a-roblox-game) and [making a horror game in Roblox Studio](/stillawake-times/how-to-make-a-horror-game-in-roblox-studio) cover those foundations, and the [StillAwake games page](/games) shows what we're building. If you're stuck on a performance problem in your own Roblox project, [contact us](/contact).
