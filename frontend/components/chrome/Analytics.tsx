"use client"

import { useEffect } from "react"
import { site } from "@/content/site"
import { afterLoadIdle } from "@/lib/utils"

type Gtag = (...args: unknown[]) => void
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

/**
 * Google Analytics 4, loaded only after the page is idle so it never competes with the hero.
 * Events queue up in dataLayer until the script arrives. Tracked on top of GA's own page views:
 *   book_call_click  { cta, section }   ← mark this one as a key event in GA
 *   contact_email    { method: "mailto" | "copy" }
 *   newsletter_click { link }
 *   faq_open         { question }
 *   interest_click   { cta }             (a “Not ready?” link)
 *   generate_lead    { service, revenue } (sent by the interest form)
 *   section_view     { section }
 */
export function Analytics() {
  useEffect(() => {
    const id = site.gaId
    if (!id) return
    window.dataLayer = window.dataLayer || []
    // gtag must push the arguments object itself, not an array
    const gtag: Gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
    window.gtag = gtag
    gtag("js", new Date())
    gtag("config", id)

    const cancel = afterLoadIdle(() => {
      const s = document.createElement("script")
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
      document.head.appendChild(s)
    })

    const where = (el: Element) => el.closest("section[id], article[id], header, .dock")
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a, button")
      if (!el) return
      const href = el.getAttribute("href") ?? ""
      const tag = el.getAttribute("data-testid") ?? ""
      if (href.startsWith(site.links.cal)) {
        const area = where(el)
        gtag("event", "book_call_click", { cta: tag, section: area?.id || area?.className.split(" ")[0] || "" })
      } else if (href.startsWith("mailto:")) gtag("event", "contact_email", { method: "mailto" })
      else if (tag === "copy-email-button") gtag("event", "contact_email", { method: "copy" })
      else if (href.startsWith(site.links.substack)) gtag("event", "newsletter_click", { link: tag })
      else if (href === "#interest") gtag("event", "interest_click", { cta: tag })
    }
    // <details> toggle doesn't bubble, so listen in the capture phase
    const onToggle = (e: Event) => {
      const d = e.target as HTMLDetailsElement
      if (d.matches?.(".qa") && d.open) gtag("event", "faq_open", { question: d.dataset.testid?.replace("faq-", "") })
    }
    document.addEventListener("click", onClick, true)
    document.addEventListener("toggle", onToggle, true)

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue
          gtag("event", "section_view", { section: en.target.id })
          io.unobserve(en.target)
        }
      },
      { threshold: 0.3 },
    )
    document.querySelectorAll("main > section[id]:not(#top)").forEach((s) => io.observe(s))

    return () => {
      cancel()
      io.disconnect()
      document.removeEventListener("click", onClick, true)
      document.removeEventListener("toggle", onToggle, true)
    }
  }, [])
  return null
}
