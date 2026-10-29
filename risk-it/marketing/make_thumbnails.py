#!/usr/bin/env python3
"""Build RISK IT! store art from real in-game captures (marketing/captures).

Outputs (marketing/out):
  thumb-1-main.png ... thumb-5-*.png   1920x1080 landscape thumbnails (Roblox carousel)
  icon-1024.png, icon-512.png           square experience icon
Text uses BuilderSans (ships with Roblox Studio) so the art matches the game's UI font.
"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
CAP = os.path.join(HERE, "captures")
OUT = os.path.join(HERE, "out")
FONTS = "/Applications/RobloxStudio.app/Contents/Resources/content/fonts"
HEAVY = os.path.join(FONTS, "BuilderSans-ExtraBold.otf")
BOLD = os.path.join(FONTS, "BuilderSans-Bold.otf")

HOT = (255, 46, 99)
VOLT = (255, 214, 10)
INK = (10, 10, 16)
WHITE = (250, 250, 255)
CYAN = (0, 229, 255)
ORANGE = (255, 120, 30)


def cover(img, w, h, focus=(0.5, 0.5), zoom=1.0):
    """Scale to cover w x h (times zoom) and crop around a focus point (0..1)."""
    s = max(w / img.width, h / img.height) * zoom
    img = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
    fx = int((img.width - w) * focus[0])
    fy = int((img.height - h) * focus[1])
    return img.crop((fx, fy, fx + w, fy + h))


def text_layer(text, font, fill, stroke=0, stroke_fill=None, slant=0.18, shadow=None):
    """Render text on its own layer, with an italic slant and optional drop shadow."""
    bbox = font.getbbox(text, stroke_width=stroke)
    w, h = bbox[2] - bbox[0] + 40, bbox[3] - bbox[1] + 40
    pad = int(h * slant) + 20
    layer = Image.new("RGBA", (w + pad, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.text((20 + pad - bbox[0], 20 - bbox[1]), text, font=font, fill=fill, stroke_width=stroke, stroke_fill=stroke_fill)
    if slant:
        layer = layer.transform(layer.size, Image.AFFINE, (1, slant, -slant * h, 0, 1, 0), resample=Image.BICUBIC)
    if shadow:
        offset, alpha = shadow
        sh = Image.new("RGBA", layer.size, (0, 0, 0, 0))
        sh.paste((0, 0, 0, alpha), (0, 0), layer.split()[3])
        sh = sh.filter(ImageFilter.GaussianBlur(6))
        out = Image.new("RGBA", (layer.width + offset, layer.height + offset), (0, 0, 0, 0))
        out.alpha_composite(sh, (offset, offset))
        out.alpha_composite(layer, (0, 0))
        layer = out
    return layer.crop(layer.getbbox())


def wordmark(size):
    """The RISK IT! logo: hot-pink fill, thick white outline, ink drop shadow."""
    font = ImageFont.truetype(HEAVY, size)
    return text_layer("RISK IT!", font, HOT, stroke=max(4, size // 14), stroke_fill=WHITE, shadow=(size // 12, 200))


def slab(text, size, fill, color, pad=(34, 14), slant=0.18):
    font = ImageFont.truetype(HEAVY, size)
    t = text_layer(text, font, color, slant=0)
    w, h = t.width + pad[0] * 2, t.height + pad[1] * 2
    s = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(s)
    d.rounded_rectangle((0, 0, w - 1, h - 1), radius=h // 2, fill=fill)
    s.alpha_composite(t, (pad[0], pad[1]))
    if slant:
        sk = int(h * slant)
        big = Image.new("RGBA", (w + sk, h), (0, 0, 0, 0))
        big.alpha_composite(s, (sk, 0))
        s = big.transform(big.size, Image.AFFINE, (1, slant, -slant * h, 0, 1, 0), resample=Image.BICUBIC)
        s = s.crop(s.getbbox())
    return s


def side_fade(img, side="left", strength=235, width=0.62):
    w, h = img.size
    grad = Image.new("L", (w, 1))
    for x in range(w):
        t = x / w if side == "left" else 1 - x / w
        a = max(0.0, 1 - t / width)
        grad.putpixel((x, 0), int(strength * (a ** 1.4)))
    grad = grad.resize((w, h))
    shade = Image.new("RGBA", (w, h), INK + (0,))
    shade.putalpha(grad)
    out = img.convert("RGBA")
    out.alpha_composite(shade)
    return out


def bottom_fade(img, strength=220, height=0.5):
    w, h = img.size
    grad = Image.new("L", (1, h))
    for y in range(h):
        t = (h - y) / h
        a = max(0.0, 1 - t / height)
        grad.putpixel((0, y), int(strength * (a ** 1.3)))
    grad = grad.resize((w, h))
    shade = Image.new("RGBA", (w, h), INK + (0,))
    shade.putalpha(grad)
    out = img.convert("RGBA")
    out.alpha_composite(shade)
    return out


def vignette(img, strength=120):
    w, h = img.size
    m = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(m)
    d.ellipse((-w * 0.15, -h * 0.25, w * 1.15, h * 1.25), fill=255)
    m = m.filter(ImageFilter.GaussianBlur(w // 8))
    shade = Image.new("RGBA", (w, h), INK + (strength,))
    shade.putalpha(Image.eval(m, lambda v: int(strength * (1 - v / 255))))
    img.alpha_composite(shade)
    return img


def save(img, name):
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, name)
    img.convert("RGB").save(path, "PNG", optimize=True)
    print("wrote", name, img.size)


def landscape(capture, headline, sub, focus=(0.5, 0.5), side="left", chip=None, zoom=1.0):
    base = cover(Image.open(os.path.join(CAP, capture)).convert("RGB"), 1920, 1080, focus, zoom)
    img = side_fade(base, side, strength=245, width=0.75)
    img = bottom_fade(img, 120, 0.35)
    img = vignette(img, 90)
    x = 96 if side == "left" else None
    mark = wordmark(150)
    head = text_layer(headline, ImageFont.truetype(HEAVY, 92), WHITE, stroke=0, shadow=(6, 180))
    tag = slab(sub, 46, VOLT, INK)
    block_w = max(mark.width, head.width, tag.width)
    if side == "right":
        x = 1920 - 96 - block_w
    y = 300
    img.alpha_composite(mark, (x, y))
    img.alpha_composite(head, (x + 6, y + mark.height + 22))
    img.alpha_composite(tag, (x + 6, y + mark.height + head.height + 58))
    if chip:
        c = slab(chip, 34, HOT, WHITE, pad=(26, 10))
        img.alpha_composite(c, (x + 6, y - c.height - 26))
    return img


def main():
    # 1 — main: a real fail launch with the Full Spectrum trail
    save(landscape("launch-full-spectrum.jpg", "GET LAUNCHED.", "TRY AGAIN.", focus=(0.33, 0.43), chip="8 CHALLENGES", zoom=1.6), "thumb-1-main.png")
    # 2 — LONG SHOT flight
    save(landscape("long-shot-flight.jpg", "GET FIRED OUT", "HIT THE RING", focus=(0.27, 0.55), side="left", zoom=1.3), "thumb-2-long-shot.png")
    # 3 — THE BUTTON
    save(landscape("the-button-panel.jpg", "PRESS YOUR LUCK", "EVERY PRESS x2", focus=(0.09, 0.12), side="left", zoom=1.5), "thumb-3-the-button.png")
    # 4 — MELTDOWN
    save(landscape("meltdown-tiles.jpg", "THE FLOOR IS LEAVING", "SURVIVE 15s", focus=(0.06, 0.74), side="left", zoom=1.4), "thumb-4-meltdown.png")
    # 5 — winning: confetti + GUTS
    save(landscape("win-banked-it.jpg", "BANK YOUR GUTS", "FAIL IN STYLE", focus=(0.06, 0.3), side="left", zoom=1.4), "thumb-5-win.png")

    # Square icon: designed, not a screenshot — it has to read at ~150px in Discover.
    S = 1024
    icon = Image.new("RGBA", (S, S), INK + (255,))
    bg = ImageDraw.Draw(icon)
    for y in range(S):  # night sky to hot-pink horizon
        t = y / (S - 1)
        top, bottom = (24, 8, 48), (120, 18, 70)
        c = tuple(int(top[i] * (1 - t) + bottom[i] * t) for i in range(3))
        bg.line([(0, y), (S, y)], fill=c + (255,))
    # synthwave floor grid in perspective
    horizon = 640
    grid = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    g = ImageDraw.Draw(grid)
    for i in range(-12, 13):
        g.line([(S / 2 + i * 26, horizon), (S / 2 + i * 220, S)], fill=(255, 60, 200, 170), width=4)
    y, step = horizon, 10
    while y < S:
        g.line([(0, y), (S, y)], fill=(255, 60, 200, 150), width=4)
        step *= 1.32
        y += step
    icon.alpha_composite(grid)
    bg.rectangle((0, horizon - 3, S, horizon + 3), fill=HOT + (255,))
    # rainbow launch arc (the game's Full Spectrum trail)
    arc = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    a = ImageDraw.Draw(arc)
    colors = [HOT, ORANGE, VOLT, (80, 255, 120), CYAN, (150, 90, 255)]
    for k, c in enumerate(colors):
        off = k * 16
        a.arc((-260 + off, 330 + off, 980 - off, 1500 - off), start=200, end=292, fill=c + (255,), width=18)
    arc = arc.filter(ImageFilter.GaussianBlur(1.2))
    glow = arc.filter(ImageFilter.GaussianBlur(18))
    icon.alpha_composite(glow)
    icon.alpha_composite(arc)
    f = ImageFont.truetype(HEAVY, 340)
    risk = text_layer("RISK", f, WHITE, stroke=24, stroke_fill=INK, shadow=(20, 230))
    it = text_layer("IT!", f, VOLT, stroke=24, stroke_fill=INK, shadow=(20, 230))
    icon.alpha_composite(risk, ((S - risk.width) // 2, 120))
    icon.alpha_composite(it, ((S - it.width) // 2 + 40, 120 + risk.height - 50))
    save(icon, "icon-1024.png")
    save(icon.resize((512, 512), Image.LANCZOS), "icon-512.png")


if __name__ == "__main__":
    main()
