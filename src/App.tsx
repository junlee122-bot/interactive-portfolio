import { useCallback, useEffect, useRef, useState } from 'react'
import { CaseStudyDialog } from './components/CaseStudyDialog'
import { CommandPalette } from './components/CommandPalette'
import { MotionControl } from './components/MotionControl'
import { ParticleField } from './components/ParticleField'
import { Preloader } from './components/Preloader'
import { ScrollRail } from './components/ScrollRail'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { SpatialCursor } from './components/SpatialCursor'
import { navigation, projects } from './data'
import { useReducedMotion } from './hooks/useReducedMotion'
import { AboutSection } from './sections/AboutSection'
import { ContactSection } from './sections/ContactSection'
import { HeroSection } from './sections/HeroSection'
import { LabSection } from './sections/LabSection'
import { ProcessSection } from './sections/ProcessSection'
import { ToolkitSection } from './sections/ToolkitSection'
import { WorkSection } from './sections/WorkSection'
import type { Project } from './types'

export function App() {
  const shellRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const projectTriggerRef = useRef<HTMLElement | null>(null)
  const focusTimerRef = useRef(0)
  const [loaded, setLoaded] = useState(() => {
    try {
      return window.sessionStorage.getItem('junlee-intro-seen') === '1'
    } catch {
      return false
    }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [motionPaused, setMotionPaused] = useState(() => {
    try {
      return window.sessionStorage.getItem('junlee-motion-paused') === '1'
    } catch {
      return false
    }
  })
  const [activeSection, setActiveSection] = useState('top')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [commandOpen, setCommandOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const motionStopped = reducedMotion || motionPaused

  const finishLoading = useCallback(() => {
    try {
      window.sessionStorage.setItem('junlee-intro-seen', '1')
    } catch {
      // Storage can be unavailable in strict privacy modes; the experience still works.
    }
    setLoaded(true)
  }, [])
  const openCommand = useCallback(() => setCommandOpen(true), [])
  const closeCommand = useCallback(() => setCommandOpen(false), [])

  const openProject = useCallback((project: Project) => {
    projectTriggerRef.current = document.activeElement as HTMLElement
    setCommandOpen(false)
    setSelectedProject(project)
  }, [])

  const closeProject = useCallback(() => {
    setSelectedProject(null)
    window.clearTimeout(focusTimerRef.current)
    focusTimerRef.current = window.setTimeout(() => projectTriggerRef.current?.focus(), 20)
  }, [])

  const openNextProject = useCallback(() => {
    setSelectedProject((current) => {
      const currentIndex = projects.findIndex((project) => project.slug === current?.slug)
      return projects[(currentIndex + 1) % projects.length]
    })
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-loading', !loaded)
    const main = mainRef.current
    const header = document.querySelector<HTMLElement>('.site-header')
    const footer = document.querySelector<HTMLElement>('.site-footer')
    if (!main) return

    if (loaded && !menuOpen) main.removeAttribute('inert')
    else main.setAttribute('inert', '')

    if (loaded && !menuOpen) footer?.removeAttribute('inert')
    else footer?.setAttribute('inert', '')

    if (loaded) header?.removeAttribute('inert')
    else header?.setAttribute('inert', '')

    return () => {
      main.removeAttribute('inert')
      header?.removeAttribute('inert')
      footer?.removeAttribute('inert')
      document.body.classList.remove('is-loading')
    }
  }, [loaded, menuOpen])

  const toggleMotion = useCallback(() => {
    if (reducedMotion) return
    setMotionPaused((current) => {
      const next = !current
      try {
        window.sessionStorage.setItem('junlee-motion-paused', next ? '1' : '0')
      } catch {
        // Keep the in-memory preference when storage is unavailable.
      }
      return next
    })
  }, [reducedMotion])

  useEffect(() => () => window.clearTimeout(focusTimerRef.current), [])

  useEffect(() => {
    if (!loaded) return
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        if (document.querySelector('.case-dialog[open]')) return
        event.preventDefault()
        setCommandOpen((current) => !current)
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [loaded])

  useEffect(() => {
    const sectionIds = ['top', ...navigation.map((item) => item.id)]
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    const visibleSections = new Map<string, IntersectionObserverEntry>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, entry)
        else visibleSections.delete(entry.target.id)
      })

      const closest = [...visibleSections.values()].sort((a, b) => {
        const focusLine = window.innerHeight * 0.32
        return Math.abs(a.boundingClientRect.top - focusLine) - Math.abs(b.boundingClientRect.top - focusLine)
      })[0]
      if (closest) setActiveSection(closest.target.id)
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [0, 0.1, 0.3, 0.6] })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    if (reducedMotion) {
      revealElements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -9% 0px', threshold: 0.08 })

    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    const regions = Array.from(document.querySelectorAll<HTMLElement>('main > section, .site-footer'))

    if (motionStopped) {
      regions.forEach((region) => region.dataset.motionActive = 'false')
      return () => regions.forEach((region) => delete region.dataset.motionActive)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        ;(entry.target as HTMLElement).dataset.motionActive = String(entry.isIntersecting)
      })
    }, { rootMargin: '18% 0px 18% 0px', threshold: 0 })

    regions.forEach((region) => observer.observe(region))
    return () => {
      observer.disconnect()
      regions.forEach((region) => delete region.dataset.motionActive)
    }
  }, [motionStopped])

  useEffect(() => {
    let scrollFrame = 0
    let pointerFrame = 0
    let maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 3
    let previousScrollY = window.scrollY
    let previousScrollTime = performance.now()
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const updateMaxScroll = () => {
      maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      updateScroll()
    }

    const updateScroll = () => {
      if (scrollFrame) return
      scrollFrame = requestAnimationFrame(() => {
        const now = performance.now()
        const currentScrollY = window.scrollY
        const progress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1)
        const delta = currentScrollY - previousScrollY
        const elapsed = Math.max(now - previousScrollTime, 16)
        const velocity = Math.min(Math.abs(delta) / elapsed / 2.2, 1)
        progressRef.current?.style.setProperty('transform', `scaleX(${progress})`)
        shellRef.current?.style.setProperty('--page-scroll', `${currentScrollY}`)
        shellRef.current?.style.setProperty('--scroll-progress', `${progress}`)
        shellRef.current?.style.setProperty('--scroll-velocity', `${velocity}`)
        shellRef.current?.style.setProperty('--scroll-direction', delta >= 0 ? '1' : '-1')
        shellRef.current?.style.setProperty('--hero-drift', motionStopped ? '0px' : `${Math.min(currentScrollY * 0.085, 78)}px`)
        shellRef.current?.style.setProperty('--hero-turn', motionStopped ? '0deg' : `${Math.min(currentScrollY * 0.028, 22)}deg`)
        previousScrollY = currentScrollY
        previousScrollTime = now
        scrollFrame = 0
      })
    }

    const updatePointer = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (pointerFrame) return
      pointerFrame = requestAnimationFrame(() => {
        shellRef.current?.style.setProperty('--spot-x', `${pointerX}px`)
        shellRef.current?.style.setProperty('--spot-y', `${pointerY}px`)
        pointerFrame = 0
      })
    }

    const resizeObserver = new ResizeObserver(updateMaxScroll)
    resizeObserver.observe(document.documentElement)
    window.addEventListener('scroll', updateScroll, { passive: true })
    if (finePointer && !motionStopped) window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('resize', updateMaxScroll)
    updateScroll()

    return () => {
      cancelAnimationFrame(scrollFrame)
      cancelAnimationFrame(pointerFrame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('resize', updateMaxScroll)
    }
  }, [motionStopped])

  return (
    <div
      ref={shellRef}
      className={`site-shell ${loaded ? 'is-loaded' : ''}`}
      data-motion-paused={motionStopped}
    >
      {!loaded ? <Preloader onComplete={finishLoading} /> : null}
      {loaded ? <a className="skip-link" href="#main">본문 바로가기</a> : null}
      <SpatialCursor paused={motionStopped} />
      <ParticleField paused={motionStopped} />
      <div className="ambient-field" aria-hidden="true"><i /><i /><i /></div>
      <div className="page-grid" aria-hidden="true" />
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />

      <SiteHeader activeSection={activeSection} onOpenCommand={openCommand} onMenuOpenChange={setMenuOpen} />
      {loaded ? <ScrollRail activeSection={activeSection} /> : null}
      {loaded ? <MotionControl paused={motionPaused} reducedMotion={reducedMotion} onToggle={toggleMotion} /> : null}

      <main ref={mainRef} id="main" tabIndex={-1}>
        <HeroSection motionStopped={motionStopped} />
        <WorkSection onOpenProject={openProject} />
        <ProcessSection />
        <AboutSection />
        <LabSection />
        <ToolkitSection />
        <ContactSection />
      </main>

      <SiteFooter />
      <CommandPalette open={commandOpen} onClose={closeCommand} onOpenProject={openProject} />
      <CaseStudyDialog project={selectedProject} onClose={closeProject} onNext={openNextProject} />
    </div>
  )
}
