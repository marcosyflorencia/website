import Button from '../ui/Button.jsx'
import { siteCopy } from '../../content/siteCopy.js'
import OfferingCarousel from './OfferingCarousel.jsx'

export default function OfferingCard({ offering, index, onAction }) {
  const images = Array.isArray(offering.images) ? offering.images.filter(Boolean) : []
  const headingId = `learning-offering-${offering.id ?? index}`

  return (
    <article className={`offering${images.length ? '' : ' offering--without-images'}`} aria-labelledby={headingId}>
      <div className="offering-content">
        <h3 id={headingId}>{offering.title}</h3>
        {offering.schedule && <p className="offering-schedule">{offering.schedule}</p>}
        {offering.description && <p className="offering-description">{offering.description}</p>}
        {offering.note && <p className="offering-note">{offering.note}</p>}
        {offering.action && (
          <Button onClick={() => onAction?.(offering.id)} title={siteCopy.learning.actionDestinationTitle}>
            {offering.action}
          </Button>
        )}
      </div>
      {images.length > 0 && <OfferingCarousel images={images} offeringTitle={offering.title} />}
    </article>
  )
}
