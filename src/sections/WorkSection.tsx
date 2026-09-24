import { SectionHeading } from '../components/SectionHeading'
import { ProjectCard } from '../components/ProjectCard'
import { projects, type Project } from '../data'

interface WorkSectionProps {
  onOpenProject: (project: Project) => void
}

export function WorkSection({ onOpenProject }: WorkSectionProps) {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title={
            <>
              세 개의 질문,
              <br />세 개의 작은 구현.
            </>
          }
          description="모두 개인 콘셉트 스터디입니다. 카드 안의 표본은 실제로 동작하는 React 코드이고, 아직 검증하지 않은 부분은 케이스 스터디에 따로 적었습니다."
        />
        <div className="work-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} onOpen={onOpenProject} />
          ))}
        </div>
      </div>
    </section>
  )
}
