-- COPY THAT: memory. Watch an arrow sequence, repeat it. After each clear: BANK or go again (+1 length).
-- Wrong arrow (or freezing up) and the spring floor fires you into the sky.
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Shared = ReplicatedStorage:WaitForChild("RiskIt")
local Config = require(Shared.Config)
local Glyphs = require(Shared.Glyphs)
local Common = require(script.Parent.Common)
local WorldFX = require(script.Parent.Parent.WorldFX)

local P = Config.Palette
local CopyThat = {}

local DIRS = { "up", "right", "down", "left" }
local START_LEN = 3
local MAX_LEN = 10
local INPUT_TIMEOUT = 4
local OFF = Color3.fromRGB(34, 40, 64)

-- Per-length payout: grows faster than linear so going again is tempting.
function CopyThat.payout(len: number): number
	return math.floor(12 * len + 4 * len * len / 3)
end

function CopyThat.showTime(len: number): number
	return math.max(0.24, 0.5 - (len - START_LEN) * 0.035)
end

function CopyThat.build(station, Build)
	local cf = station.cf
	local model = Instance.new("Model")
	model.Name = "CopyProps"
	model.Parent = station.model

	local board = Build.part({
		name = "ArrowBoard",
		size = Vector3.new(16, 16, 1),
		cf = cf * CFrame.new(0, 14, -16), -- high enough that your own head never covers the bottom arrow
		color = Color3.fromRGB(20, 22, 36),
		material = Enum.Material.Metal,
		parent = model,
	})
	Build.neon(Vector3.new(16.4, 16.4, 0.6), board.CFrame * CFrame.new(0, 0, -0.3), P.Sky, model)

	local gui = Instance.new("SurfaceGui")
	gui.Face = Enum.NormalId.Back
	gui.SizingMode = Enum.SurfaceGuiSizingMode.PixelsPerStud
	gui.PixelsPerStud = 24
	gui.LightInfluence = 0
	gui.Brightness = 2.5
	gui.MaxDistance = 400
	local cells = {}
	local layout = { up = { 0.5, 0.18 }, down = { 0.5, 0.82 }, left = { 0.18, 0.5 }, right = { 0.82, 0.5 } }
	for dir, pos in layout do
		local cell = Instance.new("Frame")
		cell.Name = dir
		cell.AnchorPoint = Vector2.new(0.5, 0.5)
		cell.Position = UDim2.fromScale(pos[1], pos[2])
		cell.Size = UDim2.fromScale(0.3, 0.3)
		cell.BackgroundColor3 = OFF
		cell.BorderSizePixel = 0
		local corner = Instance.new("UICorner")
		corner.CornerRadius = UDim.new(0.2, 0)
		corner.Parent = cell
		Glyphs.chevron(cell, dir, P.White, 0.22)
		cell.Parent = gui
		cells[dir] = cell
	end
	local counter = Instance.new("TextLabel")
	counter.Name = "Counter"
	counter.BackgroundTransparency = 1
	counter.AnchorPoint = Vector2.new(0.5, 0.5)
	counter.Position = UDim2.fromScale(0.5, 0.5)
	counter.Size = UDim2.fromScale(0.26, 0.2)
	counter.FontFace = Build.HeavyFont
	counter.TextScaled = true
	counter.TextColor3 = P.Sky
	counter.Text = ""
	counter.Parent = gui
	gui.Parent = board

	-- spring pad under the player
	local pad = Build.part({
		name = "SpringPad",
		shape = Enum.PartType.Cylinder,
		size = Vector3.new(0.6, 7, 7),
		cf = cf * CFrame.new(0, 0.3, 0) * CFrame.Angles(0, 0, math.rad(90)),
		color = Color3.fromRGB(30, 36, 60),
		parent = model,
	})
	Build.ring((cf * CFrame.new(0, 0.6, 0)).Position, 3.5, 0.3, P.Sky, model)

	return {
		playerStart = cf * CFrame.new(0, 3.7, 0),
		cameraFocus = board.CFrame,
		cameraLift = 1.5, -- low camera looking up: the whole board clears the letterbox
		cameraSide = 5, -- and off to one side so your head never covers the bottom arrow
		cells = cells,
		counter = counter,
		pad = pad,
		padCF = pad.CFrame,
	}
end

local function lit(ctx, dir: string?, color: Color3?)
	for d, cell in ctx.cells do
		cell.BackgroundColor3 = if d == dir then (color or P.Sky) else OFF
	end
end

local function spring(session, ctx, headline: string?)
	WorldFX.sound("Boing", ctx.pad.Position)
	task.spawn(function()
		Common.slide(ctx.pad, ctx.padCF, ctx.padCF * CFrame.new(2.5, 0, 0), 0.06)
	end)
	return {
		outcome = "fail",
		style = "launch",
		headline = headline,
		launch = {
			velocity = Vector3.new(0, 115, 0) + Common.towardHub(session.station, 18, 0),
			spin = Vector3.new(session.rng:NextNumber(-25, 25), session.rng:NextNumber(-10, 10), session.rng:NextNumber(-25, 25)),
		},
	}
end

function CopyThat.run(session, ctx)
	local seq = {}
	for _ = 1, START_LEN do
		table.insert(seq, DIRS[session.rng:NextInteger(1, 4)])
	end
	local best = 0

	while true do
		local len = #seq
		-- SHOW
		session:ui({
			big = "WATCH",
			sub = len .. " arrows" .. (if len > START_LEN then ". Faster now." else "."),
			primary = false,
			secondary = false,
			dirs = false,
			arrows = { count = len, filled = 0 },
		})
		ctx.counter.Text = tostring(len)
		if not session:sleep(0.7) then
			return nil
		end
		local show = CopyThat.showTime(len)
		for i, dir in seq do
			lit(ctx, dir)
			session:ui({ showArrow = dir, arrows = { count = len, filled = i } })
			if not session:sleep(show) then
				return nil
			end
			lit(ctx, nil)
			session:ui({ showArrow = false })
			if not session:sleep(0.12) then
				return nil
			end
		end

		-- REPEAT
		session:ui({
			big = "YOUR TURN",
			sub = "Arrow keys / WASD / tap the arrows.",
			dirs = true,
			arrows = { count = len, filled = 0 },
		})
		for i, want in seq do
			local action = session:waitInput({ up = true, down = true, left = true, right = true }, INPUT_TIMEOUT)
			if session.cancelled then
				return nil
			end
			if action ~= want then
				lit(ctx, want, P.Hot)
				session:ui({ dirs = false, flash = { text = if action then "WRONG" else "FROZE", color = "Hot" } })
				return spring(session, ctx, if action then nil else "BRAIN.EXE STOPPED")
			end
			lit(ctx, want, P.Lime)
			session:ui({ arrows = { count = len, filled = i } })
			task.delay(0.15, function()
				if not session.cancelled then
					lit(ctx, nil)
				end
			end)
		end
		best = len
		WorldFX.sound("Cash", ctx.pad.Position, { pitch = 1 + len * 0.05 })

		if len >= MAX_LEN then
			break
		end
		-- BANK or GO AGAIN
		local bank = CopyThat.payout(len)
		local nextPay = CopyThat.payout(len + 1)
		session:ui({
			big = "CLEAN x" .. len,
			sub = "Bank " .. bank .. " GUTS, or go again for " .. nextPay .. ".",
			dirs = false,
			primary = "GO AGAIN",
			secondary = "BANK " .. bank,
			flash = { text = "COPY THAT", color = "Lime" },
			arrows = false,
		})
		local choice = session:waitInput({ primary = true, secondary = true }, 8)
		if session.cancelled then
			return nil
		end
		if choice ~= "primary" then
			break -- bank (also when idle)
		end
		table.insert(seq, DIRS[session.rng:NextInteger(1, 4)])
	end

	return {
		outcome = "win",
		payout = CopyThat.payout(best),
		score = best,
		scoreText = best .. " ARROWS",
		medal = Common.medal(best, 4, 6, 8),
		headline = if best >= 8 then "PHOTOGRAPHIC" else "COPY THAT",
	}
end

function CopyThat.reset(ctx)
	lit(ctx, nil)
	ctx.counter.Text = ""
	ctx.pad.CFrame = ctx.padCF
end

return CopyThat
