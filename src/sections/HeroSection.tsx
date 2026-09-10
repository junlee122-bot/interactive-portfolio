import { ArrowDown, ArrowUpRight } from '../components/Icons'
import { HeroOrb } from '../components/HeroOrb'
import { MagneticLink } from '../components/MagneticLink'
import { SeoulClock } from '../components/SeoulClock'

interface HeroSectionProps {
  motionStopped?: boolean
}

export function HeroSection({ motionStopped = false }: HeroSectionProps) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-scanline" aria-hidden="true" />
      <div className="hero-side-label side-left"><span>PORTFOLIO / 2026</span><i /></div>
      <div className="hero-side-label side-right"><span>SCROLL TO EXPLORE</span><i /></div>

      <div className="hero-meta hero-meta-left">
        <span>FRONTEND / PRODUCT / INTERACTION</span>
        <span>SEOUL, SOUTH KOREA</span>
      </div>
      <div className="hero-meta hero-meta-right">
        <span>LOCAL SIGNAL</span>
        <SeoulClock />
      </div>

      <div className="hero-copy hero-sequence">
        <p className="hero-eyebrow hero-sequence-item"><span>LEE JUN</span><i />THINK CLEARLY. BUILD WITH INTENT.</p>
        <h1 id="hero-title">
          <span className="hero-line-mask"><span className="hero-line-inner">생각은 명확하게.</span></span>
          <span className="hero-line-mask"><span className="hero-line-inner">경험은 <em>감각적으로.</em></span></span>
        </h1>
        <div className="hero-description hero-sequence-item">
          <p>무엇을 만들지 묻고, 어떻게 작동해야 할지 정의합니다. React와 TypeScript로 그 판단을 구현하고, 작은 움직임으로 사용자의 다음 행동을 안내합니다.</p>
          <span>FROM PRODUCT QUESTIONS<br />TO TANGIBLE INTERFACES.</span>
        </div>
        <div className="hero-actions hero-sequence-item">
          <MagneticLink href="#work" className="button button-primary" cursorLabel="EXPLORE">
            <span>작업과 판단 살펴보기</span><ArrowDown size={18} />
          </MagneticLink>
          <MagneticLink href="https://github.com/junlee122-bot/interactive" className="button button-secondary" target="_blank" cursorLabel="SOURCE">
            <span>코드로 확인하기</span><ArrowUpRight size={18} />
          </MagneticLink>
        </div>
        <p className="hero-disclosure hero-sequence-item"><i /> 3개의 독립 콘셉트 스터디와 직접 조작할 수 있는 인터랙션 실험. 설계한 것과 구현한 것을 구분해 소개합니다.</p>
      </div>

      <HeroOrb paused={motionStopped} />

      <div className="proof-strip">
        <div><strong>03</strong><span>CONCEPT STUDIES<br />문제와 선택의 기록</span></div>
        <div><strong>LIVE</strong><span>INTERACTION LAB<br />직접 확인하는 동작</span></div>
        <div><strong>OPEN</strong><span>SOURCE AVAILABLE<br />코드까지 열어 둔 과정</span></div>
        <div className="proof-signal"><span>LOGIC INTO EXPERIENCE</span><b aria-hidden="true"><i /><i /><i /><i /><i /></b><em>EXPLORE THE SIGNAL</em></div>
      </div>
    </section>
  )
}
