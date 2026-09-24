import IconMoonLine from '@karrotmarket/react-monochrome-icon/IconMoonLine'
import IconSunLine from '@karrotmarket/react-monochrome-icon/IconSunLine'
import { Icon } from '@seed-design/react'
import { SegmentedControl, SegmentedControlItem } from 'seed-design/ui/segmented-control'
import { navigation, profile } from '../data'
import { useActiveSection } from '../hooks/useActiveSection'
import { useColorMode, type ColorMode } from '../hooks/useColorMode'

const sectionIds = navigation.map((item) => item.id)

export function SiteHeader() {
  const active = useActiveSection(sectionIds)
  const { mode, setMode } = useColorMode()

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand-mark" href="#top" aria-label={`${profile.name} 포트폴리오 맨 위로`}>
          <span className="brand-mark__dot" aria-hidden="true" />
          <span>jun.lee</span>
        </a>

        <nav className="site-nav" aria-label="주요 섹션">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="site-nav__link"
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <SegmentedControl
          className="theme-switch"
          aria-label="색상 모드"
          value={mode}
          onValueChange={(value) => setMode(value as ColorMode)}
        >
          <SegmentedControlItem value="system" aria-label="시스템 설정 따르기">
            자동
          </SegmentedControlItem>
          <SegmentedControlItem value="light-only" aria-label="라이트 모드">
            <Icon svg={<IconSunLine />} size="x4" />
          </SegmentedControlItem>
          <SegmentedControlItem value="dark-only" aria-label="다크 모드">
            <Icon svg={<IconMoonLine />} size="x4" />
          </SegmentedControlItem>
        </SegmentedControl>
      </div>
    </header>
  )
}
