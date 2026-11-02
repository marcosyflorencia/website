import artwork from '../assets/events/performance-gallery.png'
import { siteCopy } from '../content/siteCopy.js'

const videoCopy = siteCopy.hiring.videoGallery.videos

export const performanceVideos = [
  { id: 'salon', title: videoCopy.salon, thumbnail: [101, 761, 280, 175] },
  { id: 'stage', title: videoCopy.stage, thumbnail: [413, 761, 280, 175] },
  { id: 'vals', title: videoCopy.vals, thumbnail: [725, 761, 280, 175] },
  { id: 'milonga', title: videoCopy.milonga, thumbnail: [1036, 761, 280, 175] },
].map(video => ({ ...video, youtubeId: 'DBRWDRs3u5A', artwork }))

export const performancePoster = { src: artwork, crop: [99, 141, 1219, 506] }
