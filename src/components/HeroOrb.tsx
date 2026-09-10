import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { Sound } from './Icons'
import { useReducedMotion } from '../hooks/useReducedMotion'

const modes = [
  {
    name: 'IDEA', key: 'idea', detail: 'FRAME THE SIGNAL', description: '흩어진 가능성에서 중요한 신호를 발견합니다.',
    phase: '01 / DISCOVER', structure: 'OPEN FIELD', response: 'EXPLORE', satellites: ['WHY', 'UX', '?'],
    variables: { '--orb-accent': 'var(--acid)', '--orb-core-scale': 0.9, '--orb-ring-a-width': '80%', '--orb-ring-a-height': '80%', '--orb-ring-b-width': '108%', '--orb-ring-b-height': '48%', '--orb-ring-c-width': '56%', '--orb-ring-c-height': '114%', '--orb-ring-a-duration': '24s', '--orb-ring-b-duration': '29s', '--orb-ring-c-duration': '34s', '--orb-grid-rotation': '-18deg', '--orb-grid-opacity': 0.2, '--orb-satellite-spread': 1.12 },
  },
  {
    name: 'SYSTEM', key: 'system', detail: 'CONNECT THE STATES', description: '발견한 신호를 일관된 구조와 연결로 정리합니다.',
    phase: '02 / ORGANIZE', structure: 'LINKED STATES', response: 'ALIGN', satellites: ['IN', 'TS', 'OUT'],
    variables: { '--orb-accent': 'var(--violet)', '--orb-core-scale': 1, '--orb-ring-a-width': '76%', '--orb-ring-a-height': '76%', '--orb-ring-b-width': '76%', '--orb-ring-b-height': '76%', '--orb-ring-c-width': '76%', '--orb-ring-c-height': '76%', '--orb-ring-a-duration': '32s', '--orb-ring-b-duration': '32s', '--orb-ring-c-duration': '32s', '--orb-grid-rotation': '0deg', '--orb-grid-opacity': 0.5, '--orb-satellite-spread': 1 },
  },
  {
    name: 'MOTION', key: 'motion', detail: 'MAKE IT FELT', description: '상태의 변화를 움직임으로 전달해 이해를 돕습니다.',
    phase: '03 / EXPRESS', structure: 'FLOW FIELD', response: 'TRANSMIT', satellites: ['IN', '→', 'OUT'],
    variables: { '--orb-accent': 'var(--coral)', '--orb-core-scale': 1.06, '--orb-ring-a-width': '64%', '--orb-ring-a-height': '64%', '--orb-ring-b-width': '100%', '--orb-ring-b-height': '30%', '--orb-ring-c-width': '36%', '--orb-ring-c-height': '100%', '--orb-ring-a-duration': '11s', '--orb-ring-b-duration': '14s', '--orb-ring-c-duration': '17s', '--orb-grid-rotation': '32deg', '--orb-grid-opacity': 0.35, '--orb-satellite-spread': 0.88 },
  },
]

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

interface HeroOrbProps {
  paused?: boolean
}

export function HeroOrb({ paused = false }: HeroOrbProps) {
  const orbRef = useRef<HTMLButtonElement>(null)
  const boundsRef = useRef<DOMRect | null>(null)
  const dragRef = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null)
  const frameRef = useRef(0)
  const suppressClickRef = useRef(false)
  const instructionId = useId()
  const [modeIndex, setModeIndex] = useState(0)
  const [dragging, setDragging] = useState(false)
  const reducedMotion = useReducedMotion()
  const motionDisabled = reducedMotion || paused
  const mode = modes[modeIndex]

  const resetTilt = () => {
    cancelAnimationFrame(frameRef.current)
    frameRef.current = 0
    const orb = orbRef.current
    for (const property of ['--orb-tilt-x', '--orb-tilt-y', '--orb-pointer-x', '--orb-pointer-y']) orb?.style.removeProperty(property)
    boundsRef.current = null
  }

  useEffect(() => {
    if (!motionDisabled) return
    const drag = dragRef.current
    dragRef.current = null
    if (drag && orbRef.current?.hasPointerCapture(drag.id)) orbRef.current.releasePointerCapture(drag.id)
    setDragging(false)
    resetTilt()
  }, [motionDisabled])

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  const updateTilt = (event: PointerEvent<HTMLButtonElement>) => {
    if (motionDisabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const drag = dragRef.current
    if (drag && drag.id !== event.pointerId) return
    if (!drag && event.pointerType !== 'mouse') return
    const bounds = boundsRef.current ?? event.currentTarget.getBoundingClientRect()
    const x = clamp((event.clientX - bounds.left) / bounds.width - 0.5, -0.5, 0.5)
    const y = clamp((event.clientY - bounds.top) / bounds.height - 0.5, -0.5, 0.5)
    if (drag && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 6) drag.moved = true
    const rotateX = drag ? clamp((event.clientY - drag.y) * -0.12, -18, 18) : y * -12
    const rotateY = drag ? clamp((event.clientX - drag.x) * 0.18, -28, 28) : x * 15
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      const orb = orbRef.current
      orb?.style.setProperty('--orb-tilt-x', `${rotateX}deg`)
      orb?.style.setProperty('--orb-tilt-y', `${rotateY}deg`)
      orb?.style.setProperty('--orb-pointer-x', `${(x + 0.5) * 100}%`)
      orb?.style.setProperty('--orb-pointer-y', `${(y + 0.5) * 100}%`)
      frameRef.current = 0
    })
  }

  const startDrag = (event: PointerEvent<HTMLButtonElement>) => {
    suppressClickRef.current = false
    if (!event.isPrimary || event.button !== 0 || motionDisabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    boundsRef.current = event.currentTarget.getBoundingClientRect()
    dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  const finishDrag = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    suppressClickRef.current = drag.moved
    dragRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    setDragging(false)
    resetTilt()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0
    if (!direction && event.key !== 'Home' && event.key !== 'End') return
    event.preventDefault()
    if (event.key === 'Home') setModeIndex(0)
    else if (event.key === 'End') setModeIndex(modes.length - 1)
    else setModeIndex((current) => (current + direction + modes.length) % modes.length)
  }

  const advanceMode = () => setModeIndex((current) => (current + 1) % modes.length)

  return (
    <div className="hero-orbit-stage" data-orb-mode={mode.key} data-dragging={dragging} data-reduced-motion={reducedMotion} data-motion-paused={paused} style={mode.variables as CSSProperties}>
      <div className="orbit-telemetry orbit-telemetry-top"><span>LIVE OBJECT / {mode.phase}</span><i /></div>
      <button
        ref={orbRef}
        type="button"
        className="hero-orb"
        data-mode={modeIndex}
        data-dragging={dragging}
        data-cursor={motionDisabled ? 'SHIFT' : dragging ? 'ROTATE' : 'DRAG'}
        aria-label={`인터랙티브 오브. 현재 ${mode.name} 모드. 클릭하면 다음 모드`}
        aria-describedby={instructionId}
        style={{ touchAction: 'pan-y', userSelect: 'none' }}
        onPointerEnter={(event) => { boundsRef.current = event.currentTarget.getBoundingClientRect() }}
        onPointerDown={startDrag}
        onPointerMove={updateTilt}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={finishDrag}
        onPointerLeave={() => { if (!dragRef.current) resetTilt() }}
        onKeyDown={handleKeyDown}
        onClick={(event) => {
          if (suppressClickRef.current && event.detail !== 0) {
            suppressClickRef.current = false
            return
          }
          advanceMode()
        }}
      >
        <span className="orb-axis axis-x" aria-hidden="true" />
        <span className="orb-axis axis-y" aria-hidden="true" />
        <span className="orb-ring ring-a" aria-hidden="true"><i>01</i></span>
        <span className="orb-ring ring-b" aria-hidden="true"><i>02</i></span>
        <span className="orb-ring ring-c" aria-hidden="true"><i>03</i></span>
        <span className="orb-satellite satellite-a" aria-hidden="true">{mode.satellites[0]}</span>
        <span className="orb-satellite satellite-b" aria-hidden="true">{mode.satellites[1]}</span>
        <span className="orb-satellite satellite-c" aria-hidden="true">{mode.satellites[2]}</span>
        <span key={mode.key} className="orb-pulse" aria-hidden="true" />
        <span className="orb-core" aria-hidden="true">
          <span className="orb-surface" />
          <span className="orb-grid" />
          <span className="orb-glare" />
          <span className="orb-monogram">J</span>
        </span>
        <span className="orb-mode" aria-hidden="true">
          <Sound size={15} />
          <span><b>{mode.name}</b><small>{mode.detail}</small></span>
        </span>
      </button>
      <div className="orb-mode-switcher" role="group" aria-label="오브 설계 단계 선택">
        {modes.map((item, index) => (
          <button key={item.key} type="button" aria-pressed={modeIndex === index} onClick={() => setModeIndex(index)} data-cursor="SHIFT">
            <span>0{index + 1}</span>{item.name}
          </button>
        ))}
      </div>
      <div className="orb-state-readout" aria-hidden="true">
        <span><small>PHASE</small><b>{mode.phase}</b></span>
        <span><small>STRUCTURE</small><b>{mode.structure}</b></span>
        <span><small>RESPONSE</small><b>{mode.response}</b></span>
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{mode.name}. {mode.description}</p>
      <p id={instructionId} className="sr-only">{motionDisabled ? '회전 효과가 꺼져 있습니다. ' : '드래그하면 오브를 회전합니다. ' }클릭 또는 Enter로 다음 모드, 방향키로 이전·다음 모드를 선택합니다. Home은 첫 모드, End는 마지막 모드를 선택합니다.</p>
      <div className="orbit-telemetry orbit-telemetry-bottom">
        <span>37.5665° N</span><b className="orb-instruction">{reducedMotion ? 'REDUCED MOTION / CLICK TO SHIFT' : paused ? 'MOTION PAUSED / CLICK TO SHIFT' : 'DRAG TO ROTATE / CLICK TO SHIFT'}</b><span>126.9780° E</span>
      </div>
    </div>
  )
}
