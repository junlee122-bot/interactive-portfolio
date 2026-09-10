import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Github } from '../components/Icons'
import { MagneticLink } from '../components/MagneticLink'
import { SeoulClock } from '../components/SeoulClock'

const sourceUrl = 'https://github.com/junlee122-bot/interactive'

export function ContactSection() {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const resetTimerRef = useRef(0)

  useEffect(() => () => window.clearTimeout(resetTimerRef.current), [])

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(sourceUrl)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }

    window.clearTimeout(resetTimerRef.current)
    resetTimerRef.current = window.setTimeout(() => setCopyStatus('idle'), 2200)
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-radar" aria-hidden="true"><i /><i /><i /><b /></div>
      <div className="contact-topline"><span>05 / CONTINUE THE CONVERSATION</span><span><i /> START WITH A QUESTION</span></div>
      <div className="contact-content reveal">
        <p>GOOD COLLABORATION STARTS SMALL.</p>
        <h2 id="contact-title">풀고 싶은 문제,<br /><em>하나부터 이야기해요.</em></h2>
        <p className="contact-description">완성된 기획서가 아니어도 좋습니다. 어떤 사용자가 어디에서 막히는지, 어떤 경험을 더 낫게 만들고 싶은지. 그 질문에서 출발하고 싶습니다.</p>
        <div className="contact-actions">
          <MagneticLink href="https://github.com/junlee122-bot" className="contact-primary" target="_blank" cursorLabel="OPEN">
            <span>GITHUB에서<br />이어 보기</span><ArrowUpRight size={30} />
          </MagneticLink>
          <a href={sourceUrl} target="_blank" rel="noreferrer" className="contact-secondary">이 포트폴리오의 소스 <ArrowUpRight size={17} /></a>
        </div>
        <div className="contact-brief"><span>A USEFUL STARTING POINT</span><p>문제의 맥락 · 함께 확인할 범위 · 생각하고 있는 일정</p></div>
      </div>

      <div className="contact-details reveal">
        <div>
          <span>KEEP THIS PROJECT</span>
          <a href={sourceUrl} target="_blank" rel="noreferrer">junlee122-bot / interactive</a>
          <button type="button" onClick={copySource} aria-describedby="copy-status">
            {copyStatus === 'copied' ? <Check size={14} /> : <Copy size={14} />}
            {copyStatus === 'copied' ? '링크 복사 완료' : copyStatus === 'failed' ? '복사 실패' : '프로젝트 링크 복사'}
          </button>
          <span id="copy-status" className="sr-only" role="status" aria-live="polite">
            {copyStatus === 'copied' ? '프로젝트 소스 링크가 복사되었습니다.' : copyStatus === 'failed' ? '복사하지 못했습니다. 위 프로젝트 링크를 직접 열거나 복사해 주세요.' : ''}
          </span>
        </div>
        <div>
          <span>ONLINE</span>
          <a href="https://github.com/junlee122-bot" target="_blank" rel="noreferrer"><Github size={15} /> GITHUB <ArrowUpRight size={14} /></a>
          <a href="https://github.com/junlee122-bot/interactive" target="_blank" rel="noreferrer">SOURCE CODE <ArrowUpRight size={14} /></a>
        </div>
        <div>
          <span>BASED IN</span>
          <p>SEOUL, SOUTH KOREA<br /><SeoulClock /></p>
        </div>
      </div>
    </section>
  )
}
