import { Text } from '@seed-design/react'
import { useMemo, useState, type KeyboardEvent } from 'react'
import { SegmentedControl, SegmentedControlItem } from 'seed-design/ui/segmented-control'
import { SectionHeading } from '../components/SectionHeading'
import { activity, activityTotal } from '../data/activity'

const WIDTH = 760
const HEIGHT = 260
const PAD = { top: 24, right: 8, bottom: 32, left: 36 }
const TICK_STEP = 50

function weekLabel(iso: string) {
  const start = new Date(`${iso}T00:00:00`)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  const fmt = (date: Date) => `${date.getMonth() + 1}.${date.getDate()}`
  return `${fmt(start)} – ${fmt(end)}`
}

export function ActivitySection() {
  const [view, setView] = useState<'chart' | 'table'>('chart')
  const [active, setActive] = useState<number | null>(null)

  const max = Math.max(...activity.map((week) => week.total))
  const peak = activity.findIndex((week) => week.total === max)
  const yMax = Math.ceil(max / TICK_STEP) * TICK_STEP
  const ticks = Array.from({ length: yMax / TICK_STEP + 1 }, (_, index) => index * TICK_STEP)

  const plotW = WIDTH - PAD.left - PAD.right
  const plotH = HEIGHT - PAD.top - PAD.bottom
  const band = plotW / activity.length
  const barW = Math.min(24, band - 2)

  const bars = useMemo(
    () =>
      activity.map((week, index) => {
        const h = week.total === 0 ? 0 : Math.max(2, (week.total / yMax) * plotH)
        return {
          x: PAD.left + index * band + (band - barW) / 2,
          y: PAD.top + plotH - h,
          h,
          week,
        }
      }),
    [band, barW, plotH, yMax],
  )

  const monthMarks = activity
    .map((week, index) => ({ index, date: new Date(`${week.week}T00:00:00`) }))
    .filter(({ date, index }) => index === 0 || date.getDate() <= 7)

  const onKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const delta = event.key === 'ArrowRight' ? 1 : -1
    setActive((current) => Math.max(0, Math.min(activity.length - 1, (current ?? peak) + delta)))
  }

  const current = active === null ? null : bars[active]

  return (
    <section className="section section--tinted" id="log" aria-labelledby="log-title">
      <div className="container">
        <SectionHeading
          id="log-title"
          eyebrow="Build log"
          title="주간 커밋 기록"
          description={`공개 저장소 전체의 커밋 ${activityTotal.toLocaleString()}개를 주 단위로 모았습니다. AI 에이전트와 협업자의 커밋을 포함한 저장소 기준 숫자입니다.`}
        />

        <div className="activity reveal">
          <div className="activity__header">
            <div className="activity__summary">
              <div>
                <Text as="p" textStyle="t3Medium" color="fg.neutralMuted">
                  가장 바빴던 주
                </Text>
                <Text as="p" textStyle="t6Bold">
                  {weekLabel(activity[peak].week)} · {max}커밋
                </Text>
              </div>
              <div>
                <Text as="p" textStyle="t3Medium" color="fg.neutralMuted">
                  그 주의 주인공
                </Text>
                <Text as="p" textStyle="t6Bold">
                  {activity[peak].repos[0][0]}
                </Text>
              </div>
            </div>
            <SegmentedControl aria-label="보기 방식" value={view} onValueChange={(value) => setView(value as 'chart' | 'table')}>
              <SegmentedControlItem value="chart">차트</SegmentedControlItem>
              <SegmentedControlItem value="table">표</SegmentedControlItem>
            </SegmentedControl>
          </div>

          {view === 'chart' ? (
            <div className="activity__chart" onPointerLeave={() => setActive(null)}>
              <svg
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                role="img"
                aria-label={`2026년 5월부터 9월까지 주간 커밋 수. 최대 ${max}개. 방향키로 주를 이동할 수 있습니다.`}
                tabIndex={0}
                onKeyDown={onKeyDown}
                onFocus={() => setActive((currentIndex) => currentIndex ?? peak)}
                onBlur={() => setActive(null)}
              >
                {ticks.map((tick) => {
                  const y = PAD.top + plotH - (tick / yMax) * plotH
                  return (
                    <g key={tick}>
                      <line className="activity__grid" x1={PAD.left} x2={WIDTH - PAD.right} y1={y} y2={y} />
                      <text className="activity__tick" x={PAD.left - 8} y={y} dy="0.32em" textAnchor="end">
                        {tick}
                      </text>
                    </g>
                  )
                })}

                {bars.map((bar, index) => (
                  <g key={bar.week.week}>
                    {bar.h > 0 && (
                      <path
                        className="activity__bar"
                        data-dim={active !== null && active !== index ? '' : undefined}
                        d={roundedTop(bar.x, bar.y, barW, bar.h, Math.min(4, bar.h))}
                      />
                    )}
                    {/* Hit target spans the full band so short bars stay easy to hover. */}
                    <rect
                      className="activity__hit"
                      x={PAD.left + index * band}
                      y={PAD.top}
                      width={band}
                      height={plotH}
                      onPointerEnter={() => setActive(index)}
                    />
                  </g>
                ))}

                <text
                  className="activity__label"
                  x={bars[peak].x + barW / 2}
                  y={bars[peak].y - 8}
                  textAnchor="middle"
                >
                  {max}
                </text>

                {monthMarks.map(({ index, date }) => (
                  <text
                    key={index}
                    className="activity__tick"
                    x={PAD.left + index * band + band / 2}
                    y={HEIGHT - 10}
                    textAnchor="middle"
                  >
                    {date.getMonth() + 1}월
                  </text>
                ))}
              </svg>

              {current && (
                <div
                  className="activity__tooltip"
                  role="status"
                  style={{
                    // Near either edge, anchor the tooltip inward so it never leaves the card.
                    ['--tooltip-shift' as string]:
                      current.x / WIDTH > 0.75 ? '-100%' : current.x / WIDTH < 0.2 ? '0%' : '-50%',
                    left: `${((current.x + barW / 2) / WIDTH) * 100}%`,
                    top: `${(Math.max(current.y, PAD.top + 20) / HEIGHT) * 100}%`,
                  }}
                >
                  <strong>{current.week.total}커밋</strong>
                  <span className="activity__tooltip-week">{weekLabel(current.week.week)}</span>
                  {current.week.repos.map(([name, count]) => (
                    <span key={name} className="activity__tooltip-row">
                      <span>{name}</span>
                      <span>{count}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="activity__table-wrap">
              <table className="activity__table">
                <caption className="sr-only">주간 커밋 수와 주요 저장소</caption>
                <thead>
                  <tr>
                    <th scope="col">주</th>
                    <th scope="col">커밋</th>
                    <th scope="col">주요 작업</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.map((week) => (
                    <tr key={week.week}>
                      <td>{weekLabel(week.week)}</td>
                      <td>{week.total}</td>
                      <td>{week.repos.map(([name, count]) => `${name} ${count}`).join(', ') || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/** Column path with rounded top corners and a square baseline. */
function roundedTop(x: number, y: number, w: number, h: number, r: number) {
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`
}
