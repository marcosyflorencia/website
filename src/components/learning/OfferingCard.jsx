import Button from '../ui/Button.jsx'
import OfferingCarousel from './OfferingCarousel.jsx'

export default function OfferingCard({ offering, index, actionLabel, actionHref, onAction }) {
  const images = Array.isArray(offering.images) ? offering.images.filter(Boolean) : []
  const headingId = `learning-offering-${index}`

  return (
    <article className={`offering${images.length ? '' : ' offering--without-images'}`} aria-labelledby={headingId}>
      <div className="offering-content">
        <h3 id={headingId}>{offering.title}</h3>
        {offering.schedule && <p className="offering-schedule">{offering.schedule}</p>}
        {offering.description && <p className="offering-description">{offering.description}</p>}
        <Button href={actionHref} onClick={actionHref ? undefined : onAction}
          target={actionHref ? '_blank' : undefined} rel={actionHref ? 'noreferrer' : undefined}>
          {actionLabel}
        </Button>
      </div>
      {images.length > 0 && <OfferingCarousel images={images} offeringTitle={offering.title} />}
    </article>
  )
}
