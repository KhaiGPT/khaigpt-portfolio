import type { Metadata } from "next"
import { ArrowUp } from "@/components/ui/Icons"
import { privacy } from "@/content/privacy"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How khaihuynh.app uses analytics, email and booking data.",
  alternates: { canonical: "/privacy" },
}

export default function Privacy() {
  return (
    <main className="legal" data-testid="privacy-page">
      <a href="/" className="legal-back">
        <ArrowUp className="legal-back-icon" /> khaihuynh.app
      </a>
      <h1 className="legal-title">Privacy Policy</h1>
      <p className="legal-date">Last updated {privacy.updated}</p>
      {privacy.sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {s.p.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </section>
      ))}
    </main>
  )
}
