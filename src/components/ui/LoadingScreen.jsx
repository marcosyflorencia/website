import { useEffect, useState } from 'react'
import wordmark from '../../assets/wordmark.svg'
import './loading-screen.css'

const MINIMUM_DISPLAY_TIME = 450

export default function LoadingScreen({ ready }) {
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [visible, setVisible] = useState(true)

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
        <div className="loading-screen__progress" aria-hidden="true"><span /></div>
        <span className="loading-screen__label">Loading</span>
      </div>
    </div>
  )
}
