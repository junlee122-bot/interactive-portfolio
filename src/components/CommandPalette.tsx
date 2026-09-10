import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { navigation, projects } from '../data'
import type { Project } from '../types'
import { ArrowUpRight, Close, Command } from './Icons'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  onOpenProject: (project: Project) => void
}

type CommandItem = {
  id: string
  label: string
  meta: string
  keywords: string
  action: () => void
}

export function CommandPalette({ open, onClose, onOpenProject }: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const focusTimerRef = useRef(0)
  const activeOptionRef = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const dialog = dialogRef.current
    return () => {
      if (dialog?.open) dialog.close()
      if (!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open')
    }
  }, [])

  const items = useMemo<CommandItem[]>(() => [
    ...projects.map((project) => ({
      id: `project-${project.slug}`,
      label: `${project.name} — ${project.category}`,
      meta: 'CASE STUDY',
      keywords: `${project.name} ${project.category} 프로젝트 케이스 스터디`,
      action: () => onOpenProject(project),
    })),
    ...navigation.map((item) => ({
      id: `section-${item.id}`,
      label: `${item.index} / ${item.label}`,
      meta: 'SECTION',
      keywords: `${item.label} ${item.id} 섹션 이동`,
      action: () => document.querySelector(`#${item.id}`)?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' }),
    })),
    {
      id: 'github',
      label: 'GitHub에서 소스 보기',
      meta: 'EXTERNAL',
      keywords: 'github source code 깃허브 소스',
      action: () => window.open('https://github.com/junlee122-bot/interactive', '_blank', 'noopener,noreferrer'),
    },
  ], [onOpenProject, reducedMotion])

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return items
    return items.filter((item) => `${item.label} ${item.keywords}`.toLowerCase().includes(normalizedQuery))
  }, [items, query])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
      setQuery('')
      setActiveIndex(0)
      focusTimerRef.current = window.setTimeout(() => inputRef.current?.focus(), 20)
    }
    if (!open && dialog.open) dialog.close()
    document.body.classList.toggle('dialog-open', Boolean(document.querySelector('dialog[open]')))

    return () => window.clearTimeout(focusTimerRef.current)
  }, [open])

  useEffect(() => {
    if (open) activeOptionRef.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
  }, [activeIndex, open, query])

  const runItem = (item: CommandItem) => {
    // Close synchronously so focus returns before opening another modal or tab.
    dialogRef.current?.close()
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open')
    onClose()
    item.action()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return
    const lastIndex = Math.max(filteredItems.length - 1, 0)
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => Math.min(current + 1, lastIndex))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => Math.max(current - 1, 0))
    }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      setActiveIndex(event.key === 'Home' ? 0 : lastIndex)
    }
    if (event.key === 'Enter' && filteredItems[activeIndex]) {
      event.preventDefault()
      runItem(filteredItems[activeIndex])
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="command-dialog"
      aria-label="빠른 이동"
      onClose={() => { if (open && !dialogRef.current?.open) onClose() }}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <div className="command-panel">
        <div className="command-search">
          <Command size={20} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }}
            onKeyDown={handleKeyDown}
            placeholder="프로젝트 또는 섹션 검색..."
            aria-label="빠른 이동 검색"
            aria-controls="command-results"
            aria-expanded={open}
            aria-autocomplete="list"
            aria-activedescendant={filteredItems[activeIndex] ? `command-${filteredItems[activeIndex].id}` : undefined}
            role="combobox"
          />
          <button type="button" onClick={onClose} aria-label="빠른 이동 닫기"><Close size={17} /></button>
        </div>
        <div className="command-caption"><span>ORBIT DIRECTORY</span><span role="status" aria-live="polite">{filteredItems.length} RESULTS</span></div>
        <ul id="command-results" role="listbox" aria-label="검색 결과">
          {filteredItems.map((item, index) => (
            <li key={item.id} role="presentation">
              <button
                ref={index === activeIndex ? activeOptionRef : undefined}
                id={`command-${item.id}`}
                type="button"
                role="option"
                tabIndex={-1}
                aria-selected={index === activeIndex}
                className={index === activeIndex ? 'is-active' : ''}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => runItem(item)}
              >
                <span><small>{item.meta}</small>{item.label}</span><ArrowUpRight size={18} />
              </button>
            </li>
          ))}
          {filteredItems.length === 0 ? <li className="command-empty">일치하는 신호가 없습니다.</li> : null}
        </ul>
        <div className="command-help"><span><kbd>↑</kbd><kbd>↓</kbd> 이동</span><span><kbd>↵</kbd> 열기</span><span><kbd>ESC</kbd> 닫기</span></div>
      </div>
    </dialog>
  )
}
