import Button from '../ui/Button.jsx'
import SkylineDivider from '../media/SkylineDivider.jsx'
import VideoGallery from '../media/VideoGallery.jsx'
import { performancePoster, performanceVideos } from '../../data/performanceVideos.js'
import { siteCopy } from '../../content/siteCopy.js'
import './events.css'

export default function EventsSection({ onInquiry }) {
  const copy = siteCopy.hiring
  return (
    <section id="events" className="events" tabIndex={-1} aria-labelledby="events-title">
      <div className="events-inner">
        <SkylineDivider />
      </div>
        <div className="events-intro">
          <div className="events-heading">
            <h2 id="events-title">{copy.title}</h2>
            <Button onClick={onInquiry}>{copy.action}</Button>
          </div>
          <div className="events-description">
            <p>{copy.description}</p>
            <p>{copy.galleryIntroduction}</p>
          </div>
        </div>
      <div className="events-inner">
        <VideoGallery videos={performanceVideos} poster={performancePoster} />
      </div>
    </section>
  )
}
