-- Shared prop animation helpers for challenge modules.
local RunService = game:GetService("RunService")

local Common = {}

-- Rotates `part` about a hinge from angle a to angle b (radians, around hinge's local `axis`) over `duration`.
-- `offset` is the part's CFrame relative to the hinge. Yields.
function Common.swing(part: BasePart, hinge: CFrame, offset: CFrame, axis: Vector3, a: number, b: number, duration: number, easing: ((number) -> number)?)
	local ease = easing or function(x)
		return 1 - (1 - x) ^ 3
	end
	local t = 0
	while t < duration do
		t += RunService.Heartbeat:Wait()
		local k = ease(math.clamp(t / duration, 0, 1))
		part.CFrame = hinge * CFrame.fromAxisAngle(axis, a + (b - a) * k) * offset
	end
	part.CFrame = hinge * CFrame.fromAxisAngle(axis, b) * offset
end

-- Moves a part linearly between two CFrames. Yields.
function Common.slide(part: BasePart, from: CFrame, to: CFrame, duration: number)
	local t = 0
	while t < duration do
		t += RunService.Heartbeat:Wait()
		part.CFrame = from:Lerp(to, math.clamp(t / duration, 0, 1))
	end
	part.CFrame = to
end

function Common.medal(value: number, bronze: number, silver: number, gold: number, lowerIsBetter: boolean?): string?
	if lowerIsBetter then
		if value <= gold then
			return "gold"
		elseif value <= silver then
			return "silver"
		elseif value <= bronze then
			return "bronze"
		end
	else
		if value >= gold then
			return "gold"
		elseif value >= silver then
			return "silver"
		elseif value >= bronze then
			return "bronze"
		end
	end
	return nil
end

-- Velocity that points from the station toward the hub (local +Z), plus lift.
function Common.towardHub(station, horizontal: number, up: number): Vector3
	return -station.cf.LookVector * horizontal + Vector3.new(0, up, 0)
end

return Common
