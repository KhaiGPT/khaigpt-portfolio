import { CopyEmail } from "@/components/ui/CopyEmail"
import { ArrowUp, ArrowUpRight, BrandIcon } from "@/components/ui/Icons"
import { Magnetic } from "@/components/ui/Magnetic"
import { contact, cta } from "@/content/home"
import { site, socials } from "@/content/site"
import { Mercury } from "./Mercury"

export function Contact() {
  return (
    <section id="contact" className="sec sec-dark contact" data-dark="" aria-labelledby="contact-title" data-testid="section-contact">
      <div className="contact-pool">
        <Mercury />
        <h2 id="contact-title" className="contact-title" data-rv>
          {contact.title}
        </h2>
      </div>
      <div className="wrap contact-in">
        <p className="lede" data-rv>
          {contact.body}
        </p>
        <div className="contact-actions" data-rv>
          <Magnetic strength={0.18}>
            <a href={site.links.cal} target="_blank" rel="noopener" className="pill pill-solid pill-xl shine press" data-testid="contact-book-call">
              {cta.primary} <ArrowUpRight className="pill-arrow" />
            </a>
          </Magnetic>
          <CopyEmail />
        </div>
        <footer className="foot">
          <ul className="socials" aria-label="Elsewhere">
            {socials.map((s) => (
              <li key={s.id} data-tip={s.label}>
                <a href={s.href} target="_blank" rel="noopener me" aria-label={s.label} className="glass social press" data-testid={`social-${s.id}`}>
                  <BrandIcon id={s.id} />
                </a>
              </li>
            ))}
          </ul>
          <p className="foot-line">
            <span>
              © {new Date().getFullYear()} Khai Huynh · {site.location}
            </span>
            <a href={site.links.reptime} target="_blank" rel="noopener" data-testid="footer-reptime">
              RepTime on the App Store
            </a>
            <a href="/privacy" data-testid="privacy-link">
              Privacy
            </a>
            <a href="#top" className="foot-top" data-testid="back-to-top">
              back to top <ArrowUp />
            </a>
          </p>
        </footer>
      </div>
    </section>
  )
}
