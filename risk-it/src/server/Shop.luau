-- Cosmetic shop: spend GUTS on fail trails and launch bursts. Server-validated, fixed prices, no randomness.
local AnalyticsService = game:GetService("AnalyticsService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Shared = ReplicatedStorage:WaitForChild("RiskIt")
local Config = require(Shared.Config)
local Net = require(Shared.Net)
local PlayerData = require(script.Parent.PlayerData)

local Shop = {}

local COOLDOWN = 0.25
local lastRequest: { [Player]: number } = {}

local function reply(player: Player, text: string)
	Net.ChallengeEvent:FireClient(player, "hint", { text = text })
end

-- Returns ok, reason. Pure validation + mutation on the profile table (no I/O), so it is easy to test.
function Shop.buy(data, itemId: string): (boolean, string)
	local item = Config.ShopById[itemId]
	if not item then
		return false, "unknown"
	end
	if data.owned[itemId] then
		return false, "owned"
	end
	if data.guts < item.price then
		return false, "poor"
	end
	data.guts -= item.price
	data.spent = (data.spent or 0) + item.price
	data.owned[itemId] = true
	data.equipped[item.kind] = itemId
	return true, "ok"
end

function Shop.equip(data, itemId: string): (boolean, string)
	local item = Config.ShopById[itemId]
	if not item then
		return false, "unknown"
	end
	if not data.owned[itemId] then
		return false, "not_owned"
	end
	data.equipped[item.kind] = itemId
	return true, "ok"
end

local function onRequest(player: Player, action: unknown, itemId: unknown)
	local now = os.clock()
	if now - (lastRequest[player] or 0) < COOLDOWN then
		return
	end
	lastRequest[player] = now
	if typeof(action) ~= "string" or typeof(itemId) ~= "string" then
		return
	end
	local data = PlayerData.get(player)
	if not data then
		return
	end
	-- Studio-only test hook (cosmetic QA): never active on live servers.
	if action == "studio_grant" and RunService:IsStudio() then
		data.guts += 10000
		PlayerData.sync(player)
		return
	end
	local item = Config.ShopById[itemId]
	if action == "buy" then
		local ok, why = Shop.buy(data, itemId)
		if ok then
			reply(player, "UNLOCKED: " .. item.name:upper())
			pcall(function()
				AnalyticsService:LogEconomyEvent(
					player,
					Enum.AnalyticsEconomyFlowType.Sink,
					"GUTS",
					item.price,
					data.guts,
					Enum.AnalyticsEconomyTransactionType.Shop.Name,
					itemId
				)
			end)
		elseif why == "poor" then
			reply(player, "NOT ENOUGH GUTS. GO RISK SOMETHING.")
		end
	elseif action == "equip" then
		local ok = Shop.equip(data, itemId)
		if ok then
			reply(player, "EQUIPPED: " .. item.name:upper())
		end
	end
	PlayerData.sync(player)
end

function Shop.init()
	Net.ShopRequest.OnServerEvent:Connect(onRequest)
	Players.PlayerRemoving:Connect(function(player)
		lastRequest[player] = nil
	end)
end

return Shop
