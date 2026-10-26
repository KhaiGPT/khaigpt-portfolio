import { ArrowUpRight, Check } from "@/components/ui/Icons"
import { art } from "@/content/art"
import { sprint } from "@/content/home"
import { site } from "@/content/site"
import { Facts, Section } from "./Section"

export function Sprint() {
  return (
    <Section id="sprint" n="01" kicker={sprint.kicker} title={sprint.title}>
      <div className="offer-top" data-rv>
        <Facts items={sprint.facts} />
        <p className="fit">{sprint.fit}</p>
      </div>

      <ol className="phases" aria-label="Sprint timeline">
        {sprint.phases.map((ph, i) => (
          <li key={ph.days} className="phase" data-rv style={{ "--i": i } as React.CSSProperties}>
            <span className="phase-days">{ph.days}</span>
            <h3 className="phase-title">{ph.title}</h3>
            <p className="phase-body">{ph.body}</p>
          </li>
        ))}
      </ol>

      <div className="offer-foot" data-rv>
        <div className="art-tile" aria-hidden={false}>
          <img src={art.compass.src} width={art.compass.w} height={art.compass.h} alt={art.compass.alt} loading="lazy" decoding="async" />
        </div>
        <div className="keep">
          <p className="label">You keep</p>
          <ul className="keep-list">
            {sprint.keep.map((k) => (
              <li key={k}>
                <Check className="keep-check" />
                {k}
              </li>
            ))}
          </ul>
        </div>
        <div className="buy">
          <p className="price" data-testid="sprint-price">
            {sprint.price ?? (
              <>
                Fixed price<span>quoted on the call</span>
              </>
            )}
          </p>
          <a href={site.links.cal} target="_blank" rel="noopener" className="pill pill-solid press" data-testid="sprint-cta">
            {sprint.cta} <ArrowUpRight className="pill-arrow" />
          </a>
        </div>
      </div>
    </Section>
  )
}
