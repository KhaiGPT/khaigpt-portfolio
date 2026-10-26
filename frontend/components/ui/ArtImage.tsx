"use client"

import { useEffect, useRef } from "react"
import { useChapter } from "@/components/deck/Chapter"
import { MOBILE_ART_MQ, type Art } from "@/content/art"
import { stageBus } from "@/lib/stage-bus"
import { cn } from "@/lib/utils"

/**
 * Real, crawlable <img> that doubles as the layout anchor for the WebGL stage.
 * CSS positions it; the stage reads its rect every frame and renders the liquid version on top.
 */
export function ArtImage({ art, selected = true, priority = false, className }: { art: Art; selected?: boolean; priority?: boolean; className?: string }) {
  const ref = useRef<HTMLImageElement>(null)
  const { targeted } = useChapter()
  const on = targeted && selected

  useEffect(() => {
    if (on && ref.current) stageBus.emit("art", { art, el: ref.current })
  }, [on, art])

  const img = (
    <img
      ref={ref}
      src={art.src}
      width={art.w}
      height={art.h}
      alt={art.alt}
      draggable={false}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      data-art={art.id}
      data-on={on || undefined}
      className={cn("art-img", className)}
    />
  )
  if (!art.mobile) return img
  return (
    <picture>
      <source media={MOBILE_ART_MQ} srcSet={art.mobile.src} width={art.mobile.w} height={art.mobile.h} />
      {img}
    </picture>
  )
}
