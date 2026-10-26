import { record } from "@/content/home"
import { Section } from "./Section"

export function Record() {
  return (
    <Section
      id="about"
      kicker="Who you’d work with"
      title={
        <>
          Hi, I’m Khai. Ex‑founder, ex‑McKinsey, <em className="serif">operator first.</em>
        </>
      }
    >
      <ol className="record" aria-label="Track record">
        {record.map((r, i) => (
          <li key={r.company} className="rec" data-rv style={{ "--i": i } as React.CSSProperties}>
            <span className="rec-years">{r.years}</span>
            <span className="rec-who">
              <strong>{r.company}</strong>
              <span>{r.role}</span>
            </span>
            <span className="rec-result">{r.result}</span>
          </li>
        ))}
      </ol>
    </Section>
  )
}
