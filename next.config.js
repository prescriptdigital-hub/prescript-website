/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages (pure HTML/CSS/JS, no Node.js server needed)
  output: 'export',

  // Trailing slash — Cloudflare Pages serves index.html files in folders
  trailingSlash: true,

  // Required for Next.js Image with static export
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
