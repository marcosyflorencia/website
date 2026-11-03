import { useCallback, useEffect, useState } from 'react'
import HomePage from '../pages/HomePage.jsx'
import LoadingScreen from '../components/ui/LoadingScreen.jsx'

const LOADING_TIMEOUT = 8000

export default function App() {
  const [heroReady, setHeroReady] = useState(false)
  const [fontsReady, setFontsReady] = useState(!document.fonts)
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    let active = true
    document.fonts?.ready.then(() => { if (active) setFontsReady(true) })
    const timer = window.setTimeout(() => setTimedOut(true), LOADING_TIMEOUT)
    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [])

  const handleHeroReady = useCallback(() => setHeroReady(true), [])
  const ready = (heroReady && fontsReady) || timedOut

  return (
    <>
      <div aria-busy={!ready}><HomePage onHeroReady={handleHeroReady} /></div>
      <LoadingScreen ready={ready} />
    </>
  )
}
