import { ArrowUpRight } from "@/components/ui/Icons"
import { cta, nav } from "@/content/home"
import { site } from "@/content/site"

export function TopBar() {
  return (
    <header className="topbar">
      <a href="#top" className="glass brand press chrome-in" data-testid="topbar-home">
        <span className="chrome-ball" aria-hidden />
        <span>khai huynh</span>
      </a>
      <nav aria-label="Sections" className="glass topnav chrome-in">
        <ul>
          {nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} data-testid={`nav-${n.id}`}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a href={site.links.cal} target="_blank" rel="noopener" className="pill pill-solid pill-sm press chrome-in topbar-cta" data-testid="topbar-book-call">
        {cta.short} <ArrowUpRight className="pill-arrow" />
      </a>
    </header>
  )
}
