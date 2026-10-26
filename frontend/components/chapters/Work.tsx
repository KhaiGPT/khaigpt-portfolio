import { Chapter } from "@/components/deck/Chapter"
import { R } from "@/components/deck/Reveal"
import { PromptBubble } from "@/components/ui/PromptBubble"
import { WorkExplorer } from "./WorkExplorer"

export function Work() {
  return (
    <Chapter index={2} labelledBy="work-title" className="ch-work">
      <WorkExplorer
        heading={
          <>
            <R i={0}>
              <PromptBubble />
            </R>
            <R i={1} as="h2" id="work-title" className="display-lg">
              receipts<span className="accent">.</span>
            </R>
          </>
        }
      />
    </Chapter>
  )
}
