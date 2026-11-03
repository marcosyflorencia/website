import Button from '../ui/Button.jsx'
import SkylineDivider from '../media/SkylineDivider.jsx'
import VideoGallery from '../media/VideoGallery.jsx'
import { performancePoster, performanceVideos } from '../../data/performanceVideos.js'
import './events.css'

const EVENTS_TITLE = 'Hiring For Events'
const EVENTS_ACTION = 'Send Inquiry'
const EVENTS_DESCRIPTION = 'Marcos and Florencia bring the beauty and emotion of Argentine tango to weddings, birthdays, corporate gatherings, and other private events, creating an elegant and memorable experience for every audience.'
const GALLERY_INTRODUCTION = 'See past performance examples below'

export default function EventsSection({ onInquiry }) {
  return (
    <section id="events" className="events" tabIndex={-1} aria-labelledby="events-title">
      <div className="events-inner">
        <SkylineDivider />
      </div>
      <div className="events-intro">
        <div className="events-heading">
          <h2 id="events-title">{EVENTS_TITLE}</h2>
          <Button onClick={onInquiry}>{EVENTS_ACTION}</Button>
        </div>
        <div className="events-description">
          <p>{EVENTS_DESCRIPTION}</p>
          <p>{GALLERY_INTRODUCTION}</p>
        </div>
      </div>
      <div className="events-inner">
        <VideoGallery videos={performanceVideos} poster={performancePoster} />
      </div>
    </section>
  )
}
