import { useId, useState } from 'react'
import './text-field.css'

export default function TextField({ label, multiline = false, id: providedId, onBlur, onChange, onInvalid, disabled, ...props }) {
  const generatedId = useId()
  const id = providedId ?? generatedId
  const [error, setError] = useState('')
  const Control = multiline ? 'textarea' : 'input'
  function validationMessage(field) {
    if (field.validity.valueMissing) return 'Please fill out this field.'
    if (field.validity.typeMismatch && field.type === 'email') return 'Enter a valid email address.'
    return field.validationMessage
  }
  return (
    <div className={`text-field${multiline ? ' text-field--multiline' : ''}`} data-error={Boolean(error)} data-disabled={Boolean(disabled)}>
      <div className="text-field-control">
        <Control {...props} id={id} disabled={disabled} placeholder=" " rows={multiline ? 3 : undefined}
          aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}
          onBlur={event => { setError(validationMessage(event.currentTarget)); onBlur?.(event) }}
          onChange={event => { if (error) setError(validationMessage(event.currentTarget)); onChange?.(event) }}
          onInvalid={event => { event.preventDefault(); setError(validationMessage(event.currentTarget)); onInvalid?.(event) }} />
        <label htmlFor={id}>{label}</label>
      </div>
      {error && <p className="text-field-error" id={`${id}-error`} aria-live="polite">{error}</p>}
    </div>
  )
}
