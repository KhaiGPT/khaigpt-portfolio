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
  keywords: [
    "mobile app growth consultant",
    "app growth sprint",
    "fractional growth lead",
    "AI receptionist for local businesses",
    "practical AI training",
    "AI training for marketers",
    "Khai Huynh",
    "KhaiGPT",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
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
  themeColor: "#000000",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

/** without JS the scroll-scrubbed hero would be a long black runway */
const noscriptCss = `.hero{height:auto!important}.hero-pin{position:relative!important}.proof{margin-top:0!important}`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${cabinet.variable} ${satoshi.variable} ${zodiak.variable}`}>
      <head>
        <noscript>
          <style>{noscriptCss}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  )
}
