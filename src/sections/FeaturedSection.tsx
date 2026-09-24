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
          description="문제가 선명하고 검증까지 끝까지 밀어붙인 여섯 개를 골랐습니다. 카드를 열면 무엇을 만들었는지, 어떻게 설계했는지, 어디가 아직인지까지 볼 수 있습니다."
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
