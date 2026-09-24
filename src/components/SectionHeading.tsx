import { Text } from '@seed-design/react'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="section-heading reveal">
      <Text as="p" textStyle="t4Bold" color="fg.brand">
        {eyebrow}
      </Text>
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {description && (
        <Text as="p" textStyle="t5Regular" color="fg.neutralMuted" className="section-heading__description">
          {description}
        </Text>
      )}
    </div>
  )
}
