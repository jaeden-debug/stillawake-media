-- Camera + screen effects, client ragdoll physics, and music.
local Lighting = game:GetService("Lighting")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local SoundService = game:GetService("SoundService")
local TweenService = game:GetService("TweenService")

local Shared = ReplicatedStorage:WaitForChild("RiskIt")
local Net = require(Shared:WaitForChild("Net"))
local Sounds = require(Shared:WaitForChild("Sounds"))
local Bursts = require(Shared:WaitForChild("Bursts"))
local Theme = require(script.Parent.Theme)

local player = Players.LocalPlayer
local Effects = {}

local BASE_FOV = 70
local shakeUntil = 0
local shakeMag = 0
local grade: ColorCorrectionEffect
local blur: BlurEffect

local function camera(): Camera
	return workspace.CurrentCamera
end

function Effects.fov(target: number, time: number, style: Enum.EasingStyle?)
	TweenService:Create(camera(), TweenInfo.new(time, style or Enum.EasingStyle.Quint, Enum.EasingDirection.Out), { FieldOfView = target }):Play()
end

function Effects.shake(magnitude: number, duration: number)
	if Theme.reducedMotion() then
		return
	end
	shakeMag = math.max(shakeMag, magnitude)
	shakeUntil = math.max(shakeUntil, os.clock() + duration)
end

-- Quick full-screen grade punch (e.g. red on fail, gold on win).
function Effects.flash(tint: Color3, saturation: number, duration: number)
	grade.TintColor = tint
	grade.Saturation = saturation
	grade.Brightness = 0.08
	TweenService:Create(grade, TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
		TintColor = Color3.new(1, 1, 1),
		Saturation = 0,
		Brightness = 0,
	}):Play()
end

function Effects.blurPulse(size: number, duration: number)
	blur.Size = size
	TweenService:Create(blur, TweenInfo.new(duration, Enum.EasingStyle.Quad), { Size = 0 }):Play()
end

function Effects.play(name: string, opts: { volume: number?, pitch: number? }?)
	local def = Sounds[name]
	if not def then
		return
	end
	local s = Instance.new("Sound")
	s.SoundId = def.id
	s.Volume = (opts and opts.volume) or def.volume
	s.PlaybackSpeed = (opts and opts.pitch) or 1
	s.Parent = SoundService
	s:Play()
	s.Ended:Once(function()
		s:Destroy()
	end)
	task.delay(12, function()
		if s.Parent then
			s:Destroy()
		end
	end)
end

-- Ragdoll: the server already swapped joints for sockets; we own our physics so we drive the state + velocity.
local function applyVelocity(character: Model, velocity: Vector3, spin: Vector3)
	for _, part in character:GetDescendants() do
		if part:IsA("BasePart") then
			part.AssemblyLinearVelocity = velocity
		end
	end
	local torso = character:FindFirstChild("UpperTorso") or character:FindFirstChild("Torso")
	if torso then
		(torso :: BasePart).AssemblyAngularVelocity = spin
	end
end

-- Fail cam: a scripted chase camera while ragdolled. The default camera pops in front of props
-- (e.g. the catapult plate flipping up) and ends up inside your head; this one keeps a fixed,
-- readable distance, trails the tumble and ignores occluders. Released on recovery.
local CHASE_DISTANCE = 17
local chase: { offset: Vector3, conn: RBXScriptConnection }? = nil

local function stopChase()
	if chase then
		chase.conn:Disconnect()
		chase = nil
		workspace.CurrentCamera.CameraType = Enum.CameraType.Custom
	end
end

local function startChase(character: Model, velocity: Vector3)
	stopChase()
	local torso = (character:FindFirstChild("UpperTorso") or character:FindFirstChild("Torso") or character:FindFirstChild("HumanoidRootPart")) :: BasePart?
	if not torso then
		return
	end
	local cam = workspace.CurrentCamera
	-- side-on to the launch so the arc reads left-to-right, slightly above
	local flat = Vector3.new(velocity.X, 0, velocity.Z)
	local side
	if flat.Magnitude > 1 then
		side = flat.Unit:Cross(Vector3.yAxis)
		-- choose the side the camera is already on, so the cut feels continuous
		if (cam.CFrame.Position - torso.Position):Dot(side) < 0 then
			side = -side
		end
	else
		local back = cam.CFrame.Position - torso.Position
		side = Vector3.new(back.X, 0, back.Z).Unit
	end
	local offset = side * CHASE_DISTANCE - flat.Unit * (if flat.Magnitude > 1 then 6 else 0) + Vector3.new(0, 9, 0)
	cam.CameraType = Enum.CameraType.Scriptable
	local pos = cam.CFrame.Position
	chase = {
		offset = offset,
		conn = RunService.RenderStepped:Connect(function(dt)
			if not torso.Parent then
				stopChase()
				return
			end
			local target = torso.Position
			local desired = target + offset
			pos = pos:Lerp(desired, math.clamp(dt * 7, 0, 1))
			workspace.CurrentCamera.CFrame = CFrame.lookAt(pos, target)
		end),
	}
end

local function onRagdoll(mode: string, velocity: Vector3, spin: Vector3, stopAfter: number?)
	local character = player.Character
	local humanoid = character and character:FindFirstChildOfClass("Humanoid")
	if not character or not humanoid then
		return
	end
	if mode == "on" then
		humanoid:SetStateEnabled(Enum.HumanoidStateType.GettingUp, false)
		humanoid:ChangeState(Enum.HumanoidStateType.Physics)
		applyVelocity(character, velocity, spin)
		if typeof(stopAfter) == "number" and stopAfter > 0 and stopAfter < 5 then
			-- planned landing (LONG SHOT): drop straight down at touchdown instead of sliding off
			task.delay(stopAfter, function()
				for _, part in character:GetDescendants() do
					if part:IsA("BasePart") then
						local v = part.AssemblyLinearVelocity
						part.AssemblyLinearVelocity = Vector3.new(0, math.min(v.Y, 0), 0)
						part.AssemblyAngularVelocity = Vector3.zero
					end
				end
			end)
		end
		if not Theme.reducedMotion() then
			startChase(character, velocity)
		end
		Effects.fov(86, 0.18)
		task.delay(0.25, Effects.fov, BASE_FOV + 6, 1.4)
		Effects.shake(0.35, 0.35)
	elseif mode == "impulse" then
		applyVelocity(character, velocity, spin)
		Effects.fov(84, 0.15)
		task.delay(0.2, Effects.fov, BASE_FOV + 6, 1)
		Effects.shake(0.25, 0.25)
	elseif mode == "off" then
		stopChase()
		humanoid:SetStateEnabled(Enum.HumanoidStateType.GettingUp, true)
		applyVelocity(character, Vector3.zero, Vector3.zero)
		humanoid:ChangeState(Enum.HumanoidStateType.GettingUp)
		Effects.fov(BASE_FOV, 0.5)
	end
end

local music: Sound
function Effects.setMusicDuck(ducked: boolean)
	if music then
		TweenService:Create(music, TweenInfo.new(0.6), { Volume = Sounds.Music.volume * (if ducked then 0.35 else 1) }):Play()
	end
end

function Effects.init()
	grade = Instance.new("ColorCorrectionEffect")
	grade.Name = "RiskItFlash"
	grade.Parent = Lighting
	blur = Instance.new("BlurEffect")
	blur.Name = "RiskItBlur"
	blur.Size = 0
	blur.Parent = Lighting

	music = Instance.new("Sound")
	music.Name = "RiskItMusic"
	music.SoundId = Sounds.Music.id
	music.Volume = Sounds.Music.volume
	music.Looped = true
	music.Parent = SoundService
	music:Play()

	Net.Ragdoll.OnClientEvent:Connect(onRagdoll)
	Net.WorldFX.OnClientEvent:Connect(function(kind: string, a, b, c)
		if kind == "confetti" and typeof(a) == "Vector3" then
			Bursts.confetti(a, if typeof(b) == "Color3" then b else nil, if typeof(c) == "number" then c else nil)
		elseif kind == "burst" and typeof(a) == "string" and typeof(b) == "Instance" and b:IsA("BasePart") then
			Bursts.play(a, b)
		end
	end)
	player.CharacterAdded:Connect(stopChase)

	RunService.RenderStepped:Connect(function()
		local character = player.Character
		local humanoid = character and character:FindFirstChildOfClass("Humanoid")
		if not humanoid then
			return
		end
		local now = os.clock()
		if now < shakeUntil then
			local k = (shakeUntil - now) * shakeMag * 3
			humanoid.CameraOffset = Vector3.new(math.noise(now * 30, 1) * k, math.noise(now * 30, 2) * k, 0)
		elseif humanoid.CameraOffset ~= Vector3.zero then
			humanoid.CameraOffset = Vector3.zero
			shakeMag = 0
		end
	end)
end

Effects.BASE_FOV = BASE_FOV

return Effects
