-- Particle bursts, played on each CLIENT (ParticleEmitter:Emit from the server does not replicate).
-- The server asks for them via Net.WorldFX; see server/WorldFX.
local Debris = game:GetService("Debris")
local TweenService = game:GetService("TweenService")

local Config = require(script.Parent.Config)
local P = Config.Palette

local Bursts = {}

local SQUARE = "rbxasset://textures/particles/SquareParticle.png"
local SPARKLE = "rbxasset://textures/particles/sparkles_main.dds"

local holderFolder: Folder? = nil
local function folder(): Folder
	if not holderFolder or not holderFolder.Parent then
		holderFolder = Instance.new("Folder")
		holderFolder.Name = "RiskItLocalFX"
		holderFolder.Parent = workspace
	end
	return holderFolder :: Folder
end

local function anchorAt(position: Vector3, life: number): Attachment
	local p = Instance.new("Part")
	p.Anchored = true
	p.CanCollide = false
	p.CanQuery = false
	p.CanTouch = false
	p.Transparency = 1
	p.Size = Vector3.one
	p.Position = position
	p.Parent = folder()
	Debris:AddItem(p, life)
	local a = Instance.new("Attachment")
	a.Parent = p
	return a
end

local function onPart(part: BasePart, life: number): Attachment
	local a = Instance.new("Attachment")
	a.Parent = part
	Debris:AddItem(a, life)
	return a
end

local function emit(att: Attachment, props: { [string]: any }, count: number)
	local e = Instance.new("ParticleEmitter")
	e.Enabled = false
	e.LightEmission = 0.5
	e.LightInfluence = 0 -- full colour even in the dark arena (smoke otherwise renders grey)
	for k, v in props do
		(e :: any)[k] = v
	end
	e.Parent = att
	e:Emit(count)
end

-- Continuous emission for `duration` seconds (used while the player is airborne).
local function stream(att: Attachment, props: { [string]: any }, rate: number, duration: number)
	local e = Instance.new("ParticleEmitter")
	e.LightEmission = 0.5
	e.LightInfluence = 0 -- full colour even in the dark arena (smoke otherwise renders grey)
	for k, v in props do
		(e :: any)[k] = v
	end
	e.Rate = rate
	e.Enabled = true
	e.Parent = att
	task.delay(duration, function()
		if e.Parent then
			e.Enabled = false
		end
	end)
end

local CONFETTI_COLORS = { P.Hot, P.Volt, P.Cyan, P.Lime, P.Violet }

local function confettiAt(att: Attachment, scale: number, accent: Color3?)
	local colors = table.clone(CONFETTI_COLORS)
	if accent then
		table.insert(colors, accent)
	end
	for _, c in colors do
		emit(att, {
			Texture = SQUARE,
			Color = ColorSequence.new(c),
			Size = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.55 * scale), NumberSequenceKeypoint.new(0.8, 0.45 * scale), NumberSequenceKeypoint.new(1, 0) }),
			Lifetime = NumberRange.new(1.2, 2.2),
			Speed = NumberRange.new(18 * scale, 34 * scale),
			SpreadAngle = Vector2.new(70, 70),
			EmissionDirection = Enum.NormalId.Top,
			Acceleration = Vector3.new(0, -30, 0),
			Drag = 1.6,
			Rotation = NumberRange.new(0, 360),
			RotSpeed = NumberRange.new(-360, 360),
			LightEmission = 0.35,
		}, math.floor(14 * scale))
	end
end

function Bursts.confetti(position: Vector3, accent: Color3?, scale: number?)
	confettiAt(anchorAt(position, 4), scale or 1, accent)
end

local function ring(position: Vector3, color: Color3)
	local r = Instance.new("Part")
	r.Shape = Enum.PartType.Cylinder
	r.Material = Enum.Material.Neon
	r.Color = color
	r.Anchored = true
	r.CanCollide = false
	r.CanQuery = false
	r.CanTouch = false
	r.Size = Vector3.new(0.3, 2, 2)
	r.CFrame = CFrame.new(position) * CFrame.Angles(0, 0, math.rad(90))
	r.Parent = folder()
	TweenService:Create(r, TweenInfo.new(0.35, Enum.EasingStyle.Quart), { Size = Vector3.new(0.3, 18, 18), Transparency = 1 }):Play()
	Debris:AddItem(r, 0.5)
end

-- Launch-burst cosmetics (Config.Shop kind = "burst"). Emitted from the torso so they travel with you.
local BURSTS = {
	burst_confetti = function(torso: BasePart)
		-- a pop at launch, then confetti streaming off you along the whole arc
		local att = onPart(torso, 4)
		confettiAt(att, 1.2)
		for _, c in CONFETTI_COLORS do
			stream(att, {
				Texture = SQUARE,
				Color = ColorSequence.new(c),
				Size = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.6), NumberSequenceKeypoint.new(1, 0.2) }),
				Lifetime = NumberRange.new(1, 1.6),
				Speed = NumberRange.new(4, 10),
				SpreadAngle = Vector2.new(180, 180),
				Acceleration = Vector3.new(0, -18, 0),
				Rotation = NumberRange.new(0, 360),
				RotSpeed = NumberRange.new(-360, 360),
				LightEmission = 0.35,
			}, 12, 1.4)
		end
	end,
	burst_stars = function(torso: BasePart)
		-- cartoon stars that circle with you (locked to the torso) for the whole flight
		stream(onPart(torso, 3), {
			Texture = SPARKLE,
			Color = ColorSequence.new(P.Volt, P.White),
			Size = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0), NumberSequenceKeypoint.new(0.25, 4.5), NumberSequenceKeypoint.new(1, 0) }),
			Lifetime = NumberRange.new(0.55, 0.85),
			Speed = NumberRange.new(9, 14),
			SpreadAngle = Vector2.new(180, 180),
			RotSpeed = NumberRange.new(-400, 400),
			LockedToPart = true,
			ZOffset = 3, -- draw in front of the body instead of inside it
			LightEmission = 1,
		}, 45, 2)
	end,
	burst_smoke = function(torso: BasePart)
		emit(anchorAt(torso.Position, 4), {
			Texture = "rbxasset://textures/particles/smoke_main.dds",
			Color = ColorSequence.new(Color3.fromRGB(245, 245, 255)),
			Size = NumberSequence.new({ NumberSequenceKeypoint.new(0, 4), NumberSequenceKeypoint.new(1, 11) }),
			Transparency = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.05), NumberSequenceKeypoint.new(1, 1) }),
			Lifetime = NumberRange.new(1, 1.8),
			ZOffset = 1,
			Speed = NumberRange.new(4, 10),
			SpreadAngle = Vector2.new(180, 180),
			Drag = 3,
			LightEmission = 0,
		}, 24)
		-- and a cartoon smoke trail puffing off you as you fly
		stream(onPart(torso, 3), {
			Texture = "rbxasset://textures/particles/smoke_main.dds",
			Color = ColorSequence.new(Color3.fromRGB(230, 230, 245)),
			Size = NumberSequence.new({ NumberSequenceKeypoint.new(0, 2.5), NumberSequenceKeypoint.new(1, 7) }),
			Transparency = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.15), NumberSequenceKeypoint.new(1, 1) }),
			Lifetime = NumberRange.new(0.8, 1.3),
			Speed = NumberRange.new(1, 4),
			SpreadAngle = Vector2.new(180, 180),
			LightEmission = 0,
		}, 26, 1.4)
	end,
	burst_lightning = function(torso: BasePart)
		-- (fire_sparks_main.dds renders nothing on its own; everything here uses the sparkle texture)
		local att = onPart(torso, 3)
		-- flickering electric aura that rides with you
		stream(att, {
			Texture = SPARKLE,
			Color = ColorSequence.new(P.Cyan),
			Size = NumberSequence.new({ NumberSequenceKeypoint.new(0, 6), NumberSequenceKeypoint.new(1, 2.5) }),
			Transparency = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.2), NumberSequenceKeypoint.new(1, 1) }),
			Lifetime = NumberRange.new(0.1, 0.18),
			Speed = NumberRange.new(0, 1),
			RotSpeed = NumberRange.new(-700, 700),
			Rotation = NumberRange.new(0, 360),
			LockedToPart = true,
			ZOffset = 2,
			LightEmission = 1,
		}, 30, 1.6)
		-- fast white-cyan sparks streaking off
		stream(att, {
			Texture = SPARKLE,
			Color = ColorSequence.new(P.White, P.Cyan),
			Size = NumberSequence.new({ NumberSequenceKeypoint.new(0, 1.6), NumberSequenceKeypoint.new(1, 0) }),
			Lifetime = NumberRange.new(0.2, 0.4),
			Speed = NumberRange.new(22, 40),
			SpreadAngle = Vector2.new(180, 180),
			ZOffset = 3,
			LightEmission = 1,
		}, 70, 1.4)
		ring(torso.Position, P.Cyan)
	end,
}

function Bursts.play(id: string, torso: BasePart)
	local fn = BURSTS[id]
	if fn and torso and torso.Parent then
		fn(torso)
	end
end

return Bursts
