"use client"

import { useEffect, useRef, useState } from "react"
import type { Msg } from "@/content/home"

/** The missed-call rescue, played out like a real thread: typing dots, then each reply lands. Plays once, when the card docks. */
export function PhoneThread({ thread }: { thread: Msg[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(thread.length) // SSR / no-JS: the whole thread
  const [typing, setTyping] = useState<"ai" | "them" | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setShown(0)
    const timers: number[] = []
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        let t = 350
        thread.forEach((m, i) => {
          if (m.from !== "sys") {
            const who = m.from
            timers.push(window.setTimeout(() => setTyping(who), t))
            t += m.from === "ai" ? 950 : 650
          }
          timers.push(
            window.setTimeout(() => {
              setTyping(null)
              setShown(i + 1)
            }, t),
          )
          t += 420
        })
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [thread])

  return (
    <figure className="phone" aria-label="Example: an AI assistant texting back a missed call and booking the job">
      <div ref={ref} className="phone-screen">
        <span className="phone-island" aria-hidden />
        <p className="phone-head" aria-hidden>
          <span className="phone-avatar">NH</span>
          Northside Heating · AI
        </p>
        <div className="phone-msgs">
          {thread.map((m, i) => (
            <p key={i} className={`msg msg-${m.from}`} data-on={i < shown || undefined}>
              {m.text}
            </p>
          ))}
          <p className={`msg msg-${typing ?? "ai"} msg-typing`} data-on={typing ? "" : undefined} aria-hidden>
            <i />
            <i />
            <i />
          </p>
        </div>
      </div>
    </figure>
  )
}
