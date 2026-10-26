"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { chapters } from "@/content/chapters"
import { stageBus } from "@/lib/stage-bus"
import { afterLoadIdle } from "@/lib/utils"
import { useDeckInput } from "./useDeckInput"

/** ms until the next chapter takes over, the outgoing one is fully gone, and input re-opens */
const SWAP_MS = 260
const LEAVE_MS = 620
const LOCK_MS = 820

type Origin = { x: number; y: number }
export type GoOptions = { prompt?: string; origin?: Origin }

type Deck = {
  index: number
  target: number
  leaving: number | null
  dir: 1 | -1
  mounted: boolean
  prompts: Record<number, string>
  count: number
  go: (to: number, o?: GoOptions) => void
}

const DeckCtx = createContext<Deck | null>(null)

export function useDeck() {
  const ctx = useContext(DeckCtx)
  if (!ctx) throw new Error("useDeck must be used inside <DeckProvider>")
  return ctx
}

const idOf = (i: number) => chapters[i].id
const indexOfHash = (hash: string) => chapters.findIndex((c) => c.id === hash.replace("#", ""))

export function DeckProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0)
  const [target, setTarget] = useState(0)
  const [leaving, setLeaving] = useState<number | null>(null)
  const [dir, setDir] = useState<1 | -1>(1)
  const [prompts, setPrompts] = useState<Record<number, string>>({})
  const [mounted, setMounted] = useState(false)
  const targetRef = useRef(0)
  const lockUntil = useRef(0)
  const timers = useRef<number[]>([])

  const go = useCallback((to: number, o: GoOptions = {}) => {
    const from = targetRef.current
    const now = performance.now()
    if (to < 0 || to >= chapters.length || to === from || now < lockUntil.current) return
    lockUntil.current = now + LOCK_MS
    targetRef.current = to
    const d = to > from ? 1 : -1
    timers.current.forEach(clearTimeout)
    document.documentElement.dataset.booted = ""
    setDir(d)
    setTarget(to)
    setLeaving(from)
    setPrompts((p) => ({ ...p, [to]: o.prompt ?? chapters[to].prompt }))
    const origin = o.origin ?? { x: innerWidth / 2, y: d > 0 ? innerHeight * 0.9 : innerHeight * 0.1 }
    stageBus.emit("ripple", origin.x, origin.y, o.origin ? 1 : 0.7)
    timers.current = [
      window.setTimeout(() => setIndex(to), SWAP_MS),
      window.setTimeout(() => setLeaving((l) => (l === from ? null : l)), LEAVE_MS),
    ]
  }, [])

  const step = useCallback((d: 1 | -1) => go(targetRef.current + d), [go])
  useDeckInput(step, go, chapters.length)

  useEffect(() => {
    const i = indexOfHash(location.hash)
    if (i > 0) {
      targetRef.current = i
      setIndex(i)
      setTarget(i)
    }
    setMounted(true)
    const boot = window.setTimeout(() => (document.documentElement.dataset.booted = ""), 2200)
    // far chapters' art waits for the first screen, then warms the cache in the background
    const cancelWarm = afterLoadIdle(() => (document.documentElement.dataset.warm = ""))
    const onHash = () => {
      const j = indexOfHash(location.hash)
      if (j >= 0) go(j)
    }
    // in-page anchors navigate the deck instead of scrolling a clipped container
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='#']")
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return
      const j = indexOfHash(a.getAttribute("href") ?? "")
      if (j < 0) return
      e.preventDefault()
      go(j, { origin: { x: e.clientX, y: e.clientY } })
    }
    addEventListener("hashchange", onHash)
    document.addEventListener("click", onClick)
    return () => {
      clearTimeout(boot)
      cancelWarm()
      removeEventListener("hashchange", onHash)
      document.removeEventListener("click", onClick)
    }
  }, [go])

  useEffect(() => {
    if (!mounted) return
    const url = target === 0 ? location.pathname + location.search : `#${idOf(target)}`
    history.replaceState(null, "", url)
    document.documentElement.dataset.chapter = idOf(target)
  }, [target, mounted])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const value = useMemo(
    () => ({ index, target, leaving, dir, mounted, prompts, count: chapters.length, go }),
    [index, target, leaving, dir, mounted, prompts, go],
  )
  return <DeckCtx.Provider value={value}>{children}</DeckCtx.Provider>
}
