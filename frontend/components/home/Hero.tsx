import { ArrowUpRight, ChevronDown } from "@/components/ui/Icons"
import { cta, hero } from "@/content/home"
import { site } from "@/content/site"
import { HeroScrub } from "./HeroScrub"

export function Hero() {
  return (
    <HeroScrub
      alt={hero.imageAlt}
      copy={
        <>
          <p className="eyebrow">
            <span className="live-dot" aria-hidden />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="hero-h1" data-testid="hero-title">
            Your app’s growth, <em className="serif">debugged</em> in 10&nbsp;days.
          </h1>
          <p className="hero-sub">{hero.sub}</p>
          <div className="hero-ctas">
            <a href={site.links.cal} target="_blank" rel="noopener" className="pill pill-solid shine press" data-testid="hero-book-call">
              {cta.primary} <ArrowUpRight className="pill-arrow" />
            </a>
            <a href="#help" className="glass pill press" data-testid="hero-see-help">
              {hero.secondary} <ChevronDown />
            </a>
          </div>
          <a href="#local" className="hero-alt" data-testid="hero-local-link">
            {hero.alt.lead} <span>{hero.alt.link} →</span>
          </a>
        </>
      }
    />
  )
}
