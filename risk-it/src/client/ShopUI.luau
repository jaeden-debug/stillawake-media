-- THE VAULT: cosmetic shop UI. Spend GUTS on fail trails and launch bursts. The server validates
-- every purchase; this screen only renders the catalog and sends requests.
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UserInputService = game:GetService("UserInputService")

local Shared = ReplicatedStorage:WaitForChild("RiskIt")
local Config = require(Shared:WaitForChild("Config"))
local Net = require(Shared:WaitForChild("Net"))
local Theme = require(script.Parent.Theme)
local State = require(script.Parent.State)

local P = Theme.P
local new = Theme.new

local ShopUI = {}

local gui: ScreenGui
local modal: Frame
local grid: ScrollingFrame
local balance: TextLabel
local tabs: { [string]: TextButton } = {}
local openButton: TextButton
local currentKind = "trail"
local isOpen = false

local KINDS = { { id = "trail", label = "FAIL TRAILS" }, { id = "burst", label = "LAUNCH BURSTS" } }

local BURST_COLORS = {
	burst_none = { P.Muted, P.Panel },
	burst_confetti = { P.Hot, P.Volt },
	burst_stars = { P.Volt, P.White },
	burst_smoke = { P.White, P.Muted },
	burst_lightning = { P.Cyan, P.White },
}

local function previewSequence(item): ColorSequence
	if item.rainbow then
		return ColorSequence.new({
			ColorSequenceKeypoint.new(0, P.Hot),
			ColorSequenceKeypoint.new(0.25, P.Volt),
			ColorSequenceKeypoint.new(0.5, P.Lime),
			ColorSequenceKeypoint.new(0.75, P.Cyan),
			ColorSequenceKeypoint.new(1, P.Violet),
		})
	elseif item.colors then
		return ColorSequence.new(item.colors[1], item.colors[2])
	elseif item.kind == "trail" then
		return ColorSequence.new(P.Hot, P.Cyan) -- "matches the challenge"
	end
	local c = BURST_COLORS[item.id] or { P.White, P.White }
	return ColorSequence.new(c[1], c[2])
end

local function request(action: string, itemId: string)
	Net.ShopRequest:FireServer(action, itemId)
end

local function render()
	if not grid then
		return
	end
	local profile = State.profile
	for _, c in grid:GetChildren() do
		if c:IsA("Frame") then
			c:Destroy()
		end
	end
	if not profile then
		return
	end
	balance.Text = Theme.formatNumber(profile.guts) .. " GUTS"
	for id, tab in tabs do
		tab.BackgroundColor3 = if id == currentKind then P.Hot else P.Panel
	end

	local order = 0
	for _, item in Config.Shop do
		if item.kind ~= currentKind then
			continue
		end
		order += 1
		local owned = profile.owned and profile.owned[item.id]
		local equipped = profile.equipped and profile.equipped[item.kind] == item.id
		local affordable = profile.guts >= item.price

		local card = new("Frame", {
			Name = item.id,
			LayoutOrder = order,
			BackgroundColor3 = P.Panel,
			Parent = grid,
		}, {
			Theme.corner(16),
			Theme.stroke(if equipped then P.Volt else Color3.fromRGB(50, 50, 70), if equipped then 2.5 else 1),
		})
		-- preview: a glowing streak for trails, an orb for bursts
		local preview = new("Frame", {
			BackgroundColor3 = P.White,
			Position = UDim2.fromOffset(14, 14),
			Size = if item.kind == "trail" then UDim2.new(1, -28, 0, 18) else UDim2.fromOffset(46, 46),
			Parent = card,
		}, {
			Theme.corner(UDim.new(0.5, 0)),
			new("UIGradient", { Color = previewSequence(item), Rotation = if item.kind == "trail" then 0 else 45 }),
		})
		Theme.label({
			Text = item.name:upper(),
			FontFace = Theme.Display,
			TextXAlignment = Enum.TextXAlignment.Left,
			Position = UDim2.fromOffset(14, if item.kind == "trail" then 42 else 68),
			Size = UDim2.new(1, -28, 0, 22),
			Parent = card,
		})
		Theme.label({
			Text = item.desc,
			FontFace = Theme.Body,
			TextColor3 = P.Muted,
			TextXAlignment = Enum.TextXAlignment.Left,
			TextWrapped = true,
			Position = UDim2.fromOffset(14, if item.kind == "trail" then 66 else 92),
			Size = UDim2.new(1, -28, 0, 16),
			Parent = card,
		})
		local label, fill, textColor, action
		if equipped then
			label, fill, textColor = "EQUIPPED", Color3.fromRGB(40, 40, 56), P.Volt
		elseif owned then
			label, fill, textColor, action = "EQUIP", P.Cyan, P.Ink, "equip"
		elseif affordable then
			label, fill, textColor, action = "BUY  " .. Theme.formatNumber(item.price) .. " G", P.Volt, P.Ink, "buy"
		else
			label, fill, textColor = Theme.formatNumber(item.price) .. " G", Color3.fromRGB(40, 40, 56), P.Muted
		end
		local btn = new("TextButton", {
			AutoButtonColor = action ~= nil,
			BackgroundColor3 = fill,
			AnchorPoint = Vector2.new(0, 1),
			Position = UDim2.new(0, 14, 1, -12),
			Size = UDim2.new(1, -28, 0, 44),
			Text = "",
			Parent = card,
		}, {
			Theme.corner(UDim.new(0.5, 0)),
			Theme.label({
				Text = label,
				FontFace = Theme.Heavy,
				TextColor3 = textColor,
				Size = UDim2.new(1, -20, 0.55, 0),
				Position = UDim2.fromScale(0.5, 0.5),
				AnchorPoint = Vector2.new(0.5, 0.5),
			}),
		})
		if action then
			btn.Activated:Connect(function()
				request(action, item.id)
			end)
		end
	end
end

function ShopUI.setOpen(open: boolean)
	if not modal or State.session then
		open = false
	end
	isOpen = open
	if not modal then
		return
	end
	if open then
		render()
		modal.Visible = true
		local s = modal:FindFirstChildOfClass("UIScale") :: UIScale
		-- Never shrink the Vault (tap targets would drop below 44px); on small screens it takes the
		-- available space under the top bar and the grid scrolls instead.
		local vp = Theme.viewport()
		local availY = vp.Y - Theme.topInset()
		local h = math.min(520, availY - 16)
		modal.Size = UDim2.fromOffset(math.min(660, vp.X - 24), h)
		-- short screens: drop the subtitle and pull tabs + grid up so a full card row is visible
		local compact = h < 420
		(modal:FindFirstChild("Subtitle") :: TextLabel).Visible = not compact
		;(modal:FindFirstChild("Tabs") :: Frame).Position = UDim2.fromOffset(28, if compact then 64 else 96)
		grid.Position = UDim2.fromOffset(28, if compact then 118 else 150)
		grid.Size = UDim2.new(1, -56, 1, if compact then -130 else -172)
		s.Scale = 0.9
		Theme.tween(s, 0.3, { Scale = 1 }, Enum.EasingStyle.Back)
	else
		modal.Visible = false
	end
end

function ShopUI.mount(playerGui: PlayerGui)
	gui = new("ScreenGui", {
		Name = "RiskItShop",
		ResetOnSpawn = false,
		ZIndexBehavior = Enum.ZIndexBehavior.Sibling,
		DisplayOrder = 20,
		Parent = playerGui,
	})

	openButton = new("TextButton", {
		Name = "OpenShop",
		AutoButtonColor = true,
		BackgroundColor3 = P.Volt,
		AnchorPoint = Vector2.new(1, 0),
		Position = UDim2.new(1, -16, 0, 8),
		Size = UDim2.fromOffset(118, 46),
		Text = "",
		Parent = gui,
	}, {
		Theme.corner(UDim.new(0.5, 0)),
		Theme.label({
			Text = "VAULT",
			FontFace = Theme.Display,
			TextColor3 = P.Ink,
			Size = UDim2.new(1, -28, 0.5, 0),
			Position = UDim2.fromScale(0.5, 0.5),
			AnchorPoint = Vector2.new(0.5, 0.5),
		}),
	})
	openButton.Activated:Connect(function()
		ShopUI.setOpen(not isOpen)
	end)

	modal = new("Frame", {
		Name = "Vault",
		BackgroundColor3 = P.Ink,
		BackgroundTransparency = 0.04,
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.fromScale(0.5, 0.5),
		Size = UDim2.fromOffset(660, 520),
		Visible = false,
		Parent = gui,
	}, {
		Theme.corner(24),
		Theme.stroke(P.Volt, 2, 0.2),
		new("UIScale"),
	})
	Theme.label({
		Text = "THE VAULT",
		FontFace = Theme.Display,
		TextColor3 = P.Volt,
		TextXAlignment = Enum.TextXAlignment.Left,
		Position = UDim2.fromOffset(28, 22),
		Size = UDim2.fromOffset(300, 40),
		Parent = modal,
	})
	Theme.label({
		Name = "Subtitle",
		Text = "Cosmetic only. Wipe out in style.",
		FontFace = Theme.Bold,
		TextColor3 = P.Muted,
		TextXAlignment = Enum.TextXAlignment.Left,
		Position = UDim2.fromOffset(28, 62),
		Size = UDim2.fromOffset(300, 18),
		Parent = modal,
	})
	balance = Theme.label({
		Text = "0 GUTS",
		FontFace = Theme.Heavy,
		TextColor3 = P.White,
		TextXAlignment = Enum.TextXAlignment.Right,
		AnchorPoint = Vector2.new(1, 0),
		Position = UDim2.new(1, -80, 0, 30),
		Size = UDim2.fromOffset(220, 26),
		Parent = modal,
	})
	local close = new("TextButton", {
		Name = "Close",
		BackgroundColor3 = P.Panel,
		AnchorPoint = Vector2.new(1, 0),
		Position = UDim2.new(1, -22, 0, 22),
		Size = UDim2.fromOffset(48, 48),
		Text = "",
		Parent = modal,
	}, {
		Theme.corner(UDim.new(0.5, 0)),
		Theme.label({ Text = "X", FontFace = Theme.Heavy, Size = UDim2.fromScale(0.5, 0.5), Position = UDim2.fromScale(0.25, 0.25) }),
	})
	close.Activated:Connect(function()
		ShopUI.setOpen(false)
	end)

	local tabRow = new("Frame", {
		Name = "Tabs",
		BackgroundTransparency = 1,
		Position = UDim2.fromOffset(28, 96),
		Size = UDim2.new(1, -56, 0, 44),
		Parent = modal,
	}, {
		new("UIListLayout", { FillDirection = Enum.FillDirection.Horizontal, Padding = UDim.new(0, 10), SortOrder = Enum.SortOrder.LayoutOrder }),
	})
	for i, k in KINDS do
		local t = new("TextButton", {
			LayoutOrder = i,
			BackgroundColor3 = P.Panel,
			Size = UDim2.fromOffset(180, 44),
			Text = "",
			Parent = tabRow,
		}, {
			Theme.corner(UDim.new(0.5, 0)),
			Theme.label({
				Text = k.label,
				FontFace = Theme.Heavy,
				Size = UDim2.new(1, -24, 0.5, 0),
				Position = UDim2.fromScale(0.5, 0.5),
				AnchorPoint = Vector2.new(0.5, 0.5),
			}),
		})
		t.Activated:Connect(function()
			currentKind = k.id
			grid.CanvasPosition = Vector2.zero -- new tab starts at the top
			render()
		end)
		tabs[k.id] = t
	end

	grid = new("ScrollingFrame", {
		Name = "Grid",
		BackgroundTransparency = 1,
		Position = UDim2.fromOffset(28, 150),
		Size = UDim2.new(1, -56, 1, -172),
		CanvasSize = UDim2.new(),
		AutomaticCanvasSize = Enum.AutomaticSize.Y,
		ScrollBarThickness = 4,
		ScrollBarImageColor3 = P.Volt,
		Parent = modal,
	}, {
		new("UIGridLayout", {
			CellSize = UDim2.fromOffset(190, 172),
			CellPadding = UDim2.fromOffset(12, 12),
			SortOrder = Enum.SortOrder.LayoutOrder,
		}),
	})

	-- hidden during challenges so nothing overlaps the cinematic
	game:GetService("RunService").Heartbeat:Connect(function()
		local inChallenge = State.session ~= nil
		openButton.Visible = not inChallenge
		if inChallenge and isOpen then
			ShopUI.setOpen(false)
		end
	end)
	State.ProfileChanged:Connect(function()
		if isOpen then
			render()
		end
	end)
	UserInputService.InputBegan:Connect(function(input, processed)
		if processed then
			return
		end
		if input.KeyCode == Enum.KeyCode.V then
			ShopUI.setOpen(not isOpen)
		elseif input.KeyCode == Enum.KeyCode.Escape and isOpen then
			ShopUI.setOpen(false)
		end
	end)
end


return ShopUI
