import { useEffect, useRef } from 'react'
import Button from '../ui/Button.jsx'
import HeroLabel from './HeroLabel.jsx'
import scrollToSection from '../../utils/scrollToSection.js'
import hero from '../../assets/hero_img.png'
import wordmark from '../../assets/wordmark.svg'

export default function HeroSection() {
  const heroRef = useRef(null)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const heroElement = heroRef.current
      if (!heroElement) return
      const progress = Math.min(1, Math.max(0, window.scrollY / heroElement.offsetHeight))
      const fade = progress * progress * (3 - 2 * progress)
      heroElement.style.opacity = motion.matches ? (progress >= 1 ? '0' : '1') : String(1 - fade)
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
        <img className="hero-image" src={hero} alt="Marcos and Florencia dancing Argentine tango" fetchPriority="high" />
        <div className="hero-nav-space" aria-hidden="true" />
        <div className="hero-content">
          <HeroLabel />
          <h1><img src={wordmark} alt="Marcos & Florencia" width="623" height="167" /></h1>
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
