-- RISK IT! server bootstrap.
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Shared = ReplicatedStorage:WaitForChild("RiskIt")
require(Shared.Net) -- create remotes before anything else

local root = script.Parent
local PlayerData = require(root.PlayerData)
local Arena = require(root.Arena)
local ChallengeService = require(root.ChallengeService)
local Shop = require(root.Shop)

Players.CharacterAutoLoads = true
Players.RespawnTime = 1.5

PlayerData.start()
local stations = Arena.build()
ChallengeService.init(stations)
Shop.init()

workspace:SetAttribute("RiskItReady", true)
print(string.format("[RiskIt] v%s ready: %d challenges", require(Shared.Config).Version, #require(Shared.Config).Challenges))
