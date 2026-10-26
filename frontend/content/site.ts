export const site = {
  url: "https://khaihuynh.app",
  name: "Khai Huynh",
  handle: "KhaiGPT",
  title: "Khai Huynh — Growth & AI Consultant for Apps and Small Businesses",
  description:
    "Khai Huynh helps mobile apps grow from pre-launch to scale, builds AI automation for local service businesses, and runs practical AI training for marketers, ops and growth teams. Ex-McKinsey, 10+ years, 5M+ users grown.",
  bio: "10+ years in growth and GTM across consumer apps and games: 5M+ users grown, $40M+ revenue. Ex-McKinsey and VC-backed founder, now solo building apps to $100K ARR and sharing what I learn.",
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
