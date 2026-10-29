-- RISK IT! client bootstrap.
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local StarterGui = game:GetService("StarterGui")

local Shared = ReplicatedStorage:WaitForChild("RiskIt")
local Net = require(Shared:WaitForChild("Net"))

local root = script.Parent
local State = require(root.State)
local Effects = require(root.Effects)
local Hud = require(root.Hud)
local ChallengeUI = require(root.ChallengeUI)
local World = require(root.World)
local ShopUI = require(root.ShopUI)

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui") :: PlayerGui

pcall(function()
	StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false)
	StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.Health, false)
end)

Net.DataSync.OnClientEvent:Connect(function(view)
	State.setProfile(view)
end)

Effects.init()
Hud.mount(playerGui)
ChallengeUI.mount(playerGui)
World.mount(playerGui)
ShopUI.mount(playerGui)
