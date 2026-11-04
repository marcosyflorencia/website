import SiteHeader from '../components/layout/SiteHeader.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import LearningSection from '../components/sections/LearningSection.jsx'
import EventsSection from '../components/sections/EventsSection.jsx'
import QuestionsSection from '../components/sections/QuestionsSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import scrollToSection from '../utils/scrollToSection.js'
import { compactLayoutMedia } from '../utils/responsive.js'
import hero from '../assets/hero_img.webp'
import heroMobile from '../assets/hero_mobile.webp'

export default function HomePage({ onHeroReady }) {
  return (
    <>
      <picture className="site-backdrop" aria-hidden="true">
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
        <ContactSection />
      </main>
    </>
  )
}
