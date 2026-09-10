import { useEffect, useState, type CSSProperties } from 'react'
import { ArrowRight, Spark } from '../components/Icons'
import { useReducedMotion } from '../hooks/useReducedMotion'

const rhythmModes = [
  { name: 'CLARITY', duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', label: '정확하고 또렷한 전환' },
  { name: 'ENERGY', duration: 280, easing: 'cubic-bezier(0.34, 1.35, 0.64, 1)', label: '빠르고 탄성 있는 전환' },
  { name: 'CALM', duration: 850, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', label: '느긋하고 균일한 전환' },
] as const
const signalBars = Array.from({ length: 18 }, (_, index) => ({ id: `signal-${index + 1}`, index }))
const systemNodes = ['INPUT', 'STATE', 'VIEW', 'PROOF'] as const

function getSignalMeaning(value: number) {
  if (value < 35) return { name: 'LOW', text: '작은 진폭 · 낮은 시각적 강도' }
  if (value < 75) return { name: 'BALANCED', text: '균형 잡힌 진폭 · 분명한 피드백' }
  return { name: 'HIGH', text: '큰 진폭 · 강한 시각적 강조' }
}

export function LabSection() {
  const [signal, setSignal] = useState(64)
  const [rhythmIndex, setRhythmIndex] = useState(0)
  const [highContrast, setHighContrast] = useState(false)
  const [systemRun, setSystemRun] = useState({ step: -1, running: false, value: 64, id: 0 })
  const reducedMotion = useReducedMotion()
  const rhythm = rhythmModes[rhythmIndex]
  const signalMeaning = getSignalMeaning(signal)
  const rhythmTransition = { transitionDuration: reducedMotion ? '0ms' : `${rhythm.duration}ms`, transitionTimingFunction: rhythm.easing }
  const runMeaning = getSignalMeaning(systemRun.value)
  const systemMessages = [
    `INPUT: 현재 신호 ${systemRun.value}%를 입력값으로 받았습니다.`,
    `STATE: ${systemRun.value}%를 명시적인 상태로 저장했습니다.`,
    `VIEW: 상태를 ${runMeaning.name} 표현으로 연결했습니다.`,
    `PROOF: 입력 ${systemRun.value}%와 표시값 ${systemRun.value}%가 일치합니다.`,
  ]

  useEffect(() => {
    if (!systemRun.running) return
    const timer = window.setTimeout(() => {
      setSystemRun((current) => {
        if (!current.running) return current
        if (reducedMotion || current.step === systemNodes.length - 1) return { ...current, step: 3, running: false }
        return { ...current, step: current.step + 1 }
      })
    }, reducedMotion ? 0 : 650)
    return () => window.clearTimeout(timer)
  }, [systemRun.running, systemRun.step, reducedMotion])

  const runSystem = () => {
    if (systemRun.running) return
    setSystemRun((current) => ({ step: reducedMotion ? 3 : 0, running: !reducedMotion, value: signal, id: current.id + 1 }))
  }

  return (
    <section className="lab section-shell" id="lab" aria-labelledby="lab-title">
      <header className="lab-heading reveal">
        <div className="section-kicker"><span>04</span><i />INTERACTION LAB</div>
        <h2 id="lab-title">작은 움직임에도<br /><em>명확한 이유를.</em></h2>
        <p>아래 실험은 이미지가 아닌 이 페이지 안에서 실제로 작동하는 CSS와 React 상태로 만들어졌습니다.</p>
      </header>

      <div className="lab-grid reveal">
        <article className="lab-card signal-lab" data-signal-level={signalMeaning.name.toLowerCase()} style={{ '--signal': signal / 100 } as CSSProperties}>
          <header><span>01 / SIGNAL MIXER</span><i>LIVE INPUT</i></header>
          <div className="signal-display" aria-hidden="true">
            {signalBars.map((bar) => <i key={bar.id} style={{ '--index': bar.index } as CSSProperties} />)}
            <span><strong>{signal}</strong><small>INTENSITY</small></span>
          </div>
          <label>
            <span>ADJUST SIGNAL</span><output htmlFor="lab-signal">{signal}%</output>
            <input
              id="lab-signal"
              type="range"
              min="10"
              max="100"
              value={signal}
              aria-label="신호 강도 조절"
              aria-valuetext={`${signal} 퍼센트, ${signalMeaning.name}`}
              aria-describedby="signal-interpretation"
              onChange={(event) => setSignal(Number(event.target.value))}
            />
          </label>
          <div className="lab-readout signal-interpretation" id="signal-interpretation"><strong>{signalMeaning.name}</strong><p>{signalMeaning.text}</p><small>시각적 강도의 데모이며 오디오 분석값이 아닙니다.</small></div>
        </article>

        <article className={`lab-card rhythm-lab mode-${rhythmIndex}`} style={{ '--rhythm-duration': `${rhythm.duration}ms`, '--rhythm-easing': rhythm.easing } as CSSProperties}>
          <header><span>02 / TYPE RHYTHM</span><i>STATEFUL</i></header>
          <button type="button" className="rhythm-stage" aria-label={`현재 ${rhythm.name}. 다음 리듬 ${rhythmModes[(rhythmIndex + 1) % rhythmModes.length].name}로 전환`} aria-describedby="rhythm-token" onClick={() => setRhythmIndex((current) => (current + 1) % rhythmModes.length)} data-cursor="SHIFT">
            <span style={rhythmTransition}>MAKE</span><span style={rhythmTransition}>IT</span><strong style={rhythmTransition}>FELT.</strong>
            <i>{rhythm.name}</i>
          </button>
          <div className="lab-control"><span>ACTIVATE TO SHIFT MOOD</span><b>{String(rhythmIndex + 1).padStart(2, '0')} / 03</b></div>
          <div className="lab-readout rhythm-token" id="rhythm-token" role="status"><strong>{reducedMotion ? '0 MS / REDUCED MOTION' : `${rhythm.duration} MS / ${rhythm.name}`}</strong><code>{rhythm.easing}</code><p>{reducedMotion ? '위치 애니메이션 없이 최종 상태를 표시합니다.' : rhythm.label}</p></div>
        </article>

        <article className={`lab-card access-lab ${highContrast ? 'is-contrast' : ''}`}>
          <header><span>03 / ACCESS MODE</span><i>INCLUSIVE</i></header>
          <div className="access-preview">
            <span className="access-orb"><i /></span>
            <div><small>INTERFACE SIGNAL</small><strong>{highContrast ? 'HIGH CONTRAST' : 'STANDARD MODE'}</strong><p>같은 정보, 더 분명한 표현.</p></div>
          </div>
          <button type="button" role="switch" aria-checked={highContrast} onClick={() => setHighContrast((current) => !current)}>
            <span>CONTRAST BOOST</span><i><b /></i><em>{highContrast ? 'ON' : 'OFF'}</em>
          </button>
        </article>

        <article className={`lab-card system-lab ${systemRun.running ? 'is-running' : ''}`} data-system-step={systemRun.step}>
          <header><span>04 / SYSTEM MAP</span><i>{systemRun.running ? 'PROCESSING' : systemRun.step === 3 ? 'COMPLETE' : 'READY TO RUN'}</i></header>
          <div className="system-map" aria-hidden="true" key={systemRun.id}>
            {systemNodes.map((node, index) => <span key={node} className={`system-node node-${node.toLowerCase()} ${systemRun.step === index ? 'is-active' : ''} ${systemRun.step > index ? 'is-complete' : ''}`}>{node}</span>)}
            {['one', 'two', 'three'].map((path, index) => <i key={path} className={`system-path path-${path} ${systemRun.step > index ? 'is-complete' : ''} ${systemRun.running && systemRun.step === index ? 'is-transmitting' : ''}`} />)}
            <Spark size={18} />
            {systemRun.step >= 0 ? <span className="system-payload"><strong>{systemRun.value}%</strong><small>{systemRun.step >= 2 ? runMeaning.name : 'SIGNAL PAYLOAD'}</small></span> : null}
          </div>
          <button className="lab-control system-run-button" type="button" onClick={runSystem} disabled={systemRun.running} aria-describedby="system-run-status" data-cursor="RUN"><span>{systemRun.running ? 'RUNNING SEQUENCE' : systemRun.step === 3 ? 'RUN AGAIN' : 'RUN SIGNAL FLOW'}</span><ArrowRight size={18} /></button>
          <div className="lab-readout system-readout"><p id="system-run-status" role="status" aria-atomic="true">{systemRun.step < 0 ? '버튼을 누르면 현재 SIGNAL MIXER 값으로 한 번 실행합니다.' : systemMessages[systemRun.step]}</p><small>로컬 UI 상태 흐름 데모 · 서버 처리나 성능 벤치마크가 아닙니다.</small></div>
        </article>
      </div>
    </section>
  )
}
