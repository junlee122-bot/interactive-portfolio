export type ProjectCategory = 'ai' | 'data' | 'game' | 'archive'

export interface ProjectLink {
  label: string
  href: string
}

export interface ProjectDetail {
  title: string
  body: string
}

export interface Project {
  slug: string
  name: string
  tagline: string
  period: string
  category: ProjectCategory
  /** Short facts shown as badges: context, status. */
  badges: string[]
  featured?: boolean
  image?: string
  imageAlt?: string
  stack: string[]
  numbers?: { value: string; label: string }[]
  problem: string
  built: string[]
  engineering: ProjectDetail[]
  limits: string[]
  credit?: string
  links: ProjectLink[]
}

export const categoryLabels: Record<ProjectCategory, string> = {
  ai: 'AI 제품',
  data: '데이터·의사결정',
  game: '게임·인터랙티브',
  archive: '아카이브·콘텐츠',
}

const gh = (repo: string) => `https://github.com/junlee122-bot/${repo}`

export const projects: Project[] = [
  {
    slug: 'clockwise',
    name: 'Clockwise',
    tagline: '남은 시간을 입력하면, 그 시간에 딱 맞는 진짜 코스를 짜 주는 모바일 앱.',
    period: '2026.05 – 06',
    category: 'data',
    badges: ['모바일 앱', '한국관광공사 2026 관광 프롬프톤 출품'],
    featured: true,
    image: '/work/clockwise.jpg',
    imageAlt: 'Clockwise 개발 업데이트 노트 첫 화면',
    stack: ['React Native', 'Supabase', 'Kakao Local API', 'Google Maps SDK', 'TourAPI'],
    numbers: [
      { value: '2,275', label: '검증 음식점' },
      { value: '5,452', label: '6개 지역 관광 데이터' },
      { value: '78,180', label: '30일 집중률 예측 행' },
    ],
    problem:
      '“2시간, 2명, 데이트”처럼 조건만 고르면 광고가 아닌 검증된 장소로 시간에 맞는 동선을 만들어 주는 것이 목표였습니다. 추천의 근거가 될 데이터를 직접 모으고 합치는 일이 핵심이었습니다.',
    built: [
      '시간(30분~24시간)·인원·카테고리·위치로 코스를 자동 생성하는 추천 엔진과 결과 타임라인·셔플',
      'SK 통화량 인기 가게, 행안부 모범음식점, 30년 노포를 좌표 50m + 이름 매칭으로 합친 검증 음식점 풀',
      '관광공사 TourAPI로 서울·제주·부산·강원·경주·인천 6개 지역 확장, 한국 SVG 지도 메인 화면',
      '무장애 여행 1,568곳, 반려동물 동반 213곳, 두루누비 둘레길 261개 코스, 30일 혼잡 예측 반영',
    ],
    engineering: [
      {
        title: '11종 공공·민간 데이터를 하나의 풀로',
        body: '출처가 다른 데이터가 같은 식당을 가리키면 sources 배열에 모두 기록하고, 코스 결과에 검증 뱃지로 드러냈습니다.',
      },
      {
        title: '제약을 우회하는 작은 해법',
        body: 'React Native에는 DOMParser가 없어 GPX 좌표를 정규식으로 파싱하고 300포인트로 다운샘플해 코스마다 미니 지도를 그렸습니다.',
      },
      {
        title: '키가 새지 않는 사진 파이프라인',
        body: 'Google Places 사진을 한 번 받아 Supabase Storage에 저장해, 앱에는 외부 API 키가 노출되지 않게 했습니다.',
      },
    ],
    limits: [
      '앱 저장소는 비공개입니다. 공개된 개발 업데이트 노트로 과정을 확인할 수 있습니다.',
      '장소 간 이동 시간은 실제 경로가 아니라 거리(Haversine) 기반 추정입니다.',
    ],
    links: [{ label: '개발 업데이트 노트', href: gh('clockwise-updates') }],
  },
  {
    slug: 'nest',
    name: '둥지 Nest',
    tagline: '자취생의 집 문제를 사진 한 장으로: 응급처치, 책임 판단, 집주인에게 보낼 문구까지.',
    period: '2026.06 – 07',
    category: 'ai',
    badges: ['라이브', '2026 K-AI 콘텐츠 공모전 Track B 출품'],
    featured: true,
    image: '/work/nest.jpg',
    imageAlt: '둥지 Nest 인터랙티브 쇼케이스 화면',
    stack: ['Next.js', 'TypeScript', 'Claude API', 'Tailwind', 'framer-motion', 'Vercel'],
    numbers: [
      { value: '8', label: 'LLM 회귀 평가 케이스' },
      { value: '55', label: '단위 테스트' },
      { value: '4', label: '생활 도우미 입구' },
    ],
    problem:
      '곰팡이·누수·보일러 같은 문제가 생겼을 때 청년 세입자는 무엇부터 해야 하는지, 누가 고쳐야 하는지 모르는 경우가 많습니다. 정보가 부족한 사람이 자기 권리를 알고 바로 행동하게 돕는 것이 목표였습니다.',
    built: [
      '사진·텍스트 입력 → 셀프 응급처치 → 집주인/세입자 책임 판단(민법 조항 근거) → 정중/단호 문구 3단 응답',
      '임대차계약서 독소조항 체커(베타), 에어컨 전기요금 계산, 혼밥 장보기 코치',
      '공공데이터(국토부 실거래가, KAMIS 가격 등)로 AI 답변을 보강하고, 실패 시 대체 경로를 둠',
      '심사위원용 90초 인터랙티브 쇼케이스',
    ],
    engineering: [
      {
        title: 'LLM도 회귀 테스트한다',
        body: '책임 판단, 가스 누출 같은 긴급 상황 처리, 말투 규칙을 확인하는 평가 하네스(evals/)를 만들어 프롬프트를 바꿀 때마다 돌렸습니다.',
      },
      {
        title: '엔진 하나, 입구 넷',
        body: '같은 작업 화면에 주제별 시스템 프롬프트만 바꿔 끼우는 구조로 기능을 늘려도 UI와 품질 기준이 흩어지지 않게 했습니다.',
      },
      {
        title: '계산은 AI에게 맡기지 않기',
        body: '누진 전기요금은 결정론적 계산 엔진으로 처리하고, IP별 요청 제한으로 API 비용을 묶었습니다.',
      },
    ],
    limits: [
      '오픈뱅킹 지출 분석은 테스트베드 모의 계좌로만 동작하는 개념 증명입니다.',
      '법률 판단은 참고 정보이며, 실제 분쟁은 전문가 상담이 필요하다고 화면에서 안내합니다.',
    ],
    links: [
      { label: '라이브', href: 'https://nest-jv3h.vercel.app' },
      { label: '쇼케이스', href: 'https://nest-jv3h.vercel.app/showcase' },
      { label: '코드', href: gh('Nest') },
    ],
  },
  {
    slug: 'joseon-cqb',
    name: 'JOSEON-CQB',
    tagline: '조선 후기 목조 건축 속 브라우저 FPS. 창호지와 흙벽은 엄폐물이 아니다.',
    period: '2026.07 – 09',
    category: 'game',
    badges: ['플레이 가능 빌드', '218 커밋'],
    featured: true,
    image: '/work/joseon-cqb.jpg',
    imageAlt: 'JOSEON-CQB 게임 화면. 조선 목조 건물이 늘어선 마당',
    stack: ['three.js', 'Vanilla JS', 'Vite', 'Playwright', 'node:test'],
    numbers: [
      { value: '11/11', label: '재실행 시 바이트 동일한 샷' },
      { value: '30', label: '재질×무기 관통 조합 고정' },
      { value: '0', label: '플레이 중 셰이더 컴파일' },
    ],
    problem:
      '재질마다 관통이 달라지는 전투를 만들려면, 한 번 맞춘 감각이 다음 수정에서 깨지지 않아야 합니다. 그래서 게임보다 먼저 “바뀌지 않았음을 증명하는 장치”를 만들었습니다.',
    built: [
      '그레이박스 맵 1개, 무기 3종, 재질별 관통 탄도, 총구화염·데칼·예광 등 FX',
      '텍스처와 메시를 모두 코드로 생성해 외부 에셋 라이선스 문제가 없음',
      'BVH·CCD 기반 강체 물리 레이어',
    ],
    engineering: [
      {
        title: '결정론적 리플레이',
        body: 'resetState() 뒤 상태가 부팅 직후와 바이트 단위로 같도록 RNG·파티클 풀·데칼 슬롯까지 복원 범위를 정하고, 기준 11샷을 두 번 돌려 비교합니다.',
      },
      {
        title: '게이트가 없으면 병합하지 않는다',
        body: '관통 마진, 셰이더 예열, 시각 구별 축 등 18개 안팎의 감사 도구를 두고, 각 게이트가 실패도 잡아내는지 음성 테스트를 함께 요구했습니다.',
      },
      {
        title: 'AI 에이전트에게 계약서로 발주',
        body: '작업을 계약 문서(docs/contracts)로 쪼개 AI 에이전트에게 맡기고, 라운드마다 비평 문서로 결과를 검수하는 방식으로 진행했습니다.',
      },
    ],
    limits: [
      '배포된 빌드는 확인용이며 게이트 검증 대상이 아니라고 화면 상단에 표시합니다.',
      '캐릭터·적 AI·사운드는 아직 없는 v0 단계입니다.',
    ],
    links: [
      { label: '플레이', href: 'https://joseon-cqb.vercel.app/' },
      { label: '코드', href: gh('fps') },
    ],
  },
  {
    slug: 'helixforge',
    name: 'HelixForge AI',
    tagline: '실제 과학 도구를 호출하는 멀티 에이전트 신약개발 워크벤치. 모든 결과에 출처 등급을 붙입니다.',
    period: '2026.07',
    category: 'ai',
    badges: ['AI 신약개발 경진대회 융합 부문 출품'],
    featured: true,
    stack: ['FastAPI', 'Python', 'RDKit', 'PyTDC', 'React', 'Docker'],
    numbers: [
      { value: '17', label: '결정론적 에이전트' },
      { value: '394', label: 'pytest 테스트' },
      { value: '6', label: '오류 주입 자가 교정 데모' },
    ],
    problem:
      'AI가 그럴듯한 분자와 표적을 말해도, 어디까지가 실제 도구의 계산이고 어디부터가 추정인지 모르면 연구에 쓸 수 없습니다. 출처가 드러나는 의사결정 보조 도구를 목표로 했습니다.',
    built: [
      'PubMed·ChEMBL·ClinicalTrials.gov 실시간 조회, RDKit·PyTDC 로컬 계산',
      '표적 발굴 → 분자 분석 → 안전성 스크리닝 → 임상·허가 계획까지 이어지는 에이전트 파이프라인',
      '네트워크 없이 시연할 수 있는 기록·재생 모드',
    ],
    engineering: [
      {
        title: '결과마다 출처 등급',
        body: 'REAL_TOOL_OUTPUT, CONFIGURED_BUT_NOT_RUN처럼 모든 출력에 출처 유형을 달아, 실행하지 않은 도구를 실행한 것처럼 보이지 않게 했습니다.',
      },
      {
        title: '틀린 걸 스스로 잡는 Critic',
        body: '의도적으로 오류를 주입한 6가지 시나리오에서 Critic 에이전트가 결과를 되돌리고 교정하는지 확인합니다.',
      },
      {
        title: '회고적 재발견 벤치',
        body: 'EGFR/비소세포폐암 사례로, 이미 알려진 답을 시스템이 다시 찾아내는지 평가하는 벤치를 두었습니다.',
      },
    ],
    limits: [
      'AutoDock Vina·REINVENT4는 설치 전까지 “설정됨, 미실행” 상태이며 ADMET 모델은 휴리스틱 기준선입니다.',
      '연구 의사결정 보조 도구이며 임상적 판단을 대신하지 않습니다.',
    ],
    links: [{ label: '코드', href: gh('med') }],
  },
  {
    slug: 'seokmun',
    name: '석문 Studio',
    tagline: '여러 비석과 탁본을 나란히 열고, 검증된 근거만으로 글자 복원 가설을 세우는 연구 도구.',
    period: '2026.07',
    category: 'archive',
    badges: ['연구 도구 프로토타입', '가상 데모 데이터'],
    featured: true,
    image: '/work/seokmun.jpg',
    imageAlt: '석문 Studio에서 고구려·초기 신라 비문을 비교하는 화면',
    stack: ['Next.js', 'React Three Fiber', 'Fastify', 'SQLite', 'Zod', 'Playwright'],
    numbers: [
      { value: '65+', label: '엔진 테스트' },
      { value: '38', label: 'API 테스트' },
      { value: '3D', label: '사광·돋보기 판독 뷰' },
    ],
    problem:
      '손상된 비문은 한 글자를 읽는 데에도 여러 판본과 문헌을 오가야 합니다. 비교는 쉽게, 주장은 근거가 있을 때만 하도록 만드는 것이 목표였습니다.',
    built: [
      '비석·조각·탁본·판독문을 탭으로 동시에 열어 비교하는 워크스페이스',
      '문자별 복원 가설을 생성·반박·판정하는 흐름과 근거 문서(dossier)',
      '사광 조명과 돋보기를 갖춘 3D 판독 뷰',
    ],
    engineering: [
      {
        title: '순수 엔진 패키지',
        body: '이체자를 처리하는 BM25 검색, 출처 계보, 인용 검증, 판정 게이트, 3D 파일 파서를 UI와 분리된 패키지로 만들었습니다.',
      },
      {
        title: '권리가 확인될 때만 내보내기',
        body: 'EpiDoc XML 내보내기를 권리 게이트 뒤에 두어, 이용 조건이 불분명한 자료가 섞여 나가지 않게 했습니다.',
      },
    ],
    limits: [
      '저장소의 비석 3D·자형·문헌은 모두 자체 제작한 가상 데이터이며 실제 유물 판독 결과가 아닙니다.',
      '성능 수치는 소프트웨어 렌더러(SwiftShader) 기준으로만 측정했습니다.',
    ],
    links: [{ label: '코드', href: gh('bisuk') }],
  },
  {
    slug: 'raonjena',
    name: '라온제나',
    tagline: '직접 쓴 세계관을 한 인물의 시점으로 끊김 없이 이어지는 내러티브 전술 RPG로.',
    period: '2026.09',
    category: 'game',
    badges: ['웹 게임', '오리지널 IP'],
    featured: true,
    image: '/work/raonjena.jpg',
    imageAlt: '라온제나 작전실 전투 화면',
    stack: ['React', 'Phaser', 'TypeScript', 'Vite', 'Vitest'],
    numbers: [
      { value: '8', label: '플레이 가능한 전투' },
      { value: '6', label: '동료 로스터' },
      { value: '250+', label: '테스트 케이스' },
    ],
    problem:
      '장편 세계관 문서를 게임으로 옮기면 장면, 대화, 전투가 따로 놀기 쉽습니다. 하나의 저장 데이터 위에서 서사와 전투가 서로에게 영향을 주도록 설계했습니다.',
    built: [
      '장면 → 내면 독백 → 대화 → 선택(연민·통찰·결의) → 선택이 반영된 전투 → 회고로 이어지는 루프',
      '적의 다음 행동을 읽고 세 조장을 연결해 BREAK를 만드는 3명령 전술 전투',
      '거점, 파견 임무, 일일 지휘 루프와 로컬 저장',
    ],
    engineering: [
      {
        title: 'UI와 분리된 전투 엔진',
        body: 'BREAK 연계 규칙을 순수 함수 엔진으로 만들어 테스트로 고정했습니다.',
      },
      {
        title: '정사와 초안을 구분하는 설정 관리',
        body: '확정된 설정과 초안을 표시하는 정사 상태 문서를 두어, 세계관이 커져도 모순을 추적할 수 있게 했습니다.',
      },
      {
        title: '비용에 잠금을 건 3D 파이프라인',
        body: '유료 3D 생성 API는 전역 허용 플래그와 실행 옵션을 모두 켜야만 호출되도록 막았습니다.',
      },
    ],
    limits: ['공개 배포 전이며, Unity 3D 버전은 코드만 있고 아직 컴파일·실행 검증을 하지 않았습니다.'],
    links: [{ label: '코드', href: gh('raonjena') }],
  },
  {
    slug: 'writerclock',
    name: '작가시계',
    tagline: '지금 이 시각이 들어간 실제 문학 문장으로 매분을 보여주는 한국어 문학시계.',
    period: '2026.07 – 09',
    category: 'archive',
    badges: ['라이브', '웹·PWA·Android'],
    image: '/work/writerclock.jpg',
    imageAlt: '작가시계 화면. 오후 10시 50분과 그 시각이 들어간 문장',
    stack: ['Vanilla JS', 'PWA', 'Capacitor', 'Python', 'GitHub Actions'],
    numbers: [{ value: '1,440', label: '분 단위 문장' }],
    problem: '하루 1,440분 모두에 출처가 분명한 문장을 붙이고, 인용 권리가 확인된 경우에만 공개하는 것이 과제였습니다.',
    built: [
      '분 단위 문장 표시, 같은 분의 다른 문장, 시각 탐색·즐겨찾기·공유',
      '설치형 PWA와 CI에서 서명 빌드되는 Android 앱',
    ],
    engineering: [
      {
        title: '1,440행 전수 감사',
        body: '출처 감사 문서와 데이터 계약 검사기(1,440개 키, 오전/오후 규칙)로 데이터가 깨지면 빌드가 멈추게 했습니다.',
      },
      {
        title: '권리 검토 전에는 배포하지 않는 워크플로',
        body: 'GitHub Pages 배포는 저장소 변수로 권리 검토 승인을 명시해야만 시작됩니다.',
      },
    ],
    limits: ['현대 작품 인용은 권리 검토가 진행 중인 항목이 있습니다.'],
    credit:
      'gyuminlee-repo/author-clock을 바탕으로 한 프로젝트입니다. 펌웨어·데스크톱 앱·초기 PWA는 원작자의 작업이고, 앱 재작성과 데이터 감사, Android 앱, UI 재디자인, Vercel 배포를 맡았습니다.',
    links: [
      { label: '라이브', href: 'https://writerclock.vercel.app/' },
      { label: '코드', href: gh('writerclock') },
    ],
  },
  {
    slug: 'yogitrust',
    name: '요기믿음별 AI',
    tagline: '별점을 없애는 대신 더 믿을 수 있게. 평균 별점 뒤의 변수를 통계로 설명합니다.',
    period: '2026.07',
    category: 'data',
    badges: ['요기요 × Oracle 해커톤', '합성 데이터 데모'],
    stack: ['Next.js', 'TypeScript', 'Zod', 'Oracle AI Vector Search', 'Playwright', 'Docker'],
    problem:
      '리뷰 이벤트, 최근 품질 변화, 리뷰어 성향이 섞인 평균 별점은 믿기 어렵습니다. 조정된 점수와 그 이유를 함께 보여주는 것을 목표로 했습니다.',
    built: ['매장 목록·상세·비교 화면, 7/30/90일 추세, 음식/배달 책임 분리', '점수 산식과 AI 한계를 모두 공개하는 방법론 페이지'],
    engineering: [
      {
        title: '점수는 LLM이 아니라 수식이',
        body: '베이지안 사전값, 60일 반감기, 가중치 상한을 둔 순수 함수로 점수를 계산합니다.',
      },
      {
        title: 'AI가 인용한 리뷰는 서버가 검증',
        body: 'AI 답변이 근거로 든 리뷰 ID를 서버가 대조하고, 맞지 않으면 안전한 기본 응답으로 되돌립니다.',
      },
    ],
    limits: ['화면의 매장·리뷰는 모두 합성 데이터이며 실제 업체 평가가 아닙니다. 요기요 공식 서비스가 아닌 독립 데모입니다.'],
    links: [{ label: '코드', href: gh('yogitrust-ai') }],
  },
  {
    slug: 'bid-shield',
    name: 'BID SHIELD',
    tagline: '공공조달 계약을 따내기 전에, 그 계약을 수행하는 동안 현금이 버티는지 먼저 계산합니다.',
    period: '2026.07',
    category: 'data',
    badges: ['공모전 출품용 MVP', '합성 데모 데이터'],
    stack: ['Next.js', 'TypeScript', '나라장터 API', 'SVG 차트', 'node:test'],
    problem: '중소기업은 계약을 따도 대금을 받기 전에 운전자금이 바닥날 수 있습니다. 계약 조건과 재무를 합쳐 월별 자금 공백을 보여줍니다.',
    built: ['계약원가·선금·유보금·지급지연을 반영한 12개월 현금흐름', '나라장터 공고 API 연동과 재무 CSV 가져오기'],
    engineering: [
      { title: '고정 시드 몬테카를로', body: '재현 가능한 시뮬레이션으로 P90 자금 필요액을 계산합니다.' },
      { title: '데이터 품질 점수', body: '합성 데이터가 섞이면 결과 신뢰도에 상한을 거는 출처·품질 점수를 두었습니다.' },
    ],
    limits: ['규칙 기반 스트레스 도구이며, 화면의 비율은 실제 부도·대출 승인 확률이 아닙니다.'],
    links: [{ label: '코드', href: gh('bid') }],
  },
  {
    slug: 'threadline',
    name: 'THREADLINE',
    tagline: 'PR, 배포, 플래그, 지표를 하나의 인과 사슬로 잇는 장애 대응 콘셉트 제품과 훈련 시뮬레이터.',
    period: '2026.07 – 09',
    category: 'data',
    badges: ['콘셉트 제품', '결정론적 데모 데이터'],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Vitest', 'GitHub Actions'],
    problem: '장애가 나면 무엇이 원인인지 여러 도구를 오가며 추측하게 됩니다. 모든 신호를 출처까지 추적하고, AI 제안은 사람이 승인하도록 설계했습니다.',
    built: ['그래프·지표·타임라인이 동기화되는 장애 리플레이', '의사결정 6단계, 행동 18개, 결말 3개의 Crisis Lab 훈련 시뮬레이션과 사후 리뷰 점수'],
    engineering: [
      { title: 'AI 주장에 등급', body: 'AI의 말을 관찰(observed)·추론(inferred)·제안(proposed)으로 나눠 표시합니다.' },
      { title: '접근성 대체 경로', body: '인과 그래프마다 표 형태 대안을 제공해 WCAG 2.2 AA를 목표로 했습니다.' },
    ],
    limits: ['실제 시스템 데이터를 수집하지 않으며 고정된 데모 데이터로 동작합니다.'],
    links: [{ label: '코드', href: gh('threadline') }],
  },
  {
    slug: 'spao-twin',
    name: 'SPAO 팝업 디지털 트윈',
    tagline: '팝업스토어의 대기열·재고·집기 배치를 시뮬레이션해 실제 운영과 개선안을 비교합니다.',
    period: '2026.07',
    category: 'data',
    badges: ['대학 운영관리 수업 팀 프로젝트'],
    image: '/work/spao.jpg',
    imageAlt: '팝업스토어 혼잡도 히트맵',
    stack: ['Python', 'Streamlit', 'pandas', 'Plotly'],
    problem: '인기 IP 협업 팝업은 대기열과 품절이 동시에 터집니다. 운영관리 이론을 코드로 옮겨 어떤 조정이 효과가 있는지 비교했습니다.',
    built: ['5분 단위 대기열 시뮬레이션, ABC/XYZ 재고 분류, 집기 배치 최적화, KPI 비교가 담긴 8개 탭 앱'],
    engineering: [
      { title: '이론을 그대로 코드로', body: '리틀의 법칙, 이용률 ρ, 신문팔이 모형을 시뮬레이션과 재고 판단에 적용하고 21개 테스트로 고정했습니다.' },
    ],
    limits: ['내부 판매 데이터가 아닌 공개 대리 지표와 가정으로 만든 모델입니다.'],
    links: [{ label: '코드', href: gh('spao') }],
  },
  {
    slug: 'gongpo',
    name: 'GONGPO-DONGGUNG PRO',
    tagline: '경주 동궁과 월지 A건물지를 “복원”이 아니라 증거 등급별로 나눠 보여주는 고고학 뷰어.',
    period: '2026.07',
    category: 'archive',
    badges: ['연구용 프로토타입'],
    image: '/work/gongpo.jpg',
    imageAlt: '동궁과 월지 건물지 유구를 증거 등급과 함께 보여주는 3D 뷰어',
    stack: ['Node.js', 'JSON Schema', 'Next.js', 'React Three Fiber'],
    problem: '유적 3D 복원은 발굴 사실과 해석, 가설이 한 장면에 섞여 보이기 쉽습니다. 무엇이 확인된 것이고 무엇이 추정인지 화면에서 구분되게 했습니다.',
    built: ['발굴 유구(E1)부터 가설(E5)까지 신뢰 등급별 레이어와 단계별 타임라인'],
    engineering: [
      { title: '64개 규칙 검증기', body: '데이터를 바꿀 때마다 V01–V64 검증을 통과해야 하고, 20가지 변조 시나리오는 모두 거부되어야 합니다.' },
      { title: '과장 표현 스캐너', body: '“원형 복원”처럼 근거를 넘어서는 표현을 금지어로 막았습니다.' },
    ],
    limits: ['칸 간격·높이 등 일부 형상은 DEMO 자리표시이며, 엄격 모드는 출처 확인 전까지 의도적으로 실패 상태입니다.'],
    links: [{ label: '코드', href: gh('archi') }],
  },
  {
    slug: 'flim',
    name: 'FLIM',
    tagline: '정보·평점·수상·평론을 한 화면에 모은 씨네필 영화 서재.',
    period: '2026.05 – 06',
    category: 'archive',
    badges: ['라이브'],
    image: '/work/flim.jpg',
    imageAlt: 'FLIM 첫 화면. 오늘 볼 영화, 평론과 함께 고르다',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'TMDb', 'KOFIC', 'Vercel'],
    numbers: [
      { value: '3,497', label: '영화' },
      { value: '169', label: '큐레이션' },
    ],
    problem: '검색 결과가 아니라 “오늘 볼 한 편”을 고르게 돕는 영화 서재를 목표로 했습니다.',
    built: ['오늘의 추천, 장르·OTT·영화제·수상·비교 페이지, 브라우저에 저장되는 개인 평점'],
    engineering: [
      { title: '투표 수를 고려한 가중 평점', body: '표본이 적은 작품이 위로 튀지 않게 베이지안 가중 평점을 썼습니다.' },
      { title: '무료 티어에 맞춘 구조 전환', body: '데이터베이스를 정적 스냅샷으로 옮겨 운영 비용 없이 서비스하도록 바꿨습니다.' },
    ],
    limits: ['평론 한줄평 데이터는 출처 표기와 이용 범위를 정리하는 중입니다.'],
    links: [
      { label: '라이브', href: 'https://flim-murex.vercel.app' },
      { label: '코드', href: gh('Flim') },
    ],
  },
  {
    slug: 'atlas-1939',
    name: 'ATLAS 1939',
    tagline: '전선·정치·경제·민간인의 삶까지 연결해 읽는 한국어 제2차 세계대전 백과사전.',
    period: '2026.07 – 09',
    category: 'archive',
    badges: ['라이브'],
    image: '/work/atlas.jpg',
    imageAlt: 'ATLAS 1939 첫 화면과 전선 지도',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Vercel'],
    numbers: [
      { value: '24', label: '심층 문서' },
      { value: '13', label: '전투 도감' },
    ],
    problem: '흩어진 사건을 하나의 연결된 역사로, 식민지 조선의 경험까지 포함해 읽을 수 있게 하는 것이 목표였습니다.',
    built: ['심층 문서와 전투 도감, 1937–1945 연표, 주제 필터와 통합 검색, 연관 문서 추천'],
    engineering: [
      { title: '신뢰도 태그가 있는 콘텐츠 모델', body: '일화마다 기록 확인·해석 논쟁·후대의 전설로 신뢰도를 나누고, 문서별 참고문헌을 타입으로 강제했습니다.' },
    ],
    limits: ['AI의 도움을 받아 작성한 콘텐츠로, 공개 전 별도 사실 검증이 필요하다고 명시해 두었습니다.'],
    links: [
      { label: '라이브', href: 'https://world-war-ii-encyclopedia.vercel.app' },
      { label: '코드', href: gh('atlas-1939-world-war-ii-encyclopedia') },
    ],
  },
  {
    slug: 'paran-deck',
    name: 'Paran Deck',
    tagline: 'PDF·문서·회의록을 넣으면 핵심 요약과 편집 가능한 8~10장 보고서형 PPTX를 만듭니다.',
    period: '2026',
    category: 'ai',
    badges: ['라이브'],
    stack: ['PPTX 생성', '문서 요약'],
    problem: '보고서 초안을 만들 때 요약과 슬라이드를 따로 만들 필요 없이, 요약을 먼저 검토하고 확정한 내용으로 PPT를 만들게 했습니다.',
    built: ['로그인 없이 시작, 요약 먼저 검토, 편집 가능한 PPTX 다운로드', '업로드한 원본과 API 키는 저장하지 않음'],
    engineering: [],
    limits: ['코드 저장소는 비공개입니다.'],
    links: [{ label: '라이브', href: 'https://ppt-one-sigma.vercel.app' }],
  },
  {
    slug: 'season-finale',
    name: '시즌 피날레 어워즈',
    tagline: '야구 시상식의 후보 소개와 연말 시상식의 무대 연출을 합친 시상식 웹사이트와 투표 페이지.',
    period: '2026',
    category: 'game',
    badges: ['라이브', '투표 오픈 전'],
    stack: ['스크롤 연출', '투표 페이지'],
    problem: '한 시즌의 기록을 연말 시상식 무대처럼 스크롤로 넘겨 보는 웹사이트입니다.',
    built: ['부문별 후보 소개와 무대 연출형 스크롤 화면', '로그인한 계정으로 참여하는 별도 투표 페이지'],
    engineering: [],
    limits: ['코드 저장소는 비공개이며, 투표는 아직 열리지 않았습니다.'],
    links: [{ label: '라이브', href: 'https://golden-slipper-awards.vercel.app/' }],
  },
  {
    slug: 'beomdew',
    name: '범타듀 밸리',
    tagline: '친구 일곱 명만을 위한 브라우저 마을 게임. 산책하고, 방을 꾸미고, 함께 미니게임을 합니다.',
    period: '2026.09',
    category: 'game',
    badges: ['비상업 개인 프로젝트', '초대 전용'],
    stack: ['React', 'three.js', 'TypeScript', 'Supabase Edge Functions', 'Realtime'],
    numbers: [{ value: '343', label: '테스트 호출' }],
    problem: '친구끼리 쓰는 작은 게임이라도, 돈이 오가는 미니게임은 조작이 불가능해야 합니다. 판정을 전부 서버로 옮겼습니다.',
    built: ['3D 마을과 2D 캐릭터, 옷장·방 꾸미기, 서버가 판정하는 카드·보드 미니게임 5종'],
    engineering: [
      { title: '클라이언트와 서버가 같은 규칙 엔진', body: '순수 함수 규칙을 클라이언트와 Edge Function이 공유하고, 요청 영수증으로 재전송 공격을 막았습니다.' },
      { title: '에셋 예산이 있는 빌드', body: '해시 파일명과 크기 예산(경고 600KB, 실패 3MB)을 빌드 단계에서 검사합니다.' },
    ],
    limits: ['친구들의 개인정보가 들어 있어 링크와 화면은 공개하지 않습니다.'],
    links: [],
  },
  {
    slug: 'hanjang',
    name: '한장 Studio',
    tagline: '콘텐츠 브리프로 5~10장 카드뉴스 흐름을 만들고 발행 품질까지 점검하는 제작 도구.',
    period: '2026.07 – 08',
    category: 'archive',
    badges: ['프로토타입'],
    stack: ['Next.js', 'React', 'TypeScript'],
    problem: '카드뉴스 제작의 반복 작업(흐름 짜기, 브랜드 적용, 내보내기)을 한 화면에서 끝내게 했습니다.',
    built: ['템플릿 기반 초안 생성, 캔버스 직접 편집, PNG·ZIP·PDF 내보내기, 모바일 가독성 점수'],
    engineering: [{ title: '의존성 없는 ZIP 작성기', body: 'CRC32부터 직접 구현한 ZIP 인코더와 SVG→PNG 내보내기를 만들었습니다.' }],
    limits: ['초안 생성은 AI가 아니라 규칙과 템플릿으로 동작합니다.'],
    links: [{ label: '코드', href: gh('cardnews-studio') }],
  },
  {
    slug: 'shortsauto',
    name: 'ShortsAuto',
    tagline: '쇼츠 제작의 기획·대본·검수·발행 준비를 한 곳에서 관리하는 운영 콘솔.',
    period: '2026.07 – 09',
    category: 'ai',
    badges: ['프로토타입'],
    stack: ['Next.js', 'Vercel AI SDK', 'Zod', 'Radix UI'],
    problem: '생성보다 어려운 것은 권리 확인, 사실 검증, 승인 같은 운영입니다. 이 과정을 제품의 중심에 두었습니다.',
    built: ['스키마로 검증하는 대본 생성 API(키가 없으면 데모 응답)', '승인 게이트·권리 위험·예산 가드레일 대시보드'],
    engineering: [{ title: '정책 게이트와 비용 추정', body: '생성 요청마다 입력 검증, 금지 표현 차단, 비용 추정을 거칩니다.' }],
    limits: ['업로드·큐·영상 처리 워커는 설계 문서 단계입니다.'],
    links: [{ label: '코드', href: gh('shortsauto') }],
  },
  {
    slug: 'notyet',
    name: 'NOTYET',
    tagline: '아직 없는 것들에 설득력 있는 형태를 주는 이중 언어 스페큘러티브 디자인 포트폴리오.',
    period: '2026.07',
    category: 'archive',
    badges: ['가상 케이스 스터디'],
    stack: ['Next.js', 'React', 'Tailwind', 'Canvas 2D'],
    problem: '가상의 제안 다섯 개를 목업이 아니라 들여다볼 수 있는 시스템처럼 보여주는 사이트입니다.',
    built: ['영어·한국어 전환, 캔버스 히어로, SVG로 내보내는 포스터 랩, 모션 줄이기 대응'],
    engineering: [],
    limits: ['모든 케이스 스터디는 자체 제안이며 실제 클라이언트 작업이 아닙니다. 이미지는 AI로 생성했습니다.'],
    links: [{ label: '코드', href: gh('something2') }],
  },
  {
    slug: 'zokbo',
    name: 'Zokbo',
    tagline: 'Notion을 저장소로 쓰는, 비밀번호로 잠긴 개인 학습자료 보관소.',
    period: '2026.05 – 06',
    category: 'archive',
    badges: ['개인 도구'],
    stack: ['Next.js', 'Notion API', 'Web Crypto'],
    problem: '추가 서버 비용 없이 이미 쓰는 Notion을 파일 저장소로 활용했습니다.',
    built: ['업로드·분류·검색·미리보기, HMAC 서명 세션 쿠키'],
    engineering: [],
    limits: ['개인용으로 설계했고, 멤버 공유는 계획 단계입니다.'],
    links: [{ label: '코드', href: gh('Zokbo') }],
  },
  {
    slug: 'iron-dominion',
    name: 'IRON DOMINION',
    tagline: '1942년 연합군을 지휘하는 대전략 게임의 수직 슬라이스 프로토타입.',
    period: '2026.07',
    category: 'game',
    badges: ['프로토타입'],
    stack: ['React', 'TypeScript', 'Vite'],
    problem: '국가 자원, 장군, 연구, 외교를 한 턴 안에서 조율하는 게임의 뼈대를 빠르게 검증했습니다.',
    built: ['27개 지역 전략 지도, 주간 턴, 생산·연구·외교·정보전, 자동 저장'],
    engineering: [],
    limits: ['전투 계산은 단순 공식이며 적 AI와 해·공전은 없습니다.'],
    links: [{ label: '코드', href: gh('fas') }],
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
