import { faqs, fractional, local, sprint, workshop } from "@/content/home"
import { site } from "@/content/site"

const id = (frag: string) => `${site.url}/#${frag}`

const offer = (name: string, description: string, anchor: string) => ({
  "@type": "Offer",
  url: id(anchor),
  itemOffered: { "@type": "Service", name, description, provider: { "@id": id("person") } },
})

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": id("website"),
      url: `${site.url}/`,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": id("person") },
    },
    {
      "@type": "Person",
      "@id": id("person"),
      name: site.name,
      givenName: "Khai",
      familyName: "Huynh",
      alternateName: site.handle,
      url: `${site.url}/`,
      email: `mailto:${site.email}`,
      image: `${site.url}/og.jpg`,
      jobTitle: site.jobTitle,
      description: site.bio,
      homeLocation: { "@type": "Place", name: site.location },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "The University of Sydney" },
        { "@type": "Organization", name: "McKinsey & Company" },
      ],
      knowsAbout: [
        "Mobile app growth",
        "User acquisition",
        "App Store optimization",
        "Paywall optimization",
        "Attribution",
        "Retention",
        "Marketing automation",
        "AI for small businesses",
      ],
      sameAs: [site.links.x, site.links.linkedin, site.links.substack, site.links.github, site.links.superme],
    },
    {
      "@type": "ProfessionalService",
      "@id": id("service"),
      name: `${site.name} — Growth & AI Consulting`,
      url: `${site.url}/`,
      description: site.description,
      founder: { "@id": id("person") },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [...[sprint, fractional, local, workshop].map((p) => offer(p.title, `${p.body} (${p.kicker})`, p.id))],
      },
    },
    {
      "@type": "FAQPage",
      "@id": id("faq"),
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
}
