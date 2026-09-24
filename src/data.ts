export type ProjectTone = 'brand' | 'informative' | 'positive'

export interface ProjectDecision {
  title: string
  description: string
  tradeoff: string
}

export interface Project {
  id: string
  slug: 'pulse' | 'orbit' | 'moment'
  name: string
  category: string
  year: string
  status: string
  role: string[]
  tone: ProjectTone
  headline: string
  summary: string
  question: string
  challenge: string
  hypothesis: string
  decisions: ProjectDecision[]
  engineering: string[]
  validation: string
  next: string
}

export interface ProcessStep {
  id: string
  name: string
  title: string
  description: string
  outputs: string[]
}

export interface Principle {
  label: string
  title: string
  description: string
  question: string
}

export const profile = {
  name: '이준',
  latinName: 'Jun Lee',
  role: 'Product Frontend Engineer',
  location: 'Seoul, KR',
  github: 'https://github.com/junlee122-bot',
  source: 'https://github.com/junlee122-bot/interactive-portfolio',
}

export const projects: Project[] = [
  {
    id: '01',
    slug: 'pulse',
    name: 'PULSE',
    category: '상황 기반 음악 탐색',
    year: '2026',
    status: '개인 콘셉트 스터디',
    role: ['문제 정의', '인터랙션 설계', 'UI 스터디'],
    tone: 'brand',
    headline: '취향을 맞히기 전에,\n추천의 이유를 보이게.',
    summary:
      '음악 추천의 문제를 정확도뿐 아니라 이해와 제어의 문제로 봤습니다. 상황을 조절하고, 그 입력이 추천에 어떻게 반영되는지 읽을 수 있는 인터페이스를 제안합니다.',
    question: '입력이 결과에 어떻게 반영되는지 사용자가 읽을 수 있을까?',
    challenge:
      '“내가 원하는 음악이 아니다”라는 반응만으로는 무엇을 바꿔야 할지 알기 어렵습니다. 원하는 분위기를 표현하고 추천의 근거를 확인하는 두 순간을 설계 과제로 잡았습니다.',
    hypothesis:
      '상황 기반 입력과 추천 이유를 함께 보여 주면 결과를 무작정 넘기기보다 입력을 수정하며 탐색할 수 있을 것입니다. 아직 사용자 테스트로 검증하지 않은 가설입니다.',
    decisions: [
      {
        title: '입력은 사용자의 언어로',
        description:
          '장르 분류를 먼저 요구하는 대신 에너지와 집중도 같은 상황 입력을 제안합니다. 추천 모델의 분류 체계를 배우기 전에 원하는 경험을 표현하게 하는 선택입니다.',
        tradeoff: '상황의 의미는 사람마다 다릅니다. 예시 프리셋과 직접 조정 중 어느 쪽이 더 잘 이해되는지 비교가 필요합니다.',
      },
      {
        title: '추천 이유는 결과 옆에',
        description:
          '입력과 연결되는 한 줄 설명을 결과 가까이에 둡니다. 이유는 실제 모델의 근거와 일치해야 하며, 그럴듯한 설명을 별도로 만들어서는 안 됩니다.',
        tradeoff: '모든 근거를 동시에 보여 주면 탐색을 방해합니다. 요약 한 줄과 선택적으로 펼치는 상세 정보의 균형이 필요합니다.',
      },
      {
        title: '움직임에도 대응 관계를',
        description:
          '파형을 분위기 표현에 활용하되 조작 결과는 수치와 텍스트로도 남깁니다. 카드 안의 슬라이더에서 입력값, 파형, 추천 이유 문장이 함께 바뀌는 것을 확인할 수 있습니다.',
        tradeoff: '파형이 커지는 것이 추천 품질이 높아졌다는 의미로 오해되지 않도록 강도와 품질을 구분해야 합니다.',
      },
    ],
    engineering: [
      '현재 구현: SEED Slider 두 개로 에너지·집중도를 입력하고, 파형과 추천 이유 문장을 같은 상태에서 파생합니다. 실제 오디오 재생·추천 API는 연결하지 않았습니다.',
      '접근성: 슬라이더마다 aria-label을 두고, 파형은 장식으로 처리해 수치와 문장만으로도 결과를 읽을 수 있게 했습니다.',
      '확장 시 필요한 상태: 입력 편집 / 요청 중 / 결과 / 빈 결과 / 오류. 이전 응답이 최신 입력을 덮지 않는 요청 처리도 필요합니다.',
    ],
    validation:
      '이 페이지에서 확인할 수 있는 것은 입력과 피드백의 대응 관계입니다. PULSE 제품의 추천 정확도, 사용성, 전환 효과는 측정하지 않았습니다.',
    next: '동일한 추천 결과에 대해 “이유 없음”과 “입력에 연결된 이유 있음”을 비교합니다. 사용자가 결과의 이유를 설명하고 다음 조정값을 스스로 고르는지 관찰합니다.',
  },
  {
    id: '02',
    slug: 'orbit',
    name: 'ORBIT',
    category: '공간형 제품 쇼룸',
    year: '2026',
    status: '개인 콘셉트 스터디',
    role: ['정보 설계', '공간 디렉션', 'UI 스터디'],
    tone: 'informative',
    headline: '몰입의 끝에,\n제품에 대한 이해가 남도록.',
    summary:
      '제품을 멋지게 회전시키는 것만으로는 선택을 돕기 어렵습니다. 형태·소재·디테일의 순서를 중심으로 공간 탐색과 읽을 수 있는 설명을 연결하는 쇼룸 구상입니다.',
    question: '자유로운 탐색 속에서도 핵심 정보를 놓치지 않게 할 수 있을까?',
    challenge:
      '사용자가 어디를 보고 있는지, 무엇을 더 확인할 수 있는지 놓치면 몰입은 탐색 비용이 됩니다. 장면의 자유도와 정보의 순서를 함께 다루는 것을 과제로 정했습니다.',
    hypothesis:
      '공간 장면과 텍스트 챕터가 같은 선택 상태를 공유하면 드래그에 익숙하지 않아도 핵심 제품 정보를 놓치지 않을 것입니다. 실제 3D 장면에서 검증할 가설입니다.',
    decisions: [
      {
        title: '카메라보다 정보 구조를 먼저',
        description:
          '형태·소재·디테일의 세 챕터를 기준으로 장면과 텍스트를 연결합니다. 자유 회전은 보조 탐색이고, 중요한 정보는 챕터 선택만으로도 접근할 수 있어야 합니다.',
        tradeoff: '완전히 자유로운 공간보다 연출의 우연성은 줄어듭니다. 대신 각 장면의 메시지와 종료 조건을 분명히 할 수 있습니다.',
      },
      {
        title: '조작에는 경계와 복귀점을',
        description:
          '회전 범위, 기본 시점, 선택된 챕터를 명시합니다. 카드 안의 오브젝트는 드래그·방향키로 회전하고, 챕터를 고르면 정해진 시점으로 돌아갑니다.',
        tradeoff: '제한된 회전은 일부 세부를 가릴 수 있습니다. 디테일 확대와 기본 시점 복귀를 독립된 동작으로 검토해야 합니다.',
      },
      {
        title: '장면이 없어도 설명은 남게',
        description:
          '실제 3D를 도입한다면 핵심 정보는 의미 있는 HTML에 유지하고 장면은 점진적으로 추가합니다. 정적 표현만으로도 제품의 특징을 읽을 수 있어야 합니다.',
        tradeoff: '3D와 정적 표현의 콘텐츠를 함께 관리해야 합니다. 같은 데이터 모델에서 두 표현을 만드는 구조가 필요합니다.',
      },
    ],
    engineering: [
      '현재 구현: CSS 3D 오브젝트와 SEED SegmentedControl이 하나의 챕터 상태를 공유합니다. WebGL·3D 모델·카메라 렌더러는 포함하지 않았습니다.',
      '입력: Pointer Events와 pointer capture로 드래그 회전, 방향키로 같은 회전을 지원합니다. 회전 범위는 ±50°로 제한합니다.',
      '확장 시 검증할 항목: 실제 기기별 프레임 시간, 자산 로딩 실패, 화면 밖 렌더링 중단, 정적 대체 콘텐츠의 동등성.',
    ],
    validation:
      '현재 확인 범위는 CSS 시각 스케치와 챕터-장면 동기화입니다. 쇼룸의 3D 성능이나 구매 효과를 검증한 결과는 없습니다.',
    next: '정적 페이지와 가이드형 공간 탐색에서 사용자가 소재와 핵심 특징을 얼마나 정확히 찾아 설명하는지 비교합니다. 보급형 모바일의 프레임 시간도 별도로 측정합니다.',
  },
  {
    id: '03',
    slug: 'moment',
    name: 'MOMENT',
    category: '여행 기록 · 신뢰와 맥락',
    year: '2026',
    status: '개인 콘셉트 스터디',
    role: ['사용자 흐름', '상태 설계', 'UI 스터디'],
    tone: 'positive',
    headline: '기록은 가볍게,\n공개 범위는 분명하게.',
    summary:
      '여행 중에는 빠르게 남기고, 돌아온 뒤에는 장소와 감정을 따라 다시 읽는 기록 경험입니다. 편리함을 위해 위치 공개와 저장 상태를 숨기지 않는 방향을 탐구합니다.',
    question: '“잘 저장됐는가”와 “누가 볼 수 있는가”를 추측하지 않게 할 수 있을까?',
    challenge:
      '이동 중 입력 부담과 기록의 풍부함은 충돌합니다. 불안정한 네트워크와 민감한 위치 정보까지 고려해 저장과 공개 상태를 추측하지 않게 만드는 것이 과제입니다.',
    hypothesis:
      '즉시 기록과 나중 보완을 분리하고 저장·공개 상태를 눈에 보이게 두면 입력 부담과 공유 불안을 줄일 수 있을 것입니다. 구현 전 검증이 필요한 가설입니다.',
    decisions: [
      {
        title: '빠른 기록과 풍부한 회고를 분리',
        description:
          '처음에는 사진과 짧은 메모만 남기고 위치·동행자·긴 이야기는 나중에 연결하는 흐름입니다. 기록을 중단하지 않고 남길 수 있는 최소 단위를 먼저 정합니다.',
        tradeoff: '나중 보완이 이뤄지지 않으면 정보가 적게 남습니다. 알림을 늘리기보다 불완전한 기록도 유용하게 읽히는 기본 구성이 필요합니다.',
      },
      {
        title: '저장과 공유를 다른 상태로',
        description:
          '기기에 저장됨, 서버에 동기화됨, 다른 사람에게 공개됨을 별개의 상태로 다룹니다. “저장 완료”가 “공유 완료”처럼 읽히지 않도록 문구의 역할을 나눕니다.',
        tradeoff: '상태가 늘수록 복잡해집니다. 기본은 간결하게, 실패·충돌처럼 행동이 필요한 때에만 상세를 노출하는 방향입니다.',
      },
      {
        title: '위치는 맥락이지 기본 공개값이 아님',
        description:
          '정밀 위치는 기본 비공개로 둡니다. 공개 범위는 기록 가까이 표시하고, 공유 시점에 포함되는 위치 수준을 다시 확인하도록 제안합니다.',
        tradeoff: '공유가 한 단계 길어질 수 있습니다. 안전에 중요한 확인과 반복적으로 방해하는 확인을 실제 흐름에서 구분해야 합니다.',
      },
    ],
    engineering: [
      '현재 구현: 저장 위치(기기/동기화)와 공개 범위(나만/친구/전체)를 서로 다른 상태로 두고, 조합에 따라 SEED Badge와 Callout 문구가 바뀝니다.',
      '확장 시 필요한 구조: 로컬 저장 확인과 원격 동기화 상태의 분리, 재시도 작업 큐, 충돌 시 원본 보존.',
      '확장 시 필요한 안전 조건: 서버의 접근 권한 검사, 위치 권한 거절 처리, 공개 범위 변경의 일관성. UI 표시만으로 권한을 보장할 수 없습니다.',
    ],
    validation:
      '현재 사례는 기록·장소·공개 상태를 어떻게 함께 읽게 할지에 대한 구상입니다. 오프라인 저장, 동기화, 공동 편집, 권한 제어는 구현하지 않았습니다.',
    next: '네트워크 끊김, 권한 거절, 중복 저장, 동기화 충돌을 먼저 프로토타이핑합니다. 사용자가 “어디에 저장됐고 누가 볼 수 있는지”를 화면만 보고 설명하는지 확인합니다.',
  },
]

export const processSteps: ProcessStep[] = [
  {
    id: '01',
    name: 'Frame',
    title: '무엇을 바꾸려는지 한 문장으로 좁힙니다.',
    description:
      '사용자의 현재 행동, 겪는 어려움, 바꾸고 싶은 결과를 분리합니다. 확인된 사실과 아직 검증하지 않은 가설을 같은 문장에 섞지 않는 것이 출발점입니다.',
    outputs: ['맥락과 제약', '명시적인 가설', '성공 기준'],
  },
  {
    id: '02',
    name: 'Model',
    title: '정상 화면보다 상태 사이의 경계를 봅니다.',
    description:
      '입력과 결과뿐 아니라 요청 중, 빈 결과, 실패, 재시도를 함께 정리합니다. 모션은 이 상태들이 어떻게 연결되는지 설명할 때만 역할을 부여합니다.',
    outputs: ['상태 전이', '실패와 복구', '모션의 의도'],
  },
  {
    id: '03',
    name: 'Build',
    title: '가장 불확실한 동작부터 코드로 만듭니다.',
    description:
      '핵심 입력과 피드백을 작은 단위로 구현하고 키보드와 터치에서도 같은 과업을 수행할 수 있게 합니다. 장식 효과는 기본 동작 위에 점진적으로 더합니다.',
    outputs: ['타입이 있는 UI 상태', '의미 있는 컨트롤', '점진적 향상'],
  },
  {
    id: '04',
    name: 'Verify',
    title: '작동한다는 말에 확인 범위를 붙입니다.',
    description:
      '어떤 화면·입력·조건을 확인했는지 기록하고 남은 위험을 구분합니다. 목표 성능과 측정값, 개인의 판단과 사용자의 반응을 혼동하지 않습니다.',
    outputs: ['관찰 가능한 증거', '알려진 한계', '다음 실험'],
  },
]

export const principles: Principle[] = [
  {
    label: 'Make state explicit',
    title: '상태를 추측하게 하지 않습니다.',
    description:
      '선택됨, 처리 중, 실패, 재시도를 다른 상태로 다룹니다. 인터페이스의 약속과 실제 데이터가 어긋나는 경계를 먼저 살핍니다.',
    question: '지금 사용자가 확실히 아는 것은?',
  },
  {
    label: 'Give motion a job',
    title: '움직임에는 맡은 일이 있습니다.',
    description:
      '입력과 결과의 연결, 선택의 변화, 공간의 이동을 설명합니다. 움직임을 줄인 환경에서도 텍스트와 상태 표시는 남아야 합니다.',
    question: '이 효과를 빼면 무엇이 달라지는가?',
  },
  {
    label: 'Show the boundary',
    title: '확인한 만큼만 말합니다.',
    description:
      '구현한 기능과 설계 제안, 목표와 측정 결과를 분리합니다. 남은 문제를 숨기기보다 다음에 어떤 조건으로 확인할지 적습니다.',
    question: '이 주장을 뒷받침하는 증거는?',
  },
]

export const navigation = [
  { id: 'work', label: '작업' },
  { id: 'process', label: '과정' },
  { id: 'lab', label: '실험실' },
  { id: 'contact', label: '연락' },
] as const
