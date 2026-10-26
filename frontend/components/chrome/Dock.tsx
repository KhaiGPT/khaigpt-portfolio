import { ArrowUpRight } from "@/components/ui/Icons"
import { cta } from "@/content/home"
import { site } from "@/content/site"

/** Phone-only sticky CTA. Shows once the hero has turned to paper; hides over the final call to action. */
export function Dock() {
  return (
    <div className="dock" data-testid="mobile-dock">
      <a href={site.links.cal} target="_blank" rel="noopener" className="pill pill-solid press" data-testid="dock-book-call">
        {cta.primary} <ArrowUpRight className="pill-arrow" />
      </a>
    </div>
  )
}
