import { art } from "@/content/art"
import { about, record } from "@/content/home"
import { Portrait } from "./Portrait"
import { RecordList } from "./RecordList"

export function About() {
  return (
    <section id="about" className="sec about" aria-labelledby="about-title" data-testid="section-about">
      <div className="wrap about-grid">
        <div className="about-side" data-rv>
          <Portrait src={art.khai.src} w={art.khai.w} h={art.khai.h} alt={about.photoAlt} />
        </div>
        <div className="about-main">
          <header className="sec-head" data-rv>
            <p className="kicker">{about.kicker}</p>
            <h2 id="about-title" className="sec-title">
              {about.hello} <em className="serif">Operator first.</em>
            </h2>
            <p className="lede">{about.body}</p>
          </header>
          <RecordList roles={record} />
        </div>
      </div>
    </section>
  )
}
