import { proof } from "@/content/home"
import { CountUp } from "./CountUp"
import { MetricRoll } from "./MetricRoll"

export function Proof() {
  return (
    <section className="proof wrap" aria-label="Results" data-testid="proof">
      <dl className="proof-stats">
        {proof.stats.map((s, i) => (
          <div key={s.what} className="proof-stat spot" data-rv style={{ "--i": i } as React.CSSProperties}>
            <dt className="proof-what">{s.what}</dt>
            <dd className="proof-n">
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </dd>
          </div>
        ))}
        <MetricRoll metrics={proof.metrics} />
      </dl>
      <div className="marquee" data-rv aria-label="Companies I've grown products with">
        <span className="label marquee-label">Grown with</span>
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <ul key={k} aria-hidden={k === 1 || undefined}>
              {proof.names.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
