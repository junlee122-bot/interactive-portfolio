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
  /** One line that says what the product is. */
  tagline: string
  period: string
  category: ProjectCategory
  /** What this person owned on the project. */
  role: string
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
    tagline: '남은 시간만 말하면, 검증된 장소로 동선이 완성됩니다.',
    period: '2026.05 – 06',
    category: 'data',
    role: '기획 · 데이터 파이프라인 설계 · 앱 개발 총괄',
    badges: ['모바일 앱', '한국관광공사 2026 관광 프롬프톤 출품'],
    featured: true,
    image: '/work/clockwise.jpg',
    imageAlt: 'Clockwise 개발 업데이트 노트 첫 화면',
    stack: ['React Native', 'Supabase', 'Kakao Local API', 'Google Maps SDK', 'TourAPI'],
    numbers: [
      { value: '2,275', label: '교차 검증한 음식점' },
      { value: '5,452', label: '6개 지역 관광 데이터' },
      { value: '78,180', label: '30일 혼잡 예측 행' },
    ],
    problem:
      '“2시간, 둘이서, 데이트.” 조건 세 개면 충분해야 한다고 봤습니다. 광고가 아닌 신호로 고른 장소를, 주어진 시간 안에 흐르는 코스로 엮는 것. 추천보다 추천의 근거가 되는 데이터를 먼저 쌓았습니다.',
    built: [
      '시간·인원·카테고리·위치를 받아 코스를 짜는 추천 엔진, 타임라인과 셔플',
      'SK 통화량 · 행안부 모범음식점 · 30년 노포를 하나로 합친 검증 음식점 풀',
      '서울·제주·부산·강원·경주·인천 6개 지역과 한국 SVG 지도 메인 화면',
      '무장애 1,568곳 · 반려동물 동반 213곳 · 둘레길 261개 코스 · 30일 혼잡 예측',
    ],
    engineering: [
      {
        title: '출처가 다른 11종 데이터를 한 풀로',
        body: '좌표 50m와 이름 매칭으로 같은 가게를 묶고, 잡힌 신호를 모두 sources에 남겨 결과 화면의 검증 뱃지로 보여줬습니다.',
      },
      {
        title: '플랫폼 제약은 작게 우회',
        body: 'React Native에 DOMParser가 없어 GPX를 정규식으로 읽고, 300포인트로 줄여 코스마다 미니 지도를 그렸습니다.',
      },
      {
        title: '키가 새지 않는 사진 파이프라인',
        body: 'Google Places 사진을 한 번만 받아 자체 스토리지에 두고, 앱에는 외부 키가 닿지 않게 했습니다.',
      },
    ],
    limits: [
      '앱 저장소는 비공개입니다. 개발 과정은 공개된 업데이트 노트에 단계별로 남아 있습니다.',
      '장소 간 이동 시간은 실제 경로가 아닌 거리(Haversine) 기반 추정입니다.',
    ],
    links: [{ label: '개발 노트', href: gh('clockwise-updates') }],
  },
  {
    slug: 'nest',
    name: '둥지 Nest',
    tagline: '집 문제를 사진 한 장으로. 응급처치부터 집주인에게 보낼 한 줄까지.',
    period: '2026.06 – 07',
    category: 'ai',
    role: '기획 · 프롬프트 설계 · 평가 하네스 · 배포',
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
      '천장에서 물이 떨어질 때, 처음 자취하는 사람은 무엇부터 해야 하는지도, 누가 고쳐야 하는지도 모릅니다. 막막함을 바로 다음 행동으로 바꿔 주는 것이 목표였습니다.',
    built: [
      '사진·텍스트 → 응급처치 → 책임 판단(민법 근거) → 정중/단호 문구, 세 단계 응답',
      '계약서 독소조항 체커, 에어컨 전기요금 계산, 혼밥 장보기 코치',
      '국토부 실거래가·KAMIS 가격 등 공공데이터로 답변을 보강하고, 실패하면 대체 경로로',
      '심사위원을 위한 90초 인터랙티브 쇼케이스',
    ],
    engineering: [
      {
        title: '프롬프트에도 회귀 테스트',
        body: '책임 판단, 가스 누출 같은 긴급 상황, 말투 규칙을 확인하는 평가 케이스를 두고 프롬프트를 바꿀 때마다 돌렸습니다.',
      },
      {
        title: '엔진 하나, 입구 넷',
        body: '같은 작업 화면에 주제별 시스템 프롬프트만 갈아 끼워, 기능이 늘어도 품질 기준이 흩어지지 않게 했습니다.',
      },
      {
        title: '계산은 모델에게 맡기지 않는다',
        body: '누진 전기요금은 결정론적 엔진이 계산하고, IP별 요청 제한으로 API 비용에 상한을 뒀습니다.',
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
    tagline: '창호지는 엄폐물이 아니다. 조선 목조 건축 속 브라우저 FPS.',
    period: '2026.07 – 09',
    category: 'game',
    role: '기술 디렉션 · 작업 명세 · 검증 게이트 설계',
    badges: ['플레이 가능 빌드', '218 커밋'],
    featured: true,
    image: '/work/joseon-cqb.jpg',
    imageAlt: 'JOSEON-CQB 게임 화면. 조선 목조 건물이 늘어선 마당',
    stack: ['three.js', 'Vanilla JS', 'Vite', 'Playwright', 'node:test'],
    numbers: [
      { value: '11/11', label: '재실행해도 바이트까지 같은 샷' },
      { value: '30', label: '고정된 재질×무기 관통 조합' },
      { value: '0', label: '플레이 중 셰이더 컴파일' },
    ],
    problem:
      '재질마다 관통이 달라지는 전투는, 한 번 맞춘 손맛이 다음 수정에서 무너지기 쉽습니다. 그래서 게임보다 먼저 “아무것도 깨지지 않았다”를 증명하는 장치를 만들었습니다.',
    built: [
      '그레이박스 맵, 무기 3종, 재질별 관통 탄도, 총구화염·데칼·예광',
      '텍스처와 메시 전부를 코드로 생성해 외부 에셋 라이선스가 없는 구조',
      'BVH·CCD 기반 강체 물리',
    ],
    engineering: [
      {
        title: '바이트 단위 결정론',
        body: 'RNG, 파티클 풀, 데칼 슬롯까지 복원 범위를 정하고, 기준 11샷을 두 번 돌려 결과가 한 바이트도 다르지 않은지 비교합니다.',
      },
      {
        title: '게이트를 통과해야 병합',
        body: '관통 마진, 셰이더 예열, 시각 구별 축 등 20개 가까운 감사 도구를 두고, 각 게이트가 실패를 실제로 잡는지 음성 테스트까지 요구했습니다.',
      },
      {
        title: 'AI 에이전트에게는 계약서로',
        body: '작업을 계약 문서로 쪼개 에이전트에게 맡기고, 라운드마다 비평 문서로 검수해 다음 라운드를 열었습니다.',
      },
    ],
    limits: [
      '배포 빌드는 플레이 확인용이며, 게이트 검증 대상이 아니라고 화면 상단에 밝혀 두었습니다.',
      '캐릭터·적 AI·사운드가 들어가기 전인 v0 단계입니다.',
    ],
    links: [
      { label: '플레이', href: 'https://joseon-cqb.vercel.app/' },
      { label: '코드', href: gh('fps') },
    ],
  },
  {
    slug: 'helixforge',
    name: 'HelixForge AI',
    tagline: '실제 과학 도구를 부르는 신약개발 멀티 에이전트. 모든 답에 출처 등급이 붙습니다.',
    period: '2026.07',
    category: 'ai',
    role: '에이전트 구조 설계 · 평가 설계 · 출품',
    badges: ['AI 신약개발 경진대회 융합 부문 출품'],
    featured: true,
    stack: ['FastAPI', 'Python', 'RDKit', 'PyTDC', 'React', 'Docker'],
    numbers: [
      { value: '17', label: '결정론적 에이전트' },
      { value: '394', label: 'pytest 테스트' },
      { value: '6', label: '오류 주입 자가 교정 시나리오' },
    ],
    problem:
      '그럴듯한 분자와 표적을 말하는 AI는 많습니다. 어디까지가 도구의 계산이고 어디부터가 추정인지 드러나지 않으면 연구에는 쓸 수 없습니다. 출처가 보이는 의사결정 보조를 목표로 했습니다.',
    built: [
      'PubMed · ChEMBL · ClinicalTrials.gov 실시간 조회, RDKit · PyTDC 로컬 계산',
      '표적 발굴 → 분자 분석 → 안전성 스크리닝 → 임상·허가 계획으로 이어지는 파이프라인',
      '네트워크 없이도 시연되는 기록·재생 모드',
    ],
    engineering: [
      {
        title: '결과마다 출처 등급',
        body: 'REAL_TOOL_OUTPUT, CONFIGURED_BUT_NOT_RUN처럼 모든 출력에 출처 유형을 달아, 돌리지 않은 도구가 돌린 척하지 못하게 했습니다.',
      },
      {
        title: '스스로 틀린 걸 잡는 Critic',
        body: '일부러 오류를 심은 여섯 시나리오에서 Critic 에이전트가 결과를 되돌리고 바로잡는지 확인합니다.',
      },
      {
        title: '답을 아는 문제로 재는 벤치',
        body: 'EGFR·비소세포폐암처럼 이미 알려진 답을 시스템이 다시 찾아내는지로 성능을 평가합니다.',
      },
    ],
    limits: [
      'AutoDock Vina · REINVENT4는 설치 전까지 “설정됨, 미실행”이고, ADMET 모델은 휴리스틱 기준선입니다.',
      '연구 의사결정을 돕는 도구이며 임상 판단을 대신하지 않습니다.',
    ],
    links: [{ label: '코드', href: gh('med') }],
  },
  {
    slug: 'seokmun',
    name: '석문 Studio',
    tagline: '비석과 탁본을 나란히 펼치고, 근거가 있을 때만 글자를 복원합니다.',
    period: '2026.07',
    category: 'archive',
    role: '연구 흐름 설계 · 엔진 설계 · 검증',
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
      '닳아 버린 비문은 한 글자를 읽는 데에도 여러 판본과 문헌을 오가야 합니다. 비교는 가볍게, 주장은 근거가 쌓였을 때만. 그 원칙을 도구의 흐름으로 옮겼습니다.',
    built: [
      '비석·조각·탁본·판독문을 탭으로 동시에 여는 비교 워크스페이스',
      '문자별 복원 가설을 세우고, 반박하고, 판정하는 흐름과 근거 문서',
      '사광 조명과 돋보기를 갖춘 3D 판독 뷰',
    ],
    engineering: [
      {
        title: 'UI와 분리된 순수 엔진',
        body: '이체자를 다루는 BM25 검색, 출처 계보, 인용 검증, 판정 게이트, 3D 파일 파서를 독립 패키지로 만들었습니다.',
      },
      {
        title: '권리가 확인될 때만 내보내기',
        body: 'EpiDoc XML 내보내기를 권리 게이트 뒤에 두어, 이용 조건이 불분명한 자료가 섞여 나가지 않게 했습니다.',
      },
    ],
    limits: [
      '비석 3D · 자형 · 문헌은 모두 직접 만든 가상 데이터이며, 실제 유물의 판독 결과가 아닙니다.',
      '성능 수치는 소프트웨어 렌더러(SwiftShader) 기준으로만 측정했습니다.',
    ],
    links: [{ label: '코드', href: gh('bisuk') }],
  },
  {
    slug: 'raonjena',
    name: '라온제나',
    tagline: '직접 쓴 세계관을, 한 인물의 시선으로 끊김 없이 이어지는 전술 RPG로.',
    period: '2026.09',
    category: 'game',
    role: '세계관 · 게임 디자인 · 개발 디렉션',
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
      '긴 세계관을 게임으로 옮기면 장면과 대화와 전투가 따로 놀기 쉽습니다. 하나의 저장 데이터 위에서 이야기의 선택이 전투를 바꾸고, 전투의 결과가 다시 이야기로 돌아오게 설계했습니다.',
    built: [
      '장면 → 독백 → 대화 → 선택(연민·통찰·결의) → 전투 → 회고로 이어지는 한 호흡의 루프',
      '적의 다음 수를 읽고 세 조장을 엮어 BREAK를 여는 3명령 전술 전투',
      '거점, 파견, 일일 지휘 루프와 로컬 저장',
    ],
    engineering: [
      {
        title: '화면과 분리된 전투 엔진',
        body: 'BREAK 연계 규칙을 순수 함수 엔진으로 만들고 테스트로 못 박았습니다.',
      },
      {
        title: '정사와 초안의 분리',
        body: '확정된 설정과 초안을 구분하는 정사 상태 문서를 두어, 세계관이 커져도 모순을 추적할 수 있게 했습니다.',
      },
      {
        title: '비용에 잠금을 건 3D 파이프라인',
        body: '유료 3D 생성 API는 전역 허용 플래그와 실행 옵션을 둘 다 켜야만 호출되도록 막아 두었습니다.',
      },
    ],
    limits: ['아직 공개 배포 전이며, Unity 3D 버전은 코드만 있고 컴파일·실행 검증을 거치지 않았습니다.'],
    links: [{ label: '코드', href: gh('raonjena') }],
  },
  {
    slug: 'writerclock',
    name: '작가시계',
    tagline: '지금 이 시각이 들어간 문학의 한 문장으로, 매분을 읽는 시계.',
    period: '2026.07 – 09',
    category: 'archive',
    role: '앱 재작성 · 데이터 감사 · Android · 재디자인',
    badges: ['라이브', '웹 · PWA · Android'],
    image: '/work/writerclock.jpg',
    imageAlt: '작가시계 화면. 오후 10시 50분과 그 시각이 들어간 문장',
    stack: ['Vanilla JS', 'PWA', 'Capacitor', 'Python', 'GitHub Actions'],
    numbers: [{ value: '1,440', label: '하루 모든 분의 문장' }],
    problem: '하루 1,440분 모두에 출처가 분명한 문장을 붙이고, 인용 권리가 확인된 것만 세상에 내보내는 일이었습니다.',
    built: [
      '분 단위 문장, 같은 분의 다른 문장, 시각 탐색 · 즐겨찾기 · 공유',
      '설치형 PWA, CI에서 서명 빌드되는 Android 앱',
    ],
    engineering: [
      {
        title: '1,440행 전수 감사',
        body: '출처 감사 문서와 데이터 계약 검사기(1,440개 키, 오전/오후 규칙)로, 데이터가 어긋나면 빌드가 멈추게 했습니다.',
      },
      {
        title: '권리 검토 전에는 배포하지 않는다',
        body: 'GitHub Pages 배포는 저장소 변수로 권리 검토 승인을 명시해야만 시작됩니다.',
      },
    ],
    limits: ['현대 작품 인용 중 일부는 권리 검토가 진행 중입니다.'],
    credit:
      'gyuminlee-repo/author-clock에서 출발한 프로젝트입니다. 펌웨어 · 데스크톱 앱 · 초기 PWA는 원작자의 작업이고, 앱 재작성과 데이터 감사, Android 앱, UI 재디자인, Vercel 배포를 맡았습니다.',
    links: [
      { label: '라이브', href: 'https://writerclock.vercel.app/' },
      { label: '코드', href: gh('writerclock') },
    ],
  },
  {
    slug: 'yogitrust',
    name: '요기믿음별 AI',
    tagline: '별점을 없애지 않고, 믿을 수 있게. 평균 뒤에 숨은 변수를 설명합니다.',
    period: '2026.07',
    category: 'data',
    role: '문제 정의 · 점수 모델 설계 · MVP 개발',
    badges: ['요기요 × Oracle 해커톤', '합성 데이터 데모'],
    stack: ['Next.js', 'TypeScript', 'Zod', 'Oracle AI Vector Search', 'Playwright', 'Docker'],
    problem:
      '리뷰 이벤트, 최근 품질 변화, 리뷰어의 성향이 뒤섞인 평균 별점은 믿기 어렵습니다. 조정된 점수와 그 이유를 나란히 보여주는 것을 목표로 했습니다.',
    built: [
      '매장 목록 · 상세 · 비교, 7/30/90일 추세, 음식과 배달 책임의 분리',
      '점수 산식과 AI의 한계를 그대로 공개하는 방법론 페이지',
    ],
    engineering: [
      {
        title: '점수는 모델이 아니라 수식이',
        body: '베이지안 사전값, 60일 반감기, 가중치 상한을 둔 순수 함수로 계산합니다.',
      },
      {
        title: '인용은 서버가 검증',
        body: 'AI가 근거로 든 리뷰 ID를 서버가 대조하고, 맞지 않으면 안전한 기본 응답으로 되돌립니다.',
      },
    ],
    limits: ['매장과 리뷰는 모두 합성 데이터이며 실제 업체의 평가가 아닙니다. 요기요 공식 서비스가 아닌 독립 데모입니다.'],
    links: [{ label: '코드', href: gh('yogitrust-ai') }],
  },
  {
    slug: 'bid-shield',
    name: 'BID SHIELD',
    tagline: '수주가 곧 생존은 아니다. 계약 전에 현금이 버티는지부터 계산합니다.',
    period: '2026.07',
    category: 'data',
    role: '문제 정의 · 현금흐름 모델 설계 · MVP 개발',
    badges: ['공모전 출품용 MVP', '합성 데모 데이터'],
    stack: ['Next.js', 'TypeScript', '나라장터 API', 'SVG 차트', 'node:test'],
    problem:
      '공공 계약을 따낸 중소기업도 대금이 들어오기 전에 운전자금이 바닥날 수 있습니다. 계약 조건과 재무를 한 모델에 넣어 달마다 비는 돈을 먼저 보여줍니다.',
    built: ['선금 · 유보금 · 지급 지연까지 반영한 12개월 현금흐름', '나라장터 공고 API 연동과 재무 CSV 가져오기'],
    engineering: [
      { title: '재현 가능한 몬테카를로', body: '고정 시드 시뮬레이션으로 P90 자금 필요액을 계산합니다.' },
      { title: '데이터 품질이 결론을 제한', body: '합성 데이터가 섞이면 결과의 신뢰도에 상한이 걸리도록 출처·품질 점수를 두었습니다.' },
    ],
    limits: ['규칙 기반 스트레스 도구이며, 화면의 비율은 실제 부도나 대출 승인 확률이 아닙니다.'],
    links: [{ label: '코드', href: gh('bid') }],
  },
  {
    slug: 'threadline',
    name: 'THREADLINE',
    tagline: 'PR에서 장애까지, 모든 신호를 출처로 이어 붙이는 장애 대응 콘솔.',
    period: '2026.07 – 09',
    category: 'data',
    role: '제품 콘셉트 · 시뮬레이션 설계 · 개발',
    badges: ['콘셉트 제품', '결정론적 데모 데이터'],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Vitest', 'GitHub Actions'],
    problem:
      '장애가 나면 여러 도구를 오가며 원인을 짐작하게 됩니다. 모든 신호를 출처까지 따라가게 하고, AI의 제안은 사람이 승인해야 실행되도록 설계했습니다.',
    built: [
      '그래프 · 지표 · 타임라인이 함께 움직이는 장애 리플레이',
      '결정 6단계, 행동 18개, 결말 3개의 Crisis Lab 훈련 시뮬레이션과 사후 리뷰 점수',
    ],
    engineering: [
      { title: 'AI의 말에 등급을', body: '관찰(observed) · 추론(inferred) · 제안(proposed)을 구분해 표시합니다.' },
      { title: '그래프에는 표 대안을', body: '인과 그래프마다 표 형태의 대안을 두어 WCAG 2.2 AA를 목표로 했습니다.' },
    ],
    limits: ['실제 시스템 데이터를 수집하지 않으며, 고정된 데모 데이터로 동작합니다.'],
    links: [{ label: '코드', href: gh('threadline') }],
  },
  {
    slug: 'spao-twin',
    name: 'SPAO 팝업 디지털 트윈',
    tagline: '대기열 · 재고 · 집기 배치를 시뮬레이션해, 팝업스토어 운영을 다시 짭니다.',
    period: '2026.07',
    category: 'data',
    role: '팀 프로젝트 · 시뮬레이션 앱 구현',
    badges: ['대학 운영관리 수업 팀 프로젝트'],
    image: '/work/spao.jpg',
    imageAlt: '팝업스토어 혼잡도 히트맵',
    stack: ['Python', 'Streamlit', 'pandas', 'Plotly'],
    problem:
      '인기 IP 협업 팝업에서는 대기열과 품절이 동시에 터집니다. 운영관리 이론을 코드로 옮겨, 어떤 조정이 실제로 효과가 있는지 나란히 비교했습니다.',
    built: ['5분 단위 대기열 시뮬레이션, ABC/XYZ 재고 분류, 집기 배치 최적화, KPI 비교까지 8개 탭의 앱'],
    engineering: [
      {
        title: '교과서를 코드로',
        body: '리틀의 법칙, 이용률 ρ, 신문팔이 모형을 시뮬레이션과 재고 판단에 적용하고, 21개 테스트로 고정했습니다.',
      },
    ],
    limits: ['내부 판매 데이터가 아니라 공개 대리 지표와 가정으로 만든 모델입니다.'],
    links: [{ label: '코드', href: gh('spao') }],
  },
  {
    slug: 'gongpo',
    name: 'GONGPO-DONGGUNG PRO',
    tagline: '“복원”하지 않는 고고학 뷰어. 사실과 해석과 가설을 끝까지 분리합니다.',
    period: '2026.07',
    category: 'archive',
    role: '데이터 모델 · 검증 규칙 설계',
    badges: ['연구용 프로토타입'],
    image: '/work/gongpo.jpg',
    imageAlt: '동궁과 월지 건물지 유구를 증거 등급과 함께 보여주는 3D 뷰어',
    stack: ['Node.js', 'JSON Schema', 'Next.js', 'React Three Fiber'],
    problem:
      '유적 3D는 발굴된 사실과 연구자의 해석, 상상이 한 장면에 섞여 보이기 쉽습니다. 경주 동궁과 월지 A건물지를 대상으로, 무엇이 확인된 것인지 화면이 먼저 말하게 했습니다.',
    built: ['발굴 유구(E1)부터 가설(E5)까지 신뢰 등급별 레이어와 시기별 타임라인'],
    engineering: [
      {
        title: '64개 규칙의 검증기',
        body: '데이터가 바뀔 때마다 V01–V64를 통과해야 하고, 20가지 변조 시나리오는 모두 거부되어야 합니다.',
      },
      { title: '과장 표현 스캐너', body: '“원형 복원”처럼 근거를 넘어서는 표현을 금지어로 막았습니다.' },
    ],
    limits: ['칸 간격 · 높이 등 일부 형상은 DEMO 자리표시이며, 엄격 모드는 출처 확인 전까지 의도적으로 실패 상태입니다.'],
    links: [{ label: '코드', href: gh('archi') }],
  },
  {
    slug: 'flim',
    name: 'FLIM',
    tagline: '정보 · 평점 · 수상 · 평론을 한 화면에. 오늘 볼 한 편을 고르는 영화 서재.',
    period: '2026.05 – 06',
    category: 'archive',
    role: '기획 · 데이터 수집 · 개발 · 배포',
    badges: ['라이브'],
    image: '/work/flim.jpg',
    imageAlt: 'FLIM 첫 화면. 오늘 볼 영화, 평론과 함께 고르다',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'TMDb', 'KOFIC', 'Vercel'],
    numbers: [
      { value: '3,497', label: '영화' },
      { value: '169', label: '큐레이션' },
    ],
    problem: '검색 결과의 나열이 아니라, 오늘 밤 볼 한 편을 고르게 돕는 서재를 목표로 했습니다.',
    built: ['오늘의 추천, 장르 · OTT · 영화제 · 수상 · 비교 페이지, 브라우저에 저장되는 나만의 평점'],
    engineering: [
      { title: '표본을 존중하는 평점', body: '투표 수가 적은 작품이 튀어 오르지 않도록 베이지안 가중 평점을 썼습니다.' },
      { title: '비용 0으로 운영하는 구조', body: '데이터베이스를 정적 스냅샷으로 옮겨 무료 티어 안에서 서비스하도록 바꿨습니다.' },
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
    tagline: '전선에서 식탁까지, 제2차 세계대전을 하나의 역사로 잇는 한국어 백과사전.',
    period: '2026.07 – 09',
    category: 'archive',
    role: '편집 방향 · 콘텐츠 모델 · 개발 · 배포',
    badges: ['라이브'],
    image: '/work/atlas.jpg',
    imageAlt: 'ATLAS 1939 첫 화면과 전선 지도',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Vercel'],
    numbers: [
      { value: '24', label: '심층 문서' },
      { value: '13', label: '전투 도감' },
    ],
    problem: '흩어진 사건을 식민지 조선의 경험까지 포함한 하나의 연결된 이야기로 읽게 하는 것이 목표였습니다.',
    built: ['심층 문서와 전투 도감, 1937–1945 연표, 주제 필터와 통합 검색, 연관 문서 추천'],
    engineering: [
      {
        title: '신뢰도가 새겨진 콘텐츠 모델',
        body: '일화마다 기록 확인 · 해석 논쟁 · 후대의 전설로 신뢰도를 나누고, 문서별 참고문헌을 타입으로 강제했습니다.',
      },
    ],
    limits: ['AI의 도움을 받아 쓴 콘텐츠로, 별도의 사실 검증이 필요하다고 명시해 두었습니다.'],
    links: [
      { label: '라이브', href: 'https://world-war-ii-encyclopedia.vercel.app' },
      { label: '코드', href: gh('atlas-1939-world-war-ii-encyclopedia') },
    ],
  },
  {
    slug: 'paran-deck',
    name: 'Paran Deck',
    tagline: '문서를 넣으면, 검토된 요약과 편집 가능한 보고서 PPT가 나옵니다.',
    period: '2026',
    category: 'ai',
    role: '기획 · 개발 · 배포',
    badges: ['라이브'],
    stack: ['PPTX 생성', '문서 요약'],
    problem:
      '보고서를 만들 때 요약과 슬라이드를 따로 만들 필요가 없도록, 요약을 먼저 검토하고 확정한 내용으로 8~10장짜리 PPT를 만들게 했습니다.',
    built: ['로그인 없이 시작, 요약 먼저 검토, 편집 가능한 PPTX 다운로드', '업로드한 원본과 API 키는 저장하지 않음'],
    engineering: [],
    limits: ['코드 저장소는 비공개입니다.'],
    links: [{ label: '라이브', href: 'https://ppt-one-sigma.vercel.app' }],
  },
  {
    slug: 'season-finale',
    name: '시즌 피날레 어워즈',
    tagline: '한 시즌의 기록을, 연말 시상식 무대처럼 스크롤로.',
    period: '2026',
    category: 'game',
    role: '기획 · 연출 · 개발',
    badges: ['라이브', '투표 오픈 전'],
    stack: ['스크롤 연출', '투표 페이지'],
    problem: '야구 시상식의 후보 소개와 연말 시상식의 무대 연출을 한 웹사이트에 담았습니다.',
    built: ['부문별 후보 소개와 무대 연출형 스크롤 화면', '로그인한 계정으로 참여하는 별도 투표 페이지'],
    engineering: [],
    limits: ['코드 저장소는 비공개이며, 투표는 아직 열리지 않았습니다.'],
    links: [{ label: '라이브', href: 'https://golden-slipper-awards.vercel.app/' }],
  },
  {
    slug: 'beomdew',
    name: '범타듀 밸리',
    tagline: '친구 일곱 명만을 위한 작은 마을. 산책하고, 꾸미고, 함께 한 판.',
    period: '2026.09',
    category: 'game',
    role: '기획 · 멀티플레이 설계 · 개발',
    badges: ['비상업 개인 프로젝트', '초대 전용'],
    stack: ['React', 'three.js', 'TypeScript', 'Supabase Edge Functions', 'Realtime'],
    numbers: [{ value: '343', label: '테스트 호출' }],
    problem: '친구끼리 쓰는 작은 게임이라도, 재화가 오가는 미니게임은 누구도 조작할 수 없어야 합니다. 판정을 전부 서버로 옮겼습니다.',
    built: ['3D 마을과 2D 캐릭터, 옷장과 방 꾸미기, 서버가 판정하는 카드·보드 미니게임 5종'],
    engineering: [
      {
        title: '클라이언트와 서버가 같은 규칙',
        body: '순수 함수 규칙을 클라이언트와 Edge Function이 공유하고, 요청 영수증으로 재전송 공격을 막았습니다.',
      },
      { title: '용량 예산이 있는 빌드', body: '해시 파일명과 에셋 크기 예산(경고 600KB, 실패 3MB)을 빌드 단계에서 검사합니다.' },
    ],
    limits: ['친구들의 개인정보가 담겨 있어 링크와 화면은 공개하지 않습니다.'],
    links: [],
  },
  {
    slug: 'hanjang',
    name: '한장 Studio',
    tagline: '브리프 하나로 카드뉴스 한 세트. 흐름부터 발행 점검까지.',
    period: '2026.07 – 08',
    category: 'archive',
    role: '기획 · 개발',
    badges: ['프로토타입'],
    stack: ['Next.js', 'React', 'TypeScript'],
    problem: '카드뉴스 제작의 반복(흐름 짜기, 브랜드 적용, 내보내기)을 한 화면에서 끝내게 했습니다.',
    built: ['템플릿 기반 초안, 캔버스 직접 편집, PNG · ZIP · PDF 내보내기, 모바일 가독성 점수'],
    engineering: [{ title: '의존성 없는 ZIP', body: 'CRC32부터 직접 구현한 ZIP 인코더와 SVG→PNG 내보내기를 만들었습니다.' }],
    limits: ['초안은 AI가 아니라 규칙과 템플릿으로 만들어집니다.'],
    links: [{ label: '코드', href: gh('cardnews-studio') }],
  },
  {
    slug: 'shortsauto',
    name: 'ShortsAuto',
    tagline: '만드는 것보다 어려운 운영을 위해. 쇼츠 제작 운영 콘솔.',
    period: '2026.07 – 09',
    category: 'ai',
    role: '제품 콘셉트 · 개발',
    badges: ['프로토타입'],
    stack: ['Next.js', 'Vercel AI SDK', 'Zod', 'Radix UI'],
    problem: '생성보다 어려운 건 권리 확인, 사실 검증, 승인 같은 운영입니다. 이 과정을 제품의 한가운데에 두었습니다.',
    built: ['스키마로 검증하는 대본 생성 API(키가 없으면 데모 응답)', '승인 게이트 · 권리 위험 · 예산 가드레일 대시보드'],
    engineering: [{ title: '정책 게이트와 비용 추정', body: '생성 요청마다 입력 검증, 금지 표현 차단, 비용 추정을 거칩니다.' }],
    limits: ['업로드 · 큐 · 영상 처리 워커는 설계 문서 단계입니다.'],
    links: [{ label: '코드', href: gh('shortsauto') }],
  },
  {
    slug: 'notyet',
    name: 'NOTYET',
    tagline: '아직 없는 것들에 설득력 있는 형태를. 스페큘러티브 디자인 아카이브.',
    period: '2026.07',
    category: 'archive',
    role: '콘셉트 · 디자인 · 개발',
    badges: ['가상 케이스 스터디'],
    stack: ['Next.js', 'React', 'Tailwind', 'Canvas 2D'],
    problem: '가상의 제안 다섯 개를 목업이 아니라, 들여다볼 수 있는 시스템처럼 보여주는 이중 언어 사이트입니다.',
    built: ['영어 · 한국어 전환, 캔버스 히어로, SVG로 내보내는 포스터 랩, 모션 줄이기 대응'],
    engineering: [],
    limits: ['모든 케이스 스터디는 자체 제안이며 실제 클라이언트 작업이 아닙니다. 이미지는 AI로 생성했습니다.'],
    links: [{ label: '코드', href: gh('something2') }],
  },
  {
    slug: 'zokbo',
    name: 'Zokbo',
    tagline: 'Notion을 창고로 쓰는, 비밀번호로 잠긴 개인 학습자료 보관소.',
    period: '2026.05 – 06',
    category: 'archive',
    role: '기획 · 개발',
    badges: ['개인 도구'],
    stack: ['Next.js', 'Notion API', 'Web Crypto'],
    problem: '서버 비용을 더하지 않고, 이미 쓰는 Notion을 파일 저장소로 바꿨습니다.',
    built: ['업로드 · 분류 · 검색 · 미리보기, HMAC 서명 세션 쿠키'],
    engineering: [],
    limits: ['개인용으로 설계했고, 멤버 공유는 계획 단계입니다.'],
    links: [{ label: '코드', href: gh('Zokbo') }],
  },
  {
    slug: 'iron-dominion',
    name: 'IRON DOMINION',
    tagline: '1942년, 연합군의 지휘석에서. 대전략 게임의 수직 슬라이스.',
    period: '2026.07',
    category: 'game',
    role: '게임 디자인 · 프로토타이핑',
    badges: ['프로토타입'],
    stack: ['React', 'TypeScript', 'Vite'],
    problem: '국가 자원, 장군, 연구, 외교를 한 턴 안에서 조율하는 게임의 뼈대를 빠르게 검증했습니다.',
    built: ['27개 지역 전략 지도, 주간 턴, 생산 · 연구 · 외교 · 정보전, 자동 저장'],
    engineering: [],
    limits: ['전투는 단순 공식으로 계산하며, 적 AI와 해전 · 공중전은 아직 없습니다.'],
    links: [{ label: '코드', href: gh('fas') }],
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
