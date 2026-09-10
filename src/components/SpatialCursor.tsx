import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SpatialCursorProps {
  paused?: boolean
}

export function SpatialCursor({ paused = false }: SpatialCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateCapability = () => setEnabled(finePointer.matches && !reducedMotion && !paused)
    updateCapability()
    finePointer.addEventListener('change', updateCapability)
    return () => finePointer.removeEventListener('change', updateCapability)
  }, [paused, reducedMotion])

  useEffect(() => {
    if (!enabled) return

    let pointerX = -100
    let pointerY = -100
    let ringX = -100
    let ringY = -100
    let frame = 0
    let running = false
    let previousTime = 0
    let hasPosition = false

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      pointerX = event.clientX
      pointerY = event.clientY
      if (!hasPosition) {
        ringX = pointerX
        ringY = pointerY
        hasPosition = true
      }
      dotRef.current?.classList.add('is-visible')
      ringRef.current?.classList.add('is-visible')
      if (!running) {
        running = true
        previousTime = 0
        frame = requestAnimationFrame(tick)
      }
    }

    const updateContext = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const interactive = target.closest<HTMLElement>('[data-cursor], a, button')
      const label = interactive?.dataset.cursor ?? ''

      ringRef.current?.classList.toggle('is-active', Boolean(interactive))
      ringRef.current?.classList.toggle('has-label', Boolean(label))
      if (labelRef.current) labelRef.current.textContent = label
    }

    const tick = (now: number) => {
      const elapsed = previousTime ? Math.min(now - previousTime, 50) : 16.67
      previousTime = now
      const smoothing = 1 - Math.pow(0.84, elapsed / 16.67)
      ringX += (pointerX - ringX) * smoothing
      ringY += (pointerY - ringY) * smoothing
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      if (Math.abs(pointerX - ringX) + Math.abs(pointerY - ringY) > 0.1) {
        frame = requestAnimationFrame(tick)
      } else {
        running = false
        frame = 0
      }
    }

    const hideCursor = (event: PointerEvent) => {
      if (event.relatedTarget) return
      dotRef.current?.classList.remove('is-visible')
      ringRef.current?.classList.remove('is-visible')
      cancelAnimationFrame(frame)
      running = false
      hasPosition = false
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') return
      cancelAnimationFrame(frame)
      running = false
      hasPosition = false
      dotRef.current?.classList.remove('is-visible')
      ringRef.current?.classList.remove('is-visible')
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('pointerout', hideCursor)
    document.addEventListener('pointerover', updateContext)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('pointerout', hideCursor)
      document.removeEventListener('pointerover', updateContext)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="spatial-cursor" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring"><span ref={labelRef} /></div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
