"use client"

import type { ReactNode } from "react"
import { stageBus } from "@/lib/stage-bus"

/** Hovering or tapping the headline makes the chrome hand wave back. */
export function WaveTrigger({ children }: { children: ReactNode }) {
  const wave = () => stageBus.emit("wave")
  return (
    <span className="wave-trigger" onPointerEnter={wave} onClick={wave} data-testid="wave-trigger">
      {children}
    </span>
  )
}
