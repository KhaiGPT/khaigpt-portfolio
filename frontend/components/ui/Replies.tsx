"use client"

import type { MouseEvent } from "react"
import { useDeck } from "@/components/deck/DeckProvider"
import { chapterIndex, type Reply } from "@/content/chapters"
import { cn } from "@/lib/utils"
import { Reply as ReplyIcon } from "./Icons"

/** Conversational navigation: tap a reply, it becomes the prompt of the next chapter. */
export function Replies({ options, className }: { options: Reply[]; className?: string }) {
  const { go } = useDeck()

  const send = (o: Reply) => (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const origin = e.clientX || e.clientY ? { x: e.clientX, y: e.clientY } : { x: r.left + r.width / 2, y: r.top + r.height / 2 }
    go(chapterIndex(o.to), { prompt: o.text, origin })
  }

  return (
    <div className={cn("replies", className)} role="group" aria-label="Reply">
      {options.map((o) => (
        <button key={o.to + o.text} type="button" className="glass reply press" onClick={send(o)} data-testid={`reply-${o.to}`}>
          <ReplyIcon className="reply-icon" />
          <span>{o.text}</span>
        </button>
      ))}
    </div>
  )
}
