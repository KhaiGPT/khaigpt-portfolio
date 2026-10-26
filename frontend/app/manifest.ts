import type { MetadataRoute } from "next"
import { site } from "@/content/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "khai",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  }
}
