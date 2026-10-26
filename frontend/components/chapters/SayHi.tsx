import { Chapter } from "@/components/deck/Chapter"
import { R } from "@/components/deck/Reveal"
import { ArtImage } from "@/components/ui/ArtImage"
import { CopyEmail } from "@/components/ui/CopyEmail"
import { ArrowUp, ArrowUpRight, BrandIcon } from "@/components/ui/Icons"
import { PromptBubble } from "@/components/ui/PromptBubble"
import { art } from "@/content/art"
import { site, socials } from "@/content/site"
import { WaveTrigger } from "./WaveTrigger"

export function SayHi() {
  return (
    <Chapter index={5} labelledBy="hi-title" className="ch-hi">
      <ArtImage art={art.wave} className="hi-art side-art" />
      <div className="copy-col hi-col">
        <R i={0}>
          <PromptBubble />
        </R>
        <R i={1} as="h2" id="hi-title" className="display-xl">
          <WaveTrigger>
            say hi<span className="accent">.</span>
          </WaveTrigger>
        </R>
        <R i={2}>
          <CopyEmail />
        </R>
        <R i={3} className="row-actions">
          <a href={site.links.cal} target="_blank" rel="noopener" className="pill pill-solid press" data-testid="book-chat-link">
            book a chat <ArrowUpRight className="pill-arrow" />
          </a>
          <ul className="socials" aria-label="Elsewhere">
            {socials.map((s) => (
              <li key={s.id} data-tip={s.label}>
                <a href={s.href} target="_blank" rel="noopener me" aria-label={s.label} className="glass social press" data-testid={`social-${s.id}`}>
                  <BrandIcon id={s.id} />
                </a>
              </li>
            ))}
          </ul>
        </R>
        <R i={4} as="footer" className="foot">
          <span>© {new Date().getFullYear()} Khai Huynh</span>
          <a href="#hello" className="foot-top" data-testid="back-to-top">
            back to the start <ArrowUp />
          </a>
        </R>
      </div>
    </Chapter>
  )
}
