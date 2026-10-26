import type { ArtKey } from "./art"

export type Role = {
  id: string
  start: string
  years: string
  role: string
  company: string
  line: string
  tags: string[]
  art: ArtKey
}

export const roles: Role[] = [
  {
    id: "promer",
    start: "2025",
    years: "2025 — now",
    role: "Head of Growth Marketing",
    company: "Promer.ai",
    line: "core team helping e-com & DTC brands scale acquisition with AI.",
    tags: ["GTM", "PLG", "ASO"],
    art: "promer",
  },
  {
    id: "substack",
    start: "2025",
    years: "2025 — now",
    role: "Indie Builder & Writer",
    company: "Zero-One Shot",
    line: "decoding the early signals in startups, tech & culture. shipping stuff on the side.",
    tags: ["12k+ readers", "AI coding", "Content"],
    art: "substack",
  },
  {
    id: "nakame",
    start: "2024",
    years: "2024 — 2025",
    role: "Founder",
    company: "Nakame.social",
    line: "a wholesome mash-up of AI companion and Mario Party, with feel-good games.",
    tags: ["Consumer", "Product", "Games"],
    art: "nakame",
  },
  {
    id: "consulting",
    start: "2022",
    years: "2022 — now",
    role: "GTM & Growth Advisor",
    company: "Fractional Head of Growth",
    line: "finding the right go-to-market wedge, then scaling it for consumer & gaming teams.",
    tags: ["Growth loops", "Consumer", "Gaming"],
    art: "consulting",
  },
  {
    id: "playsipher",
    start: "2021",
    years: "2021 — 2023",
    role: "Head of Marketing",
    company: "PlaySipher · Ather Labs",
    line: "founding member. top-5 fastest-growing free game in SEA, 2022.",
    tags: ["GTM", "P&L", "Attribution"],
    art: "playsipher",
  },
  {
    id: "mckinsey",
    start: "2018",
    years: "2018 — 2019",
    role: "Associate Consultant",
    company: "McKinsey & Company",
    line: "tech-sector strategy with a focus on e-commerce transformation.",
    tags: ["Strategy", "E-commerce", "Positioning"],
    art: "mckinsey",
  },
  {
    id: "betteru",
    start: "2016",
    years: "2016 — 2020",
    role: "Founder & Managing Director",
    company: "BetterU Health & Wellness",
    line: "bootstrapped F&B at 30% monthly growth — outlets in Vietnam & Cambodia within 14 months.",
    tags: ["Bootstrapped", "F&B", "Ops"],
    art: "betteru",
  },
]
