-- QA harness: lay every RISK IT! screen out inside an exact phone-sized frame (top-left of the
-- Studio viewport) so small-screen layout can be checked without the Device Emulator.
-- phone(w, h)   -> wraps HUD / challenge / shop UI into a w×h frame (mobile topbar inset = 58)
-- unphone()     -> restores everything
-- Approximation: it reproduces layout math (scale, offsets, UIScale fits) but not touch
-- hit-testing, device DPI or the real Roblox mobile topbar buttons.
local GuiService = game:GetService("GuiService")
local Players = game:GetService("Players")

local lp = Players.LocalPlayer
local Phone = {}

local NAMES = { "RiskItHud", "RiskItChallenge", "RiskItShop" }
local MOBILE_INSET = 58

function Phone.phone(w: number, h: number)
	Phone.unphone()
	lp:SetAttribute("QAViewport", Vector2.new(w, h))
	local desktopInset = GuiService:GetGuiInset().Y
	for _, name in NAMES do
		local gui = lp.PlayerGui:FindFirstChild(name) :: ScreenGui?
		if gui then
			local frame = Instance.new("Frame")
			frame.Name = "QAPhoneFrame"
			frame.BackgroundTransparency = 1
			frame.ClipsDescendants = true
			if gui.IgnoreGuiInset then
				frame.Position = UDim2.fromOffset(0, 0)
				frame.Size = UDim2.fromOffset(w, h)
			else
				frame.Position = UDim2.fromOffset(0, MOBILE_INSET - desktopInset)
				frame.Size = UDim2.fromOffset(w, h - MOBILE_INSET)
			end
			for _, c in gui:GetChildren() do
				if c:IsA("GuiObject") then
					c.Parent = frame
				end
			end
			frame.Parent = gui
			if name == "RiskItChallenge" then
				local outline = Instance.new("Frame")
				outline.Name = "QAPhoneOutline"
				outline.BackgroundTransparency = 1
				outline.Size = UDim2.fromOffset(w, h)
				outline.ZIndex = 100
				local stroke = Instance.new("UIStroke")
				stroke.Color = Color3.new(1, 1, 1)
				stroke.Thickness = 3
				stroke.Parent = outline
				outline.Parent = gui
				-- mobile topbar band for reference
				local bar = Instance.new("Frame")
				bar.Name = "QATopbar"
				bar.BackgroundColor3 = Color3.new(1, 1, 1)
				bar.BackgroundTransparency = 0.85
				bar.BorderSizePixel = 0
				bar.Size = UDim2.fromOffset(w, MOBILE_INSET)
				bar.ZIndex = 100
				bar.Parent = gui
			end
		end
	end
end

function Phone.unphone()
	lp:SetAttribute("QAViewport", nil)
	for _, name in NAMES do
		local gui = lp.PlayerGui:FindFirstChild(name)
		if gui then
			for _, n in { "QAPhoneOutline", "QATopbar" } do
				local x = gui:FindFirstChild(n)
				if x then
					x:Destroy()
				end
			end
			local frame = gui:FindFirstChild("QAPhoneFrame")
			if frame then
				for _, c in frame:GetChildren() do
					c.Parent = gui
				end
				frame:Destroy()
			end
		end
	end
end

-- Layout audit for whatever is on screen now. Reports:
--   OUT   element extends outside the phone frame
--   TAP   button smaller than 44px in either dimension
--   OVER  two visible top-level elements overlap (full-screen layers excluded)
local FULLSCREEN = { Letterbox1 = true, Letterbox2 = true, Stamp = true, Intro = true }

local function visible(g: GuiObject): boolean
	local x: Instance? = g
	while x and x:IsA("GuiObject") do
		if not (x :: GuiObject).Visible then
			return false
		end
		x = x.Parent
	end
	return true
end

local function rect(g: GuiObject)
	local p, s = g.AbsolutePosition, g.AbsoluteSize
	return p.X, p.Y, p.X + s.X, p.Y + s.Y
end

function Phone.audit(): string
	local out = {}
	local tops = {}
	for _, name in NAMES do
		local gui = lp.PlayerGui:FindFirstChild(name) :: ScreenGui?
		local frame = gui and gui.Enabled and gui:FindFirstChild("QAPhoneFrame") :: GuiObject?
		if frame then
			local fx0, fy0, fx1, fy1 = rect(frame)
			for _, g in frame:GetDescendants() do
				if g:IsA("GuiObject") and visible(g) and not g:FindFirstAncestorWhichIsA("ScrollingFrame") then
					local x0, y0, x1, y1 = rect(g)
					local w, h = x1 - x0, y1 - y0
					if w > 1 and h > 1 and (x0 < fx0 - 1 or y0 < fy0 - 1 or x1 > fx1 + 1 or y1 > fy1 + 1) and not FULLSCREEN[g.Name] and not g:FindFirstAncestor("Stamp") and not g:FindFirstAncestor("Intro") then
						table.insert(out, string.format("OUT  %s (%d,%d %dx%d)", g:GetFullName():gsub("^.-QAPhoneFrame%.", name .. "."), x0 - fx0, y0 - fy0, w, h))
					end
					if g:IsA("GuiButton") and (w < 43.5 or h < 43.5) then
						table.insert(out, string.format("TAP  %s %dx%d", g:GetFullName():gsub("^.-QAPhoneFrame%.", name .. "."), w, h))
					end
				end
			end
			for _, g in frame:GetChildren() do
				local invisibleText = g:IsA("TextLabel") and g.TextTransparency >= 0.99 and g.BackgroundTransparency >= 0.99
				if g:IsA("GuiObject") and visible(g) and not FULLSCREEN[g.Name] and not invisibleText then
					table.insert(tops, { name = name .. "." .. g.Name, r = { rect(g) } })
				end
			end
		end
	end
	for i = 1, #tops do
		for j = i + 1, #tops do
			local a, b = tops[i].r, tops[j].r
			if a[1] < b[3] - 1 and b[1] < a[3] - 1 and a[2] < b[4] - 1 and b[2] < a[4] - 1 then
				table.insert(out, "OVER " .. tops[i].name .. " x " .. tops[j].name)
			end
		end
	end
	return if #out == 0 then "clean" else table.concat(out, "\n")
end

return Phone
