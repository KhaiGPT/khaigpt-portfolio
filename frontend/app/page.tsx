import { About } from "@/components/chapters/About"
import { Ask } from "@/components/chapters/Ask"
import { Hello } from "@/components/chapters/Hello"
import { SayHi } from "@/components/chapters/SayHi"
import { Work } from "@/components/chapters/Work"
import { Writing } from "@/components/chapters/Writing"
import { Experience } from "@/components/deck/Experience"
import { jsonLd } from "@/lib/jsonld"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
}

export default function Home() {
  return (
    <>
      <link rel="preload" as="image" href="/art/hero_wide.webp" media="(min-width: 768px), (orientation: landscape)" fetchPriority="high" />
      <link rel="preload" as="image" href="/art/hero_tall.webp" media="(max-width: 767px) and (orientation: portrait)" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Experience>
        <Hello />
        <About />
        <Work />
        <Writing />
        <Ask />
        <SayHi />
      </Experience>
    </>
  )
}
