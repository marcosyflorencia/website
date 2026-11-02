import firstImage from '../assets/about_img_1.png'
import secondImage from '../assets/about_img_2.png'
import thirdImage from '../assets/about_img_3.png'
import fourthImage from '../assets/about_img_4.png'
import { siteCopy } from '../content/siteCopy.js'

const images = [firstImage, secondImage, thirdImage, fourthImage]
const imageAlts = [
  'Marcos and Florencia sharing a tango embrace in Buenos Aires',
  'Marcos and Florencia celebrating their Buenos Aires championship recognition',
  'Marcos and Florencia performing Argentine tango',
  'Marcos and Florencia holding their recognition certificates in New York',
]

export const aboutChapters = siteCopy.introduction.about.chapters.map((chapter, index) => ({
  ...chapter,
  image: images[index],
  alt: imageAlts[index],
}))
