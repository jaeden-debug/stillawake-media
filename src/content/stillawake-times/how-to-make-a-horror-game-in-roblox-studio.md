---
title: "How to Make a Horror Game in Roblox Studio: Lessons From Building Stillskin Forest"
date: "2026-10-29"
excerpt: "A practical guide to making a horror game in Roblox Studio: lighting, sound, enemy AI, hiding, pacing and multiplayer, using our own game Stillskin Forest as the example."
category: "Game Development"
featured: false
author: "Jaeden Doody"
---

**To make a horror game in Roblox Studio that actually scares people, build the systems that control what players perceive: lighting that hides things, sound that tells them something is near, enemies that hunt with a believable process, and pacing that gives them time to dread what's coming.** Models and jumpscares matter less than most first projects assume. A zombie that searches the spot where it last saw you is scarier than a better-looking zombie that walks straight at you.

This guide assumes you know your way around Studio and Luau. If you're starting from zero, read [how to make a Roblox game](/stillawake-times/how-to-make-a-roblox-game) first. The example throughout is [Stillskin Forest](/games/stillskin-forest), the co-op survival-horror game we're building at StillAwake Media. **It is still in development and not yet publicly playable**, so everything below comes from development builds, our design documents and our playtest notes, not from live player data. Where something has only been tested with one client, we say so.

## Start with the fear you want to create

First, write down the moment you want players to remember. For Stillskin Forest it was this: you dive into a locker, the chase goes quiet, and an infected walks up to the grate and stares at you through it. It doesn't attack. Then it leaves.

That one moment set requirements for several systems: the AI needed a memory of where it last saw you, hiding needed to be more than "invisible", the audio needed a quiet mode and the camera needed a view through the grate. Design the scare first and each system gets a clear job.

The game's tagline sums up the structure: *the forest is beautiful, the nights are not.* Players scavenge in daylight; the same streets turn hostile after dark.

## Lighting and atmosphere

Lighting decides what players can and can't see, and that matters more than anything else in horror. Roblox gives you several layers, all under the [Lighting](https://create.roblox.com/docs/reference/engine/classes/Lighting) service.

### The lighting engine setting has changed

Older tutorials tell you to set `Lighting.Technology` to `Future`. **As of October 2026, Roblox's documentation says the `Technology` property has been superseded** by [`LightingStyle`](https://create.roblox.com/docs/reference/engine/enums/LightingStyle) and `PrioritizeLightingQuality`. `LightingStyle` has two values: `Realistic`, which gives the most advanced lighting and shadows, and `Soft`, which gives a flatter, older Roblox look. `PrioritizeLightingQuality` controls whether lighting quality or view distance gets scaled down first on weaker devices. For horror you'll almost always want `Realistic`. Dark scenes depend on shadows from local lights, and soft lighting makes everything look flat.

### Atmosphere, fog and colour

- **[Atmosphere](https://create.roblox.com/docs/environment/atmosphere)** controls particles in the air. `Density` hides distant objects, `Haze` and `Color` set the mood toward the horizon, and `Offset`, `Glare` and `Decay` shape how the sky blends with the land. One thing catches people out: [Roblox notes](https://create.roblox.com/docs/reference/engine/classes/Atmosphere) that Lighting's fog properties are hidden when an Atmosphere object is present. Pick one approach. Don't tune `FogEnd` and then wonder why nothing changes.
- **[ColorCorrectionEffect](https://create.roblox.com/docs/reference/engine/classes/ColorCorrectionEffect)** (`Brightness`, `Contrast`, `Saturation`, `TintColor`) is the quickest way to make a scene feel wrong. Lowering saturation as tension rises works better than a constant grey filter.
- **`ClockTime`, `Ambient`, `OutdoorAmbient` and `ExposureCompensation`** set the baseline. A very dark ambient level with a few strong local lights reads better than an evenly dim scene.

### Give light a gameplay cost

The most useful lighting decision in Stillskin Forest is that light is a trade-off. The [headlamp](/games/stillskin-forest/wiki/items/headlamp) helps you see after dark, and it also makes you easier to spot. Detection range is multiplied by 1.25 with the headlamp on at dusk or night, and by 0.8 with it off ([detection details](/games/stillskin-forest/wiki/mechanics/detection-and-noise)). Players have to choose between seeing and being seen.

Our night pass followed the same idea. The sky became a navy moonlit sky with stars and clouds. A few landmarks got light sources the player can steer by: lanterns around the lake, a lit asylum entrance, the hospital's red emergency sign and an ambulance with flashing lights. Under the forest canopy you can see the ground and the nearest trees without the headlamp, but further out you can't. Darkness should make players nervous. It shouldn't stop them from navigating.

Special nights change the lighting to signal danger: [Blood Moon](/games/stillskin-forest/wiki/special-nights/blood-moon) turns the sky and light red. [Heavy Fog](/games/stillskin-forest/wiki/special-nights/heavy-fog) cuts sight range to 60% for both players and infected. In confined places such as the [morgue](/games/stillskin-forest/wiki/locations/morgue), a dread meter drains the colour from the screen and closes in a vignette as it rises.

## Sound design

Sound tells the player about things they can't see yet. In a dark game, players learn about most threats through sound before they see them.

### The API you're building on

The classic setup is `Sound` objects parented to parts for positional audio, routed into `SoundGroup`s under `SoundService` so ambience, music and effects mix separately. Roblox's own [audio objects documentation](https://create.roblox.com/docs/audio/objects) now says Sound, SoundGroup and SoundEffect objects "are now discouraged" in favour of the newer audio object API, as of October 2026. In that API, an `AudioPlayer` is wired to an `AudioEmitter` placed in the world, the player hears through an `AudioListener`, and `AudioReverb`, `AudioEqualizer` and `AudioCompressor` process the signal. If you're starting a new project, build your mixer on audio objects. The principles below apply to either API.

### Treat sound as a gameplay signal too

Stillskin Forest separates audible sound from **AI stimuli**. When a gun fires, the player hears a sound asset, and the server also sends a noise event with a radius that the infected respond to. Our [published ranges](/games/stillskin-forest/wiki/mechanics/detection-and-noise) are 120 studs for a shotgun blast, 90 for a gunshot, 30 for sprinting footsteps and 25 for a melee swing, and walking is silent. In our development build, each event type also has a per-source cooldown, so a weapon firing quickly can't flood the AI with events. This split means you can tune how scary a sound is and how much attention it draws separately.

### Budget your monster voices

Five zombies groaning at once stops sounding like individual threats. Our fix was a spatial vocal budget. In the shared area, only one infected plays an active chase voice and one plays an attack voice at a time. The others stay quiet or use idle sounds, and every state (idle, investigate, aggro, chase, attack, pain, death) has its own randomised set of clips. The horde got scarier once it got quieter.

### Use silence on purpose

Silence works best right after noise. During a chase, music and vocals rise. When the player hides and an infected saw them do it, the chase goes **unnaturally quiet**. That sudden quiet tells the player something is wrong more clearly than any sting. [Silent Night](/games/stillskin-forest/wiki/special-nights/silent-night) uses the same idea for a whole night: fewer infected, no groans or screams, faster pursuit. Players who rely on audio to locate enemies lose that information.

Ambience should crossfade, not cut. Leaving a hide in our build crossfades breathing, heartbeat and chase layers over four seconds, because abrupt audio cuts sound like bugs.

## Enemy behaviour: state machines, perception and giving up

Believable horror AI needs a clear state machine, perception rules players can learn, and a point at which the enemy gives up.

### Perception you can explain to players

A good test: can a player explain why they were spotted? Stillskin's infected see in a 140° field of view out to 45 studs by day and 70 at night, plus 1.5 studs for every day survived. They also sense anyone within 9 studs from any direction. Crouching, rain and the headlamp change those numbers. Because the rules are consistent, players can learn them, and a game players can learn to survive feels fair even when it's hard.

Here's a simplified, server-side perception check in that style. It isn't our production code. It shows the order of checks: close sense first, then range, then field of view, and the line-of-sight raycast last because it's the most expensive.

```lua
--!strict
local Workspace = game:GetService("Workspace")

local SIGHT_RANGE = 70 -- night range in studs
local CLOSE_SENSE = 9 -- noticed from any direction inside this
local HALF_FOV = math.rad(140 / 2)

local rayParams = RaycastParams.new()
rayParams.FilterType = Enum.RaycastFilterType.Exclude

local function canPerceive(zombieRoot: BasePart, targetRoot: BasePart, rangeMultiplier: number): boolean
	local offset = targetRoot.Position - zombieRoot.Position
	local distance = offset.Magnitude

	if distance <= CLOSE_SENSE then
		return true
	end
	if distance > SIGHT_RANGE * rangeMultiplier then
		return false
	end

	local cosAngle = zombieRoot.CFrame.LookVector:Dot(offset.Unit)
	if math.acos(math.clamp(cosAngle, -1, 1)) > HALF_FOV then
		return false
	end

	-- Cheapest checks first; only now pay for a raycast.
	rayParams.FilterDescendantsInstances = { zombieRoot.Parent :: Instance }
	local hit = Workspace:Raycast(zombieRoot.Position, offset, rayParams)
	return hit == nil or hit.Instance:IsDescendantOf(targetRoot.Parent :: Instance)
end

return canPerceive
```

Pass a `rangeMultiplier` that combines headlamp, crouch and weather, handle hidden players before calling it, and run it a few times per second per enemy rather than every frame.

### A state machine with memory and a time limit

Our published pursuit loop is Roam → Suspicious → Alert → Chase → Attack → Search. An infected that spots you hesitates for about 1.1 seconds before committing, which gives you a brief chance to break line of sight. If it loses sight of you for 5 seconds, it searches where you were heading for about 9 seconds, then returns to roaming. Chases also end on their own after about 22 seconds, after 145 studs, or once you're 85 studs clear.

The time limit matters as much as the chase. An enemy that follows you across the whole map is tiring, not frightening. An enemy that loses you, searches your last position and then gives up leaves the player relieved and worried it will come back, and that's the feeling you want. Here's a skeleton of that logic:

```lua
local CHASE_MAX_TIME = 22
local LOST_SIGHT_GRACE = 5
local SEARCH_TIME = 9
local COMMIT_DELAY = 1.1

local Brain = {}
Brain.__index = Brain

function Brain.new(model: Model)
	return setmetatable({
		model = model,
		state = "Roam",
		enteredAt = os.clock(),
		lastSeenAt = 0,
		lastKnownPosition = nil :: Vector3?,
	}, Brain)
end

function Brain:setState(newState: string)
	if self.state ~= newState then
		self.state = newState
		self.enteredAt = os.clock()
	end
end

function Brain:step(seesTarget: boolean, targetPosition: Vector3?)
	local now = os.clock()
	local timeInState = now - self.enteredAt

	if seesTarget and targetPosition then
		self.lastSeenAt = now
		self.lastKnownPosition = targetPosition
	end

	if self.state == "Roam" then
		if seesTarget then
			self:setState("Suspicious")
		end
	elseif self.state == "Suspicious" then
		if not seesTarget then
			self:setState("Roam")
		elseif timeInState >= COMMIT_DELAY then
			self:setState("Chase")
		end
	elseif self.state == "Chase" then
		if timeInState >= CHASE_MAX_TIME or now - self.lastSeenAt >= LOST_SIGHT_GRACE then
			self:setState("Search") -- walk to lastKnownPosition, then look around
		end
	elseif self.state == "Search" then
		if seesTarget then
			self:setState("Chase")
		elseif timeInState >= SEARCH_TIME then
			self.lastKnownPosition = nil -- forget the player
			self:setState("Roam")
		end
	end
end

return Brain
```

Run `step` from a server loop using `task.wait(0.2)` or similar, not `wait()`. Keep movement separate from decisions: the state says *where* the enemy wants to go, and a movement layer handles *how* it gets there.

### Pathfinding without cheating

Use [PathfindingService](https://create.roblox.com/docs/characters/pathfinding) for anything more than open ground. `CreatePath` takes agent parameters including `AgentRadius`, `AgentHeight`, `AgentCanJump`, `AgentCanClimb` and `Costs`. `Path:ComputeAsync` yields and can fail, so wrap it in `pcall`, check `Path.Status`, and listen to `Path.Blocked` instead of recomputing on a timer. `PathfindingModifier` lets you raise the cost of areas or mark parts as passable, and `PathfindingLink` lets you script custom traversal between two attachments.

The traversal rules in Stillskin Forest give players places to escape to. The infected don't jump onto cars or furniture. We tagged sixteen vehicle and furniture models as jump-only and added invisible perimeter blockers so the non-jumping AI paths around them. The infected can't climb by default either. An infected only gets temporary permission to use a ladder after it [watches you climb it](/games/stillskin-forest/wiki/mechanics/climbing-and-ladders). That rule makes a roof safe or unsafe depending on whether a chaser saw you go up, and players notice that kind of behaviour.

Speed is pacing too: players sprint at 23 studs per second and the fastest infected, the [Runner](/games/stillskin-forest/wiki/enemies/runner), is capped at 21.5, so escaping is possible but never comfortable.

## Hiding systems and the Dread Encounter

Most Roblox hiding systems make the player untargetable and stop there. That's safe and boring. In Stillskin Forest, hidden survivors still can't be damaged directly, but [hiding](/games/stillskin-forest/wiki/mechanics/hiding) isn't automatically safe. If no infected saw you go in, you're fine. If one did, [the Dread Encounter](/games/stillskin-forest/wiki/mechanics/the-dread-encounter) begins:

1. The chase goes quiet and the infected slow to a walk.
2. A lead infected moves to a staged position, then sharply notices you, with a short audio sting.
3. It comes up to the opening and stares and breathes close to you for about five seconds.
4. Others, up to five in all, take supporting roles: a secondary investigator, a room searcher, a doorway watcher, a perimeter searcher.
5. They leave one at a time with random gaps. One may linger or look back.
6. Your heartbeat and breathing settle.

The design brief behind it ended with a line worth keeping in mind for any horror game: the most frightening part should be the anticipation, not the jumpscare.

Some implementation lessons:

- **One controller per hidden player, owned by the server.** The server assigns roles and staging points so zombies don't all crowd one inspection spot. Every hide spot has authored attachment points for each role.
- **Rules that can't be exploited.** You can't leave while an infected is visibly watching your spot, and leaving early can restart the chase. Hiding protects you but doesn't make you permanently safe. Each encounter also has a hard timeout (38 seconds at most in our build), so a stuck encounter can't lock the AI.
- **Fallbacks for every phase.** A zombie that can't reach its staging point retries, picks another or falls back to normal investigation; it never teleports or freezes. Death, disconnect and early exit all clean up.
- **Different camera framing for each hide type.** Standing lockers use a restricted first-person view through the grate, framed on the zombie's face. Low hides such as chests and freezers keep the camera low, so you see legs and silhouettes approaching. Using one camera setup for every hide makes the encounter predictable.
- **Variation within limits.** A delayed head turn, a pause at the doorway, a look back while leaving. Randomise inside a fixed sequence, and never randomly kill a properly hidden player. That feels cheap, not scary.

We tested the full sequence in Studio with four pursuers: reveal, inspection, staggered retreat, a final linger and the infected forgetting the player. That was a single-client test. Interruption by a second player has been reviewed in the source but not yet tested with real multiple clients.

## Pacing: day, night and special nights

Horror needs breaks from the tension, or players get used to it. Stillskin Forest uses its [day and night cycle](/games/stillskin-forest/wiki/mechanics/day-night-cycle) for this. The day phase lasts eight minutes, with few infected and shorter detection range. That's when players scavenge and read notes. Nights last five minutes, and the infected population jumps: 45 on Night 1, rising every day to a cap of 72.

On top of the steady escalation, [special nights](/games/stillskin-forest/wiki/special-nights/special-nights-overview) add surprise. From Night 2, dusk can roll Blood Moon, Heavy Fog, Infected Surge or Silent Night. The chance starts at 30% and rises 6% a night to 65%, and the same special night never comes twice in a row. Each one is announced at dusk with a sting and a banner, so players get a warning before night falls.

Cheap ambient threats fill the gaps: [the Watcher](/games/stillskin-forest/wiki/enemies/watcher) appears in the distance, never attacks, and vanishes if you stare at it or approach.

## Player feedback: UI, camera and audio cues

Stressed players need feedback they can read at a glance:

- **Damage:** a short procedural upper-body recoil, the classic Roblox damage sound layered with a flesh impact, red edge flashes, and a health bar that flashes and jumps.
- **Teammates:** each teammate gets their own colour, an outline visible through walls, and an edge-of-screen pointer when they're off screen. A downed teammate's marker turns red and pulses.
- **The Watcher:** looking at it builds a heartbeat and darkens the screen edges until it vanishes with a static flicker.

One lesson from our own gap audit: sprint FOV, aim, recoil, damage shake, the Dread camera and cinematics all change the camera. If each system controls the camera independently, you get snapping and broken camera state after cutscenes. Give the camera **one owner** that other systems request changes from. The same audit lists reduced camera shake, captions for important audio and brightness calibration as accessibility work we still need to do. Plan for those early.

## Performance

Horror scenes are often expensive to run: many lights, particles, fog, ambient sound sources and a horde of pathfinding NPCs. Our audit lists the budgets we're setting for a full horde: maximum infected per server, path recompute frequency, a sleep distance for far-away AI, animation and audio level of detail, and ragdoll lifetime. Performance testing with large hordes and all ambience running is still on our to-do list. For the general method of finding and fixing frame drops, see [how to fix lag in Roblox Studio](/stillawake-times/how-to-fix-lag-in-roblox-studio).

## Multiplayer considerations

Co-op horror creates problems single-player horror doesn't have.

- **Keep AI on the server.** The server owns zombie states, positions and Dread Encounter ownership. Never trust a client that says a zombie has forgotten it.
- **Decide who gets each scare.** The hidden player's heartbeat, breathing and grate camera are local, sent to that player alone. The zombies' actual investigation is server-driven, so nearby teammates see the real behaviour. Scares that affect everyone (a special-night announcement, the final survivor's music) go to every client.
- **Plan for death.** A downed teammate has two minutes to be revived by someone holding E for three seconds ([co-op details](/games/stillskin-forest/wiki/multiplayer/co-op-survival)). Eliminated players become [ghosts](/games/stillskin-forest/wiki/multiplayer/death-ghosts-and-the-finale) who can fly freely or watch a teammate, then respawn beside a survivor at dawn. Players who are out of the run still have something to do, so they keep watching.
- **Make the ending shared.** When the last survivor falls, the squad appears on a hospital roof with stat cards while the infected dance around them. The next run starts only when every player chooses Return to Camp.

If you want to see how other co-op horror games handle this, our list of [scary Roblox games to play with friends](/games/guides/scary-roblox-games-with-friends) is a good starting point.

## Testing a horror game

Whether a scare works depends on timing and feel, so testing needs discipline:

- **Test with multiple clients early.** In Studio, choose **Server & Clients** in the [testing modes](https://create.roblox.com/docs/studio/testing-modes) dropdown and start up to eight simulated clients, or use **Team Test** to play with collaborators in their own Studio sessions. Many of our open items are multi-client: real revives, ghost spectating while teammates are alive, and Return to Camp voting with several players. Systems that work with one client can break with two.
- **Snapshot before every pass.** Before each major change to the live place, we copy the affected scripts into a dated backup folder in ServerStorage, so any pass can be rolled back.
- **Write down measured values, not impressions.** Our playtest notes record the numbers we actually observed, such as the capped Runner speed, the breathing volume settling at full dread, and the number of zombie voices active in a chase. "Felt too loud" is hard to act on. A measured value is easy to compare after the next change.
- **Separate verified from reviewed.** Our pass notes say what was tested in Studio and what was only checked in the source, which is why the [Stillskin Forest wiki](/games/stillskin-forest/wiki) flags features not yet confirmed in multiplayer.

## Next step

You don't need a big team to make a frightening Roblox game, but it helps to decide on your key scare before writing code and to give each system one clear job. We're documenting Stillskin Forest's mechanics as we build them on the [game page](/games/stillskin-forest) and its wiki. If you're planning a Roblox project and want help with the AI, multiplayer architecture or the website around it, [get in touch](/contact).
