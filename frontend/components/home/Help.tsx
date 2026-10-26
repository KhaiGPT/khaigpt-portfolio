import { ArrowUpRight } from "@/components/ui/Icons"
import { InfoTip } from "@/components/ui/InfoTip"
import { art } from "@/content/art"
import { fractional, help, local, sprint, workshop, type Package } from "@/content/home"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { Playbooks } from "./Playbooks"
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
              {p.title}
            </a>
          ))}
        </nav>
        <div className="stack">
          <Card p={sprint} i={0} visual={<SprintBoard />} />
          <Card p={fractional} i={1} visual={<Funnel />} />
          <Card p={local} i={2} visual={<Pipeline steps={local.pipeline} />} />
          <Card p={workshop} i={3} visual={<Playbooks playbooks={workshop.playbooks} />} />
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
            <InfoTip text={p.info} label={`More about ${p.title}`} className="tip-lg" />
          </h3>
          <p className="pkg-body">{p.body}</p>
          <ul className="facts">
            {p.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="pkg-buy">
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

/** A 10-day gantt that fills itself in once the card arrives. Each phase's detail sits behind its ⓘ. */
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
              <InfoTip text={ph.info} label={`About “${ph.title}”`} />
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
    </figure>
  )
}

/** Week after week the funnel widens: each bar grows from where it started (the ghost line) to where tests took it. */
function Funnel() {
  const w = (v: number) => Math.sqrt(v / 100) // root scale, so the small paid step is still visible
  return (
    <figure className="funnel" aria-label="Example funnel, before and after a few months of weekly tests">
      <p className="funnel-head">
        <span className="plays-eg">Example</span>
        Your funnel, week 1 → week 12
      </p>
      <ol>
        {fractional.funnel.map((st, k) => (
          <li key={st.label} className="funnel-row" style={{ "--a": w(st.from), "--b": w(st.to), "--k": k } as React.CSSProperties}>
            <span className="funnel-label">{st.label}</span>
            <span className="funnel-track" aria-hidden>
              <span className="funnel-ghost" />
              <span className="funnel-bar" />
            </span>
            <span className="funnel-n">
              {st.from !== st.to && <s>{st.from}%</s>}
              {st.to}%
            </span>
          </li>
        ))}
      </ol>
    </figure>
  )
}

/** The automation loop: a pulse runs the pipeline and lights each stage as it passes. */
function Pipeline({ steps }: { steps: string[] }) {
  const n = steps.length
  return (
    <figure className="pipe" aria-label="The automation I build and run">
      <img className="pipe-art" src={art.magnet.src} width={art.magnet.w} height={art.magnet.h} alt="" loading="lazy" decoding="async" />
      <ol className="flow" style={{ "--n": n } as React.CSSProperties}>
        <span className="flow-pulse" aria-hidden />
        {steps.map((step, i) => (
          <li key={step} style={{ "--i": i } as React.CSSProperties}>
            <span className="flow-dot" aria-hidden />
            {step}
          </li>
        ))}
      </ol>
    </figure>
  )
}
