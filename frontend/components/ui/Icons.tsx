import type { SVGProps } from "react"
import type { SocialId } from "@/content/site"

type P = SVGProps<SVGSVGElement>

const Line = ({ d, ...p }: P & { d: string }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <path d={d} />
  </svg>
)

export const ArrowUpRight = (p: P) => <Line d="M7 17 17 7M8.5 7H17v8.5" {...p} />
export const ArrowUp = (p: P) => <Line d="M12 19V5m-6.5 6.5L12 5l6.5 6.5" {...p} />
export const ChevronUp = (p: P) => <Line d="m6 14.5 6-6 6 6" {...p} />
export const ChevronDown = (p: P) => <Line d="m6 9.5 6 6 6-6" {...p} />
export const Reply = (p: P) => <Line d="M4 5v6a4 4 0 0 0 4 4h11m-4.5-4.5L19 15l-4.5 4.5" {...p} />
export const Check = (p: P) => <Line d="m5 12.5 4.5 4.5L19 7.5" {...p} />
export const Copy = (p: P) => <Line d="M9 9h10.5v10.5H9zM5 15V4.5h10.5" {...p} />
export const Calendar = (p: P) => <Line d="M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 4v4m7-4v4" {...p} />

const Brand = ({ d, ...p }: P & { d: string }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden {...p}>
    <path d={d} />
  </svg>
)

const brandPaths: Record<SocialId, string> = {
  x: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z",
  linkedin:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z",
  substack: "M22.54 8.24H1.46V5.41h21.08v2.83ZM1.46 10.81V24L12 18.11 22.54 24V10.81H1.46ZM22.54 0H1.46v2.84h21.08V0Z",
  github:
    "M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57l-.02-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3",
  superme: "M12 2.5l2.1 6.4 6.4 2.1-6.4 2.1L12 19.5l-2.1-6.4L3.5 11l6.4-2.1L12 2.5Zm7 13 .9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z",
}

export const BrandIcon = ({ id, ...p }: P & { id: SocialId }) => <Brand d={brandPaths[id]} {...p} />
