import Button from './Button.jsx'
import { useId, useState } from 'react'

export default function Accordion({ items }) {
  const id = useId()
  const [openIndex, setOpenIndex] = useState(null)

  return <div className="accordion">
    {items.map((item, index) => {
      const open = openIndex === index
      const triggerId = `${id}-${index}-trigger`
      const panelId = `${id}-${index}-panel`
      return <div className="accordion-item" key={`${item.question}-${index}`}>
        <h3>
          <Button variant="unstyled" className="accordion-trigger" id={triggerId} type="button"
            aria-expanded={open} aria-controls={panelId}
            onClick={() => setOpenIndex(open ? null : index)}>
            <span>{item.question}</span>
            <span className="accordion-icon" aria-hidden="true">{open ? '−' : '+'}</span>
          </Button>
        </h3>
        <div className="accordion-panel" id={panelId} role="region" aria-labelledby={triggerId} hidden={!open}>
          <p>{item.answer}</p>
        </div>
      </div>
    })}
  </div>
}
