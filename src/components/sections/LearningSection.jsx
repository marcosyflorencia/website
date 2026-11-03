import { useEffect, useRef } from 'react'
import OfferingCard from '../learning/OfferingCard.jsx'
import { siteCopy } from '../../content/siteCopy.js'
import './learning.css'

const ACTION_LABELS = [
  'Book private class',
  'Join WhatsApp news',
  'Purchase ticket',
  'Join WhatsApp news',
]

const ACTION_LINK_KEYS = {
  'Book private class': 'booking',
  'Join WhatsApp news': 'whatsapp',
  'Purchase ticket': 'eventbrite',
}

const LEARNING_TITLE = 'Learning Tango'

export default function LearningSection({ onAction }) {
  const root = useRef(null)
  const offerings = Array.isArray(siteCopy.learning) ? siteCopy.learning : []

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const section = root.current
      if (!section) return
      const revealPoint = window.innerHeight * (2 / 3)
      const progress = Math.min(1, Math.max(0, (revealPoint - section.getBoundingClientRect().top) / 160))
      const opacity = motion.matches ? (progress > 0 ? 1 : 0) : progress * progress * (3 - 2 * progress)
      section.style.setProperty('--learning-entry-opacity', String(opacity))
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
    <section ref={root} id="learning" className="learning" tabIndex={-1} aria-labelledby="learning-title">
      <div className="learning-class-reveal">
        <div className="learning-inner">
          <h2 id="learning-title" className="learning-title">{LEARNING_TITLE}</h2>
          <div className="offering-list">
            {offerings.map((offering, index) => {
              const actionLabel = ACTION_LABELS[index] ?? 'Send Inquiry'
              const linkKey = ACTION_LINK_KEYS[actionLabel]
              return <OfferingCard key={index} offering={offering} index={index}
                actionLabel={actionLabel} actionHref={linkKey ? siteCopy.socialLinks?.[linkKey] : undefined}
                onAction={onAction} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
