import { proof } from "@/content/home"

export function Proof() {
  return (
    <section className="proof wrap" aria-label="Results" data-testid="proof">
      <dl className="proof-stats">
        {proof.stats.map((s, i) => (
          <div key={s.n} className="proof-stat" data-rv style={{ "--i": i } as React.CSSProperties}>
            <dt>
              <span className="proof-what">{s.what}</span>
              <span className="proof-where">{s.where}</span>
            </dt>
            <dd className="proof-n">{s.n}</dd>
          </div>
        ))}
      </dl>
      <div className="proof-names" data-rv>
        <span className="label">Grown with</span>
        <ul>
          {proof.names.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
