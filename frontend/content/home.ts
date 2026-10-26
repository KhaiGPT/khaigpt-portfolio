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

/** value counts up from 0; label renders as-is */
export type Stat = { value: number; prefix?: string; suffix?: string; label?: string; what: string; info: string }

export const proof = {
  stats: <Stat[]>[
    { value: 1, suffix: "M+", what: "users grown", info: "Across the consumer apps and games I’ve grown, incl. ~1M players at Sipher." },
    { value: 0, label: "SEA", what: "market expansion", info: "Vietnam and Cambodia with BetterU; #1 free game in key SEA markets with Sipher." },
    { value: 6, prefix: "$", suffix: "K", what: "MRR, solo-built", info: "A consumer AI app I built and grew on my own." },
  ],
  /** the fourth tile rolls through these */
  metrics: [
    { n: "−40%", what: "churn", info: "Cohort churn at Promer AI" },
    { n: "+30%", what: "activation", info: "At Promer AI" },
    { n: "$1.1M", what: "new revenue", info: "Incremental revenue at Promer AI, at 2.5:1 LTV:CAC" },
    { n: "2.1x", what: "ROAS", info: "On ~$150K/month of ads at Sipher" },
    { n: "+45%", what: "online sales", info: "For a retail client at McKinsey" },
  ],
  names: ["McKinsey & Company", "Sipher", "Promer AI", "Delysium", "The Scourge", "Firegroup", "Nakame"],
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
  kicker: "For mobile apps",
  title: "Growth Sprint",
  body: "I find where your app loses users and revenue, then launch the first fixes.",
  facts: ["7–10 days", "Fixed scope"],
  info: "Best for live apps with subscriptions or in-app purchases. You keep: a ranked fix list, a clean tracking plan, a test backlog and creative briefs.",
  cta: "Book a free call",
  phases: [
    { from: 1, to: 2, title: "Check tracking", info: "Make sure your MMP, SKAN, events and revenue numbers agree." },
    { from: 3, to: 5, title: "Find the leaks", info: "Store page, onboarding and paywall, screen by screen." },
    { from: 6, to: 7, title: "Plan the ads", info: "Which channels to spend on, and which creatives to test." },
    { from: 8, to: 10, title: "Launch tests", info: "3–5 experiments live, each with a clear success metric." },
  ],
} satisfies Package & Record<string, unknown>

export const fractional = {
  id: "fractional",
  tone: "dark",
  kicker: "For mobile apps, ongoing",
  title: "Part-time Growth Lead",
  body: "I join your team a few hours a week to run tests, ads and automation.",
  facts: ["5–10 hrs / week", "Monthly"],
  info: "Usually after a Growth Sprint. A 30-min sync each week, new tests every week, and the automation on the right — built and kept running.",
  cta: "Book a free call",
  pipeline: ["Lead capture", "Qualify", "CRM update", "Instant follow-up", "Booking", "Lifecycle triggers", "Reporting"],
} satisfies Package & Record<string, unknown>

export type Msg = { from: "them" | "ai" | "sys"; text: string }

export const local = {
  id: "local",
  tone: "light",
  kicker: "For local service businesses",
  title: "AI Receptionist",
  body: "Answers missed calls and texts, books the job, and follows up. Day and night.",
  facts: ["HVAC", "Dental", "Roofing", "Medspa", "Restaurants"],
  info: "Works with the phone line, calendar and CRM you already use. Start with a free check: I contact your business like a customer and show you where leads slip.",
  cta: "Get a free missed-call check",
  thread: [
    { from: "sys", text: "Missed call · 9:42 PM" },
    { from: "ai", text: "Hi, it’s Northside Heating — sorry we missed you! What’s going on?" },
    { from: "them", text: "AC stopped blowing cold" },
    { from: "ai", text: "On it. A tech can come tomorrow 8–10am or 1–3pm. Which works?" },
    { from: "them", text: "8–10 please" },
    { from: "sys", text: "Booked · added to CRM · tech notified" },
  ] satisfies Msg[],
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
  body: "10+ years in growth. Ex-McKinsey, two-time founder. I still build my own apps, so I test ideas with my own money first.",
}

export const record: Role[] = [
  { years: "2025 — now", company: "Promer AI · Firegroup", role: "Head of Growth Marketing", result: "$1.1M new revenue, −40% churn, +30% activation", art: "magnet" },
  { years: "2023 — now", company: "Independent", role: "Product & Growth Advisor", result: "The Scourge: $1M+ sales · Delysium: 47K concurrent users", art: "compass" },
  { years: "2025 — now", company: "Indie apps · RepTime", role: "Solo builder", result: "AI consumer app to $6K MRR. Now building RepTime.", art: "reptime" },
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

export type Faq = { id: string; q: string; a: string }

export const faqs: Faq[] = [
  {
    id: "price",
    q: "How much does it cost?",
    a: "It depends on the scope. After a free 20-min call, you get a fixed price in writing.",
  },
  {
    id: "fit",
    q: "Is my app a good fit?",
    a: "Best fit: a live app with real users and subscriptions or in-app purchases. Not live yet? Book anyway — I’ll tell you honestly if it’s too early.",
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
    a: "No. I set it up on the tools you already use, train your team, and keep an eye on it.",
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
