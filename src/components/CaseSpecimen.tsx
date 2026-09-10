import { useId, useState, type CSSProperties } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import type { Project } from '../types'

const pulsePresets = [
  { label: 'DEEP FOCUS', energy: 32, focus: 92, bpm: 84, input: '낮은 자극 · 작업 중 · 가사 최소화', result: '반복적인 리듬과 낮은 음성 밀도로 집중의 흐름을 유지합니다.', state: 'CONTEXT / FOCUSED' },
  { label: 'NIGHT WALK', energy: 56, focus: 64, bpm: 108, input: '저녁 · 가벼운 산책 · 공간감 있는 사운드', result: '걸음에 맞는 중간 템포와 여유 있는 사운드로 산책의 리듬을 만듭니다.', state: 'CONTEXT / EXPLORING' },
  { label: 'HIGH ENERGY', energy: 94, focus: 38, bpm: 138, input: '활동 전환 · 높은 에너지 · 선명한 비트', result: '강한 어택과 빠른 템포를 우선해 움직임의 시작을 돕습니다.', state: 'CONTEXT / ACTIVATED' },
] as const

const orbitViews = [
  { label: 'FORM', angle: -24, tilt: 12, scale: 1, x: 68, y: 34, input: '전체 실루엣 · 카메라 −24°', result: '제품의 외곽선과 비례를 먼저 보여 주고, 사용자가 소재와 디테일로 이동할 기준점을 만듭니다.', state: 'CHAPTER / 01', hotspot: '01 · BALANCED FORM' },
  { label: 'MATERIAL', angle: 28, tilt: -8, scale: 1.08, x: 38, y: 46, input: '표면 탐색 · 카메라 +28°', result: '같은 오브젝트의 표면을 강조해 소재 설명과 시각적 위치가 함께 바뀌도록 연결합니다.', state: 'CHAPTER / 02', hotspot: '02 · BRUSHED SHELL' },
  { label: 'DETAIL', angle: 68, tilt: 18, scale: 1.18, x: 64, y: 68, input: '접합부 관찰 · 카메라 +68°', result: '접합부에 시선을 모으고 확대 범위를 제한해, 중요한 디테일을 놓치지 않도록 안내합니다.', state: 'CHAPTER / 03', hotspot: '03 · PRECISE SEAM' },
] as const

const momentStates = [
  { label: 'ONLINE', input: '네트워크 사용 가능 · 새 기록 1개', result: '기기 저장 후 개인 계정으로 동기화하는 흐름을 보여 줍니다. 공유 권한은 별도로 유지합니다.', state: 'SYNC / COMPLETE', sync: '개인 계정 동기화 완료', queue: '0 PENDING', steps: ['done', 'done', 'done', 'done'] },
  { label: 'OFFLINE', input: '네트워크 없음 · 새 기록 1개', result: '기록을 로컬 큐에 보관하고 연결 복구를 기다립니다. 기록을 다시 입력하거나 공유할 필요가 없습니다.', state: 'SYNC / QUEUED', sync: '기기에 보관 · 연결 대기', queue: '1 PENDING', steps: ['done', 'active', 'waiting', 'waiting'] },
  { label: 'CONFLICT', input: '연결 복구 · 서로 다른 수정본 2개', result: '어느 쪽도 자동으로 덮어쓰지 않습니다. 두 수정본을 보존하고 검토가 끝날 때까지 업로드를 보류합니다.', state: 'SYNC / REVIEW REQUIRED', sync: '수정본 2개 보존 · 검토 필요', queue: '1 ON HOLD', steps: ['done', 'done', 'attention', 'waiting'] },
] as const

const pipelineLabels = ['CAPTURE', 'QUEUE', 'REVIEW', 'SYNC']
const stepDescriptions: Record<string, string> = { done: '완료', active: '대기 중', waiting: '아직 진행하지 않음', attention: '검토 필요' }
const waveShape = Array.from({ length: 32 }, (_, index) => 0.22 + Math.abs(Math.sin(index * 1.73)) * 0.78)

interface CaseSpecimenProps {
  project: Pick<Project, 'slug' | 'name' | 'accent'>
}

export function CaseSpecimen({ project }: CaseSpecimenProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const id = useId()
  const presets = project.slug === 'pulse' ? pulsePresets : project.slug === 'orbit' ? orbitViews : momentStates
  const selected = presets[selectedIndex]
  const pulse = pulsePresets[selectedIndex]
  const orbit = orbitViews[selectedIndex]
  const moment = momentStates[selectedIndex]
  const transition = reducedMotion ? 'none' : 'transform 650ms cubic-bezier(.2,.8,.2,1)'

  return (
    <div
      className="case-specimen"
      data-project={project.slug}
      data-accent={project.accent}
      data-state={selectedIndex}
      data-reduced-motion={reducedMotion}
      style={{ '--specimen-duration': reducedMotion ? '0ms' : '650ms', '--specimen-energy': pulse.energy / 100 } as CSSProperties}
    >
      <div className="specimen-main">
        <div className="specimen-topline"><span>{project.name} / LIVE SPECIMEN</span><span>0{selectedIndex + 1} / 03</span></div>
        <fieldset className="specimen-controls">
          <legend>{project.slug === 'pulse' ? '청취 맥락 선택' : project.slug === 'orbit' ? '제품 챕터 선택' : '동기화 시나리오 선택'}</legend>
          {presets.map((preset, index) => (
            <button
              type="button"
              key={preset.label}
              aria-pressed={index === selectedIndex}
              aria-controls={`${id}-scene ${id}-inspector`}
              onClick={() => setSelectedIndex(index)}
            >
              <span>0{index + 1}</span>{preset.label}
            </button>
          ))}
        </fieldset>

        <div id={`${id}-scene`} className={`specimen-scene specimen-${project.slug}`} aria-label={`${project.name} ${selected.label} 미리보기`}>
          {project.slug === 'pulse' ? (
            <>
              <div className="specimen-scene-label"><small>CONTEXTUAL MIX</small><strong>{pulse.label}</strong><span>{pulse.bpm} BPM · SAMPLE PRESET</span></div>
              <div className="specimen-wave" aria-hidden="true">
                {waveShape.map((height, index) => (
                  <i key={index} style={{ transform: `scaleY(${height * (0.3 + pulse.energy / 140)})`, transition, '--wave-delay': `${index * 14}ms` } as CSSProperties} />
                ))}
              </div>
              <div className="specimen-metrics">
                {[{ label: 'ENERGY', value: pulse.energy }, { label: 'FOCUS', value: pulse.focus }].map((metric) => (
                  <div key={metric.label}>
                    <span>{metric.label}<b>{metric.value}<small> / 100</small></b></span>
                    <div className="specimen-meter" role="meter" aria-label={metric.label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={metric.value}>
                      <i style={{ transform: `scaleX(${metric.value / 100})`, transformOrigin: 'left', transition }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="specimen-caption">프리셋 수치는 설명을 위한 입력값입니다. 오디오 재생이나 AI 추천 API는 연결하지 않습니다.</p>
            </>
          ) : project.slug === 'orbit' ? (
            <>
              <div className="specimen-scene-label"><small>CSS CONCEPT SCENE</small><strong>{orbit.label}</strong><span>CAM / {orbit.angle > 0 ? '+' : ''}{orbit.angle}°</span></div>
              <div className="specimen-orbit-grid" aria-hidden="true" />
              <div className="specimen-object" aria-hidden="true" style={{ transform: `translate(-50%, -50%) rotateX(${orbit.tilt}deg) rotateY(${orbit.angle}deg) rotateZ(-18deg) scale(${orbit.scale})`, transition }}><i /><b /><em /></div>
              <div className="specimen-hotspot" style={{ left: `${orbit.x}%`, top: `${orbit.y}%`, transition: reducedMotion ? 'none' : 'left 650ms ease, top 650ms ease' }}><i /><span>{orbit.hotspot}</span></div>
              <p className="specimen-caption">CSS concept scene — 실제 3D 모델이나 WebGL 렌더링이 아닌 CSS 형태·각도 전환 데모입니다.</p>
            </>
          ) : (
            <>
              <div className="specimen-scene-label"><small>LOCAL-FIRST CAPTURE</small><strong>{moment.label}</strong><span>{moment.queue}</span></div>
              <div className="specimen-capture"><span>18:42</span><div><small>DEMO ENTRY / SEOUL</small><strong>빛이 오래 머문 골목</strong><p>짧은 메모 · 위치 비공개</p></div><b>01</b></div>
              <ol className="specimen-pipeline" aria-label="기록 동기화 단계">
                {pipelineLabels.map((label, index) => <li key={label} data-status={moment.steps[index]}><i aria-hidden="true">{moment.steps[index] === 'done' ? '✓' : moment.steps[index] === 'attention' ? '!' : String(index + 1).padStart(2, '0')}</i><strong>{label}</strong><small>{stepDescriptions[moment.steps[index]]}</small></li>)}
              </ol>
              <div className="specimen-privacy"><span><i /> PRIVATE BY DEFAULT</span><strong>정밀 위치 비공개</strong><small>{moment.sync}</small></div>
              <p className="specimen-caption">네트워크·저장 상태의 로컬 UI 시뮬레이션입니다. 실제 기록 저장, 위치 수집, 서버 전송은 하지 않습니다.</p>
            </>
          )}
        </div>
      </div>

      <aside id={`${id}-inspector`} className="specimen-inspector" aria-label="상태 검사기">
        <div className="specimen-inspector-title"><span>STATE INSPECTOR</span><i aria-hidden="true" /></div>
        <dl>
          <div><dt>01 / STATE</dt><dd><code>{selected.state}</code></dd></div>
          <div><dt>02 / INPUT</dt><dd>{selected.input}</dd></div>
          <div><dt>03 / RESULT</dt><dd>{selected.result}</dd></div>
        </dl>
        <p className="specimen-status" role="status" aria-live="polite" aria-atomic="true">{selected.label} 선택됨. {selected.result}</p>
        <div className="specimen-disclaimer"><span>{reducedMotion ? 'REDUCED MOTION · ON' : 'MOTION · STATE TRANSITION'}</span><p>선택은 이 미리보기 안에서만 적용됩니다. 세 가지 상태를 직접 비교해 보세요.</p></div>
      </aside>
    </div>
  )
}
