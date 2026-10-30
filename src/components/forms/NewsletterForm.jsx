import { useState } from 'react'
import Button from '../ui/Button.jsx'
import TextField from '../ui/TextField.jsx'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.querySelector(':invalid')?.focus()
      return
    }

    setSubscribed(true)
    setEmail('')
  }

  return (
    <form className="newsletter-form" aria-label="Newsletter subscription" onSubmit={handleSubmit} noValidate>
      <div className="newsletter-control">
        <TextField
          label="Email address"
          name="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={event => {
            setEmail(event.currentTarget.value)
            if (subscribed) setSubscribed(false)
          }}
          required
        />
        <Button type="submit">Subscribe</Button>
      </div>
      <p className="newsletter-note">Occasional notes about classes, performances, and tango gatherings.</p>
      {subscribed && <p className="newsletter-status" role="status">Thank you — you’re on the list.</p>}
    </form>
  )
}
