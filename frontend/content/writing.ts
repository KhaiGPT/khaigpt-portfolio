export type Post = { id: string; title: string; dek: string; year: string; href: string }

const p = (slug: string) => `https://khaigpt.substack.com/p/${slug}`

export const posts: Post[] = [
  {
    id: "moat",
    title: "thinking is the only moat left.",
    dek: "and most people are giving it away for free.",
    year: "2025",
    href: p("thinking-is-the-only-moat-left"),
  },
  {
    id: "four-body",
    title: "openai's four-body problem.",
    dek: "why openai is actually four companies in a trench coat.",
    year: "2025",
    href: p("openais-four-body-problem"),
  },
  {
    id: "fun",
    title: "optimize for “fun”.",
    dek: "why it beats every dashboard you're staring at.",
    year: "2025",
    href: p("optimize-for-fun"),
  },
  {
    id: "code",
    title: "do we all have to learn to code now?",
    dek: "a realistic guide to vibe coding.",
    year: "2025",
    href: p("so-we-all-have-to-learn-to-code-now"),
  },
  {
    id: "limits",
    title: "on finding limits.",
    dek: "from a race car story.",
    year: "2026",
    href: p("on-finding-limits"),
  },
]
