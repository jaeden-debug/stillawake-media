-- PERFECT STOP: timing. Stop a ping-ponging needle inside a shrinking zone, three rounds.
-- Miss and the board punches you into next week.
local CollectionService = game:GetService("CollectionService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local Config = require(ReplicatedStorage:WaitForChild("RiskIt").Config)
local Common = require(script.Parent.Common)
local WorldFX = require(script.Parent.Parent.WorldFX)

local P = Config.Palette
local PerfectStop = {}

PerfectStop.Rounds = {
	{ width = 0.24, speed = 0.85 },
	{ width = 0.16, speed = 1.2 },
	{ width = 0.10, speed = 1.6 },
}
local LEAD_IN = 0.6 -- needle starts moving this long after the round is announced
local ROUND_TIMEOUT = 6

function PerfectStop.build(station, Build)
	local cf = station.cf
	local model = Instance.new("Model")
	model.Name = "StopProps"
	model.Parent = station.model

	local frame = Build.part({
		name = "BoardFrame",
		size = Vector3.new(22, 13, 2),
		cf = cf * CFrame.new(0, 6.5, -14),
		color = Color3.fromRGB(26, 26, 36),
		material = Enum.Material.Metal,
		parent = model,
	})
	Build.neon(Vector3.new(22.4, 0.3, 2.2), frame.CFrame * CFrame.new(0, 6.5, 0), P.Cyan, model)
	Build.neon(Vector3.new(22.4, 0.3, 2.2), frame.CFrame * CFrame.new(0, -6.5, 0), P.Cyan, model)

	-- Meter surface (front of the frame facing the player = local +Z = Back face)
	local meter = Build.part({
		name = "Meter",
		size = Vector3.new(20, 4, 0.2),
		cf = frame.CFrame * CFrame.new(0, 3.6, 1.05),
		color = P.Ink,
		parent = model,
	})
	local gui = Instance.new("SurfaceGui")
	gui.Face = Enum.NormalId.Back
	gui.SizingMode = Enum.SurfaceGuiSizingMode.PixelsPerStud
	gui.PixelsPerStud = 30
	gui.LightInfluence = 0
	gui.Brightness = 2
	gui.MaxDistance = 400
	local bar = Instance.new("Frame")
	bar.Name = "Bar"
	bar.BackgroundColor3 = Color3.fromRGB(30, 30, 44)
	bar.BorderSizePixel = 0
	bar.AnchorPoint = Vector2.new(0.5, 0.5)
	bar.Position = UDim2.fromScale(0.5, 0.5)
	bar.Size = UDim2.fromScale(0.94, 0.5)
	bar.Parent = gui
	Instance.new("UICorner", bar).CornerRadius = UDim.new(0.5, 0)
	local zone = Instance.new("Frame")
	zone.Name = "Zone"
	zone.BackgroundColor3 = P.Lime
	zone.BorderSizePixel = 0
	zone.AnchorPoint = Vector2.new(0.5, 0)
	zone.Size = UDim2.fromScale(0.24, 1)
	zone.Position = UDim2.fromScale(0.5, 0)
	zone.Parent = bar
	local perfect = Instance.new("Frame")
	perfect.Name = "Perfect"
	perfect.BackgroundColor3 = P.Volt
	perfect.BorderSizePixel = 0
	perfect.AnchorPoint = Vector2.new(0.5, 0)
	perfect.Size = UDim2.fromScale(0.5, 1)
	perfect.Position = UDim2.fromScale(0.5, 0)
	perfect.Parent = zone
	local needle = Instance.new("Frame")
	needle.Name = "Needle"
	needle.BackgroundColor3 = P.White
	needle.BorderSizePixel = 0
	needle.AnchorPoint = Vector2.new(0.5, 0.5)
	needle.Size = UDim2.new(0, 10, 1.7, 0)
	needle.Position = UDim2.fromScale(0, 0.5)
	needle.ZIndex = 3
	needle.Parent = bar
	gui.Parent = meter

	-- Client animates the needle from these attributes (smooth for every viewer, zero replication cost).
	meter:SetAttribute("Start", 0)
	meter:SetAttribute("Speed", 0)
	meter:SetAttribute("Stopped", -1)
	CollectionService:AddTag(meter, "RiskItMeter")

	-- Glove housing + glove
	local housing = Build.part({
		name = "Housing",
		size = Vector3.new(5, 5, 2.4),
		cf = frame.CFrame * CFrame.new(0, -3, 0.4),
		color = Color3.fromRGB(18, 18, 26),
		parent = model,
	})
	Build.neon(Vector3.new(5.2, 0.25, 2.5), housing.CFrame * CFrame.new(0, 2.5, 0), P.Hot, model)
	local gloveRest = housing.CFrame * CFrame.new(0, 0, 0.2)
	local glove = Build.part({
		name = "Glove",
		shape = Enum.PartType.Ball,
		size = Vector3.new(4, 4, 4),
		cf = gloveRest,
		color = Color3.fromRGB(220, 30, 50),
		material = Enum.Material.SmoothPlastic,
		reflectance = 0.15,
		collide = false,
		parent = model,
	})
	local cuff = Build.part({
		name = "Cuff",
		shape = Enum.PartType.Cylinder,
		size = Vector3.new(1.4, 3, 3),
		cf = gloveRest * CFrame.new(0, 0, -1.6) * CFrame.Angles(0, math.rad(90), 0),
		color = P.White,
		collide = false,
		parent = model,
	})
	local spring = Build.part({
		name = "Spring",
		shape = Enum.PartType.Cylinder,
		size = Vector3.new(0.2, 1.4, 1.4),
		cf = gloveRest * CFrame.Angles(0, math.rad(90), 0),
		color = P.Volt,
		material = Enum.Material.Neon,
		collide = false,
		transparency = 1,
		parent = model,
	})

	return {
		playerStart = cf * CFrame.new(0, 3, -2),
		cameraFocus = meter.CFrame,
		meter = meter,
		zone = zone,
		glove = glove,
		cuff = cuff,
		spring = spring,
		gloveRest = gloveRest,
	}
end

local function setGlove(ctx, extend: number)
	local cf = ctx.gloveRest * CFrame.new(0, 0, extend)
	ctx.glove.CFrame = cf
	ctx.cuff.CFrame = cf * CFrame.new(0, 0, -1.6) * CFrame.Angles(0, math.rad(90), 0)
	local len = math.max(extend - 1, 0.2)
	ctx.spring.Size = Vector3.new(len, 1.4, 1.4)
	ctx.spring.Transparency = if extend > 0.5 then 0 else 1
	ctx.spring.CFrame = ctx.gloveRest * CFrame.new(0, 0, len / 2) * CFrame.Angles(0, math.rad(90), 0)
end

local function punch(ctx)
	local reach = 9.4
	local t = 0
	while t < 0.09 do
		t += RunService.Heartbeat:Wait()
		setGlove(ctx, reach * math.clamp(t / 0.09, 0, 1))
	end
	setGlove(ctx, reach)
end

-- Server-side judging with bounded trust in the client's press timestamp.
function PerfectStop.judge(session, payload, start: number, speed: number): number
	local recv = payload and payload.recv or workspace:GetServerTimeNow()
	local window = math.clamp(session.player:GetNetworkPing() * 2 + 0.1, 0.1, 0.4)
	local t = if payload and payload.t then math.clamp(payload.t, recv - window, recv) else recv
	return Config.needle(t - start, speed)
end

function PerfectStop.run(session, ctx)
	local perfects = 0
	for i, round in PerfectStop.Rounds do
		local half = round.width / 2
		local center = session.rng:NextNumber(half + 0.06, 1 - half - 0.06)
		local start = workspace:GetServerTimeNow() + LEAD_IN
		ctx.zone.Size = UDim2.fromScale(round.width, 1)
		ctx.zone.Position = UDim2.fromScale(center, 0)
		ctx.meter:SetAttribute("Stopped", -1)
		ctx.meter:SetAttribute("Speed", round.speed)
		ctx.meter:SetAttribute("Start", start)
		session:ui({
			big = "ROUND " .. i .. "/3",
			sub = if i == 1 then "Stop the needle in the green. Gold = PERFECT." else "Faster. Smaller. Don't blink.",
			primary = "STOP",
			secondary = false,
			meter = { center = center, width = round.width, speed = round.speed, start = start },
		})

		local action, payload = session:waitInput({ primary = true }, LEAD_IN + ROUND_TIMEOUT)
		if session.cancelled then
			return nil
		end
		local pos = if action then PerfectStop.judge(session, payload, start, round.speed) else -1
		ctx.meter:SetAttribute("Stopped", pos)
		local dist = math.abs(pos - center)
		local hit = action ~= nil and dist <= half
		local isPerfect = hit and dist <= half * 0.4
		session:ui({
			meterStop = pos,
			flash = if isPerfect
				then { text = "PERFECT!", color = "Volt" }
				elseif hit then { text = "NICE", color = "Lime" }
				else { text = if action then "MISS" else "TOO SLOW", color = "Hot" },
			primary = false,
		})

		if not hit then
			WorldFX.sound("Boo", ctx.glove.Position)
			if not session:sleep(0.3) then
				return nil
			end
			punch(ctx)
			WorldFX.sound("Punch", ctx.glove.Position)
			return {
				outcome = "fail",
				style = "glove",
				launch = { velocity = Common.towardHub(session.station, 78, 48) },
			}
		end
		if isPerfect then
			perfects += 1
			WorldFX.sound("Cash", ctx.meter.Position, { pitch = 1.2 })
		end
		if not session:sleep(0.75) then
			return nil
		end
	end

	return {
		outcome = "win",
		payout = 60 + perfects * 35,
		score = perfects,
		scoreText = perfects .. " PERFECT" .. (if perfects == 1 then "" else "S"),
		medal = Common.medal(perfects, 0, 1, 2),
		headline = if perfects == 3 then "FRAME PERFECT" else nil,
	}
end

function PerfectStop.reset(ctx)
	local t = 0
	while t < 0.3 do
		t += RunService.Heartbeat:Wait()
		setGlove(ctx, 9.4 * (1 - math.clamp(t / 0.3, 0, 1)))
	end
	setGlove(ctx, 0)
	ctx.meter:SetAttribute("Speed", 0)
	ctx.meter:SetAttribute("Stopped", -1)
end

return PerfectStop
