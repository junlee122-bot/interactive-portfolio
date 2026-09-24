import IconArrowUpRightLine from '@karrotmarket/react-monochrome-icon/IconArrowUpRightLine'
import { SuffixIcon } from '@seed-design/react'
import { ActionButton } from 'seed-design/ui/action-button'
import type { Project } from '../data/projects'

export function ProjectLinks({ project, size = 'medium' }: { project: Project; size?: 'small' | 'medium' | 'large' }) {
  if (project.links.length === 0) return null

  return (
    <div className="project-links">
      {project.links.map((link, index) => (
        <ActionButton key={link.href} asChild variant={index === 0 ? 'neutralSolid' : 'neutralWeak'} size={size}>
          <a href={link.href} target="_blank" rel="noreferrer">
            {link.label}
            <SuffixIcon svg={<IconArrowUpRightLine />} />
          </a>
        </ActionButton>
      ))}
    </div>
  )
}
