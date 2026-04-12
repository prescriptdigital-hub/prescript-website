import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import Script from 'next/script'
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
    icon: '/prescriptcreatives_logo.png',
    shortcut: '/prescriptcreatives_logo.png',
    apple: '/prescriptcreatives_logo.png',
  },
  openGraph: {
    title: 'Prescript Digital Solutions',
    description: 'We Build, Automate & Deploy AI Into Businesses',
    type: 'website',
  },
}

const crispId = process.env.NEXT_PUBLIC_CRISP_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}

        {/* Crisp live chat — only loads when NEXT_PUBLIC_CRISP_ID is set */}
        {crispId && (
          <Script id="crisp-widget" strategy="afterInteractive">
            {`
              window.$crisp = [];
              window.CRISP_WEBSITE_ID = "${crispId}";
              (function() {
                var d = document;
                var s = d.createElement("script");
                s.src = "https://client.crisp.chat/l.js";
                s.async = 1;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
            `}
          </Script>
        )}
      </body>
    </html>
  )
}
