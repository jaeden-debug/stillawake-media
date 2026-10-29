-- Replicated, in-world effects everyone can see (spectators get the show too).
local Debris = game:GetService("Debris")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")

local Shared = ReplicatedStorage:WaitForChild("RiskIt")
local Config = require(Shared.Config)
local Sounds = require(Shared.Sounds)
local Net = require(Shared.Net)

local WorldFX = {}

local fxFolder = Instance.new("Folder")
fxFolder.Name = "RiskItFX"
fxFolder.Parent = workspace

local function anchorAt(position: Vector3, life: number): Part
	local p = Instance.new("Part")
	p.Anchored = true
	p.CanCollide = false
	p.CanQuery = false
	p.CanTouch = false
	p.Transparency = 1
	p.Size = Vector3.one
	p.Position = position
	p.Parent = fxFolder
	Debris:AddItem(p, life)
	return p
end

function WorldFX.sound(name: string, position: Vector3, opts: { volume: number?, pitch: number? }?)
	local def = Sounds[name]
	if not def then
		return
	end
	local holder = anchorAt(position, 10)
	local s = Instance.new("Sound")
	s.SoundId = def.id
	s.Volume = (opts and opts.volume) or def.volume
	s.PlaybackSpeed = (opts and opts.pitch) or 1
	s.RollOffMinDistance = 30
	s.RollOffMaxDistance = 220
	s.Parent = holder
	s:Play()
	return s
end

-- Particles are played on every client (server-side :Emit does not replicate).
function WorldFX.confetti(position: Vector3, color: Color3?, scale: number?)
	Net.WorldFX:FireAllClients("confetti", position, color, scale)
end

-- A purely visual blast ring + flash (no joint breaking, no physics).
function WorldFX.blast(position: Vector3, color: Color3?)
	local ex = Instance.new("Explosion")
	ex.BlastPressure = 0
	ex.BlastRadius = 0
	ex.DestroyJointRadiusPercent = 0
	ex.Position = position
	ex.Parent = fxFolder
	local ring = Instance.new("Part")
	ring.Shape = Enum.PartType.Cylinder
	ring.Material = Enum.Material.Neon
	ring.Color = color or Config.Palette.Volt
	ring.Anchored = true
	ring.CanCollide = false
	ring.CanQuery = false
	ring.CanTouch = false
	ring.Size = Vector3.new(0.3, 2, 2)
	ring.CFrame = CFrame.new(position) * CFrame.Angles(0, 0, math.rad(90))
	ring.Parent = fxFolder
	TweenService:Create(ring, TweenInfo.new(0.45, Enum.EasingStyle.Quart, Enum.EasingDirection.Out), {
		Size = Vector3.new(0.3, 26, 26),
		Transparency = 1,
	}):Play()
	Debris:AddItem(ring, 0.6)
	WorldFX.sound("Explosion", position)
end

-- Compressed into the first 60% of the trail: the tail fades out, and colours placed there never show.
local RAINBOW = ColorSequence.new({
	ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 46, 99)),
	ColorSequenceKeypoint.new(0.15, Color3.fromRGB(255, 214, 10)),
	ColorSequenceKeypoint.new(0.3, Color3.fromRGB(80, 255, 120)),
	ColorSequenceKeypoint.new(0.45, Color3.fromRGB(0, 229, 255)),
	ColorSequenceKeypoint.new(0.6, Color3.fromRGB(150, 90, 255)),
	ColorSequenceKeypoint.new(1, Color3.fromRGB(150, 90, 255)),
})

-- Equipped cosmetics for a fail: trail + burst. Falls back to the challenge colour.
function WorldFX.failCosmetics(character: Model, equipped, challengeColor: Color3, life: number)
	local trailItem = equipped and Config.ShopById[equipped.trail]
	local seq: ColorSequence
	if trailItem and trailItem.rainbow then
		seq = RAINBOW
	elseif trailItem and trailItem.colors then
		seq = ColorSequence.new(trailItem.colors[1], trailItem.colors[2])
	else
		seq = ColorSequence.new(challengeColor)
	end
	WorldFX.trail(character, seq, life)
	local torso = character:FindFirstChild("UpperTorso") or character:FindFirstChild("Torso")
	local burst = equipped and equipped.burst
	if burst and burst ~= "burst_none" and torso then
		Net.WorldFX:FireAllClients("burst", burst, torso)
	end
end

-- Short neon speed trail on a ragdoll so launches read clearly in clips.
function WorldFX.trail(character: Model, color: Color3 | ColorSequence, life: number)
	local torso = character:FindFirstChild("UpperTorso") or character:FindFirstChild("Torso")
	if not torso then
		return
	end
	local a0 = Instance.new("Attachment")
	a0.Position = Vector3.new(0, 1.5, 0)
	a0.Parent = torso
	local a1 = Instance.new("Attachment")
	a1.Position = Vector3.new(0, -1.5, 0)
	a1.Parent = torso
	local t = Instance.new("Trail")
	t.Attachment0 = a0
	t.Attachment1 = a1
	t.Color = if typeof(color) == "ColorSequence" then color else ColorSequence.new(color)
	t.LightEmission = 1
	t.Lifetime = 0.75
	t.MinLength = 0.05
	t.Transparency = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0), NumberSequenceKeypoint.new(0.7, 0.15), NumberSequenceKeypoint.new(1, 1) })
	t.WidthScale = NumberSequence.new({ NumberSequenceKeypoint.new(0, 1), NumberSequenceKeypoint.new(1, 0) })
	t.FaceCamera = true
	t.Parent = torso
	-- a matching glow so the launch lights up the scene (reads from far away and in clips)
	local glow = Instance.new("PointLight")
	glow.Color = t.Color.Keypoints[1].Value
	glow.Range = 14
	glow.Brightness = 3
	glow.Parent = torso
	Debris:AddItem(glow, life)
	Debris:AddItem(t, life)
	Debris:AddItem(a0, life)
	Debris:AddItem(a1, life)
end

return WorldFX
