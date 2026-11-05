import { useEffect, useState } from 'react'
import './hero-label.css'

const labels = [
  'ARGENTINE TANGO ARTISTS',
  'NYC-BASED TEACHERS',
  'AWARD-WINNING PERFORMERS',
]

const revealRhythm = [
  { characters: 2, delay: 90 },
  { characters: 2, delay: 90 },
  { characters: 4, delay: 230 },
]

const phraseHold = 1800
const crossfadeDuration = 450

export default function HeroLabel() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [sequence, setSequence] = useState({
    labelIndex: 0,
    previousLabelIndex: null,
    characterCount: 0,
    rhythmIndex: 0,
    phase: 'revealing',
  })

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(motion.matches)
    updateMotion()
    motion.addEventListener('change', updateMotion)
    return () => motion.removeEventListener('change', updateMotion)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setSequence((current) => (
        current.labelIndex === 0 && current.characterCount === labels[0].length && current.phase === 'holding'
          ? current
          : {
            labelIndex: 0,
            previousLabelIndex: null,
            characterCount: labels[0].length,
            rhythmIndex: 0,
            phase: 'holding',
          }
      ))
      return undefined
    }

    const label = labels[sequence.labelIndex]
    const rhythmStep = revealRhythm[sequence.rhythmIndex % revealRhythm.length]
    const delay = sequence.phase === 'crossfading'
      ? crossfadeDuration
      : sequence.characterCount >= label.length
        ? phraseHold
        : rhythmStep.delay

    const timer = window.setTimeout(() => {
      setSequence((current) => {
        const currentLabel = labels[current.labelIndex]
        if (current.phase === 'crossfading') {
          return { ...current, previousLabelIndex: null, phase: 'revealing' }
        }
        if (current.characterCount < currentLabel.length) {
          const step = revealRhythm[current.rhythmIndex % revealRhythm.length]
          return {
            ...current,
            characterCount: Math.min(currentLabel.length, current.characterCount + step.characters),
            rhythmIndex: current.rhythmIndex + 1,
          }
        }

        const nextLabelIndex = (current.labelIndex + 1) % labels.length
        return {
          labelIndex: nextLabelIndex,
          previousLabelIndex: current.labelIndex,
          characterCount: Math.min(labels[nextLabelIndex].length, revealRhythm[0].characters),
          rhythmIndex: 1,
          phase: 'crossfading',
        }
      })
    }, delay)

    return () => window.clearTimeout(timer)
  }, [reducedMotion, sequence])

  const visibleLabel = labels[sequence.labelIndex].slice(0, sequence.characterCount)
  const isCrossfading = sequence.phase === 'crossfading'

  return (
    <div className="eyebrow hero-label">
      <span className="hero-label-accessible">{labels.join('. ')}.</span>
      <div className="hero-label-window" aria-hidden="true">
        {sequence.previousLabelIndex !== null && (
          <span className="hero-label-phrase hero-label-phrase--leaving">
            {labels[sequence.previousLabelIndex]}
          </span>
        )}
        <span className={`hero-label-phrase${isCrossfading ? ' hero-label-phrase--entering' : ''}`}>
          {visibleLabel}
        </span>
      </div>
    </div>
  )
}
