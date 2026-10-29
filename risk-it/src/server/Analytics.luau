-- Thin, failure-proof wrapper over AnalyticsService. Event names and fields are versioned (schema v1);
-- see docs/ARCHITECTURE.md#analytics. No personal data beyond what Roblox attaches to the player.
local AnalyticsService = game:GetService("AnalyticsService")

local Analytics = {}

local FUNNEL_STEPS = {
	joined = { 1, "Joined" },
	first_start = { 2, "First Challenge Started" },
	first_resolve = { 3, "First Challenge Resolved" },
	first_retry = { 4, "First Retry" },
	first_win = { 5, "First Win" },
	third_challenge = { 6, "Tried 3 Different Challenges" },
}

local function fields(challengeId: string?, extra: string?)
	local f = {}
	if challengeId then
		f[Enum.AnalyticsCustomFieldKeys.CustomField01.Name] = challengeId
	end
	if extra then
		f[Enum.AnalyticsCustomFieldKeys.CustomField02.Name] = extra
	end
	return f
end

function Analytics.funnel(player: Player, step: string)
	local s = FUNNEL_STEPS[step]
	if not s then
		return
	end
	pcall(function()
		AnalyticsService:LogOnboardingFunnelStepEvent(player, s[1], s[2])
	end)
end

-- name: challenge_start | challenge_win | challenge_fail | challenge_cancel | challenge_retry
function Analytics.event(player: Player, name: string, value: number?, challengeId: string?, extra: string?)
	pcall(function()
		AnalyticsService:LogCustomEvent(player, "v1_" .. name, value or 1, fields(challengeId, extra))
	end)
end

function Analytics.earn(player: Player, amount: number, balance: number, challengeId: string)
	pcall(function()
		AnalyticsService:LogEconomyEvent(
			player,
			Enum.AnalyticsEconomyFlowType.Source,
			"GUTS",
			amount,
			balance,
			Enum.AnalyticsEconomyTransactionType.Gameplay.Name,
			"challenge_" .. challengeId
		)
	end)
end

return Analytics
