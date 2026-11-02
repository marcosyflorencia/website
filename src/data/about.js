import firstImage from '../assets/about_img_1.png'
import secondImage from '../assets/about_img_2.png'
import thirdImage from '../assets/about_img_3.png'
import fourthImage from '../assets/about_img_4.png'
import { siteCopy } from '../content/siteCopy.ts'

const images = [firstImage, secondImage, thirdImage, fourthImage]

export const aboutChapters = siteCopy.introduction.about.chapters.map((chapter, index) => ({
  ...chapter,
  image: images[index],
  alt: chapter.imageAlt,
}))
