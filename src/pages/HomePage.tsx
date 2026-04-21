import { useEffect } from 'react'
import Nav from '../components/Nav'
import ScrollProgress from '../components/ScrollProgress'
import Hero from '../components/Hero'
import Manifesto from '../components/Manifesto'
import MarqueeStrip from '../components/MarqueeStrip'
import Approach from '../components/Approach'
import GalleryStrip from '../components/GalleryStrip'
import ServicesList from '../components/ServicesList'
import FounderStory from '../components/FounderStory'
import TestimonialsPlaceholder from '../components/TestimonialsPlaceholder'
import Principles from '../components/Principles'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

export default function HomePage() {
  useEffect(() => {
    const preserved = sessionStorage.getItem('preserveScroll')
    if (preserved !== null) {
      window.scrollTo({ top: parseInt(preserved, 10), behavior: 'instant' as ScrollBehavior })
      sessionStorage.removeItem('preserveScroll')
    }
  }, [])

  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Manifesto />
      <MarqueeStrip />
      <Approach />
      <GalleryStrip />
      <ServicesList />
      <FounderStory />
      <TestimonialsPlaceholder />
      <Principles />
      <ContactForm />
      <Footer />
    </main>
  )
}
