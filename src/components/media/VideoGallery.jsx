import Button from '../ui/Button.jsx'
import { useId, useState } from 'react'

const GROUP_LABEL = 'Performance videos'
const CHOICES_LABEL = 'Choose a performance'
const PLAY_LABEL = 'Play'
const VIDEO_TITLE_SUFFIX = 'performance video'

// Crop coordinates refer to the unchanged, locally stored Figma artwork.
function Artwork({ src, crop }) {
  const [x, y, width, height] = crop
  return <span className="video-artwork" aria-hidden="true"><img src={src} alt="" draggable="false" style={{ width: `${1415 / width * 100}%`, height: `${1111 / height * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} /></span>
}

export default function VideoGallery({ videos, poster }) {
  const [selectedId, setSelectedId] = useState(videos[0]?.id)
  const [playing, setPlaying] = useState(false)
  const playerId = useId()
  const selected = videos.find(video => video.id === selectedId) ?? videos[0]
  if (!selected) return null

  function selectVideo(video) {
    setSelectedId(video.id)
    setPlaying(true)
  }

  const autoplayUrl = `${selected.media.src}${selected.media.src.includes('?') ? '&' : '?'}autoplay=1&playsinline=1&rel=0`

  return (
    <div className="video-gallery" role="group" aria-label={GROUP_LABEL}>
      <div className="video-player" id={playerId}>
        {playing && selected.media.kind === 'video' ? <video key={selected.id} src={selected.media.src} controls autoPlay playsInline /> : playing ? <iframe key={selected.id} src={autoplayUrl} title={`${selected.title} ${VIDEO_TITLE_SUFFIX}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> :
          <Button variant="unstyled" className="video-poster" type="button" aria-label={`${PLAY_LABEL} ${selected.title}`} onClick={() => setPlaying(true)}>
            <Artwork src={poster.src} crop={poster.crop} />
            <span className="video-play-caption">▶ {PLAY_LABEL} {selected.title}</span>
          </Button>}
      </div>
      <div className="video-choices" aria-label={CHOICES_LABEL}>
        {videos.map(video => <Button variant="unstyled" className="video-choice" type="button" key={video.id} aria-pressed={selected.id === video.id} aria-controls={playerId} onClick={() => selectVideo(video)}>
          <span className="video-thumbnail"><Artwork src={video.artwork} crop={video.thumbnail} /></span>
          <span className="video-choice-label"><span className="video-selected-icon" aria-hidden="true">▶</span>{video.title}</span>
        </Button>)}
      </div>
    </div>
  )
}
