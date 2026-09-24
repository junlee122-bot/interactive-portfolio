import IconArrowDownLine from '@karrotmarket/react-monochrome-icon/IconArrowDownLine'
import IconArrowUpRightLine from '@karrotmarket/react-monochrome-icon/IconArrowUpRightLine'
import { Badge, SuffixIcon } from '@seed-design/react'
import { ActionButton } from 'seed-design/ui/action-button'
import { HeroStack } from '../components/HeroStack'
import { profile, stats } from '../data/profile'

export function HeroSection({ onOpenProject }: { onOpenProject: (slug: string) => void }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__badges">
            <Badge tone="brand" variant="weak" size="large">
              {profile.role}
            </Badge>
            <Badge tone="neutral" variant="outline" size="large">
              {profile.location}
            </Badge>
          </div>

          <p className="hero__name">
            {profile.name} <span>{profile.latinName}</span>
          </p>
          <h1 id="hero-title" className="hero__title">
            아이디어를
            <br />
            <span className="hero__title-accent">배포까지</span> 끌고 갑니다.
          </h1>

          <p className="hero__lead">
            {profile.since}부터 AI 코딩 에이전트를 팀처럼 운용해 앱, 게임, 데이터 도구, 아카이브를 만들어 왔습니다. 문제를 정하고,
            작업을 명세로 나눠 맡기고, 검증 장치로 결과를 확인하고, 한계까지 적어 공개하는 일을 제가 맡습니다.
          </p>

          <div className="hero__actions">
            <ActionButton asChild variant="brandSolid" size="large">
              <a href="#work">
                작업 보기
                <SuffixIcon svg={<IconArrowDownLine />} />
              </a>
            </ActionButton>
            <ActionButton asChild variant="neutralWeak" size="large">
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
                <SuffixIcon svg={<IconArrowUpRightLine />} />
              </a>
            </ActionButton>
          </div>

          <dl className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroStack onOpenProject={onOpenProject} />
      </div>
    </section>
  )
}
