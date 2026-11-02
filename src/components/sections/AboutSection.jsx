import { useEffect, useRef } from 'react'
import { aboutChapters as chapters } from '../../data/about.js'
import IntroductionMedia from '../media/IntroductionMedia.jsx'
import texture from '../../assets/about-texture.png'
import map from '../../assets/about-map.png'
import './about.css'

export default function AboutSection() {
  const root = useRef(null)
  const chapterRefs = useRef([])
  const imageRefs = useRef([])
  const galleryRef = useRef(null)
  const mapLayer = useRef(null)
  const stage = useRef(null)

  useEffect(() => {
    if (!chapters.length) return undefined
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      if (motion.matches) {
        stage.current.style.opacity = ''
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
      imageRefs.current.forEach((image, i) => {
        image.style.opacity = i === visibleImage ? '1' : '0'
        image.style.visibility = i === visibleImage ? 'visible' : 'hidden'
      })
      const darkness = Math.min(1, Math.min(blend, 1 - blend) / 0.45)
      const easedDarkness = darkness * darkness * (3 - 2 * darkness)
      galleryRef.current.style.setProperty('--image-overlay-opacity', String(easedDarkness))
      mapLayer.current.style.opacity = Math.max(0, Math.min(1, index - 1 + blend))
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

  const scrollDistance = Math.max(0, (chapters.length - 1) * 320 + 60)

  return (
    <section ref={root} className="about" id="about" aria-label="About us" tabIndex={-1} style={{ '--about-scroll-distance': `${scrollDistance}px` }}>
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
    </section>
  )
}
