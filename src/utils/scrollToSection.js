export default function scrollToSection(id) {
  const section = document.getElementById(id)
  if (!section) return

  window.history.pushState(null, '', `#${id}`)
  section.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
  section.focus({ preventScroll: true })
}
