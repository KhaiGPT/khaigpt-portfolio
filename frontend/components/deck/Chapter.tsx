"use client"

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react"
import { chapters } from "@/content/chapters"
import { cn } from "@/lib/utils"
import { useDeck } from "./DeckProvider"

type ChapterState = "active" | "leaving" | "idle"
const ChapterCtx = createContext({ index: 0, active: false, targeted: false })
export const useChapter = () => useContext(ChapterCtx)

export function Chapter({ index, labelledBy, className, children }: { index: number; labelledBy: string; className?: string; children: ReactNode }) {
  const { index: current, target, leaving, dir, mounted } = useDeck()
  const ref = useRef<HTMLElement>(null)
  const state: ChapterState =
    current === index && target === index ? "active" : leaving === index ? "leaving" : current === index ? "active" : "idle"
  const live = index === target || index === current || index === leaving

  useEffect(() => {
    if (state !== "active" || !mounted) return
    const a = document.activeElement
    if (!a || a === document.body || a.closest("[inert]")) ref.current?.focus({ preventScroll: true })
  }, [state, mounted])

  return (
    <ChapterCtx.Provider value={{ index, active: state === "active", targeted: target === index }}>
      <section
        ref={ref}
        id={chapters[index].id}
        tabIndex={-1}
        aria-labelledby={labelledBy}
        data-chapter={chapters[index].id}
        data-state={state}
        data-live={live || undefined}
        data-dir={dir}
        data-testid={`chapter-${chapters[index].id}`}
        inert={mounted && state !== "active"}
        className={cn("chapter", className)}
      >
        {children}
      </section>
    </ChapterCtx.Provider>
  )
}
