import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Section shell: kicker, headline, then whatever the section needs. */
export function Section({ id, kicker, title, className, children }: { id: string; kicker: string; title: ReactNode; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn("sec", className)} aria-labelledby={`${id}-title`} data-testid={`section-${id}`}>
      <div className="wrap">
        <header className="sec-head" data-rv>
          <p className="kicker">{kicker}</p>
          <h2 id={`${id}-title`} className="sec-title">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  )
}
