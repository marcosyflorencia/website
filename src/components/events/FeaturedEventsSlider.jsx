import FeaturedEventCard from './FeaturedEventCard.jsx'
import './featured-events-slider.css'

const FEATURED_EVENTS = [
  {
    name: 'Valentango',
  },
  {
    name: 'San Antonio Tango Festival',
    logo: '/media/events/san-antonio-tango-festival.jpg',
  },
  {
    name: 'Denver Tango Festival',
  },
  {
    name: 'Pittsburgh Tango Festival',
    logo: '/media/events/pittsburgh-tango-festival.png',
  },
  {
    name: 'Las Vegas Tango Festival',
    logo: '/media/events/las-vegas-tango-festival.png',
  },
  {
    name: 'Albuquerque Tango Festival',
    logo: '/media/events/albuquerque-tango-festival.svg',
  },
  {
    name: 'ATUSA Championship & Festival',
    logo: '/media/events/atusa.png',
  },
]

export default function FeaturedEventsSlider() {
  return (
    <div className="featured-events-slider" role="region" aria-label="Featured festivals and events" tabIndex="0">
      <div className="featured-events-track">
        <div className="featured-events-group" aria-hidden="true">
          {FEATURED_EVENTS.map(event => <FeaturedEventCard event={event} key={`duplicate-${event.name}`} />)}
        </div>
        <div className="featured-events-group" role="list">
          {FEATURED_EVENTS.map(event => <FeaturedEventCard event={event} key={event.name} />)}
        </div>
      </div>
    </div>
  )
}
