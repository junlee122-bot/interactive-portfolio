import IconArrowRightLine from '@karrotmarket/react-monochrome-icon/IconArrowRightLine'
import { Badge, SuffixIcon, Text } from '@seed-design/react'
import { ActionButton } from 'seed-design/ui/action-button'
import type { Project } from '../data'
import { ProjectSpecimen } from '../specimens/ProjectSpecimen'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <article className="project-card reveal" data-tone={project.tone} aria-labelledby={`${project.slug}-title`}>
      <div className="project-card__info">
        <div className="project-card__meta">
          <Badge tone={project.tone} variant="weak">
            {project.category}
          </Badge>
          <Badge tone="neutral" variant="outline">
            {project.status}
          </Badge>
        </div>

        <h3 id={`${project.slug}-title`} className="project-card__name">
          {project.name}
        </h3>
        <p className="project-card__headline">{project.headline}</p>
        <Text as="p" textStyle="t4Regular" color="fg.neutralMuted">
          {project.summary}
        </Text>

        <div className="project-card__question">
          <Text as="p" textStyle="t2Bold" color="fg.neutralSubtle">
            설계 질문
          </Text>
          <Text as="p" textStyle="t4Medium">
            {project.question}
          </Text>
        </div>

        <div className="project-card__footer">
          <ul className="role-list" aria-label="역할">
            {project.role.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
          <ActionButton variant="neutralSolid" size="medium" onClick={() => onOpen(project)}>
            케이스 스터디
            <SuffixIcon svg={<IconArrowRightLine />} />
          </ActionButton>
        </div>
      </div>

      <div className="project-card__specimen">
        <Text as="p" textStyle="t2Bold" color="fg.neutralSubtle" className="project-card__specimen-label">
          LIVE SPECIMEN · 직접 조작해 보세요
        </Text>
        <ProjectSpecimen slug={project.slug} />
      </div>
    </article>
  )
}
