import { ArrowUpRight, Brackets, Check, Spark } from '../components/Icons'

export function AboutSection() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-grid" aria-hidden="true" />
      <div className="about-topline"><span>03 / WORKING PRINCIPLES</span><span>THE THINKING BEHIND THE INTERFACE</span></div>

      <div className="about-layout reveal">
        <div className="about-portrait" aria-hidden="true">
          <span className="portrait-ring ring-one" /><span className="portrait-ring ring-two" />
          <span className="portrait-disc"><i>J</i><b>LEE / 26</b></span>
          <div className="portrait-data"><span>CRAFT</span><span>LOGIC</span><span>MOTION</span></div>
        </div>

        <div className="about-copy">
          <p className="about-eyebrow"><Spark size={15} /> A PRACTICE, NOT A CHECKLIST</p>
          <h2 id="about-title">좋은 구현은,<br /><em>좋은 질문에서 시작됩니다.</em></h2>
          <div className="about-paragraphs">
            <p>이 페이지에 담은 것은 완성된 경력의 목록보다, 제품 문제를 프런트엔드로 풀어 가는 작업 방식입니다. 사용자가 해야 할 일과 화면이 전달해야 할 상태를 먼저 구분합니다.</p>
            <p>화려한 표현을 선택할 때도 질문은 같습니다. 무엇을 더 잘 이해하게 하는가? 키보드나 작은 화면에서도 가능한가? 효과를 꺼도 중요한 정보가 남는가?</p>
          </div>
          <a href="https://github.com/junlee122-bot" target="_blank" rel="noreferrer" className="about-link">
            판단이 코드로 이어지는 과정 <ArrowUpRight size={17} />
          </a>
        </div>
      </div>

      <div className="about-principles reveal">
        <article><Brackets size={22} /><span>01 / MAKE STATE EXPLICIT</span><h3>상태를 추측하게 하지 않습니다.</h3><p>선택됨, 처리 중, 실패, 재시도를 다른 상태로 다룹니다. 인터페이스의 약속과 실제 데이터가 어긋나는 경계를 먼저 살핍니다.</p><small>QUESTION / 지금 사용자가 확실히 아는 것은?</small></article>
        <article><Spark size={22} /><span>02 / GIVE MOTION A JOB</span><h3>움직임에는 맡은 일이 있습니다.</h3><p>입력과 결과의 연결, 선택의 변화, 공간의 이동을 설명합니다. 움직임을 줄인 환경에서도 텍스트와 상태 표시는 남아야 합니다.</p><small>QUESTION / 이 효과를 빼면 무엇이 달라지는가?</small></article>
        <article><Check size={22} /><span>03 / SHOW THE BOUNDARY</span><h3>확인한 만큼만 말합니다.</h3><p>구현한 기능과 설계 제안, 목표와 측정 결과를 분리합니다. 남은 문제를 숨기기보다 다음에 어떤 조건으로 확인할지 적습니다.</p><small>QUESTION / 이 주장을 뒷받침하는 증거는?</small></article>
      </div>
    </section>
  )
}
