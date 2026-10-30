import Button from '../ui/Button.jsx'
import SkylineDivider from '../media/SkylineDivider.jsx'
import VideoGallery from '../media/VideoGallery.jsx'
import { performancePoster, performanceVideos } from '../../data/performanceVideos.js'
import './events.css'

export default function EventsSection({ onInquiry }) {
  return (
    <section id="events" className="events" tabIndex={-1} aria-labelledby="events-title">
      <div className="events-inner">
        <SkylineDivider />
      </div>
        <div className="events-intro">
          <div className="events-heading">
            <h2 id="events-title">Hiring For Events</h2>
            <Button onClick={onInquiry}>Send Inquiry</Button>
          </div>
          <div className="events-description">
            <p>Marcos and Florencia bring the beauty and emotion of Argentine tango to weddings, birthdays, corporate gatherings, and other private events, creating an elegant and memorable experience for every audience.</p>
            <p>See past performance examples below</p>
          </div>
        </div>
      <div className="events-inner">
        <VideoGallery videos={performanceVideos} poster={performancePoster} />
      </div>
    </section>
  )
}
