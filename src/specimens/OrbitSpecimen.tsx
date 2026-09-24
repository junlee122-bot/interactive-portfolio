import { Text } from '@seed-design/react'
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { SegmentedControl, SegmentedControlItem } from 'seed-design/ui/segmented-control'

const chapters = {
  form: { label: '형태', angle: -28, tilt: -12, copy: '둥근 모서리와 낮은 무게중심. 손에 쥐었을 때 미끄러지지 않는 비율.' },
  material: { label: '소재', angle: 34, tilt: -6, copy: '재생 알루미늄 바디와 무광 세라믹 코팅. 지문이 남지 않는 표면.' },
  detail: { label: '디테일', angle: 8, tilt: 18, copy: '0.4mm 간격의 스피커 그릴. 빛을 받을 때만 드러나는 패턴.' },
} as const

type Chapter = keyof typeof chapters

const LIMIT = 50
const clamp = (value: number) => Math.max(-LIMIT, Math.min(LIMIT, value))

export function OrbitSpecimen() {
  const [chapter, setChapter] = useState<Chapter>('form')
  const [angle, setAngle] = useState<number>(chapters.form.angle)
  const dragRef = useRef<{ x: number; start: number } | null>(null)
  const current = chapters[chapter]

  const selectChapter = (next: Chapter) => {
    setChapter(next)
    setAngle(chapters[next].angle)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = { x: event.clientX, start: angle }
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    setAngle(clamp(dragRef.current.start + (event.clientX - dragRef.current.x) * 0.5))
  }

  const onPointerUp = () => {
    dragRef.current = null
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') setAngle((value) => clamp(value - 8))
    else if (event.key === 'ArrowRight') setAngle((value) => clamp(value + 8))
    else if (event.key === 'Home') setAngle(current.angle)
    else return
    event.preventDefault()
  }

  return (
    <div className="specimen specimen--orbit">
      <SegmentedControl
        aria-label="제품 챕터"
        value={chapter}
        onValueChange={(value) => selectChapter(value as Chapter)}
        style={{ width: '100%' }}
      >
        {(Object.keys(chapters) as Chapter[]).map((key) => (
          <SegmentedControlItem key={key} value={key}>
            {chapters[key].label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>

      <div
        className="orbit-stage"
        role="slider"
        tabIndex={0}
        aria-label="오브젝트 회전"
        aria-valuemin={-LIMIT}
        aria-valuemax={LIMIT}
        aria-valuenow={Math.round(angle)}
        aria-valuetext={`${Math.round(angle)}도, ${current.label} 챕터`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        data-chapter={chapter}
      >
        <div className="orbit-object" style={{ transform: `rotateX(${current.tilt}deg) rotateY(${angle}deg)` }}>
          <span className="orbit-object__face orbit-object__face--front" />
          <span className="orbit-object__face orbit-object__face--side" />
          <span className="orbit-object__face orbit-object__face--top" />
          <span className="orbit-object__grill" />
        </div>
        <span className="orbit-stage__hint" aria-hidden="true">
          드래그 또는 ← → · Home으로 복귀
        </span>
      </div>

      <div className="specimen__result" aria-live="polite">
        <Text as="p" textStyle="t4Bold">
          {current.label} · {Math.round(angle)}°
        </Text>
        <Text as="p" textStyle="t3Regular" color="fg.neutralMuted">
          {current.copy}
        </Text>
      </div>
    </div>
  )
}
