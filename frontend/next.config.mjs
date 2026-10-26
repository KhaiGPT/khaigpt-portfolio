/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  allowedDevOrigins: ["*.preview.emergentagent.com", "*.emergentagent.com", "*.emergent.host", "*.preview.emergentcf.cloud", "*.cluster-7.preview.emergentcf.cloud"],
  async headers() {
    return [
      {
        source: "/art/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ]
  },
}

export default nextConfig
