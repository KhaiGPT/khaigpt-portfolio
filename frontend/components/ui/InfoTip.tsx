"use client"

import { useEffect, useId, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/** ⓘ button holding the detail the layout doesn't need to say out loud. Hover or focus on desktop, tap on touch. */
export function InfoTip({ text, label = "More info", className }: { text: string; label?: string; className?: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: Event) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("pointerdown", close)
    document.addEventListener("keydown", esc)
    addEventListener("scroll", close, { passive: true })
    return () => {
      document.removeEventListener("pointerdown", close)
      document.removeEventListener("keydown", esc)
      removeEventListener("scroll", close)
    }
  }, [open])

  return (
    <span ref={ref} className={cn("tip", className)} data-open={open || undefined}>
      <button type="button" className="tip-btn press" aria-label={label} aria-describedby={id} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 16 16" width="1em" height="1em" aria-hidden>
          <circle cx="8" cy="8" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 7.2v4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="4.8" r="0.95" fill="currentColor" />
        </svg>
      </button>
      <span id={id} role="tooltip" className="tip-pop">
        {text}
      </span>
    </span>
  )
}
