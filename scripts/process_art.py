"""Luma-key generated chrome renders (on pure black) into trimmed alpha WebP assets."""
import json
from pathlib import Path

import numpy as np
from PIL import Image

SRC = Path(__file__).parent / "art_src"
OUT = Path(__file__).parents[1] / "frontend" / "public" / "art"
OUT.mkdir(parents=True, exist_ok=True)

# name -> (max_side, pad_ratio, trim_x)
ASSETS = {
    "hero_wide": (1600, 0.04, False),
    "hero_tall": (1200, 0.03, False),
    "about_wings": (1100, 0.04, True),
    "work_promer": (900, 0.05, True),
    "work_substack": (900, 0.05, True),
    "work_nakame": (900, 0.05, True),
    "work_consulting": (900, 0.05, True),
    "work_playsipher": (900, 0.05, True),
    "work_mckinsey": (900, 0.05, True),
    "work_betteru": (900, 0.05, True),
    "writing_quill": (1000, 0.05, True),
    "ask_bubble": (900, 0.05, True),
    "hi_wave": (900, 0.05, True),
}


def feather_rect(shape, x0, y0, x1, y1, f=24):
    h, w = shape
    yy, xx = np.mgrid[0:h, 0:w]
    dx = np.minimum(xx - x0, x1 - xx)
    dy = np.minimum(yy - y0, y1 - yy)
    return np.clip(np.minimum(dx, dy) / f, 0, 1)


def kill_regions(name, rgb):
    """Remove stray studio softboxes some renders leaked into frame."""
    if name == "work_nakame":
        h, w, _ = rgb.shape
        m = np.maximum.reduce([
            feather_rect((h, w), -100, -100, w + 100, 250),
            feather_rect((h, w), -100, -100, 140, 290),
            feather_rect((h, w), 930, -100, w + 100, 330),
        ])
        rgb *= (1 - m)[..., None]
    return rgb


def process(name, max_side, pad_ratio, trim_x):
    img = Image.open(SRC / f"{name}.jpg").convert("RGB")
    rgb = np.asarray(img).astype(np.float32) / 255.0
    rgb = kill_regions(name, rgb)
    lum = rgb.max(axis=2)
    a = np.clip((lum - 0.018) / 0.2, 0, 1) ** 0.85
    col = np.where(a[..., None] > 1e-3, np.clip(rgb / np.maximum(a[..., None], 1e-3), 0, 1), 0)

    solid = a > 0.12
    ys = np.where(solid.sum(axis=1) > 3)[0]
    xs = np.where(solid.sum(axis=0) > 3)[0]
    h, w = a.shape
    y0, y1 = ys.min(), ys.max()
    x0, x1 = (xs.min(), xs.max()) if trim_x else (0, w - 1)
    pad = int(max(y1 - y0, x1 - x0) * pad_ratio)
    y0, y1 = max(0, y0 - pad), min(h, y1 + pad)
    if trim_x:
        x0, x1 = max(0, x0 - pad), min(w, x1 + pad)
    else:
        x1 = w

    rgba = np.dstack([col, a])[y0:y1, x0:x1]
    out = Image.fromarray((rgba * 255).round().astype(np.uint8), "RGBA")
    scale = min(1.0, max_side / max(out.size))
    if scale < 1:
        out = out.resize((round(out.width * scale), round(out.height * scale)), Image.LANCZOS)
    out.save(OUT / f"{name}.webp", "WEBP", quality=84, alpha_quality=92, method=6)
    size = (OUT / f"{name}.webp").stat().st_size // 1024
    return {"w": out.width, "h": out.height, "kb": size, "crop": [int(x0), int(y0), int(x1), int(y1)], "src": [w, h]}


if __name__ == "__main__":
    meta = {n: process(n, *cfg) for n, cfg in ASSETS.items()}
    print(json.dumps(meta, indent=1))
