import { ArrowUpRight } from "@/components/ui/Icons"
import { local } from "@/content/home"
import { site } from "@/content/site"
import { Facts, Section } from "./Section"

export function Local() {
  return (
    <Section id="local" n="03" kicker={local.kicker} title={local.title} dark>
      <div className="local">
        <div className="local-copy" data-rv>
          <p className="lede">{local.body}</p>
          <Facts items={local.verticals} />
          <ul className="does">
            {local.does.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="local-offer">{local.offer}</p>
          <a href={site.links.cal} target="_blank" rel="noopener" className="pill pill-solid press" data-testid="local-cta">
            {local.cta} <ArrowUpRight className="pill-arrow" />
          </a>
        </div>
        <figure className="phone" data-rv aria-label="Example: an AI assistant texting back a missed call and booking the job">
          <div className="phone-screen">
            {local.thread.map((m, i) => (
              <p key={i} className={`msg msg-${m.from}`} style={{ "--i": i } as React.CSSProperties}>
                {m.text}
              </p>
            ))}
          </div>
        </figure>
      </div>
    </Section>
  )
}
