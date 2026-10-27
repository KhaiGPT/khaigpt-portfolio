import { interest } from "@/content/home"
import { InterestForm } from "./InterestForm"

export function Interest() {
  return (
    <section id={interest.id} className="sec interest" aria-labelledby="interest-title" data-testid="section-interest">
      <div className="wrap interest-grid">
        <header className="sec-head" data-rv>
          <p className="kicker">{interest.kicker}</p>
          <h2 id="interest-title" className="sec-title">
            {interest.title}
          </h2>
          <p className="lede">{interest.body}</p>
        </header>
        <div className="form-card" data-rv>
          <InterestForm />
        </div>
      </div>
    </section>
  )
}
