"use client"

import { useEffect, useRef, useState } from "react"
import { art } from "@/content/art"
import type { Role } from "@/content/home"

/** Track record. On desktop, hovering a row brings that company's chrome object to float beside the cursor. */
export function RecordList({ roles }: { roles: Role[] }) {
  const float = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState<number | null>(null)
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const raf = useRef(0)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const follow = () => {
    const p = pos.current
    p.x += (p.tx - p.x) * 0.16
    p.y += (p.ty - p.y) * 0.16
    const el = float.current
    if (el) el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${((p.tx - p.x) * 0.06).toFixed(2)}deg)`
    if (Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.3) raf.current = requestAnimationFrame(follow)
    else raf.current = 0
  }
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    pos.current.tx = e.clientX - r.left
    pos.current.ty = e.clientY - r.top
    if (on === null) {
      pos.current.x = pos.current.tx
      pos.current.y = pos.current.ty
    }
    if (!raf.current) raf.current = requestAnimationFrame(follow)
  }

  return (
    <div className="record-wrap" onPointerMove={move} onPointerLeave={() => setOn(null)}>
      <ol className="record" aria-label="Track record">
        {roles.map((r, i) => (
          <li
            key={r.company}
            className="rec"
            data-rv
            data-on={on === i || undefined}
            style={{ "--i": i } as React.CSSProperties}
            onPointerEnter={(e) => e.pointerType === "mouse" && setOn(i)}
          >
            <span className="rec-years">{r.years}</span>
            <span className="rec-who">
              <strong>{r.company}</strong>
              <span>{r.role}</span>
            </span>
            <span className="rec-result">
              {r.result}
              {r.link && (
                <a href={r.link.href} target="_blank" rel="noopener" className="rec-link" data-testid="reptime-app-store">
                  {r.link.label} ↗
                </a>
              )}
            </span>
          </li>
        ))}
      </ol>
      <div ref={float} className="rec-float" data-on={on !== null || undefined} aria-hidden>
        {roles.map((r, i) => {
          const a = art[r.art]
          return <img key={r.company} src={a.src} width={a.w} height={a.h} alt="" loading="lazy" decoding="async" data-on={on === i || undefined} />
        })}
      </div>
    </div>
  )
}
