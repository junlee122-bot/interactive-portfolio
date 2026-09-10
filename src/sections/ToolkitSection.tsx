const toolkitGroups = [
  { id: '01', title: 'STATE & STRUCTURE', thesis: '상태는 명시적으로, 구조는 읽기 쉽게.', items: ['React / TypeScript', 'Typed project data', 'Native dialog & buttons'], evidence: '프로젝트 데이터와 화면 표현을 분리하고, 선택된 사례를 하나의 상태로 관리합니다.', boundary: '타입은 런타임 데이터 검증을 대신하지 않습니다.' },
  { id: '02', title: 'INPUT & FEEDBACK', thesis: '입력의 결과가 손끝에서 이어지도록.', items: ['Pointer Events', 'requestAnimationFrame', 'CSS custom properties'], evidence: '오브의 드래그와 랩의 입력값이 시각 피드백으로 이어집니다. 프레임 단위 포인터 갱신은 React 렌더와 분리합니다.', boundary: '드래그만 요구하지 않고 버튼과 키보드 경로를 둡니다.' },
  { id: '03', title: 'ACCESS & CONTROL', thesis: '효과가 달라도 같은 정보를 전달하도록.', items: ['Keyboard navigation', 'Focus management', 'prefers-reduced-motion'], evidence: '대화상자의 닫기·포커스 복귀, 명시적인 입력 이름, 움직임 줄이기 분기를 코드에 포함합니다.', boundary: '이 구현이 접근성 전체의 적합성 인증을 의미하지는 않습니다.' },
  { id: '04', title: 'RENDERING & DELIVERY', thesis: '작은 의존성과 명확한 실행 경계.', items: ['Vite production build', 'IntersectionObserver', 'Canvas 2D / visibility'], evidence: '진입 감지에는 observer를, 장식용 파티클에는 Canvas를 사용합니다. 숨겨진 탭에서는 파티클 갱신을 중단합니다.', boundary: '성능 점수는 실제 측정 환경과 함께 제시해야 합니다.' },
]

export function ToolkitSection() {
  return (
    <section className="toolkit section-shell" aria-labelledby="toolkit-title">
      <div className="toolkit-heading reveal">
        <span>ENGINEERING NOTES / THIS VERY PAGE</span>
        <h2 id="toolkit-title">도구의 이름보다,<br /><em>선택한 이유.</em></h2>
        <p>이 포트폴리오도 하나의 구현 사례입니다. 어떤 기술을 썼는지에 더해 무엇을 해결하고, 어디까지 책임지는지 적었습니다.</p>
      </div>
      <div className="toolkit-grid reveal">
        {toolkitGroups.map((group) => (
          <article key={group.id}>
            <header><span>{group.id}</span><strong>{group.title}</strong><i /></header>
            <h3 className="toolkit-thesis">{group.thesis}</h3>
            <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="toolkit-evidence">{group.evidence}</p>
            <p className="toolkit-boundary"><span>DESIGN BOUNDARY</span>{group.boundary}</p>
          </article>
        ))}
      </div>
      <a className="toolkit-source reveal" href="https://github.com/junlee122-bot/interactive" target="_blank" rel="noreferrer">설명과 구현을 나란히 확인하기 <span aria-hidden="true">↗</span></a>
    </section>
  )
}
