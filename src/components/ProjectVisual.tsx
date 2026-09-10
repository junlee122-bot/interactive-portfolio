import type { CSSProperties } from 'react'
import type { ProjectAccent } from '../types'

interface ProjectVisualProps {
  slug: string
  accent: ProjectAccent
  compact?: boolean
}

const waveform = [34, 58, 26, 72, 48, 88, 56, 30, 68, 92, 60, 42, 76, 52, 84, 36, 64, 46, 78, 28]

export function ProjectVisual({ slug, accent, compact = false }: ProjectVisualProps) {
  if (slug === 'pulse') {
    return (
      <div className={`project-visual visual-pulse ${compact ? 'is-compact' : ''}`} data-accent={accent} aria-hidden="true">
        <div className="mock-window pulse-window">
          <div className="mock-bar"><span>PULSE / DISCOVER</span><i /><i /><i /></div>
          <div className="pulse-layout">
            <div className="pulse-now">
              <span className="album-art"><i>04:12</i></span>
              <div><small>PLAYING FOR</small><strong>DEEP FOCUS</strong><span>Neon Memory — 128 BPM</span></div>
            </div>
            <div className="pulse-wave">
              {waveform.map((height, index) => (
                <i key={`${height}-${index}`} style={{ '--bar-height': `${height}%`, '--bar-delay': `${index * -46}ms` } as CSSProperties} />
              ))}
            </div>
            <div className="pulse-controls">
              <span><small>ENERGY</small><i><b style={{ width: '72%' }} /></i><em>72</em></span>
              <span><small>FOCUS</small><i><b style={{ width: '84%' }} /></i><em>84</em></span>
              <span><small>FAMILIAR</small><i><b style={{ width: '39%' }} /></i><em>39</em></span>
            </div>
          </div>
        </div>
        <span className="visual-signal signal-one">CONTEXT / 04</span>
        <span className="visual-signal signal-two">LIVE RESPONSE</span>
      </div>
    )
  }

  if (slug === 'orbit') {
    return (
      <div className={`project-visual visual-orbit ${compact ? 'is-compact' : ''}`} data-accent={accent} aria-hidden="true">
        <div className="mock-window orbit-window">
          <div className="mock-bar"><span>ORBIT / OBJECT 01</span><i /><i /><i /></div>
          <div className="showroom-grid" />
          <span className="showroom-halo halo-a" />
          <span className="showroom-halo halo-b" />
          <span className="showroom-object"><i /><b /></span>
          <div className="showroom-nav"><span className="is-current">01 / FORM</span><span>02 / MATERIAL</span><span>03 / DETAIL</span></div>
          <span className="showroom-hint">DRAG TO INSPECT ↗</span>
          <div className="showroom-spec"><small>SHELL</small><strong>RECYCLED ALUMINUM</strong><i><b /></i></div>
        </div>
        <span className="visual-signal signal-one">CAM / +24°</span>
        <span className="visual-signal signal-two">TARGET / 60 FPS</span>
      </div>
    )
  }

  return (
    <div className={`project-visual visual-moment ${compact ? 'is-compact' : ''}`} data-accent={accent} aria-hidden="true">
      <div className="mock-window moment-window">
        <div className="mock-bar"><span>MOMENT / DAY 03</span><i /><i /><i /></div>
        <div className="moment-map">
          <span className="map-road road-a" /><span className="map-road road-b" /><span className="map-road road-c" />
          <span className="map-route"><i /><b /><em /></span>
          <span className="map-label label-a">SEONGSU</span><span className="map-label label-b">HANNAM</span>
        </div>
        <article className="moment-card">
          <span className="moment-image"><i>18:42</i></span>
          <div><small>JUL 18 · SEOUL</small><strong>빛이 오래 머문 골목</strong><p>저녁 산책 · 3.4 km</p></div>
        </article>
        <div className="moment-privacy"><i /> FRIENDS ONLY <span>SYNCED</span></div>
      </div>
      <span className="visual-signal signal-one">OFFLINE / READY</span>
      <span className="visual-signal signal-two">PRIVACY / FRIENDS</span>
    </div>
  )
}
