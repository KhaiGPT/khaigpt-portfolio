"use client"

import { m } from "motion/react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { useChapter } from "@/components/deck/Chapter"
import { R } from "@/components/deck/Reveal"
import { ArtImage } from "@/components/ui/ArtImage"
import { Replies } from "@/components/ui/Replies"
import { art } from "@/content/art"
import { roles } from "@/content/work"

const clamp = (i: number) => Math.max(0, Math.min(roles.length - 1, i))

/** Timeline of roles; each pick morphs the chrome object on the stage. All details stay in the DOM for crawlers. */
export function WorkExplorer({ heading }: { heading: ReactNode }) {
  const [sel, setSel] = useState(0)
  const { active } = useChapter()
  const touch = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setSel((s) => clamp(s + 1))
      if (e.key === "ArrowLeft") setSel((s) => clamp(s - 1))
    }
    addEventListener("keydown", onKey)
    return () => removeEventListener("keydown", onKey)
  }, [active])

  return (
    <>
      <div className="work-stage">
        {roles.map((r, i) => (
          <ArtImage key={r.id} art={art[r.art]} selected={i === sel} className="work-art" />
        ))}
      </div>

      <div className="copy-col work-col">
        {heading}
        <R i={2} as="ol" className="work-list" aria-label="Roles">
          {roles.map((r, i) => (
            <li key={r.id}>
              <button type="button" className="work-row" aria-pressed={i === sel} onClick={() => setSel(i)} data-testid={`work-item-${r.id}`}>
                {i === sel && <m.span layoutId="work-ind" className="work-ind" transition={{ type: "spring", stiffness: 520, damping: 30 }} />}
                <span className="work-year">{r.start}</span>
                <span className="work-co">{r.company}</span>
              </button>
            </li>
          ))}
        </R>
        <R i={3}>
          <Replies options={[{ to: "writing", text: "what do you write about?" }]} />
        </R>
      </div>

      <R
        i={3}
        className="work-detail glass"
        data-testid="work-detail-sizer"
        onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touch.current.x
          const dy = e.changedTouches[0].clientY - touch.current.y
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) setSel((s) => clamp(s + (dx < 0 ? 1 : -1)))
        }}
      >
        <div className="work-cards" aria-live="polite">
          {roles.map((r, i) => (
            <article key={r.id} className="work-card" data-on={i === sel || undefined} aria-hidden={i !== sel} data-testid={`work-card-${r.id}`}>
              <p className="work-years">{r.years}</p>
              <h3 className="work-role">{r.role}</h3>
              <p className="work-company">{r.company}</p>
              <p className="work-line">{r.line}</p>
              <ul className="tags">
                {r.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="work-steps" aria-hidden>
          {roles.map((r, i) => (
            <span key={r.id} data-on={i === sel || undefined} />
          ))}
        </div>
      </R>
    </>
  )
}
