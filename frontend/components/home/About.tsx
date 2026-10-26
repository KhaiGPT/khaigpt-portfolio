import { about, record } from "@/content/home"
import { RecordList } from "./RecordList"

export function About() {
  return (
    <section id="about" className="sec about" aria-labelledby="about-title" data-testid="section-about">
      <div className="wrap about-grid">
        <header className="sec-head" data-rv>
          <p className="kicker">{about.kicker}</p>
          <h2 id="about-title" className="sec-title">
            {about.hello}
          </h2>
          <p className="lede">{about.body}</p>
        </header>
        <RecordList roles={record} />
      </div>
    </section>
  )
}
