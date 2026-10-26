import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Numbered section shell: kicker, headline, then whatever the offer needs. */
export function Section({
  id,
  n,
  kicker,
  title,
  dark,
  className,
  children,
}: {
  id: string
  n?: string
  kicker: string
  title: ReactNode
  dark?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={cn("sec", dark && "sec-dark", className)} data-dark={dark ? "" : undefined} aria-labelledby={`${id}-title`} data-testid={`section-${id}`}>
      <div className="wrap">
        <header className="sec-head" data-rv>
          <p className="kicker">
            {n && <span className="kicker-n">{n}</span>}
            {kicker}
          </p>
          <h2 id={`${id}-title`} className="sec-title">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  )
}

export function Facts({ items }: { items: readonly string[] }) {
  return (
    <ul className="facts">
      {items.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  )
}
