"use client"

import { AnimatePresence, m } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { Replies } from "@/components/ui/Replies"
import { faqs, type Faq } from "@/content/faq"
import { cn } from "@/lib/utils"

type Msg = { id: string; from: "me" | "you"; text: string }

const pop = { type: "spring", stiffness: 460, damping: 30, mass: 0.9 } as const

export function AskThread() {
  const [msgs, setMsgs] = useState<Msg[]>([{ id: "hi", from: "me", text: "pick a question — i'll answer like we're grabbing coffee." }])
  const [asked, setAsked] = useState<string[]>([])
  const [typing, setTyping] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [msgs, typing])

  const ask = (f: Faq) => {
    if (typing) return
    setAsked((a) => [...a, f.id])
    setMsgs((m) => [...m, { id: `${f.id}-q`, from: "you", text: f.q }])
    setTyping(true)
    timer.current = window.setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { id: `${f.id}-a`, from: "me", text: f.a }])
    }, 700 + Math.min(700, f.a.length * 4))
  }

  const left = faqs.filter((f) => !asked.includes(f.id))

  return (
    <div className="ask">
      <div ref={scroller} className="thread" data-scroll data-testid="ask-thread" aria-live="polite">
        <AnimatePresence initial={false}>
          {msgs.map((msg) => (
            <m.p
              key={msg.id}
              layout="position"
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={pop}
              className={cn("bubble glass", msg.from)}
              style={{ transformOrigin: msg.from === "you" ? "100% 100%" : "0% 100%" }}
              data-testid={`bubble-${msg.id}`}
            >
              <span className="sr-only">{msg.from === "you" ? "You: " : "Khai: "}</span>
              {msg.text}
            </m.p>
          ))}
          {typing && (
            <m.p key="typing" layout="position" className="bubble glass me typing" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={pop} data-testid="typing-indicator">
              <span className="sr-only">Khai is typing</span>
              <i />
              <i />
              <i />
            </m.p>
          )}
        </AnimatePresence>
      </div>
      <m.div layout className="ask-chips">
        <AnimatePresence mode="popLayout">
          {left.map((f) => (
            <m.button
              key={f.id}
              layout
              type="button"
              className="glass reply press"
              onClick={() => ask(f)}
              disabled={typing}
              exit={{ opacity: 0, scale: 0.6, filter: "blur(6px)" }}
              transition={pop}
              data-testid={`ask-q-${f.id}`}
            >
              {f.q}
            </m.button>
          ))}
        </AnimatePresence>
        {left.length < faqs.length && <Replies options={[{ to: "hi", text: "okay, how do i reach you?" }]} className="contents" />}
      </m.div>
    </div>
  )
}
