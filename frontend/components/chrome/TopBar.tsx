"use client"

import { AnimatePresence, m } from "motion/react"
import { useDeck } from "@/components/deck/DeckProvider"
import { ArrowUpRight, Calendar } from "@/components/ui/Icons"
import { chapters } from "@/content/chapters"
import { site } from "@/content/site"

const roll = { type: "spring", stiffness: 420, damping: 30 } as const

export function TopBar() {
  const { target, dir } = useDeck()
  const current = chapters[target]

  return (
    <header className="topbar">
      <nav aria-label="Breadcrumb" className="chrome-in">
        <m.ol layout transition={roll} className="glass crumbs" style={{ borderRadius: 999 }}>
          <m.li layout="position" transition={roll}>
            <a href="#hello" className="crumb-home" data-testid="breadcrumb-home">
              <span className="chrome-ball" aria-hidden />
              <span>khai huynh</span>
            </a>
          </m.li>
          <m.li layout="position" transition={roll} aria-hidden className="crumb-sep">
            /
          </m.li>
          <m.li layout="position" transition={roll} className="crumb-current" aria-current="page" data-testid="breadcrumb-current">
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <m.span
                key={current.id}
                className="inline-block"
                initial={{ y: 16 * dir, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -16 * dir, opacity: 0, filter: "blur(6px)" }}
                transition={roll}
              >
                {current.label}
              </m.span>
            </AnimatePresence>
          </m.li>
        </m.ol>
      </nav>
      <a href={site.links.cal} target="_blank" rel="noopener" className="glass pill press chrome-in topbar-cta" data-testid="topbar-book-chat">
        <Calendar className="md:hidden text-[17px]" />
        <span className="max-md:sr-only">book a chat</span>
        <ArrowUpRight className="max-md:hidden pill-arrow" />
      </a>
    </header>
  )
}
