# Khai Huynh — Portfolio (PRD)

## Original problem statement
Rebuild Khai Huynh's personal portfolio: super clean, minimalist, design-forward "Apple-y liquid glass" aesthetic. One unified conversational/scrolling experience with custom shaders, 3D/WebGL effects and fluid spring transitions. Real content from GitHub / LinkedIn / Substack. AI-generated art for personality (pre-made only). Strict SEO + performance: SSR, sitemap, valid robots.txt, canonicals, WebP images, no layout shifts, sub-2s load, descriptive alt text, fix 404s, no "AI slop".

## Architecture
- Next.js 15 App Router (React 19), Tailwind v4 + hand-written CSS (`app/globals.css`), `motion` (LazyMotion).
- Deck: fixed-viewport chapters (`components/deck/*`) — hello, about, work, writing, ask, hi. Wheel/keys/swipe/pager/reply-chip navigation, hash deep links (`/#work`).
- Stage: raw WebGL2 liquid-chrome renderer (`components/stage/*`) behind the DOM; boots after window load + idle; static `<img>` art is the SSR/no-WebGL fallback and the layout anchor.
- Content: static TS maps in `content/*` (site, art + alt text, chapters, work, writing, faq).
- SEO: page-level metadata (canonical, robots), OG/Twitter, JSON-LD Person (`lib/jsonld.ts`), `robots.ts`, `sitemap.ts`, `manifest.ts`. Canonical domain: https://khaigpt.vercel.app (`content/site.ts`).
- Backend: unused stub.
- Perf tool: `/app/scripts/perf_check.py <url>` (headless Chrome CDP: FCP/LCP/CLS/load on desktop, slow-4G and 4G mobile).

## Implemented
- 2026-06 (session 1): full site, art generation + WebP processing, WebGL stage, SEO files.
- 2026-06 (session 2):
  - Friendly 404 (`app/not-found.tsx`): wings art, chapter links back into the deck (`/#about` …), home button; noindex, no canonical; desktop 2-column, mobile stacked.
  - Descriptive, context-rich alt text for all 12 art images + OG/Twitter image alt.
  - Perf: far-chapter art deferred until after load (`data-live` / `data-warm`), WebGL deferred to load+idle, hero preloads only on `/`. Page weight at load 1.7MB → ~0.6MB. Prod build: mobile 4G LCP ~0.7–1.1s, desktop ~0.5–0.8s, CLS 0.
  - SEO fixes: robots.txt without non-standard Host line; robots/canonical moved to home page metadata (no conflicting robots tags on 404).
  - Mobile fixes: hero shrinks on short phones, pager scrim + safe-area aware `--bottom`, 404 fits small phones.
  - Wheel: inner-column momentum no longer spills into a chapter flip.
  - Dev: allowedDevOrigins for preview hosts.
- Testing: iteration_1 + iteration_2 (100% pass on retests/regressions).

- 2026-06 (session 3):
  - Content updated from the new resume (`content/work.ts`, `site.ts`, `faq.ts`, `lib/jsonld.ts`, About stats). Work list = 7 items: Promer AI · Firegroup, Nakame, Independent consulting, Indie apps · RepTime (new, uses the paper-airplane art as a stand-in until the RepTime logo art), Sipher, McKinsey, BetterU. Zero-One Shot lives only in Writing.
  - Seedance 2.0 prompts + first/last keyframes delivered. Keyframes: `/app/frontend/public/_tmp/seedance_{wide,tall}_{first,last}.jpg` (robots disallow `/_tmp/`; DELETE after the clips arrive). Generator: `/app/scripts/video_src/make_keyframes.py`.

- 2026-10 (session 4) — conversion rework (one vertical scroll, consulting offers):
  - Replaced the deck (fixed chapters, pager, WebGL stage, chat Q&A, writing chapter) with one native vertical scroll. Old code is in git history.
  - Hero: Seedance hands clip (`scripts/video_src/hands.mp4`) cut by `scripts/video_src/make_frames.py` into 66 WebP frames (`public/hero/{d,m}/`). `components/home/HeroScrub.tsx` pins a 340vh track (280vh on phones): copy lifts away → frames scrub + zoom → flash → paper bloom. Pure function of scroll, so it fully reverses. Frame 0 is the SSR poster / LCP; the rest load after load+idle, coarse-to-fine. No matting needed: the clip is on pure black and the bloom swallows the hands.
  - Theme: paper page; hero, Local band and Contact are dark islands (`[data-dark]`). `lib/theme.ts` flips the fixed top bar to match what is under it.
  - Page order: Hero → Proof stats → 01 Sprint (4-phase timeline) → 02 Fractional (animated pipeline) → How it starts → 03 Local service businesses (self-playing missed-call SMS thread) → 04 Workshops → About/track record → FAQ (<details>) → Contact. Phone-only sticky "Book a call" dock.
  - All copy in `content/home.ts`. Prices are null (renders "Fixed price, quoted on the call").
  - SEO: new title/description, ProfessionalService + OfferCatalog + FAQPage JSON-LD. /_tmp keyframes deleted.
  - Perf (local prod build): desktop LCP ~0.18s; mobile 4G + 4x CPU LCP ~0.77s; CLS ≈ 0.

- 2026-10 (session 4b) — premium pass + packages:
  - Page: Hero → Proof (count-up stats + rolling growth-metric tile + steel-wordmark marquee) → How I can help (4 package cards that pin and stack: Sprint gantt that fills itself, Fractional pipeline with a running pulse, Local phone that types out a missed-call rescue, Workshop 15 seats lighting up) → How it starts (line draws, steps pop) → About (portrait with 3D tilt + sheen; track record where hovering a row floats that company's chrome object) → Notes (Substack posts restored, free tips framing) → FAQ → Contact (WebGL liquid-mercury metaballs behind the headline, text inverts over the chrome; follows the cursor).
  - Top nav: sliding scroll-spy pill. Primary buttons: light sweep on hover. Paper has a faint grain (`public/noise.webp`).
  - Founding-client prices (~$45/h of real work): Sprint $1,500 (for a case study), Fractional from $1,500/mo, Local setup from $1,000, Workshop from $600.
  - Portrait: `scripts/make_portrait.py` (rembg birefnet-portrait cutout → crop, grade, ember/ice rim light) → `public/art/khai.webp`. RepTime logo → `public/art/reptime.webp`.
  - Perf: mobile 4G + 4x CPU LCP ~0.8s, CLS 0. Mercury only renders while on screen, at 0.6x resolution.

- 2026-10 (session 4c) — clarity pass:
  - Hero: shorter track (250vh desktop / 230vh phone), eased progress + crossfade between frames for fluid scrub; proof overlaps the hero end (`.proof` margin-top -72vh) and reveals the moment the page turns light.
  - Copy: plain service names (Growth Sprint, Part-time Growth Lead, AI Receptionist, Practical AI Training), one line each, audience as kicker. Detail moved into ⓘ tips (`components/ui/InfoTip.tsx`: hover/focus on desktop, tap on touch).
  - Prices removed from the page and JSON-LD; FAQ says a fixed price follows the free call.
  - AI training reframed for mid-career marketers/ops/growth people: role playbook switcher with before/after bars (`Playbooks.tsx`, times labelled "Example").
  - Portrait removed at Khai's request (photo + script deleted). Indie apps dated 2025 — now.

## Waiting on the user
- Final live URL (canonical) and Google Analytics ID.
- Testimonials once the first clients finish.

## Backlog
- P1: Deploy to Vercel (khaigpt.vercel.app) and run real Lighthouse on production.
- P1: Dedicated /local landing page once there is a local-business case study (for ads to that audience).
- P2: Per-article pages for Substack posts / free AI tips (more indexable URLs).
