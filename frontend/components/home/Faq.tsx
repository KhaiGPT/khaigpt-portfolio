import { ChevronDown } from "@/components/ui/Icons"
import { faqs } from "@/content/home"
import { Section } from "./Section"

export function Faq() {
  return (
    <Section id="faq" kicker="Questions" title="Before you book.">
      <div className="faq" data-rv>
        {faqs.map((f) => (
          <details key={f.id} className="qa" data-testid={`faq-${f.id}`}>
            <summary>
              {f.q}
              <ChevronDown className="qa-icon" />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
