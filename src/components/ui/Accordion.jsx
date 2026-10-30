import Button from './Button.jsx'
import { useId, useState } from 'react'

export default function Accordion({ items }) {
  const id = useId()
  const [openId, setOpenId] = useState(null)

  return <div className="accordion">
    {items.map(item => {
      const open = openId === item.id
      const triggerId = `${id}-${item.id}-trigger`
      const panelId = `${id}-${item.id}-panel`
      return <div className="accordion-item" key={item.id}>
        <h3>
          <Button variant="unstyled" className="accordion-trigger" id={triggerId} type="button"
            aria-expanded={open} aria-controls={panelId}
            onClick={() => setOpenId(open ? null : item.id)}>
            <span>{item.question}</span>
            <span className="accordion-icon" aria-hidden="true">{open ? '−' : '+'}</span>
          </Button>
        </h3>
        <div className="accordion-panel" id={panelId} role="region" aria-labelledby={triggerId} hidden={!open}>
          {item.answer}
        </div>
      </div>
    })}
  </div>
}
