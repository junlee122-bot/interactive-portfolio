import { projects } from '../data'
import type { Project } from '../types'
import { ProjectCard } from '../components/ProjectCard'

interface WorkSectionProps {
  onOpenProject: (project: Project) => void
}

export function WorkSection({ onOpenProject }: WorkSectionProps) {
  return (
    <section className="work section-shell" id="work" aria-labelledby="work-title">
      <header className="section-heading reveal">
        <div className="section-kicker"><span>01</span><i />SELECTED QUESTIONS / CONSIDERED DECISIONS</div>
        <div className="section-heading-grid">
          <h2 id="work-title">보기 좋은 화면에서,<br /><em>설명할 수 있는 선택으로.</em></h2>
          <div>
            <p>추천을 이해하는 일, 제품을 탐색하는 일, 기억을 안전하게 남기는 일. 서로 다른 세 문제를 통해 인터페이스의 판단 기준을 탐구했습니다.</p>
            <span>SELF-DIRECTED CONCEPTS · IMPLEMENTATION SCOPE DISCLOSED</span>
          </div>
        </div>
      </header>

      <div className="work-reading-guide reveal" aria-label="케이스 스터디 읽는 순서">
        <span className="work-reading-label">INSIDE EACH CASE</span>
        <ol>
          <li><b>01</b><span>문제와 가설</span></li>
          <li><b>02</b><span>선택과 트레이드오프</span></li>
          <li><b>03</b><span>구현 범위와 다음 검증</span></li>
        </ol>
        <p>카드는 CSS 시각 스케치입니다. 실제 서비스 기능과 테스트 결과를 대신하지 않습니다.</p>
      </div>

      <div className="project-list">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} onOpen={onOpenProject} />)}
      </div>
      <div className="work-evidence-note reveal">
        <span>THE PORTFOLIO IS ALSO A PROTOTYPE.</span>
        <p>실제로 동작하는 입력과 상태 전환은 아래 Interaction Lab에서, 구현 방식은 공개 소스에서 확인할 수 있습니다.</p>
        <a href="#lab">직접 조작하며 확인하기 <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}
