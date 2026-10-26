import type { Metadata } from "next"
import { Reply as ReplyIcon } from "@/components/ui/Icons"
import { art } from "@/content/art"
import { nav } from "@/content/home"

export const metadata: Metadata = { title: "Lost in the clouds" }

export default function NotFound() {
  const { wings } = art
  return (
    <main className="nf" data-testid="not-found-page">
      <img src={wings.src} width={wings.w} height={wings.h} alt={wings.alt} className="nf-art" fetchPriority="high" />
      <p className="nf-code" data-testid="not-found-code">
        404
      </p>
      <h1 className="nf-title">this page flew too close to the sun.</h1>
      <p className="nf-lede">the link might be old, or it never existed. jump back in:</p>
      <nav aria-label="Sections" className="nf-links">
        {nav.map((n) => (
          <a key={n.id} href={`/#${n.id}`} className="glass pill press" data-testid={`not-found-link-${n.id}`}>
            <ReplyIcon className="reply-icon" />
            {n.label}
          </a>
        ))}
      </nav>
      <a href="/" className="pill pill-solid press" data-testid="not-found-home">
        take me home
      </a>
    </main>
  )
}
