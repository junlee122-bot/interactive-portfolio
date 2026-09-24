import type { Project } from '../data'
import { MomentSpecimen } from './MomentSpecimen'
import { OrbitSpecimen } from './OrbitSpecimen'
import { PulseSpecimen } from './PulseSpecimen'

export function ProjectSpecimen({ slug }: { slug: Project['slug'] }) {
  if (slug === 'pulse') return <PulseSpecimen />
  if (slug === 'orbit') return <OrbitSpecimen />
  return <MomentSpecimen />
}
