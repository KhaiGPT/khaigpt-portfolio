/**
 * All landing-page copy lives here. Prices are null until Khai sets them:
 * a null price renders "fixed price, quoted on the call" instead of a number.
 */

export const nav = [
  { id: "sprint", label: "Sprint" },
  { id: "fractional", label: "Fractional" },
  { id: "local", label: "Local business" },
  { id: "workshops", label: "Workshops" },
  { id: "faq", label: "FAQ" },
] as const

export const cta = {
  primary: "Book a free 20-min call",
  short: "Book a call",
}

export const hero = {
  eyebrow: "Mobile-app growth · 1M+ users scaled",
  sub: "I find where your funnel leaks — tracking, store page, onboarding, paywall, ads — then ship the tests that fix it.",
  secondary: "See the 10-day plan",
  alt: { lead: "Run a clinic, crew or restaurant?", link: "AI that books jobs for you" },
  imageAlt: "Two liquid-chrome hands reaching for each other across a black void, fingertips about to touch",
}

export const proof = {
  stats: [
    { n: "1M+", what: "players", where: "Sipher · #1 free game in key SEA markets" },
    { n: "$1.1M", what: "incremental revenue", where: "Promer AI · at 2.5:1 LTV:CAC" },
    { n: "−40%", what: "cohort churn", where: "Promer AI · plus +30% activation" },
    { n: "$6K", what: "MRR, solo", where: "my own AI app · built and grown alone" },
  ],
  names: ["McKinsey & Company", "Sipher", "Promer AI", "Delysium", "The Scourge"],
}

export type Phase = { days: string; title: string; body: string }

export const sprint = {
  kicker: "Mobile-App Growth Sprint",
  title: "10 days from “why aren’t we growing?” to tests running.",
  facts: ["7–10 days", "Fixed scope", "Fixed price"],
  fit: "For live subscription or in-app-purchase apps that spend on ads, or are about to.",
  phases: [
    { days: "Day 1–2", title: "Trust the numbers", body: "Attribution sanity check: MMP, SKAN, events and revenue all agree." },
    { days: "Day 3–5", title: "Find the leaks", body: "App Store page, onboarding and paywall audit, screen by screen." },
    { days: "Day 6–7", title: "Plan the spend", body: "UA channel plan and a creative test matrix you can brief today." },
    { days: "Day 8–10", title: "Ship", body: "3–5 experiments live, each with a success metric and a readout date." },
  ] satisfies Phase[],
  keep: ["Audit with fixes, ranked", "Clean tracking plan", "Scored experiment backlog", "Creative briefs", "Handoff call"],
  price: null as string | null,
  cta: "Book a Sprint call",
}

export const fractional = {
  kicker: "Fractional growth",
  title: "Then keep the machine running.",
  facts: ["5–10 hrs / week", "Monthly"],
  body: "After the sprint I stay on as your part-time growth lead: new tests every week, plus the automation that does the busywork.",
  pipeline: ["Lead capture", "Qualify", "CRM update", "Instant follow-up", "Booking", "Lifecycle triggers", "Reporting"],
  weekly: ["1–2 experiments shipped", "Creative refresh", "Monday KPI report"],
  price: null as string | null,
  cta: "Talk about fractional",
}

export type Msg = { from: "them" | "ai" | "sys"; text: string }

export const local = {
  kicker: "For local service businesses",
  title: "Stop losing jobs to missed calls.",
  body: "AI that answers, qualifies, books and follows up — set up by someone who ran a 5-location, 35-person business and did the math on every lead.",
  verticals: ["HVAC", "Dental", "Roofing", "Medspa", "Restaurants"],
  does: ["Answers 24/7", "Books into your calendar", "Chases open quotes", "Asks for reviews"],
  thread: [
    { from: "sys", text: "Missed call · 9:42 PM" },
    { from: "ai", text: "Hi, it’s Northside Heating — sorry we missed you! What’s going on?" },
    { from: "them", text: "AC stopped blowing cold" },
    { from: "ai", text: "On it. A tech can come tomorrow 8–10am or 1–3pm. Which works?" },
    { from: "them", text: "8–10 please" },
    { from: "sys", text: "Booked · added to CRM · tech notified" },
  ] satisfies Msg[],
  offer: "Start with a free missed-lead check: I contact your business like a customer and show you where leads slip.",
  cta: "Get my free check",
}

export const workshop = {
  kicker: "Team workshops",
  title: "AI training where everyone ships something.",
  body: "Bring a real task from your week. Leave with it automated — on the tools you already pay for.",
  facts: ["Half day", "Up to 15 people", "Remote or on-site"],
  cta: "Ask about dates",
}

export const steps = [
  { n: "1", title: "20-min call", body: "Free. Bring your numbers. If I can’t help, I’ll say so." },
  { n: "2", title: "Scope in writing", body: "Fixed price and dates within 24 hours." },
  { n: "3", title: "Kickoff", body: "On a date you pick. You see progress every day." },
]

export type Role = { years: string; company: string; role: string; result: string }

export const record: Role[] = [
  { years: "2025 — now", company: "Promer AI · Firegroup", role: "Head of Growth Marketing", result: "$1.1M incremental revenue, −40% churn, +30% activation" },
  { years: "2023 — now", company: "Independent", role: "Product & Growth Advisor", result: "The Scourge: $1M+ sales · Delysium: 47K concurrent users, ~20% D30" },
  { years: "2024 — 2025", company: "Nakame", role: "Founder", result: "AI companion app, 20K users, 15M organic impressions" },
  { years: "2021 — 2023", company: "Sipher", role: "Head of Marketing", result: "~1M players, ~$150K/mo media at ~2.1x ROAS" },
  { years: "2018 — 2019", company: "McKinsey & Company", role: "Associate Consultant", result: "SEA retail: online sales +45%, LTV +20%" },
  { years: "2016 — 2020", company: "BetterU", role: "Founder & MD", result: "0 → 5 locations in 14 months, 35+ people" },
]

export type Faq = { id: string; q: string; a: string }

export const faqs: Faq[] = [
  {
    id: "price",
    q: "What does the Sprint cost?",
    a: "A fixed price, set on the call once I see your stage and stack. No hourly billing, no surprise invoices.",
  },
  {
    id: "need",
    q: "What do you need from us?",
    a: "Read access to your analytics or MMP, App Store Connect / Play Console and ad accounts. One point person, and about 2 hours of your time across the sprint.",
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
  body: "20 minutes. Bring your numbers — leave with at least one fix, whether or not we work together.",
  writing: { lead: "I also write Zero-One Shot,", link: "read by 12k+ founders and operators" },
}
