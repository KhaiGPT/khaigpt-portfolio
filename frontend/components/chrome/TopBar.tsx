import { ArrowUpRight } from "@/components/ui/Icons"
import { cta } from "@/content/home"
import { site } from "@/content/site"
import { TopNav } from "./TopNav"

export function TopBar() {
  return (
    <header className="topbar">
      <a href="#top" className="glass brand press chrome-in" data-testid="topbar-home">
        <span className="chrome-ball" aria-hidden />
        <span>khai huynh</span>
      </a>
      <TopNav />
      <a href={site.links.cal} target="_blank" rel="noopener" className="pill pill-solid pill-sm shine press chrome-in topbar-cta" data-testid="topbar-book-call">
        {cta.short} <ArrowUpRight className="pill-arrow" />
      </a>
    </header>
  )
}
