import { Chapter } from "@/components/deck/Chapter"
import { R } from "@/components/deck/Reveal"
import { ArtImage } from "@/components/ui/ArtImage"
import { ArrowUpRight } from "@/components/ui/Icons"
import { PromptBubble } from "@/components/ui/PromptBubble"
import { Replies } from "@/components/ui/Replies"
import { art } from "@/content/art"
import { site } from "@/content/site"
import { PostList } from "./PostList"

export function Writing() {
  return (
    <Chapter index={3} labelledBy="writing-title" className="ch-writing">
      <ArtImage art={art.quill} className="writing-art side-art" />
      <div className="copy-col writing-col" data-scroll>
        <R i={0}>
          <PromptBubble />
        </R>
        <R i={1} as="h2" id="writing-title" className="display-lg">
          i write <em className="serif">zero-one shot.</em>
        </R>
        <R i={2} as="p" className="lede">
          notes on startups, AI and the zeitgeist — read by 12k+ builders.
        </R>
        <R i={3}>
          <PostList />
        </R>
        <R i={4} className="row-actions">
          <a href={site.links.substack} target="_blank" rel="noopener" className="pill pill-solid press" data-testid="subscribe-link">
            subscribe <ArrowUpRight className="pill-arrow" />
          </a>
          <Replies options={[{ to: "ask", text: "can i ask you something?" }]} />
        </R>
      </div>
    </Chapter>
  )
}
