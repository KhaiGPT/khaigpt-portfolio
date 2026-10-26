"use client"

import { useRef } from "react"

/** Portrait on a chrome-lit plate. It tilts toward the pointer and a specular sheen slides across, like a card under a lamp. */
export function Portrait({ src, w, h, alt }: { src: string; w: number; h: number; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse") return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`)
    el.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`)
    el.style.setProperty("--sx", `${((x + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty("--sy", `${((y + 0.5) * 100).toFixed(1)}%`)
    el.dataset.hover = ""
  }
  const leave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--rx", "0deg")
    el.style.setProperty("--ry", "0deg")
    delete el.dataset.hover
  }

  return (
    <div className="portrait-wrap" onPointerMove={move} onPointerLeave={leave}>
      <div ref={ref} className="portrait">
        <img src={src} width={w} height={h} alt={alt} loading="lazy" decoding="async" />
        <span className="portrait-sheen" aria-hidden />
      </div>
      <p className="portrait-tag">
        <span className="live-dot" aria-hidden />
        Ho Chi Minh City · GMT+7
      </p>
    </div>
  )
}
