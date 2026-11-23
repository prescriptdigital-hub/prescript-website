import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import CapabilityMarquee from '@/components/home/CapabilityMarquee'
import StructureScroll from '@/components/home/StructureScroll'
import StudioPhotos from '@/components/home/StudioPhotos'
import StatsBar from '@/components/home/StatsBar'
import ProcessStory from '@/components/home/ProcessStory'
import ServicesShowcase from '@/components/home/ServicesShowcase'
import SubscriptionsPreview from '@/components/home/SubscriptionsPreview'
import PackagesPreview from '@/components/home/PackagesPreview'
import WhyPreScript from '@/components/home/WhyPreScript'
import ClientTracker from '@/components/home/ClientTracker'
import WorkTeaser from '@/components/home/WorkTeaser'
import Testimonials from '@/components/home/Testimonials'
import ContactCTA from '@/components/home/ContactCTA'
import Reveal from '@/components/ui/Reveal'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CapabilityMarquee />
        <Reveal><StatsBar /></Reveal>
        <StructureScroll />
        <ProcessStory />
        <ServicesShowcase />
        <Reveal><SubscriptionsPreview /></Reveal>
        <Reveal><PackagesPreview /></Reveal>
        <StudioPhotos />
        <Reveal><WhyPreScript /></Reveal>
        <Reveal><WorkTeaser /></Reveal>
        <Reveal><Testimonials /></Reveal>
        <Reveal><ClientTracker /></Reveal>
        <Reveal><ContactCTA /></Reveal>
      </main>
      <Footer />
    </>
  )
}
