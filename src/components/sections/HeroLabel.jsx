import { useEffect, useRef } from 'react'
import './hero-label.css'

const labels = [
  'ARGENTINE TANGO ARTISTS',
  'NYC-BASED TEACHERS',
  'AWARD-WINNING PERFORMERS',
]

const characterCadence = [82, 96, 74, 88, 108, 78]
const phraseHold = 2200
const fadeDuration = 560

function getCharacterDelay(label, index) {
  const character = label[index]
  if (character === ' ') return 180
  if (character === '-') return 130

  const remainingCharacters = label.length - index - 1
  const closingPause = remainingCharacters < 4 ? (4 - remainingCharacters) * 16 : 0
  return characterCadence[index % characterCadence.length] + closingPause
}

export default function HeroLabel() {
  const phraseRef = useRef(null)

  useEffect(() => {
    const phrase = phraseRef.current
    if (!phrase) return undefined

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const timers = new Set()
    let runId = 0

    const wait = (delay) => new Promise((resolve) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer)
        resolve()
      }, delay)
      timers.add(timer)
    })

    const typeLabels = async (currentRun) => {
      let labelIndex = 0
      phrase.textContent = ''
      phrase.dataset.phase = 'visible'

      while (currentRun === runId) {
        const label = labels[labelIndex]
        for (let characterIndex = 0; characterIndex < label.length; characterIndex += 1) {
          await wait(getCharacterDelay(label, characterIndex))
          if (currentRun !== runId || motion.matches) return

          const character = document.createElement('span')
          character.className = 'hero-label-character'
          character.textContent = label[characterIndex]
          phrase.append(character)
        }

        await wait(phraseHold)
        if (currentRun !== runId || motion.matches) return
        phrase.dataset.phase = 'leaving'

        await wait(fadeDuration)
        if (currentRun !== runId || motion.matches) return
        labelIndex = (labelIndex + 1) % labels.length
        phrase.textContent = ''
        phrase.dataset.phase = 'visible'
      }
    }

    const start = () => {
      runId += 1
      if (motion.matches) {
        phrase.textContent = labels[0]
        phrase.dataset.phase = 'visible'
        return
      }
      typeLabels(runId)
    }

    motion.addEventListener('change', start)
    start()

    return () => {
      runId += 1
      motion.removeEventListener('change', start)
      timers.forEach((timer) => window.clearTimeout(timer))
      timers.clear()
    }
  }, [])

  return (
    <div className="eyebrow hero-label">
      <span className="hero-label-accessible">{labels.join('. ')}.</span>
      <div className="hero-label-window" aria-hidden="true">
        <span className="hero-label-phrase" ref={phraseRef} />
      </div>
    </div>
  )
}
