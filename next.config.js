/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — required for Hostinger shared/VPS hosting
  // This generates a plain HTML/CSS/JS build in the /out folder
  output: 'export',

  // Ensures all pages are generated as /page/index.html (with trailing slash)
  // Prevents hydration mismatches when static hosts normalise URLs differently
  trailingSlash: true,

  // Required for static export with Next.js Image (disables server-side optimisation)
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
