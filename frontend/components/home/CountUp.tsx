"use client"

import { useEffect, useRef } from "react"

const ease = (t: number) => 1 - Math.pow(1 - t, 4)

/** Server renders the final value (crawlers, no-JS); on reveal it rolls up from zero once. */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const fmt = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`
    let raf = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const dur = 1400
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / dur)
          el.textContent = fmt(value * ease(t))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        el.textContent = fmt(0)
        raf = requestAnimationFrame(tick)
      },
      { rootMargin: "0px 0px -15% 0px" },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, decimals, prefix, suffix])

  return (
    <span ref={ref} className="tabular">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}
