/**
 * All landing-page copy lives here. Rule of thumb: say what it is, for whom, in one line.
 * Anything longer goes in an `info` tip (the ⓘ next to a title) instead of on the page.
 * No prices on the page: Khai quotes after the call.
 */
import type { ArtKey } from "./art"

export const nav = [
  { id: "help", label: "How I help" },
  { id: "about", label: "About" },
  { id: "notes", label: "Notes" },
  { id: "faq", label: "FAQ" },
] as const

export const cta = {
  primary: "Book a free call",
  short: "Book a call",
}

export const hero = {
  eyebrow: "Khai Huynh · Growth & AI consultant",
  sub: ["Growth for mobile apps.", "AI setup for local businesses.", "Practical AI training for teams."],
  secondary: "See how I help",
  imageAlt: "Two liquid-chrome hands reaching for each other across a black void, fingertips about to touch",
}

/** value counts up from 0 */
export type Stat = { value: number; prefix?: string; suffix?: string; what: string }

export const proof = {
  stats: <Stat[]>[
    { value: 5, suffix: "M+", what: "users grown" },
    { value: 40, prefix: "$", suffix: "M+", what: "revenue" },
    { value: 100, prefix: "$", suffix: "K", what: "ARR, solo-built" },
  ],
  /** the fourth tile rolls through these */
  metrics: [
    { n: "SEA", what: "market expansion" },
    { n: "−40%", what: "churn" },
    { n: "+30%", what: "activation" },
    { n: "2.1x", what: "ROAS" },
    { n: "+45%", what: "online sales" },
  ],
  names: ["McKinsey & Company", "Sipher", "Promer AI", "Project SEED", "Ancient8", "Menlo AI", "Delysium", "The Scourge", "Firegroup", "Nakame"],
}

export const help = {
  kicker: "How I can help",
  title: "Four ways to work together.",
}

export type Package = {
  id: string
  tone: "light" | "dark"
  /** who it is for */
  kicker: string
  /** the plain name of the service */
  title: string
  /** one line: what you get */
  body: string
  facts: string[]
  info: string
  cta: string
}

export const sprint = {
  id: "sprint",
  tone: "light",
  kicker: "For mobile apps, pre-launch or live",
  title: "Growth Sprint",
  body: "I research your market, audit your product and funnel, and hand you a growth plan with the first tests running.",
  facts: ["7–10 days", "Fixed scope"],
  info: "Pre-launch: market research, positioning, a growth model and a launch plan. Live: tracking check, store/onboarding/paywall audit, and 3–5 tests. You keep every doc.",
  cta: "Book a free call",
  phases: [
    { from: 1, to: 2, title: "Market research", info: "Competitors, audience and what they pay for — or, for live apps, a check that your tracking and revenue data agree." },
    { from: 3, to: 5, title: "Product audit", info: "Store page, onboarding, paywall and the core loop, screen by screen." },
    { from: 6, to: 7, title: "Growth model", info: "Where users come from, what they’re worth, and which channels to bet on." },
    { from: 8, to: 10, title: "Launch tests", info: "3–5 experiments or launch steps live, each with a clear success metric." },
  ],
} satisfies Package & Record<string, unknown>

export type Step = { label: string; from: number; to: number }

export const fractional = {
  id: "fractional",
  tone: "dark",
  kicker: "For mobile apps, pre-launch to scale",
  title: "Part-time Growth Lead",
  body: "I join your team a few hours a week to plan, launch and grow your app.",
  facts: ["5–10 hrs / week", "Monthly"],
  info: "Pre-launch: market research, positioning, growth model and launch plan. After launch: weekly tests, ads, onboarding and paywall work, lifecycle and reporting.",
  cta: "Book a free call",
  /** an example funnel, before and after a few months of weekly tests (share of visitors left at each step) */
  funnel: <Step[]>[
    { label: "Store visits", from: 100, to: 100 },
    { label: "Installs", from: 28, to: 41 },
    { label: "Trials", from: 9, to: 16 },
    { label: "Paid", from: 2.4, to: 5.1 },
  ],
} satisfies Package & Record<string, unknown>

export const local = {
  id: "local",
  tone: "light",
  kicker: "For local service businesses",
  title: "AI Automation",
  body: "AI that captures every lead, follows up in seconds, books the job and keeps your CRM up to date.",
  facts: ["HVAC", "Dental", "Roofing", "Medspa", "Restaurants"],
  info: "Built on the phone line, calendar and CRM you already use. Start with a free check: I contact your business like a customer and show you where leads slip.",
  cta: "Get a free lead check",
  pipeline: ["Lead capture", "Content system", "CRM update", "Instant follow-up", "Booking", "Reporting"],
} satisfies Package & Record<string, unknown>

export type Playbook = { id: string; role: string; task: string; before: { time: string; mins: number; how: string }; after: { time: string; mins: number; how: string } }

export const workshop = {
  id: "workshops",
  tone: "dark",
  kicker: "For marketers, ops & growth people",
  title: "Practical AI Training",
  body: "Put AI to work in the job you already have, with a playbook for your role.",
  facts: ["Half day", "Teams up to 15", "No coding"],
  info: "Made for mid-career people. You work on your own real tasks, not demos, and leave with before/after workflows you can copy on Monday.",
  cta: "Ask about training",
  playbooks: <Playbook[]>[
    {
      id: "marketing",
      role: "Marketing",
      task: "Campaign brief + 10 ad variations",
      before: { time: "4 hrs", mins: 240, how: "Research, brief and every variation by hand" },
      after: { time: "45 min", mins: 45, how: "AI drafts the research and variations; you edit and choose" },
    },
    {
      id: "ops",
      role: "Ops",
      task: "Weekly team report",
      before: { time: "2 hrs", mins: 120, how: "Copy-paste from five tools" },
      after: { time: "15 min", mins: 15, how: "Built automatically; you add the story" },
    },
    {
      id: "growth",
      role: "Growth",
      task: "Funnel & cohort check",
      before: { time: "3 hrs", mins: 180, how: "Spreadsheets and pivot tables" },
      after: { time: "30 min", mins: 30, how: "AI runs the analysis; you check the outliers" },
    },
  ],
} satisfies Package & Record<string, unknown>

export const steps = [
  { n: "1", title: "Free call", body: "20 minutes. Tell me what’s stuck." },
  { n: "2", title: "Clear plan", body: "Scope and price, in writing." },
  { n: "3", title: "Start", body: "On a date you pick." },
]

export type Role = { years: string; company: string; role: string; result: string; art: ArtKey }

export const about = {
  kicker: "About",
  hello: "Hi, I’m Khai.",
  body: "10+ years in Growth and GTM. Ex-McKinsey and VC-backed founder. Now solo building apps and sharing what I learn.",
}

export const record: Role[] = [
  { years: "2025 — now", company: "Promer AI · Firegroup", role: "Head of Growth Marketing", result: "$1.1M new revenue, −40% churn, +30% activation", art: "magnet" },
  { years: "2025 — now", company: "Indie apps · RepTime", role: "Solo builder", result: "AI consumer apps to $100K ARR. Now building RepTime.", art: "reptime" },
  { years: "2023 — now", company: "Independent", role: "Product & Growth Advisor", result: "The Scourge: $1M+ sales · Delysium: 47K concurrent users", art: "compass" },
  { years: "2024 — 2025", company: "Nakame", role: "Founder", result: "AI companion app, 20K users, 15M organic views", art: "dice" },
  { years: "2021 — 2023", company: "Sipher", role: "Head of Marketing", result: "~1M players, 2.1x ROAS on ~$150K/mo ads", art: "joystick" },
  { years: "2018 — 2019", company: "McKinsey & Company", role: "Associate Consultant", result: "Retail clients: online sales +45%, LTV +20%", art: "knight" },
  { years: "2016 — 2020", company: "BetterU", role: "Founder & MD", result: "0 → 5 stores in 14 months, 35+ people", art: "avocado" },
]

export const notes = {
  kicker: "Notes",
  title: "Free AI and growth tips.",
  body: "From my newsletter, read by 12k+ founders and operators.",
  cta: "Subscribe",
}

/** The “not ready for a call” form. Submissions go to Khai’s inbox via Web3Forms (site.form). */
export const interest = {
  id: "interest",
  kicker: "Not ready for a call?",
  title: "Leave your details.",
  body: "Tell me where you are. I’ll reply by email.",
  services: [
    { id: "sprint", label: "Growth Sprint" },
    { id: "fractional", label: "Part-time Growth Lead" },
    { id: "local", label: "AI Automation" },
    { id: "workshops", label: "Practical AI Training" },
    { id: "unsure", label: "Not sure yet" },
  ],
  revenue: ["Pre-launch / no revenue yet", "Below $250K", "$250K–$500K", "$500K–$1M", "$1M–$3M", "Over $3M"],
  submit: "Send",
  done: { title: "Got it, thanks.", body: "I’ll reply by email. If it’s urgent, book a free call instead." },
  cardLink: "Not ready? Leave your details",
}

export type Faq = { id: string; q: string; a: string }

export const faqs: Faq[] = [
  {
    id: "price",
    q: "How much does it cost?",
    a: "It depends on the scope. After a free 20-min call, you get a fixed price in writing.",
  },
  {
    id: "fit",
    q: "My app isn’t live yet. Can you help?",
    a: "Yes. Before launch I cover market research, product audit, positioning and a growth model, so you launch with a plan instead of a guess.",
  },
  {
    id: "need",
    q: "What do you need from us?",
    a: "Read access to your analytics, app store console and ad accounts, plus one contact person. Most of the work is async.",
  },
  {
    id: "training",
    q: "Who is the AI training for?",
    a: "Mid-career marketers, ops and growth people. No coding. You learn on your own tasks, with a playbook for your role.",
  },
  {
    id: "local",
    q: "I run a local business. Do I need to be technical?",
    a: "No. I connect the tools you already use, train your team, and keep an eye on it.",
  },
  {
    id: "tz",
    q: "Where are you based?",
    a: "Ho Chi Minh City (GMT+7). I work with teams in the US, Europe and Asia, and book calls at a time that suits you.",
  },
]

export const contact = {
  title: "Let’s talk.",
  body: "20 minutes, free. Tell me what’s stuck.",
}
