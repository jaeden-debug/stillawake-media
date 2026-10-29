-- DOOR NUMBER WHO: choice + observation. Three rounds, three doors, one trap per round.
-- The trap door's lamp has a tell (a faint flicker). Luck for newcomers, a learnable read for regulars.
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local Config = require(ReplicatedStorage:WaitForChild("RiskIt").Config)
local Common = require(script.Parent.Common)
local WorldFX = require(script.Parent.Parent.WorldFX)

local P = Config.Palette
local Doors = {}

local WALL_Z = -10
local DOOR_X = { -9, 0, 9 }
local DOOR_W = 5
local DOOR_H = 8
local WALL_H = 13
local WALL_HALF = 25
local ROUNDS = 3
local ROUND_TIME = 10

function Doors.build(station, Build)
	local cf = station.cf
	local model = Instance.new("Model")
	model.Name = "DoorProps"
	model.Parent = station.model

	local wallColor = Color3.fromRGB(26, 22, 40)
	local function wall(x0, x1, y0, y1)
		Build.part({
			name = "Wall",
			size = Vector3.new(x1 - x0, y1 - y0, 2),
			cf = cf * CFrame.new((x0 + x1) / 2, (y0 + y1) / 2, WALL_Z),
			color = wallColor,
			material = Enum.Material.SmoothPlastic,
			parent = model,
		})
	end
	-- solid segments between doorways, plus a lintel above
	local edges = { -WALL_HALF }
	for _, x in DOOR_X do
		table.insert(edges, x - DOOR_W / 2)
		table.insert(edges, x + DOOR_W / 2)
	end
	table.insert(edges, WALL_HALF)
	for i = 1, #edges, 2 do
		wall(edges[i], edges[i + 1], 0, WALL_H)
	end
	wall(-WALL_HALF, WALL_HALF, DOOR_H, WALL_H)
	Build.neon(Vector3.new(WALL_HALF * 2, 0.3, 2.2), cf * CFrame.new(0, WALL_H, WALL_Z), P.Violet, model)

	local doors = {}
	for i, x in DOOR_X do
		-- holographic curtain you can walk through
		local curtain = Build.part({
			name = "Curtain",
			size = Vector3.new(DOOR_W, DOOR_H, 0.2),
			cf = cf * CFrame.new(x, DOOR_H / 2, WALL_Z),
			color = P.Violet,
			material = Enum.Material.ForceField,
			collide = false,
			parent = model,
		})
		curtain.Transparency = 0.1
		-- frame
		for _, side in { -1, 1 } do
			Build.neon(Vector3.new(0.3, DOOR_H, 2.3), cf * CFrame.new(x + side * (DOOR_W / 2), DOOR_H / 2, WALL_Z), P.Violet, model)
		end
		-- number plate
		local plate = Build.part({
			name = "Number",
			size = Vector3.new(3, 2.4, 0.2),
			cf = cf * CFrame.new(x, DOOR_H + 2.1, WALL_Z + 1.1),
			color = P.Ink,
			parent = model,
		})
		Build.sign(plate, Enum.NormalId.Back, tostring(i), nil, P.Violet, 40)
		-- the lamp (the tell lives here)
		local lamp = Build.part({
			name = "Lamp",
			shape = Enum.PartType.Ball,
			size = Vector3.new(1.3, 1.3, 1.3),
			cf = cf * CFrame.new(x, DOOR_H + 4.2, WALL_Z + 1.1),
			color = P.Volt,
			material = Enum.Material.Neon,
			collide = false,
			parent = model,
		})
		local light = Build.light(lamp, P.Volt, 12, 2)
		table.insert(doors, { x = x, curtain = curtain, lamp = lamp, light = light })
	end

	-- Back room floor beyond the wall so a safe pass lands somewhere
	return {
		playerStart = cf * CFrame.new(0, 3, 6),
		cameraFocus = cf * CFrame.new(0, 13, WALL_Z), -- aim high: the lamp tell must stay clear of the top-docked panel
		doors = doors,
	}
end

local function lampState(door, on: boolean)
	door.lamp.Color = if on then P.Volt else Color3.fromRGB(70, 60, 30)
	door.light.Brightness = if on then 2 else 0.2
end

function Doors.run(session, ctx)
	local station = session.station
	local total = 0
	for round = 1, ROUNDS do
		local trap = session.rng:NextInteger(1, #ctx.doors)
		local roundStart = workspace:GetServerTimeNow()
		session:ui({
			big = "ROUND " .. round .. "/3",
			sub = if round == 1 then "Walk through a door. One of them hates you. Watch the lights." else "New shuffle. Same rules.",
			primary = false,
			secondary = false,
			timerEnd = roundStart + ROUND_TIME,
		})

		-- Tell: the trap lamp flickers briefly at random intervals.
		local flickering = true
		task.spawn(function()
			while flickering and not session.cancelled do
				task.wait(session.rng:NextNumber(0.7, 1.6))
				if not flickering then
					break
				end
				lampState(ctx.doors[trap], false)
				task.wait(0.07)
				lampState(ctx.doors[trap], true)
				if session.rng:NextNumber() < 0.4 then
					task.wait(0.06)
					lampState(ctx.doors[trap], false)
					task.wait(0.05)
					lampState(ctx.doors[trap], true)
				end
			end
			lampState(ctx.doors[trap], true)
		end)

		local chosen = nil
		while not chosen do
			RunService.Heartbeat:Wait()
			if session.cancelled then
				flickering = false
				return nil
			end
			if workspace:GetServerTimeNow() - roundStart > ROUND_TIME then
				flickering = false
				return {
					outcome = "fail",
					style = "timeout",
					launch = { velocity = Common.towardHub(station, 40, 80) },
				}
			end
			local lp = session:localPos()
			if lp.Z < WALL_Z + 0.2 then
				for i, d in ctx.doors do
					if math.abs(lp.X - d.x) <= DOOR_W / 2 + 0.5 then
						chosen = i
						break
					end
				end
				if not chosen and lp.Z < WALL_Z - 1.5 then
					chosen = -1 -- somehow got past the wall; treat as the trap
				end
			end
		end
		flickering = false
		total += workspace:GetServerTimeNow() - roundStart

		if chosen ~= trap then
			local d = ctx.doors[chosen]
			d.curtain.Color = P.Lime
			WorldFX.confetti(session.root.Position + Vector3.new(0, 2, 0), P.Lime)
			WorldFX.sound("Cash", session.root.Position, { pitch = 1 + round * 0.1 })
			session:ui({ flash = { text = "SAFE " .. round .. "/3", color = "Lime" } })
			if round == ROUNDS then
				break
			end
			if not session:sleep(0.5) then
				return nil
			end
			d.curtain.Color = P.Violet
			session.character:PivotTo(ctx.playerStart)
		else
			local d = ctx.doors[trap]
			d.curtain.Color = P.Hot
			for _, other in ctx.doors do
				lampState(other, true)
			end
			WorldFX.blast((station.cf * CFrame.new(d.x, 3, WALL_Z - 1)).Position, P.Hot)
			session:ui({ flash = { text = "WRONG DOOR", color = "Hot" } })
			return {
				outcome = "fail",
				style = "blast",
				launch = { velocity = Common.towardHub(station, 82, 58) },
			}
		end
	end

	local secs = math.floor(total * 100 + 0.5) / 100
	return {
		outcome = "win",
		payout = 120,
		score = secs,
		scoreText = string.format("%.2fs", secs),
		medal = Common.medal(secs, 999, 11, 7, true),
		headline = "DOOR WHISPERER",
	}
end

function Doors.reset(ctx)
	for _, d in ctx.doors do
		d.curtain.Color = P.Violet
		lampState(d, true)
	end
end

return Doors
