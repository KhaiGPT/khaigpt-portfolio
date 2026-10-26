import { ArrowUpRight } from "@/components/ui/Icons"
import { art } from "@/content/art"
import { workshop } from "@/content/home"
import { site } from "@/content/site"
import { Facts } from "./Section"

export function Workshop() {
  return (
    <section id="workshops" className="sec sec-tight" aria-labelledby="workshops-title" data-testid="section-workshops">
      <div className="wrap">
        <div className="ws glass" data-rv>
          <div className="art-tile ws-art">
            <img src={art.bubble.src} width={art.bubble.w} height={art.bubble.h} alt={art.bubble.alt} loading="lazy" decoding="async" />
          </div>
          <div className="ws-copy">
            <p className="kicker">
              <span className="kicker-n">04</span>
              {workshop.kicker}
            </p>
            <h2 id="workshops-title" className="ws-title">
              {workshop.title}
            </h2>
            <p className="ws-body">{workshop.body}</p>
            <Facts items={workshop.facts} />
          </div>
          <a href={site.links.cal} target="_blank" rel="noopener" className="glass pill press ws-cta" data-testid="workshop-cta">
            {workshop.cta} <ArrowUpRight className="pill-arrow" />
          </a>
        </div>
      </div>
    </section>
  )
}
