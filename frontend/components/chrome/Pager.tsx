"use client"

import { animate, m, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"
import { useDeck } from "@/components/deck/DeckProvider"
import { ChevronDown, ChevronUp } from "@/components/ui/Icons"
import { chapters } from "@/content/chapters"
import { pad2 } from "@/lib/utils"

const STEP = 22
const DOT = 6
const edge = (i: number) => i * STEP + (STEP - DOT) / 2
const lead = { type: "spring", stiffness: 560, damping: 36 } as const
const trail = { type: "spring", stiffness: 170, damping: 18 } as const

/** Liquid indicator: the leading edge snaps ahead, the trailing edge stretches behind like a droplet. */
function useLiquidIndicator(i: number) {
  const left = useMotionValue(edge(i))
  const right = useMotionValue(edge(i) + DOT)
  useEffect(() => {
    const l = edge(i)
    const fwd = l > left.get()
    const a = animate(left, l, fwd ? trail : lead)
    const b = animate(right, l + DOT, fwd ? lead : trail)
    return () => {
      a.stop()
      b.stop()
    }
  }, [i, left, right])
  const x = useTransform(left, (v) => v - 6)
  const width = useTransform(() => right.get() - left.get() + 12)
  return { x, width }
}

export function Pager() {
  const { target, go, count } = useDeck()
  const { x, width } = useLiquidIndicator(target)

  return (
    <nav aria-label="Sections" className="pager chrome-in" data-testid="pager">
      <div className="glass pager-shell">
        <button type="button" className="pager-btn press" aria-label="Previous section" disabled={target === 0} onClick={() => go(target - 1)} data-testid="pager-prev">
          <ChevronUp />
        </button>
        <div className="pager-dots">
          <m.span className="pager-ind" style={{ x, width }} aria-hidden />
          {chapters.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className="pager-dot"
              data-label={c.label}
              aria-label={`Go to ${c.label}`}
              aria-current={i === target ? "step" : undefined}
              onClick={(e) => go(i, { origin: { x: e.clientX, y: e.clientY } })}
              data-testid={`pager-dot-${c.id}`}
            >
              <span />
            </button>
          ))}
        </div>
        <span className="pager-count" aria-live="polite" data-testid="pager-count">
          {pad2(target + 1)}
          <span>/{pad2(count)}</span>
        </span>
        <button
          type="button"
          className="pager-btn press"
          data-hint={target === 0 || undefined}
          aria-label="Next section"
          disabled={target === count - 1}
          onClick={() => go(target + 1)}
          data-testid="pager-next"
        >
          <ChevronDown />
        </button>
      </div>
    </nav>
  )
}
