import type { Metadata, Viewport } from 'next'
import { Exo_2, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import ChatWidget from '@/components/chat/ChatWidget'
import './globals.css'

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-exo2',
  display: 'swap',
})

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex',
  display: 'swap',
})

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jbmono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#C24E4E',
}

export const metadata: Metadata = {
  title: 'Prescript Digital Solutions | We Build, Automate & Deploy AI Into Businesses',
  description:
    'Nigeria-based digital agency serving Africa, America & Europe. Imprint, Forge, Surge, Flow & Cortex, five integrated services from branding to AI deployment.',
  keywords: [
    'digital agency Nigeria',
    'AI deployment Africa',
    'business automation Lagos',
    'branding Nigeria',
    'digital marketing Lagos',
    'web development Nigeria',
    'AI agents Africa',
  ],
  metadataBase: new URL('https://prescriptdigital.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#C24E4E' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Prescript Digital Solutions',
    description: 'We Build, Automate & Deploy AI Into Businesses',
    type: 'website',
    images: [{ url: '/og-image-1200x630.png', width: 1200, height: 630, alt: 'Prescript Digital' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image-1200x630.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${exo2.variable} ${plex.variable} ${jbMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}

        {/* Payment SDKs */}
        <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
        <Script src="https://checkout.flutterwave.com/v3.js" strategy="afterInteractive" />

        <ChatWidget />
      </body>
    </html>
  )
}
