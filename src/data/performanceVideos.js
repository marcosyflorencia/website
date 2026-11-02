import artwork from '../assets/events/performance-gallery.png'
import { siteCopy } from '../content/siteCopy.js'
import { resolveMediaUrl } from '../utils/mediaUrl.js'

const thumbnailCrops = [
  [101, 761, 280, 175],
  [413, 761, 280, 175],
  [725, 761, 280, 175],
  [1036, 761, 280, 175],
]

const maintainedVideos = Array.isArray(siteCopy.hiring) ? siteCopy.hiring : []

export const performancePoster = { src: artwork, crop: [99, 141, 1219, 506] }

export const performanceVideos = maintainedVideos
  .filter(video => video?.title && video?.videoUrl)
  .map((video, index) => ({
    id: `performance-${index}`,
    title: video.title,
    media: resolveMediaUrl(video.videoUrl),
    thumbnail: thumbnailCrops[index] ?? performancePoster.crop,
    artwork,
  }))
