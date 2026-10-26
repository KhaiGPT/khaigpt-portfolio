import { Dock } from "@/components/chrome/Dock"
import { GlassFilter } from "@/components/chrome/GlassFilter"
import { Reveals } from "@/components/chrome/Reveals"
import { TopBar } from "@/components/chrome/TopBar"
import { Contact } from "@/components/home/Contact"
import { About } from "@/components/home/About"
import { Faq } from "@/components/home/Faq"
import { Help } from "@/components/home/Help"
import { Hero } from "@/components/home/Hero"
import { How } from "@/components/home/How"
import { Notes } from "@/components/home/Notes"
import { Proof } from "@/components/home/Proof"
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <TopBar />
      <main id="main">
        <Hero />
        <Proof />
        <Help />
        <How />
        <About />
        <Notes />
        <Faq />
        <Contact />
      </main>
      <Dock />
      <Reveals />
      <GlassFilter />
    </>
  )
}
