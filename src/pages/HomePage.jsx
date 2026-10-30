import SiteHeader from '../components/layout/SiteHeader.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import LearningSection from '../components/sections/LearningSection.jsx'
import EventsSection from '../components/sections/EventsSection.jsx'
import QuestionsSection from '../components/sections/QuestionsSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import SiteFooter from '../components/layout/SiteFooter.jsx'
import scrollToSection from '../utils/scrollToSection.js'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <main className="page-sections">
        <AboutSection />
        <LearningSection onAction={() => scrollToSection('contact')} />
        <EventsSection onInquiry={() => scrollToSection('contact')} />
        <QuestionsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
