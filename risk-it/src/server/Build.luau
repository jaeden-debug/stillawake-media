-- Small helpers for building the arena procedurally.
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Config = require(ReplicatedStorage:WaitForChild("RiskIt").Config)

local Build = {}

Build.HeavyFont = Font.new("rbxasset://fonts/families/BuilderSans.json", Enum.FontWeight.ExtraBold, Enum.FontStyle.Italic)
Build.BodyFont = Font.new("rbxasset://fonts/families/BuilderSans.json", Enum.FontWeight.Bold)

export type PartProps = {
	name: string?,
	size: Vector3,
	cf: CFrame,
	color: Color3?,
	material: Enum.Material?,
	shape: Enum.PartType?,
	transparency: number?,
	reflectance: number?,
	collide: boolean?,
	anchored: boolean?,
	parent: Instance?,
	castShadow: boolean?,
}

function Build.part(p: PartProps): Part
	local part = Instance.new("Part")
	part.Name = p.name or "Part"
	if p.shape then
		part.Shape = p.shape
	end
	part.Size = p.size
	part.CFrame = p.cf
	part.Color = p.color or Config.Palette.Floor
	part.Material = p.material or Enum.Material.SmoothPlastic
	part.Transparency = p.transparency or 0
	part.Reflectance = p.reflectance or 0
	part.Anchored = if p.anchored == nil then true else p.anchored
	part.CanCollide = if p.collide == nil then true else p.collide
	part.CastShadow = if p.castShadow == nil then true else p.castShadow
	part.TopSurface = Enum.SurfaceType.Smooth
	part.BottomSurface = Enum.SurfaceType.Smooth
	if not part.CanCollide then
		part.CanQuery = false
		part.CanTouch = false
	end
	part.Parent = p.parent
	return part
end

function Build.neon(size: Vector3, cf: CFrame, color: Color3, parent: Instance, shape: Enum.PartType?): Part
	return Build.part({
		name = "Neon",
		size = size,
		cf = cf,
		color = color,
		material = Enum.Material.Neon,
		collide = false,
		castShadow = false,
		parent = parent,
		shape = shape,
	})
end

-- Flat disc whose top surface sits at `top` (cylinders lie along X, so rotate).
function Build.disc(center: Vector3, radius: number, thickness: number, color: Color3, parent: Instance, material: Enum.Material?): Part
	return Build.part({
		name = "Disc",
		shape = Enum.PartType.Cylinder,
		size = Vector3.new(thickness, radius * 2, radius * 2),
		cf = CFrame.new(center - Vector3.new(0, thickness / 2, 0)) * CFrame.Angles(0, 0, math.rad(90)),
		color = color,
		material = material or Enum.Material.SmoothPlastic,
		reflectance = 0.08,
		parent = parent,
	})
end

function Build.ring(center: Vector3, radius: number, width: number, color: Color3, parent: Instance)
	-- a thin neon rim slightly larger than a disc reads as a clean light strip
	return Build.part({
		name = "Rim",
		shape = Enum.PartType.Cylinder,
		size = Vector3.new(0.4, (radius + width) * 2, (radius + width) * 2),
		cf = CFrame.new(center - Vector3.new(0, 0.25, 0)) * CFrame.Angles(0, 0, math.rad(90)),
		color = color,
		material = Enum.Material.Neon,
		collide = false,
		castShadow = false,
		parent = parent,
	})
end

-- A SurfaceGui sign. face = which face of the board shows the text.
function Build.sign(
	board: BasePart,
	face: Enum.NormalId,
	title: string,
	subtitle: string?,
	color: Color3,
	pixelsPerStud: number?
): SurfaceGui
	local gui = Instance.new("SurfaceGui")
	gui.Face = face
	gui.SizingMode = Enum.SurfaceGuiSizingMode.PixelsPerStud
	gui.PixelsPerStud = pixelsPerStud or 24
	gui.LightInfluence = 0
	gui.Brightness = 2.2
	gui.MaxDistance = 600
	gui.ResetOnSpawn = false

	local titleLabel = Instance.new("TextLabel")
	titleLabel.Name = "Title"
	titleLabel.BackgroundTransparency = 1
	titleLabel.Size = UDim2.fromScale(1, subtitle and 0.56 or 1)
	titleLabel.FontFace = Build.HeavyFont
	titleLabel.Text = title
	titleLabel.TextScaled = true
	titleLabel.TextColor3 = Config.Palette.White
	local stroke = Instance.new("UIStroke")
	stroke.Color = color
	stroke.Thickness = 4
	stroke.Parent = titleLabel
	titleLabel.Parent = gui

	if subtitle then
		local sub = Instance.new("TextLabel")
		sub.Name = "Subtitle"
		sub.BackgroundTransparency = 1
		sub.Position = UDim2.fromScale(0.04, 0.57)
		sub.Size = UDim2.fromScale(0.92, 0.2)
		sub.FontFace = Build.BodyFont
		sub.Text = subtitle
		sub.TextScaled = true
		sub.TextColor3 = color
		sub.Parent = gui
	end
	gui.Parent = board
	return gui
end

function Build.light(parent: BasePart, color: Color3, range: number, brightness: number, kind: string?)
	local l: Light
	if kind == "spot" then
		local s = Instance.new("SpotLight")
		s.Angle = 50
		s.Face = Enum.NormalId.Bottom
		l = s
	else
		l = Instance.new("PointLight")
	end
	l.Color = color
	l.Range = range
	l.Brightness = brightness
	l.Shadows = false
	l.Parent = parent
	return l
end

return Build
