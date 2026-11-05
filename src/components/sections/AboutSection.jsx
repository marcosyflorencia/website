import { useEffect, useRef, useState } from 'react'
import { aboutChapters as chapters } from '../../data/about.js'
import captionImage from '../../assets/caption_img.png'
import IntroductionMedia from '../media/IntroductionMedia.jsx'
import { getSectionParallaxOffset } from '../../utils/parallax.js'
import './about.css'

const ABOUT_CAPTION = 'Tango is more than performance. It is a way to connect and communicate.'
const TEXTURE_SHIFT_X = 6
const TEXTURE_SHIFT_Y = -12
const HEADING_FADE_GAP = 8
const HEADING_FADE_HEIGHT = 40
const COMPACT_LAYOUT_QUERY = '(max-width: 900px), (max-width: 1200px) and (orientation: portrait)'

const clamp = value => Math.min(1, Math.max(0, value))
const smoothstep = value => {
  const progress = clamp(value)
  return progress * progress * (3 - 2 * progress)
}

const getChapterProgress = (centers, focusPosition) => {
  if (!centers.length || focusPosition <= centers[0]) return 0
  if (focusPosition >= centers.at(-1)) return centers.length - 1

  const lowerIndex = centers.findIndex((center, index) => focusPosition >= center && focusPosition < centers[index + 1])
  const lowerCenter = centers[lowerIndex]
  const upperCenter = centers[lowerIndex + 1]
  return lowerIndex + clamp((focusPosition - lowerCenter) / Math.max(1, upperCenter - lowerCenter))
}

export default function AboutSection() {
  const [compactLayout, setCompactLayout] = useState(() => window.matchMedia(COMPACT_LAYOUT_QUERY).matches)
  const root = useRef(null)
  const heading = useRef(null)
  const title = useRef(null)
  const captionBand = useRef(null)
  const captionBackdrop = useRef(null)
  const copyTrack = useRef(null)
  const visualTrack = useRef(null)
  const pairedTrack = useRef(null)
  const copyRefs = useRef([])
  const visualRefs = useRef([])
  const pairedRefs = useRef([])

  useEffect(() => {
    const layout = window.matchMedia(COMPACT_LAYOUT_QUERY)
    const updateLayout = () => setCompactLayout(layout.matches)
    layout.addEventListener('change', updateLayout)
    return () => layout.removeEventListener('change', updateLayout)
  }, [])

  useEffect(() => {
    if (!chapters.length) return undefined

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      if (!root.current) return
      if (compactLayout ? !pairedTrack.current : !copyTrack.current || !visualTrack.current) return

      const rootRect = root.current.getBoundingClientRect()
      const sectionRange = Math.max(1, rootRect.height - window.innerHeight)
      const sectionProgress = clamp(-rootRect.top / sectionRange)

      root.current.style.setProperty('--about-texture-shift-x', `${TEXTURE_SHIFT_X * sectionProgress}px`)
      root.current.style.setProperty('--about-texture-shift-y', `${TEXTURE_SHIFT_Y * sectionProgress}px`)

      const captionOffset = motion.matches ? 0 : getSectionParallaxOffset(captionBand.current, window.innerHeight)
      captionBackdrop.current?.style.setProperty('--caption-parallax-y', `${captionOffset}px`)

      if (compactLayout) {
        const titleBottom = title.current?.getBoundingClientRect().bottom ?? heading.current?.getBoundingClientRect().bottom ?? 0
        const fadeBoundary = titleBottom + HEADING_FADE_GAP
        pairedRefs.current.forEach(item => {
          if (!item) return
          const itemRect = item.getBoundingClientRect()
          const renderedScale = item.offsetHeight ? itemRect.height / item.offsetHeight : 1
          const fadeTop = (fadeBoundary - itemRect.top) / Math.max(renderedScale, 0.01)
          item.style.setProperty('--about-fade-top', `${fadeTop}px`)
          item.style.setProperty('--about-fade-end', `${fadeTop + HEADING_FADE_HEIGHT}px`)
        })
      }

      if (motion.matches) {
        copyTrack.current?.style.removeProperty('--about-copy-shift')
        copyRefs.current.forEach(item => item?.style.setProperty('--about-focus', '1'))
        visualRefs.current.forEach(item => item?.style.setProperty('--about-focus', '1'))
        pairedRefs.current.forEach(item => item?.style.setProperty('--about-focus', '1'))
        return
      }

      const navHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 0
      const focusLine = compactLayout
        ? navHeight + (window.innerHeight - navHeight) * 0.5
        : window.innerHeight * 0.5
      const focusPosition = window.scrollY + focusLine

      if (compactLayout) {
        const pairedTrackTop = window.scrollY + pairedTrack.current.getBoundingClientRect().top
        const pairedCenters = pairedRefs.current.map(item => pairedTrackTop + item.offsetTop + item.offsetHeight * 0.5)
        const chapterProgress = getChapterProgress(pairedCenters, focusPosition)

        pairedRefs.current.forEach((item, index) => {
          const proximity = 1 - clamp(Math.abs(index - chapterProgress) / 1.15)
          item?.style.setProperty('--about-focus', String(smoothstep(proximity)))
        })
        return
      }

      const visualTrackTop = window.scrollY + visualTrack.current.getBoundingClientRect().top
      const visualCenters = visualRefs.current.map(item => visualTrackTop + item.offsetTop + item.offsetHeight * 0.5)
      const chapterProgress = getChapterProgress(visualCenters, focusPosition)

      const lowerIndex = Math.floor(chapterProgress)
      const upperIndex = Math.min(chapters.length - 1, Math.ceil(chapterProgress))
      const blend = chapterProgress - lowerIndex
      const lowerCopy = copyRefs.current[lowerIndex]
      const upperCopy = copyRefs.current[upperIndex]
      const lowerCopyCenter = lowerCopy.offsetTop + lowerCopy.offsetHeight * 0.5
      const upperCopyCenter = upperCopy.offsetTop + upperCopy.offsetHeight * 0.5
      const activeCopyCenter = lowerCopyCenter + (upperCopyCenter - lowerCopyCenter) * blend

      copyTrack.current.style.setProperty('--about-copy-shift', `${-activeCopyCenter}px`)

      chapters.forEach((_, index) => {
        const proximity = 1 - clamp(Math.abs(index - chapterProgress) / 1.15)
        const focus = String(smoothstep(proximity))
        copyRefs.current[index]?.style.setProperty('--about-focus', focus)
        visualRefs.current[index]?.style.setProperty('--about-focus', focus)
      })
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

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
  }, [compactLayout])

  if (!chapters.length) return null

  return (
    <div className="about-sequence">
      <img ref={captionBackdrop} className="about-caption-image" src={captionImage} alt="" aria-hidden="true" />
      <section ref={root} className="about" id="about" aria-labelledby="about-title" tabIndex={-1}>
        <div className="about-background about-background--texture" aria-hidden="true" />
        <div className="about-shell">
          <header ref={heading} className="about-heading-row">
            <h2 ref={title} className="about-title" id="about-title">About Us</h2>
          </header>
          {compactLayout ? (
            <div ref={pairedTrack} className="about-paired-track">
              {chapters.map((chapter, index) => (
                <article
                  key={chapter.id}
                  ref={element => { pairedRefs.current[index] = element }}
                  className="about-paired-item"
                  style={{ '--about-focus': 0 }}
                >
                  <div className="about-paired-visual" aria-hidden="true">
                    <IntroductionMedia url={chapter.mediaUrl} />
                  </div>
                  <div className="about-paired-copy">
                    <p>{chapter.description}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="about-tracks">
              <div className="about-copy-viewport">
                <div ref={copyTrack} className="about-copy-track">
                  {chapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      ref={element => { copyRefs.current[index] = element }}
                      className="about-copy-item"
                      style={{ '--about-focus': 0 }}
                    >
                      <p>{chapter.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div ref={visualTrack} className="about-visual-track" aria-hidden="true">
                {chapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    ref={element => { visualRefs.current[index] = element }}
                    className="about-visual-item"
                    style={{ '--about-focus': 0 }}
                  >
                    <IntroductionMedia url={chapter.mediaUrl} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <section ref={captionBand} className="about-caption-band" aria-label="Our approach to tango">
        <blockquote className="about-caption">
          <span className="about-caption-mark" aria-hidden="true">“</span>
          <p>{ABOUT_CAPTION}</p>
        </blockquote>
      </section>
    </div>
  )
}
