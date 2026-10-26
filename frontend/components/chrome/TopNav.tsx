"use client"

import { useEffect, useRef, useState } from "react"
import { nav } from "@/content/home"

/** Section nav with a glass pill that glides to whichever section is under the reading line. */
export function TopNav() {
  const [active, setActive] = useState<string | null>(null)
  const list = useRef<HTMLUListElement>(null)
  const pill = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    let raf = 0
    const update = () => {
      raf = 0
      const line = innerHeight * 0.35
      let cur: string | null = null
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.top <= line && r.bottom > line) cur = s.id
      }
      setActive(cur)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    const p = pill.current
    const a = active && list.current?.querySelector<HTMLElement>(`a[href="#${active}"]`)
    if (!p) return
    if (!a) {
      p.style.opacity = "0"
      return
    }
    p.style.opacity = "1"
    p.style.width = `${a.offsetWidth}px`
    p.style.transform = `translateX(${a.offsetLeft}px)`
  }, [active])

  return (
    <nav aria-label="Sections" className="glass topnav chrome-in">
      <ul ref={list}>
        <span ref={pill} className="topnav-pill" aria-hidden />
        {nav.map((n) => (
          <li key={n.id}>
            <a href={`#${n.id}`} aria-current={active === n.id ? "location" : undefined} data-testid={`nav-${n.id}`}>
              {n.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
