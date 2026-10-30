import { useRef, useState } from 'react'
import Button from '../ui/Button.jsx'
import TextField from '../ui/TextField.jsx'
import { submitContact } from '../../services/submitContact.js'

export default function ContactForm() {
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
    } catch (failure) {
      setError(failure.message || 'Your message could not be sent. Please try again.')
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  const sending = status === 'sending'
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
      {status === 'sent' && <p className="contact-status" role="status">Thank you. Your message has been sent.</p>}
      {status === 'error' && <p className="contact-status" role="alert">{error}</p>}
    </form>
  )
}
