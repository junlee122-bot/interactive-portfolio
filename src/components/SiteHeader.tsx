import { useEffect, useRef, useState } from 'react'
import { navigation } from '../data'
import { Close, Command, Menu } from './Icons'

interface SiteHeaderProps {
  activeSection: string
  onOpenCommand: () => void
  onMenuOpenChange?: (open: boolean) => void
}

export function SiteHeader({ activeSection, onOpenCommand, onMenuOpenChange }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuTriggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onMenuOpenChange?.(menuOpen)
  }, [menuOpen, onMenuOpenChange])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    if (!menuOpen) return
    const focusFrame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus())
    const handleKeyDown = (event: KeyboardEvent) => {
      if (document.querySelector('dialog[open]')) return
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
      }
      if (event.key !== 'Tab') return
      const links = Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])
      const first = menuTriggerRef.current
      const last = links.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 761px)')
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('menu-open')
      cancelAnimationFrame(focusFrame)
      desktop.removeEventListener('change', closeOnDesktop)
      document.removeEventListener('keydown', handleKeyDown)
      const returnTarget = desktop.matches
        ? menuTriggerRef.current?.closest('header')?.querySelector<HTMLAnchorElement>('.brand')
        : menuTriggerRef.current
      returnTarget?.focus({ preventScroll: true })
    }
  }, [menuOpen])

  return (
    <header className="site-header" data-section={activeSection}>
      <a href="#top" className="brand" aria-label="페이지 맨 위로">
        <span className="brand-mark">J</span>
        <span className="brand-name">JUN.LEE</span>
        <small>CREATIVE FRONTEND / 26</small>
      </a>

      <nav className="desktop-nav" aria-label="주요 메뉴">
        {navigation.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'is-active' : ''} aria-current={activeSection === item.id ? 'location' : undefined}>
            <span>{item.index}</span>{item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button type="button" className="command-trigger" onClick={onOpenCommand} aria-label="빠른 이동 열기">
          <Command size={15} /><span>QUICK NAV</span><kbd>⌘ K</kbd>
        </button>
        <span className="availability"><i /> SOURCE OPEN</span>
        <button
          ref={menuTriggerRef}
          type="button"
          className="menu-trigger"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>{menuOpen ? <Close size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div ref={menuRef} id="mobile-navigation" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-meta"><span>DIRECTORY</span><span>SEOUL / KST</span></div>
        <nav aria-label="모바일 메뉴">
          {navigation.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
              <span>{item.index}</span><strong>{item.label}</strong><i>↗</i>
            </a>
          ))}
        </nav>
        <div className="mobile-menu-footer"><i /> PUBLIC SOURCE / GITHUB</div>
      </div>
    </header>
  )
}
