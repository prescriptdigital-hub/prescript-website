import type { Metadata } from 'next'
import { SYNQ } from '@/lib/products'
import ProductPage from '@/components/products/ProductPage'
import SynqVisual from '@/components/products/SynqVisual'

export const metadata: Metadata = {
  title: 'PRESYNQ | Connect, Automate, Execute',
  description: `${SYNQ.tagline} ${SYNQ.promise}`,
  alternates: { canonical: 'https://prescriptdigital.com/products/presynq/' },
  openGraph: {
    title: 'PRESYNQ by Prescript Digital',
    description: SYNQ.tagline,
    url: 'https://prescriptdigital.com/products/presynq/',
    type: 'website',
  },
}

export default function PresynqPage() {
  return <ProductPage product={SYNQ} visual={<SynqVisual />} />
}
