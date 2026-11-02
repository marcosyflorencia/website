import privateClass from '../assets/learning/private-class.png'
import groupClass from '../assets/learning/group-class.png'
import practica from '../assets/learning/practica.png'
import milonga from '../assets/learning/milonga.png'
import { siteCopy } from '../content/siteCopy.js'

export const featuredOffering = {
  id: 'private',
  image: privateClass,
  ...siteCopy.learning.featuredOffering,
  alt: 'Marcos and Florencia welcoming students',
}

const offeringCopy = siteCopy.learning.classOfferings

export const classOfferings = [
  { id: 'practica', image: practica, ...offeringCopy.practica, alt: 'Marcos and Florencia leading a group practice' },
  { id: 'milonga', image: milonga, ...offeringCopy.milonga, alt: 'Marcos and Florencia at a lively milonga' },
  { id: 'group', image: groupClass, ...offeringCopy.group, alt: 'Marcos and Florencia demonstrating a tango embrace' },
]
