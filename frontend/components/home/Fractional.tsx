import { ArrowUpRight } from "@/components/ui/Icons"
import { art } from "@/content/art"
import { fractional } from "@/content/home"
import { site } from "@/content/site"
import { Facts, Section } from "./Section"

export function Fractional() {
  const n = fractional.pipeline.length
  return (
    <Section id="fractional" n="02" kicker={fractional.kicker} title={fractional.title}>
      <div className="frac">
        <div className="frac-copy" data-rv>
          <Facts items={fractional.facts} />
          <p className="lede">{fractional.body}</p>
          <p className="label">Every week</p>
          <ul className="weekly">
            {fractional.weekly.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          <a href={site.links.cal} target="_blank" rel="noopener" className="pill pill-solid press" data-testid="fractional-cta">
            {fractional.cta} <ArrowUpRight className="pill-arrow" />
          </a>
        </div>
        <div className="frac-flow" data-rv>
          <img className="frac-art" src={art.magnet.src} width={art.magnet.w} height={art.magnet.h} alt={art.magnet.alt} loading="lazy" decoding="async" />
          <ol className="flow" aria-label="The automation I build and run" style={{ "--n": n } as React.CSSProperties}>
            {fractional.pipeline.map((step, i) => (
              <li key={step} style={{ "--i": i } as React.CSSProperties}>
                <span className="flow-dot" aria-hidden />
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
