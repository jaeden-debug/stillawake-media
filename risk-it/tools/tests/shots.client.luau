-- QA/marketing helper for capture sessions (Studio only, never shipped).
-- ui(false) hides RISK IT! ScreenGuis; cam(pos, look) locks a cinematic camera; free() releases it.
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local RS = game:GetService("ReplicatedStorage")

local lp = Players.LocalPlayer
local remotes = RS.RiskIt.Remotes
local Shots = {}

local GUIS = { "RiskItHud", "RiskItChallenge", "RiskItShop" }

function Shots.ui(on: boolean)
	for _, n in GUIS do
		local g = lp.PlayerGui:FindFirstChild(n)
		if g then
			g.Enabled = on
		end
	end
end

function Shots.cam(pos: Vector3, look: Vector3, fov: number?)
	RunService:UnbindFromRenderStep("RiskItShot")
	local cam = workspace.CurrentCamera
	RunService:BindToRenderStep("RiskItShot", Enum.RenderPriority.Last.Value, function()
		cam.CFrame = CFrame.lookAt(pos, look)
		if fov then
			cam.FieldOfView = fov
		end
	end)
end

-- camera that follows a part from a fixed world offset
function Shots.follow(part: BasePart, offset: Vector3, fov: number?)
	RunService:UnbindFromRenderStep("RiskItShot")
	local cam = workspace.CurrentCamera
	RunService:BindToRenderStep("RiskItShot", Enum.RenderPriority.Last.Value, function()
		if part.Parent then
			cam.CFrame = CFrame.lookAt(part.Position + offset, part.Position)
			if fov then
				cam.FieldOfView = fov
			end
		end
	end)
end

function Shots.free()
	RunService:UnbindFromRenderStep("RiskItShot")
	workspace.CurrentCamera.FieldOfView = 70
end

function Shots.station(id: string)
	local pad = workspace.RiskItWorld["Station_" .. id].StartPad
	local out = Vector3.new(pad.Position.X, 0, pad.Position.Z).Unit
	return CFrame.lookAt(out * 96, out * 97), pad
end

function Shots.start(id: string)
	while lp.Character:GetAttribute("Ragdolled") do
		task.wait()
	end
	task.wait(0.5)
	local _, pad = Shots.station(id)
	lp.Character:PivotTo(CFrame.new(pad.Position + Vector3.new(0, 4, 0)))
	task.wait(0.4)
	remotes.ChallengeInput:FireServer("retry", { station = id })
end

function Shots.press(action: string?)
	remotes.ChallengeInput:FireServer(action or "primary", { t = workspace:GetServerTimeNow() })
end

-- wait for a ChallengeEvent matching pred
function Shots.waitEvent(pred, timeout: number?)
	local hit, data = false, nil
	local c = remotes.ChallengeEvent.OnClientEvent:Connect(function(k, d)
		if not hit and pred(k, d) then
			hit, data = true, d
		end
	end)
	local t0 = os.clock()
	while not hit and os.clock() - t0 < (timeout or 10) do
		task.wait()
	end
	c:Disconnect()
	return data
end

function Shots.equip(trail: string, burst: string)
	remotes.ShopRequest:FireServer("studio_grant", "")
	task.wait(0.3)
	for _, id in { trail, burst } do
		remotes.ShopRequest:FireServer("buy", id)
		task.wait(0.3)
		remotes.ShopRequest:FireServer("equip", id)
		task.wait(0.3)
	end
end

return Shots
