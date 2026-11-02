import { useEffect, useState } from 'react'
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
  const hasMultipleImages = images.length > 1

  useEffect(() => {
    setActiveIndex(currentIndex => Math.min(currentIndex, images.length - 1))
  }, [images.length])

  useEffect(() => {
    if (!hasMultipleImages || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const timeout = window.setTimeout(() => {
      setActiveIndex(currentIndex => (currentIndex + 1) % images.length)
    }, 2000)

    return () => window.clearTimeout(timeout)
  }, [activeIndex, hasMultipleImages, images.length])

  const showPrevious = () => {
    setActiveIndex(currentIndex => (currentIndex - 1 + images.length) % images.length)
  }

  const showNext = () => {
    setActiveIndex(currentIndex => (currentIndex + 1) % images.length)
  }

  return (
    <div className="offering-carousel">
      <img src={images[activeIndex]} alt="" loading="lazy" />
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
