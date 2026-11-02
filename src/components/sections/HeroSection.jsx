import { useEffect, useRef } from 'react'
import Button from '../ui/Button.jsx'
import HeroLabel from './HeroLabel.jsx'
import scrollToSection from '../../utils/scrollToSection.js'
import hero from '../../assets/hero_img.png'
import wordmark from '../../assets/wordmark.svg'
import { siteCopy } from '../../content/siteCopy.ts'

export default function HeroSection() {
  const heroRef = useRef(null)
  const copy = siteCopy.introduction

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
      <section className="landing" ref={heroRef} aria-label={copy.sectionLabel}>
        <img className="hero-image" src={hero} alt={copy.imageAlt} fetchPriority="high" />
        <div className="hero-nav-space" aria-hidden="true" />
        <div className="hero-content">
          <HeroLabel />
          <h1><img src={wordmark} alt={copy.wordmarkAlt} width="623" height="167" /></h1>
          <p className="introduction">
            {copy.statementLines.map((line, index) => <span key={line}>{line}{index < copy.statementLines.length - 1 && <br />}</span>)}
          </p>
          <div className="actions">
            <Button onClick={() => scrollToSection('learning')}>{copy.primaryAction}</Button>
            <Button variant="secondary" onClick={() => scrollToSection('events')}>{copy.secondaryAction}</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
