"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Gently pulls its child toward the pointer, then springs home. */
export function Magnetic({ children, strength = 0.22, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      el.style.transition = "transform .25s cubic-bezier(.2,.8,.2,1)"
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    const leave = () => {
      el.style.transition = "transform .9s var(--spring-jelly)"
      el.style.transform = ""
    }
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerleave", leave)
    return () => {
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerleave", leave)
    }
  }, [strength])

  return (
    <div ref={ref} className={cn("inline-flex", className)}>
      {children}
    </div>
  )
}
