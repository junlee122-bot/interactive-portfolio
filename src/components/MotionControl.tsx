interface MotionControlProps {
  paused: boolean
  reducedMotion: boolean
  onToggle: () => void
}

export function MotionControl({ paused, reducedMotion, onToggle }: MotionControlProps) {
  const isStopped = paused || reducedMotion
  const status = reducedMotion ? 'SYSTEM REDUCED' : paused ? 'PAUSED' : 'RUNNING'

  return (
    <button
      type="button"
      className="motion-control"
      aria-pressed={isStopped}
      aria-label={reducedMotion ? '시스템 움직임 줄이기 설정이 적용되어 있습니다' : `배경 모션 ${paused ? '재생' : '일시 정지'}`}
      disabled={reducedMotion}
      onClick={onToggle}
      data-cursor={paused ? 'PLAY' : 'PAUSE'}
    >
      <span className={`motion-control-glyph ${isStopped ? 'is-paused' : ''}`} aria-hidden="true">
        <i /><i /><i />
      </span>
      <span>AMBIENT MOTION</span>
      <b>{status}</b>
    </button>
  )
}
