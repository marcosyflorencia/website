import OfferingCard from '../learning/OfferingCard.jsx'
import { siteCopy } from '../../content/siteCopy.js'
import './learning.css'

export default function LearningSection({ onAction }) {
  const offerings = Array.isArray(siteCopy.learning.offerings) ? siteCopy.learning.offerings : []

  return (
    <section id="learning" className="learning" tabIndex={-1} aria-labelledby="learning-title">
      <div className="learning-class-reveal">
        <div className="learning-inner">
          <h2 id="learning-title" className="learning-title">{siteCopy.learning.title}</h2>
          <div className="offering-list">
            {offerings.map((offering, index) => (
              <OfferingCard key={index} offering={offering} index={index} onAction={onAction} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
