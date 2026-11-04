import { useEffect, useRef, useState } from 'react'
import { aboutChapters as chapters } from '../../data/about.js'
import captionImage from '../../assets/caption_img.png'
import IntroductionMedia from '../media/IntroductionMedia.jsx'
import Button from '../ui/Button.jsx'
import './about.css'

const ABOUT_CAPTION = 'Tango is more than performance. It is a way to connect and communicate.'

export default function AboutSection() {
  const root = useRef(null)
  const stage = useRef(null)
  const chapterRefs = useRef([])
  const imageRefs = useRef([])
  const [activeChapter, setActiveChapter] = useState(0)

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
      const stageRect = stage.current.getBoundingClientRect()
      const travel = Math.max(0, -rect.top)
      const step = 320
      const exitProgress = Math.min(1, Math.max(0, -stageRect.top / (window.innerHeight * 0.5)))
      stage.current.style.opacity = String(1 - exitProgress)
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
      // Switch at the midpoint while keeping one image fully visible at all times.
      const visibleImage = blend < 0.5 ? index : Math.min(index + 1, chapters.length - 1)
      setActiveChapter(current => current === visibleImage ? current : visibleImage)
      imageRefs.current.forEach((image, i) => {
        image.style.opacity = i === visibleImage ? '1' : '0'
        image.style.visibility = i === visibleImage ? 'visible' : 'hidden'
      })
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
    <div className="about-sequence">
      <img className="about-caption-image" src={captionImage} alt="" aria-hidden="true" />
      <section ref={root} className="about" id="about" aria-labelledby="about-title" tabIndex={-1} style={{ '--about-scroll-distance': `${scrollDistance}px` }}>
        <div ref={stage} className="about-stage">
          <div className="about-background about-background--texture" />
          <div className="about-gallery" aria-hidden="true">
            {chapters.map((chapter, index) => (
              <div key={chapter.id} ref={element => { imageRefs.current[index] = element }} className="about-photo">
                <IntroductionMedia url={chapter.mediaUrl} />
              </div>
            ))}
          </div>
          <div className="about-text-column">
            <div className="about-heading-row">
              <h2 className="about-title" id="about-title">About Us</h2>
            </div>
            <div className="about-story-layout">
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
          </div>
        </div>
      </section>
      <section className="about-caption-band" aria-label="Our approach to tango">
        <blockquote className="about-caption">
          <span className="about-caption-mark" aria-hidden="true">“</span>
          <p>{ABOUT_CAPTION}</p>
        </blockquote>
      </section>
    </div>
  )
}
