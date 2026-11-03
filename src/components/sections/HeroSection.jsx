import { useEffect, useRef } from 'react'
import Button from '../ui/Button.jsx'
import HeroLabel from './HeroLabel.jsx'
import scrollToSection from '../../utils/scrollToSection.js'
import { compactLayoutMedia } from '../../utils/responsive.js'
import hero from '../../assets/hero_img.webp'
import heroMobile from '../../assets/hero_mobile.webp'
import wordmark from '../../assets/wordmark.svg'

export default function HeroSection({ onReady }) {
  const heroRef = useRef(null)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const heroElement = heroRef.current
      if (!heroElement) return
      const progress = Math.min(1, Math.max(0, window.scrollY / heroElement.offsetHeight))
      const visualProgress = 1 - Math.pow(1 - progress, 1.35)
      const lift = visualProgress * Math.min(72, window.innerHeight * 0.08)
      heroElement.style.opacity = motion.matches ? (progress >= 1 ? '0' : '1') : String(1 - visualProgress)
      heroElement.style.transform = motion.matches ? '' : `translate3d(0, ${-lift}px, 0)`
      heroElement.inert = progress >= 1
      heroElement.setAttribute('aria-hidden', String(progress >= 1))
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
    <div className="hero-space" id="home">
      <section className="landing" ref={heroRef} aria-label="Introduction">
        <picture>
          <source media={compactLayoutMedia} srcSet={heroMobile} />
          <img className="hero-image" src={hero} alt="Marcos and Florencia dancing Argentine tango" loading="eager" fetchPriority="high" decoding="async" onLoad={onReady} onError={onReady} />
        </picture>
        <div className="hero-nav-space" aria-hidden="true" />
        <div className="hero-content">
          <HeroLabel />
          <h1><img src={wordmark} alt="Marcos & Florencia" width="623" height="167" decoding="async" /></h1>
          <p className="introduction">
            From Argentina,<br />
            For Everyone,<br />
            Through Connection.
          </p>
          <div className="actions">
            <Button onClick={() => scrollToSection('learning')}>Start your journey</Button>
            <Button variant="secondary" onClick={() => scrollToSection('events')}>Hire for events</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
