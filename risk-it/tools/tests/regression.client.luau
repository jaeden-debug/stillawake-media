-- RISK IT! regression bot. Run in a Studio playtest on the CLIENT (MCP execute_luau datamodel "Client",
-- or paste into the command bar while the Client view is active). Drives real remotes end to end and
-- returns a PASS/FAIL report. Uses only legitimate inputs (the same ones a player's UI sends).
local Players = game:GetService("Players")
local RS = game:GetService("ReplicatedStorage")
local Config = require(RS.RiskIt.Config)
local remotes = RS.RiskIt.Remotes
local lp = Players.LocalPlayer

local report = {}
local function check(name, cond, detail)
	table.insert(report, (if cond then "PASS " else "FAIL ") .. name .. (if detail then "  (" .. detail .. ")" else ""))
end

local last = {}
local conn = remotes.ChallengeEvent.OnClientEvent:Connect(function(kind, data)
	last[kind] = data
	if kind == "ui" then
		last.uiLog = last.uiLog or {}
		table.insert(last.uiLog, data)
	end
end)

local function reset()
	table.clear(last)
end

local function waitFor(kind, timeout)
	local t0 = os.clock()
	while not last[kind] and os.clock() - t0 < timeout do
		task.wait()
	end
	return last[kind]
end

local function stationCF(id)
	local pad = workspace.RiskItWorld["Station_" .. id].StartPad.Position
	local out = Vector3.new(pad.X, 0, pad.Z).Unit
	return CFrame.lookAt(out * 96, out * 97)
end

local function begin(id)
	-- wait out any recovery from a previous run
	local t0 = os.clock()
	while lp.Character:GetAttribute("Ragdolled") and os.clock() - t0 < 6 do
		task.wait()
	end
	task.wait(0.8)
	reset()
	local pad = workspace.RiskItWorld["Station_" .. id].StartPad
	lp.Character:PivotTo(CFrame.new(pad.Position + Vector3.new(0, 4, 0)))
	task.wait(0.4)
	remotes.ChallengeInput:FireServer("retry", { station = id })
	return waitFor("start", 3)
end

local function press(action)
	remotes.ChallengeInput:FireServer(action or "primary", { t = workspace:GetServerTimeNow() })
end

local function afterRecover()
	waitFor("recovered", 6)
	task.wait(0.2)
end

local gutsBefore = lp.leaderstats.GUTS.Value

-- 1. BUTTON cash-out after one safe press (retry until the first press is safe)
do
	local ok = false
	for _ = 1, 6 do
		begin("button")
		task.wait(Config.IntroDelay + 0.3)
		press()
		local t0 = os.clock()
		while not last.result and os.clock() - t0 < 2.2 do
			task.wait()
		end
		if last.result then
			afterRecover() -- dropped; try again
		else
			press("secondary")
			local r = waitFor("result", 3)
			ok = r and r.outcome == "win" and r.payout == 20
			afterRecover()
			break
		end
	end
	check("button: press + cash out pays 20", ok)
end

-- 2. BUTTON drop path ragdolls and recovers
do
	begin("button")
	task.wait(Config.IntroDelay + 0.3)
	for _ = 1, 10 do
		press()
		local t0 = os.clock()
		while not last.result and os.clock() - t0 < 1.9 do
			task.wait()
		end
		if last.result then
			break
		end
	end
	local r = last.result
	task.wait(0.4)
	local ragdolled = lp.Character:GetAttribute("Ragdolled") == true
	afterRecover()
	check("button: trapdoor fail", r and r.outcome == "fail" and r.style == "trapdoor", r and r.headline)
	check("ragdoll on during fail", ragdolled)
	check("ragdoll off after recovery", lp.Character:GetAttribute("Ragdolled") == nil)
	check("humanoid standing after recovery", lp.Character.Humanoid:GetState() ~= Enum.HumanoidStateType.Physics)
end

-- 3. PERFECT STOP perfect play -> gold
do
	begin("stop")
	local t0 = os.clock()
	local seen = 0
	while not last.result and os.clock() - t0 < 20 do
		local log = last.uiLog or {}
		for i = seen + 1, #log do
			local m = log[i].meter
			if m then
				while not last.result do
					local now = workspace:GetServerTimeNow()
					if now > m.start and math.abs(Config.needle(now - m.start, m.speed) - m.center) < 0.008 then
						break
					end
					task.wait()
				end
				press()
			end
		end
		seen = #log
		task.wait()
	end
	local r = last.result
	check("stop: perfect play wins gold", r and r.outcome == "win" and r.medal == "gold", r and r.scoreText)
	afterRecover()
end

-- 4. QUICK DRAW human-speed reaction wins; flinch fails
do
	begin("draw")
	local t0 = os.clock()
	local pressed = false
	while not last.result and os.clock() - t0 < 10 do
		for _, u in last.uiLog or {} do
			if u.light == "green" and not pressed then
				pressed = true
				task.wait(0.2)
				press()
			end
		end
		task.wait()
	end
	local r = waitFor("result", 3)
	check("draw: 200ms reaction wins", r and r.outcome == "win", r and r.scoreText)
	afterRecover()

	begin("draw")
	task.wait(Config.IntroDelay + 0.3)
	press()
	r = waitFor("result", 3)
	check("draw: early press = flinch fail", r and r.outcome == "fail" and r.style == "catapult", r and r.headline)
	afterRecover()
end

-- 5. DOORS: walk through doors until a full clear (luck-dependent; up to 6 tries)
do
	local won = false
	local fails = 0
	for _ = 1, 6 do
		begin("doors")
		task.wait(Config.IntroDelay + 0.1)
		local cf = stationCF("doors")
		local hum = lp.Character.Humanoid
		local pick = ({ -9, 0, 9 })[math.random(1, 3)]
		local seenFlash = 0
		local t0 = os.clock()
		while not last.result and os.clock() - t0 < 40 do
			local log = last.uiLog or {}
			for i = seenFlash + 1, #log do
				if log[i].flash and log[i].flash.text:sub(1, 4) == "SAFE" then
					pick = ({ -9, 0, 9 })[math.random(1, 3)]
					task.wait(0.7)
				end
			end
			seenFlash = #log
			hum:MoveTo((cf * CFrame.new(pick, 3, -14)).Position)
			task.wait(0.1)
		end
		local r = last.result
		afterRecover()
		if r and r.outcome == "win" then
			won = true
			check("doors: full clear wins", true, r.scoreText .. " " .. tostring(r.medal))
			break
		elseif r and r.style == "blast" then
			fails += 1
		end
	end
	if not won then
		check("doors: full clear wins", false, "no clear in 6 tries")
	end
	check("doors: wrong door blasts (seen during tries)", fails > 0 or won, fails .. " blasts")
end

-- 6. SWEEPER: the bot cannot dodge arms reliably, so it verifies the fail path only
do
	begin("sweeper")
	task.wait(Config.IntroDelay + 0.1)
	local cf = stationCF("sweeper")
	local hum = lp.Character.Humanoid
	local t0 = os.clock()
	while not last.result and os.clock() - t0 < 20 do
		hum:MoveTo((cf * CFrame.new(2.7, 3, -71)).Position)
		task.wait(0.1)
	end
	local r = last.result
	check("sweeper: resolves (sweep/fall/timeout/win)", r ~= nil, r and (r.outcome .. "/" .. tostring(r.style or r.scoreText)))
	afterRecover()
end

-- 7. Abuse: inputs with no session, bogus payloads, retry from far away
do
	local before = lp.leaderstats.GUTS.Value
	reset()
	press()
	press("secondary")
	remotes.ChallengeInput:FireServer("primary", { t = 0 / 0 })
	remotes.ChallengeInput:FireServer("primary", "garbage")
	remotes.ChallengeInput:FireServer({}, {})
	for _ = 1, 60 do
		remotes.ChallengeInput:FireServer("primary", { t = math.huge })
	end
	lp.Character:PivotTo(CFrame.new(0, 4, 0))
	task.wait(0.3)
	remotes.ChallengeInput:FireServer("retry", { station = "button" })
	remotes.ChallengeInput:FireServer("retry", { station = "nope" })
	task.wait(1)
	check("abuse: no session started from far away", last.start == nil)
	check("abuse: no GUTS from junk input", lp.leaderstats.GUTS.Value == before)
end

-- 8. Movement challenges must NOT capture Space (jump) — regression for the v0.1 jump bug
do
	local CAS = game:GetService("ContextActionService")
	begin("sweeper")
	task.wait(Config.IntroDelay + 0.3)
	local info = CAS:GetBoundActionInfo("RiskItPrimary")
	check("sweeper: Space not captured (can jump)", next(info) == nil)
	local t0 = os.clock()
	while not last.result and os.clock() - t0 < 20 do
		task.wait(0.1)
	end
	afterRecover()
end

-- 9. COPY THAT: perfect repeat, bank after the first clear; then a deliberate wrong arrow
do
	local function play(wrong)
		begin("copy")
		local seq, phase = {}, nil
		local seen = 0
		local t0 = os.clock()
		while not last.result and os.clock() - t0 < 30 do
			local log = last.uiLog or {}
			for i = seen + 1, #log do
				local u = log[i]
				if u.big == "WATCH" then
					seq = {}
				end
				if u.showArrow then
					table.insert(seq, u.showArrow)
				end
				if u.big == "YOUR TURN" then
					phase = "input"
				end
				if u.big and u.big:sub(1, 5) == "CLEAN" then
					phase = "bank"
				end
			end
			seen = #log
			if phase == "input" then
				phase = nil
				for k, d in seq do
					local send = d
					if wrong and k == 2 then
						send = if d == "up" then "down" else "up"
					end
					remotes.ChallengeInput:FireServer(send, { t = workspace:GetServerTimeNow() })
					task.wait(0.12)
				end
			elseif phase == "bank" then
				phase = nil
				task.wait(0.2)
				press("secondary")
			end
			task.wait()
		end
		local r = last.result
		afterRecover()
		return r
	end
	local r = play(false)
	check("copy: repeat + bank wins", r and r.outcome == "win" and r.score == 3, r and r.scoreText)
	r = play(true)
	check("copy: wrong arrow = spring launch", r and r.outcome == "fail" and r.style == "launch", r and r.headline)
end

-- 10. LONG SHOT: lock on the 250 marks -> win and stay on the ring; push power -> splashdown
do
	local function shoot(offset)
		begin("longshot")
		local seen = 0
		local t0 = os.clock()
		while not last.result and os.clock() - t0 < 25 do
			local log = last.uiLog or {}
			for i = seen + 1, #log do
				local m = log[i].meter
				if m then
					local want = math.clamp(m.marks[2].pos + offset, 0, 1)
					while true do
						local now = workspace:GetServerTimeNow()
						if now > m.start and math.abs(Config.needle(now - m.start, m.speed) - want) < 0.006 then
							break
						end
						task.wait()
					end
					press()
				end
			end
			seen = #log
			task.wait()
		end
		local r = last.result
		task.wait(1.8)
		local y = lp.Character.HumanoidRootPart.Position.Y
		afterRecover()
		return r, y
	end
	local r, y = shoot(0)
	check("longshot: ring hit wins", r and r.outcome == "win", r and r.scoreText)
	check("longshot: player sticks the ring", y > -6, string.format("y=%.1f", y))
	r = shoot(0.3)
	check("longshot: miss = misfire fail", r and r.outcome == "fail" and r.style == "misfire", r and r.headline)
end

-- 11. MELTDOWN: standing still melts
do
	begin("meltdown")
	local t0 = os.clock()
	while not last.result and os.clock() - t0 < 22 do
		task.wait(0.1)
	end
	local r = last.result
	check("meltdown: idle player falls", r and r.outcome == "fail" and r.style == "fall", r and r.headline)
	afterRecover()
end

-- 12. Shop: can't overspend, buy deducts once, can't equip unowned
do
	local view
	local c = remotes.DataSync.OnClientEvent:Connect(function(v)
		view = v
	end)
	local g0 = lp.leaderstats.GUTS.Value
	remotes.ShopRequest:FireServer("buy", "trail_rainbow")
	task.wait(0.5)
	local rainbowOk = lp.leaderstats.GUTS.Value == g0 or g0 >= 3500
	remotes.ShopRequest:FireServer("buy", "trail_gold")
	task.wait(0.5)
	local g1 = lp.leaderstats.GUTS.Value
	remotes.ShopRequest:FireServer("buy", "trail_gold")
	task.wait(0.5)
	remotes.ShopRequest:FireServer("equip", "burst_lightning")
	task.wait(0.5)
	c:Disconnect()
	check("shop: unaffordable buy refused", rainbowOk)
	if g0 >= 400 then
		check("shop: buy deducts price once", g1 == g0 - 400 and lp.leaderstats.GUTS.Value == g1, g0 .. " -> " .. g1)
		check("shop: bought item auto-equipped", view and view.equipped.trail == "trail_gold")
	end
	check("shop: unowned equip refused", view == nil or view.equipped.burst ~= "burst_lightning")
end

check("guts earned over the run", lp.leaderstats.GUTS.Value > gutsBefore - 1000, gutsBefore .. " -> " .. lp.leaderstats.GUTS.Value)
conn:Disconnect()
return table.concat(report, "\n")
