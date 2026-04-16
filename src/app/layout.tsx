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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}

        {/* Payment SDKs */}
        <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
        <Script src="https://checkout.flutterwave.com/v3.js" strategy="afterInteractive" />

        {/* Tawk.to live chat */}
        <Script id="tawkto-widget" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/69dfc63deae0ed1c3366934a/1jm92r302';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
