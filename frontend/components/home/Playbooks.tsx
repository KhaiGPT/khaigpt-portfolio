"use client"

import { useEffect, useRef, useState } from "react"
import type { Playbook } from "@/content/home"

/**
 * Role playbooks: pick a role, see one real task before and after AI.
 * Bars are drawn to scale (minutes), so the saving reads without a sentence. Cycles on its own until touched.
 */
export function Playbooks({ playbooks }: { playbooks: Playbook[] }) {
  const [sel, setSel] = useState(0)
  const [auto, setAuto] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const max = Math.max(...playbooks.map((p) => p.before.mins))

  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const el = ref.current
    let t = 0
    const io = new IntersectionObserver(([e]) => {
      clearInterval(t)
      if (e.isIntersecting) t = window.setInterval(() => setSel((s) => (s + 1) % playbooks.length), 3800)
    })
    if (el) io.observe(el)
    return () => {
      io.disconnect()
      clearInterval(t)
    }
  }, [auto, playbooks.length])

  const p = playbooks[sel]
  return (
    <div ref={ref} className="plays" data-testid="playbooks">
      <div className="plays-tabs" role="tablist" aria-label="Role playbooks">
        {playbooks.map((pb, i) => (
          <button
            key={pb.id}
            type="button"
            role="tab"
            aria-selected={i === sel}
            aria-controls="plays-panel"
            className="plays-tab press"
            onClick={() => {
              setAuto(false)
              setSel(i)
            }}
            data-testid={`playbook-${pb.id}`}
          >
            {pb.role}
          </button>
        ))}
      </div>
      <div id="plays-panel" role="tabpanel" className="plays-panel" key={p.id}>
        <p className="plays-task">
          <span className="plays-eg">Example</span>
          {p.task}
        </p>
        {(["before", "after"] as const).map((k) => (
          <div key={k} className={`plays-row plays-${k}`}>
            <span className="plays-label">{k === "before" ? "Before" : "With AI"}</span>
            <span className="plays-bar" style={{ "--w": p[k].mins / max } as React.CSSProperties}>
              <span className="plays-time">{p[k].time}</span>
            </span>
            <span className="plays-how">{p[k].how}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
