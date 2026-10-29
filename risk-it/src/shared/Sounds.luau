-- Audio registry. All ids are free Creator Store audio; see docs/RESEARCH_AND_DESIGN_DECISIONS.md (Audio licensing)
-- for sources. Swap ids here only; nothing else references raw ids.
local Sounds = {
	Music = { id = "rbxassetid://91109027785901", volume = 0.22 }, -- "Timed Trial" (DistroKid Official)
	Laugh = { id = "rbxassetid://9114011902", volume = 0.55 }, -- Crowd Laugh 2 (Pro Sound Effects)
	Boo = { id = "rbxassetid://9120974911", volume = 0.35 }, -- Wrestling Crowd 1 (Pro Sound Effects)
	Cheer = { id = "rbxassetid://126615573673174", volume = 0.5 }, -- Crowd Cheering
	Whoosh = { id = "rbxassetid://9120724273", volume = 0.6 }, -- Whoosh Giant Swish (Pro Sound Effects)
	DrumRoll = { id = "rbxassetid://1842251033", volume = 0.45 }, -- Snare Drum Roll (APM)
	Boing = { id = "rbxassetid://111237552536869", volume = 0.8 }, -- spring (RBLXEssentials)
	Punch = { id = "rbxassetid://132504023010884", volume = 0.8 },
	Cash = { id = "rbxassetid://134810204798705", volume = 0.5 },
	Explosion = { id = "rbxasset://sounds/impact_explosion_03.mp3", volume = 0.6 }, -- ships with the client
	Fall = { id = "rbxasset://sounds/action_falling.ogg", volume = 0.5 },
	Land = { id = "rbxasset://sounds/action_jump_land.mp3", volume = 0.7 },
}

return Sounds
