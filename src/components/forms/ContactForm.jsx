import { useRef, useState } from 'react'
import Button from '../ui/Button.jsx'
import TextField from '../ui/TextField.jsx'
import { submitContact } from '../../services/submitContact.js'

export default function ContactForm({ onSuccess }) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const submitting = useRef(false)

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting.current) return
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.querySelector(':invalid')?.focus()
      setStatus('idle')
      return
    }
    const fields = new FormData(form)
    submitting.current = true
    setStatus('sending')
    setError('')
    try {
      await submitContact({
        name: fields.get('name'),
        email: fields.get('email'),
        message: fields.get('message'),
      })
      form.reset()
      setStatus('sent')
      onSuccess?.()
    } catch (failure) {
      setError(failure.message || 'Your message could not be sent. Please try again.')
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  const sending = status === 'sending'
  if (status === 'sent') {
    return (
      <div className="contact-form contact-form--success" role="status" aria-live="polite">
        <p className="contact-status contact-status--success">
          <span className="contact-success-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
              <path d="M10.6,16.6l7.05-7.05l-1.4-1.4L10.6,13.8L7.75,10.95l-1.4,1.4L10.6,16.6ZM12,22q-2.07,0-3.9-0.79q-1.82-0.79-3.17-2.14Q3.58,17.73 2.79,15.9T2,12Q2,9.92 2.79,8.1Q3.58,6.27 4.93,4.93Q6.28,3.57 8.1,2.79Q9.93,2 12,2t3.9,0.79t3.17,2.14q1.35,1.35 2.14,3.17Q22,9.92 22,12t-0.79,3.9t-2.14,3.17q-1.35,1.35-3.17,2.14T12,22Zm0-2q3.35,0 5.68-2.32T20,12T17.68,6.32T12,4T6.33,6.32T4,12t2.33,5.68T12,20Zm0-8Z" />
            </svg>
          </span>
          <span>
            Your inquiry has been sent successfully!<br />
            We’ll get back to you as soon as we can 😊
          </span>
        </p>
      </div>
    )
  }

  return (
    <form className="contact-form" aria-label="Contact us" aria-busy={sending}
      onSubmit={handleSubmit} noValidate
      onChange={() => { if (!submitting.current) { setStatus('idle'); setError('') } }}>
      <div className="contact-fields">
        <TextField label="Your name" name="name" autoComplete="name" required disabled={sending} />
        <TextField label="Email Address" name="email" type="email" autoComplete="email" required disabled={sending} />
        <TextField label="Your message" name="message" multiline required disabled={sending} />
      </div>
      <Button type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send Inquiry'}</Button>
      {status === 'error' && <p className="contact-status contact-status--error" role="alert">{error}</p>}
    </form>
  )
}
