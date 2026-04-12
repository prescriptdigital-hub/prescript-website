import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Prescript Digital Solutions | We Build, Automate & Deploy AI Into Businesses',
  description:
    'Nigeria-based digital agency serving Africa, America & Europe. Imprint, Forge, Surge, Flow & Cortex — five integrated services from branding to AI deployment.',
  keywords: [
    'digital agency Nigeria',
    'AI deployment Africa',
    'business automation Lagos',
    'branding Nigeria',
    'digital marketing Lagos',
    'web development Nigeria',
    'AI agents Africa',
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Prescript Digital Solutions',
    description: 'We Build, Automate & Deploy AI Into Businesses',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
