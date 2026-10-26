"""Cut the Seedance hands clip into the WebP frame sequence the hero scrubs on scroll.

Usage: python3 scripts/video_src/make_frames.py   (needs ffmpeg on PATH)
Writes frontend/public/hero/{d,m}/NNN.webp — every 2nd frame up to the flash peak,
cropped to the band the hands live in (the rest of the clip is pure black).
"""
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).parent
CLIP = ROOT / "hands.mp4"
OUT = Path(__file__).parents[2] / "frontend" / "public" / "hero"
LAST = 130  # flash peaks here; the page's own bloom takes over after
STEP = 2
CROP = (0, 150, 1280, 590)  # union bbox of the hands + flash, with a little air
SIZES = {"d": (1280, 70), "m": (760, 66)}  # width, webp quality

with tempfile.TemporaryDirectory() as tmp:
    subprocess.run(["ffmpeg", "-v", "error", "-i", str(CLIP), "-vsync", "0", f"{tmp}/f%03d.png"], check=True)
    frames = sorted(Path(tmp).glob("f*.png"))[: LAST + 1 : STEP]
    for key, (w, q) in SIZES.items():
        d = OUT / key
        d.mkdir(parents=True, exist_ok=True)
        for old in d.glob("*.webp"):
            old.unlink()
        for i, f in enumerate(frames):
            im = Image.open(f).convert("RGB").crop(CROP)
            im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
            im.save(d / f"{i:03d}.webp", "WEBP", quality=q, method=6)
    print(f"{len(frames)} frames, {CROP[2] - CROP[0]}x{CROP[3] - CROP[1]} crop")
