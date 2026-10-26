"""Builds the Open Graph card and apple touch icon from the generated art + site fonts."""
from pathlib import Path
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).parents[1] / "frontend"
FONTS = ROOT / "app" / "fonts"
ART = ROOT / "public" / "art"
TMP = Path("/tmp/fonts"); TMP.mkdir(exist_ok=True)

def ttf(name):
    out = TMP / f"{name}.ttf"
    f = TTFont(FONTS / f"{name}.woff2"); f.flavor = None; f.save(out)
    return str(out)

INK = (5, 5, 5); BONE = (243, 240, 234); EMBER = (255, 91, 31); MUTE = (169, 164, 155)

def og():
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), INK)
    hands = Image.open(ART / "hero_wide.webp").convert("RGBA")
    hw = 1240; hh = round(hands.height * hw / hands.width)
    hands = hands.resize((hw, hh), Image.LANCZOS)
    img.paste(hands, ((W - hw) // 2, 40), hands)
    # spark
    glow = Image.new("RGB", (W, H), (0, 0, 0)); g = ImageDraw.Draw(glow)
    cx, cy = W // 2 + 2, 40 + int(hh * 0.49)
    g.ellipse((cx - 10, cy - 10, cx + 10, cy + 10), fill=(255, 180, 120))
    glow = glow.filter(ImageFilter.GaussianBlur(14))
    img = Image.composite(img, img, Image.new("L", (W, H), 255))
    img = Image.fromarray(__import__("numpy").clip(__import__("numpy").asarray(img).astype(int) + __import__("numpy").asarray(glow).astype(int), 0, 255).astype("uint8"))
    d = ImageDraw.Draw(img)
    big = ImageFont.truetype(ttf("CabinetGrotesk-800"), 150)
    ser = ImageFont.truetype(ttf("Zodiak-400i"), 40)
    mono = ImageFont.truetype(ttf("Satoshi-500"), 20)
    d.text((56, H - 70), "khai huynh", font=big, fill=BONE, anchor="ls")
    tag_x = 56 + d.textlength("khai huynh", font=big) + 36
    d.text((tag_x, H - 118), "i build things", font=ser, fill=BONE, anchor="ls")
    d.text((tag_x, H - 72), "& scale products.", font=ser, fill=EMBER, anchor="ls")
    d.ellipse((58, 46, 70, 58), fill=EMBER)
    d.text((84, 59), "KHAIGPT.VERCEL.APP", font=mono, fill=MUTE, anchor="ls")
    img.save(ROOT / "public" / "og.jpg", "JPEG", quality=88, optimize=True, progressive=True)

def apple_icon():
    S = 180
    img = Image.new("RGB", (S, S), INK)
    tall = Image.open(ART / "hero_tall.webp").convert("RGBA")
    h = 300; w = round(tall.width * h / tall.height)
    tall = tall.resize((w, h), Image.LANCZOS)
    img.paste(tall, ((S - w) // 2, (S - h) // 2), tall)
    img.save(ROOT / "app" / "apple-icon.png", "PNG", optimize=True)

og(); apple_icon(); print("ok")
