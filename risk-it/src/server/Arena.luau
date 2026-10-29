-- Builds the world: a late-night neon studio floating in a dark void.
-- A compact hub in the middle, five challenge islands on a ring, each a short walk away.
local CollectionService = game:GetService("CollectionService")
local Lighting = game:GetService("Lighting")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Config = require(ReplicatedStorage:WaitForChild("RiskIt").Config)
local Build = require(script.Parent.Build)

local P = Config.Palette

local Arena = {}

Arena.HubRadius = 34
Arena.StationDistance = 96
Arena.IslandRadius = 26

local function setupLighting()
	-- Technology can only be set in Studio (edit time); the place file ships with Future.
	pcall(function()
		Lighting.Technology = Enum.Technology.Future
	end)
	Lighting.ClockTime = 0.3
	Lighting.Brightness = 2
	Lighting.Ambient = Color3.fromRGB(70, 58, 110)
	Lighting.OutdoorAmbient = Color3.fromRGB(110, 90, 160)
	Lighting.EnvironmentDiffuseScale = 0.6
	Lighting.EnvironmentSpecularScale = 1
	Lighting.GlobalShadows = true
	Lighting.ShadowSoftness = 0.25
	Lighting.ExposureCompensation = 0.35

	for _, child in Lighting:GetChildren() do
		if child:IsA("PostEffect") or child:IsA("Atmosphere") or child:IsA("Sky") then
			child:Destroy()
		end
	end

	local atmo = Instance.new("Atmosphere")
	atmo.Density = 0.16
	atmo.Offset = 0.05
	atmo.Color = Color3.fromRGB(48, 26, 86)
	atmo.Decay = Color3.fromRGB(18, 8, 36)
	atmo.Glare = 0
	atmo.Haze = 0.6
	atmo.Parent = Lighting

	local sky = Instance.new("Sky")
	sky.StarCount = 4000
	sky.CelestialBodiesShown = false
	sky.Parent = Lighting

	local bloom = Instance.new("BloomEffect")
	bloom.Intensity = 0.9
	bloom.Size = 28
	bloom.Threshold = 0.92
	bloom.Parent = Lighting

	local cc = Instance.new("ColorCorrectionEffect")
	cc.Name = "Grade"
	cc.Contrast = 0.12
	cc.Saturation = 0.18
	cc.TintColor = Color3.fromRGB(255, 246, 255)
	cc.Parent = Lighting

	local rays = Instance.new("SunRaysEffect")
	rays.Intensity = 0.04
	rays.Spread = 0.6
	rays.Parent = Lighting
end

local function lightTower(parent: Instance, position: Vector3, color: Color3)
	local mast = Build.part({
		name = "Mast",
		size = Vector3.new(1.4, 34, 1.4),
		cf = CFrame.new(position + Vector3.new(0, 17, 0)),
		color = Color3.fromRGB(30, 30, 40),
		material = Enum.Material.DiamondPlate,
		parent = parent,
	})
	Build.neon(Vector3.new(0.3, 34, 0.3), mast.CFrame * CFrame.new(0.75, 0, 0.75), color, parent)
	local head = Build.part({
		name = "LampHead",
		size = Vector3.new(4, 2, 4),
		cf = CFrame.new(position + Vector3.new(0, 35, 0)),
		color = Color3.fromRGB(25, 25, 32),
		material = Enum.Material.Metal,
		parent = parent,
	})
	local lens = Build.neon(Vector3.new(3, 0.3, 3), head.CFrame * CFrame.new(0, -1.1, 0), color, parent)
	local spot = Build.light(lens, color, 80, 3, "spot")
	spot.Angle = 35
	-- client sweeps these slowly for a live-TV feel (both parts pivot around the head)
	local seed = math.random() * 10
	for _, p in { head, lens } do
		CollectionService:AddTag(p, "RiskItSweepLight")
		p:SetAttribute("BaseCF", p.CFrame)
		p:SetAttribute("Pivot", head.Position)
		p:SetAttribute("Seed", seed)
	end
end

local function buildHub(world: Instance)
	local hub = Instance.new("Model")
	hub.Name = "Hub"
	hub.Parent = world

	Build.disc(Vector3.zero, Arena.HubRadius, 4, P.Floor, hub, Enum.Material.SmoothPlastic)
	Build.ring(Vector3.zero, Arena.HubRadius, 0.6, P.Hot, hub)
	-- inner decorative rings
	for i, r in { 12, 22 } do
		local ring = Build.part({
			name = "FloorLine",
			shape = Enum.PartType.Cylinder,
			size = Vector3.new(0.05, r * 2, r * 2),
			cf = CFrame.new(0, 0.02 * i, 0) * CFrame.Angles(0, 0, math.rad(90)),
			color = i == 1 and P.Volt or P.Violet,
			material = Enum.Material.Neon,
			collide = false,
			transparency = 0.55,
			parent = hub,
		})
		local inner = Build.part({
			name = "FloorFill",
			shape = Enum.PartType.Cylinder,
			size = Vector3.new(0.06, r * 2 - 0.8, r * 2 - 0.8),
			cf = ring.CFrame,
			color = P.Floor,
			collide = false,
			reflectance = 0.08,
			parent = hub,
		})
		inner.CFrame = ring.CFrame * CFrame.new(0.01 * i, 0, 0)
	end

	local spawn = Instance.new("SpawnLocation")
	spawn.Name = "HubSpawn"
	spawn.Anchored = true
	spawn.Neutral = true
	spawn.Duration = 0
	spawn.Size = Vector3.new(10, 0.2, 10)
	spawn.CFrame = CFrame.new(0, 0.11, 0)
	spawn.Transparency = 1
	spawn.CanCollide = false
	spawn.CanQuery = false
	spawn.Parent = hub
	local decal = spawn:FindFirstChildOfClass("Decal")
	if decal then
		decal:Destroy()
	end

	-- Hero sign: double-sided, slowly spinning (client-side spin for smoothness).
	local sign = Build.part({
		name = "TitleSign",
		size = Vector3.new(36, 11, 0.6),
		cf = CFrame.new(0, 26, 0),
		color = P.Ink,
		transparency = 1,
		collide = false,
		castShadow = false,
		parent = hub,
	})
	for _, face in { Enum.NormalId.Front, Enum.NormalId.Back } do
		Build.sign(sign, face, "RISK IT!", nil, P.Hot, 20)
	end
	CollectionService:AddTag(sign, "RiskItSpin")
	sign:SetAttribute("BaseCF", sign.CFrame)
	Build.light(sign, P.Hot, 40, 2)

	-- Glowing halo under the title.
	local halo = Build.neon(Vector3.new(0.4, 44, 44), CFrame.new(0, 19, 0) * CFrame.Angles(0, 0, math.rad(90)), P.Hot, hub, Enum.PartType.Cylinder)
	halo.Transparency = 0.85

	-- towers sit between the walkways (stations start at -90° and are evenly spaced)
	local n = #Config.Challenges
	for i = 0, n - 1 do
		local a = math.rad(-90 + (i + 0.5) * (360 / n))
		lightTower(hub, Vector3.new(math.cos(a), 0, math.sin(a)) * (Arena.HubRadius - 3), i % 2 == 0 and P.Hot or P.Cyan)
	end

	-- Leaderboard pillar (filled client-side from player list for now).
	return hub
end

local function buildIsland(world: Instance, def, cf: CFrame)
	local model = Instance.new("Model")
	model.Name = "Station_" .. def.id
	model.Parent = world

	Build.disc(cf.Position, Arena.IslandRadius, 4, P.Floor, model)
	Build.ring(cf.Position, Arena.IslandRadius, 0.6, def.color, model)

	-- Walkway back to the hub.
	local toHub = -cf.LookVector
	local startDist = Arena.HubRadius - 2
	local endDist = Arena.StationDistance - Arena.IslandRadius + 2
	local len = endDist - startDist
	local mid = toHub * -1 * (startDist + len / 2)
	local walkCF = CFrame.lookAt(Vector3.new(mid.X, -1, mid.Z), Vector3.new(mid.X, -1, mid.Z) + cf.LookVector)
	Build.part({ name = "Walkway", size = Vector3.new(12, 2, len), cf = walkCF, color = P.Floor, reflectance = 0.08, parent = model })
	for _, side in { -1, 1 } do
		Build.neon(Vector3.new(0.4, 0.3, len), walkCF * CFrame.new(side * 6.1, 1.0, 0), def.color, model)
	end
	-- chevrons pointing at the station
	for i = -2, 2 do
		local c = Build.neon(Vector3.new(4, 0.06, 0.6), walkCF * CFrame.new(0, 1.02, i * 6) * CFrame.Angles(0, math.rad(35), 0) * CFrame.new(-1.6, 0, 0), def.color, model)
		c.Transparency = 0.4
		local c2 = Build.neon(Vector3.new(4, 0.06, 0.6), walkCF * CFrame.new(0, 1.02, i * 6) * CFrame.Angles(0, math.rad(-35), 0) * CFrame.new(1.6, 0, 0), def.color, model)
		c2.Transparency = 0.4
	end

	-- Station sign, facing the hub, high enough to read from spawn.
	local board = Build.part({
		name = "StationSign",
		size = Vector3.new(30, 8, 0.4),
		cf = cf * CFrame.new(0, 24, 4),
		color = P.Ink,
		transparency = 1,
		collide = false,
		castShadow = false,
		parent = model,
	})
	Build.sign(board, Enum.NormalId.Back, def.name, def.tagline, def.color, 22)
	Build.light(board, def.color, 40, 1.5)
	-- support posts
	for _, side in { -1, 1 } do
		Build.part({
			name = "Post",
			size = Vector3.new(1, 22, 1),
			cf = cf * CFrame.new(side * 15.5, 10, 4),
			color = Color3.fromRGB(30, 30, 40),
			material = Enum.Material.Metal,
			parent = model,
		})
		Build.neon(Vector3.new(0.3, 22, 0.3), cf * CFrame.new(side * 15.5, 10, 4.6), def.color, model)
	end

	-- Start pad: where you RISK IT.
	local padCF = cf * CFrame.new(0, 0, 16)
	local pad = Build.part({
		name = "StartPad",
		shape = Enum.PartType.Cylinder,
		size = Vector3.new(0.4, 9, 9),
		cf = CFrame.new(padCF.Position + Vector3.new(0, 0.2, 0)) * CFrame.Angles(0, 0, math.rad(90)),
		color = def.color,
		material = Enum.Material.Neon,
		collide = false,
		parent = model,
	})
	pad.Transparency = 0.15
	CollectionService:AddTag(pad, "RiskItPulse")
	local prompt = Instance.new("ProximityPrompt")
	prompt.Name = "RiskPrompt"
	prompt.ActionText = "RISK IT!"
	prompt.ObjectText = def.name
	prompt.KeyboardKeyCode = Enum.KeyCode.E
	prompt.GamepadKeyCode = Enum.KeyCode.ButtonX
	prompt.HoldDuration = 0
	prompt.MaxActivationDistance = 11
	prompt.RequiresLineOfSight = false
	prompt.Style = Enum.ProximityPromptStyle.Custom -- client renders a branded prompt
	prompt.Parent = pad
	Build.light(pad, def.color, 14, 2)

	return model, pad, padCF
end

-- Returns { [id] = { model, pad, prompt, cf, padCF, returnCF } }
function Arena.build()
	setupLighting()
	-- FallenPartsDestroyHeight is edit-time only; tools/place_setup.luau sets it to -1500 so launched
	-- ragdolls never get deleted mid-flight before recovery teleports them back.
	local old = workspace:FindFirstChild("RiskItWorld")
	if old then
		old:Destroy()
	end
	local world = Instance.new("Folder")
	world.Name = "RiskItWorld"
	world.Parent = workspace

	buildHub(world)

	-- Synthwave abyss far below: gives the void depth instead of a flat colour.
	local abyss = Instance.new("Model")
	abyss.Name = "Abyss"
	abyss.Parent = world
	local depth = -110
	Build.part({
		name = "AbyssFloor",
		size = Vector3.new(2048, 2, 2048),
		cf = CFrame.new(0, depth, 0),
		color = Color3.fromRGB(12, 6, 24),
		collide = false,
		castShadow = false,
		parent = abyss,
	})
	for i = -12, 12 do
		local c = if i % 4 == 0 then P.Hot else P.Violet
		local a = Build.neon(Vector3.new(2048, 0.6, 1.2), CFrame.new(0, depth + 1.2, i * 80), c, abyss)
		local b = Build.neon(Vector3.new(1.2, 0.6, 2048), CFrame.new(i * 80, depth + 1.2, 0), c, abyss)
		a.Transparency = 0.25
		b.Transparency = 0.25
	end

	local stations = {}
	local n = #Config.Challenges
	for i, def in Config.Challenges do
		-- start at the "back" of the hub and go around
		local angle = math.rad(-90 + (i - 1) * (360 / n))
		local dir = Vector3.new(math.cos(angle), 0, math.sin(angle))
		local center = dir * Arena.StationDistance
		local cf = CFrame.lookAt(center, center + dir) -- LookVector points away from the hub
		local model, pad, padCF = buildIsland(world, def, cf)
		stations[def.id] = {
			def = def,
			model = model,
			pad = pad,
			prompt = pad:FindFirstChild("RiskPrompt"),
			cf = cf,
			padCF = padCF,
			-- after a fail/win you land right next to the pad, facing it: instant retry
			returnCF = CFrame.lookAt(padCF.Position + (-cf.LookVector) * 7 + Vector3.new(0, 3, 0), padCF.Position + Vector3.new(0, 3, 0)),
		}
		task.wait()
	end
	return stations
end

return Arena
