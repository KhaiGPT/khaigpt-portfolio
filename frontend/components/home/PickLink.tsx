"use client"

import { PICK_EVENT } from "./InterestForm"

/** A card's quiet second option: jump to the interest form with this service already picked. */
export function PickLink({ service, children }: { service: string; children: React.ReactNode }) {
  return (
    <a href="#interest" className="pick-link" onClick={() => dispatchEvent(new CustomEvent(PICK_EVENT, { detail: service }))} data-testid={`${service}-interest`}>
      {children} →
    </a>
  )
}
