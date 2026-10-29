-- Always-on HUD: GUTS + wipeout counters, title, medal progress, Hot Seat banner, onboarding hint.
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local Config = require(ReplicatedStorage:WaitForChild("RiskIt"):WaitForChild("Config"))
local Theme = require(script.Parent.Theme)
local State = require(script.Parent.State)

local P = Theme.P
local new = Theme.new

local Hud = {}

local gui: ScreenGui
local gutsLabel: TextLabel
local wipeLabel: TextLabel
local titleLabel: TextLabel
local medalLabel: TextLabel
local hotBanner: Frame
local hint: Frame
local hintLabel: TextLabel
local displayedGuts = 0
local targetGuts = 0

local function pill(name: string, accent: Color3, iconText: string, order: number)
	local frame = new("Frame", {
		Name = name,
		BackgroundColor3 = P.Panel,
		BackgroundTransparency = 0.12,
		Size = UDim2.fromOffset(176, 46),
		LayoutOrder = order,
	}, {
		Theme.corner(UDim.new(0.5, 0)),
		Theme.stroke(accent, 1.5, 0.35),
	})
	local icon = new("Frame", {
		Name = "Icon",
		BackgroundColor3 = accent,
		Size = UDim2.fromOffset(34, 34),
		Position = UDim2.fromOffset(6, 6),
		Parent = frame,
	}, { Theme.corner(UDim.new(0.5, 0)) })
	Theme.label({
		Text = iconText,
		FontFace = Theme.Heavy,
		TextColor3 = P.Ink,
		Size = UDim2.fromScale(0.7, 0.7),
		Position = UDim2.fromScale(0.15, 0.15),
		Parent = icon,
	})
	local value = Theme.label({
		Name = "Value",
		Text = "0",
		FontFace = Theme.Heavy,
		TextXAlignment = Enum.TextXAlignment.Left,
		Size = UDim2.new(1, -54, 0, 24),
		Position = UDim2.fromOffset(48, 4),
		Parent = frame,
	})
	Theme.label({
		Name = "Caption",
		Text = name:upper(),
		FontFace = Theme.Bold,
		TextColor3 = accent,
		TextXAlignment = Enum.TextXAlignment.Left,
		Size = UDim2.new(1, -54, 0, 13),
		Position = UDim2.fromOffset(48, 28),
		Parent = frame,
	})
	return frame, value
end

function Hud.mount(playerGui: PlayerGui)
	gui = new("ScreenGui", {
		Name = "RiskItHud",
		ResetOnSpawn = false,
		IgnoreGuiInset = false,
		ZIndexBehavior = Enum.ZIndexBehavior.Sibling,
		DisplayOrder = 5,
		Parent = playerGui,
	})

	local bar = new("Frame", {
		Name = "TopBar",
		BackgroundTransparency = 1,
		AnchorPoint = Vector2.new(0.5, 0),
		Position = UDim2.new(0.5, 0, 0, 8),
		Size = UDim2.fromOffset(372, 46),
		Parent = gui,
	}, {
		new("UIListLayout", {
			FillDirection = Enum.FillDirection.Horizontal,
			HorizontalAlignment = Enum.HorizontalAlignment.Center,
			Padding = UDim.new(0, 12),
			SortOrder = Enum.SortOrder.LayoutOrder,
		}),
	})
	local g, gv = pill("Guts", P.Volt, "G", 1)
	g.Parent = bar
	gutsLabel = gv
	local w, wv = pill("Wipeouts", P.Hot, "!", 2)
	w.Parent = bar
	wipeLabel = wv

	titleLabel = Theme.label({
		Name = "Title",
		Text = "FRESH MEAT",
		FontFace = Theme.Display,
		TextColor3 = P.Volt,
		AnchorPoint = Vector2.new(0.5, 0),
		Position = UDim2.new(0.5, 0, 0, 60),
		Size = UDim2.fromOffset(300, 20),
		Parent = gui,
	})
	Theme.textStroke(P.Ink, 2).Parent = titleLabel

	medalLabel = Theme.label({
		Name = "Medals",
		Text = "MEDALS 0/" .. (#Config.Challenges * 3),
		FontFace = Theme.Heavy,
		TextColor3 = P.White,
		-- under the title, top centre: bottom-right is the mobile jump button
		AnchorPoint = Vector2.new(0.5, 0),
		Position = UDim2.new(0.5, 0, 0, 82),
		Size = UDim2.fromOffset(220, 16),
		Parent = gui,
	})
	Theme.textStroke(P.Ink, 2).Parent = medalLabel

	hotBanner = new("Frame", {
		Name = "HotSeat",
		BackgroundColor3 = P.Hot,
		AnchorPoint = Vector2.new(0, 0),
		Position = UDim2.new(0, 16, 0, 102),
		Size = UDim2.fromOffset(210, 50),
		Parent = gui,
	}, {
		Theme.corner(10),
		Theme.gradient(P.Hot, P.Orange, 0),
		Theme.label({
			Name = "Top",
			Text = "HOT SEAT TODAY",
			FontFace = Theme.Heavy,
			TextColor3 = P.Ink,
			Size = UDim2.new(1, -20, 0, 16),
			Position = UDim2.fromOffset(10, 6),
			TextXAlignment = Enum.TextXAlignment.Left,
		}),
		Theme.label({
			Name = "ChallengeName",
			Text = "",
			FontFace = Theme.Display,
			TextColor3 = P.White,
			Size = UDim2.new(1, -20, 0, 24),
			Position = UDim2.fromOffset(10, 23),
			TextXAlignment = Enum.TextXAlignment.Left,
		}),
	})

	hint = new("Frame", {
		Name = "Hint",
		BackgroundColor3 = P.Ink,
		BackgroundTransparency = 0.2,
		AnchorPoint = Vector2.new(0.5, 1),
		Position = UDim2.new(0.5, 0, 1, -100),
		Size = UDim2.new(0.86, 0, 0, 48),
		Visible = false,
		Parent = gui,
	}, {
		Theme.corner(UDim.new(0.5, 0)),
		Theme.stroke(P.Volt, 1.5, 0.3),
		new("UISizeConstraint", { MaxSize = Vector2.new(460, 48) }),
	})
	hintLabel = Theme.label({
		Text = "",
		FontFace = Theme.Heavy,
		Size = UDim2.new(1, -36, 0.56, 0),
		Position = UDim2.fromScale(0.5, 0.5),
		AnchorPoint = Vector2.new(0.5, 0.5),
		Parent = hint,
	})

	RunService.RenderStepped:Connect(function(dt)
		if displayedGuts ~= targetGuts then
			local diff = targetGuts - displayedGuts
			local step = math.max(1, math.abs(diff) * math.min(dt * 6, 1))
			displayedGuts = if math.abs(diff) <= step then targetGuts else displayedGuts + math.sign(diff) * step
			gutsLabel.Text = Theme.formatNumber(displayedGuts)
		end
	end)

	State.ProfileChanged:Connect(function(view, prev)
		Hud.render(view, prev)
	end)
	if State.profile then
		Hud.render(State.profile, nil)
	end
end

function Hud.render(view, prev)
	if not view then
		return
	end
	targetGuts = view.guts
	if not prev then
		displayedGuts = view.guts
		gutsLabel.Text = Theme.formatNumber(view.guts)
	end
	wipeLabel.Text = Theme.formatNumber(view.wipeouts)
	if prev and view.wipeouts > prev.wipeouts then
		local s = wipeLabel.Parent :: Frame
		s.Size = UDim2.fromOffset(196, 52)
		Theme.tween(s, 0.35, { Size = UDim2.fromOffset(176, 46) }, Enum.EasingStyle.Back)
	end
	if prev and view.guts > prev.guts then
		local s = gutsLabel.Parent :: Frame
		s.Size = UDim2.fromOffset(196, 52)
		Theme.tween(s, 0.45, { Size = UDim2.fromOffset(176, 46) }, Enum.EasingStyle.Back)
	end
	titleLabel.Text = view.title .. (if view.offline then "  ·  OFFLINE (progress not saved)" else "")
	if prev and prev.title ~= view.title then
		Hud.toast("NEW TITLE: " .. view.title, P.Volt)
	end

	local medals = 0
	for _, m in view.medals do
		medals += Config.MedalOrder[m] or 0
	end
	medalLabel.Text = string.format("MEDALS %d/%d", medals, #Config.Challenges * 3)

	local hot = Config.ChallengeById[view.hotSeat]
	hotBanner.Visible = hot ~= nil
	if hot then
		(hotBanner:FindFirstChild("ChallengeName") :: TextLabel).Text = hot.name .. "  ·  2x GUTS"
	end

	if not view.onboarded then
		Hud.hint("Walk onto a glowing pad and RISK IT!")
	end
end

function Hud.hint(text: string?)
	if not hint then
		return
	end
	if text then
		hintLabel.Text = text
		if not hint.Visible then
			hint.Visible = true
			hint.Position = UDim2.new(0.5, 0, 1, -70)
			Theme.tween(hint, 0.4, { Position = UDim2.new(0.5, 0, 1, -100) }, Enum.EasingStyle.Back)
		end
	else
		hint.Visible = false
	end
end

local toastBusy = false
function Hud.toast(text: string, color: Color3)
	if not gui then
		return
	end
	task.spawn(function()
		while toastBusy do
			task.wait(0.1)
		end
		toastBusy = true
		local t = new("Frame", {
			BackgroundColor3 = P.Ink,
			BackgroundTransparency = 0.1,
			AnchorPoint = Vector2.new(0.5, 0),
			Position = UDim2.new(0.5, 0, 0, -60),
			Size = UDim2.fromOffset(420, 44),
			Parent = gui,
		}, {
			Theme.corner(UDim.new(0.5, 0)),
			Theme.stroke(color, 2),
			Theme.label({
				Text = text,
				FontFace = Theme.Heavy,
				TextColor3 = color,
				Size = UDim2.new(1, -30, 0.6, 0),
				Position = UDim2.fromScale(0.5, 0.5),
				AnchorPoint = Vector2.new(0.5, 0.5),
			}),
		})
		Theme.tween(t, 0.45, { Position = UDim2.new(0.5, 0, 0, 92) }, Enum.EasingStyle.Back)
		task.wait(2.4)
		Theme.tween(t, 0.3, { Position = UDim2.new(0.5, 0, 0, -60) }, Enum.EasingStyle.Quint, Enum.EasingDirection.In)
		task.wait(0.32)
		t:Destroy()
		toastBusy = false
	end)
end

function Hud.setVisible(v: boolean)
	if gui then
		gui.Enabled = v
	end
end

return Hud
