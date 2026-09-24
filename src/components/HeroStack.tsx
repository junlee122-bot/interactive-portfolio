import IconArrowLeftLine from '@karrotmarket/react-monochrome-icon/IconArrowLeftLine'
import IconArrowRightLine from '@karrotmarket/react-monochrome-icon/IconArrowRightLine'
import { Icon, Text } from '@seed-design/react'
import { useState } from 'react'
import { ActionButton } from 'seed-design/ui/action-button'
import { projects } from '../data/projects'

const deckSlugs = ['nest', 'joseon-cqb', 'writerclock', 'atlas-1939', 'flim']
const deck = deckSlugs.map((slug) => projects.find((project) => project.slug === slug)!).filter((project) => project.image)

export function HeroStack({ onOpenProject }: { onOpenProject: (slug: string) => void }) {
  const [front, setFront] = useState(0)
  const current = deck[front]

  const step = (delta: number) => setFront((index) => (index + delta + deck.length) % deck.length)

  return (
    <div className="hero-stack">
      <div className="hero-stack__cards">
        {deck.map((project, index) => {
          const depth = (index - front + deck.length) % deck.length
          return (
            <button
              key={project.slug}
              type="button"
              className="hero-stack__card"
              style={{ '--depth': depth } as React.CSSProperties}
              data-front={depth === 0 || undefined}
              aria-hidden={depth !== 0}
              tabIndex={depth === 0 ? 0 : -1}
              aria-label={`${project.name} 자세히 보기`}
              onClick={() => (depth === 0 ? onOpenProject(project.slug) : setFront(index))}
            >
              <img src={project.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
            </button>
          )
        })}
      </div>

      <div className="hero-stack__caption" aria-live="polite">
        <div className="hero-stack__text">
          <Text as="p" textStyle="t5Bold">
            {current.name}
          </Text>
          <Text as="p" textStyle="t3Regular" color="fg.neutralMuted" maxLines={2}>
            {current.tagline}
          </Text>
        </div>
        <div className="hero-stack__controls">
          <ActionButton variant="neutralWeak" size="small" layout="iconOnly" aria-label="이전 작업" onClick={() => step(-1)}>
            <Icon svg={<IconArrowLeftLine />} />
          </ActionButton>
          <Text textStyle="t3Medium" color="fg.neutralSubtle" aria-hidden="true">
            {front + 1} / {deck.length}
          </Text>
          <ActionButton variant="neutralWeak" size="small" layout="iconOnly" aria-label="다음 작업" onClick={() => step(1)}>
            <Icon svg={<IconArrowRightLine />} />
          </ActionButton>
        </div>
      </div>
    </div>
  )
}
