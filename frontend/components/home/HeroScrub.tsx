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
    let want = 0
    let drawn = -1
    let raf = 0

    const nearest = (i: number) => {
      for (let d = 0; d < FRAMES; d++) {
        if (frames[i - d]) return i - d
        if (frames[i + d]) return i + d
      }
      return -1
    }
    const draw = () => {
      const j = nearest(want)
      if (j < 0 || j === drawn || !ctx) return
      ctx.drawImage(frames[j]!, 0, 0, cv.width, cv.height)
      drawn = j
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
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const total = el.offsetHeight - innerHeight
      const p = reduced || total <= 0 ? 0 : clamp01(-r.top / total)
      const s = pinEl.style
      s.setProperty("--copy", (1 - span(p, 0, 0.14)).toFixed(3))
      s.setProperty("--zoom", (1 + 0.42 * span(p, 0.02, 0.72)).toFixed(4))
      s.setProperty("--rise", span(p, 0.02, 0.5).toFixed(4))
      s.setProperty("--flash", (span(p, 0.64, 0.74) * (1 - span(p, 0.8, 0.9))).toFixed(3))
      s.setProperty("--bloom", span(p, 0.72, 0.94).toFixed(4))
      pinEl.toggleAttribute("data-quiet", p > 0.08)
      el.toggleAttribute("data-dark", p < 0.84)
      syncTheme()
      want = Math.round(span(p, 0.03, 0.7) * (FRAMES - 1))
      draw()
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    size()
    update()
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
