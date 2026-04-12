/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — required for Hostinger shared/VPS hosting
  // This generates a plain HTML/CSS/JS build in the /out folder
  output: 'export',

  // Required for static export with Next.js Image (disables server-side optimisation)
  images: {
    unoptimized: true,
  },

  // Optional: set this if your site lives in a subfolder on Hostinger
  // e.g. basePath: '/prescript' if hosted at yourdomain.com/prescript
  // Leave empty if it's the root domain
  // basePath: '',
}

module.exports = nextConfig
