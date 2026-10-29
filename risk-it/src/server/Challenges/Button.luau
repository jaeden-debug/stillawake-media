-- THE BUTTON: press-your-luck. Each press doubles the pot; the odds of the trapdoor are shown honestly.
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Config = require(ReplicatedStorage:WaitForChild("RiskIt").Config)
local Common = require(script.Parent.Common)
local WorldFX = require(script.Parent.Parent.WorldFX)
local Ragdoll = require(script.Parent.Parent.Ragdoll)

local P = Config.Palette
local Button = {}

local START_POT = 10
local MAX_PRESSES = 8
local STAGE_H = 10

function Button.risk(presses: number): number
	return math.min(0.12 + 0.08 * presses, 0.85)
end

function Button.build(station, Build)
	local cf = station.cf
	local model = Instance.new("Model")
	model.Name = "ButtonProps"
	model.Parent = station.model

	-- Stage with a hole in it (X [-8,8], Z [-12,6]; hole X [-4,4], Z [-6,2]).
	local function block(x0, x1, z0, z1)
		local size = Vector3.new(x1 - x0, STAGE_H, z1 - z0)
		Build.part({
			name = "Stage",
			size = size,
			cf = cf * CFrame.new((x0 + x1) / 2, STAGE_H / 2, (z0 + z1) / 2),
			color = Color3.fromRGB(24, 22, 34),
			material = Enum.Material.SmoothPlastic,
			reflectance = 0.05,
			parent = model,
		})
	end
	block(-8, -4, -12, 6)
	block(4, 8, -12, 6)
	block(-4, 4, 2, 6)
	block(-4, 4, -12, -6)
	-- neon lip around stage top
	for _, e in { { 0, 6, 16, 0.3 }, { 0, -12, 16, 0.3 }, { -8, -3, 0.3, 18 }, { 8, -3, 0.3, 18 } } do
		Build.neon(Vector3.new(e[3], 0.3, e[4]), cf * CFrame.new(e[1], STAGE_H, e[2]), P.Hot, model)
	end
	-- Pit bottom: a bounce pad that spits you back out.
	Build.neon(Vector3.new(7.6, 0.3, 7.6), cf * CFrame.new(0, 0.2, -2), P.Volt, model)

	-- Trapdoor halves, hinged on the outer edges.
	local doors = {}
	for _, side in { -1, 1 } do
		local hinge = cf * CFrame.new(side * 4, STAGE_H - 0.3, -2)
		local offset = CFrame.new(-side * 2, 0, 0)
		local door = Build.part({
			name = "Trapdoor",
			size = Vector3.new(4, 0.6, 8),
			cf = hinge * offset,
			color = Color3.fromRGB(40, 12, 22),
			material = Enum.Material.DiamondPlate,
			parent = model,
		})
		-- hazard trim
		local trim = Build.neon(Vector3.new(4, 0.62, 0.3), door.CFrame * CFrame.new(0, 0, 3.85), P.Hot, model)
		local weld = Instance.new("WeldConstraint")
		weld.Part0 = door
		weld.Part1 = trim
		weld.Parent = door
		trim.Anchored = false
		trim.Massless = true
		table.insert(doors, { part = door, hinge = hinge, offset = offset, side = side })
	end

	-- Pedestal + button
	local pedestal = Build.part({
		name = "Pedestal",
		size = Vector3.new(2.6, 3.4, 2.6),
		cf = cf * CFrame.new(0, STAGE_H + 1.7, -9),
		color = Color3.fromRGB(30, 30, 40),
		material = Enum.Material.Metal,
		parent = model,
	})
	local capCF = pedestal.CFrame * CFrame.new(0, 1.9, 0) * CFrame.Angles(0, 0, math.rad(90))
	local cap = Build.part({
		name = "BigButton",
		shape = Enum.PartType.Cylinder,
		size = Vector3.new(0.8, 3.2, 3.2),
		cf = capCF,
		color = P.Hot,
		material = Enum.Material.Neon,
		parent = model,
	})
	local capLight = Build.light(cap, P.Hot, 16, 3)

	-- Ring of warning bulbs
	local bulbs = {}
	for i = 0, 7 do
		local a = i / 8 * math.pi * 2
		local b = Build.neon(Vector3.new(0.6, 0.6, 0.6), cf * CFrame.new(math.cos(a) * 3.2, STAGE_H + 0.3, -9 + math.sin(a) * 3.2), P.Volt, model, Enum.PartType.Ball)
		table.insert(bulbs, b)
	end

	-- Pot board behind the button, facing the player (and spectators on the walkway).
	local board = Build.part({
		name = "PotBoard",
		size = Vector3.new(14, 6, 0.4),
		cf = cf * CFrame.new(0, STAGE_H + 7, -12.5),
		color = P.Ink,
		parent = model,
	})
	Build.neon(Vector3.new(14.6, 6.6, 0.2), board.CFrame * CFrame.new(0, 0, -0.25), P.Hot, model) -- glow frame behind the face
	local gui = Build.sign(board, Enum.NormalId.Back, "POT 10", "RISK 12%", P.Hot, 30)

	return {
		playerStart = cf * CFrame.new(0, STAGE_H + 3, -2) * CFrame.Angles(0, 0, 0),
		cameraFocus = cap.CFrame,
		doors = doors,
		cap = cap,
		capCF = capCF,
		capLight = capLight,
		bulbs = bulbs,
		gui = gui,
		station = station,
	}
end

local function setBoard(ctx, pot: number, risk: number?, color: Color3?)
	ctx.gui.Title.Text = "POT " .. pot
	ctx.gui.Subtitle.Text = if risk then string.format("NEXT PRESS: %d%% DROP", math.floor(risk * 100 + 0.5)) else "SAFE"
	ctx.gui.Subtitle.TextColor3 = color or P.Hot
end

local function pressAnim(ctx)
	task.spawn(function()
		Common.slide(ctx.cap, ctx.capCF, ctx.capCF * CFrame.new(-0.45, 0, 0), 0.06)
		Common.slide(ctx.cap, ctx.capCF * CFrame.new(-0.45, 0, 0), ctx.capCF, 0.18)
	end)
end

local function flashBulbs(ctx, session, duration: number)
	local t = 0
	local on = false
	while t < duration and not session.cancelled do
		on = not on
		for i, b in ctx.bulbs do
			b.Color = if (i % 2 == 0) == on then P.Hot else P.Volt
		end
		local step = 0.12 - 0.07 * (t / duration) -- speeds up as the suspense builds
		task.wait(step)
		t += step
	end
	for _, b in ctx.bulbs do
		b.Color = P.Volt
	end
end

function Button.run(session, ctx)
	local pot = START_POT
	local presses = 0
	setBoard(ctx, pot, Button.risk(0))

	while true do
		local risk = Button.risk(presses)
		setBoard(ctx, pot, risk)
		session:ui({
			big = "POT " .. pot,
			sub = string.format("Press to double it. %d%% chance the floor drops.", math.floor(risk * 100 + 0.5)),
			primary = "PRESS  x2",
			secondary = if presses > 0 then "CASH OUT " .. pot else nil,
			risk = risk,
			timerEnd = workspace:GetServerTimeNow() + 12,
		})
		local action = session:waitInput({ primary = true, secondary = presses > 0 }, 12)
		if session.cancelled then
			return nil
		end
		if action == nil and presses > 0 then
			action = "secondary" -- idle with a pot: we bank it for you
		end
		if action == "secondary" then
			return {
				outcome = "win",
				payout = pot,
				score = pot,
				scoreText = "POT " .. pot,
				medal = Common.medal(pot, 40, 160, 640),
				headline = if pot >= 640 then "ABSOLUTE MENACE" elseif pot >= 160 then "NERVES OF STEEL" else "BANKED IT",
			}
		end

		-- PRESS (or idle on the very first press: the floor gets impatient)
		local forced = action == nil
		presses += 1
		pressAnim(ctx)
		WorldFX.sound("DrumRoll", ctx.cap.Position, { volume = 0.4 })
		session:ui({
			big = "POT " .. pot,
			sub = "...",
			suspense = true,
			primary = false,
			secondary = false,
		})
		flashBulbs(ctx, session, 1.15)
		if session.cancelled then
			return nil
		end

		if forced or session.rng:NextNumber() < risk then
			-- DROP
			ctx.gui.Subtitle.Text = "BYE"
			for _, d in ctx.doors do
				task.spawn(Common.swing, d.part, d.hinge, d.offset, Vector3.zAxis, 0, d.side * math.rad(100), 0.18)
			end
			WorldFX.sound("Boo", ctx.cap.Position)
			local station = session.station
			return {
				outcome = "fail",
				style = if forced then "timeout" else "trapdoor",
				launch = { velocity = Vector3.new(0, -20, 0) },
				followUp = function(s)
					task.wait(0.85)
					if s.character.Parent then
						WorldFX.sound("Boing", s.root.Position)
						Ragdoll.impulse(s.player, Common.towardHub(station, 14, 92), Vector3.new(s.rng:NextNumber(-20, 20), 0, s.rng:NextNumber(-20, 20)))
					end
				end,
			}
		end

		pot *= 2
		WorldFX.sound("Cash", ctx.cap.Position, { pitch = 1 + presses * 0.06 })
		session:ui({ flash = { text = "SAFE!", color = "Lime" }, big = "POT " .. pot })
		if presses >= MAX_PRESSES then
			return {
				outcome = "win",
				payout = pot,
				score = pot,
				scoreText = "POT " .. pot,
				medal = "gold",
				headline = "THE BUTTON FEARS YOU",
			}
		end
		if not session:sleep(0.45) then
			return nil
		end
	end
end

function Button.reset(ctx)
	for _, d in ctx.doors do
		Common.swing(d.part, d.hinge, d.offset, Vector3.zAxis, d.side * math.rad(100), 0, 0.35)
	end
	ctx.cap.CFrame = ctx.capCF
	setBoard(ctx, START_POT, Button.risk(0))
end

return Button
