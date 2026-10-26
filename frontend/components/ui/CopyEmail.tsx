"use client"

import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { site } from "@/content/site"
import { Check, Copy } from "./Icons"
import { Magnetic } from "./Magnetic"

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const t = document.createElement("textarea")
    t.value = text
    t.style.position = "fixed"
    t.style.opacity = "0"
    document.body.appendChild(t)
    t.select()
    document.execCommand("copy")
    t.remove()
  }
}

const swap = { initial: { y: 12, opacity: 0, filter: "blur(4px)" }, animate: { y: 0, opacity: 1, filter: "blur(0px)" }, exit: { y: -12, opacity: 0, filter: "blur(4px)" } }

export function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    await copyText(site.email)
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <Magnetic strength={0.12}>
        <div className="glass email-pill" data-copied={copied || undefined}>
          <a href={`mailto:${site.email}`} className="email-address" data-testid="email-link">
            {site.email}
          </a>
          <button type="button" onClick={copy} className="email-copy press" aria-label="Copy email address" data-testid="copy-email-button">
            <AnimatePresence mode="popLayout" initial={false}>
              <m.span key={copied ? "ok" : "copy"} className="inline-flex items-center gap-1.5" {...swap} transition={{ type: "spring", stiffness: 480, damping: 30 }}>
                {copied ? <Check /> : <Copy />}
                {copied ? "copied" : "copy"}
              </m.span>
            </AnimatePresence>
          </button>
          <span className="sr-only" aria-live="polite" data-testid="copy-email-status">
            {copied ? "Email address copied" : ""}
          </span>
        </div>
      </Magnetic>
    </LazyMotion>
  )
}
