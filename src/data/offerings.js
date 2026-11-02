import privateClass from '../assets/learning/private-class.png'
import groupClass from '../assets/learning/group-class.png'
import practica from '../assets/learning/practica.png'
import milonga from '../assets/learning/milonga.png'
import { siteCopy } from '../content/siteCopy.js'

export const featuredOffering = {
  id: 'private',
  image: privateClass,
  ...siteCopy.learning.featuredOffering,
  alt: siteCopy.learning.featuredOffering.imageAlt,
}

const offeringCopy = siteCopy.learning.classOfferings

export const classOfferings = [
  { id: 'practica', image: practica, ...offeringCopy.practica, alt: offeringCopy.practica.imageAlt },
  { id: 'milonga', image: milonga, ...offeringCopy.milonga, alt: offeringCopy.milonga.imageAlt },
  { id: 'group', image: groupClass, ...offeringCopy.group, alt: offeringCopy.group.imageAlt },
]
