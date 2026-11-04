import { useEffect, useRef, useState } from 'react'
import ContactForm from '../forms/ContactForm.jsx'
import SiteFooter from '../layout/SiteFooter.jsx'
import './contact.css'

export default function ContactSection({ onVisibilityChange }) {
  const [submitted, setSubmitted] = useState(false)
  const root = useRef(null)

  useEffect(() => {
    const section = root.current
    const observer = new IntersectionObserver(([entry]) => onVisibilityChange(entry.isIntersecting))
    observer.observe(section)
    return () => observer.disconnect()
  }, [onVisibilityChange])

  return (
    <section ref={root} id="contact" className="contact" tabIndex={-1} aria-label="Contact us">
      <div className="contact-scene">
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
