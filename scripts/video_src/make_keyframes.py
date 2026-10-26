"""Build Seedance first/last keyframes (16:9 + 9:16) from the hero renders on pure black."""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).parent
SRC = ROOT.parent / "art_src"
KF = ROOT / "keyframes"
OUT = Path(__file__).parents[2] / "frontend" / "public" / "_tmp"

# name -> (source still, generated touching frame, axis of approach, target size, shift fraction per hand)
SETS = {
    "wide": ("hero_wide.jpg", "kf_wide_end.jpg", 1, (1920, 1080), 0.14),
    "tall": ("hero_tall.jpg", "kf_tall_end.jpg", 0, (1080, 1920), 0.115),
}


def cover(img: Image.Image, size):
    tw, th = size
    s = max(tw / img.width, th / img.height)
    img = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
    x, y = (img.width - tw) // 2, (img.height - th) // 2
    return img.crop((x, y, x + tw, y + th))


def gap_center(arr, axis):
    prof = arr.max(axis=2).max(axis=1 - axis) if axis == 1 else arr.max(axis=2).max(axis=1)
    n = len(prof)
    dark = [i for i in range(n // 2 - n // 6, n // 2 + n // 6) if prof[i] < 40]
    return (dark[0] + dark[-1]) // 2


def spread(arr, axis, shift):
    c = gap_center(arr, axis)
    out = np.zeros_like(arr)
    if axis == 1:
        out[:, : c - shift] = arr[:, shift:c]
        out[:, c + shift :] = arr[:, c : arr.shape[1] - shift]
    else:
        out[: c - shift] = arr[shift:c]
        out[c + shift :] = arr[c : arr.shape[0] - shift]
    return out


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (still, end, axis, size, frac) in SETS.items():
        base = np.asarray(cover(Image.open(SRC / still).convert("RGB"), size))
        shift = round(size[1 - axis] * frac) if axis == 0 else round(size[0] * frac)
        start = spread(base, axis, shift)
        Image.fromarray(start).save(OUT / f"seedance_{name}_first.jpg", quality=94)
        cover(Image.open(KF / end).convert("RGB"), size).save(OUT / f"seedance_{name}_last.jpg", quality=94)
        print(name, "gap centre", gap_center(base, axis), "shift", shift)


if __name__ == "__main__":
    main()
