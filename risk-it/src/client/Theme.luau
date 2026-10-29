-- UI kit: fonts, colors and a tiny element builder so every screen shares one look.
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")
local GuiService = game:GetService("GuiService")

local Config = require(ReplicatedStorage:WaitForChild("RiskIt"):WaitForChild("Config"))

local Theme = {}

Theme.P = Config.Palette
Theme.Display = Font.new("rbxasset://fonts/families/BuilderSans.json", Enum.FontWeight.ExtraBold, Enum.FontStyle.Italic)
Theme.Heavy = Font.new("rbxasset://fonts/families/BuilderSans.json", Enum.FontWeight.ExtraBold)
Theme.Bold = Font.new("rbxasset://fonts/families/BuilderSans.json", Enum.FontWeight.Bold)
Theme.Body = Font.new("rbxasset://fonts/families/BuilderSans.json", Enum.FontWeight.Medium)

function Theme.reducedMotion(): boolean
	local ok, v = pcall(function()
		return (GuiService :: any).ReducedMotionEnabled
	end)
	return ok and v == true
end

-- Screen size the UI should lay out for. QA can force a phone size by setting the LocalPlayer
-- attribute "QAViewport" (Vector2); otherwise this is the real camera viewport.
function Theme.viewport(): Vector2
	local lp = game:GetService("Players").LocalPlayer
	local forced = lp and lp:GetAttribute("QAViewport")
	if typeof(forced) == "Vector2" then
		return forced
	end
	return workspace.CurrentCamera.ViewportSize
end

-- Height of the top bar inset that non-IgnoreGuiInset ScreenGuis sit under.
function Theme.topInset(): number
	local lp = game:GetService("Players").LocalPlayer
	if lp and typeof(lp:GetAttribute("QAViewport")) == "Vector2" then
		return 58 -- Roblox mobile topbar
	end
	return (GuiService:GetGuiInset()).Y
end

-- new("Frame", {props}, {children})
function Theme.new(className: string, props: { [string]: any }?, children: { Instance }?): any
	local inst = Instance.new(className)
	local parent = nil
	if props then
		for k, v in props do
			if k == "Parent" then
				parent = v
			else
				(inst :: any)[k] = v
			end
		end
	end
	if children then
		for _, c in children do
			c.Parent = inst
		end
	end
	if inst:IsA("GuiObject") and (props == nil or props.BorderSizePixel == nil) then
		(inst :: any).BorderSizePixel = 0
	end
	if parent then
		inst.Parent = parent
	end
	return inst
end

function Theme.corner(radius: number | UDim?): UICorner
	local c = Instance.new("UICorner")
	c.CornerRadius = if typeof(radius) == "UDim" then radius else UDim.new(0, (radius :: number?) or 12)
	return c
end

function Theme.stroke(color: Color3, thickness: number?, transparency: number?): UIStroke
	local s = Instance.new("UIStroke")
	s.Color = color
	s.Thickness = thickness or 2
	s.Transparency = transparency or 0
	s.ApplyStrokeMode = Enum.ApplyStrokeMode.Border
	return s
end

function Theme.textStroke(color: Color3, thickness: number?): UIStroke
	local s = Instance.new("UIStroke")
	s.Color = color
	s.Thickness = thickness or 2
	s.ApplyStrokeMode = Enum.ApplyStrokeMode.Contextual
	return s
end

function Theme.gradient(a: Color3, b: Color3, rotation: number?): UIGradient
	local g = Instance.new("UIGradient")
	g.Color = ColorSequence.new(a, b)
	g.Rotation = rotation or 90
	return g
end

function Theme.padding(px: number): UIPadding
	local p = Instance.new("UIPadding")
	p.PaddingLeft = UDim.new(0, px)
	p.PaddingRight = UDim.new(0, px)
	p.PaddingTop = UDim.new(0, px)
	p.PaddingBottom = UDim.new(0, px)
	return p
end

function Theme.label(props: { [string]: any }): TextLabel
	local base = {
		BackgroundTransparency = 1,
		FontFace = Theme.Bold,
		TextColor3 = Theme.P.White,
		TextScaled = true,
		Text = "",
	}
	for k, v in props do
		base[k] = v
	end
	return Theme.new("TextLabel", base)
end

function Theme.tween(inst: Instance, time: number, props: { [string]: any }, style: Enum.EasingStyle?, dir: Enum.EasingDirection?): Tween
	local t = TweenService:Create(inst, TweenInfo.new(time, style or Enum.EasingStyle.Quint, dir or Enum.EasingDirection.Out), props)
	t:Play()
	return t
end

function Theme.color(name: string?): Color3
	return (name and (Theme.P :: any)[name]) or Theme.P.White
end

function Theme.formatNumber(n: number): string
	local s = tostring(math.floor(n))
	local formatted = s:reverse():gsub("(%d%d%d)", "%1,"):reverse()
	if formatted:sub(1, 1) == "," then
		formatted = formatted:sub(2)
	end
	return formatted
end

function Theme.formatBest(def, value: number?): string
	if value == nil then
		return "--"
	end
	if def.bestFormat == "ms" then
		return value .. " ms"
	elseif def.bestFormat == "s" then
		return string.format("%.2fs", value)
	end
	return tostring(value)
end

Theme.MedalColor = {
	gold = Config.Palette.Gold,
	silver = Config.Palette.Silver,
	bronze = Config.Palette.Bronze,
}

return Theme
