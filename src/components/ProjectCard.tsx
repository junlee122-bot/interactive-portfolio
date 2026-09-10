import { useRef, type MouseEvent } from 'react'
import type { Project } from '../types'
import { ArrowUpRight } from './Icons'
import { ProjectVisual } from './ProjectVisual'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const boundsRef = useRef<DOMRect | null>(null)
  const reducedMotion = useReducedMotion()

  const motionDisabled = (element: HTMLElement) => reducedMotion || Boolean(element.closest('[data-motion-paused="true"]'))

  const cacheBounds = (event: MouseEvent<HTMLElement>) => {
    if (motionDisabled(event.currentTarget)) return
    boundsRef.current = event.currentTarget.getBoundingClientRect()
  }

  const updatePointer = (event: MouseEvent<HTMLElement>) => {
    if (motionDisabled(event.currentTarget)) return
    const bounds = boundsRef.current ?? event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
    event.currentTarget.style.setProperty('--pointer-rx', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 2}`)
    event.currentTarget.style.setProperty('--pointer-ry', `${((event.clientY - bounds.top) / bounds.height - 0.5) * 2}`)
  }

  const resetPointer = () => {
    cardRef.current?.style.removeProperty('--pointer-x')
    cardRef.current?.style.removeProperty('--pointer-y')
    cardRef.current?.style.removeProperty('--pointer-rx')
    cardRef.current?.style.removeProperty('--pointer-ry')
    boundsRef.current = null
  }

  return (
    <article
      ref={cardRef}
      className="project-card reveal"
      data-accent={project.accent}
      onMouseEnter={cacheBounds}
      onMouseMove={updatePointer}
      onMouseLeave={resetPointer}
    >
      <button
        type="button"
        className="project-open"
        aria-label={`${project.name} 케이스 스터디 열기`}
        data-cursor="OPEN"
        onClick={() => onOpen(project)}
      />
      <div className="project-card-glow" aria-hidden="true" />
      <header className="project-card-header">
        <div><span>{project.id}</span><span>{project.category}</span></div>
        <div><i />{project.status}</div>
      </header>
      <ProjectVisual slug={project.slug} accent={project.accent} />
      <div className="project-card-body">
        <div className="project-card-title">
          <span>{project.name} / {project.year}</span>
          <h3>{project.headline.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
        </div>
        <div className="project-card-copy">
          <p>{project.summary}</p>
          <ul aria-label="프로젝트 핵심 설계 영역">
            {project.focus.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="project-card-target"><span>{project.targetLabel}</span><strong>{project.target}</strong></div>
        </div>
      </div>
      <div className="project-card-footer">
        <span>{project.role}</span>
        <span className="project-card-action">OPEN CASE STUDY <ArrowUpRight size={18} /></span>
      </div>
    </article>
  )
}
