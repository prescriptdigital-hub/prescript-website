import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import StatsBar from '@/components/home/StatsBar'
import ServicesGrid from '@/components/home/ServicesGrid'
import SubscriptionsPreview from '@/components/home/SubscriptionsPreview'
import PackagesPreview from '@/components/home/PackagesPreview'
import WhyPreScript from '@/components/home/WhyPreScript'
import ClientTracker from '@/components/home/ClientTracker'
import ContactCTA from '@/components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <ServicesGrid />
        <SubscriptionsPreview />
        <PackagesPreview />
        <WhyPreScript />
        <ClientTracker />
        <ContactCTA />
      </main>
      <Footer />
    </>
  )
}
