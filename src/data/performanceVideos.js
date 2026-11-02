import { siteCopy } from '../content/siteCopy.js'
import { resolveMediaUrl } from '../utils/mediaUrl.js'

const maintainedVideos = Array.isArray(siteCopy.hiring) ? siteCopy.hiring : []

function getThumbnailUrl(media) {
  if (media.kind === 'youtube') return `https://i.ytimg.com/vi/${media.id}/hqdefault.jpg`
  return ''
}

export const performanceVideos = maintainedVideos
  .filter(video => video?.title && video?.videoUrl)
  .map((video, index) => {
    const media = resolveMediaUrl(video.videoUrl)
    return {
      id: `performance-${index}`,
      title: video.title,
      media,
      thumbnailUrl: getThumbnailUrl(media),
    }
  })

export const performancePoster = { src: performanceVideos[0]?.thumbnailUrl || '' }
