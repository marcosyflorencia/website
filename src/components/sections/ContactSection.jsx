import { useState } from 'react'
import ContactForm from '../forms/ContactForm.jsx'
import SiteFooter from '../layout/SiteFooter.jsx'
import './contact.css'

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" className="contact" tabIndex={-1} aria-label="Contact us">
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
