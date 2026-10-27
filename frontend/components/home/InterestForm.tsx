"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Check } from "@/components/ui/Icons"
import { cta, interest } from "@/content/home"
import { site } from "@/content/site"

type State = "idle" | "sending" | "done" | "error"

/** Fired by the “Or leave your details” links on the package cards, so the form opens with that service picked. */
export const PICK_EVENT = "interest:pick"

export function InterestForm() {
  const [service, setService] = useState("")
  const [state, setState] = useState<State>("idle")
  const form = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const onPick = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      if (interest.services.some((s) => s.id === id)) setService(id)
      // focus once the smooth scroll has landed, without jumping the page again
      window.setTimeout(() => form.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus({ preventScroll: true }), 700)
    }
    addEventListener(PICK_EVENT, onPick)
    return () => removeEventListener(PICK_EVENT, onPick)
  }, [])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get("botcheck")) return // honeypot: people never tick a hidden box
    const label = interest.services.find((s) => s.id === service)?.label ?? "Not chosen"
    const fields = {
      name: String(f.get("name") ?? "").trim(),
      email: String(f.get("email") ?? "").trim(),
      company: String(f.get("company") ?? "").trim(),
      service: label,
      revenue: String(f.get("revenue") || "Not given"),
      message: String(f.get("message") ?? "").trim(),
    }
    window.gtag?.("event", "generate_lead", { service: service || "unsure", revenue: fields.revenue })

    // no form key yet: hand the same details to the visitor's email app, so nothing is ever lost
    if (!site.form.key) {
      const body = Object.entries(fields)
        .map(([k, v]) => `${k[0].toUpperCase()}${k.slice(1)}: ${v || "-"}`)
        .join("\n")
      location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Interest: ${label} · ${fields.company}`)}&body=${encodeURIComponent(body)}`
      setState("done")
      return
    }

    setState("sending")
    try {
      const res = await fetch(site.form.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.form.key,
          subject: `New interest: ${label} · ${fields.company}`,
          from_name: "khaihuynh.app",
          replyto: fields.email,
          ...fields,
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { success?: boolean }
      setState(res.ok && json.success !== false ? "done" : "error")
    } catch {
      setState("error")
    }
  }

  if (state === "done")
    return (
      <div className="form-done" role="status" data-testid="interest-done">
        <span className="form-done-icon" aria-hidden>
          <Check />
        </span>
        <p className="form-done-title">{interest.done.title}</p>
        <p className="form-done-body">{interest.done.body}</p>
        <a href={site.links.cal} target="_blank" rel="noopener" className="pill pill-solid shine press" data-testid="interest-done-book">
          {cta.primary} <ArrowUpRight className="pill-arrow" />
        </a>
      </div>
    )

  return (
    <form ref={form} className="form" onSubmit={submit} data-testid="interest-form">
      <div className="form-row">
        <label className="field">
          <span>Name</span>
          <input name="name" required autoComplete="name" placeholder="Jane Nguyen" />
        </label>
        <label className="field">
          <span>Work email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" />
        </label>
      </div>
      <label className="field">
        <span>Company or app name</span>
        <input name="company" required autoComplete="organization" placeholder="Acme, or your app’s name" />
      </label>

      <fieldset className="field">
        <legend>What do you need?</legend>
        <div className="choices">
          {interest.services.map((s) => (
            <label key={s.id} className="choice press" data-on={service === s.id || undefined}>
              <input type="radio" name="service" value={s.id} checked={service === s.id} onChange={() => setService(s.id)} required />
              {s.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field">
        <span>
          Annual revenue <em>optional</em>
        </span>
        <select name="revenue" defaultValue="">
          <option value="">Prefer not to say</option>
          {interest.revenue.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>
          Anything I should know? <em>optional</em>
        </span>
        <textarea name="message" rows={3} placeholder="Where you are, what’s stuck, any deadline." />
      </label>

      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />
      <div className="form-foot">
        <button type="submit" className="pill pill-solid shine press" disabled={state === "sending"} data-testid="interest-submit">
          {state === "sending" ? "Sending…" : interest.submit} <ArrowUpRight className="pill-arrow" />
        </button>
        {state === "error" && (
          <p className="form-error" role="alert">
            That didn’t go through. Try again, or email {site.email}.
          </p>
        )}
        <p className="form-note">
          Only used to reply to you. <a href="/privacy">Privacy</a>
        </p>
      </div>
    </form>
  )
}
