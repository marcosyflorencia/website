import Button from '../ui/Button.jsx'
import { siteCopy } from '../../content/siteCopy.js'

export default function OfferingCard({ offering, featured = false, onAction }) {
  const Heading = featured ? 'h2' : 'h3'
  return (
    <article className={`offering${featured ? ' offering--featured' : ''}`} aria-labelledby={`offering-${offering.id}`}>
      <div className={`offering-media offering-media--${offering.id}`}>
        <div className="offering-crop"><img src={offering.image} alt={offering.alt} loading="lazy" /></div>
      </div>
      <div className="offering-content">
        <Heading id={`offering-${offering.id}`}>{offering.title}</Heading>
        {offering.schedule && <p className="offering-schedule">{offering.schedule}</p>}
        <p className="offering-description">{offering.description}{offering.detail && <><br />{offering.detail}</>}</p>
        {offering.note && <p className="offering-note">{offering.note}</p>}
        <Button variant={featured ? 'primary' : 'secondary'} onClick={() => onAction?.(offering.id)} title={siteCopy.learning.actionDestinationTitle}>{offering.action}</Button>
      </div>
    </article>
  )
}
