import { ArrowUpRight, Check } from "@/components/ui/Icons"
import { art } from "@/content/art"
import { fractional, help, local, sprint, workshop, type Package } from "@/content/home"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { PhoneThread } from "./PhoneThread"
import { StackFx } from "./StackFx"

const packages = [sprint, fractional, local, workshop]

/** Four package cards that pin and stack as you scroll: each new one slides over the last, which sinks back. */
export function Help() {
  return (
    <section id="help" className="sec help" aria-labelledby="help-title" data-testid="section-help">
      <div className="wrap">
        <header className="sec-head" data-rv>
          <p className="kicker">{help.kicker}</p>
          <h2 id="help-title" className="sec-title">
            {help.title}
          </h2>
        </header>
        <nav className="pkg-index" aria-label="Packages" data-rv>
          {packages.map((p, i) => (
            <a key={p.id} href={`#${p.id}`} className="pkg-chip press" data-testid={`pkg-chip-${p.id}`}>
              <span className="pkg-chip-n">0{i + 1}</span>
              {p.kicker}
            </a>
          ))}
        </nav>
        <div className="stack" data-stack>
          <Card p={sprint} i={0} visual={<SprintBoard />} />
          <Card p={fractional} i={1} visual={<Pipeline />} />
          <Card p={local} i={2} visual={<PhoneThread thread={local.thread} />} />
          <Card p={workshop} i={3} visual={<Seats />} />
        </div>
      </div>
      <StackFx />
    </section>
  )
}

function Card({ p, i, visual }: { p: Package; i: number; visual: ReactNode }) {
  return (
    <article
      id={p.id}
      className={cn("pkg", p.tone === "dark" && "pkg-dark")}
      data-dark={p.tone === "dark" ? "" : undefined}
      data-pkg
      style={{ "--i": i } as React.CSSProperties}
      aria-labelledby={`${p.id}-title`}
      data-testid={`pkg-${p.id}`}
    >
      <div className="pkg-in">
        <div className="pkg-copy">
          <p className="kicker">
            <span className="kicker-n">0{i + 1}</span>
            {p.kicker}
          </p>
          <h3 id={`${p.id}-title`} className="pkg-title">
            {p.title}
          </h3>
          <p className="pkg-body">{p.body}</p>
          <ul className="facts">
            {p.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="pkg-buy">
            <p className="price" data-testid={`${p.id}-price`}>
              {p.price}
              <span>{p.priceNote}</span>
            </p>
            <a href={site.links.cal} target="_blank" rel="noopener" className="pill pill-solid shine press" data-testid={`${p.id}-cta`}>
              {p.cta} <ArrowUpRight className="pill-arrow" />
            </a>
          </div>
        </div>
        <div className="pkg-visual">{visual}</div>
      </div>
    </article>
  )
}

/** A 10-day Gantt: phase bars fill day by day once the card arrives. Reads as a plan without a paragraph. */
function SprintBoard() {
  return (
    <figure className="board" aria-label="Sprint plan, day by day">
      <div className="board-days" aria-hidden>
        {Array.from({ length: 10 }, (_, d) => (
          <span key={d}>D{d + 1}</span>
        ))}
      </div>
      <ol className="board-rows">
        {sprint.phases.map((ph, k) => (
          <li key={ph.title} className="board-row" style={{ "--k": k } as React.CSSProperties}>
            <span className="board-text">
              <strong>{ph.title}</strong>
              <span>{ph.body}</span>
              <span className="sr-only">
                Day {ph.from} to {ph.to}
              </span>
            </span>
            <span className="board-track" aria-hidden>
              <span className="board-bar" style={{ gridColumn: `${ph.from} / ${ph.to + 1}` }} />
            </span>
          </li>
        ))}
      </ol>
      <ul className="board-keep" aria-label="You keep">
        {sprint.keep.map((k) => (
          <li key={k}>
            <Check />
            {k}
          </li>
        ))}
      </ul>
    </figure>
  )
}

/** The automation loop: a pulse runs the pipeline and lights each stage as it passes. */
function Pipeline() {
  const n = fractional.pipeline.length
  return (
    <figure className="pipe" aria-label="The automation I build and run">
      <img className="pipe-art" src={art.magnet.src} width={art.magnet.w} height={art.magnet.h} alt="" loading="lazy" decoding="async" />
      <ol className="flow" style={{ "--n": n } as React.CSSProperties}>
        <span className="flow-pulse" aria-hidden />
        {fractional.pipeline.map((step, i) => (
          <li key={step} style={{ "--i": i } as React.CSSProperties}>
            <span className="flow-dot" aria-hidden />
            {step}
          </li>
        ))}
      </ol>
    </figure>
  )
}

/** Fifteen seats; each lights up with a check as its person ships an automation. */
function Seats() {
  return (
    <figure className="seats" aria-label={`Up to ${workshop.seats} people, each leaving with one automation shipped`}>
      <img className="seats-art" src={art.bubble.src} width={art.bubble.w} height={art.bubble.h} alt={art.bubble.alt} loading="lazy" decoding="async" />
      <ol className="seat-grid" aria-hidden>
        {Array.from({ length: workshop.seats }, (_, s) => (
          <li key={s} style={{ "--s": s } as React.CSSProperties}>
            <Check />
          </li>
        ))}
      </ol>
      <figcaption>
        <span className="tabular">{workshop.seats}</span> people in · <span className="tabular">{workshop.seats}</span> automations out
      </figcaption>
    </figure>
  )
}
