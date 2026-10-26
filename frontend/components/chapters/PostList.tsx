"use client"

import { m } from "motion/react"
import { useState } from "react"
import { ArrowUpRight } from "@/components/ui/Icons"
import { posts } from "@/content/writing"

/** Post rows share one liquid-glass highlight that glides to whatever you hover. */
export function PostList() {
  const [hover, setHover] = useState<string | null>(null)
  return (
    <ul className="posts" onPointerLeave={() => setHover(null)} data-testid="post-list">
      {posts.map((p) => (
        <li key={p.id} onPointerEnter={() => setHover(p.id)}>
          <a href={p.href} target="_blank" rel="noopener" className="post" onFocus={() => setHover(p.id)} onBlur={() => setHover(null)} data-testid={`post-${p.id}`}>
            {hover === p.id && <m.span layoutId="post-hl" className="glass post-hl" transition={{ type: "spring", stiffness: 480, damping: 34 }} />}
            <span className="post-title">{p.title}</span>
            <span className="post-dek">{p.dek}</span>
            <span className="post-meta">
              {p.year}
              <ArrowUpRight className="post-arrow" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
