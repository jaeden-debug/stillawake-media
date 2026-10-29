-- Local world dressing: smooth animations for tagged props, branded proximity prompts,
-- per-player best/medal readouts on each station, and the first-time guide beam.
local CollectionService = game:GetService("CollectionService")
local Players = game:GetService("Players")
local ProximityPromptService = game:GetService("ProximityPromptService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local Config = require(ReplicatedStorage:WaitForChild("RiskIt"):WaitForChild("Config"))
local Theme = require(script.Parent.Theme)
local Hud = require(script.Parent.Hud)
local State = require(script.Parent.State)

local P = Theme.P
local new = Theme.new
local player = Players.LocalPlayer

local World = {}

local promptGuis: { [ProximityPrompt]: BillboardGui } = {}
local playerGui: PlayerGui

-- Tagged animations -----------------------------------------------------------------------------

local function animate(now: number)
	for _, part in CollectionService:GetTagged("RiskItSpin") do
		local base = part:GetAttribute("BaseCF")
		if base then
			part.CFrame = base * CFrame.new(0, math.sin(now * 1.2) * 0.6, 0) * CFrame.Angles(0, now * 0.45, 0)
		end
	end
	for _, part in CollectionService:GetTagged("RiskItSweepLight") do
		local base, pivot, seed = part:GetAttribute("BaseCF"), part:GetAttribute("Pivot"), part:GetAttribute("Seed") or 0
		if base and pivot then
			local rot = CFrame.Angles(math.sin(now * 0.5 + seed) * 0.4, 0, math.cos(now * 0.37 + seed) * 0.4)
			part.CFrame = CFrame.new(pivot) * rot * CFrame.new(-pivot) * base
		end
	end
	for _, pad in CollectionService:GetTagged("RiskItPulse") do
		local occupied = pad:GetAttribute("Occupant") ~= nil
		local hot = pad:GetAttribute("Hot") == true
		local speed = if hot then 6 else 2.4
		pad.Transparency = if occupied then 0.75 else 0.15 + (math.sin(now * speed) + 1) * 0.18
	end
	-- LONG SHOT barrel: swings with the aim needle, holds once locked (yaw ±30°)
	local barrelPhase, barrelAim = nil, 0.5
	for _, part in CollectionService:GetTagged("RiskItCannon") do
		if part.Name == "Barrel" then
			barrelPhase = part:GetAttribute("Phase")
			if barrelPhase == "aim" then
				barrelAim = Config.needle(workspace:GetServerTimeNow() - (part:GetAttribute("Start") or 0), part:GetAttribute("Speed") or 0)
			elseif barrelPhase == "power" or barrelPhase == "fired" then
				barrelAim = part:GetAttribute("Aim") or 0.5
			else
				barrelAim = 0.5 + math.sin(now * 0.6) * 0.08 -- idle sway
			end
		end
	end
	for _, part in CollectionService:GetTagged("RiskItCannon") do
		local base, pivot = part:GetAttribute("BaseCF"), part:GetAttribute("Pivot")
		if base and pivot then
			local yaw = (barrelAim - 0.5) * 2 * math.rad(30)
			part.CFrame = CFrame.new(pivot) * CFrame.Angles(0, -yaw, 0) * CFrame.new(-pivot) * base
		end
	end
	for _, meter in CollectionService:GetTagged("RiskItMeter") do
		local gui = meter:FindFirstChildOfClass("SurfaceGui")
		local needle = gui and gui:FindFirstChild("Bar") and gui.Bar:FindFirstChild("Needle")
		if needle then
			local stopped = meter:GetAttribute("Stopped") or -1
			local speed = meter:GetAttribute("Speed") or 0
			local pos = if stopped >= 0 then stopped elseif speed > 0 then Config.needle(workspace:GetServerTimeNow() - (meter:GetAttribute("Start") or 0), speed) else 0.5
			needle.Position = UDim2.fromScale(pos, 0.5)
		end
	end
end

-- Prompts ---------------------------------------------------------------------------------------

local function stationIdFor(prompt: ProximityPrompt): string?
	local model = prompt.Parent and prompt.Parent.Parent
	if model and model.Name:sub(1, 8) == "Station_" then
		return model.Name:sub(9)
	end
	return nil
end

local function promptMeta(id: string): string
	local profile = State.profile
	local def = Config.ChallengeById[id]
	if not profile or not def then
		return ""
	end
	local parts = {}
	local medal = profile.medals[id]
	if medal then
		table.insert(parts, medal:upper())
	end
	if profile.best[id] then
		table.insert(parts, "BEST " .. Theme.formatBest(def, profile.best[id]))
	else
		local tried = profile.per and profile.per[id] and profile.per[id].a > 0
		table.insert(parts, if tried then "NO CLEAR YET" else "NEVER TRIED")
	end
	if profile.hotSeat == id then
		table.insert(parts, "2x TODAY")
	end
	return table.concat(parts, "  ·  ")
end

local function showPrompt(prompt: ProximityPrompt, inputType: Enum.ProximityPromptInputType)
	local id = stationIdFor(prompt)
	local def = id and Config.ChallengeById[id]
	if not def or State.session then
		return
	end
	local key = if inputType == Enum.ProximityPromptInputType.Gamepad
		then "X"
		elseif inputType == Enum.ProximityPromptInputType.Touch then "TAP"
		else prompt.KeyboardKeyCode.Name

	local bb = new("BillboardGui", {
		Name = "RiskItPrompt",
		Adornee = prompt.Parent,
		AlwaysOnTop = true,
		Size = UDim2.fromOffset(300, 96),
		-- pad level, not head height: on phones head height lands on the centred HUD lines
		StudsOffset = Vector3.new(0, 1.6, 0),
		Active = true,
		ResetOnSpawn = false,
		Parent = playerGui,
	})
	local btn = new("TextButton", {
		AutoButtonColor = false,
		BackgroundColor3 = def.color,
		Size = UDim2.fromScale(1, 0.66),
		Text = "",
		Parent = bb,
	}, {
		Theme.corner(UDim.new(0.5, 0)),
		Theme.gradient(def.color, def.color:Lerp(P.Ink, 0.3), 0),
		new("UIScale", { Scale = 0.4 }),
	})
	local keyCap = new("Frame", {
		BackgroundColor3 = P.Ink,
		AnchorPoint = Vector2.new(0, 0.5),
		Position = UDim2.new(0, 8, 0.5, 0),
		Size = UDim2.fromOffset(52, 46),
		Parent = btn,
	}, { Theme.corner(UDim.new(0.5, 0)) })
	Theme.label({
		Text = key,
		FontFace = Theme.Heavy,
		Size = UDim2.fromScale(0.7, 0.55),
		Position = UDim2.fromScale(0.5, 0.5),
		AnchorPoint = Vector2.new(0.5, 0.5),
		Parent = keyCap,
	})
	Theme.label({
		Text = "RISK IT!",
		FontFace = Theme.Display,
		TextColor3 = P.White,
		TextXAlignment = Enum.TextXAlignment.Left,
		Position = UDim2.new(0, 72, 0.12, 0),
		Size = UDim2.new(1, -84, 0.76, 0),
		Parent = btn,
	})
	local meta = Theme.label({
		Text = promptMeta(id :: string),
		FontFace = Theme.Heavy,
		TextColor3 = P.White,
		Position = UDim2.fromScale(0, 0.7),
		Size = UDim2.fromScale(1, 0.26),
		Parent = bb,
	})
	Theme.textStroke(P.Ink, 2).Parent = meta

	Theme.tween(btn:FindFirstChildOfClass("UIScale") :: UIScale, 0.3, { Scale = 1 }, Enum.EasingStyle.Back)
	btn.Activated:Connect(function()
		prompt:InputHoldBegin()
		task.wait()
		prompt:InputHoldEnd()
	end)
	promptGuis[prompt] = bb
	State.promptStation = id
	Hud.hint(nil) -- the prompt replaces the "walk onto a pad" hint while it is up
end

local function hidePrompt(prompt: ProximityPrompt)
	local bb = promptGuis[prompt]
	if bb then
		promptGuis[prompt] = nil
		bb:Destroy()
		if next(promptGuis) == nil then
			State.promptStation = nil
		end
		if State.profile and not State.profile.onboarded and not State.session and next(promptGuis) == nil then
			Hud.hint("Walk onto a glowing pad and RISK IT!")
		end
	end
end

-- Station readouts -------------------------------------------------------------------------------

local function refreshStationBoards()
	local world = workspace:FindFirstChild("RiskItWorld")
	local profile = State.profile
	if not world or not profile then
		return
	end
	for _, def in Config.Challenges do
		local station = world:FindFirstChild("Station_" .. def.id)
		local sign = station and station:FindFirstChild("StationSign")
		local gui = sign and sign:FindFirstChildOfClass("SurfaceGui")
		if gui then
			local label = gui:FindFirstChild("YourBest") :: TextLabel?
			if not label then
				label = Theme.label({
					Name = "YourBest",
					FontFace = Theme.Heavy,
					TextColor3 = P.White,
					Position = UDim2.fromScale(0.1, 0.8),
					Size = UDim2.fromScale(0.8, 0.17),
					Parent = gui,
				})
			end
			local medal = profile.medals[def.id]
			local best = profile.best[def.id]
			local tried = profile.per and profile.per[def.id] and profile.per[def.id].a > 0
			local text = if best then "YOUR BEST: " .. Theme.formatBest(def, best) elseif tried then "NO CLEAR YET" else "NOT ATTEMPTED"
			if medal then
				text ..= "   ·   " .. medal:upper()
			end
			if profile.hotSeat == def.id then
				text = "HOT SEAT 2x   ·   " .. text
			end
			(label :: TextLabel).Text = text
			;(label :: TextLabel).TextColor3 = if medal then Theme.MedalColor[medal] else P.White
		end
	end
end

-- Guide beam for brand-new players: points at THE BUTTON until they've tried something.
local beam: Beam?
local function updateGuide()
	local profile = State.profile
	local character = player.Character
	local root = character and character:FindFirstChild("HumanoidRootPart")
	local world = workspace:FindFirstChild("RiskItWorld")
	local want = profile and not profile.onboarded and root and world and not State.session
	if not want then
		if beam then
			beam.Parent:Destroy()
			beam = nil
		end
		return
	end
	if beam and beam.Attachment0 and beam.Attachment0.Parent == root then
		return
	end
	if beam then
		beam.Parent:Destroy()
		beam = nil
	end
	local station = world:FindFirstChild("Station_button")
	local pad = station and station:FindFirstChild("StartPad")
	if not pad then
		return
	end
	local holder = new("Folder", { Name = "RiskItGuide", Parent = workspace })
	local a0 = new("Attachment", { Parent = root })
	local a1 = new("Attachment", { Position = Vector3.new(0, 0, 0), Parent = pad })
	local b = new("Beam", {
		Attachment0 = a0,
		Attachment1 = a1,
		Color = ColorSequence.new(P.Hot, P.Volt),
		LightEmission = 1,
		FaceCamera = true,
		Width0 = 0.6,
		Width1 = 2.5,
		Texture = "rbxasset://textures/particles/sparkles_main.dds",
		TextureMode = Enum.TextureMode.Wrap,
		TextureLength = 2,
		TextureSpeed = 2,
		Transparency = NumberSequence.new(0.2),
		Parent = holder,
	})
	holder.Destroying:Once(function()
		a0:Destroy()
		a1:Destroy()
	end)
	beam = b
end

-- Your own overhead name/title stays hidden for you (others still see it): in third person it sits
-- right behind the centred HUD lines, which is unreadable on phones.
local function hideOwnTag(character: Model)
	local head = character:WaitForChild("Head", 10)
	if not head then
		return
	end
	local function apply(child: Instance)
		if child.Name == "RiskItTag" and child:IsA("BillboardGui") then
			child.Enabled = false
		end
	end
	for _, c in head:GetChildren() do
		apply(c)
	end
	head.ChildAdded:Connect(apply)
end

function World.mount(pg: PlayerGui)
	player.CharacterAdded:Connect(hideOwnTag)
	if player.Character then
		task.spawn(hideOwnTag, player.Character)
	end
	playerGui = pg
	ProximityPromptService.PromptShown:Connect(showPrompt)
	ProximityPromptService.PromptHidden:Connect(hidePrompt)
	RunService.RenderStepped:Connect(function()
		animate(os.clock())
		if State.session then
			for prompt in promptGuis do
				hidePrompt(prompt)
			end
		end
	end)
	State.ProfileChanged:Connect(function()
		refreshStationBoards()
		updateGuide()
	end)
	task.spawn(function()
		while true do
			refreshStationBoards()
			updateGuide()
			task.wait(1)
		end
	end)
end

return World
