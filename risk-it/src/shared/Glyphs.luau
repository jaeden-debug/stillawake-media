-- Asset-free UI glyphs built from frames (crisp at any size, work in ScreenGui and SurfaceGui).
local Glyphs = {}

Glyphs.Rotation = { up = 0, right = 90, down = 180, left = 270 }

-- A chevron arrow ("^" rotated to `dir`) filling its parent. Returns the container.
function Glyphs.chevron(parent: GuiObject, dir: string, color: Color3, thickness: number?): Frame
	local holder = Instance.new("Frame")
	holder.Name = "Chevron"
	holder.BackgroundTransparency = 1
	holder.AnchorPoint = Vector2.new(0.5, 0.5)
	holder.Position = UDim2.fromScale(0.5, 0.5)
	holder.Size = UDim2.fromScale(0.62, 0.62)
	holder.Rotation = Glyphs.Rotation[dir] or 0
	local ratio = Instance.new("UIAspectRatioConstraint")
	ratio.Parent = holder
	for _, side in { -1, 1 } do
		local bar = Instance.new("Frame")
		bar.BorderSizePixel = 0
		bar.BackgroundColor3 = color
		bar.AnchorPoint = Vector2.new(0.5, 0.5)
		bar.Size = UDim2.fromScale(0.72, thickness or 0.2)
		-- the two strokes meet at the top centre
		bar.Position = UDim2.fromScale(0.5 + side * 0.22, 0.42)
		bar.Rotation = side * 45
		local corner = Instance.new("UICorner")
		corner.CornerRadius = UDim.new(0.5, 0)
		corner.Parent = bar
		bar.Parent = holder
	end
	holder.Parent = parent
	return holder
end

return Glyphs
