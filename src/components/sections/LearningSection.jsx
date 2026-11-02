import OfferingCard from '../learning/OfferingCard.jsx'
import { classOfferings, featuredOffering } from '../../data/offerings.js'
import './learning.css'

export default function LearningSection({ onAction }) {
  return (
    <section id="learning" className="learning" tabIndex={-1} aria-label="Learning Tango">
      <div className="learning-class-reveal">
        <div className="learning-inner">
          <OfferingCard offering={featuredOffering} featured onAction={onAction} />
          <div className="offering-grid">
            {classOfferings.map(offering => <OfferingCard key={offering.id} offering={offering} onAction={onAction} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
