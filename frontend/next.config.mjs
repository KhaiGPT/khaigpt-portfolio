/** @type {import('next').NextConfig} */
const nextConfig = {
  // every route is static, so the build is plain files in out/ — served by Cloudflare (see wrangler.jsonc)
  output: "export",
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  allowedDevOrigins: ["*.preview.emergentagent.com", "*.emergentagent.com", "*.emergent.host", "*.preview.emergentcf.cloud", "*.cluster-7.preview.emergentcf.cloud"],
}

export default nextConfig
