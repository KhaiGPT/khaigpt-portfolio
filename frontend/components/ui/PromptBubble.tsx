"use client"

import { useChapter } from "@/components/deck/Chapter"
import { useDeck } from "@/components/deck/DeckProvider"
import { chapters } from "@/content/chapters"

/** Echo of the visitor's last "message" — what led them to this chapter. */
export function PromptBubble() {
  const { prompts } = useDeck()
  const { index } = useChapter()
  const text = prompts[index] ?? chapters[index].prompt
  return (
    <p className="glass prompt" data-testid={`prompt-${chapters[index].id}`}>
      <span className="prompt-who">you</span>
      <span>{text}</span>
    </p>
  )
}
