/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger runs this as a full Next.js Node.js server (next start).
  // Do NOT use output: 'export' — that is for plain static hosts with no Node.js.

  // Trailing slash keeps URLs consistent (e.g. /contact/ not /contact)
  trailingSlash: true,

  // Tell CDN and browsers: never cache HTML pages, always cache static assets.
  // This prevents the "old HTML + new CSS hash = 404" problem permanently.
  async headers() {
    return [
      {
        // HTML pages — never cache so users always get the latest version
        source: '/((?!_next/static|_next/image|favicon|.*\\.(?:png|jpg|jpeg|svg|ico|woff2?)).*)',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
        ],
      },
      {
        // Static assets have content hashes — safe to cache for 1 year
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
