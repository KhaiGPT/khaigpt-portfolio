import { Chapter } from "@/components/deck/Chapter"
import { R } from "@/components/deck/Reveal"
import { ArtImage } from "@/components/ui/ArtImage"
import { PromptBubble } from "@/components/ui/PromptBubble"
import { art } from "@/content/art"
import { faqs } from "@/content/faq"
import { AskThread } from "./AskThread"

export function Ask() {
  return (
    <Chapter index={4} labelledBy="ask-title" className="ch-ask">
      <ArtImage art={art.bubble} className="ask-art side-art" />
      <div className="copy-col ask-col">
        <R i={0}>
          <PromptBubble />
        </R>
        <R i={1} as="h2" id="ask-title" className="display-md">
          sure — <em className="serif">ask away.</em>
        </R>
        <R i={2} className="ask-wrap">
          <AskThread />
        </R>
      </div>
      {/* full Q&A for screen readers & crawlers; the visual version is the chat above */}
      <dl className="sr-only">
        {faqs.map((f) => (
          <div key={f.id}>
            <dt>{f.q}</dt>
            <dd>{f.a}</dd>
          </div>
        ))}
      </dl>
    </Chapter>
  )
}
