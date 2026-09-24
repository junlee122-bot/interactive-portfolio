import { useCallback, useRef, useState } from 'react'
import { SnackbarProvider } from 'seed-design/ui/snackbar'
import { CaseStudyDialog } from './components/CaseStudyDialog'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { projects, type Project } from './data'
import { useReveal } from './hooks/useReveal'
import { ContactSection } from './sections/ContactSection'
import { HeroSection } from './sections/HeroSection'
import { LabSection } from './sections/LabSection'
import { ProcessSection } from './sections/ProcessSection'
import { WorkSection } from './sections/WorkSection'

export function App() {
  const [selected, setSelected] = useState<Project | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useReveal()

  const openProject = useCallback((project: Project) => {
    triggerRef.current = document.activeElement as HTMLElement | null
    setSelected(project)
  }, [])

  const closeProject = useCallback(() => {
    setSelected(null)
    // Return focus to the card button that opened the dialog.
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }, [])

  const showNextProject = useCallback(() => {
    setSelected((current) => {
      const index = projects.findIndex((project) => project.slug === current?.slug)
      return projects[(index + 1) % projects.length]
    })
  }, [])

  return (
    <SnackbarProvider>
      <a className="skip-link" href="#main">본문으로 건너뛰기</a>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <WorkSection onOpenProject={openProject} />
        <ProcessSection />
        <LabSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <CaseStudyDialog project={selected} onClose={closeProject} onNext={showNextProject} />
    </SnackbarProvider>
  )
}
