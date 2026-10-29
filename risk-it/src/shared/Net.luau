-- Remote registry. The server creates the remotes; clients wait for them.
--   ChallengeInput  C->S  (action: string, payload: {t: number?, station: string?})
--   ChallengeEvent  S->C  (kind: string, data: table)   start / ui / result / fx / hint
--   Ragdoll         S->C  (mode: "on"|"impulse"|"off", velocity: Vector3?, spin: Vector3?)
--   DataSync        S->C  (profileView: table)
--   ShopRequest     C->S  (action: "buy"|"equip", itemId: string)
--   WorldFX         S->C  ("confetti", position, color?, scale?) | ("burst", burstId, torso)
local RunService = game:GetService("RunService")

local Net = {}

local NAMES = { "ChallengeInput", "ChallengeEvent", "Ragdoll", "DataSync", "ShopRequest", "WorldFX" }

local folder: Folder
if RunService:IsServer() then
	folder = script.Parent:FindFirstChild("Remotes") :: Folder
	if not folder then
		folder = Instance.new("Folder")
		folder.Name = "Remotes"
		folder.Parent = script.Parent
	end
	for _, name in NAMES do
		if not folder:FindFirstChild(name) then
			local r = Instance.new("RemoteEvent")
			r.Name = name
			r.Parent = folder
		end
	end
else
	folder = script.Parent:WaitForChild("Remotes") :: Folder
end

for _, name in NAMES do
	Net[name] = folder:WaitForChild(name) :: RemoteEvent
end

return Net
