import type { Metadata } from 'next'
import { IQ } from '@/lib/products'
import ProductPage from '@/components/products/ProductPage'
import IQVisual from '@/components/products/IQVisual'

export const metadata: Metadata = {
  title: 'PRESCRIPT IQ | Think, Decide, Plan',
  description: `${IQ.tagline} ${IQ.promise}`,
  alternates: { canonical: 'https://prescriptdigital.com/products/prescript-iq/' },
  openGraph: {
    title: 'PRESCRIPT IQ by Prescript Digital',
    description: IQ.tagline,
    url: 'https://prescriptdigital.com/products/prescript-iq/',
    type: 'website',
  },
}

export default function PrescriptIQPage() {
  return <ProductPage product={IQ} visual={<IQVisual />} />
}
