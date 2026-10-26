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

## NEXT SESSION — scroll-driven hero video + vertical scroll (user decisions, locked)
- Waiting on the user: Seedance clip(s) (16:9 required, 9:16 optional) + the RepTime logo (to generate chrome art for the Indie item). Neither was attached yet.
- Hero: hands stay STILL until scroll; scroll scrubs the approach until the fingertips touch → explosion → site turns from dark to light. It must FULLY REVERSE when scrolling back up.
- Light mode: bright, cool gallery-white paper (barely visible texture).
- Background removal: done here via fal `fal-ai/birefnet/v2/video` (model "Matting", output_mask=true, VP9/ProRes) through the Emergent Universal Key (verified priceable in the catalog; needs X-App-ID/X-Job-ID headers = $job_id). Use the mask video + the original RGB to build alpha frames. ffmpeg is not installed (use imageio-ffmpeg).
- Still art is luma-keyed (alpha from brightness), so dark chrome turns see-through on paper. Re-matte the stills from `/app/scripts/art_src/*.jpg` with `fal-ai/birefnet` before light mode ships.
- Planned build: replace the deck (fixed chapters, flip input, pager, horizontal work row on mobile) with one smooth vertical scroll (Lenis + motion useScroll). Pinned hero track (~300vh): frame scrub, then a WebGL shockwave/flash revealing paper from the contact point. Live refraction, cast shadows and light glow around the hands. Sections below are on paper. Fixed chrome switches theme at the explosion. The vertical rail stays on desktop only. No horizontal swipe anywhere.
- Frames: a WebP alpha sequence (~48–64 frames, ~900px wide, cropped to the hands' bounding box), with frame 0 preloaded as the LCP image and the rest loaded coarse-to-fine after load.

## Backlog
- P1: Deploy to Vercel (khaigpt.vercel.app) and run real Lighthouse on production.
- P2: Per-article pages/OG for Substack posts (more indexable URLs); slow-4G LCP (~3s, bandwidth-bound by fonts + JS).
- P2: Subtle horizontal-scroll hint for mobile work roles row.
