export default function FeaturedEventCard({ event }) {
  return (
    <div className={`featured-event-card${event.logo ? '' : ' featured-event-card--name-only'}`} role="listitem">
      {event.logo && <img src={event.logo} alt="" loading="lazy" decoding="async" />}
      <span>{event.name}</span>
    </div>
  )
}
