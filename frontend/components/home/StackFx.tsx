"use client"

import { useEffect } from "react"

/**
 * Scroll-linked depth for the pinned package cards: as card n+1 slides over card n,
 * card n sinks (scale + dim). Also marks each card live once it docks, which starts its visual.
 */
export function StackFx() {
  useEffect(() => {
    const cards = [...document.querySelectorAll<HTMLElement>("[data-pkg]")]
    if (!cards.length) return
    let raf = 0
    const update = () => {
      raf = 0
      const vh = innerHeight
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect()
        if (r.top < vh * 0.7) card.setAttribute("data-live", "")
        const next = cards[i + 1]
        if (!next) return
        const top = parseFloat(getComputedStyle(card).top) || 0
        const nr = next.getBoundingClientRect()
        // 0 while the next card is still below, 1 once it has fully covered this one
        const cover = Math.min(1, Math.max(0, (vh - nr.top) / Math.max(1, vh - top)))
        card.style.setProperty("--cover", cover.toFixed(3))
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    addEventListener("scroll", onScroll, { passive: true })
    addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener("scroll", onScroll)
      removeEventListener("resize", onScroll)
    }
  }, [])
  return null
}
