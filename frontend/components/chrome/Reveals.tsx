"use client"

import { useEffect } from "react"
import { syncTheme } from "@/lib/theme"

/** Page-wide watchers: reveals [data-rv] blocks as they enter, keeps the top bar's theme in sync, and notes when the final CTA is on screen. */
export function Reveals() {
  useEffect(() => {
    const root = document.documentElement
    root.dataset.js = ""
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.setAttribute("data-in", "")
          io.unobserve(e.target)
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    )
    document.querySelectorAll("[data-rv]").forEach((el) => io.observe(el))

    const contact = document.getElementById("contact")
    const end = new IntersectionObserver(([e]) => root.toggleAttribute("data-end", e.isIntersecting), { threshold: 0.15 })
    if (contact) end.observe(contact)
    let raf = 0
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), syncTheme()))
    }
    addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener("scroll", onScroll)
      io.disconnect()
      end.disconnect()
    }
  }, [])
  return null
}
