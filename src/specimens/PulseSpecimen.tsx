import { Text } from '@seed-design/react'
import { useMemo, useState } from 'react'
import { Slider } from 'seed-design/ui/slider'

const BAR_COUNT = 28

function describe(energy: number, focus: number) {
  const tempo = energy >= 66 ? '빠른 템포' : energy >= 33 ? '중간 템포' : '느린 템포'
  const vocal = focus >= 66 ? '보컬이 거의 없는 곡' : focus >= 33 ? '보컬이 절제된 곡' : '따라 부르기 좋은 곡'
  const title =
    energy >= 66 && focus >= 66
      ? '몰입해서 달리는 작업'
      : energy >= 66
        ? '움직이며 듣는 시간'
        : focus >= 66
          ? '조용히 파고드는 시간'
          : '느슨하게 쉬어 가는 시간'
  return { tempo, vocal, title }
}

export function PulseSpecimen() {
  const [energy, setEnergy] = useState(64)
  const [focus, setFocus] = useState(78)
  const { tempo, vocal, title } = describe(energy, focus)

  const bars = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, index) => {
        const wave = Math.sin((index / BAR_COUNT) * Math.PI * (2 + energy / 30))
        const jitter = Math.sin(index * 12.9898) * 0.5 + 0.5
        return 0.18 + (energy / 100) * (0.45 + Math.abs(wave) * 0.35) + jitter * 0.08 * (1 - focus / 120)
      }),
    [energy, focus],
  )

  return (
    <div className="specimen specimen--pulse">
      <div className="pulse-wave" aria-hidden="true">
        {bars.map((height, index) => (
          <span key={index} style={{ transform: `scaleY(${Math.min(height, 1)})` }} />
        ))}
      </div>
      <div className="specimen__result" aria-live="polite">
        <Text as="p" textStyle="t4Bold">
          {title}
        </Text>
        <Text as="p" textStyle="t3Regular" color="fg.neutralMuted">
          에너지 {energy} → <strong>{tempo}</strong> · 집중 {focus} → <strong>{vocal}</strong>
        </Text>
      </div>
      <div className="specimen__controls">
        <Slider
          label="에너지"
          min={0}
          max={100}
          values={[energy]}
          onValuesChange={(values) => setEnergy(values[0])}
          getAriaLabel={() => '에너지'}
        />
        <Slider
          label="집중도"
          min={0}
          max={100}
          values={[focus]}
          onValuesChange={(values) => setFocus(values[0])}
          getAriaLabel={() => '집중도'}
        />
      </div>
    </div>
  )
}
