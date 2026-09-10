import { useEffect, useRef, type MouseEvent } from 'react'
import type { Project } from '../types'
import { ArrowRight, Close } from './Icons'
import { ProjectVisual } from './ProjectVisual'
import { CaseSpecimen } from './CaseSpecimen'
import { projects } from '../data'

interface CaseStudyDialogProps {
  project: Project | null
  onClose: () => void
  onNext: () => void
}

export function CaseStudyDialog({ project, onClose, onNext }: CaseStudyDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const isOpen = Boolean(project)
  const projectIndex = project ? projects.findIndex((item) => item.slug === project.slug) : -1
  const nextProject = projectIndex >= 0 ? projects[(projectIndex + 1) % projects.length] : null

  useEffect(() => {
    const dialog = dialogRef.current
    return () => {
      if (dialog?.open) dialog.close()
      if (!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open')
    }
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
    document.body.classList.toggle('dialog-open', Boolean(document.querySelector('dialog[open]')))

    return () => {
      if (!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open')
    }
  }, [isOpen])

  useEffect(() => {
    if (!project) return
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' })
    progressRef.current?.style.setProperty('transform', 'scaleX(0)')
    titleRef.current?.focus({ preventScroll: true })
  }, [project?.slug])

  const updateReadingProgress = () => {
    const scroll = scrollRef.current
    if (!scroll) return
    const maxScroll = Math.max(scroll.scrollHeight - scroll.clientHeight, 1)
    progressRef.current?.style.setProperty('transform', `scaleX(${Math.min(scroll.scrollTop / maxScroll, 1)})`)
  }

  const handleClose = () => {
    onClose()
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) handleClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="case-dialog"
      data-accent={project?.accent}
      aria-labelledby={project ? `case-title-${project.slug}` : undefined}
      onClose={() => { if (project) onClose() }}
      onCancel={(event) => {
        event.preventDefault()
        handleClose()
      }}
      onClick={handleBackdropClick}
    >
      {project ? (
        <div key={project.slug} ref={scrollRef} className="case-scroll" data-project={project.slug} onScroll={updateReadingProgress}>
          <div className="case-toolbar">
            <span><i /> CASE FILE / {project.id}</span>
            <button type="button" onClick={handleClose} data-cursor="CLOSE">
              CLOSE <Close size={18} />
            </button>
            <div className="case-reading-progress" aria-hidden="true"><span ref={progressRef} /></div>
          </div>

          <header className="case-hero">
            <div className="case-hero-copy">
              <span>{project.status} · {project.year}</span>
              <h2 ref={titleRef} tabIndex={-1} id={`case-title-${project.slug}`}>{project.name}</h2>
              <p>{project.headline.replace('\n', ' ')}</p>
            </div>
            <ProjectVisual slug={project.slug} accent={project.accent} compact />
          </header>

          <div className="case-facts">
            <div><span>STATUS</span><strong>{project.status}</strong></div>
            <div><span>ROLE</span><strong>{project.role}</strong></div>
            <div><span>{project.targetLabel}</span><strong>{project.target}</strong></div>
          </div>

          <section className="case-section case-context">
            <span className="case-index">01 / CONTEXT</span>
            <div>
              <h3>{project.category}</h3>
              <p className="case-lead">{project.summary}</p>
            </div>
          </section>

          <section className="case-section case-split">
            <span className="case-index">02 / PROBLEM & HYPOTHESIS</span>
            <div className="case-split-grid">
              <article><span>CHALLENGE</span><p>{project.challenge}</p></article>
              <article><span>HYPOTHESIS</span><p>{project.hypothesis}</p></article>
            </div>
          </section>

          <section className="case-section">
            <span className="case-index">03 / KEY DECISIONS</span>
            <div className="decision-grid">
              {project.decisions.map((decision, index) => (
                <article key={decision.title}>
                  <span>0{index + 1}</span>
                  <h3>{decision.title}</h3>
                  <p>{decision.description}</p>
                  <div><strong>TRADE-OFF</strong>{decision.tradeoff}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="case-section case-specimen-section" aria-labelledby={`specimen-title-${project.slug}`}>
            <span className="case-index">04 / INTERACTIVE SPECIMEN</span>
            <div className="case-specimen-content">
              <header className="case-specimen-heading">
                <h3 id={`specimen-title-${project.slug}`}>설계한 상태를,<br />직접 바꿔 보세요.</h3>
                <p>입력이 화면과 설명으로 이어지는 작은 작동 표본입니다. 각 선택에 따른 상태와 결과를 나란히 확인할 수 있습니다.</p>
              </header>
              <CaseSpecimen key={project.slug} project={project} />
            </div>
          </section>

          <section className="case-section case-engineering">
            <span className="case-index">05 / ENGINEERING NOTES</span>
            <div>
              <h3>시각적 효과 뒤의<br />작동 원칙까지 설계합니다.</h3>
              <ul>{project.engineering.map((note) => <li key={note}>{note}</li>)}</ul>
            </div>
          </section>

          <section className="case-section case-validation">
            <span className="case-index">06 / VALIDATION & NEXT</span>
            <div className="case-split-grid">
              <article><span>CURRENT EVIDENCE</span><p>{project.validation}</p></article>
              <article><span>NEXT EXPERIMENT</span><p>{project.next}</p></article>
            </div>
          </section>

          <footer className="case-next" data-next-accent={nextProject?.accent}>
            <span>NEXT CASE FILE / {nextProject?.name}</span>
            <button type="button" onClick={onNext} data-cursor="NEXT">
              {nextProject?.name ?? 'CONTINUE'} 살펴보기 <ArrowRight size={28} />
            </button>
          </footer>
        </div>
      ) : null}
    </dialog>
  )
}
