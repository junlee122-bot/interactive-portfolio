# 이준 — Interactive Product Portfolio

질문에서 시작해 상태로 설계하고, 인터랙션으로 증명하는 React · TypeScript 포트폴리오입니다.
당근의 오픈소스 디자인 시스템 [SEED Design](https://github.com/daangn/seed-design)으로 처음부터 다시 만들었습니다.

## Run locally

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## What's inside

- **Hero device**: SEED ChipTabs로 전환하는 세 가지 미니 데모(질문 문장 만들기, 저장 상태 전이, 모션 on/off)
- **Work**: 사례마다 직접 조작할 수 있는 표본이 붙어 있습니다.
  - PULSE: SEED Slider 입력 → 파형과 추천 이유 문장이 같은 상태에서 파생
  - ORBIT: SegmentedControl 챕터와 드래그·방향키 회전이 하나의 상태를 공유
  - MOMENT: 저장(기기/백업)과 공개 범위(나만/친구/전체)를 분리한 상태 설계, Badge·Callout으로 표시
- **Case study dialog**: SEED ContentDialog + Tabs(개요/결정/구현/검증), 다음 사례 이동, 닫을 때 포커스 복귀
- **Process**: 키보드로 이동하는 단계 탭과 작업 원칙
- **State lab**: 검색 요청의 대기/요청 중/결과/빈 결과/오류 상태와, 늦게 도착한 응답이 최신 결과를 덮는 경쟁 상태를 직접 재현
- **Theming**: SEED `data-seed-color-mode`로 자동/라이트/다크 전환(선택값 저장, 첫 페인트 전 적용)
- `prefers-reduced-motion` 대응, 320px부터 데스크톱까지 반응형

## Structure

- `seed-design/ui/` — `@seed-design/cli`로 추가한 SEED 스니펫 컴포넌트(ActionButton, Chip, Tabs, Dialog, Snackbar 등)
- `src/data.ts` — 프로필, 사례, 과정, 원칙 콘텐츠
- `src/sections/` — 페이지 섹션
- `src/specimens/` — 사례별 조작 가능한 표본
- `src/components/` — 헤더, 히어로 기기, 프로젝트 카드, 케이스 스터디 다이얼로그
- `src/styles.css` — SEED 토큰(`--seed-*`) 위에 얹은 레이아웃 스타일

새 SEED 컴포넌트는 다음처럼 추가합니다.

```bash
pnpm dlx @seed-design/cli@latest add ui:<component>
```

## Scope

세 사례는 개인 콘셉트 스터디입니다. PULSE의 추천 API·오디오 재생, ORBIT의 WebGL 장면, MOMENT의 위치 수집·동기화·권한 제어는 연결되어 있지 않으며, 화면의 표본은 제품 판단과 상태 설계를 설명하기 위한 React 데모입니다.
