"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { syncTheme } from "@/lib/theme"
import { afterLoadIdle } from "@/lib/utils"

const FRAMES = 66
const MOBILE_MQ = "(max-width: 767px) and (orientation: portrait)"
const frameSrc = (set: "d" | "m", i: number) => `/hero/${set}/${String(i).padStart(3, "0")}.webp`
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))

/** Coarse-to-fine load order: any scroll position finds a near frame early. */
function loadOrder() {
  const seen = new Set<number>([0, FRAMES - 1])
  const order = [0, FRAMES - 1]
  for (const stride of [16, 8, 4, 2, 1])
    for (let i = 0; i < FRAMES; i += stride)
      if (!seen.has(i)) {
        seen.add(i)
        order.push(i)
      }
  return order
}

/**
 * Pinned scroll track. Scroll position alone drives everything, so scrolling back up fully reverses it:
 * copy lifts away → the hands close in (frame scrub + zoom) → fingertips touch → flash → paper blooms out.
 */
export function HeroScrub({ copy, alt }: { copy: ReactNode; alt: string }) {
  const track = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const band = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = track.current!
    const pinEl = pin.current!
    const bandEl = band.current!
    const cv = canvas.current!
    const ctx = cv.getContext("2d")
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    const set = matchMedia(MOBILE_MQ).matches ? "m" : "d"
    const frames: (HTMLImageElement | null)[] = Array(FRAMES).fill(null)
    let want = 0 // fractional frame index
    let drawn = -1
    let raf = 0
    let target = 0 // scroll progress
    let cur = 0 // eased progress the visuals follow, for a little inertia
    let last = 0

    const nearest = (i: number) => {
      for (let d = 0; d < FRAMES; d++) {
        if (frames[i - d]) return i - d
        if (frames[i + d]) return i + d
      }
      return -1
    }
    // blend the two frames either side of the exact position, so 66 frames scrub like a real video
    const draw = () => {
      if (!ctx) return
      const lo = Math.floor(want)
      const t = want - lo
      const a = frames[lo]
      const b = frames[Math.min(FRAMES - 1, lo + 1)]
      const key = a && b ? Math.round(want * 16) / 16 : nearest(Math.round(want))
      if (key < 0 || key === drawn) return
      ctx.globalAlpha = 1
      if (a && b) {
        ctx.drawImage(a, 0, 0, cv.width, cv.height)
        if (t > 0.03) {
          ctx.globalAlpha = t
          ctx.drawImage(b, 0, 0, cv.width, cv.height)
          ctx.globalAlpha = 1
        }
      } else ctx.drawImage(frames[key]!, 0, 0, cv.width, cv.height)
      drawn = key
      cv.dataset.on = ""
    }
    const size = () => {
      const r = bandEl.getBoundingClientRect()
      const s = bandEl.offsetWidth / (r.width || 1) // undo the current zoom
      const dpr = Math.min(devicePixelRatio || 1, 2)
      cv.width = Math.round(r.width * s * dpr)
      cv.height = Math.round(r.height * s * dpr)
      // how far the fingertips sit below screen centre, before any lift
      const contactY = bandEl.offsetTop + bandEl.offsetHeight * 0.5
      pinEl.style.setProperty("--lift", `${(pinEl.clientHeight / 2 - contactY).toFixed(1)}px`)
      drawn = -1
      draw()
    }
    const render = (p: number) => {
      const s = pinEl.style
      s.setProperty("--copy", (1 - span(p, 0, 0.12)).toFixed(3))
      s.setProperty("--zoom", (1 + 0.42 * span(p, 0.02, 0.62)).toFixed(4))
      s.setProperty("--rise", span(p, 0.02, 0.42).toFixed(4))
      s.setProperty("--flash", (span(p, 0.55, 0.64) * (1 - span(p, 0.7, 0.8))).toFixed(3))
      s.setProperty("--bloom", span(p, 0.62, 0.82).toFixed(4))
      pinEl.toggleAttribute("data-quiet", p > 0.07)
      el.toggleAttribute("data-dark", p < 0.74)
      syncTheme()
      want = span(p, 0.02, 0.6) * (FRAMES - 1)
      draw()
    }
    const measure = () => {
      const total = el.offsetHeight - innerHeight
      target = reduced || total <= 0 ? 0 : clamp01(-el.getBoundingClientRect().top / total)
    }
    // ease toward the scroll position (time-based, so it feels the same at 60 and 120 Hz)
    const tick = (now: number) => {
      raf = 0
      const dt = Math.min(64, now - (last || now))
      last = now
      cur += (target - cur) * (1 - Math.exp(-dt / 70))
      if (Math.abs(target - cur) < 0.0004) cur = target
      render(cur)
      if (cur !== target) raf = requestAnimationFrame(tick)
      else last = 0
    }
    const onScroll = () => {
      measure()
      if (!raf) raf = requestAnimationFrame(tick)
    }

    size()
    measure()
    cur = target
    render(cur)
    addEventListener("scroll", onScroll, { passive: true })
    addEventListener("resize", size)

    let alive = true
    const cancel = afterLoadIdle(() => {
      if (reduced) return
      // one at a time: frames never compete with anything the visitor is actually waiting for
      const queue = loadOrder()
      const next = () => {
        const i = queue.shift()
        if (i === undefined || !alive) return
        const img = new Image()
        img.decoding = "async"
        img.src = frameSrc(set, i)
        img
          .decode()
          .then(() => {
            if (!alive) return
            frames[i] = img
            draw()
          })
          .catch(() => {})
          .finally(next)
      }
      next()
      next()
    })

    return () => {
      alive = false
      cancel()
      cancelAnimationFrame(raf)
      removeEventListener("scroll", onScroll)
      removeEventListener("resize", size)
    }
  }, [])

  return (
    <section ref={track} id="top" className="hero" aria-labelledby="hero-title" data-dark="" data-testid="hero">
      <div ref={pin} className="hero-pin">
        <div ref={band} className="hero-band">
          <picture>
            <source media={MOBILE_MQ} srcSet={frameSrc("m", 0)} width={760} height={261} />
            <img src={frameSrc("d", 0)} width={1280} height={440} alt={alt} fetchPriority="high" decoding="async" className="hero-poster" />
          </picture>
          <canvas ref={canvas} className="hero-canvas" aria-hidden />
        </div>
        <div className="hero-copy">{copy}</div>
        <div className="hero-flash" aria-hidden />
        <div className="hero-bloom" aria-hidden />
        <span className="hero-hint" aria-hidden>
          scroll
        </span>
      </div>
    </section>
  )
}
