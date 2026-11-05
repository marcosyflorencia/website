import { useEffect, useRef, useState } from 'react'
import SiteHeader from '../components/layout/SiteHeader.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import LearningSection from '../components/sections/LearningSection.jsx'
import EventsSection from '../components/sections/EventsSection.jsx'
import QuestionsSection from '../components/sections/QuestionsSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import scrollToSection from '../utils/scrollToSection.js'
import { compactLayoutMedia } from '../utils/responsive.js'
import { getSectionParallaxOffset } from '../utils/parallax.js'
import hero from '../assets/hero_img.webp'
import heroMobile from '../assets/hero_mobile.webp'

export default function HomePage({ onHeroReady }) {
  const [contactVisible, setContactVisible] = useState(false)
  const backdrop = useRef(null)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      const image = backdrop.current?.querySelector('img')
      const contact = document.getElementById('contact')
      if (!image || !contact) return
      const offset = motion.matches ? 0 : getSectionParallaxOffset(contact, window.innerHeight)
      image.style.setProperty('--backdrop-parallax-y', `${offset}px`)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    motion.addEventListener('change', schedule)
    update()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      motion.removeEventListener('change', schedule)
    }
  }, [])

  return (
    <>
      <picture ref={backdrop} className="site-backdrop" data-visible={contactVisible} aria-hidden="true">
        <source media={compactLayoutMedia} srcSet={heroMobile} />
        <img src={hero} alt="" decoding="async" />
      </picture>
      <SiteHeader />
      <HeroSection onReady={onHeroReady} />
      <main className="page-sections">
        <AboutSection />
        <LearningSection onAction={() => scrollToSection('contact')} />
        <EventsSection onInquiry={() => scrollToSection('contact')} />
        <QuestionsSection />
        <ContactSection onVisibilityChange={setContactVisible} />
      </main>
    </>
  )
}
