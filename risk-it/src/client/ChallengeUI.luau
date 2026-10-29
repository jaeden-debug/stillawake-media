-- In-challenge presentation: cinematic intro, control panel, timing widgets, result stamp, instant retry.
-- Everything here is presentation; the server decides every outcome.
local ContextActionService = game:GetService("ContextActionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")

local Shared = ReplicatedStorage:WaitForChild("RiskIt")
local Config = require(Shared:WaitForChild("Config"))
local Net = require(Shared:WaitForChild("Net"))
local Theme = require(script.Parent.Theme)
local State = require(script.Parent.State)
local Effects = require(script.Parent.Effects)
local Hud = require(script.Parent.Hud)
local Glyphs = require(Shared:WaitForChild("Glyphs"))

local P = Theme.P
local new = Theme.new
local player = Players.LocalPlayer

local ChallengeUI = {}

local gui: ScreenGui
local bars: { Frame } = {}
local intro: Frame
local panel: Frame
local panelScale: UIScale
local nameLabel: TextLabel
local bigLabel: TextLabel
local subLabel: TextLabel
local timerFill: Frame
local meterFrame: Frame
local meterZone: Frame
local meterNeedle: Frame
local lightRow: Frame
local lights: { [string]: Frame } = {}
local primaryBtn: TextButton
local secondaryBtn: TextButton
local flashLabel: TextLabel
local stampHolder: Frame
local stampFit = 1 -- stamp size for this screen height (set by fit())
local retryBtn: TextButton

local dirRow: Frame
local dirButtons: { [string]: TextButton } = {}
local bigArrow: Frame
local dotRow: Frame
local markHolder: Frame
local DIR_SET = { up = true, down = true, left = true, right = true }

local ui = {} -- merged server ui state for the current session
local lastSend = 0
local retryUntil = 0

local LIGHT_COLORS = { red = P.Hot, yellow = P.Volt, green = P.Lime }
local OFF = Color3.fromRGB(38, 38, 50)

-- Input -----------------------------------------------------------------------------------------

local function send(action: string)
	local s = State.session
	if not s then
		return
	end
	if action == "primary" and not ui.primary then
		return
	end
	if action == "secondary" and not ui.secondary then
		return
	end
	local isDir = DIR_SET[action] == true
	if isDir and not ui.dirs then
		return
	end
	local now = os.clock()
	if now - lastSend < (if isDir then 0.06 else 0.12) then
		return
	end
	lastSend = now
	Net.ChallengeInput:FireServer(action, { t = workspace:GetServerTimeNow() })
	local btn = if isDir then dirButtons[action] elseif action == "primary" then primaryBtn else secondaryBtn
	local scale = btn:FindFirstChildOfClass("UIScale")
	if scale then
		scale.Scale = 0.9
		Theme.tween(scale, 0.25, { Scale = 1 }, Enum.EasingStyle.Back)
	end
end

local DIR_KEYS = {
	[Enum.KeyCode.Up] = "up", [Enum.KeyCode.W] = "up", [Enum.KeyCode.DPadUp] = "up",
	[Enum.KeyCode.Down] = "down", [Enum.KeyCode.S] = "down", [Enum.KeyCode.DPadDown] = "down",
	[Enum.KeyCode.Left] = "left", [Enum.KeyCode.A] = "left", [Enum.KeyCode.DPadLeft] = "left",
	[Enum.KeyCode.Right] = "right", [Enum.KeyCode.D] = "right", [Enum.KeyCode.DPadRight] = "right",
}

local function bindInputs(def)
	if not def.freezePlayer then
		return -- movement challenges: keep Space/WASD for the character
	end
	local keys = {}
	for k in DIR_KEYS do
		table.insert(keys, k)
	end
	ContextActionService:BindActionAtPriority("RiskItDirs", function(_, state, input)
		if state == Enum.UserInputState.Begin then
			send(DIR_KEYS[input.KeyCode])
		end
		return Enum.ContextActionResult.Sink
	end, false, Enum.ContextActionPriority.High.Value, table.unpack(keys))
	ContextActionService:BindActionAtPriority("RiskItPrimary", function(_, state)
		if state == Enum.UserInputState.Begin then
			send("primary")
		end
		return Enum.ContextActionResult.Sink
	end, false, Enum.ContextActionPriority.High.Value, Enum.KeyCode.Space, Enum.KeyCode.E, Enum.KeyCode.ButtonA, Enum.KeyCode.ButtonR2)
	ContextActionService:BindActionAtPriority("RiskItSecondary", function(_, state)
		if state == Enum.UserInputState.Begin then
			send("secondary")
		end
		return Enum.ContextActionResult.Sink
	end, false, Enum.ContextActionPriority.High.Value, Enum.KeyCode.Q, Enum.KeyCode.ButtonB)
end

local function unbindInputs()
	ContextActionService:UnbindAction("RiskItPrimary")
	ContextActionService:UnbindAction("RiskItSecondary")
	ContextActionService:UnbindAction("RiskItDirs")
end

-- Building --------------------------------------------------------------------------------------

local function button(name: string, text: string, fill: Color3, textColor: Color3, keyHint: string): TextButton
	local b = new("TextButton", {
		Name = name,
		AutoButtonColor = false,
		BackgroundColor3 = fill,
		Size = UDim2.new(0.5, -6, 1, 0),
		Text = "",
	}, {
		Theme.corner(14),
		new("UIScale"),
		Theme.label({
			Name = "Text",
			Text = text,
			FontFace = Theme.Display,
			TextColor3 = textColor,
			Size = UDim2.new(1, -24, 0.5, 0),
			Position = UDim2.fromScale(0.5, if keyHint == "" then 0.5 else 0.42), -- centred when there's no key hint (touch)
			AnchorPoint = Vector2.new(0.5, 0.5),
		}),
		Theme.label({
			Name = "Key",
			Text = keyHint,
			FontFace = Theme.Bold,
			TextColor3 = textColor,
			TextTransparency = 0.35,
			Size = UDim2.new(1, -24, 0.2, 0),
			Position = UDim2.fromScale(0.5, 0.82),
			AnchorPoint = Vector2.new(0.5, 0.5),
		}),
	})
	return b
end

local function buildIntro()
	intro = new("Frame", {
		Name = "Intro",
		BackgroundTransparency = 1,
		Size = UDim2.fromScale(1, 1),
		Visible = false,
		Parent = gui,
	})
	local slab = new("Frame", {
		Name = "Slab",
		BackgroundColor3 = P.Hot,
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.fromScale(0.5, 0.42),
		Size = UDim2.new(1.2, 0, 0, 150),
		Rotation = -4,
		Parent = intro,
	}, { Theme.gradient(P.Hot, P.Orange, 0) })
	Theme.label({
		Name = "Name",
		Text = "THE BUTTON",
		FontFace = Theme.Display,
		TextColor3 = P.White,
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.fromScale(0.5, 0.4),
		Size = UDim2.new(0.8, 0, 0, 84),
		Parent = slab,
	}, nil)
	Theme.label({
		Name = "Tagline",
		Text = "",
		FontFace = Theme.Bold,
		TextColor3 = P.Ink,
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.fromScale(0.5, 0.82),
		Size = UDim2.new(0.7, 0, 0, 24),
		Parent = slab,
	})
	Theme.label({
		Name = "Meta",
		Text = "",
		FontFace = Theme.Heavy,
		TextColor3 = P.Volt,
		AnchorPoint = Vector2.new(0.5, 0),
		Position = UDim2.new(0.5, 0, 0.42, 92),
		Size = UDim2.fromOffset(600, 26),
		Parent = intro,
	})
	Theme.textStroke(P.Ink, 3).Parent = intro:FindFirstChild("Meta")
end

local function buildPanel()
	panel = new("Frame", {
		Name = "Panel",
		BackgroundColor3 = P.Ink,
		BackgroundTransparency = 0.08,
		AnchorPoint = Vector2.new(0.5, 1),
		Position = UDim2.new(0.5, 0, 1, -24),
		Size = UDim2.fromOffset(560, 236),
		Visible = false,
		Parent = gui,
	}, {
		Theme.corner(22),
		Theme.stroke(P.Hot, 2, 0.2),
		new("UISizeConstraint", { MaxSize = Vector2.new(560, 236) }),
	})
	panelScale = new("UIScale", { Parent = panel })

	local timerBack = new("Frame", {
		Name = "TimerBack",
		BackgroundColor3 = Color3.fromRGB(40, 40, 54),
		Position = UDim2.fromOffset(22, 14),
		Size = UDim2.new(1, -44, 0, 5),
		Parent = panel,
	}, { Theme.corner(UDim.new(0.5, 0)) })
	timerFill = new("Frame", {
		Name = "Fill",
		BackgroundColor3 = P.Volt,
		Size = UDim2.fromScale(1, 1),
		Parent = timerBack,
	}, { Theme.corner(UDim.new(0.5, 0)) })

	nameLabel = Theme.label({
		Name = "ChallengeName",
		Text = "",
		FontFace = Theme.Heavy,
		TextColor3 = P.Hot,
		TextXAlignment = Enum.TextXAlignment.Left,
		Position = UDim2.fromOffset(22, 26),
		Size = UDim2.new(1, -44, 0, 16),
		Parent = panel,
	})
	bigLabel = Theme.label({
		Name = "Big",
		Text = "",
		FontFace = Theme.Display,
		Position = UDim2.fromOffset(22, 44),
		Size = UDim2.new(1, -44, 0, 50),
		Parent = panel,
	})
	subLabel = Theme.label({
		Name = "Sub",
		Text = "",
		FontFace = Theme.Bold,
		TextColor3 = P.Muted,
		Position = UDim2.fromOffset(22, 96),
		Size = UDim2.new(1, -44, 0, 20),
		Parent = panel,
	})

	-- Timing meter (PERFECT STOP)
	meterFrame = new("Frame", {
		Name = "Meter",
		BackgroundColor3 = Color3.fromRGB(34, 34, 48),
		Position = UDim2.fromOffset(22, 124),
		Size = UDim2.new(1, -44, 0, 22),
		Visible = false,
		Parent = panel,
	}, { Theme.corner(UDim.new(0.5, 0)) })
	meterZone = new("Frame", {
		Name = "Zone",
		BackgroundColor3 = P.Lime,
		AnchorPoint = Vector2.new(0.5, 0),
		Size = UDim2.fromScale(0.2, 1),
		Parent = meterFrame,
	}, {
		new("Frame", {
			Name = "Perfect",
			BackgroundColor3 = P.Volt,
			AnchorPoint = Vector2.new(0.5, 0),
			Position = UDim2.fromScale(0.5, 0),
			Size = UDim2.fromScale(0.4, 1),
		}),
	})
	meterNeedle = new("Frame", {
		Name = "Needle",
		BackgroundColor3 = P.White,
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.fromScale(0, 0.5),
		Size = UDim2.new(0, 6, 1.8, 0),
		ZIndex = 3,
		Parent = meterFrame,
	}, { Theme.corner(3), Theme.stroke(P.Ink, 2) })

	-- Traffic lights (QUICK DRAW)
	lightRow = new("Frame", {
		Name = "Lights",
		BackgroundTransparency = 1,
		AnchorPoint = Vector2.new(0.5, 0),
		Position = UDim2.new(0.5, 0, 0, 118),
		Size = UDim2.fromOffset(180, 34),
		Visible = false,
		Parent = panel,
	}, {
		new("UIListLayout", {
			FillDirection = Enum.FillDirection.Horizontal,
			HorizontalAlignment = Enum.HorizontalAlignment.Center,
			Padding = UDim.new(0, 18),
			SortOrder = Enum.SortOrder.LayoutOrder,
		}),
	})
	for i, name in { "red", "yellow", "green" } do
		lights[name] = new("Frame", {
			Name = name,
			LayoutOrder = i,
			BackgroundColor3 = OFF,
			Size = UDim2.fromOffset(34, 34),
			Parent = lightRow,
		}, { Theme.corner(UDim.new(0.5, 0)) })
	end

	-- Meter tick marks (LONG SHOT targets)
	markHolder = new("Frame", { Name = "Marks", BackgroundTransparency = 1, Size = UDim2.fromScale(1, 1), Parent = meterFrame })

	-- Arrow display + progress dots (COPY THAT)
	bigArrow = new("Frame", {
		Name = "BigArrow",
		BackgroundColor3 = P.Sky,
		AnchorPoint = Vector2.new(0.5, 0),
		Position = UDim2.new(0.5, 0, 0, 146),
		Size = UDim2.fromOffset(72, 72),
		Visible = false,
		ZIndex = 5,
		Parent = panel,
	}, { Theme.corner(24) })
	Glyphs.chevron(bigArrow, "up", P.White, 0.24).ZIndex = 6
	dotRow = new("Frame", {
		Name = "Dots",
		BackgroundTransparency = 1,
		AnchorPoint = Vector2.new(0.5, 0),
		Position = UDim2.new(0.5, 0, 0, 122),
		Size = UDim2.new(1, -44, 0, 16),
		Visible = false,
		Parent = panel,
	}, {
		new("UIListLayout", {
			FillDirection = Enum.FillDirection.Horizontal,
			HorizontalAlignment = Enum.HorizontalAlignment.Center,
			Padding = UDim.new(0, 8),
		}),
	})

	dirRow = new("Frame", {
		Name = "DirButtons",
		BackgroundTransparency = 1,
		Position = UDim2.new(0, 22, 1, -78),
		Size = UDim2.new(1, -44, 0, 62),
		Visible = false,
		Parent = panel,
	}, {
		new("UIListLayout", {
			FillDirection = Enum.FillDirection.Horizontal,
			HorizontalAlignment = Enum.HorizontalAlignment.Center,
			Padding = UDim.new(0, 12),
			SortOrder = Enum.SortOrder.LayoutOrder,
		}),
	})
	for i, dir in { "left", "up", "down", "right" } do
		local b = new("TextButton", {
			Name = dir,
			AutoButtonColor = false,
			BackgroundColor3 = P.Sky,
			Size = UDim2.fromOffset(86, 62),
			LayoutOrder = i,
			Text = "",
			Parent = dirRow,
		}, { Theme.corner(14), new("UIScale") })
		Glyphs.chevron(b, dir, P.White, 0.24)
		b.Activated:Connect(function()
			send(dir)
		end)
		dirButtons[dir] = b
	end

	local row = new("Frame", {
		Name = "Buttons",
		BackgroundTransparency = 1,
		Position = UDim2.new(0, 22, 1, -78),
		Size = UDim2.new(1, -44, 0, 62),
		Parent = panel,
	}, {
		new("UIListLayout", {
			FillDirection = Enum.FillDirection.Horizontal,
			HorizontalAlignment = Enum.HorizontalAlignment.Center,
			Padding = UDim.new(0, 12),
			SortOrder = Enum.SortOrder.LayoutOrder,
		}),
	})
	local touch = UserInputService.TouchEnabled
	primaryBtn = button("Primary", "PRESS", P.Hot, P.White, if touch then "" else "SPACE")
	primaryBtn.LayoutOrder = 1
	primaryBtn.Parent = row
	secondaryBtn = button("Secondary", "CASH OUT", P.Volt, P.Ink, if touch then "" else "Q")
	secondaryBtn.LayoutOrder = 2
	secondaryBtn.Parent = row
	primaryBtn.Activated:Connect(function()
		send("primary")
	end)
	secondaryBtn.Activated:Connect(function()
		send("secondary")
	end)

	flashLabel = Theme.label({
		Name = "Flash",
		Text = "",
		FontFace = Theme.Display,
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.fromScale(0.5, 0.2),
		Size = UDim2.fromOffset(600, 70),
		TextTransparency = 1,
		Parent = gui,
	})
	new("UIScale", { Parent = flashLabel })
	Theme.textStroke(P.Ink, 4).Parent = flashLabel
end

local function buildRetry()
	retryBtn = new("TextButton", {
		Name = "Retry",
		AutoButtonColor = false,
		BackgroundColor3 = P.Hot,
		AnchorPoint = Vector2.new(0.5, 1),
		Position = UDim2.new(0.5, 0, 1, -40),
		Size = UDim2.fromOffset(300, 64),
		Text = "",
		Visible = false,
		Parent = gui,
	}, {
		Theme.corner(UDim.new(0.5, 0)),
		Theme.gradient(P.Hot, P.Orange, 0),
		new("UIScale"),
		Theme.label({
			Text = "RISK IT AGAIN",
			FontFace = Theme.Display,
			Size = UDim2.new(1, -40, 0.5, 0),
			Position = UDim2.fromScale(0.5, 0.42),
			AnchorPoint = Vector2.new(0.5, 0.5),
		}),
		Theme.label({
			Text = if UserInputService.TouchEnabled then "" else "R",
			FontFace = Theme.Bold,
			TextTransparency = 0.3,
			Size = UDim2.new(1, -40, 0.2, 0),
			Position = UDim2.fromScale(0.5, 0.82),
			AnchorPoint = Vector2.new(0.5, 0.5),
		}),
	})
	retryBtn.Activated:Connect(function()
		ChallengeUI.retry()
	end)
	UserInputService.InputBegan:Connect(function(input, processed)
		if processed then
			return
		end
		if input.KeyCode == Enum.KeyCode.R or input.KeyCode == Enum.KeyCode.ButtonY then
			if retryBtn.Visible then
				ChallengeUI.retry()
			end
		end
		-- tap / click anywhere for the reaction & timing challenges (not THE BUTTON: misclicks cost too much)
		if
			State.session
			and (input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch)
			and (State.session.id == "stop" or State.session.id == "draw")
		then
			send("primary")
		end
	end)
end

-- Rendering -------------------------------------------------------------------------------------

local function setButton(btn: TextButton, value)
	if value == nil then
		return
	end
	if value == false then
		btn.Visible = false
	else
		btn.Visible = true
		(btn:FindFirstChild("Text") :: TextLabel).Text = value
	end
end

local function letterbox(on: boolean)
	for i, b in bars do
		local y = if i == 1 then (if on then 0 else -0.12) else (if on then 0.89 else 1.01)
		Theme.tween(b, 0.5, { Position = UDim2.fromScale(0, y) })
	end
end

local function flash(text: string, color: Color3)
	flashLabel.Text = text
	flashLabel.TextColor3 = color
	flashLabel.TextTransparency = 0
	flashLabel.Rotation = math.random(-6, 6)
	local s = flashLabel:FindFirstChildOfClass("UIScale") :: UIScale
	s.Scale = 1.8
	Theme.tween(s, 0.3, { Scale = 1 }, Enum.EasingStyle.Back)
	task.delay(0.7, function()
		if flashLabel.Text == text then
			Theme.tween(flashLabel, 0.3, { TextTransparency = 1 })
		end
	end)
end

local function applyUi(data)
	for k, v in data do
		ui[k] = v
	end
	if data.timerEnd then
		ui.timerTotal = math.max(data.timerEnd - workspace:GetServerTimeNow(), 1)
	end
	if data.big then
		bigLabel.Text = data.big
	end
	if data.sub then
		subLabel.Text = data.sub
	end
	setButton(primaryBtn, data.primary)
	setButton(secondaryBtn, data.secondary)
	if data.secondary == nil and data.primary ~= nil and not ui.secondary then
		secondaryBtn.Visible = false
	end
	primaryBtn.Size = if secondaryBtn.Visible then UDim2.new(0.5, -6, 1, 0) else UDim2.new(0.62, 0, 1, 0)
	if data.meter then
		meterFrame.Visible = true
		meterZone.Visible = data.meter.width > 0
		meterZone.Position = UDim2.fromScale(data.meter.center, 0)
		meterZone.Size = UDim2.fromScale(data.meter.width, 1)
		ui.meterStop = nil
		markHolder:ClearAllChildren()
		for _, m in data.meter.marks or {} do
			local tick = new("Frame", {
				BackgroundColor3 = P.Rose,
				AnchorPoint = Vector2.new(0.5, 0),
				Position = UDim2.fromScale(m.pos, 0),
				Size = UDim2.new(0, 4, 1, 0),
				ZIndex = 2,
				Parent = markHolder,
			})
			Theme.label({
				Text = m.label,
				FontFace = Theme.Heavy,
				TextColor3 = P.Rose,
				TextXAlignment = Enum.TextXAlignment.Left,
				AnchorPoint = Vector2.new(0, 0.5),
				Position = UDim2.new(0.5, 6, 0.5, 0),
				Size = UDim2.fromOffset(40, 12),
				Parent = tick,
			})
		end
	end
	if data.dirs ~= nil then
		dirRow.Visible = data.dirs
		if data.dirs then
			primaryBtn.Visible = false
			secondaryBtn.Visible = false
		end
	end
	if data.showArrow ~= nil then
		bigArrow.Visible = data.showArrow ~= false
		if data.showArrow then
			(bigArrow:FindFirstChild("Chevron") :: Frame).Rotation = Glyphs.Rotation[data.showArrow]
			local s2 = bigArrow:FindFirstChildOfClass("UIScale") or new("UIScale", { Parent = bigArrow })
			s2.Scale = 0.7
			Theme.tween(s2, 0.15, { Scale = 1 }, Enum.EasingStyle.Back)
		end
	end
	if data.arrows ~= nil then
		dotRow.Visible = data.arrows ~= false
		if data.arrows then
			local dots = {}
			for _, c in dotRow:GetChildren() do
				if c:IsA("Frame") then
					table.insert(dots, c)
				end
			end
			if #dots ~= data.arrows.count then
				for _, d in dots do
					d:Destroy()
				end
				for i = 1, data.arrows.count do
					new("Frame", { Name = "Dot", LayoutOrder = i, Size = UDim2.fromOffset(16, 16), BackgroundColor3 = OFF, Parent = dotRow }, { Theme.corner(UDim.new(0.5, 0)) })
				end
			end
			local i = 0
			for _, d in dotRow:GetChildren() do
				if d:IsA("Frame") then
					i += 1
					d.BackgroundColor3 = if d.LayoutOrder <= data.arrows.filled then P.Sky else OFF
				end
			end
		end
	end
	if data.light then
		lightRow.Visible = true
		for name, f in lights do
			f.BackgroundColor3 = if name == data.light then LIGHT_COLORS[name] else OFF
		end
		if data.light == "green" then
			Effects.flash(P.Lime, 0.3, 0.25)
		end
	end
	if data.flash then
		flash(data.flash.text, Theme.color(data.flash.color))
		if data.flash.color == "Hot" then
			Effects.shake(0.2, 0.2)
		end
	end
	if data.suspense then
		Effects.shake(0.06, 1.1)
		Effects.fov(Effects.BASE_FOV - 12, 1.1, Enum.EasingStyle.Sine)
	elseif data.big and not data.suspense and State.session and State.session.id == "button" then
		Effects.fov(Effects.BASE_FOV - 6, 0.4)
	end
end

local function hidePanel()
	panel.Visible = false
	meterFrame.Visible = false
	lightRow.Visible = false
	dirRow.Visible = false
	bigArrow.Visible = false
	dotRow.Visible = false
	table.clear(ui)
end

local function stamp(payload)
	stampHolder:ClearAllChildren()
	local win = payload.outcome == "win"
	local color = if win then P.Volt else P.Hot
	local root = new("Frame", {
		BackgroundTransparency = 1,
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.new(0.5, 0, 0.3, 36), -- +36px keeps it clear of the Roblox top bar on phones
		Size = UDim2.new(0.92, 0, 0, 260),
		Rotation = if win then -3 else -7,
		Parent = stampHolder,
	})
	local scale = new("UIScale", { Scale = 2.6 * stampFit, Parent = root })
	local shadow = Theme.label({
		Text = payload.headline or "",
		FontFace = Theme.Display,
		TextColor3 = P.Ink,
		TextTransparency = 0.3,
		Size = UDim2.new(1, 0, 0, 130),
		Position = UDim2.fromOffset(8, 10),
		Parent = root,
	})
	local main = Theme.label({
		Text = payload.headline or "",
		FontFace = Theme.Display,
		TextColor3 = color,
		Size = UDim2.new(1, 0, 0, 130),
		Parent = root,
	})
	Theme.textStroke(P.White, 5).Parent = main

	local chips = new("Frame", {
		BackgroundTransparency = 1,
		Position = UDim2.fromOffset(0, 140),
		Size = UDim2.new(1, 0, 0, 44),
		Parent = root,
	}, {
		new("UIListLayout", {
			FillDirection = Enum.FillDirection.Horizontal,
			HorizontalAlignment = Enum.HorizontalAlignment.Center,
			Padding = UDim.new(0, 10),
			SortOrder = Enum.SortOrder.LayoutOrder,
		}),
	})
	local function chip(text: string, fill: Color3, textColor: Color3, order: number)
		new("Frame", {
			BackgroundColor3 = fill,
			Size = UDim2.fromOffset(math.max(150, #text * 15 + 40), 44),
			LayoutOrder = order,
			Parent = chips,
		}, {
			Theme.corner(UDim.new(0.5, 0)),
			Theme.label({
				Text = text,
				FontFace = Theme.Heavy,
				TextColor3 = textColor,
				Size = UDim2.new(1, -24, 0.6, 0),
				Position = UDim2.fromScale(0.5, 0.5),
				AnchorPoint = Vector2.new(0.5, 0.5),
			}),
		})
	end
	if win then
		chip("+" .. Theme.formatNumber(payload.payout or 0) .. " GUTS" .. (if payload.hot then "  (2x)" else ""), P.Volt, P.Ink, 1)
		if payload.scoreText then
			chip(payload.scoreText, P.Panel, P.White, 2)
		end
		if payload.medalUp and payload.medal then
			chip(payload.medal:upper() .. " MEDAL", Theme.MedalColor[payload.medal], P.Ink, 3)
		elseif payload.newBest then
			chip("NEW BEST", P.Lime, P.Ink, 3)
		end
	else
		chip("WIPEOUT #" .. tostring(payload.wipeouts or "?"), P.Hot, P.White, 1)
	end

	Theme.tween(scale, 0.32, { Scale = stampFit }, Enum.EasingStyle.Back)
	task.delay(1.9, function()
		if root.Parent then
			Theme.tween(root, 0.4, { Position = UDim2.fromScale(0.5, 0.3) })
			Theme.tween(main, 0.4, { TextTransparency = 1 })
			Theme.tween(shadow, 0.4, { TextTransparency = 1 })
			for _, d in chips:GetDescendants() do
				if d:IsA("Frame") then
					Theme.tween(d, 0.4, { BackgroundTransparency = 1 })
				elseif d:IsA("TextLabel") then
					Theme.tween(d, 0.4, { TextTransparency = 1 })
				end
			end
			task.wait(0.45)
			root:Destroy()
		end
	end)
end

-- Events ----------------------------------------------------------------------------------------

local function onStart(data)
	local def = Config.ChallengeById[data.id]
	State.session = { token = data.token, id = data.id, def = def }
	State.lastStation = data.id
	retryBtn.Visible = false
	Hud.hint(nil)
	table.clear(ui)

	-- Intro card
	local slab = intro:FindFirstChild("Slab") :: Frame
	local grad = slab:FindFirstChildOfClass("UIGradient") :: UIGradient
	grad.Color = ColorSequence.new(def.color, def.color:Lerp(P.Ink, 0.35))
	;(slab:FindFirstChild("Name") :: TextLabel).Text = def.name
	;(slab:FindFirstChild("Tagline") :: TextLabel).Text = def.tagline
	local meta = {}
	if data.hot then
		table.insert(meta, "HOT SEAT 2x GUTS")
	end
	if data.best then
		table.insert(meta, def.bestLabel:upper() .. ": " .. Theme.formatBest(def, data.best))
	end
	if data.medal then
		table.insert(meta, data.medal:upper() .. " MEDAL")
	end
	;(intro:FindFirstChild("Meta") :: TextLabel).Text = table.concat(meta, "   ·   ")
	intro.Visible = true
	slab.Position = UDim2.fromScale(-0.7, 0.42)
	Theme.tween(slab, 0.45, { Position = UDim2.fromScale(0.5, 0.42) }, Enum.EasingStyle.Quint)
	task.delay(data.intro - 0.25, function()
		if State.session and State.session.token == data.token then
			Theme.tween(slab, 0.3, { Position = UDim2.fromScale(1.7, 0.42) }, Enum.EasingStyle.Quint, Enum.EasingDirection.In)
			task.delay(0.3, function()
				intro.Visible = false
			end)
		end
	end)

	letterbox(true)
	Hud.setVisible(false)
	-- frame the shot: behind the player, looking at the challenge
	task.delay(0.1, function()
		local root = player.Character and player.Character:FindFirstChild("HumanoidRootPart") :: BasePart?
		if root and data.focus and State.session and State.session.token == data.token then
			local focus: Vector3 = data.focus
			local flat = Vector3.new(focus.X - root.Position.X, 0, focus.Z - root.Position.Z)
			local dir = if flat.Magnitude > 0.1 then flat.Unit else root.CFrame.LookVector
			local cam = workspace.CurrentCamera
			-- climb higher when the action is below you (e.g. LONG SHOT rings) so your body never hides it
			local lift = if typeof(data.lift) == "number" then data.lift else 6 + math.max(0, root.Position.Y - focus.Y) * 0.55
			local side = if typeof(data.side) == "number" then dir:Cross(Vector3.yAxis) * data.side else Vector3.zero
			cam.CFrame = CFrame.lookAt(root.Position - dir * 13 + side + Vector3.new(0, lift, 0), focus:Lerp(root.Position, 0.35))
		end
	end)
	Effects.fov(Effects.BASE_FOV - 8, 0.8)
	Effects.setMusicDuck(true)
	Effects.blurPulse(10, 0.6)

	-- Panel
	local stroke = panel:FindFirstChildOfClass("UIStroke") :: UIStroke
	stroke.Color = def.color
	nameLabel.Text = def.name
	nameLabel.TextColor3 = def.color
	bigLabel.Text = ""
	subLabel.Text = ""
	primaryBtn.Visible = false
	secondaryBtn.Visible = false
	meterFrame.Visible = false
	lightRow.Visible = false
	dirRow.Visible = false
	bigArrow.Visible = false
	dotRow.Visible = false
	timerFill.Size = UDim2.fromScale(1, 1)
	panel.Visible = true
	-- Movement challenges get a slim panel docked at the top (name, status, timer) so the play
	-- area in the middle of a phone screen stays clear; stand-still challenges keep the full
	-- control panel at the bottom.
	if def.freezePlayer then
		panel.AnchorPoint = Vector2.new(0.5, 1)
		panel.Size = UDim2.fromOffset(560, 236)
		panel.Position = UDim2.new(0.5, 0, 1, 260)
		Theme.tween(panel, 0.5, { Position = UDim2.new(0.5, 0, 1, -24) }, Enum.EasingStyle.Quint)
	else
		panel.AnchorPoint = Vector2.new(0.5, 0)
		panel.Size = UDim2.fromOffset(560, 122)
		panel.Position = UDim2.new(0.5, 0, 0, -200)
		Theme.tween(panel, 0.5, { Position = UDim2.new(0.5, 0, 0, Theme.topInset() + 8) }, Enum.EasingStyle.Quint)
	end
	bindInputs(def)
end

local function onResult(data)
	unbindInputs()
	local wasSession = State.session
	State.session = nil
	hidePanel()
	intro.Visible = false
	Effects.setMusicDuck(false)
	if data.outcome == "cancel" then
		letterbox(false)
		Hud.setVisible(true)
		Effects.fov(Effects.BASE_FOV, 0.4)
		return
	end
	flashLabel.TextTransparency = 1
	flashLabel.Text = ""
	stamp(data)
	if data.outcome == "win" then
		Effects.flash(P.Volt, 0.4, 0.6)
		Effects.fov(Effects.BASE_FOV - 14, 0.25)
		task.delay(0.3, Effects.fov, Effects.BASE_FOV, 1.2)
		Effects.play("Cheer", { volume = 0.25 })
	else
		Effects.flash(P.Hot, 0.5, 0.5)
		Effects.blurPulse(14, 0.4)
	end
	task.delay(1.4, function()
		letterbox(false)
		if not State.session then
			Hud.setVisible(true)
			end
	end)
	if wasSession then
		State.lastStation = wasSession.id
	end
end

local function padFor(id: string): BasePart?
	local world = workspace:FindFirstChild("RiskItWorld")
	local station = world and world:FindFirstChild("Station_" .. id)
	return station and station:FindFirstChild("StartPad") :: BasePart?
end

function ChallengeUI.retry()
	if State.session or not State.lastStation then
		return
	end
	retryBtn.Visible = false
	Net.ChallengeInput:FireServer("retry", { station = State.lastStation })
end

function ChallengeUI.mount(playerGui: PlayerGui)
	gui = new("ScreenGui", {
		Name = "RiskItChallenge",
		ResetOnSpawn = false,
		IgnoreGuiInset = true,
		ZIndexBehavior = Enum.ZIndexBehavior.Sibling,
		DisplayOrder = 10,
		Parent = playerGui,
	})
	for i = 1, 2 do
		bars[i] = new("Frame", {
			Name = "Letterbox" .. i,
			BackgroundColor3 = Color3.new(0, 0, 0),
			Size = UDim2.fromScale(1, 0.11),
			Position = UDim2.fromScale(0, if i == 1 then -0.12 else 1.01),
			Parent = gui,
		})
	end
	stampHolder = new("Frame", { Name = "Stamp", BackgroundTransparency = 1, Size = UDim2.fromScale(1, 1), Parent = gui })
	buildIntro()
	buildPanel()
	buildRetry()

	Net.ChallengeEvent.OnClientEvent:Connect(function(kind: string, data)
		if kind == "start" then
			onStart(data)
		elseif kind == "ui" then
			if State.session and data.token == State.session.token then
				applyUi(data)
			end
		elseif kind == "result" then
			onResult(data)
		elseif kind == "recovered" then
			if State.lastStation and not State.session then
				retryBtn.Visible = State.promptStation == nil
				retryUntil = os.clock() + 9
				local s = retryBtn:FindFirstChildOfClass("UIScale") :: UIScale
				s.Scale = 0.6
				Theme.tween(s, 0.35, { Scale = 1 }, Enum.EasingStyle.Back)
			end
		elseif kind == "hint" then
			Hud.toast(data.text, P.Volt)
		end
	end)

	RunService.RenderStepped:Connect(function()
		-- timer bar
		timerFill.Parent.Visible = ui.timerEnd ~= nil
		if panel.Visible and ui.timerEnd then
			local left = ui.timerEnd - workspace:GetServerTimeNow()
			timerFill.Size = UDim2.fromScale(math.clamp(left / (ui.timerTotal or 12), 0, 1), 1)
			timerFill.BackgroundColor3 = if left < 3 then P.Hot else P.Volt
		end
		-- meter needle
		if meterFrame.Visible and ui.meter then
			local pos = ui.meterStop
			if pos == nil or pos < 0 then
				pos = Config.needle(workspace:GetServerTimeNow() - ui.meter.start, ui.meter.speed)
			end
			meterNeedle.Position = UDim2.fromScale(pos, 0.5)
		end
		-- retry button lifetime: expires, hides once you walk away, and gives way to the RISK IT!
		-- prompt (same action) so there are never two identical buttons on screen
		if retryBtn.Visible and State.promptStation ~= nil then
			retryBtn.Visible = false
		end
		if retryBtn.Visible then
			local pad = State.lastStation and padFor(State.lastStation)
			local root = player.Character and player.Character:FindFirstChild("HumanoidRootPart") :: BasePart?
			if os.clock() > retryUntil or (pad and root and (root.Position - pad.Position).Magnitude > 22) then
				retryBtn.Visible = false
			end
		end
	end)

	-- keep the panel usable on small phones
	-- keep the panel usable on small phones: fit width AND height (a 236px panel is 63% of a
	-- 375px-tall landscape phone, which hides the challenge). 0.7 keeps buttons >= 44px tall.
	local function fit()
		local vp = Theme.viewport()
		panelScale.Scale = math.clamp(math.min((vp.X - 24) / 560, vp.Y * 0.45 / 236), 0.7, 1)
		stampFit = math.clamp(vp.Y / 640, 0.6, 1)
	end
	workspace.CurrentCamera:GetPropertyChangedSignal("ViewportSize"):Connect(fit)
	player:GetAttributeChangedSignal("QAViewport"):Connect(fit)
	fit()
end

return ChallengeUI
