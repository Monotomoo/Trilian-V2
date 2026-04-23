import { useEffect } from 'react'
import Nav from '../components/Nav'
import ScrollProgress from '../components/ScrollProgress'
import Hero from '../components/Hero'
import Manifesto from '../components/Manifesto'
import Approach from '../components/Approach'
import LogoLab from '../components/LogoLab'
import ServicesList from '../components/ServicesList'
import FounderStory from '../components/FounderStory'
import AboutSlider from '../components/AboutSlider'
import TestimonialsPlaceholder from '../components/TestimonialsPlaceholder'
import Principles from '../components/Principles'
import BlogTeaser from '../components/BlogTeaser'
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
      <Approach />
      <LogoLab />
      <ServicesList />
      <FounderStory />
      <AboutSlider />
      <TestimonialsPlaceholder />
      <Principles />
      <BlogTeaser />
      <ContactForm />
      <Footer />
    </main>
  )
}
