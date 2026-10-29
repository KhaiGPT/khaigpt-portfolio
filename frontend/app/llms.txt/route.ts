import { about, faqs, fractional, local, proof, record, sprint, workshop } from "@/content/home"
import { site } from "@/content/site"
import { posts } from "@/content/writing"

export const dynamic = "force-static"

/** /llms.txt — a plain-markdown summary for AI assistants and answer engines, built from the same content as the page. */
export function GET() {
  const services = [sprint, fractional, local, workshop]
  const body = `# ${site.name}

> ${site.description}

${about.body}

## Services
${services.map((s) => `- [${s.title}](${site.url}/#${s.id}) (${s.kicker.toLowerCase()}): ${s.body}`).join("\n")}

Pricing is a fixed price per scope, quoted after a free 20-minute call: ${site.links.cal}

## Results
${proof.stats.map((s) => `- ${s.prefix ?? ""}${s.value}${s.suffix ?? ""} ${s.what}`).join("\n")}
${proof.metrics.map((m) => `- ${m.n} ${m.what}`).join("\n")}
- Worked with: ${proof.names.join(", ")}

## Experience
${record.map((r) => `- ${r.company}, ${r.role} (${r.years.replace(" — ", "–")}): ${r.result}`).join("\n")}

## FAQ
${faqs.map((f) => `- ${f.q} ${f.a}`).join("\n")}

## Writing
${posts.map((p) => `- [${p.title}](${p.href})`).join("\n")}

## Contact
- Book a call: ${site.links.cal}
- Email: ${site.email}
- LinkedIn: ${site.links.linkedin}
- RepTime (my app) on the App Store: ${site.links.reptime}
- Newsletter: ${site.links.substack}
`
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
