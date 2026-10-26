import { ArrowUpRight } from "@/components/ui/Icons"
import { art } from "@/content/art"
import { notes } from "@/content/home"
import { site } from "@/content/site"
import { posts } from "@/content/writing"

export function Notes() {
  return (
    <section id="notes" className="sec notes" aria-labelledby="notes-title" data-testid="section-notes">
      <div className="wrap notes-grid">
        <header className="sec-head notes-head" data-rv>
          <p className="kicker">{notes.kicker}</p>
          <h2 id="notes-title" className="sec-title">
            {notes.title}
          </h2>
          <p className="lede">{notes.body}</p>
          <a href={site.links.substack} target="_blank" rel="noopener" className="glass pill press" data-testid="notes-subscribe">
            {notes.cta} <ArrowUpRight className="pill-arrow" />
          </a>
          <div className="art-tile notes-art">
            <img src={art.quill.src} width={art.quill.w} height={art.quill.h} alt={art.quill.alt} loading="lazy" decoding="async" />
          </div>
        </header>
        <ol className="posts">
          {posts.map((p, i) => (
            <li key={p.id} data-rv style={{ "--i": i } as React.CSSProperties}>
              <a href={p.href} target="_blank" rel="noopener" className="post spot" data-testid={`post-${p.id}`}>
                <span className="post-year">{p.year}</span>
                <span className="post-text">
                  <span className="post-title">{p.title}</span>
                  <span className="post-dek">{p.dek}</span>
                </span>
                <ArrowUpRight className="post-arrow" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
