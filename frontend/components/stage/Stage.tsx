"use client"

import { useEffect, useRef } from "react"
import { stageBus } from "@/lib/stage-bus"
import { afterLoadIdle } from "@/lib/utils"
import { StageRenderer } from "./renderer"

export default function Stage() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let alive = true
    let r: StageRenderer | undefined
    let offs: (() => void)[] = []
    const cancel = afterLoadIdle(() => {
      const canvas = ref.current
      if (!alive || !canvas) return
      try {
        r = new StageRenderer(canvas)
      } catch (err) {
        console.warn("[stage] falling back to static art:", err)
        return
      }
      const stage = r
      const last = stageBus.lastArt()
      if (last) stage.setArt(last)
      offs = [
        stageBus.on("art", (t) => stage.setArt(t)),
        stageBus.on("ripple", (x, y, s) => stage.ripple(x, y, s)),
        stageBus.on("wave", () => stage.wave()),
      ]
      stage.start()
    })
    return () => {
      alive = false
      cancel()
      offs.forEach((off) => off())
      r?.dispose()
    }
  }, [])

  return <canvas ref={ref} className="stage" aria-hidden data-testid="stage-canvas" />
}
