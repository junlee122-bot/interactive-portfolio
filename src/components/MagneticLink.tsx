import { useRef, type MouseEvent, type ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface MagneticLinkProps {
  href: string
  className?: string
  children: ReactNode
  target?: '_blank'
  cursorLabel?: string
}

export function MagneticLink({ href, className = '', children, target, cursorLabel }: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const boundsRef = useRef<DOMRect | null>(null)
  const reducedMotion = useReducedMotion()

  const motionDisabled = (element: HTMLElement) => reducedMotion || Boolean(element.closest('[data-motion-paused="true"]'))

  const cacheBounds = (event: MouseEvent<HTMLAnchorElement>) => {
    if (motionDisabled(event.currentTarget)) return
    boundsRef.current = event.currentTarget.getBoundingClientRect()
  }

  const handlePointerMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (motionDisabled(event.currentTarget) || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const bounds = boundsRef.current ?? event.currentTarget.getBoundingClientRect()
    const x = event.clientX - bounds.left - bounds.width / 2
    const y = event.clientY - bounds.top - bounds.height / 2
    event.currentTarget.style.setProperty('--magnetic-x', `${x * 0.12}px`)
    event.currentTarget.style.setProperty('--magnetic-y', `${y * 0.12}px`)
  }

  const resetPosition = () => {
    linkRef.current?.style.removeProperty('--magnetic-x')
    linkRef.current?.style.removeProperty('--magnetic-y')
    boundsRef.current = null
  }

  return (
    <a
      ref={linkRef}
      href={href}
      className={`magnetic ${className}`}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      data-cursor={cursorLabel}
      onMouseEnter={cacheBounds}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPosition}
    >
      {children}
    </a>
  )
}
