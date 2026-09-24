import { FeaturedCard } from '../components/FeaturedCard'
import { SectionHeading } from '../components/SectionHeading'
import { featuredProjects } from '../data/projects'

export function FeaturedSection({ onOpenProject }: { onOpenProject: (slug: string) => void }) {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="대표 작업"
          description="앱, 공모전 출품작, 게임, 연구 도구 중에서 문제와 검증 과정이 가장 분명한 여섯 개를 골랐습니다. 카드를 누르면 만든 것, 설계, 한계를 볼 수 있습니다."
        />
        <div className="featured-grid">
          {featuredProjects.map((project) => (
            <FeaturedCard key={project.slug} project={project} onOpen={onOpenProject} />
          ))}
        </div>
      </div>
    </section>
  )
}
