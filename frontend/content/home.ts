/**
 * All landing-page copy lives here.
 * Prices are founding-client rates (≈ $45/h of real work) — swap them as case studies land.
 */
import type { ArtKey } from "./art"

export const nav = [
  { id: "help", label: "How I help" },
  { id: "about", label: "About" },
  { id: "notes", label: "Notes" },
  { id: "faq", label: "FAQ" },
] as const

export const cta = {
  primary: "Book a free 20-min call",
  short: "Book a call",
}

export const hero = {
  eyebrow: "Mobile-app growth · 1M+ users scaled",
  sub: "I find where your funnel leaks — tracking, store page, onboarding, paywall, ads — then ship the tests that fix it.",
  secondary: "See how I can help",
  alt: { lead: "Run a clinic, crew or restaurant?", link: "AI that books jobs for you" },
  imageAlt: "Two liquid-chrome hands reaching for each other across a black void, fingertips about to touch",
}

/** count: animates from 0; the rest render as-is */
export type Stat = { value: number; decimals?: number; prefix?: string; suffix?: string; label?: string; what: string; where: string }

export const proof = {
  stats: <Stat[]>[
    { value: 1, suffix: "M+", what: "users", where: "across consumer apps & games I grew" },
    { value: 0, label: "SEA", what: "market expansion", where: "Vietnam, Cambodia, #1 free game in key markets" },
    { value: 6, prefix: "$", suffix: "K", what: "MRR, solo", where: "consumer AI app I built & grew alone" },
  ],
  /** the fourth tile rolls through these */
  metrics: [
    { n: "−40%", what: "cohort churn", where: "Promer AI" },
    { n: "+30%", what: "activation", where: "Promer AI" },
    { n: "$1.1M", what: "incremental revenue", where: "Promer AI, at 2.5:1 LTV:CAC" },
    { n: "2.1x", what: "ROAS on ~$150K/mo", where: "Sipher" },
    { n: "+45%", what: "online sales", where: "McKinsey retail client" },
  ],
  names: ["McKinsey & Company", "Sipher", "Promer AI", "Delysium", "The Scourge", "Firegroup", "Nakame"],
}

export const help = {
  kicker: "How I can help",
  title: "Four ways in. Pick the one that fits.",
}

export type Package = {
  id: string
  tone: "light" | "dark"
  kicker: string
  title: string
  body: string
  facts: string[]
  price: string
  priceNote: string
  cta: string
}

export const sprint = {
  id: "sprint",
  tone: "light",
  kicker: "Mobile-App Growth Sprint",
  title: "10 days from “why aren’t we growing?” to tests running.",
  body: "For live subscription or in-app-purchase apps that spend on ads, or are about to.",
  facts: ["7–10 days", "Fixed scope", "Async-first"],
  price: "$1,500",
  priceNote: "Founding rate, in return for a case study",
  cta: "Book a Sprint call",
  phases: [
    { from: 1, to: 2, title: "Trust the numbers", body: "MMP, SKAN, events and revenue all agree." },
    { from: 3, to: 5, title: "Find the leaks", body: "Store page, onboarding, paywall — screen by screen." },
    { from: 6, to: 7, title: "Plan the spend", body: "UA channel plan and a creative test matrix." },
    { from: 8, to: 10, title: "Ship", body: "3–5 experiments live, each with a readout date." },
  ],
  keep: ["Ranked fix list", "Clean tracking plan", "Scored test backlog", "Creative briefs"],
} satisfies Package & Record<string, unknown>

export const fractional = {
  id: "fractional",
  tone: "dark",
  kicker: "Fractional growth",
  title: "Then keep the machine running.",
  body: "I stay on as your part-time growth lead: new tests every week, plus the automation that does the busywork.",
  facts: ["5–10 hrs / week", "Monthly", "Weekly 30-min sync"],
  price: "from $1,500/mo",
  priceNote: "Founding rate · cancel monthly",
  cta: "Talk about fractional",
  pipeline: ["Lead capture", "Qualify", "CRM update", "Instant follow-up", "Booking", "Lifecycle triggers", "Reporting"],
} satisfies Package & Record<string, unknown>

export type Msg = { from: "them" | "ai" | "sys"; text: string }

export const local = {
  id: "local",
  tone: "light",
  kicker: "AI for local service businesses",
  title: "Stop losing jobs to missed calls.",
  body: "AI that answers, qualifies, books and follows up — set up by an operator who has run a 35-person, multi-location business.",
  facts: ["HVAC", "Dental", "Roofing", "Medspa", "Restaurants"],
  price: "from $1,000",
  priceNote: "One-time setup · free missed-lead check first",
  cta: "Get my free check",
  thread: [
    { from: "sys", text: "Missed call · 9:42 PM" },
    { from: "ai", text: "Hi, it’s Northside Heating — sorry we missed you! What’s going on?" },
    { from: "them", text: "AC stopped blowing cold" },
    { from: "ai", text: "On it. A tech can come tomorrow 8–10am or 1–3pm. Which works?" },
    { from: "them", text: "8–10 please" },
    { from: "sys", text: "Booked · added to CRM · tech notified" },
  ] satisfies Msg[],
} satisfies Package & Record<string, unknown>

export const workshop = {
  id: "workshops",
  tone: "dark",
  kicker: "Team AI workshops",
  title: "AI training where everyone ships something.",
  body: "Bring a real task from your week. Leave with it automated, on tools you already pay for.",
  facts: ["Half day", "Up to 15 people", "Remote or on-site"],
  price: "from $600",
  priceNote: "Per session · founding rate",
  cta: "Ask about dates",
  seats: 15,
} satisfies Package & Record<string, unknown>

export const steps = [
  { n: "1", title: "20-min call", body: "Free. Bring your numbers. If I can’t help, I’ll say so." },
  { n: "2", title: "Scope in writing", body: "Fixed price and dates, usually within a day or two." },
  { n: "3", title: "Kickoff", body: "On a date you pick. Progress you can see every day." },
]

export type Role = { years: string; company: string; role: string; result: string; art: ArtKey }

export const about = {
  kicker: "Who you’d work with",
  hello: "Hi, I’m Khai.",
  body: "Growth & GTM operator, 10+ years. Ex-McKinsey, two-time founder, and these days I build my own consumer apps too — so I test every playbook on my own money first.",
  photoAlt: "Khai Huynh, head-and-shoulders portrait in a black blazer and white tee",
}

export const record: Role[] = [
  { years: "2025 — now", company: "Promer AI · Firegroup", role: "Head of Growth Marketing", result: "$1.1M incremental revenue, −40% churn, +30% activation", art: "magnet" },
  { years: "2023 — now", company: "Independent", role: "Product & Growth Advisor", result: "The Scourge: $1M+ sales · Delysium: 47K concurrent users, ~20% D30", art: "compass" },
  { years: "2023 — now", company: "Indie apps · RepTime", role: "Solo builder", result: "AI consumer app to $6K MRR, solo. Now shipping RepTime.", art: "reptime" },
  { years: "2024 — 2025", company: "Nakame", role: "Founder", result: "AI companion app, 20K users, 15M organic impressions", art: "dice" },
  { years: "2021 — 2023", company: "Sipher", role: "Head of Marketing", result: "~1M players, ~$150K/mo media at ~2.1x ROAS", art: "joystick" },
  { years: "2018 — 2019", company: "McKinsey & Company", role: "Associate Consultant", result: "SEA retail: online sales +45%, LTV +20%", art: "knight" },
  { years: "2016 — 2020", company: "BetterU", role: "Founder & MD", result: "0 → 5 locations in 14 months, 35+ people", art: "avocado" },
]

export const notes = {
  kicker: "Notes from the build",
  title: "Free tips on AI, growth and building.",
  body: "From Zero-One Shot, read by 12k+ founders and operators.",
  cta: "Get them by email",
}

export type Faq = { id: string; q: string; a: string }

export const faqs: Faq[] = [
  {
    id: "price",
    q: "Why so affordable?",
    a: "I’m building my consulting portfolio. Founding clients get a lower fixed price; in return, if you’re happy, I write up the results as a case study.",
  },
  {
    id: "need",
    q: "What do you need from us?",
    a: "Read access to your analytics or MMP, App Store Connect / Play Console and ad accounts, plus one point person. Sprints run async — no meeting marathons.",
  },
  {
    id: "fit",
    q: "Is my app a fit?",
    a: "Best fit: live app, real users, subscriptions or in-app purchases. Pre-launch? Book anyway — I’ll tell you straight if a sprint makes sense yet.",
  },
  {
    id: "ads",
    q: "Do you run the ads yourself?",
    a: "In the sprint I plan and set up the tests. On fractional I can run them, or work alongside your team or agency.",
  },
  {
    id: "tz",
    q: "Where are you, and what time zones?",
    a: "Ho Chi Minh City (GMT+7). I work async-first with teams in the US, Europe and Asia, with live calls at a time that suits you.",
  },
  {
    id: "local",
    q: "I run a local business. Do I need to be technical?",
    a: "No. I set it up on the phone line, calendar and CRM you already use, train your team, and keep an eye on it.",
  },
]

export const contact = {
  title: "Let’s find your leak.",
  body: "20 minutes, free. Bring your numbers — we’ll work out where to look first.",
}
