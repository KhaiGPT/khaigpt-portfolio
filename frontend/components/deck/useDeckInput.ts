"use client"

import { useEffect, useRef } from "react"

/** true if an inner [data-scroll] area under `el` can still scroll in direction `dy` */
function innerCanScroll(el: EventTarget | null, dy: number) {
  let node = el instanceof Element ? el : null
  while (node && node !== document.body) {
    if (node instanceof HTMLElement && node.dataset.scroll !== undefined && node.scrollHeight > node.clientHeight + 1) {
      if (dy > 0 ? node.scrollTop + node.clientHeight < node.scrollHeight - 1 : node.scrollTop > 0) return true
    }
    node = node.parentElement
  }
  return false
}

const isTyping = (t: EventTarget | null) => t instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)

/** Wheel / trackpad / swipe / keyboard paging with trackpad-inertia rejection. */
export function useDeckInput(step: (d: 1 | -1) => void, jump: (i: number) => void, count: number) {
  const api = useRef({ step, jump, count })
  api.current = { step, jump, count }

  useEffect(() => {
    let lastT = 0
    let lastAbs = 0
    let acc = 0
    let spent = false

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
      const now = performance.now()
      const abs = Math.abs(dy)
      // an inner column consumed this gesture: its momentum mustn't spill over into a page flip
      if (innerCanScroll(e.target, dy)) {
        lastT = now
        lastAbs = abs
        acc = 0
        spent = true
        return
      }
      const gap = now - lastT
      const fresh = gap > 200 || abs > lastAbs * 1.6 + 8
      lastT = now
      lastAbs = abs
      if (spent && !fresh) return
      spent = false
      if (gap > 200) acc = 0
      acc += dy
      if (Math.abs(acc) >= 36) {
        api.current.step(acc > 0 ? 1 : -1)
        acc = 0
        spent = true
      }
    }

    let sx = 0
    let sy = 0
    let st = 0
    let canDown = false
    let canUp = false
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      sx = t.clientX
      sy = t.clientY
      st = performance.now()
      canDown = innerCanScroll(e.target, 1)
      canUp = innerCanScroll(e.target, -1)
    }
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0]
      const dx = t.clientX - sx
      const dy = t.clientY - sy
      if (Math.abs(dy) < 44 || Math.abs(dy) < Math.abs(dx) * 1.3 || performance.now() - st > 900) return
      if (dy < 0 && !canDown) api.current.step(1)
      if (dy > 0 && !canUp) api.current.step(-1)
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return
      const tag = (e.target as HTMLElement | null)?.tagName
      const k = e.key
      const fwd = k === "ArrowDown" || k === "PageDown" || (k === " " && !e.shiftKey && tag !== "BUTTON" && tag !== "A")
      const back = k === "ArrowUp" || k === "PageUp" || (k === " " && e.shiftKey)
      if ((fwd || back) && innerCanScroll(document.activeElement, fwd ? 1 : -1)) return
      if (fwd) api.current.step(1)
      else if (back) api.current.step(-1)
      else if (k === "Home") api.current.jump(0)
      else if (k === "End") api.current.jump(api.current.count - 1)
      else return
      e.preventDefault()
    }

    addEventListener("wheel", onWheel, { passive: true })
    addEventListener("touchstart", onTouchStart, { passive: true })
    addEventListener("touchend", onTouchEnd, { passive: true })
    addEventListener("keydown", onKey)
    return () => {
      removeEventListener("wheel", onWheel)
      removeEventListener("touchstart", onTouchStart)
      removeEventListener("touchend", onTouchEnd)
      removeEventListener("keydown", onKey)
    }
  }, [])
}
