# JUN.LEE — Interactive Product Portfolio

제품 질문, 명시적인 UI 상태, 인터랙션 구현을 한 흐름으로 보여 주는 React·TypeScript 포트폴리오입니다. 세 사례는 독립 콘셉트 스터디이며, 실제 구현된 데모와 후속 검증이 필요한 제안을 화면 안에서 구분합니다.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Highlights

- 드래그·키보드로 조작하는 IDEA → SYSTEM → MOTION 오브
- PULSE·ORBIT·MOMENT별 로컬 상태 전환 specimen
- 입력값과 모션 토큰을 직접 바꾸는 Interaction Lab
- native dialog 기반 케이스 스터디, 검색형 빠른 이동, 포커스 복귀
- viewport·탭 가시성에 따른 애니메이션/Canvas 작업 중단
- 전역 모션 정지와 `prefers-reduced-motion` 대체 표현
- 320px부터 데스크톱까지 이어지는 반응형 편집 레이아웃

## Structure

- `src/data.ts` — 사례와 프로세스 콘텐츠
- `src/sections/` — 페이지 내러티브 섹션
- `src/components/CaseSpecimen.tsx` — 사례별 조작 가능한 상태 표본
- `src/components/HeroOrb.tsx` — 포인터 캡처·키보드 입력을 지원하는 시그니처 오브
- `src/styles.css` — 디자인 토큰, 반응형 구성, 모션·저동작 규칙

## Scope

PULSE의 추천 API·오디오 재생, ORBIT의 WebGL 장면, MOMENT의 위치 수집·영구 저장은 연결되어 있지 않습니다. 해당 화면은 제품 판단과 상태 설계를 설명하기 위한 CSS/React 데모입니다.

프로젝트 내용은 `src/data.ts`, 프로필과 외부 링크는 각 `src/sections/` 파일에서 교체할 수 있습니다.
