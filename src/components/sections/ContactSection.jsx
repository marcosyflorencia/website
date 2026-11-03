import { useEffect, useRef, useState } from 'react'
import ContactForm from '../forms/ContactForm.jsx'
import SiteFooter from '../layout/SiteFooter.jsx'
import { compactLayoutMedia } from '../../utils/responsive.js'
import hero from '../../assets/hero_img.webp'
import heroMobile from '../../assets/hero_mobile.webp'
import './contact.css'

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const root = useRef(null)
  const scene = useRef(null)
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const questions = document.getElementById('questions')
    let frame = 0
    const update = () => {
      frame = 0
      const section = root.current
      const top = section.getBoundingClientRect().top
      const progress = Math.min(1, Math.max(0, (window.innerHeight - top) / (window.innerHeight * 0.65)))
      const eased = motion.matches ? (progress > 0 ? 1 : 0) : progress * progress * (3 - 2 * progress)
      section.style.setProperty('--contact-opacity', String(eased))
      scene.current.inert = progress === 0
      scene.current.setAttribute('aria-hidden', String(progress === 0))
      section.style.setProperty('--contact-visibility', progress > 0 ? 'visible' : 'hidden')
      questions?.style.setProperty('--questions-opacity', String(1 - eased))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    motion.addEventListener('change', schedule)
    const observer = new ResizeObserver(schedule)
    if (questions) observer.observe(questions)
    update()
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      motion.removeEventListener('change', schedule)
      questions?.style.removeProperty('--questions-opacity')
    }
  }, [])

  return (
    <section ref={root} id="contact" className="contact" tabIndex={-1} aria-label="Contact us">
      <div className="contact-background" aria-hidden="true">
        <picture>
          <source media={compactLayoutMedia} srcSet={heroMobile} />
          <img className="contact-image" src={hero} alt="" loading="lazy" decoding="async" />
        </picture>
      </div>
      <div ref={scene} className="contact-scene">
        <div className="contact-content">
          <div className="contact-heading">
            <h2>Contact us</h2>
            {!submitted && (
              <p>You can leave us a message here or directly email us at <a href="mailto:marcosyflorenciatango@gmail.com">marcosyflorenciatango@gmail.com</a>.</p>
            )}
          </div>
          <ContactForm onSuccess={() => setSubmitted(true)} />
        </div>
      </div>
      <SiteFooter />
    </section>
  )
}
