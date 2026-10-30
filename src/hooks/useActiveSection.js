import { useEffect, useRef, useState } from 'react'

export default function useActiveSection(sectionIds) {
  const headerRef = useRef(null)
  const [activeSection, setActiveSection] = useState('')
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return undefined

    let frame = 0
    const update = () => {
      frame = 0
      const height = header.getBoundingClientRect().height
      document.documentElement.style.setProperty('--nav-height', `${height}px`)
      const marker = height + 24
      let current = ''

      sectionIds.forEach(id => {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= marker) current = id
      })

      const atPageEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      if (atPageEnd) current = sectionIds.at(-1) ?? ''
      setActiveSection(current)
      const classes = document.querySelector('.learning-class-reveal')
      const questions = document.getElementById('questions')
      setShowOverlay(Boolean(classes && questions &&
        classes.getBoundingClientRect().top <= marker &&
        questions.getBoundingClientRect().top > marker))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const observer = new ResizeObserver(schedule)

    observer.observe(header)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      document.documentElement.style.removeProperty('--nav-height')
    }
  }, [sectionIds])

  return { headerRef, activeSection, showOverlay }
}
