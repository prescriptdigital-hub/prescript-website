import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ServiceHero from '@/components/services/ServiceHero'
import ServiceBody from '@/components/services/ServiceBody'
import ServiceSidebar from '@/components/services/ServiceSidebar'
import { SERVICES } from '@/lib/services'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = SERVICES.find((s) => s.slug === params.slug)
  if (!service) return {}
  return {
    title: `${service.name} — ${service.fullName} | Prescript Digital Solutions`,
    description: service.tagline,
    openGraph: {
      title: `${service.name} by Prescript`,
      description: service.tagline,
    },
  }
}

export default function ServicePage({ params }: PageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug)
  if (!service) notFound()

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ServiceHero service={service} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <ServiceBody service={service} />
          </div>
          <div className="lg:col-span-1">
            <ServiceSidebar service={service} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
