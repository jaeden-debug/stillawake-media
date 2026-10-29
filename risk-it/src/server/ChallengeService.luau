-- Challenge lifecycle: start validation, session plumbing, single-shot resolution, rewards, fail/recover.
-- Challenge modules (server/Challenges/*) implement:
--   build(station, Build) -> ctx            (ctx.playerStart: CFrame required)
--   run(session, ctx) -> result | nil       (nil when cancelled)
--   reset(ctx)                              (restore props after a run)
-- result = { outcome = "win", payout, score?, scoreText?, medal? }
--        | { outcome = "fail", style, launch = {velocity, spin?}, followUp = fn(session)?, headline? }
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local Shared = ReplicatedStorage:WaitForChild("RiskIt")
local Config = require(Shared.Config)
local Net = require(Shared.Net)
local PlayerData = require(script.Parent.PlayerData)
local Ragdoll = require(script.Parent.Ragdoll)
local WorldFX = require(script.Parent.WorldFX)
local Analytics = require(script.Parent.Analytics)
local Build = require(script.Parent.Build)

local ChallengeService = {}

local START_RANGE = 18 -- studs from the pad a start/retry is accepted
local START_COOLDOWN = 0.5
local INPUT_RATE = 15 -- inputs per second allowed (token bucket)
local VALID_ACTIONS = { primary = true, secondary = true, up = true, down = true, left = true, right = true }

local stations = {}
local modules = {}
local contexts = {}
local busy: { [string]: any } = {}
local sessionsByPlayer: { [Player]: any } = {}
local recovering: { [Player]: boolean } = {}
local lastStart: { [Player]: number } = {}
local lastResult: { [Player]: { id: string, t: number } } = {}
local buckets: { [Player]: { tokens: number, t: number } } = {}

-- Session --------------------------------------------------------------------------------------

local Session = {}
Session.__index = Session

function Session.new(player: Player, station, ctx)
	local character = player.Character :: Model
	return setmetatable({
		id = HttpService:GenerateGUID(false),
		player = player,
		def = station.def,
		station = station,
		ctx = ctx,
		character = character,
		humanoid = character:FindFirstChildOfClass("Humanoid"),
		root = character:FindFirstChild("HumanoidRootPart"),
		rng = Random.new(),
		cancelled = false,
		cancelReason = nil,
		resolved = false,
		startedAt = os.clock(),
		_waiter = nil,
		_conns = {},
	}, Session)
end

function Session:send(kind: string, data)
	if self.player.Parent then
		data = data or {}
		data.token = self.id
		Net.ChallengeEvent:FireClient(self.player, kind, data)
	end
end

function Session:ui(state)
	self:send("ui", state)
end

-- Yields until an allowed action arrives, the timeout passes (returns nil), or the session is cancelled (nil).
function Session:waitInput(allowed: { [string]: boolean }, timeout: number?)
	if self.cancelled then
		return nil
	end
	local thread = coroutine.running()
	local waiter = { thread = thread, allowed = allowed }
	self._waiter = waiter
	local timer
	if timeout then
		timer = task.delay(timeout, function()
			if self._waiter == waiter then
				self._waiter = nil
				task.spawn(thread, nil, nil)
			end
		end)
	end
	local action, payload = coroutine.yield()
	if timer then
		pcall(task.cancel, timer)
	end
	if self.cancelled then
		return nil
	end
	return action, payload
end

function Session:_push(action: string, payload)
	local waiter = self._waiter
	if waiter and waiter.allowed[action] then
		self._waiter = nil
		task.spawn(waiter.thread, action, payload)
	end
end

-- Returns false if the session was cancelled while sleeping.
function Session:sleep(seconds: number): boolean
	task.wait(seconds)
	return not self.cancelled
end

function Session:alive(): boolean
	return not self.cancelled
		and self.player.Parent ~= nil
		and self.character.Parent ~= nil
		and self.humanoid ~= nil
		and self.humanoid.Health > 0
end

-- Position of the player's root in station-local space.
function Session:localPos(): Vector3
	return self.station.cf:PointToObjectSpace(self.root.Position)
end

function Session:cancel(reason: string)
	if self.cancelled or self.resolved then
		return
	end
	self.cancelled = true
	self.cancelReason = reason
	local waiter = self._waiter
	if waiter then
		self._waiter = nil
		task.spawn(waiter.thread, nil, nil)
	end
end

-- Movement helpers ----------------------------------------------------------------------------

local function setMovement(humanoid: Humanoid?, frozen: boolean)
	if not humanoid or humanoid.Health <= 0 then
		return
	end
	if frozen then
		humanoid.WalkSpeed = 0
		humanoid.JumpHeight = 0
	else
		humanoid.WalkSpeed = Config.HubWalkSpeed
		humanoid.JumpHeight = 7.2
	end
end

-- Profile updates -----------------------------------------------------------------------------

local function per(data, id: string)
	local p = data.per[id]
	if not p then
		p = { a = 0, w = 0, f = 0 }
		data.per[id] = p
	end
	return p
end

local function triedCount(data): number
	local n = 0
	for _, p in data.per do
		if p.a > 0 then
			n += 1
		end
	end
	return n
end

local function updateOverhead(player: Player)
	local character = player.Character
	local data = PlayerData.get(player)
	if not character or not data then
		return
	end
	local head = character:FindFirstChild("Head")
	if not head then
		return
	end
	local gui = head:FindFirstChild("RiskItTag") :: BillboardGui?
	if not gui then
		gui = Instance.new("BillboardGui")
		gui.Name = "RiskItTag"
		gui.Size = UDim2.fromOffset(220, 46)
		gui.StudsOffset = Vector3.new(0, 2.4, 0)
		gui.MaxDistance = 90
		gui.LightInfluence = 0
		local name = Instance.new("TextLabel")
		name.Name = "PlayerName"
		name.BackgroundTransparency = 1
		name.Size = UDim2.fromScale(1, 0.55)
		name.FontFace = Build.HeavyFont
		name.TextScaled = true
		name.TextColor3 = Config.Palette.White
		name.Text = player.DisplayName
		local s = Instance.new("UIStroke")
		s.Thickness = 2
		s.Color = Config.Palette.Ink
		s.Parent = name
		name.Parent = gui
		local title = Instance.new("TextLabel")
		title.Name = "Title"
		title.BackgroundTransparency = 1
		title.Position = UDim2.fromScale(0, 0.55)
		title.Size = UDim2.fromScale(1, 0.45)
		title.FontFace = Build.BodyFont
		title.TextScaled = true
		title.TextColor3 = Config.Palette.Volt
		local s2 = Instance.new("UIStroke")
		s2.Thickness = 1.5
		s2.Color = Config.Palette.Ink
		s2.Parent = title
		title.Parent = gui
		gui.Parent = head
		local humanoid = character:FindFirstChildOfClass("Humanoid")
		if humanoid then
			humanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.None
		end
	end
	(gui :: any).Title.Text = Config.titleFor(data.wipeouts)
end

local function medalBetter(a: string?, b: string?): boolean
	return (Config.MedalOrder[a or "none"] or 0) > (Config.MedalOrder[b or "none"] or 0)
end

local function pickHeadline(list: { string }, rng: Random): string
	return list[rng:NextInteger(1, #list)]
end

-- Resolution ----------------------------------------------------------------------------------

local function freeStation(session)
	local station = session.station
	local mod = modules[station.def.id]
	if mod and mod.reset then
		local ok, err = pcall(mod.reset, contexts[station.def.id])
		if not ok then
			warn("[RiskIt] reset failed", station.def.id, err)
		end
	end
	if busy[station.def.id] == session then
		busy[station.def.id] = nil
	end
	station.pad:SetAttribute("Occupant", nil)
	if station.prompt then
		station.prompt.Enabled = true
	end
end

local function returnPlayer(session)
	if session.player.Parent and session.character.Parent and session.humanoid and session.humanoid.Health > 0 then
		session.character:PivotTo(session.station.returnCF)
	end
end

local function resolve(session, result)
	if session.resolved then
		return
	end
	session.resolved = true
	for _, c in session._conns do
		c:Disconnect()
	end
	local player = session.player
	local def = session.def

	if not result then
		if session.cancelReason == "timeout" then
			result = { outcome = "fail", style = "timeout", launch = { velocity = session.station.cf.LookVector * -60 + Vector3.new(0, 60, 0) } }
		else
			result = { outcome = "cancel" }
		end
	end

	if sessionsByPlayer[player] == session then
		sessionsByPlayer[player] = nil
	end

	local data = PlayerData.get(player)
	local payload = { outcome = result.outcome, id = def.id }

	if result.outcome == "win" and data then
		local hot = Config.hotSeatId() == def.id
		local payout = math.floor((result.payout or 0) * (if hot then Config.HotSeatMultiplier else 1))
		data.guts += payout
		data.wins += 1
		per(data, def.id).w += 1
		local newBest = false
		if result.score ~= nil then
			local prev = data.best[def.id]
			if prev == nil or (def.bestIsLower and result.score < prev) or (not def.bestIsLower and result.score > prev) then
				data.best[def.id] = result.score
				newBest = prev ~= nil -- first clear isn't a "new best" headline
			end
		end
		local medalUp = false
		if result.medal and medalBetter(result.medal, data.medals[def.id]) then
			data.medals[def.id] = result.medal
			medalUp = true
		end
		payload.payout = payout
		payload.hot = hot
		payload.score = result.score
		payload.scoreText = result.scoreText
		payload.medal = result.medal
		payload.medalUp = medalUp
		payload.newBest = newBest
		payload.headline = result.headline or pickHeadline(Config.WinHeadlines, session.rng)
		Analytics.event(player, "challenge_win", payout, def.id)
		Analytics.earn(player, payout, data.guts, def.id)
		if data.wins == 1 then
			Analytics.funnel(player, "first_win")
		end
	elseif result.outcome == "fail" and data then
		data.wipeouts += 1
		per(data, def.id).f += 1
		payload.style = result.style
		payload.headline = result.headline or pickHeadline(Config.FailHeadlines[result.style] or Config.FailHeadlines.catapult, session.rng)
		payload.wipeouts = data.wipeouts
		Analytics.event(player, "challenge_fail", 1, def.id, result.style)
	else
		Analytics.event(player, "challenge_cancel", 1, def.id, session.cancelReason)
	end

	if data and data.attempts == 1 and result.outcome ~= "cancel" then
		Analytics.funnel(player, "first_resolve")
	end
	if data and not data.onboarded and result.outcome ~= "cancel" then
		data.onboarded = true
	end

	lastResult[player] = { id = def.id, t = os.clock() }
	session:send("result", payload)
	if data then
		PlayerData.sync(player)
		updateOverhead(player)
	end

	-- Physical aftermath
	local alive = player.Parent ~= nil and session.character.Parent ~= nil and session.humanoid and session.humanoid.Health > 0
	if result.outcome == "fail" and alive then
		recovering[player] = true
		local launch = result.launch or {}
		setMovement(session.humanoid, false)
		Ragdoll.enable(player, launch.velocity, launch.spin or Vector3.new(session.rng:NextNumber(-12, 12), session.rng:NextNumber(-8, 8), session.rng:NextNumber(-12, 12)))
		WorldFX.failCosmetics(session.character, data and data.equipped, def.color, Config.RecoverDelay)
		WorldFX.sound("Whoosh", session.root.Position)
		task.delay(0.35, WorldFX.sound, "Laugh", session.root.Position)
		if result.followUp then
			task.spawn(pcall, result.followUp, session)
		end
		task.delay(1.2, freeStation, session)
		task.delay(result.recoverAfter or Config.RecoverDelay, function()
			if player.Parent and session.character.Parent and session.humanoid and session.humanoid.Health > 0 then
				Ragdoll.disable(player, session.station.returnCF)
			end
			recovering[player] = nil
			session:send("recovered", {})
		end)
	elseif result.outcome == "win" and alive and result.launch then
		-- a win that still sends you flying (LONG SHOT): ragdoll the flight, celebrate the landing
		recovering[player] = true
		setMovement(session.humanoid, false)
		Ragdoll.enable(player, result.launch.velocity, result.launch.spin or Vector3.zero, result.launch.stopAfter)
		WorldFX.failCosmetics(session.character, data and data.equipped, def.color, result.recoverAfter or 3)
		WorldFX.sound("Whoosh", session.root.Position)
		if result.followUp then
			task.spawn(pcall, result.followUp, session)
		end
		task.delay(1.2, freeStation, session)
		task.delay(result.recoverAfter or 3, function()
			if player.Parent and session.character.Parent and session.humanoid and session.humanoid.Health > 0 then
				Ragdoll.disable(player, session.station.returnCF)
			end
			recovering[player] = nil
			session:send("recovered", {})
		end)
	elseif result.outcome == "win" and alive then
		setMovement(session.humanoid, false)
		WorldFX.confetti(session.root.Position + Vector3.new(0, 2, 0), def.color)
		WorldFX.sound("Cheer", session.root.Position)
		WorldFX.sound("Cash", session.root.Position)
		recovering[player] = true
		task.delay(Config.WinReturnDelay, function()
			returnPlayer(session)
			recovering[player] = nil
			freeStation(session)
			session:send("recovered", {})
		end)
	else
		if alive then
			setMovement(session.humanoid, false)
			returnPlayer(session)
		end
		freeStation(session)
	end
end

-- Starting ------------------------------------------------------------------------------------

local function canStart(player: Player, station): (boolean, string?)
	if not station then
		return false, "no_station"
	end
	if sessionsByPlayer[player] or recovering[player] then
		return false, "busy_player"
	end
	if busy[station.def.id] then
		return false, "busy_station"
	end
	if not PlayerData.get(player) then
		return false, "loading"
	end
	if os.clock() - (lastStart[player] or 0) < START_COOLDOWN then
		return false, "cooldown"
	end
	local character = player.Character
	local humanoid = character and character:FindFirstChildOfClass("Humanoid")
	local root = character and character:FindFirstChild("HumanoidRootPart") :: BasePart?
	if not humanoid or humanoid.Health <= 0 or not root or Ragdoll.isRagdolled(character) then
		return false, "dead"
	end
	if (root.Position - station.padCF.Position).Magnitude > START_RANGE then
		return false, "too_far"
	end
	return true
end

function ChallengeService.start(player: Player, stationId: string)
	local station = stations[stationId]
	local ok, why = canStart(player, station)
	if not ok then
		if why == "busy_station" then
			Net.ChallengeEvent:FireClient(player, "hint", { text = "Someone's risking it. Watch and learn." })
		end
		return false
	end
	local def = station.def
	local ctx = contexts[def.id]
	local mod = modules[def.id]
	local data = PlayerData.get(player)

	local session = Session.new(player, station, ctx)
	busy[def.id] = session
	sessionsByPlayer[player] = session
	lastStart[player] = os.clock()
	station.pad:SetAttribute("Occupant", player.DisplayName)
	if station.prompt then
		station.prompt.Enabled = false
	end

	-- Stats + analytics
	data.attempts += 1
	per(data, def.id).a += 1
	local last = lastResult[player]
	local isRetry = last ~= nil and last.id == def.id and os.clock() - last.t < 45
	Analytics.event(player, isRetry and "challenge_retry" or "challenge_start", 1, def.id)
	if data.attempts == 1 then
		Analytics.funnel(player, "first_start")
	end
	if isRetry and per(data, def.id).a == 2 then
		Analytics.funnel(player, "first_retry")
	end
	if triedCount(data) == 3 and per(data, def.id).a == 1 then
		Analytics.funnel(player, "third_challenge")
	end

	-- Lifecycle guards
	table.insert(session._conns, session.humanoid.Died:Connect(function()
		session:cancel("died")
	end))
	table.insert(session._conns, session.character.AncestryChanged:Connect(function(_, parent)
		if not parent then
			session:cancel("removed")
		end
	end))

	session.character:PivotTo(ctx.playerStart)
	session.root.AssemblyLinearVelocity = Vector3.zero
	setMovement(session.humanoid, true)

	session:send("start", {
		id = def.id,
		name = def.name,
		tagline = def.tagline,
		intro = Config.IntroDelay,
		hot = Config.hotSeatId() == def.id,
		best = data.best[def.id],
		medal = data.medals[def.id],
		focus = ctx.cameraFocus and ctx.cameraFocus.Position or nil,
		lift = ctx.cameraLift,
		side = ctx.cameraSide,
	})

	task.spawn(function()
		task.wait(Config.IntroDelay)
		if session.cancelled then
			resolve(session, nil)
			return
		end
		if not def.freezePlayer then
			setMovement(session.humanoid, false)
			session.humanoid.WalkSpeed = 16
		end
		local okRun, result = pcall(mod.run, session, ctx)
		if not okRun then
			warn("[RiskIt] challenge error", def.id, result)
			result = nil
			session.cancelReason = session.cancelReason or "error"
		end
		if session.cancelled then
			result = nil
		end
		resolve(session, result)
	end)

	task.delay(def.maxDuration, function()
		if not session.resolved then
			session:cancel("timeout")
		end
	end)
	return true
end

-- Input ---------------------------------------------------------------------------------------

local function allow(player: Player): boolean
	local b = buckets[player]
	local now = os.clock()
	if not b then
		b = { tokens = INPUT_RATE, t = now }
		buckets[player] = b
	end
	b.tokens = math.min(INPUT_RATE, b.tokens + (now - b.t) * INPUT_RATE)
	b.t = now
	if b.tokens < 1 then
		return false
	end
	b.tokens -= 1
	return true
end

local function finiteNumber(v): number?
	if typeof(v) == "number" and v == v and v ~= math.huge and v ~= -math.huge then
		return v
	end
	return nil
end

local function onInput(player: Player, action: unknown, payload: unknown)
	if not allow(player) or typeof(action) ~= "string" then
		return
	end
	local body = if typeof(payload) == "table" then payload :: any else {}
	if action == "retry" then
		local id = body.station
		if typeof(id) == "string" and stations[id] then
			ChallengeService.start(player, id)
		end
		return
	end
	if not VALID_ACTIONS[action] then
		return
	end
	local session = sessionsByPlayer[player]
	if not session or session.resolved then
		return
	end
	session:_push(action, { t = finiteNumber(body.t), recv = workspace:GetServerTimeNow() })
end

-- Boot ----------------------------------------------------------------------------------------

local function onCharacter(player: Player, character: Model)
	Ragdoll.prepare(character)
	local humanoid = character:WaitForChild("Humanoid", 10) :: Humanoid?
	if humanoid then
		humanoid.WalkSpeed = Config.HubWalkSpeed
	end
	recovering[player] = nil
	character:WaitForChild("Head", 10)
	PlayerData.waitFor(player, 30)
	updateOverhead(player)
	character.AncestryChanged:Connect(function(_, parent)
		if not parent then
			Ragdoll.forget(character)
		end
	end)
end

function ChallengeService.init(builtStations)
	stations = builtStations
	local folder = script.Parent:WaitForChild("Challenges")
	for id, station in stations do
		local mod = require(folder:WaitForChild(station.def.module))
		modules[id] = mod
		contexts[id] = mod.build(station, Build)
		if station.prompt then
			station.prompt.Triggered:Connect(function(player)
				ChallengeService.start(player, id)
			end)
		end
	end

	Net.ChallengeInput.OnServerEvent:Connect(onInput)

	local function hookPlayer(player: Player)
		player.CharacterAdded:Connect(function(c)
			onCharacter(player, c)
		end)
		if player.Character then
			task.spawn(onCharacter, player, player.Character)
		end
		task.spawn(function()
			PlayerData.waitFor(player, 30)
			Analytics.funnel(player, "joined")
		end)
	end
	Players.PlayerAdded:Connect(hookPlayer)
	for _, p in Players:GetPlayers() do
		hookPlayer(p)
	end
	Players.PlayerRemoving:Connect(function(player)
		local s = sessionsByPlayer[player]
		if s then
			s:cancel("left")
		end
		recovering[player] = nil
		lastStart[player] = nil
		lastResult[player] = nil
		buckets[player] = nil
	end)

	-- Daily Hot Seat marker (+ catch players who wander off the edge outside a challenge).
	local hotId = nil
	local accum = 0
	RunService.Heartbeat:Connect(function(dt)
		accum += dt
		if accum < 0.5 then
			return
		end
		accum = 0
		local current = Config.hotSeatId()
		if current ~= hotId then
			hotId = current
			for id, station in stations do
				station.pad:SetAttribute("Hot", id == current)
			end
		end
		for _, player in Players:GetPlayers() do
			local c = player.Character
			local root = c and c:FindFirstChild("HumanoidRootPart") :: BasePart?
			if root and root.Position.Y < -80 and not sessionsByPlayer[player] and not recovering[player] and not Ragdoll.isRagdolled(c) then
				c:PivotTo(CFrame.new(0, 4, 8))
				root.AssemblyLinearVelocity = Vector3.zero
				WorldFX.sound("Whoosh", root.Position)
			end
		end
	end)
end

-- Exposed for tests.
ChallengeService._internal = {
	sessionsByPlayer = sessionsByPlayer,
	busy = busy,
	recovering = recovering,
	stations = function()
		return stations
	end,
	onInput = onInput,
}

return ChallengeService
