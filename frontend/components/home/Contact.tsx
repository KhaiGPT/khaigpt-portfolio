import { CopyEmail } from "@/components/ui/CopyEmail"
import { ArrowUp, ArrowUpRight, BrandIcon } from "@/components/ui/Icons"
import { contact, cta } from "@/content/home"
import { site, socials } from "@/content/site"

export function Contact() {
  return (
    <section id="contact" className="sec sec-dark contact" data-dark="" aria-labelledby="contact-title" data-testid="section-contact">
      <div className="wrap contact-in">
        <h2 id="contact-title" className="contact-title" data-rv>
          {contact.title}
        </h2>
        <p className="lede" data-rv>
          {contact.body}
        </p>
        <div className="contact-actions" data-rv>
          <a href={site.links.cal} target="_blank" rel="noopener" className="pill pill-solid pill-xl press" data-testid="contact-book-call">
            {cta.primary} <ArrowUpRight className="pill-arrow" />
          </a>
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
          <p className="foot-note">
            {contact.writing.lead}{" "}
            <a href={site.links.substack} target="_blank" rel="noopener">
              {contact.writing.link}
            </a>
            .
          </p>
          <p className="foot-line">
            <span>
              © {new Date().getFullYear()} Khai Huynh · {site.location}
            </span>
            <a href="#top" className="foot-top" data-testid="back-to-top">
              back to top <ArrowUp />
            </a>
          </p>
        </footer>
      </div>
    </section>
  )
}
