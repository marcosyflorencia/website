import { siteCopy } from '../content/siteCopy.js'

export const navigationItems = [
  { id: 'about', label: 'About us', href: '#about' },
  { id: 'learning', label: 'Learning tango', href: '#learning' },
  { id: 'events', label: 'Hiring for events', href: '#events' },
  { id: 'questions', label: 'Q&A', href: '#questions' },
  { id: 'booking', label: 'Book Private Classes', href: siteCopy.socialLinks.booking, external: true },
]

export const headerNavigationItems = [
  ...navigationItems.filter(item => item.id !== 'booking'),
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const navigationSectionIds = headerNavigationItems.map(item => item.id)
