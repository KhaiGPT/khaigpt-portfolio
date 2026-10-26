import { Chapter } from "@/components/deck/Chapter"
import { R } from "@/components/deck/Reveal"
import { ArtImage } from "@/components/ui/ArtImage"
import { Replies } from "@/components/ui/Replies"
import { art } from "@/content/art"

export function Hello() {
  return (
    <Chapter index={0} labelledBy="hello-title" className="ch-hello">
      <ArtImage art={art.hero} priority className="hero-art" />
      <div className="hello-copy">
        <div className="hello-name">
          <R i={0} as="p" className="eyebrow">
            <span className="live-dot" aria-hidden />
            available for new things
          </R>
          <R i={1} as="h1" id="hello-title" className="hero-title" data-testid="hero-title">
            Khai <span className="hero-break">Huynh</span>
          </R>
          <R i={2} as="p" className="hero-tag">
            i build things <span className="amp">&amp;</span> scale products.
          </R>
        </div>
        <R i={3} className="hello-replies">
          <Replies
            options={[
              { to: "about", text: "who are you?" },
              { to: "work", text: "show me your work" },
            ]}
          />
        </R>
      </div>
    </Chapter>
  )
}
