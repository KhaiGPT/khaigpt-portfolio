import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import type { ReactNode } from "react"
import { site } from "@/content/site"
import "./globals.css"

const cabinet = localFont({
  src: [
    { path: "./fonts/CabinetGrotesk-500.woff2", weight: "500" },
    { path: "./fonts/CabinetGrotesk-800.woff2", weight: "800" },
  ],
  variable: "--font-cabinet",
  display: "swap",
})

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700" },
  ],
  variable: "--font-satoshi",
  display: "swap",
})

const zodiak = localFont({
  src: [{ path: "./fonts/Zodiak-400i.woff2", weight: "400", style: "italic" }],
  variable: "--font-zodiak",
  display: "swap",
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: ["Khai Huynh", "KhaiGPT", "growth marketing", "go-to-market", "startup founder", "Southeast Asia", "Vietnam", "consumer apps", "Zero-One Shot"],
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
    firstName: "Khai",
    lastName: "Huynh",
    username: site.handle,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Khai Huynh — two liquid-chrome hands reaching for each other" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@khaiGPT",
    creator: "@khaiGPT",
    title: site.title,
    description: site.description,
    images: [{ url: "/og.jpg", alt: "Khai Huynh — two liquid-chrome hands reaching for each other" }],
  },
  formatDetection: { email: false, telephone: false, address: false },
}

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

const noscriptCss = `.chapter{position:relative!important;visibility:visible!important;min-height:100svh}.rv,.art-img{opacity:1!important;translate:none!important;scale:none!important;filter:none!important}.art-img{display:block!important}.deck{height:auto!important;overflow:visible!important}html,body{overflow:auto!important}.pager{display:none}`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cabinet.variable} ${satoshi.variable} ${zodiak.variable}`}>
      <head>
        <noscript>
          <style>{noscriptCss}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  )
}
