-- Client-side mirror of what the server told us. Read-only for gameplay; drives presentation.
local State = {}

State.profile = nil :: any -- latest DataSync view
State.session = nil :: any -- { token, id, def } while a challenge runs
State.lastStation = nil :: string? -- for instant retry
State.promptStation = nil :: string? -- station whose RISK IT! prompt is on screen (World sets it)

local changed = Instance.new("BindableEvent")
State.ProfileChanged = changed.Event

function State.setProfile(view)
	local prev = State.profile
	State.profile = view
	changed:Fire(view, prev)
end

return State
