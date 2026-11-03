import { useEffect, useRef, useState } from 'react'
import Button from '../ui/Button.jsx'

function ArrowIcon({ direction }) {
  const points = direction === 'previous' ? '15 5 8 12 15 19' : '9 5 16 12 9 19'
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polyline points={points} />
    </svg>
  )
}

export default function OfferingCarousel({ images, offeringTitle }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStart = useRef(null)
  const hasMultipleImages = images.length > 1

  useEffect(() => {
    setActiveIndex(currentIndex => Math.min(currentIndex, images.length - 1))
  }, [images.length])

  useEffect(() => {
    if (!hasMultipleImages || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const timeout = window.setTimeout(() => {
      setActiveIndex(currentIndex => (currentIndex + 1) % images.length)
    }, 4000)

    return () => window.clearTimeout(timeout)
  }, [activeIndex, hasMultipleImages, images.length])

  const showPrevious = () => {
    setActiveIndex(currentIndex => (currentIndex - 1 + images.length) % images.length)
  }

  const showNext = () => {
    setActiveIndex(currentIndex => (currentIndex + 1) % images.length)
  }

  const handleTouchStart = event => {
    if (!hasMultipleImages) return
    const touch = event.changedTouches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = event => {
    const start = touchStart.current
    touchStart.current = null
    if (!start || !hasMultipleImages) return

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y
    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return

    if (deltaX > 0) showPrevious()
    else showNext()
  }

  return (
    <div className="offering-carousel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="offering-carousel-images">
        {images.map((image, index) => (
          <img
            key={`${image}-${index}`}
            className="offering-carousel-image"
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            data-active={index === activeIndex}
          />
        ))}
      </div>
      {hasMultipleImages && (
        <>
          <Button
            variant="unstyled"
            className="offering-carousel-control offering-carousel-control--previous"
            onClick={showPrevious}
            aria-label={`Show previous image for ${offeringTitle}`}
          >
            <ArrowIcon direction="previous" />
          </Button>
          <Button
            variant="unstyled"
            className="offering-carousel-control offering-carousel-control--next"
            onClick={showNext}
            aria-label={`Show next image for ${offeringTitle}`}
          >
            <ArrowIcon direction="next" />
          </Button>
          <span className="offering-carousel-status">
            Image {activeIndex + 1} of {images.length}
          </span>
        </>
      )}
    </div>
  )
}
