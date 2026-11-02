import { useEffect, useRef } from 'react'
import OfferingCard from '../learning/OfferingCard.jsx'
import { classOfferings, featuredOffering } from '../../data/offerings.js'
import { siteCopy } from '../../content/siteCopy.js'
import './learning.css'

export default function LearningSection({ onAction }) {
  const sectionRef = useRef(null)
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const properties = ['--quote-opacity', '--quote-offset', '--learning-backdrop-opacity', '--classes-opacity']
    const ease = value => {
      const t = Math.min(1, Math.max(0, value))
      return t * t * (3 - 2 * t)
    }
    let frame = 0
    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (motion.matches) {
        properties.forEach(property => section.style.removeProperty(property))
        return
      }
      const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 0
      const travel = nav - section.getBoundingClientRect().top
      // One timeline: crossfade from About, hold the quote alone, then reveal classes.
      const entrance = ease(travel / 160)
      const departure = ease((travel - 220) / 320)
      const classes = ease((travel - 440) / 180)
      section.style.setProperty('--learning-backdrop-opacity', String(entrance))
      section.style.setProperty('--quote-opacity', String(entrance * (1 - departure)))
      section.style.setProperty('--quote-offset', `${-departure * Math.min(220, (window.innerHeight - nav) * 0.3)}px`)
      section.style.setProperty('--classes-opacity', String(classes))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
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
    <section ref={sectionRef} id="learning" className="learning" tabIndex={-1} aria-label={siteCopy.learning.sectionLabel}>
      <div className="learning-quote-band">
        <blockquote className="learning-quote">
          <span className="learning-quote-mark" aria-hidden="true">“</span>
          <p>{siteCopy.learning.quote}</p>
        </blockquote>
      </div>
      <div className="learning-class-reveal">
      <div className="learning-inner">
        <OfferingCard offering={featuredOffering} featured onAction={onAction} />
        <div className="offering-grid">
          {classOfferings.map(offering => <OfferingCard key={offering.id} offering={offering} onAction={onAction} />)}
        </div>
      </div>
      </div>
    </section>
  )
}
