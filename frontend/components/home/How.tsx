import { steps } from "@/content/home"
import { Section } from "./Section"

export function How() {
  return (
    <Section id="how" kicker="How it starts" title="Three steps. No pitch deck.">
      <ol className="steps" data-rv>
        {steps.map((s, i) => (
          <li key={s.n} className="step" style={{ "--i": i } as React.CSSProperties}>
            <span className="step-n" aria-hidden>
              {s.n}
            </span>
            <h3 className="step-title">{s.title}</h3>
            <p className="step-body">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
