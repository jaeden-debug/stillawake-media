-- LONG SHOT: aim + power. Lock the swinging aim, lock the power, get fired at floating rings.
-- The landing point is solved analytically on the server (fair + deterministic); the ragdoll then flies
-- that exact arc. Hit a ring = win (you still fly). Miss = splashdown in the net.
local CollectionService = game:GetService("CollectionService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Config = require(ReplicatedStorage:WaitForChild("RiskIt").Config)
local Common = require(script.Parent.Common)
local WorldFX = require(script.Parent.Parent.WorldFX)
local PerfectStop = require(script.Parent.PerfectStop)

local P = Config.Palette
local LongShot = {}

local AIM_RANGE = math.rad(30) -- ± yaw
local AIM_SPEED = 0.75
local POWER_SPEED = 1.05
local VY = 80
local VH_MIN, VH_MAX = 40, 130
local RING_Y = -4
local MUZZLE = Vector3.new(0, 6, -3) -- station-local
local LOCK_TIMEOUT = 7

-- yaw (deg), distance, points
LongShot.Targets = {
	{ yaw = -16, dist = 52, points = 100, radius = 9 },
	{ yaw = 14, dist = 80, points = 250, radius = 8 },
	{ yaw = -2, dist = 108, points = 500, radius = 7 },
}
local BULLSEYE = 3

function LongShot.velocity(aimPos: number, power: number): (number, number)
	local yaw = (aimPos - 0.5) * 2 * AIM_RANGE
	local vh = VH_MIN + power * (VH_MAX - VH_MIN)
	return yaw, vh
end

-- Horizontal landing offset (station-local, from the muzzle) for a launch, landing on the ring plane.
function LongShot.solve(yaw: number, vh: number, gravity: number): (Vector3, number)
	local dy = RING_Y - MUZZLE.Y
	local t = (VY + math.sqrt(VY * VY - 2 * gravity * dy)) / gravity
	local d = vh * t
	return Vector3.new(math.sin(yaw) * d, 0, -math.cos(yaw) * d), t
end

local function targetLocal(target): Vector3
	local yaw = math.rad(target.yaw)
	return Vector3.new(MUZZLE.X + math.sin(yaw) * target.dist, RING_Y, MUZZLE.Z - math.cos(yaw) * target.dist)
end

function LongShot.build(station, Build)
	local cf = station.cf
	local model = Instance.new("Model")
	model.Name = "LongShotProps"
	model.Parent = station.model

	-- cannon base
	Build.part({
		name = "CannonBase",
		shape = Enum.PartType.Cylinder,
		size = Vector3.new(3, 8, 8),
		cf = cf * CFrame.new(0, 1.5, 0) * CFrame.Angles(0, 0, math.rad(90)),
		color = Color3.fromRGB(34, 30, 48),
		material = Enum.Material.Metal,
		parent = model,
	})
	Build.ring((cf * CFrame.new(0, 3.05, 0)).Position, 4, 0.3, P.Rose, model)
	-- barrel (client animates yaw from attributes; server only sets them)
	local pivot = cf * CFrame.new(0, 3.6, 0)
	local barrel = Build.part({
		name = "Barrel",
		shape = Enum.PartType.Cylinder,
		size = Vector3.new(8, 3.2, 3.2),
		cf = pivot * CFrame.Angles(math.rad(35), 0, 0) * CFrame.new(0, 0, -3) * CFrame.Angles(0, math.rad(90), 0),
		color = Color3.fromRGB(50, 44, 70),
		material = Enum.Material.Metal,
		collide = false,
		parent = model,
	})
	local muzzleRing = Build.neon(Vector3.new(0.5, 3.6, 3.6), barrel.CFrame * CFrame.new(-4, 0, 0), P.Rose, model, Enum.PartType.Cylinder)
	for _, p in { barrel, muzzleRing } do
		p:SetAttribute("BaseCF", p.CFrame)
		p:SetAttribute("Pivot", pivot.Position)
		CollectionService:AddTag(p, "RiskItCannon")
	end
	barrel:SetAttribute("Phase", "idle")

	-- floating target rings + a net under the whole range
	local rings = {}
	for i, t in LongShot.Targets do
		local pos = (cf * CFrame.new(targetLocal(t))).Position
		Build.disc(pos, t.radius, 1.2, Color3.fromRGB(36, 26, 52), model)
		Build.ring(pos, t.radius, 0.5, P.Rose, model)
		local eye = Build.neon(Vector3.new(0.15, BULLSEYE * 2, BULLSEYE * 2), CFrame.new(pos + Vector3.new(0, 0.05, 0)) * CFrame.Angles(0, 0, math.rad(90)), P.Volt, model, Enum.PartType.Cylinder)
		local mid = Build.neon(Vector3.new(0.1, t.radius * 1.3, t.radius * 1.3), CFrame.new(pos + Vector3.new(0, 0.02, 0)) * CFrame.Angles(0, 0, math.rad(90)), P.Rose, model, Enum.PartType.Cylinder)
		mid.Transparency = 0.6
		local label = Instance.new("BillboardGui")
		label.Size = UDim2.fromScale(9, 3.6) -- world-sized so it shrinks with distance
		label.StudsOffset = Vector3.new(0, 6, 0)
		label.LightInfluence = 0
		label.MaxDistance = 260
		local text = Instance.new("TextLabel")
		text.BackgroundTransparency = 1
		text.Size = UDim2.fromScale(1, 1)
		text.FontFace = Build.HeavyFont
		text.TextScaled = true
		text.TextColor3 = P.White
		text.Text = tostring(t.points)
		local stroke = Instance.new("UIStroke")
		stroke.Color = P.Rose
		stroke.Thickness = 3
		stroke.Parent = text
		text.Parent = label
		label.Parent = eye
		rings[i] = { pos = targetLocal(t), spec = t, eye = eye }
	end
	local net = Build.part({
		name = "Net",
		size = Vector3.new(140, 1, 140),
		cf = cf * CFrame.new(0, -45, -80),
		color = Color3.fromRGB(30, 12, 30),
		transparency = 0.25,
		parent = model,
	})
	for i = -60, 60, 20 do
		Build.neon(Vector3.new(0.3, 0.1, 140), net.CFrame * CFrame.new(i, 0.55, 0), P.Rose, model).Transparency = 0.5
		Build.neon(Vector3.new(140, 0.1, 0.3), net.CFrame * CFrame.new(0, 0.55, i), P.Rose, model).Transparency = 0.5
	end

	return {
		playerStart = cf * CFrame.new(3.2, 6.6, 3), -- off-centre so the barrel and your body never hide the far ring
		cameraFocus = cf * CFrame.new(0, RING_Y, -80),
		barrel = barrel,
		rings = rings,
		station = station,
	}
end

local function setPhase(ctx, phase: string, start: number?, speed: number?, locked: number?)
	ctx.barrel:SetAttribute("Phase", phase)
	ctx.barrel:SetAttribute("Start", start or 0)
	ctx.barrel:SetAttribute("Speed", speed or 0)
	if locked then
		ctx.barrel:SetAttribute("Aim", locked)
	end
end

-- Meter tick marks so the player can read where the rings are (aim) and how far they are (power).
local function marks(kind: string)
	local out = {}
	local _, t = LongShot.solve(0, 1, workspace.Gravity)
	for _, target in LongShot.Targets do
		local pos = if kind == "aim"
			then 0.5 + math.rad(target.yaw) / (2 * AIM_RANGE)
			else ((target.dist / t) - VH_MIN) / (VH_MAX - VH_MIN)
		table.insert(out, { pos = pos, label = tostring(target.points) })
	end
	return out
end

function LongShot.run(session, ctx)
	-- AIM
	local start = workspace:GetServerTimeNow() + 0.4
	setPhase(ctx, "aim", start, AIM_SPEED)
	session:ui({
		big = "AIM",
		sub = "Lock the cannon on a ring. Further ring = more points.",
		primary = "LOCK AIM",
		secondary = false,
		meter = { center = 0.5, width = 0, speed = AIM_SPEED, start = start, marks = marks("aim") },
	})
	local action, payload = session:waitInput({ primary = true }, LOCK_TIMEOUT)
	if session.cancelled then
		return nil
	end
	local aim = if action then PerfectStop.judge(session, payload, start, AIM_SPEED) else session.rng:NextNumber()
	setPhase(ctx, "power", 0, 0, aim)
	session:ui({ meterStop = aim, flash = { text = "AIM LOCKED", color = "Rose" } })
	if not session:sleep(0.45) then
		return nil
	end

	-- POWER
	start = workspace:GetServerTimeNow() + 0.3
	session:ui({
		big = "POWER",
		sub = "Too little: splash. Too much: also splash.",
		primary = "FIRE!",
		meter = { center = 0.5, width = 0, speed = POWER_SPEED, start = start, marks = marks("power") },
	})
	action, payload = session:waitInput({ primary = true }, LOCK_TIMEOUT)
	if session.cancelled then
		return nil
	end
	local power = if action then PerfectStop.judge(session, payload, start, POWER_SPEED) else session.rng:NextNumber()
	setPhase(ctx, "fired", 0, 0, aim)
	session:ui({ meterStop = power, primary = false })

	-- Solve the shot
	local yaw, vh = LongShot.velocity(aim, power)
	local offset, flight = LongShot.solve(yaw, vh, workspace.Gravity)
	local landing = MUZZLE + offset
	local hit, best = nil, 0
	for _, r in ctx.rings do
		local d = (Vector3.new(landing.X, 0, landing.Z) - Vector3.new(r.pos.X, 0, r.pos.Z)).Magnitude
		if d <= r.spec.radius then
			local pts = if d <= BULLSEYE then r.spec.points * 2 else r.spec.points
			if pts > best then
				best, hit = pts, r
			end
		end
	end

	-- Fire: put the player in the muzzle, then launch along the solved arc.
	local cf = session.station.cf
	session.character:PivotTo(cf * CFrame.new(MUZZLE) * CFrame.Angles(0, -yaw, 0))
	WorldFX.blast((cf * CFrame.new(MUZZLE)).Position, P.Rose)
	local dirWorld = cf:VectorToWorldSpace(Vector3.new(math.sin(yaw), 0, -math.cos(yaw)))
	local velocity = dirWorld * vh + Vector3.new(0, VY, 0)
	local spin = Vector3.new(session.rng:NextNumber(-8, 8), 0, session.rng:NextNumber(-8, 8))
	local landWorld = (cf * CFrame.new(landing)).Position

	if hit then
		local bull = best >= hit.spec.points * 2
		return {
			outcome = "win",
			payout = 40 + math.floor(best * 0.3),
			score = best,
			scoreText = best .. " PTS" .. (if bull then " · BULLSEYE" else ""),
			medal = Common.medal(best, 100, 250, 500),
			headline = if bull then "BULLSEYE" elseif best >= 500 then "LONG SHOT" else "STUCK THE LANDING",
			-- the client kills horizontal speed at touchdown (in its own physics clock) so you stick the ring
			launch = { velocity = velocity, spin = spin, stopAfter = flight },
			recoverAfter = flight + 1.6,
			followUp = function(s)
				task.wait(flight)
				WorldFX.confetti(landWorld + Vector3.new(0, 2, 0), P.Rose)
				WorldFX.sound("Cheer", landWorld)
				WorldFX.sound("Cash", landWorld)
			end,
		}
	end
	return {
		outcome = "fail",
		style = "misfire",
		launch = { velocity = velocity, spin = spin },
		recoverAfter = math.max(flight + 1.4, Config.RecoverDelay),
	}
end

function LongShot.reset(ctx)
	setPhase(ctx, "idle")
end

return LongShot
