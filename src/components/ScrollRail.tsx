import { navigation } from '../data'

interface ScrollRailProps {
  activeSection: string
}

export function ScrollRail({ activeSection }: ScrollRailProps) {
  return (
    <aside className="scroll-rail" aria-label="현재 섹션">
      <span className="scroll-rail-label">SCROLL POSITION</span>
      <div className="scroll-rail-line"><i /></div>
      <div className="scroll-rail-sections">
        {navigation.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'is-active' : ''} aria-label={`${item.label}로 이동`}>
            <span>{item.index}</span><i />
          </a>
        ))}
      </div>
    </aside>
  )
}
