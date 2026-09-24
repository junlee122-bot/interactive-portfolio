import IconArrowDownLine from '@karrotmarket/react-monochrome-icon/IconArrowDownLine'
import IconArrowUpRightLine from '@karrotmarket/react-monochrome-icon/IconArrowUpRightLine'
import IconLocationpinLine from '@karrotmarket/react-monochrome-icon/IconLocationpinLine'
import { Badge, Icon, SuffixIcon } from '@seed-design/react'
import { ActionButton } from 'seed-design/ui/action-button'
import { HeroDevice } from '../components/HeroDevice'
import { profile } from '../data'

export function HeroSection() {
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

          <h1 id="hero-title" className="hero__title">
            질문에서 시작해
            <br />
            <span className="hero__title-accent">상태로 설계하고,</span>
            <br />
            인터랙션으로 증명합니다.
          </h1>

          <p className="hero__lead">
            안녕하세요, 프런트엔드 엔지니어 {profile.name}입니다. 사용자가 해야 할 일과 화면이 전달해야 할 상태를 먼저
            구분하고, 키보드·작은 화면·줄인 모션에서도 같은 경험이 남도록 만듭니다.
          </p>

          <div className="hero__actions">
            <ActionButton asChild variant="brandSolid" size="large">
              <a href="#work">
                작업 살펴보기
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

          <p className="hero__note">
            <Icon svg={<IconLocationpinLine />} size="x4" />
            이 사이트는 당근의 오픈소스 디자인 시스템 SEED Design으로 다시 만들었습니다.
          </p>
        </div>

        <HeroDevice />
      </div>
    </section>
  )
}
