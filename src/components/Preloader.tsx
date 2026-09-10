import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const reducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      setProgress(100)
      setComplete(true)
      const timer = window.setTimeout(onComplete, 80)
      return () => window.clearTimeout(timer)
    }

    const startedAt = performance.now()
    const duration = 1050
    let frame = 0
    let completionTimer = 0

    const update = (now: number) => {
      const elapsed = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      setProgress(Math.round(eased * 100))

      if (elapsed < 1) {
        frame = requestAnimationFrame(update)
        return
      }

      setComplete(true)
      completionTimer = window.setTimeout(onComplete, 520)
    }

    frame = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(completionTimer)
    }
  }, [onComplete, reducedMotion])

  return (
    <div className={`preloader ${complete ? 'is-complete' : ''}`}>
      <span className="sr-only" role="status">{complete ? '포트폴리오 준비 완료' : '포트폴리오 인터랙션을 준비하는 중입니다.'}</span>
      <div className="preloader-orbit" aria-hidden="true">
        <span className="preloader-core">J</span>
        <i />
        <b />
      </div>
      <div className="preloader-data" aria-hidden="true">
        <span>SIGNAL ACQUISITION</span>
        <strong>{String(progress).padStart(3, '0')}%</strong>
      </div>
      <div className="preloader-track" aria-hidden="true"><i style={{ transform: `scaleX(${progress / 100})` }} /></div>
      <span className="preloader-coordinate" aria-hidden="true">37.5665° N / 126.9780° E</span>
    </div>
  )
}
