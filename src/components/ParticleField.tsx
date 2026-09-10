import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

interface ParticleFieldProps {
  paused?: boolean
}

export function ParticleField({ paused = false }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const [lowMotionDevice, setLowMotionDevice] = useState(() =>
    window.matchMedia('(pointer: coarse), (max-width: 760px)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse), (max-width: 760px)')
    const updateCapability = () => setLowMotionDevice(media.matches)
    media.addEventListener('change', updateCapability)
    updateCapability()
    return () => media.removeEventListener('change', updateCapability)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reducedMotion || lowMotionDevice || paused) return

    const context = canvas.getContext('2d')
    if (!context) return

    let width = window.innerWidth
    let height = window.innerHeight
    let frame = 0
    let running = document.visibilityState === 'visible'
    let previousTime = 0
    const pointer = { x: -1000, y: -1000 }
    const count = 48
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      size: Math.random() * 1.1 + 0.3,
    }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const updatePointer = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const draw = (now: number) => {
      if (!running) return
      const delta = previousTime ? Math.min(now - previousTime, 50) / 16.67 : 1
      previousTime = now
      context.clearRect(0, 0, width, height)

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]
        particle.x += particle.vx * delta
        particle.y += particle.vy * delta

        if (particle.x < -16) particle.x = width + 16
        if (particle.x > width + 16) particle.x = -16
        if (particle.y < -16) particle.y = height + 16
        if (particle.y > height + 16) particle.y = -16

        const deltaX = pointer.x - particle.x
        const deltaY = pointer.y - particle.y
        const pointerDistance = Math.hypot(deltaX, deltaY)
        if (pointerDistance > 0 && pointerDistance < 140) {
          particle.x -= (deltaX / pointerDistance) * 0.1 * delta
          particle.y -= (deltaY / pointerDistance) * 0.1 * delta
        }

        context.beginPath()
        context.fillStyle = index % 13 === 0 ? 'rgba(210,255,91,.74)' : 'rgba(230,235,255,.26)'
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()

        for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
          const other = particles[otherIndex]
          const distanceSquared = (particle.x - other.x) ** 2 + (particle.y - other.y) ** 2
          if (distanceSquared < 92 * 92) {
            const distance = Math.sqrt(distanceSquared)
            context.beginPath()
            context.strokeStyle = `rgba(132,145,190,${0.045 * (1 - distance / 92)})`
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.stroke()
          }
        }
      }

      frame = requestAnimationFrame(draw)
    }

    const handleVisibility = () => {
      cancelAnimationFrame(frame)
      running = document.visibilityState === 'visible'
      previousTime = 0
      if (running) frame = requestAnimationFrame(draw)
    }

    const clearPointer = (event: PointerEvent) => {
      if (!event.relatedTarget) { pointer.x = -1000; pointer.y = -1000 }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('pointerout', clearPointer)
    document.addEventListener('visibilitychange', handleVisibility)
    if (running) frame = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('pointerout', clearPointer)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [reducedMotion, lowMotionDevice, paused])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
