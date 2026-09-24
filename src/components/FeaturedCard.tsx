import IconArrowRightLine from '@karrotmarket/react-monochrome-icon/IconArrowRightLine'
import { Badge, SuffixIcon, Text } from '@seed-design/react'
import { ActionButton } from 'seed-design/ui/action-button'
import { categoryLabels, type Project } from '../data/projects'
import { ProjectLinks } from './ProjectLinks'

export function FeaturedCard({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  return (
    <article className="featured-card reveal" aria-labelledby={`${project.slug}-title`}>
      <button
        type="button"
        className="featured-card__media"
        data-category={project.category}
        onClick={() => onOpen(project.slug)}
        aria-label={`${project.name} 자세히 보기`}
      >
        {project.image ? (
          <img src={project.image} alt={project.imageAlt ?? ''} loading="lazy" />
        ) : (
          <span className="featured-card__cover" aria-hidden="true">
            {project.name}
          </span>
        )}
      </button>

      <div className="featured-card__body">
        <div className="featured-card__meta">
          <Badge tone="brand" variant="weak">
            {categoryLabels[project.category]}
          </Badge>
          {project.badges.map((badge) => (
            <Badge key={badge} tone="neutral" variant="outline">
              {badge}
            </Badge>
          ))}
        </div>

        <h3 id={`${project.slug}-title`} className="featured-card__name">
          {project.name}
        </h3>
        <Text as="p" textStyle="t5Regular" color="fg.neutralMuted">
          {project.tagline}
        </Text>

        {project.numbers && (
          <dl className="number-row">
            {project.numbers.map((number) => (
              <div key={number.label}>
                <dt>{number.label}</dt>
                <dd>{number.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="featured-card__footer">
          <ActionButton variant="brandSolid" size="medium" onClick={() => onOpen(project.slug)}>
            자세히 보기
            <SuffixIcon svg={<IconArrowRightLine />} />
          </ActionButton>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}
