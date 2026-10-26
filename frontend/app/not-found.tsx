import type { Metadata } from "next"
import { Reply as ReplyIcon } from "@/components/ui/Icons"
import { art } from "@/content/art"
import { chapters } from "@/content/chapters"

export const metadata: Metadata = { title: "Lost in the clouds" }

export default function NotFound() {
  const { wings } = art
  return (
    <main className="nf" data-testid="not-found-page">
      <img src={wings.src} width={wings.w} height={wings.h} alt={wings.alt} className="nf-art" fetchPriority="high" />
      <p className="nf-code" data-testid="not-found-code">404</p>
      <h1 className="display-lg">this page flew too close to the sun.</h1>
      <p className="nf-lede">the link might be old, or it never existed. pick up the conversation somewhere else:</p>
      <nav aria-label="Sections" className="replies">
        {chapters.slice(1).map((c) => (
          <a key={c.id} href={`/#${c.id}`} className="glass reply press" data-testid={`not-found-link-${c.id}`}>
            <ReplyIcon className="reply-icon" />
            <span>{c.prompt}</span>
          </a>
        ))}
      </nav>
      <a href="/" className="pill pill-solid press" data-testid="not-found-home">
        take me home
      </a>
    </main>
  )
}
