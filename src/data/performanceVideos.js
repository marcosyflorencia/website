import artwork from '../assets/events/performance-gallery.png'

export const performanceVideos = [
  { id: 'salon', title: 'Salon Tango', thumbnail: [101, 761, 280, 175] },
  { id: 'stage', title: 'Stage Tango', thumbnail: [413, 761, 280, 175] },
  { id: 'vals', title: 'Vals', thumbnail: [725, 761, 280, 175] },
  { id: 'milonga', title: 'Milonga', thumbnail: [1036, 761, 280, 175] },
].map(video => ({ ...video, youtubeId: 'DBRWDRs3u5A', artwork }))

export const performancePoster = { src: artwork, crop: [99, 141, 1219, 506] }
