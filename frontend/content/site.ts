export const site = {
  url: "https://khaigpt.vercel.app",
  name: "Khai Huynh",
  handle: "KhaiGPT",
  title: "Khai Huynh — Growth & AI Consultant for Apps and Small Businesses",
  description:
    "Khai Huynh helps mobile apps grow, sets up AI receptionists for local service businesses, and runs practical AI training for marketers, ops and growth teams. Ex-McKinsey, 10+ years, 1M+ users grown.",
  bio: "Growth & GTM operator with 10+ years scaling consumer apps and games across Southeast Asia — 0→1M+ users, $1.1M incremental revenue at Promer AI, ~$150K/mo acquisition programs. Ex-McKinsey, founder of BetterU (5 locations, 35+ people) and Nakame.",
  email: "huynhduongkhai@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  jobTitle: "Growth & AI Consultant",
  links: {
    cal: "https://cal.com/khaih",
    substack: "https://khaigpt.substack.com",
    x: "https://x.com/khaiGPT",
    linkedin: "https://www.linkedin.com/in/khaidhuynh/",
    github: "https://github.com/KhaiGPT",
    superme: "https://www.superme.ai/khai",
  },
} as const

export const socials = [
  { id: "linkedin", label: "LinkedIn", href: site.links.linkedin },
  { id: "x", label: "X", href: site.links.x },
  { id: "substack", label: "Substack", href: site.links.substack },
  { id: "github", label: "GitHub", href: site.links.github },
  { id: "superme", label: "Chat with AI Khai", href: site.links.superme },
] as const

export type SocialId = (typeof socials)[number]["id"]
