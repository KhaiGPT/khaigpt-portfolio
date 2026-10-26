"use client"

import { useEffect, useState } from "react"

type Metric = { n: string; what: string }

/** The fourth proof tile: growth results roll past like a split-flap board. Hover pauses it. */
export function MetricRoll({ metrics }: { metrics: Metric[] }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = window.setInterval(() => setI((v) => (v + 1) % metrics.length), 2600)
    return () => clearInterval(t)
  }, [paused, metrics.length])

  const pos = (j: number) => (j === i ? "on" : j === (i - 1 + metrics.length) % metrics.length ? "out" : "in")

  return (
    <div className="proof-stat roll" data-rv style={{ "--i": 3 } as React.CSSProperties} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <dt className="proof-what">
        <span className="roll-window" aria-hidden>
          {metrics.map((m, j) => (
            <span key={m.n} className="roll-item" data-pos={pos(j)}>
              {m.what}
            </span>
          ))}
        </span>
        <span className="sr-only">More results: {metrics.map((m) => `${m.n} ${m.what}`).join("; ")}</span>
      </dt>
      <dd className="proof-n roll-window" aria-hidden>
        {metrics.map((m, j) => (
          <span key={m.n} className="roll-item" data-pos={pos(j)}>
            {m.n}
          </span>
        ))}
      </dd>
      <span className="roll-dots" aria-hidden>
        {metrics.map((m, j) => (
          <i key={m.n} data-on={j === i || undefined} />
        ))}
      </span>
    </div>
  )
}
