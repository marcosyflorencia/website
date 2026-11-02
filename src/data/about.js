import { siteCopy } from '../content/siteCopy.js'

export const aboutChapters = siteCopy.introduction.chapters.map((chapter, index) => ({
  id: `introduction-chapter-${index + 1}`,
  description: chapter.description,
  mediaUrl: chapter.mediaUrl,
}))
