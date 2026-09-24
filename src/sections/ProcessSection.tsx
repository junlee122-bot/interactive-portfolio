import { Text } from '@seed-design/react'
import { useState } from 'react'
import { Chip } from 'seed-design/ui/chip'
import { SectionHeading } from '../components/SectionHeading'
import { processSteps } from '../data/profile'

export function ProcessSection({ onOpenProject }: { onOpenProject: (slug: string) => void }) {
  const [activeId, setActiveId] = useState(processSteps[0].id)
  const active = processSteps.find((step) => step.id === activeId) ?? processSteps[0]

  const focusStep = (delta: number) => {
    const index = processSteps.findIndex((item) => item.id === activeId)
    const next = processSteps[(index + delta + processSteps.length) % processSteps.length]
    setActiveId(next.id)
    document.getElementById(`step-tab-${next.id}`)?.focus()
  }

  return (
    <section className="section" id="process" aria-labelledby="process-title">
      <div className="container">
        <SectionHeading
          id="process-title"
          eyebrow="How I work"
          title={
            <>
              AI 에이전트가 만들고,
              <br />
              저는 기준을 만듭니다.
            </>
          }
          description="대부분의 코드는 Claude Code와 Codex가 작성했습니다. 커밋 기록에도 그대로 남아 있습니다. 제 일은 무엇을 만들지 정하고, 잘 만들어졌는지 판단할 기준을 세우는 것입니다."
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
                tabIndex={step.id === activeId ? 0 : -1}
                className="process-step"
                onClick={() => setActiveId(step.id)}
                onKeyDown={(event) => {
                  const delta =
                    event.key === 'ArrowDown' || event.key === 'ArrowRight'
                      ? 1
                      : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
                        ? -1
                        : 0
                  if (!delta) return
                  event.preventDefault()
                  focusStep(delta)
                }}
              >
                <span className="process-step__index">{step.id}</span>
                <span className="process-step__name">{step.name}</span>
              </button>
            ))}
          </div>

          <div
            className="process__panel"
            role="tabpanel"
            id="step-panel"
            aria-labelledby={`step-tab-${active.id}`}
            key={active.id}
          >
            <Text as="h3" textStyle="t8Bold">
              {active.title}
            </Text>
            <Text as="p" textStyle="t5Regular" color="fg.neutralMuted">
              {active.description}
            </Text>
            <div className="process__evidence">
              <Text as="p" textStyle="t3Bold" color="fg.neutralSubtle">
                이 방식이 남아 있는 작업
              </Text>
              <div className="chip-row">
                {active.evidence.map((item) => (
                  <Chip.Button key={item.label} size="medium" variant="outlineStrong" onClick={() => onOpenProject(item.slug)}>
                    <Chip.Label>{item.label}</Chip.Label>
                  </Chip.Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
