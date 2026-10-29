-- Persistent player profiles: load with retry + soft session lock, autosave, save on leave and shutdown.
-- If DataStores are unavailable (e.g. Studio without API access) the profile runs in-memory and is flagged offline.
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Shared = ReplicatedStorage:WaitForChild("RiskIt")
local Config = require(Shared.Config)
local Net = require(Shared.Net)

local PlayerData = {}

local STORE_NAME = "RiskIt_Profiles_v1"
local AUTOSAVE_INTERVAL = 120
local LOCK_STALE_SECONDS = 600
local MAX_RETRIES = 5

local store: DataStore? = nil
do
	local ok, result = pcall(function()
		return DataStoreService:GetDataStore(STORE_NAME)
	end)
	if ok then
		store = result
	else
		warn("[RiskIt] DataStore unavailable, profiles will not persist:", result)
	end
end

local profiles: { [Player]: any } = {}
local loadedSignal = Instance.new("BindableEvent")
PlayerData.ProfileLoaded = loadedSignal.Event -- (player, profile)

local function template()
	return {
		v = Config.DataVersion,
		guts = 0,
		wipeouts = 0,
		wins = 0,
		attempts = 0,
		airTime = 0,
		best = {}, -- [challengeId] = number
		medals = {}, -- [challengeId] = "bronze"|"silver"|"gold"
		per = {}, -- [challengeId] = {a=attempts, w=wins, f=fails}
		firstJoin = os.time(),
		lastJoin = os.time(),
		visits = 0,
		onboarded = false,
		spent = 0,
		owned = { trail_default = true, burst_none = true },
		equipped = { trail = "trail_default", burst = "burst_none" },
	}
end

local function reconcile(data)
	local base = template()
	if type(data) ~= "table" then
		return base
	end
	for k, v in base do
		if data[k] == nil then
			data[k] = v
		end
	end
	-- future migrations: if data.v < 2 then ... end
	data.v = Config.DataVersion
	return data
end

local function withRetries(fn)
	local lastErr
	for attempt = 1, MAX_RETRIES do
		local ok, a, b = pcall(fn)
		if ok then
			return true, a, b
		end
		lastErr = a
		task.wait(math.min(2 ^ attempt * 0.5, 8))
	end
	return false, lastErr
end

local function key(player: Player)
	return "u_" .. player.UserId
end

local function load(player: Player)
	local profile = { data = template(), offline = store == nil, dirty = false }
	if store then
		local tries = 0
		local ok, result = withRetries(function()
			tries += 1
			local loaded
			store:UpdateAsync(key(player), function(old)
				old = reconcile(old)
				local lock = old._lock
				local fresh = lock and lock.job ~= game.JobId and os.time() - (lock.t or 0) < LOCK_STALE_SECONDS
				if fresh and tries < MAX_RETRIES - 1 then
					-- another server is still saving this profile; wait and retry
					error("locked")
				end
				old._lock = { job = game.JobId, t = os.time() }
				loaded = old
				return old
			end)
			return loaded
		end)
		if ok and result then
			profile.data = result
		else
			warn("[RiskIt] Profile load failed for", player.Name, result, "- running offline this session")
			profile.offline = true
		end
	end
	local d = profile.data
	d.visits += 1
	d.lastJoin = os.time()
	return profile
end

local function save(player: Player, release: boolean)
	local profile = profiles[player]
	if not profile or profile.offline or not store then
		return
	end
	local snapshot = table.clone(profile.data)
	local ok, err = withRetries(function()
		store:UpdateAsync(key(player), function(old)
			if type(old) == "table" and old._lock and old._lock.job ~= game.JobId then
				-- someone else owns the lock now; never clobber their newer data
				return nil
			end
			snapshot._lock = if release then nil else { job = game.JobId, t = os.time() }
			return snapshot
		end)
	end)
	if not ok then
		warn("[RiskIt] Save failed for", player.Name, err)
	end
end

function PlayerData.get(player: Player)
	local p = profiles[player]
	return p and p.data
end

function PlayerData.isOffline(player: Player): boolean
	local p = profiles[player]
	return p == nil or p.offline
end

function PlayerData.waitFor(player: Player, timeout: number?)
	local deadline = os.clock() + (timeout or 30)
	while not profiles[player] and player.Parent and os.clock() < deadline do
		task.wait(0.1)
	end
	return PlayerData.get(player)
end

-- Public, client-safe view of the profile.
function PlayerData.view(player: Player)
	local d = PlayerData.get(player)
	if not d then
		return nil
	end
	return {
		guts = d.guts,
		wipeouts = d.wipeouts,
		wins = d.wins,
		attempts = d.attempts,
		best = d.best,
		medals = d.medals,
		per = d.per,
		title = Config.titleFor(d.wipeouts),
		onboarded = d.onboarded,
		owned = d.owned,
		equipped = d.equipped,
		offline = PlayerData.isOffline(player),
		hotSeat = Config.hotSeatId(),
	}
end

function PlayerData.sync(player: Player)
	local v = PlayerData.view(player)
	if v then
		Net.DataSync:FireClient(player, v)
	end
	local ls = player:FindFirstChild("leaderstats")
	local d = PlayerData.get(player)
	if ls and d then
		ls.GUTS.Value = d.guts
		ls.Wipeouts.Value = d.wipeouts
	end
end

local function setupLeaderstats(player: Player)
	local ls = Instance.new("Folder")
	ls.Name = "leaderstats"
	local guts = Instance.new("IntValue")
	guts.Name = "GUTS"
	guts.Parent = ls
	local wipes = Instance.new("IntValue")
	wipes.Name = "Wipeouts"
	wipes.Parent = ls
	ls.Parent = player
end

local function onPlayerAdded(player: Player)
	setupLeaderstats(player)
	local profile = load(player)
	if not player.Parent then
		-- left during load: release the lock we just took
		profiles[player] = profile
		save(player, true)
		profiles[player] = nil
		return
	end
	profiles[player] = profile
	PlayerData.sync(player)
	loadedSignal:Fire(player, profile.data)
end

function PlayerData.start()
	Players.PlayerAdded:Connect(onPlayerAdded)
	for _, p in Players:GetPlayers() do
		task.spawn(onPlayerAdded, p)
	end
	Players.PlayerRemoving:Connect(function(player)
		save(player, true)
		profiles[player] = nil
	end)
	task.spawn(function()
		while true do
			task.wait(AUTOSAVE_INTERVAL)
			for player in profiles do
				task.spawn(save, player, false)
			end
		end
	end)
	game:BindToClose(function()
		if RunService:IsStudio() and not store then
			return
		end
		local pending = 0
		for player in profiles do
			pending += 1
			task.spawn(function()
				save(player, true)
				pending -= 1
			end)
		end
		local deadline = os.clock() + 25
		while pending > 0 and os.clock() < deadline do
			task.wait(0.1)
		end
	end)
end

return PlayerData
