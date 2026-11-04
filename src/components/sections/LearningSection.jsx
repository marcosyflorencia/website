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
  const offerings = Array.isArray(siteCopy.learning) ? siteCopy.learning : []

  return (
    <section id="learning" className="learning" tabIndex={-1} aria-labelledby="learning-title">
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
