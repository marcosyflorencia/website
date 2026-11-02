import { useEffect, useRef, useState } from 'react'
import { aboutChapters as chapters } from '../../data/about.js'
import IntroductionMedia from '../media/IntroductionMedia.jsx'
import Button from '../ui/Button.jsx'
import texture from '../../assets/about-texture.png'
import map from '../../assets/about-map.png'
import './about.css'

const ABOUT_CAPTION = 'Tango is more than performance. It is a way to connect and communicate through the embrace.'

export default function AboutSection() {
  const root = useRef(null)
  const chapterRefs = useRef([])
  const imageRefs = useRef([])
  const galleryRef = useRef(null)
  const mapLayer = useRef(null)
  const stage = useRef(null)
  const textColumn = useRef(null)
  const [activeChapter, setActiveChapter] = useState(0)

  useEffect(() => {
    if (!chapters.length) return undefined
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      if (motion.matches) {
        stage.current.style.opacity = ''
        stage.current.style.removeProperty('--about-caption-opacity')
        stage.current.style.removeProperty('--about-content-opacity')
        textColumn.current.inert = false
        textColumn.current.removeAttribute('aria-hidden')
        chapterRefs.current.forEach(chapter => {
          chapter.style.opacity = ''
          chapter.style.transform = ''
          chapter.removeAttribute('aria-hidden')
        })
        return
      }
      const rect = root.current.getBoundingClientRect()
      const travel = Math.max(0, -rect.top)
      const step = 320
      const ease = value => {
        const t = Math.min(1, Math.max(0, value))
        return t * t * (3 - 2 * t)
      }
      const progress = Math.min(chapters.length - 1, travel / step)
      const index = Math.floor(progress)
      // Space the moving chapters by their measured height so their text never overlaps.
      const blend = index === chapters.length - 1 ? 0 : Math.max(0, Math.min(1, (travel - index * step - 120) / 200))
      const heights = chapterRefs.current.map(chapter => chapter.getBoundingClientRect().height)
      const distance = Math.max(heights[index], heights[index + 1] || 0) + 64
      chapterRefs.current.forEach((chapter, i) => {
        const opacity = i === index ? 1 - blend : i === index + 1 ? blend : 0
        chapter.style.opacity = String(opacity)
        chapter.style.transform = `translateY(${i === index ? -distance * blend : distance * (1 - blend)}px)`
        chapter.setAttribute('aria-hidden', String(opacity < 0.5))
      })
      // Switch only while the black overlay is fully opaque; never blend photos.
      const visibleImage = blend < 0.5 ? index : Math.min(index + 1, chapters.length - 1)
      setActiveChapter(current => current === visibleImage ? current : visibleImage)
      imageRefs.current.forEach((image, i) => {
        image.style.opacity = i === visibleImage ? '1' : '0'
        image.style.visibility = i === visibleImage ? 'visible' : 'hidden'
      })
      const darkness = Math.min(1, Math.min(blend, 1 - blend) / 0.45)
      const easedDarkness = darkness * darkness * (3 - 2 * darkness)
      galleryRef.current.style.setProperty('--image-overlay-opacity', String(easedDarkness))
      mapLayer.current.style.opacity = Math.max(0, Math.min(1, index - 1 + blend))
      const captionStart = (chapters.length - 1) * step + 160
      const captionOpacity = ease((travel - captionStart) / 200)
      stage.current.style.setProperty('--about-caption-opacity', String(captionOpacity))
      stage.current.style.setProperty('--about-content-opacity', String(1 - captionOpacity))
      textColumn.current.inert = captionOpacity > 0.5
      textColumn.current.setAttribute('aria-hidden', String(captionOpacity > 0.5))
      // Fade the complete stage as Learning Tango enters from below.
      stage.current.style.opacity = String(1 - Math.max(0, Math.min(1, (window.innerHeight - rect.bottom) / 160)))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    motion.addEventListener('change', schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      motion.removeEventListener('change', schedule)
    }
  }, [])

  if (!chapters.length) return null

  const scrollDistance = Math.max(0, (chapters.length - 1) * 320 + 440)

  function goToChapter(index) {
    setActiveChapter(index)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      chapterRefs.current[index]?.scrollIntoView({ behavior: 'auto', block: 'center' })
      return
    }

    const sectionTop = window.scrollY + root.current.getBoundingClientRect().top
    window.scrollTo({ top: sectionTop + index * 320, behavior: 'smooth' })
  }

  return (
    <section ref={root} className="about" id="about" aria-labelledby="about-title" tabIndex={-1} style={{ '--about-scroll-distance': `${scrollDistance}px` }}>
        <div ref={stage} className="about-stage">
          <div className="about-background about-background--texture"><img src={texture} alt="" /></div>
          <div ref={mapLayer} className="about-background about-background--map"><img src={map} alt="" /></div>
        <div ref={galleryRef} className="about-gallery" aria-hidden="true">
          {chapters.map((chapter, index) => (
            <div key={chapter.id} ref={element => { imageRefs.current[index] = element }} className="about-photo">
              <IntroductionMedia url={chapter.mediaUrl} />
            </div>
          ))}
        </div>
        <div ref={textColumn} className="about-text-column">
          <div className="about-heading-row">
            <h2 className="about-title" id="about-title">About Us</h2>
            <div className="about-chapter-dots" role="group" aria-label="About Us chapters">
              {chapters.map((chapter, index) => <Button
                key={chapter.id}
                variant="unstyled"
                className="about-chapter-dot"
                type="button"
                aria-label={`Show chapter ${index + 1} of ${chapters.length}`}
                aria-current={activeChapter === index ? 'step' : undefined}
                data-complete={index < activeChapter}
                onClick={() => goToChapter(index)}
              />)}
            </div>
          </div>
          <div className="about-story">
            {chapters.map((chapter, index) => (
              <article key={chapter.id} className="about-chapter" ref={element => { chapterRefs.current[index] = element }}>
                <div className="about-copy">
                  <p>{chapter.description}</p>
                </div>
                <IntroductionMedia url={chapter.mediaUrl} inline />
              </article>
            ))}
          </div>
        </div>
        <div className="about-caption-band">
          <blockquote className="about-caption">
            <span className="about-caption-mark" aria-hidden="true">“</span>
            <p>{ABOUT_CAPTION}</p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
