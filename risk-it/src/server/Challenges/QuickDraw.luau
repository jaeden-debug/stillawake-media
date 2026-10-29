-- QUICK DRAW: reaction. Wait for green, then slam. Jump the light (or fall for the yellow fake-out)
-- and the catapult plate under your feet does the rest.
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Config = require(ReplicatedStorage:WaitForChild("RiskIt").Config)
local Common = require(script.Parent.Common)
local WorldFX = require(script.Parent.Parent.WorldFX)

local P = Config.Palette
local QuickDraw = {}

local GO_WINDOW = 1.0 -- seconds after green before it counts as asleep
local MIN_HUMAN = 0.1 -- faster than this is anticipation, not reaction
local OFF = Color3.fromRGB(30, 30, 38)

function QuickDraw.build(station, Build)
	local cf = station.cf
	local model = Instance.new("Model")
	model.Name = "DrawProps"
	model.Parent = station.model

	-- Light tower
	local tower = Build.part({
		name = "Tower",
		size = Vector3.new(6, 18, 3),
		cf = cf * CFrame.new(0, 9, -15),
		color = Color3.fromRGB(22, 22, 30),
		material = Enum.Material.Metal,
		parent = model,
	})
	Build.neon(Vector3.new(6.3, 0.3, 3.2), tower.CFrame * CFrame.new(0, 9, 0), P.Lime, model)
	local lamps = {}
	for i, name in { "red", "yellow", "green" } do
		local lamp = Build.part({
			name = "Lamp_" .. name,
			shape = Enum.PartType.Cylinder,
			size = Vector3.new(0.6, 4.4, 4.4),
			cf = tower.CFrame * CFrame.new(0, 10 - i * 5, 1.6) * CFrame.Angles(0, math.rad(90), 0),
			color = OFF,
			material = Enum.Material.Neon,
			collide = false,
			parent = model,
		})
		local light = Build.light(lamp, OFF, 30, 0)
		lamps[name] = { part = lamp, light = light }
	end

	-- Catapult plate, hinged on its hub-side edge so it flips you backwards.
	local hinge = cf * CFrame.new(0, 0.3, 4)
	local offset = CFrame.new(0, 0, -4)
	local plate = Build.part({
		name = "Catapult",
		size = Vector3.new(8, 0.6, 8),
		cf = hinge * offset,
		color = Color3.fromRGB(30, 34, 30),
		material = Enum.Material.DiamondPlate,
		parent = model,
	})
	Build.neon(Vector3.new(8.2, 0.62, 0.3), plate.CFrame * CFrame.new(0, 0, -3.9), P.Lime, model)

	return {
		playerStart = cf * CFrame.new(0, 3.6, 0),
		cameraFocus = tower.CFrame,
		lamps = lamps,
		plate = plate,
		hinge = hinge,
		offset = offset,
	}
end

local COLORS = { red = P.Hot, yellow = P.Volt, green = P.Lime }

local function setLight(ctx, which: string?)
	for name, lamp in ctx.lamps do
		local on = name == which
		lamp.part.Color = if on then COLORS[name] else OFF
		lamp.light.Color = COLORS[name]
		lamp.light.Brightness = if on then 6 else 0
	end
end

local function fling(session, ctx, headline: string)
	WorldFX.sound("Boing", ctx.plate.Position)
	-- the swinging plate is visual only: solid, it would swat the player back down mid-launch
	ctx.plate.CanCollide = false
	task.spawn(function()
		Common.swing(ctx.plate, ctx.hinge, ctx.offset, Vector3.xAxis, 0, math.rad(55), 0.1)
	end)
	return {
		outcome = "fail",
		style = "catapult",
		headline = headline,
		launch = { velocity = Common.towardHub(session.station, 46, 96) },
	}
end

function QuickDraw.run(session, ctx)
	setLight(ctx, "red")
	session:ui({
		big = "WAIT FOR GREEN",
		sub = "Slam the moment it turns green. Not before.",
		primary = "SLAM",
		secondary = false,
		light = "red",
	})

	local now = os.clock()
	local goAt = now + session.rng:NextNumber(1.8, 4.4)
	local fakeAt = if session.rng:NextNumber() < 0.55 then now + session.rng:NextNumber(0.8, goAt - now - 0.6) else nil

	-- Waiting phase: any press is a flinch.
	while os.clock() < goAt do
		local nextEvent = if fakeAt and fakeAt > os.clock() then fakeAt else goAt
		local action = session:waitInput({ primary = true }, math.max(nextEvent - os.clock(), 0.01))
		if session.cancelled then
			return nil
		end
		if action then
			session:ui({ flash = { text = "FLINCHED", color = "Hot" }, primary = false })
			return fling(session, ctx, "FLINCHED")
		end
		if fakeAt and os.clock() >= fakeAt then
			fakeAt = nil
			setLight(ctx, "yellow")
			session:ui({ light = "yellow" })
			local a2 = session:waitInput({ primary = true }, 0.35)
			if session.cancelled then
				return nil
			end
			if a2 then
				session:ui({ flash = { text = "IT WAS YELLOW", color = "Hot" }, primary = false })
				return fling(session, ctx, "IT WAS YELLOW")
			end
			setLight(ctx, "red")
			session:ui({ light = "red" })
		end
	end

	-- GO
	local goServer = workspace:GetServerTimeNow()
	setLight(ctx, "green")
	session:ui({ light = "green", big = "GO!", sub = "" })
	local action, payload = session:waitInput({ primary = true }, GO_WINDOW)
	if session.cancelled then
		return nil
	end
	if not action then
		session:ui({ flash = { text = "TOO SLOW", color = "Hot" }, primary = false })
		return fling(session, ctx, "TOO SLOW")
	end

	local recv = payload.recv
	local window = math.clamp(session.player:GetNetworkPing() * 2 + 0.12, 0.12, 0.45)
	local t = payload.t or recv
	if t < goServer - 0.03 then
		-- the press left the client before green was shown: a flinch that arrived late
		session:ui({ flash = { text = "FLINCHED", color = "Hot" }, primary = false })
		return fling(session, ctx, "FLINCHED")
	end
	t = math.clamp(t, math.max(goServer, recv - window), recv)
	local reaction = t - goServer
	if reaction < MIN_HUMAN then
		session:ui({ flash = { text = "GUESSED", color = "Hot" }, primary = false })
		return fling(session, ctx, "LUCKY GUESS? NO.")
	end

	local ms = math.floor(reaction * 1000 + 0.5)
	session:ui({ flash = { text = ms .. " ms", color = "Lime" }, primary = false })
	return {
		outcome = "win",
		payout = math.clamp(math.floor(190 - reaction * 300), 40, 150),
		score = ms,
		scoreText = ms .. " ms",
		medal = Common.medal(ms, 1000, 340, 260, true),
		headline = if ms <= 220 then "INHUMAN" elseif ms <= 300 then "QUICK HANDS" else "GOT IT",
	}
end

function QuickDraw.reset(ctx)
	setLight(ctx, nil)
	Common.swing(ctx.plate, ctx.hinge, ctx.offset, Vector3.xAxis, math.rad(55), 0, 0.3)
	ctx.plate.CanCollide = true
end

return QuickDraw
