-- THE SWEEPER: movement. Sprint a bridge over the void past three spinning arms.
-- Arms are physics motors owned by the server, so they push everyone for real (and look smooth).
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local Config = require(ReplicatedStorage:WaitForChild("RiskIt").Config)
local Common = require(script.Parent.Common)
local WorldFX = require(script.Parent.Parent.WorldFX)
local Ragdoll = require(script.Parent.Parent.Ragdoll)

local P = Config.Palette
local Sweeper = {}

local RUN_START = 8
local RUN_END = -66
local GOAL_Z = -71
local TIME_LIMIT = 16
local WIDTH = 8

-- z, kind, angular speed (rad/s), pivot x
Sweeper.Arms = {
	{ z = -16, kind = "low", speed = 2.3, x = 0 },
	{ z = -38, kind = "wall", speed = -1.5, x = 7 },
	{ z = -56, kind = "low", speed = -3.1, x = 0 },
}

local function makeArm(model: Model, Build, cf: CFrame, spec)
	local pivotCF = cf * CFrame.new(spec.x, 0, spec.z)
	local post = Build.part({
		name = "ArmPost",
		shape = Enum.PartType.Cylinder,
		size = Vector3.new(spec.kind == "wall" and 9 or 3, 1.6, 1.6),
		cf = pivotCF * CFrame.new(0, (spec.kind == "wall" and 9 or 3) / 2, 0) * CFrame.Angles(0, 0, math.rad(90)),
		color = Color3.fromRGB(40, 40, 52),
		material = Enum.Material.Metal,
		parent = model,
	})
	local length = if spec.kind == "wall" then 14 else 20
	local height = if spec.kind == "wall" then 7 else 1.1
	local y = if spec.kind == "wall" then 4.4 else 1.5
	-- one-sided arm for the wall (pivot sits beside the bridge), centered bar for low arms
	local armOffset = if spec.kind == "wall" then CFrame.new(-length / 2, 0, 0) else CFrame.new()
	local arm = Build.part({
		name = "Arm",
		size = Vector3.new(length, height, 1.2),
		cf = pivotCF * CFrame.new(0, y, 0) * armOffset,
		color = P.Volt,
		material = Enum.Material.Neon,
		anchored = false,
		parent = model,
	})
	arm.CustomPhysicalProperties = PhysicalProperties.new(60, 0.2, 0.3, 1, 1)
	arm.CastShadow = false
	local stripe = Build.part({
		name = "ArmCore",
		size = Vector3.new(length - 0.2, height * 0.5, 1.25),
		cf = arm.CFrame,
		color = P.Ink,
		anchored = false,
		collide = false,
		parent = model,
	})
	stripe.Massless = true
	local w = Instance.new("WeldConstraint")
	w.Part0 = arm
	w.Part1 = stripe
	w.Parent = arm

	local nc = Instance.new("NoCollisionConstraint")
	nc.Part0 = arm
	nc.Part1 = post
	nc.Parent = arm

	-- attachment primary axis (X) rotated to world-up so the arm spins flat
	local a0 = Instance.new("Attachment")
	a0.Parent = post
	local axisWorld = CFrame.new(pivotCF.Position + Vector3.new(0, y, 0)) * CFrame.Angles(0, 0, math.rad(90))
	a0.WorldCFrame = axisWorld
	local a1 = Instance.new("Attachment")
	a1.Parent = arm
	a1.WorldCFrame = axisWorld
	local hinge = Instance.new("HingeConstraint")
	hinge.Attachment0 = a0
	hinge.Attachment1 = a1
	hinge.ActuatorType = Enum.ActuatorType.Motor
	hinge.MotorMaxTorque = 1e9
	hinge.MotorMaxAcceleration = 1e5
	hinge.AngularVelocity = spec.speed
	hinge.Parent = arm
	return { arm = arm, post = post, spec = spec, pivot = pivotCF.Position }
end

function Sweeper.build(station, Build)
	local cf = station.cf
	local model = Instance.new("Model")
	model.Name = "SweeperProps"
	model.Parent = station.model

	local len = RUN_START - RUN_END
	local bridgeCF = cf * CFrame.new(0, -0.44, (RUN_START + RUN_END) / 2) -- top sits 0.06 above the island (no z-fighting)
	Build.part({ name = "Bridge", size = Vector3.new(WIDTH, 1, len), cf = bridgeCF, color = P.Floor, reflectance = 0.06, parent = model })
	for _, side in { -1, 1 } do
		Build.neon(Vector3.new(0.3, 0.3, len), bridgeCF * CFrame.new(side * (WIDTH / 2 + 0.05), 0.5, 0), P.Volt, model)
	end
	-- distance markers
	for z = RUN_START - 10, RUN_END + 4, -10 do
		local m = Build.neon(Vector3.new(WIDTH - 1, 0.05, 0.25), cf * CFrame.new(0, 0.1, z), P.Volt, model)
		m.Transparency = 0.6
	end

	-- Finish platform
	local goalCF = cf * CFrame.new(0, 0, GOAL_Z)
	Build.disc(goalCF.Position, 6, 1, P.Floor, model)
	Build.ring(goalCF.Position, 6, 0.5, P.Lime, model)
	local goalGlow = Build.neon(Vector3.new(0.2, 9, 9), CFrame.new(goalCF.Position + Vector3.new(0, 0.05, 0)) * CFrame.Angles(0, 0, math.rad(90)), P.Lime, model, Enum.PartType.Cylinder)
	goalGlow.Transparency = 0.5
	local finishBoard = Build.part({
		name = "FinishSign",
		size = Vector3.new(14, 4, 0.3),
		cf = goalCF * CFrame.new(0, 10, -4),
		transparency = 1,
		collide = false,
		parent = model,
	})
	Build.sign(finishBoard, Enum.NormalId.Back, "FINISH", nil, P.Lime, 24)

	-- Trampoline net under the bridge (keeps fallers in frame for the comedy bounce).
	local net = Build.part({
		name = "Net",
		size = Vector3.new(70, 1, 100),
		cf = cf * CFrame.new(0, -34, (RUN_START + GOAL_Z) / 2),
		color = Color3.fromRGB(20, 16, 34),
		transparency = 0.2,
		parent = model,
	})
	for x = -30, 30, 10 do
		local l = Build.neon(Vector3.new(0.25, 0.1, 100), net.CFrame * CFrame.new(x, 0.55, 0), P.Violet, model)
		l.Transparency = 0.5
	end
	for z = -45, 45, 10 do
		local l = Build.neon(Vector3.new(70, 0.1, 0.25), net.CFrame * CFrame.new(0, 0.55, z), P.Violet, model)
		l.Transparency = 0.5
	end

	local arms = {}
	for _, spec in Sweeper.Arms do
		table.insert(arms, makeArm(model, Build, cf, spec))
	end
	task.defer(function()
		for _, a in arms do
			pcall(function()
				a.arm:SetNetworkOwner(nil)
			end)
		end
	end)

	return {
		playerStart = cf * CFrame.new(0, 3.2, RUN_START - 2),
		cameraFocus = goalCF,
		arms = arms,
		goal = goalCF.Position,
		station = station,
	}
end

local function tangentialFling(armInfo, rootPos: Vector3): Vector3
	local r = rootPos - armInfo.pivot
	r = Vector3.new(r.X, 0, r.Z)
	if r.Magnitude < 0.1 then
		r = Vector3.xAxis
	end
	local dir = Vector3.new(0, armInfo.spec.speed, 0):Cross(r).Unit
	return dir * 70 + Vector3.new(0, 55, 0)
end

function Sweeper.run(session, ctx)
	local start = workspace:GetServerTimeNow()
	session:ui({
		big = "GO GO GO",
		sub = "Reach the finish. Jump the low arms, time the wall.",
		primary = false,
		secondary = false,
		timerEnd = start + TIME_LIMIT,
	})

	local hitArm = nil
	local conns = {}
	for _, a in ctx.arms do
		table.insert(conns, a.arm.Touched:Connect(function(part)
			if not hitArm and part:IsDescendantOf(session.character) then
				hitArm = a
			end
		end))
	end

	local result
	while not result do
		RunService.Heartbeat:Wait()
		if session.cancelled then
			break
		end
		local now = workspace:GetServerTimeNow()
		local lp = session:localPos()
		if hitArm then
			result = {
				outcome = "fail",
				style = "sweep",
				launch = { velocity = tangentialFling(hitArm, session.root.Position) },
			}
		elseif lp.Y < -7 then
			local station = session.station
			result = {
				outcome = "fail",
				style = "fall",
				launch = { velocity = Vector3.new(0, -30, 0) },
				followUp = function(s)
					-- wait to land in the net, then the net sends you home
					local deadline = os.clock() + 1.6
					while os.clock() < deadline and s.character.Parent do
						local y = station.cf:PointToObjectSpace(s.root.Position).Y
						if y < -31 then
							break
						end
						task.wait()
					end
					if s.character.Parent then
						WorldFX.sound("Boing", s.root.Position)
						Ragdoll.impulse(s.player, Vector3.new(0, 80, 0), Vector3.new(s.rng:NextNumber(-15, 15), 0, s.rng:NextNumber(-15, 15)))
					end
				end,
			}
		elseif (Vector3.new(lp.X, 0, lp.Z) - Vector3.new(0, 0, GOAL_Z)).Magnitude < 5.5 and lp.Y > 0 and lp.Y < 8 then
			local elapsed = now - start
			local secs = math.floor(elapsed * 100 + 0.5) / 100
			result = {
				outcome = "win",
				payout = math.clamp(math.floor(220 - elapsed * 12), 60, 180),
				score = secs,
				scoreText = string.format("%.2fs", secs),
				medal = Common.medal(secs, TIME_LIMIT, 8.5, 6.5, true),
				headline = if secs <= 6.5 then "UNTOUCHABLE" else nil,
			}
		elseif now - start > TIME_LIMIT then
			result = {
				outcome = "fail",
				style = "timeout",
				launch = { velocity = Vector3.new(0, 90, 0) + Common.towardHub(session.station, 30, 0) },
			}
		end
	end
	for _, c in conns do
		c:Disconnect()
	end
	if session.cancelled then
		return nil
	end
	return result
end

function Sweeper.reset(_ctx)
	-- arms keep spinning; nothing to reset
end

return Sweeper
