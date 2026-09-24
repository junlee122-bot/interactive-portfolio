import IconArrowClockwiseCircularLine from '@karrotmarket/react-monochrome-icon/IconArrowClockwiseCircularLine'
import IconMagnifyingglassSparkleLine from '@karrotmarket/react-monochrome-icon/IconMagnifyingglassSparkleLine'
import { Badge, Icon, PrefixIcon, Text } from '@seed-design/react'
import { useEffect, useRef, useState } from 'react'
import { ActionButton } from 'seed-design/ui/action-button'
import { Callout } from 'seed-design/ui/callout'
import { SegmentedControl, SegmentedControlItem } from 'seed-design/ui/segmented-control'
import { Snackbar, useSnackbarAdapter } from 'seed-design/ui/snackbar'
import { Switch } from 'seed-design/ui/switch'
import { SectionHeading } from '../components/SectionHeading'

type Outcome = 'results' | 'empty' | 'error'
type Status = 'idle' | 'loading' | 'success' | 'empty' | 'error'

interface LogEntry {
  id: number
  query: string
  delay: number
  state: 'pending' | 'applied' | 'ignored'
}

const catalog = ['제주 한 달 살기', '제주 오름 코스', '제주 카페 지도', '서울 야경 산책', '서울 전시 일정', '부산 바다 수영', '부산 돼지국밥']
const queries = ['제주', '서울', '부산'] as const

export function LabSection() {
  const snackbar = useSnackbarAdapter()
  const [query, setQuery] = useState<(typeof queries)[number]>('제주')
  const [outcome, setOutcome] = useState<Outcome>('results')
  const [guard, setGuard] = useState(true)
  const [status, setStatus] = useState<Status>('idle')
  const [results, setResults] = useState<{ query: string; items: string[] } | null>(null)
  const [log, setLog] = useState<LogEntry[]>([])
  const latestRef = useRef(0)
  const timersRef = useRef<number[]>([])

  useEffect(() => () => timersRef.current.forEach((timer) => window.clearTimeout(timer)), [])

  const send = (nextQuery = query) => {
    const id = latestRef.current + 1
    latestRef.current = id
    // Odd requests are slow and even ones fast, so two quick taps make the stale answer arrive last.
    const delay = id % 2 === 1 ? 1800 : 600
    const requestOutcome = outcome
    setStatus('loading')
    setLog((current) => [{ id, query: nextQuery, delay, state: 'pending' as const }, ...current].slice(0, 5))

    const timer = window.setTimeout(() => {
      const isStale = id !== latestRef.current
      const applied = !(guard && isStale)
      setLog((current) => current.map((entry) => (entry.id === id ? { ...entry, state: applied ? 'applied' : 'ignored' } : entry)))
      if (!applied) return

      if (requestOutcome === 'error') {
        setStatus('error')
        return
      }
      const items = requestOutcome === 'empty' ? [] : catalog.filter((item) => item.startsWith(nextQuery))
      setResults({ query: nextQuery, items })
      setStatus(items.length ? 'success' : 'empty')
      if (items.length && !isStale) {
        snackbar.create({
          timeout: 2400,
          render: () => <Snackbar variant="positive" message={`‘${nextQuery}’ 결과 ${items.length}개를 불러왔어요`} />,
        })
      }
    }, delay)
    timersRef.current.push(timer)
  }

  const pickQuery = (value: string) => {
    const next = value as (typeof queries)[number]
    setQuery(next)
    send(next)
  }

  const mismatch = results !== null && status === 'success' && results.query !== query

  return (
    <section className="section" id="lab" aria-labelledby="lab-title">
      <div className="container">
        <SectionHeading
          id="lab-title"
          eyebrow="State lab"
          title={
            <>
              정상 화면보다
              <br />
              경계에서 드러납니다.
            </>
          }
          description="검색어를 빠르게 바꾸면 늦게 도착한 이전 응답이 최신 결과를 덮을 수 있습니다. ‘최신 요청만 반영’을 끄고 지역을 연달아 눌러 보세요."
        />

        <div className="lab reveal">
          <div className="lab__controls">
            <div className="lab__field">
              <Text as="p" textStyle="t3Bold">
                검색어
              </Text>
              <SegmentedControl aria-label="검색어" value={query} onValueChange={pickQuery} style={{ width: '100%' }}>
                {queries.map((item) => (
                  <SegmentedControlItem key={item} value={item}>
                    {item}
                  </SegmentedControlItem>
                ))}
              </SegmentedControl>
            </div>

            <div className="lab__field">
              <Text as="p" textStyle="t3Bold">
                서버 응답 흉내
              </Text>
              <SegmentedControl aria-label="서버 응답" value={outcome} onValueChange={(value) => setOutcome(value as Outcome)} style={{ width: '100%' }}>
                <SegmentedControlItem value="results">결과 있음</SegmentedControlItem>
                <SegmentedControlItem value="empty">빈 결과</SegmentedControlItem>
                <SegmentedControlItem value="error">실패</SegmentedControlItem>
              </SegmentedControl>
            </div>

            <Switch size="24" label="최신 요청만 반영 (오래된 응답 무시)" checked={guard} onCheckedChange={setGuard} />

            <ActionButton variant="brandSolid" size="large" onClick={() => send()}>
              <PrefixIcon svg={<IconMagnifyingglassSparkleLine />} />
              요청 보내기
            </ActionButton>

            <div className="request-log" aria-label="요청 기록">
              <Text as="p" textStyle="t2Bold" color="fg.neutralSubtle">
                요청 기록 (최근 5개)
              </Text>
              {log.length === 0 ? (
                <Text as="p" textStyle="t3Regular" color="fg.neutralSubtle">
                  아직 보낸 요청이 없어요.
                </Text>
              ) : (
                <ol>
                  {log.map((entry) => (
                    <li key={entry.id}>
                      <span className="request-log__id">#{entry.id}</span>
                      <span>‘{entry.query}’</span>
                      <span className="request-log__delay">{(entry.delay / 1000).toFixed(1)}s</span>
                      <Badge
                        tone={entry.state === 'applied' ? 'positive' : entry.state === 'ignored' ? 'warning' : 'neutral'}
                        variant="weak"
                      >
                        {entry.state === 'applied' ? '반영됨' : entry.state === 'ignored' ? '무시됨' : '대기 중'}
                      </Badge>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>

          <div className="lab__screen" aria-live="polite" aria-busy={status === 'loading'}>
            <div className="lab__screen-bar">
              <Icon svg={<IconMagnifyingglassSparkleLine />} size="x4" />
              <Text textStyle="t4Medium">{query}</Text>
              <Badge tone={statusTone[status]} variant="solid">
                {statusLabel[status]}
              </Badge>
            </div>

            {status === 'idle' && (
              <div className="lab__empty">
                <Text textStyle="t5Bold">어디로 떠나 볼까요?</Text>
                <Text textStyle="t3Regular" color="fg.neutralMuted">
                  요청을 보내면 여기에 결과가 표시돼요.
                </Text>
              </div>
            )}

            {status === 'loading' && (
              <ul className="lab__results" aria-label="불러오는 중">
                {[0, 1, 2].map((index) => (
                  <li key={index} className="skeleton-row" />
                ))}
              </ul>
            )}

            {status === 'success' && results && (
              <>
                {mismatch && (
                  <Callout
                    tone="critical"
                    title="화면이 입력과 어긋났어요"
                    description={`검색어는 ‘${query}’인데 ‘${results.query}’ 결과가 보여요. 늦게 도착한 응답이 최신 결과를 덮었어요.`}
                  />
                )}
                <ul className="lab__results">
                  {results.items.map((item) => (
                    <li key={item} className="result-row">
                      <span className="result-row__thumb" aria-hidden="true" />
                      <Text textStyle="t4Medium">{item}</Text>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {status === 'empty' && (
              <div className="lab__empty">
                <Text textStyle="t5Bold">‘{results?.query ?? query}’ 결과가 없어요</Text>
                <Text textStyle="t3Regular" color="fg.neutralMuted">
                  빈 결과는 실패가 아니에요. 다른 지역을 골라 보세요.
                </Text>
              </div>
            )}

            {status === 'error' && (
              <div className="lab__empty">
                <Callout tone="critical" title="불러오지 못했어요" description="입력한 검색어는 그대로 있어요. 잠시 뒤 다시 시도해 주세요." />
                <ActionButton variant="neutralWeak" size="medium" onClick={() => send()}>
                  <PrefixIcon svg={<IconArrowClockwiseCircularLine />} />
                  다시 시도
                </ActionButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const statusLabel: Record<Status, string> = {
  idle: '대기',
  loading: '요청 중',
  success: '결과',
  empty: '빈 결과',
  error: '오류',
}

const statusTone: Record<Status, 'neutral' | 'informative' | 'positive' | 'warning' | 'critical'> = {
  idle: 'neutral',
  loading: 'informative',
  success: 'positive',
  empty: 'warning',
  error: 'critical',
}
