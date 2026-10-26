"use client"

import dynamic from "next/dynamic"
import { domMax, LazyMotion } from "motion/react"
import type { ReactNode } from "react"
import { GlassFilter } from "@/components/chrome/GlassFilter"
import { Pager } from "@/components/chrome/Pager"
import { TopBar } from "@/components/chrome/TopBar"
import { DeckProvider } from "./DeckProvider"

const Stage = dynamic(() => import("@/components/stage/Stage"), { ssr: false })

export function Experience({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <DeckProvider>
        <Stage />
        <TopBar />
        <main id="main" className="deck">
          {children}
        </main>
        <Pager />
        <GlassFilter />
      </DeckProvider>
    </LazyMotion>
  )
}
