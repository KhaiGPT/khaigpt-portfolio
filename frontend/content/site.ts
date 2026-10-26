export const site = {
  url: "https://khaigpt.vercel.app",
  name: "Khai Huynh",
  handle: "KhaiGPT",
  title: "Khai Huynh — I build things & scale products",
  description:
    "Khai Huynh is a growth & GTM operator in Ho Chi Minh City with 10+ years scaling products across Southeast Asia — 0→1M+ users, ex-McKinsey, founder of BetterU and Nakame, and writer of the Zero-One Shot newsletter.",
  bio: "Growth & GTM operator with 10+ years scaling products and market expansion across Southeast Asia — from 0→1M+ users and ~$150K/mo acquisition programs to 0→1 products and international teams of up to 15. Head of Growth Marketing at Promer AI, ex-McKinsey, founder of BetterU and Nakame, and writer of Zero-One Shot.",
  email: "huynhduongkhai@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  jobTitle: "Head of Growth Marketing",
  employer: "Promer AI",
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
