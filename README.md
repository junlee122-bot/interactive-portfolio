# 이승준 · Portfolio

AI 코딩 에이전트를 팀처럼 운용해 아이디어를 배포까지 끌고 가는 이승준(Seung Jun Lee)의 포트폴리오입니다.
당근의 오픈소스 디자인 시스템 [SEED Design](https://github.com/daangn/seed-design)으로 만들었습니다.

- Live: https://interactive-portfolio-gules.vercel.app

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

- **Hero**: 실제 제품 스크린샷을 넘겨 보는 카드 스택과 공개 저장소 기준 요약 숫자
- **대표 작업**: 문제와 검증 과정이 분명한 6개 프로젝트 카드
- **전체 작업**: 분야별로 거를 수 있는 프로젝트 목록
- **프로젝트 다이얼로그**: 개요 / 만든 것 / 설계 / 한계 탭, 라이브·코드 링크
- **방식**: 문제 → 명세 → 검증 → 공개 단계와, 각 방식이 남아 있는 프로젝트로 바로 이동하는 근거 칩
- **주간 커밋 기록**: 공개 저장소 커밋을 주 단위로 모은 차트(툴팁, 방향키 이동, 표 보기)
- 자동/라이트/다크 색상 모드, `prefers-reduced-motion` 대응, 320px부터 반응형

## Content

- `src/data/projects.ts`: 프로젝트 내용. 공개 저장소와 공개 배포 화면에서 확인할 수 있는 내용만 적습니다.
- `src/data/profile.ts`: 프로필, 요약 숫자, 작업 방식
- `src/data/activity.ts`: 공개 저장소 `git log`에서 생성한 주간 커밋 수(AI 에이전트·협업자 커밋 포함)
- `public/work/`: 공개 배포 화면과 공개 저장소에 포함된 스크린샷

## Structure

- `seed-design/ui/`: `@seed-design/cli`로 추가한 SEED 스니펫 컴포넌트
- `src/sections/`: 페이지 섹션
- `src/components/`: 헤더, 카드, 다이얼로그 등
- `src/styles.css`: SEED 토큰(`--seed-*`) 위의 레이아웃 스타일
