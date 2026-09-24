import IconLockLine from '@karrotmarket/react-monochrome-icon/IconLockLine'
import IconPerson2Line from '@karrotmarket/react-monochrome-icon/IconPerson2Line'
import IconPersonLine from '@karrotmarket/react-monochrome-icon/IconPersonLine'
import { Badge, Icon, Text } from '@seed-design/react'
import { useState } from 'react'
import { Callout } from 'seed-design/ui/callout'
import { Chip } from 'seed-design/ui/chip'
import { Switch } from 'seed-design/ui/switch'

type Audience = 'me' | 'friends' | 'everyone'

const audiences: Record<Audience, { label: string; icon: JSX.Element }> = {
  me: { label: '나만', icon: <IconLockLine /> },
  friends: { label: '친구', icon: <IconPerson2Line /> },
  everyone: { label: '전체', icon: <IconPersonLine /> },
}

export function MomentSpecimen() {
  const [synced, setSynced] = useState(false)
  const [audience, setAudience] = useState<Audience>('me')
  const [preciseLocation, setPreciseLocation] = useState(false)

  const shared = audience !== 'me'
  const exposesLocation = shared && preciseLocation

  const summary = !synced
    ? '이 기기에만 저장돼 있어요. 기기를 잃어버리면 복구할 수 없어요.'
    : shared
      ? `${audiences[audience].label}에게 공개돼요. ${preciseLocation ? '정확한 위치도 함께 보여요.' : '위치는 도시 단위로만 보여요.'}`
      : '서버에 백업됐어요. 여전히 나만 볼 수 있어요.'

  return (
    <div className="specimen specimen--moment">
      <div className="moment-entry">
        <div className="moment-entry__photo" aria-hidden="true" />
        <div className="moment-entry__body">
          <Text textStyle="t4Bold">성산일출봉 새벽</Text>
          <div className="moment-entry__badges">
            <Badge tone={synced ? 'positive' : 'neutral'} variant="weak">
              {synced ? '동기화됨' : '기기에만 저장'}
            </Badge>
            <Badge tone={shared ? 'informative' : 'neutral'} variant="outline">
              {audiences[audience].label} 공개
            </Badge>
          </div>
        </div>
      </div>

      <div className="specimen__controls">
        <Switch
          size="24"
          tone="neutral"
          label="서버에 백업"
          checked={synced}
          onCheckedChange={(checked) => {
            setSynced(checked)
            if (!checked) setAudience('me')
          }}
        />
        <Chip.RadioRoot
          value={audience}
          onValueChange={(value) => setAudience(value as Audience)}
          aria-label="공개 범위"
          className="chip-row"
        >
          {(Object.keys(audiences) as Audience[]).map((key) => (
            <Chip.RadioItem key={key} value={key} size="small" variant="outlineStrong" disabled={!synced && key !== 'me'}>
              <Chip.PrefixIcon>
                <Icon svg={audiences[key].icon} />
              </Chip.PrefixIcon>
              <Chip.Label>{audiences[key].label}</Chip.Label>
            </Chip.RadioItem>
          ))}
        </Chip.RadioRoot>
        <Switch
          size="24"
          tone="neutral"
          label="정확한 위치 포함"
          checked={preciseLocation}
          onCheckedChange={setPreciseLocation}
        />
      </div>

      <Callout
        tone={exposesLocation ? 'warning' : synced ? 'positive' : 'neutral'}
        title={exposesLocation ? '공유 전에 한 번 더 확인해요' : undefined}
        description={summary}
      />
      {!synced && (
        <Text as="p" textStyle="t2Regular" color="fg.neutralSubtle">
          공유하려면 먼저 백업이 필요해요. 저장과 공개는 서로 다른 단계예요.
        </Text>
      )}
    </div>
  )
}
