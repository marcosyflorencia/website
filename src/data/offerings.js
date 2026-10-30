import privateClass from '../assets/learning/private-class.png'
import groupClass from '../assets/learning/group-class.png'
import practica from '../assets/learning/practica.png'
import milonga from '../assets/learning/milonga.png'

export const featuredOffering = {
  id: 'private',
  title: 'Learning Tango',
  image: privateClass,
  alt: 'Marcos and Florencia welcoming students',
  description: 'Private lessons with Marcos and Florencia are tailored to your needs and available in Manhattan or Brooklyn. Inquire about pricing, location, and scheduling.',
  note: 'Packages available.',
  action: 'Send Inquiry',
}

export const classOfferings = [
  { id: 'practica', title: 'Guided Practica', image: practica, alt: 'Marcos and Florencia leading a group practice', schedule: 'Mondays, 6:30PM - 9:30PM', description: 'Beginner-friendly practica at Ripley-Grier Midtown. Join the WhatsApp group for schedule updates, changes, or cancellations.', action: 'Join WhatsApp Group' },
  { id: 'milonga', title: 'Milonga', image: milonga, alt: 'Marcos and Florencia at a lively milonga', schedule: 'Fridays, 9 PM-1 AM', description: 'Every Friday at Ukrainian East Village Restaurant. Experience tango in its authentic social setting.', action: 'Purchase ticket' },
  { id: 'group', title: 'Intermediate Group Class', image: groupClass, alt: 'Marcos and Florencia demonstrating a tango embrace', schedule: 'Fridays, 8:00 PM - 9:00 PM', description: 'Group class for intermediate dancers before milonga. Join the WhatsApp group for the most current class information.', action: 'Join WhatsApp Group' },
]
