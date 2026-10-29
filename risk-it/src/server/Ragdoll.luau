-- Server-side ragdoll: swaps Motor6Ds for BallSocketConstraints (replicates to everyone),
-- then tells the owning client to enter the Physics state and apply the launch velocity
-- (the client owns its character's physics, so velocity must be applied there).
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Net = require(ReplicatedStorage:WaitForChild("RiskIt").Net)

local Ragdoll = {}

local FOLDER = "RiskItRagdoll"

-- Joint limits tuned for floppy-but-readable tumbling.
local LIMITS = {
	Neck = { upper = 35, twist = 30 },
	Waist = { upper = 25, twist = 20 },
	Root = { upper = 15, twist = 10 },
	default = { upper = 70, twist = 45 },
}

local active: { [Model]: { motors: { Motor6D }, collide: { [BasePart]: boolean } } } = {}

function Ragdoll.isRagdolled(character: Model?): boolean
	return character ~= nil and active[character] ~= nil
end

function Ragdoll.prepare(character: Model)
	local humanoid = character:FindFirstChildOfClass("Humanoid")
	if humanoid then
		humanoid.BreakJointsOnDeath = false
		humanoid.RequiresNeck = false
	end
end

function Ragdoll.enable(player: Player, velocity: Vector3?, spin: Vector3?, stopAfter: number?)
	local character = player.Character
	if not character or active[character] then
		return false
	end
	local humanoid = character:FindFirstChildOfClass("Humanoid")
	local root = character:FindFirstChild("HumanoidRootPart") :: BasePart?
	if not humanoid or humanoid.Health <= 0 or not root then
		return false
	end

	local folder = Instance.new("Folder")
	folder.Name = FOLDER
	local state = { motors = {}, collide = {} }

	for _, motor in character:GetDescendants() do
		if motor:IsA("Motor6D") and motor.Part0 and motor.Part1 and motor.Part0 ~= root then
			local limit = LIMITS[motor.Name] or LIMITS.default
			local a0 = Instance.new("Attachment")
			a0.Name = "RagA_" .. motor.Name
			a0.CFrame = motor.C0
			a0.Parent = motor.Part0
			local a1 = Instance.new("Attachment")
			a1.Name = "RagB_" .. motor.Name
			a1.CFrame = motor.C1
			a1.Parent = motor.Part1
			local socket = Instance.new("BallSocketConstraint")
			socket.Attachment0 = a0
			socket.Attachment1 = a1
			socket.LimitsEnabled = true
			socket.UpperAngle = limit.upper
			socket.TwistLimitsEnabled = true
			socket.TwistLowerAngle = -limit.twist
			socket.TwistUpperAngle = limit.twist
			socket.Restitution = 0.1
			socket.Parent = folder
			-- keep attachments grouped for cleanup
			a0:SetAttribute("RiskItRagdoll", true)
			a1:SetAttribute("RiskItRagdoll", true)
			motor.Enabled = false
			table.insert(state.motors, motor)
		end
	end

	for _, part in character:GetDescendants() do
		if part:IsA("BasePart") and part ~= root and not part:FindFirstAncestorOfClass("Accessory") then
			state.collide[part] = part.CanCollide
			part.CanCollide = true
		end
	end
	root.CanCollide = false

	folder.Parent = character
	active[character] = state
	character:SetAttribute("Ragdolled", true)
	Net.Ragdoll:FireClient(player, "on", velocity or Vector3.zero, spin or Vector3.zero, stopAfter)
	return true
end

-- Extra kick mid-ragdoll (e.g. the pit spitting you back out).
function Ragdoll.impulse(player: Player, velocity: Vector3, spin: Vector3?)
	if player.Character and active[player.Character] then
		Net.Ragdoll:FireClient(player, "impulse", velocity, spin or Vector3.zero)
	end
end

function Ragdoll.disable(player: Player, standAt: CFrame?)
	local character = player.Character
	if not character then
		return
	end
	local state = active[character]
	if not state then
		return
	end
	active[character] = nil

	local folder = character:FindFirstChild(FOLDER)
	if folder then
		folder:Destroy()
	end
	for _, d in character:GetDescendants() do
		if d:IsA("Attachment") and d:GetAttribute("RiskItRagdoll") then
			d:Destroy()
		end
	end
	for _, motor in state.motors do
		if motor.Parent then
			motor.Enabled = true
		end
	end
	for part, collide in state.collide do
		if part.Parent then
			part.CanCollide = collide
		end
	end
	character:SetAttribute("Ragdolled", nil)
	if standAt then
		character:PivotTo(standAt)
	end
	Net.Ragdoll:FireClient(player, "off", Vector3.zero, Vector3.zero)
end

-- Forget state for characters that were destroyed (death/respawn/leave).
function Ragdoll.forget(character: Model)
	active[character] = nil
end

return Ragdoll
