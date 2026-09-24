import { Badge, Text } from '@seed-design/react'
import { useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { principles, processSteps } from '../data'

export function ProcessSection() {
  const [activeId, setActiveId] = useState(processSteps[0].id)
  const active = processSteps.find((step) => step.id === activeId) ?? processSteps[0]

  return (
    <section className="section section--tinted" id="process" aria-labelledby="process-title">
      <div className="container">
        <SectionHeading
          id="process-title"
          eyebrow="How I work"
          title={
            <>
              좋은 구현은
              <br />
              좋은 질문에서 시작됩니다.
            </>
          }
          description="화려한 표현을 고를 때도 질문은 같습니다. 무엇을 더 잘 이해하게 하는가? 키보드나 작은 화면에서도 가능한가? 효과를 꺼도 중요한 정보가 남는가?"
        />

        <div className="process reveal">
          <div className="process__steps" role="tablist" aria-label="작업 단계">
            {processSteps.map((step) => (
              <button
                key={step.id}
                type="button"
                role="tab"
                id={`step-tab-${step.id}`}
                aria-selected={step.id === activeId}
                aria-controls="step-panel"
                className="process-step"
                onClick={() => setActiveId(step.id)}
                onKeyDown={(event) => {
                  const index = processSteps.findIndex((item) => item.id === activeId)
                  const delta = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 0
                  if (!delta) return
                  event.preventDefault()
                  const next = processSteps[(index + delta + processSteps.length) % processSteps.length]
                  setActiveId(next.id)
                  document.getElementById(`step-tab-${next.id}`)?.focus()
                }}
                tabIndex={step.id === activeId ? 0 : -1}
              >
                <span className="process-step__index">{step.id}</span>
                <span className="process-step__name">{step.name}</span>
              </button>
            ))}
          </div>

          <div className="process__panel" role="tabpanel" id="step-panel" aria-labelledby={`step-tab-${active.id}`} key={active.id}>
            <Text as="p" textStyle="t3Bold" color="fg.brand">
              {active.name}
            </Text>
            <Text as="h3" textStyle="t8Bold">
              {active.title}
            </Text>
            <Text as="p" textStyle="t5Regular" color="fg.neutralMuted">
              {active.description}
            </Text>
            <div className="process__outputs">
              {active.outputs.map((output) => (
                <Badge key={output} tone="neutral" variant="weak" size="large">
                  {output}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="principles">
          {principles.map((principle, index) => (
            <article key={principle.label} className="principle reveal" style={{ transitionDelay: `${index * 80}ms` }}>
              <Text as="p" textStyle="t2Bold" color="fg.neutralSubtle">
                {principle.label}
              </Text>
              <Text as="h3" textStyle="t6Bold">
                {principle.title}
              </Text>
              <Text as="p" textStyle="t4Regular" color="fg.neutralMuted">
                {principle.description}
              </Text>
              <p className="principle__question">Q. {principle.question}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
