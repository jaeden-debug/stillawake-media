-- MELTDOWN: survival. Tiles flash orange and drop away; half of every wave targets the tiles around you.
-- Survive 15 seconds. Leaving a tile at the last moment counts as a CLOSE CALL (that's the score).
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local Config = require(ReplicatedStorage:WaitForChild("RiskIt").Config)
local Common = require(script.Parent.Common)
local WorldFX = require(script.Parent.Parent.WorldFX)
local Ragdoll = require(script.Parent.Parent.Ragdoll)

local P = Config.Palette
local Meltdown = {}

local N = 7 -- grid is N x N
local TILE = 4
local GAP = 0.25
local CENTER_Z = -50
local SURVIVE = 15
local WARN = 0.9
local CLOSE_CALL_WINDOW = 0.45

local DARK_A = Color3.fromRGB(44, 38, 62)
local DARK_B = Color3.fromRGB(56, 48, 78)

-- Wave schedule: drops at t = 1..14, size grows over time (44 of 49 tiles go).
function Meltdown.waveSize(t: number): number
	return 1 + math.floor(t / 3)
end

function Meltdown.build(station, Build)
	local cf = station.cf
	local model = Instance.new("Model")
	model.Name = "MeltdownProps"
	model.Parent = station.model

	-- no walkway on purpose: the grid floats on its own, so the only way off is down
	local gridCF = cf * CFrame.new(0, 0, CENTER_Z)
	local tiles = {}
	local half = (N - 1) / 2
	for ix = 0, N - 1 do
		for iz = 0, N - 1 do
			local home = gridCF * CFrame.new((ix - half) * TILE, -0.5, (iz - half) * TILE)
			local tile = Build.part({
				name = "Tile",
				size = Vector3.new(TILE - GAP, 1, TILE - GAP),
				cf = home,
				color = if (ix + iz) % 2 == 0 then DARK_A else DARK_B,
				material = Enum.Material.SmoothPlastic,
				reflectance = 0.06,
				parent = model,
			})
			tiles[ix * N + iz + 1] = { part = tile, home = home, ix = ix, iz = iz, base = tile.Color, alive = true }
		end
	end
	-- frame rim
	local span = N * TILE
	for _, e in { { 0, span / 2, span + 0.6, 0.4 }, { 0, -span / 2, span + 0.6, 0.4 }, { span / 2, 0, 0.4, span + 0.6 }, { -span / 2, 0, 0.4, span + 0.6 } } do
		Build.neon(Vector3.new(e[3], 0.4, e[4]), gridCF * CFrame.new(e[1], -0.2, e[2]), P.Orange, model)
	end

	-- trampoline net
	local net = Build.part({
		name = "Net",
		size = Vector3.new(70, 1, 70),
		cf = gridCF * CFrame.new(0, -34, 0),
		color = Color3.fromRGB(30, 14, 10),
		transparency = 0.2,
		parent = model,
	})
	for i = -30, 30, 10 do
		Build.neon(Vector3.new(0.25, 0.1, 70), net.CFrame * CFrame.new(i, 0.55, 0), P.Orange, model).Transparency = 0.5
		Build.neon(Vector3.new(70, 0.1, 0.25), net.CFrame * CFrame.new(0, 0.55, i), P.Orange, model).Transparency = 0.5
	end

	return {
		playerStart = gridCF * CFrame.new(0, 3, 0),
		cameraFocus = gridCF,
		tiles = tiles,
		gridCF = gridCF,
	}
end

local function tileAt(ctx, worldPos: Vector3)
	local lp = ctx.gridCF:PointToObjectSpace(worldPos)
	local half = N * TILE / 2
	if math.abs(lp.X) > half or math.abs(lp.Z) > half then
		return nil
	end
	local ix = math.clamp(math.floor((lp.X + half) / TILE), 0, N - 1)
	local iz = math.clamp(math.floor((lp.Z + half) / TILE), 0, N - 1)
	return ix * N + iz + 1
end

local function dropTile(t)
	t.alive = false
	t.part.CanCollide = false
	TweenService:Create(t.part, TweenInfo.new(0.6, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {
		CFrame = t.home * CFrame.new(0, -30, 0) * CFrame.Angles(math.rad(math.random(-40, 40)), 0, math.rad(math.random(-40, 40))),
		Transparency = 1,
	}):Play()
end

function Meltdown.run(session, ctx)
	local start = os.clock()
	session:ui({
		big = "SURVIVE 15s",
		sub = "Orange tiles are about to fall. Close calls score extra.",
		primary = false,
		secondary = false,
		timerEnd = workspace:GetServerTimeNow() + SURVIVE,
	})

	local station = session.station
	local closeCalls = 0
	local current, leftTile, leftAt = nil, nil, 0
	local nextWave = 1
	local pending = {} -- { tileIndex, dropAt }

	while true do
		RunService.Heartbeat:Wait()
		if session.cancelled then
			return nil
		end
		local elapsed = os.clock() - start
		local root = session.root.Position

		-- which tile are we on (for close calls + targeting)
		local now = tileAt(ctx, root)
		if now ~= current then
			if current then
				leftTile, leftAt = current, os.clock()
			end
			current = now
		end

		-- schedule a wave: half near the player, half random
		if elapsed >= nextWave and nextWave <= SURVIVE - 1 then
			local count = Meltdown.waveSize(nextWave)
			nextWave += 1
			local alive = {}
			local near = {}
			local here = current and ctx.tiles[current]
			for i, t in ctx.tiles do
				if t.alive and not t.warned then
					table.insert(alive, i)
					if here and math.abs(t.ix - here.ix) <= 1 and math.abs(t.iz - here.iz) <= 1 then
						table.insert(near, i)
					end
				end
			end
			local picks = {}
			local function take(list)
				if #list == 0 then
					return
				end
				local idx = table.remove(list, session.rng:NextInteger(1, #list))
				if not picks[idx] then
					picks[idx] = true
				end
			end
			for k = 1, count do
				take(if k % 2 == 1 then near else alive)
				if #near == 0 and #alive == 0 then
					break
				end
			end
			for idx in picks do
				local t = ctx.tiles[idx]
				t.warned = true
				t.part.Material = Enum.Material.Neon
				t.part.Color = P.Orange
				table.insert(pending, { idx = idx, at = os.clock() + WARN })
			end
		end

		-- warning blink + drops
		for i = #pending, 1, -1 do
			local p = pending[i]
			local t = ctx.tiles[p.idx]
			local left = p.at - os.clock()
			if left <= 0 then
				table.remove(pending, i)
				dropTile(t)
				if leftTile == p.idx and os.clock() - leftAt <= CLOSE_CALL_WINDOW and current ~= p.idx then
					closeCalls += 1
					session:ui({ flash = { text = "CLOSE CALL!", color = "Volt" } })
				end
			else
				t.part.Color = if math.floor(left * 10) % 2 == 0 then P.Orange else P.Hot
			end
		end

		-- outcomes
		local lp = station.cf:PointToObjectSpace(root)
		if lp.Y < -6 then
			return {
				outcome = "fail",
				style = "fall",
				launch = { velocity = Vector3.new(0, -25, 0) },
				headline = "MELTED",
				followUp = function(s)
					local deadline = os.clock() + 1.6
					while os.clock() < deadline and s.character.Parent do
						if ctx.gridCF:PointToObjectSpace(s.root.Position).Y < -31 then
							break
						end
						task.wait()
					end
					if s.character.Parent then
						WorldFX.sound("Boing", s.root.Position)
						Ragdoll.impulse(s.player, Vector3.new(0, 85, 0), Vector3.new(s.rng:NextNumber(-15, 15), 0, s.rng:NextNumber(-15, 15)))
					end
				end,
			}
		end
		if elapsed >= SURVIVE then
			return {
				outcome = "win",
				payout = 90 + closeCalls * 25,
				score = closeCalls,
				scoreText = closeCalls .. " CLOSE CALL" .. (if closeCalls == 1 then "" else "S"),
				medal = Common.medal(closeCalls, 0, 2, 4),
				headline = if closeCalls >= 4 then "LIVING DANGEROUSLY" else "STILL STANDING",
			}
		end
	end
end

function Meltdown.reset(ctx)
	task.wait(0.6)
	for _, t in ctx.tiles do
		t.alive = true
		t.warned = nil
		t.part.CFrame = t.home
		t.part.Transparency = 0
		t.part.CanCollide = true
		t.part.Material = Enum.Material.SmoothPlastic
		t.part.Color = t.base
	end
end

return Meltdown
