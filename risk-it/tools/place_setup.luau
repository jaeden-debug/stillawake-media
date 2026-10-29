-- One-time place settings that scripts cannot change at runtime. Run in Studio's command bar (Edit mode).
-- Lighting.Technology must be set by hand: Explorer > Lighting > Technology = Future.
workspace.FallenPartsDestroyHeight = -1500
for _, name in { "Baseplate", "SpawnLocation" } do
	local p = workspace:FindFirstChild(name)
	if p then
		p:Destroy()
	end
end
