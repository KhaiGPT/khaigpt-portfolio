"""Head-and-shoulders portrait for the About section.

Input: scripts/art_src/khai_cutout.png (background removed with rembg `birefnet-portrait`
from khai_photo.jpg). Output: frontend/public/art/khai.webp — transparent, lightly graded,
with an ember rim on the left and an ice rim on the right to match the chrome hands.
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).parent
SRC = ROOT / "art_src" / "khai_cutout.png"
OUT = ROOT.parent / "frontend" / "public" / "art" / "khai.webp"
CROP = (175, 0, 625, 450)  # crown to just under the shoulders
SIZE = 900

im = Image.open(SRC).convert("RGBA").crop(CROP)
im = im.resize((SIZE, SIZE), Image.LANCZOS)
rgb, alpha = im.convert("RGB"), im.getchannel("A")

# grade: a touch more contrast, a little less colour, cool shadows
rgb = ImageEnhance.Contrast(rgb).enhance(1.08)
rgb = ImageEnhance.Color(rgb).enhance(0.86)
a = np.asarray(rgb).astype(np.float32) / 255
lum = a.mean(axis=2, keepdims=True)
a = a + (1 - lum) * np.array([-0.012, 0.0, 0.03]) * 1.4

# rim light: the outer band of the silhouette, ember from the left, ice from the right
m = np.asarray(alpha).astype(np.float32) / 255
inner = np.asarray(alpha.filter(ImageFilter.MinFilter(15)).filter(ImageFilter.GaussianBlur(6))).astype(np.float32) / 255
rim = np.clip(m - inner, 0, 1)[..., None]
x = np.linspace(0, 1, SIZE)[None, :, None]
ember, ice = np.array([1.0, 0.42, 0.16]), np.array([0.62, 0.8, 1.0])
tint = ember * np.clip(1 - x * 1.7, 0, 1) + ice * np.clip(x * 1.7 - 0.7, 0, 1)
a = 1 - (1 - a) * (1 - rim * tint * 0.85)  # screen blend

out = Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))
out.putalpha(alpha)
out.save(OUT, "WEBP", quality=86, method=6)
print(OUT, out.size, OUT.stat().st_size // 1024, "KB")
