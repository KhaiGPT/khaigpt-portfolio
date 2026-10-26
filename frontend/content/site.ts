export const site = {
  url: "https://khaigpt.vercel.app",
  name: "Khai Huynh",
  handle: "KhaiGPT",
  title: "Khai Huynh — I build things & scale products",
  description:
    "Khai Huynh is a Vietnam-based founder and growth leader with 10+ years building and scaling startups across Southeast Asia — ex-McKinsey, founder of BetterU and Nakame, and writer of the Zero-One Shot newsletter.",
  bio: "Entrepreneur and growth leader with 10+ years building and scaling businesses across Southeast Asia. Ex-McKinsey, founder of BetterU and Nakame.social, Head of Growth Marketing at Promer.ai, and writer of Zero-One Shot, a newsletter on startups, AI and culture read by 12,000+ people.",
  email: "huynhduongkhai@gmail.com",
  location: "Vietnam",
  jobTitle: "Head of Growth Marketing",
  employer: "Promer.ai",
  links: {
    cal: "https://cal.com/khaih",
    substack: "https://khaigpt.substack.com",
    x: "https://x.com/khaiGPT",
    linkedin: "https://www.linkedin.com/in/khaidhuynh/",
    github: "https://github.com/KhaiGPT",
    superme: "https://www.superme.ai/khai",
    sponsor: "https://www.passionfroot.me/khai",
  },
} as const

export const socials = [
  { id: "x", label: "X", href: site.links.x },
  { id: "linkedin", label: "LinkedIn", href: site.links.linkedin },
  { id: "substack", label: "Substack", href: site.links.substack },
  { id: "github", label: "GitHub", href: site.links.github },
  { id: "superme", label: "Chat with AI Khai", href: site.links.superme },
] as const

export type SocialId = (typeof socials)[number]["id"]
