import { Chapter } from "@/components/deck/Chapter"
import { R } from "@/components/deck/Reveal"
import { ArtImage } from "@/components/ui/ArtImage"
import { PromptBubble } from "@/components/ui/PromptBubble"
import { Replies } from "@/components/ui/Replies"
import { art } from "@/content/art"

const stats = [
  { n: "10+", label: "years building" },
  { n: "12k+", label: "newsletter readers" },
  { n: "30%", label: "MoM growth, BetterU" },
  { n: "top 5", label: "fastest-growing SEA game ’22" },
]

export function About() {
  return (
    <Chapter index={1} labelledBy="about-title" className="ch-about">
      <ArtImage art={art.wings} className="about-art side-art" />
      <div className="copy-col" data-scroll>
        <R i={0}>
          <PromptBubble />
        </R>
        <R i={1} as="h2" id="about-title" className="display-lg">
          ex-founder, ex-McKinsey, now <em className="serif">solo leveling</em> consumer apps.
        </R>
        <R i={2} as="p" className="lede">
          10+ years building and scaling businesses across southeast asia — where startups, AI and growth meet.
        </R>
        <R i={3} as="dl" className="stats" data-testid="about-stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <dt>{s.label}</dt>
              <dd>{s.n}</dd>
            </div>
          ))}
        </R>
        <R i={4}>
          <Replies
            options={[
              { to: "work", text: "show me the receipts" },
              { to: "writing", text: "what do you write?" },
            ]}
          />
        </R>
      </div>
    </Chapter>
  )
}
