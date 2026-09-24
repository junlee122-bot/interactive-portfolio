import IconChevronRightLine from '@karrotmarket/react-monochrome-icon/IconChevronRightLine'
import { Badge, Icon, Text } from '@seed-design/react'
import { useState } from 'react'
import { Chip } from 'seed-design/ui/chip'
import { SectionHeading } from '../components/SectionHeading'
import { categoryLabels, projects, type ProjectCategory } from '../data/projects'

type Filter = 'all' | ProjectCategory

const filters: Filter[] = ['all', 'ai', 'data', 'game', 'archive']

export function IndexSection({ onOpenProject }: { onOpenProject: (slug: string) => void }) {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? projects : projects.filter((project) => project.category === filter)

  const countFor = (value: Filter) =>
    value === 'all' ? projects.length : projects.filter((project) => project.category === value).length

  return (
    <section className="section section--tinted" id="index" aria-labelledby="index-title">
      <div className="container">
        <SectionHeading
          id="index-title"
          eyebrow="All projects"
          title="전체 작업"
          description="다섯 달 동안 만든 것들입니다. 공개 저장소와 공개 배포를 기준으로 정리했고, 비공개 저장소는 공개된 화면으로 확인되는 내용만 담았습니다."
        />

        <Chip.RadioRoot
          value={filter}
          onValueChange={(value) => setFilter(value as Filter)}
          aria-label="분야로 거르기"
          className="index-filters"
        >
          {filters.map((value) => (
            <Chip.RadioItem key={value} value={value} size="medium" variant="outlineStrong">
              <Chip.Label>
                {value === 'all' ? '전체' : categoryLabels[value]} {countFor(value)}
              </Chip.Label>
            </Chip.RadioItem>
          ))}
        </Chip.RadioRoot>

        <ul className="project-index" aria-live="polite">
          {visible.map((project) => (
            <li key={project.slug}>
              <button type="button" className="project-row" onClick={() => onOpenProject(project.slug)}>
                <span className="project-row__period">{project.period}</span>
                <span className="project-row__main">
                  <Text textStyle="t5Bold">{project.name}</Text>
                  <Text textStyle="t4Regular" color="fg.neutralMuted">
                    {project.tagline}
                  </Text>
                </span>
                <span className="project-row__badges">
                  {project.badges.slice(0, 2).map((badge) => (
                    <Badge key={badge} tone={badge === '라이브' ? 'positive' : 'neutral'} variant="weak">
                      {badge}
                    </Badge>
                  ))}
                </span>
                <Icon svg={<IconChevronRightLine />} size="x5" color="fg.neutralSubtle" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
