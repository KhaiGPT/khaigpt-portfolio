"use client"

import { useEffect, useState } from "react"

/** Edge-lensing displacement map: pixels near the rim sample from further inside, like thick glass. */
function makeLensMap(size = 128) {
  const c = document.createElement("canvas")
  c.width = c.height = size
  const ctx = c.getContext("2d")!
  const img = ctx.createImageData(size, size)
  const band = 0.22
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = (x + 0.5) / size
      const v = (y + 0.5) / size
      const fx = Math.pow(1 - Math.min(1, Math.min(u, 1 - u) / band), 2) * (u < 0.5 ? 1 : -1)
      const fy = Math.pow(1 - Math.min(1, Math.min(v, 1 - v) / band), 2) * (v < 0.5 ? 1 : -1)
      const o = (y * size + x) * 4
      img.data[o] = 128 + fx * 127
      img.data[o + 1] = 128 + fy * 127
      img.data[o + 2] = 128
      img.data[o + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return c.toDataURL()
}

type UAData = { brands?: { brand: string }[] }

/** Chromium-only progressive enhancement: real refraction through backdrop-filter: url(#lg-refract). */
export function GlassFilter() {
  const [map, setMap] = useState<string | null>(null)

  useEffect(() => {
    const ua = (navigator as Navigator & { userAgentData?: UAData }).userAgentData
    const chromium = !!ua?.brands?.some((b) => /Chromium/i.test(b.brand))
    if (!chromium || matchMedia("(prefers-reduced-transparency: reduce)").matches) return
    setMap(makeLensMap())
    document.documentElement.classList.add("lg-refract")
    return () => document.documentElement.classList.remove("lg-refract")
  }, [])

  // specular highlight follows the pointer across any glass surface
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(".glass") as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`)
      el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`)
    }
    addEventListener("pointermove", onMove, { passive: true })
    return () => removeEventListener("pointermove", onMove)
  }, [])

  if (!map) return null
  return (
    <svg width="0" height="0" aria-hidden style={{ position: "absolute", pointerEvents: "none" }}>
      <filter id="lg-refract" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feImage href={map} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="lens" />
        <feDisplacementMap in="SourceGraphic" in2="lens" scale="28" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}
