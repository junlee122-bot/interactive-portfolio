export type ProjectAccent = 'acid' | 'violet' | 'coral'

export interface ProjectDecision {
  title: string
  description: string
  tradeoff: string
}

export interface Project {
  id: string
  slug: string
  name: string
  category: string
  year: string
  status: string
  role: string
  accent: ProjectAccent
  headline: string
  summary: string
  challenge: string
  hypothesis: string
  focus: string[]
  target: string
  targetLabel: string
  decisions: ProjectDecision[]
  engineering: string[]
  validation: string
  next: string
}

export interface ProcessStep {
  id: string
  name: string
  title: string
  description: string
  outputs: string[]
}
