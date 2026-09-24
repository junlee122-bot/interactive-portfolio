export const profile = {
  name: '이승준',
  latinName: 'Seung Jun Lee',
  role: 'Product Builder',
  location: 'Seoul, KR',
  since: '2026.05',
  github: 'https://github.com/junlee122-bot',
  source: 'https://github.com/junlee122-bot/interactive-portfolio',
}

export const stats = [
  { value: '24', label: '공개 저장소' },
  { value: '567', label: '공개 저장소 커밋' },
  { value: '7', label: '라이브 배포' },
  { value: '5', label: '공모전·해커톤 출품' },
]

export interface ProcessStep {
  id: string
  name: string
  title: string
  description: string
  evidence: { slug: string; label: string }[]
}

export const processSteps: ProcessStep[] = [
  {
    id: '01',
    name: '문제',
    title: '누가, 어디서 막히는지부터 한 문장으로.',
    description:
      '기능 목록보다 “이 사람이 이 순간에 무엇을 모르는가”를 먼저 씁니다. 그 문장이 저장소 첫 줄이 되고, 이후 모든 판단의 기준이 됩니다.',
    evidence: [
      { slug: 'bid-shield', label: 'BID SHIELD: 수주 전 현금 공백' },
      { slug: 'nest', label: '둥지: 세입자가 모르는 책임 범위' },
    ],
  },
  {
    id: '02',
    name: '명세',
    title: '작업을 계약서처럼 쪼개서 AI 에이전트에게 맡깁니다.',
    description:
      'Claude Code와 Codex를 팀처럼 운용합니다. 범위, 완료 조건, 금지 사항을 적은 명세로 일을 나누고, 결과는 비평 문서로 되돌려 다음 라운드를 엽니다.',
    evidence: [
      { slug: 'joseon-cqb', label: 'JOSEON-CQB: 계약·비평 라운드' },
      { slug: 'raonjena', label: '라온제나: 정사·초안 분리' },
    ],
  },
  {
    id: '03',
    name: '검증',
    title: '기능보다 먼저 “깨졌음을 알려주는 장치”를 만듭니다.',
    description:
      '에이전트가 빠르게 만들수록 회귀도 빨라집니다. 결정론적 리플레이, 규칙 검증기, LLM 평가 케이스처럼 사람이 매번 확인하지 않아도 되는 게이트를 먼저 세웁니다.',
    evidence: [
      { slug: 'gongpo', label: 'GONGPO: 64개 규칙 검증기' },
      { slug: 'nest', label: '둥지: LLM 회귀 평가' },
      { slug: 'joseon-cqb', label: 'JOSEON-CQB: 바이트 동일 리플레이' },
    ],
  },
  {
    id: '04',
    name: '공개',
    title: '배포하고, 확인한 만큼만 말합니다.',
    description:
      '합성 데이터인지, 실행하지 않은 도구인지, 권리 검토 중인지를 화면과 README에 적습니다. 한계를 숨기지 않아야 다음 사람이 이어서 쓸 수 있습니다.',
    evidence: [
      { slug: 'helixforge', label: 'HelixForge: 결과별 출처 등급' },
      { slug: 'seokmun', label: '석문: 가상 데이터 고지' },
      { slug: 'writerclock', label: '작가시계: 권리 검토 후 배포' },
    ],
  },
]

export const navigation = [
  { id: 'work', label: '작업' },
  { id: 'index', label: '전체' },
  { id: 'process', label: '방식' },
  { id: 'log', label: '기록' },
  { id: 'contact', label: '연락' },
] as const
