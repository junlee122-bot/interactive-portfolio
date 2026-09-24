import IconHeartFill from '@karrotmarket/react-monochrome-icon/IconHeartFill'
import IconHeartLine from '@karrotmarket/react-monochrome-icon/IconHeartLine'
import { Badge, Icon, Text } from '@seed-design/react'
import { useEffect, useRef, useState } from 'react'
import { ActionButton } from 'seed-design/ui/action-button'
import { Chip } from 'seed-design/ui/chip'
import { ChipTabsContent, ChipTabsList, ChipTabsRoot, ChipTabsTrigger } from 'seed-design/ui/chip-tabs'
import { Switch } from 'seed-design/ui/switch'

const blanks = [
  { id: 'who', chip: '누가', fill: '처음 온 사용자가' },
  { id: 'where', chip: '어디서 막히나', fill: '결제 직전에 멈추고,' },
  { id: 'change', chip: '무엇이 달라지나', fill: '다음 행동을 스스로 고른다.' },
] as const

function QuestionDemo() {
  const [picked, setPicked] = useState<string[]>(['who'])

  const toggle = (id: string, checked: boolean) =>
    setPicked((current) => (checked ? [...current, id] : current.filter((item) => item !== id)))

  return (
    <div className="device-demo">
      <Text as="p" textStyle="t3Medium" color="fg.neutralMuted">
        문제를 한 문장으로 좁혀 보세요.
      </Text>
      <div className="chip-row">
        {blanks.map((blank) => (
          <Chip.Toggle
            key={blank.id}
            size="small"
            variant="outlineStrong"
            checked={picked.includes(blank.id)}
            onCheckedChange={(checked) => toggle(blank.id, checked)}
          >
            <Chip.Label>{blank.chip}</Chip.Label>
          </Chip.Toggle>
        ))}
      </div>
      <p className="question-sentence" aria-live="polite">
        {blanks.map((blank) =>
          picked.includes(blank.id) ? (
            <span key={blank.id} className="question-sentence__fill">
              {blank.fill}{' '}
            </span>
          ) : (
            <span key={blank.id} className="question-sentence__blank" aria-label={`${blank.chip} 비어 있음`}>
              ______{' '}
            </span>
          ),
        )}
      </p>
      <Text as="p" textStyle="t2Regular" color="fg.neutralSubtle">
        {picked.length === blanks.length ? '좋아요. 이제 검증할 수 있는 질문이에요.' : `${blanks.length - picked.length}칸이 남았어요.`}
      </Text>
    </div>
  )
}

type SaveState = 'idle' | 'saving' | 'saved' | 'failed'

const saveCopy: Record<SaveState, { badge: string; tone: 'neutral' | 'informative' | 'positive' | 'critical'; hint: string }> = {
  idle: { badge: '작성 중', tone: 'neutral', hint: '아직 저장하지 않았어요.' },
  saving: { badge: '저장 중', tone: 'informative', hint: '입력은 유지돼요. 잠시만 기다려 주세요.' },
  saved: { badge: '기기에 저장됨', tone: 'positive', hint: '저장됐어요. 아직 누구에게도 공개되지 않았어요.' },
  failed: { badge: '저장 실패', tone: 'critical', hint: '연결이 끊겼어요. 작성한 내용은 그대로 있어요.' },
}

function StateDemo() {
  const [state, setState] = useState<SaveState>('idle')
  const [offline, setOffline] = useState(false)
  const timerRef = useRef(0)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const save = () => {
    setState('saving')
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setState(offline ? 'failed' : 'saved'), 1100)
  }

  const copy = saveCopy[state]

  return (
    <div className="device-demo">
      <div className="memo-card">
        <div className="memo-card__head">
          <Text textStyle="t4Bold">제주, 오후 4시</Text>
          <Badge tone={copy.tone} variant="weak">
            {copy.badge}
          </Badge>
        </div>
        <Text as="p" textStyle="t3Regular" color="fg.neutralMuted">
          바람이 세서 모자를 두 번 잡았다. 귤 냄새.
        </Text>
      </div>
      <p className="state-hint" role="status">
        {copy.hint}
      </p>
      <Switch size="24" tone="neutral" label="네트워크 끊김 흉내 내기" checked={offline} onCheckedChange={setOffline} />
      <ActionButton variant="brandSolid" size="medium" loading={state === 'saving'} onClick={save} flexGrow>
        {state === 'failed' ? '다시 시도' : '저장하기'}
      </ActionButton>
    </div>
  )
}

function MotionDemo() {
  const [liked, setLiked] = useState(false)
  const [motion, setMotion] = useState(true)
  const [count, setCount] = useState(12)

  const toggleLike = () => {
    setLiked((current) => !current)
    setCount((current) => current + (liked ? -1 : 1))
  }

  return (
    <div className="device-demo">
      <Text as="p" textStyle="t3Medium" color="fg.neutralMuted">
        움직임은 “눌렸다”는 사실을 설명할 때만 씁니다.
      </Text>
      <button
        type="button"
        className="like-button"
        data-liked={liked || undefined}
        data-motion={motion || undefined}
        aria-pressed={liked}
        onClick={toggleLike}
      >
        <span className="like-button__heart" aria-hidden="true">
          <Icon svg={liked ? <IconHeartFill /> : <IconHeartLine />} size="x5" />
        </span>
        <span>관심 {count}</span>
      </button>
      <Switch size="24" tone="neutral" label="모션 켜기" checked={motion} onCheckedChange={setMotion} />
      <Text as="p" textStyle="t2Regular" color="fg.neutralSubtle">
        모션을 꺼도 색과 숫자, 눌림 상태(aria-pressed)는 그대로 남아요.
      </Text>
    </div>
  )
}

export function HeroDevice() {
  return (
    <div className="hero-device" aria-label="인터랙션 미리보기">
      <div className="hero-device__frame">
        <div className="hero-device__status" aria-hidden="true">
          <span>9:41</span>
          <span className="hero-device__island" />
          <span>● ● ●</span>
        </div>
        <div className="hero-device__appbar">
          <Text textStyle="t5Bold">작업 방식</Text>
          <Text textStyle="t2Regular" color="fg.neutralSubtle">
            직접 눌러 보세요
          </Text>
        </div>
        <ChipTabsRoot defaultValue="question" variant="neutralSolid" size="medium" className="hero-device__tabs">
          <ChipTabsList>
            <ChipTabsTrigger value="question">질문</ChipTabsTrigger>
            <ChipTabsTrigger value="state">상태</ChipTabsTrigger>
            <ChipTabsTrigger value="motion">움직임</ChipTabsTrigger>
          </ChipTabsList>
          <ChipTabsContent value="question">
            <QuestionDemo />
          </ChipTabsContent>
          <ChipTabsContent value="state">
            <StateDemo />
          </ChipTabsContent>
          <ChipTabsContent value="motion">
            <MotionDemo />
          </ChipTabsContent>
        </ChipTabsRoot>
      </div>
      <div className="hero-device__glow" aria-hidden="true" />
    </div>
  )
}
