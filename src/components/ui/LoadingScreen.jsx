import { useEffect, useState } from 'react'
import wordmark from '../../assets/wordmark.svg'
import './loading-screen.css'

const MINIMUM_DISPLAY_TIME = 450
const WAVE_DOTS = 9

export default function LoadingScreen({ ready }) {
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const bootScreen = document.getElementById('boot-loading-screen')
    document.documentElement.classList.remove('boot-loading')
    if (!bootScreen) return undefined

    bootScreen.dataset.exiting = 'true'
    const timer = window.setTimeout(() => bootScreen.remove(), 250)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => setMinimumTimeElapsed(true), MINIMUM_DISPLAY_TIME)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!ready || !minimumTimeElapsed) return undefined
    const frame = requestAnimationFrame(() => setExiting(true))
    const timer = window.setTimeout(() => setVisible(false), 500)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [ready, minimumTimeElapsed])

  useEffect(() => {
    if (!visible) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [visible])

  if (!visible) return null

  return (
    <div className="loading-screen" data-exiting={exiting} role="status" aria-live="polite" aria-label="Loading Marcos and Florencia">
      <div className="loading-screen__content">
        <img src={wordmark} alt="" width="599" height="221" />
        <div className="loading-screen__wave" aria-hidden="true">
          {Array.from({ length: WAVE_DOTS }, (_, index) => (
            <span key={index} style={{ '--wave-index': index }} />
          ))}
        </div>
      </div>
    </div>
  )
}
