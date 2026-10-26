import { faqs } from "@/content/faq"
import { site } from "@/content/site"

const id = (frag: string) => `${site.url}/#${frag}`

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
      "@type": "ProfilePage",
      "@id": id("profile"),
      url: `${site.url}/`,
      name: site.title,
      isPartOf: { "@id": id("website") },
      mainEntity: { "@id": id("person") },
      breadcrumb: { "@id": id("breadcrumb") },
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
      worksFor: { "@type": "Organization", name: site.employer, url: "https://promer.ai" },
      description: site.bio,
      homeLocation: { "@type": "Country", name: site.location },
      knowsAbout: [
        "Growth marketing",
        "Go-to-market strategy",
        "Product-led growth",
        "Consumer apps",
        "AI applications",
        "Startups",
        "Southeast Asia",
      ],
      sameAs: [site.links.x, site.links.linkedin, site.links.substack, site.links.github, site.links.superme],
    },
    {
      "@type": "BreadcrumbList",
      "@id": id("breadcrumb"),
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "About Khai Huynh", item: id("about") },
      ],
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
