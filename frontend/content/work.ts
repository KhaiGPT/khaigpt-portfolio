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
    company: "Promer AI · Firegroup",
    line: "core team building AI-native acquisition & workflow products for e-com teams. $1.1M incremental revenue at 2.5:1 LTV:CAC.",
    tags: ["Full-funnel", "−40% churn", "+30% activation"],
    art: "promer",
  },
  {
    id: "nakame",
    start: "2024",
    years: "2024 — 2025",
    role: "Founder",
    company: "Nakame",
    line: "AI companion with LLM chat, voice and real-time 3D. 20K users and 15M organic impressions through creator-led GTM.",
    tags: ["Consumer AI", "Creator GTM", "10-person team"],
    art: "nakame",
  },
  {
    id: "consulting",
    start: "2023",
    years: "2023 — now",
    role: "Product & Growth Consultant",
    company: "Independent consulting",
    line: "GTM for The Scourge ($1M+ sales, 1,000+ positive reviews) and growth for Delysium (47K concurrent users, ~20% D30).",
    tags: ["GTM", "Gaming", "AI"],
    art: "consulting",
  },
  {
    id: "indie",
    start: "2023",
    years: "2023 — now",
    role: "Indie App Developer",
    company: "Indie apps · RepTime",
    line: "solo-built an AI consumer app to $6K MRR. now shipping RepTime — a gamified screen-time blocker that locks distracting apps until you move.",
    tags: ["$6K MRR", "Consumer AI", "RepTime"],
    art: "indie",
  },
  {
    id: "sipher",
    start: "2021",
    years: "2021 — 2023",
    role: "Head of Marketing",
    company: "Sipher",
    line: "founding member. 50K beta pre-registrations, then ~1M players and #1 free game in key SEA markets.",
    tags: ["300K community", "$150K/mo media", "2.1x ROAS"],
    art: "playsipher",
  },
  {
    id: "mckinsey",
    start: "2018",
    years: "2018 — 2019",
    role: "Associate Consultant",
    company: "McKinsey & Company",
    line: "e-commerce transformation for major SEA retailers: online sales up 45%, LTV up 20%.",
    tags: ["Strategy", "E-commerce", "Lifecycle"],
    art: "mckinsey",
  },
  {
    id: "betteru",
    start: "2016",
    years: "2016 — 2020",
    role: "Founder & Managing Director",
    company: "BetterU Health & Wellness",
    line: "consumer F&B from 0→5 locations across Vietnam & Cambodia in 14 months, at ~30% MoM growth.",
    tags: ["P&L", "F&B", "35+ team"],
    art: "betteru",
  },
]
