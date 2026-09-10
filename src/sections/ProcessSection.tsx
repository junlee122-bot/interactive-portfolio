import { useState } from 'react'
import { processSteps } from '../data'
import { ArrowUpRight } from '../components/Icons'

const outputSpecimens = [
  { title: '문제 정의 스냅샷', input: '추천 결과가 낯설다는 가정', output: '추천 이유를 확인하는 흐름', note: '가설 → 확인할 질문으로 바꾸기', items: [['CONTEXT', '음악을 고르는 첫 순간'], ['QUESTION', '왜 이 곡인지 이해할 수 있는가?']] },
  { title: '인터랙션 상태 스케치', input: '에너지 컨트롤 조절', output: '수치 · 파형 · 추천 이유 갱신', note: '입력 → 피드백의 연결 정의', items: [['TRIGGER', '에너지 값을 변경한다'], ['RESPONSE', '같은 상태에서 세 표현을 갱신한다']] },
  { title: '컴포넌트 계약 스케치', input: '명시적인 UI 상태', output: '같은 정보, 여러 입력 방식', note: '기본 · 키보드 · 저동작 상태 포함', items: [['STATE', 'idle → adjusting → ready'], ['FALLBACK', '모션 없이 수치와 텍스트 유지']] },
  { title: '검증 질문 스케치', input: '작동하는 프로토타입', output: '확인 결과와 다음 수정 항목', note: '실제 측정 전, 검증 기준을 먼저 정의', items: [['CHECK', '키보드로 핵심 흐름을 완료하는가?'], ['OBSERVE', '작은 화면에서도 상태가 구분되는가?']] },
] as const

const transmissionPaths = ['M32 14 Q47 21 50 50', 'M87 27 Q69 31 50 50', 'M75 85 Q63 70 50 50', 'M13 77 Q29 63 50 50']

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="process section-shell" id="process" aria-labelledby="process-title">
      <header className="section-heading reveal">
        <div className="section-kicker"><span>02</span><i />HOW I WORK</div>
        <div className="section-heading-grid">
          <h2 id="process-title">아이디어를 감각이 아닌,<br /><em>검증 가능한 시스템으로.</em></h2>
          <p>빠르게 만드는 것보다 무엇을 왜 만들어야 하는지 선명하게 정의한 뒤, 가장 위험한 가정부터 코드로 확인합니다.</p>
        </div>
      </header>

      <div className="process-layout reveal">
        <div className="process-diagram" data-active-step={activeStep} aria-hidden="true">
          <span className="process-orbit orbit-1" /><span className="process-orbit orbit-2" /><span className="process-orbit orbit-3" />
          <svg className="process-transmission" viewBox="0 0 100 100" fill="none">
            {transmissionPaths.map((path, index) => <path key={path} d={path} className={`process-transmission-path ${activeStep === index ? 'is-active' : ''}`} />)}
            <path key={activeStep} className="process-transmission-pulse" d={transmissionPaths[activeStep]} pathLength="1" />
          </svg>
          <span key={`core-${activeStep}`} className="process-core"><b>{processSteps[activeStep].id}</b><i>{processSteps[activeStep].name}</i></span>
          {processSteps.map((step, index) => <span key={step.id} className={`process-node node-${index + 1} ${activeStep === index ? 'is-active' : ''}`}>{step.id}</span>)}
          <div className="process-active-output" key={`output-${activeStep}`}>
            <span>INPUT / {outputSpecimens[activeStep].input}</span>
            <strong>OUTPUT / {outputSpecimens[activeStep].output}</strong>
          </div>
          <span className="process-coordinate">INPUT → MODEL → SYSTEM → EVIDENCE</span>
        </div>

        <div className="process-list">
          {processSteps.map((step, index) => (
            <article key={step.id} className={activeStep === index ? 'is-active' : ''}>
              <button type="button" id={`process-trigger-${step.id}`} aria-controls={`process-panel-${step.id}`} aria-expanded={activeStep === index} onClick={() => setActiveStep(index)} data-cursor="VIEW">
                <span>{step.id}</span><strong>{step.name}</strong><p>{step.title}</p><ArrowUpRight size={19} />
              </button>
              <div className="process-detail" id={`process-panel-${step.id}`} role="region" aria-labelledby={`process-trigger-${step.id}`} aria-hidden={activeStep !== index}>
                <div className="process-detail-inner">
                  <p>{step.description}</p>
                  <ul>{step.outputs.map((output) => <li key={output}>{output}</li>)}</ul>
                  <div className="process-evidence">
                    <header><span>OUTPUT / 0{index + 1}</span><small>ILLUSTRATIVE SPECIMEN</small></header>
                    <strong>{outputSpecimens[index].title}</strong>
                    <dl>{outputSpecimens[index].items.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
                    <p>{outputSpecimens[index].note}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
