-- Shared tuning + content definitions. Server is authoritative; the client only reads this for presentation.
local Config = {}

Config.Version = "0.2.2"
Config.DataVersion = 1

Config.Palette = {
	Ink = Color3.fromRGB(10, 10, 16),
	Panel = Color3.fromRGB(18, 18, 28),
	Floor = Color3.fromRGB(40, 36, 58),
	White = Color3.fromRGB(245, 245, 250),
	Muted = Color3.fromRGB(150, 150, 170),
	Hot = Color3.fromRGB(255, 46, 99), -- brand pink-red
	Volt = Color3.fromRGB(255, 214, 10), -- brand yellow
	Cyan = Color3.fromRGB(0, 229, 255),
	Lime = Color3.fromRGB(80, 255, 120),
	Violet = Color3.fromRGB(150, 90, 255),
	Orange = Color3.fromRGB(255, 120, 30),
	Gold = Color3.fromRGB(255, 200, 60),
	Silver = Color3.fromRGB(200, 210, 225),
	Bronze = Color3.fromRGB(210, 130, 70),
	Sky = Color3.fromRGB(80, 150, 255),
	Rose = Color3.fromRGB(255, 110, 200),
}

-- Order here = order around the hub ring.
Config.Challenges = {
	{
		id = "button",
		name = "THE BUTTON",
		tagline = "Every press doubles the pot. One press drops you.",
		color = Config.Palette.Hot,
		module = "Button",
		bestLabel = "Biggest pot",
		bestIsLower = false,
		maxDuration = 120,
		freezePlayer = true,
	},
	{
		id = "stop",
		name = "PERFECT STOP",
		tagline = "Stop the needle in the zone. Three rounds. It gets faster.",
		color = Config.Palette.Cyan,
		module = "PerfectStop",
		bestLabel = "Perfects",
		bestIsLower = false,
		maxDuration = 40,
		freezePlayer = true,
	},
	{
		id = "draw",
		name = "QUICK DRAW",
		tagline = "Wait for green. Flinch and you fly.",
		color = Config.Palette.Lime,
		module = "QuickDraw",
		bestLabel = "Reaction",
		bestIsLower = true,
		bestFormat = "ms",
		maxDuration = 25,
		freezePlayer = true,
	},
	{
		id = "sweeper",
		name = "THE SWEEPER",
		tagline = "Cross the bridge. The arms do not care.",
		color = Config.Palette.Volt,
		module = "Sweeper",
		bestLabel = "Fastest",
		bestIsLower = true,
		bestFormat = "s",
		maxDuration = 30,
		freezePlayer = false,
	},
	{
		id = "doors",
		name = "DOOR NUMBER WHO",
		tagline = "Three doors. One is lying. Watch closely.",
		color = Config.Palette.Violet,
		module = "Doors",
		bestLabel = "Fastest",
		bestIsLower = true,
		bestFormat = "s",
		maxDuration = 45,
		freezePlayer = false,
	},
	{
		id = "meltdown",
		name = "MELTDOWN",
		tagline = "The floor is leaving. Be somewhere else. 15 seconds.",
		color = Config.Palette.Orange,
		module = "Meltdown",
		bestLabel = "Close calls",
		bestIsLower = false,
		maxDuration = 30,
		freezePlayer = false,
	},
	{
		id = "copy",
		name = "COPY THAT",
		tagline = "Watch the arrows. Repeat them. It gets longer.",
		color = Config.Palette.Sky,
		module = "CopyThat",
		bestLabel = "Longest",
		bestIsLower = false,
		maxDuration = 70,
		freezePlayer = true,
	},
	{
		id = "longshot",
		name = "LONG SHOT",
		tagline = "Aim. Power. Get fired out of a cannon. Hit the rings.",
		color = Config.Palette.Rose,
		module = "LongShot",
		bestLabel = "Best ring",
		bestIsLower = false,
		maxDuration = 35,
		freezePlayer = true,
	},
}

Config.ChallengeById = {}
for i, def in Config.Challenges do
	def.index = i
	Config.ChallengeById[def.id] = def
end

Config.MedalOrder = { none = 0, bronze = 1, silver = 2, gold = 3 }

-- Titles shown over heads. Earned from wipeouts (failure is progress here).
Config.Titles = {
	{ wipeouts = 0, text = "FRESH MEAT" },
	{ wipeouts = 5, text = "SLIGHTLY BRUISED" },
	{ wipeouts = 20, text = "CRASH TEST DUMMY" },
	{ wipeouts = 60, text = "PROFESSIONAL YEETEE" },
	{ wipeouts = 150, text = "GRAVITY'S FAVORITE" },
	{ wipeouts = 400, text = "UNKILLABLE" },
}

function Config.titleFor(wipeouts: number): string
	local title = Config.Titles[1].text
	for _, t in Config.Titles do
		if wipeouts >= t.wipeouts then
			title = t.text
		end
	end
	return title
end

-- The "Hot Seat" rotates daily (UTC) and pays double.
function Config.hotSeatId(unixTime: number?): string
	local day = math.floor((unixTime or os.time()) / 86400)
	local list = Config.Challenges
	return list[(day % #list) + 1].id
end

Config.HotSeatMultiplier = 2

-- PERFECT STOP needle: ping-pongs 0..1 at `speed` units per second. Shared so client visuals match server judging.
function Config.needle(elapsed: number, speed: number): number
	if elapsed <= 0 then
		return 0
	end
	local p = (elapsed * speed) % 2
	return if p <= 1 then p else 2 - p
end

Config.RecoverDelay = 2.6 -- seconds of ragdoll before you are back on your feet
Config.WinReturnDelay = 1.6
Config.IntroDelay = 1.25
Config.HubWalkSpeed = 20

-- Headlines stamped on screen when you fail. Picked per fail style.
Config.FailHeadlines = {
	trapdoor = { "TRAPDOOR'D", "FLOOR SAID NO", "AND HE'S GONE", "DOWN YOU GO" },
	glove = { "BONKED", "SPRING LOADED", "RIGHT HOOK", "PUNCHED OUT" },
	catapult = { "YEETED", "LAUNCHED", "SEE YOU LATER", "AIRMAIL" },
	sweep = { "SWEPT", "CLEAN SWEEP", "WRONG LANE", "BROOMED" },
	fall = { "SPLAT", "GRAVITY WINS", "BRIDGE: 1  YOU: 0", "WHOOPS" },
	blast = { "WRONG DOOR", "DOOR SAID NO", "KABOOM", "NOT THAT ONE" },
	timeout = { "TOO SLOW", "SNOOZED", "HELLO??" },
	launch = { "WRONG ANSWER", "NOPE", "MEMORY: DELETED", "COPY... NOT THAT" },
	zap = { "FRIED", "CRISPY", "SHOCKING", "ZAPPED" },
	misfire = { "MISSED", "WIDE", "SPLASHDOWN", "AIR BALL" },
}

-- Cosmetic shop. Pure cosmetics, fixed prices, no randomness. `kind` is the equip slot.
Config.Shop = {
	{ id = "trail_default", kind = "trail", name = "Signature", desc = "Matches the challenge colour.", price = 0 },
	{ id = "trail_gold", kind = "trail", name = "Liquid Gold", desc = "Fail expensively.", price = 400, colors = { Color3.fromRGB(255, 200, 60), Color3.fromRGB(255, 240, 170) } },
	{ id = "trail_void", kind = "trail", name = "Void Walker", desc = "Leave a hole in reality.", price = 900, colors = { Color3.fromRGB(150, 90, 255), Color3.fromRGB(10, 0, 20) } },
	{ id = "trail_fire", kind = "trail", name = "Re-entry", desc = "Burn up on the way down.", price = 1500, colors = { Color3.fromRGB(255, 60, 20), Color3.fromRGB(255, 170, 40) } }, -- head = newest segment: red-hot, fading to orange
	{ id = "trail_rainbow", kind = "trail", name = "Full Spectrum", desc = "Every colour of regret.", price = 3500, rainbow = true },
	{ id = "burst_none", kind = "burst", name = "None", desc = "Fail quietly. Dignified.", price = 0 },
	{ id = "burst_confetti", kind = "burst", name = "Party Pooper", desc = "Confetti cannon on every wipeout.", price = 300 },
	{ id = "burst_stars", kind = "burst", name = "Seeing Stars", desc = "Cartoon stars spin off you.", price = 750 },
	{ id = "burst_smoke", kind = "burst", name = "Cartoon Poof", desc = "A big puff of shame.", price = 1200 },
	{ id = "burst_lightning", kind = "burst", name = "Overcharged", desc = "Crackling sparks as you launch.", price = 2500 },
}
Config.ShopById = {}
for _, item in Config.Shop do
	Config.ShopById[item.id] = item
end
Config.DefaultEquipped = { trail = "trail_default", burst = "burst_none" }

Config.WinHeadlines = { "CLUTCH", "NERVES OF STEEL", "RISKED IT", "CLEAN", "COLD BLOODED" }

return Config
