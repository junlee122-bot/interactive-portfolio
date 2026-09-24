import { useCallback, useRef, useState } from 'react'
import { SnackbarProvider } from 'seed-design/ui/snackbar'
import { ProjectDialog } from './components/ProjectDialog'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { projects } from './data/projects'
import { useReveal } from './hooks/useReveal'
import { ActivitySection } from './sections/ActivitySection'
import { ContactSection } from './sections/ContactSection'
import { FeaturedSection } from './sections/FeaturedSection'
import { HeroSection } from './sections/HeroSection'
import { IndexSection } from './sections/IndexSection'
import { ProcessSection } from './sections/ProcessSection'

export function App() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useReveal()

  const openProject = useCallback((slug: string) => {
    triggerRef.current = document.activeElement as HTMLElement | null
    setOpenSlug(slug)
  }, [])

  const closeProject = useCallback(() => {
    setOpenSlug(null)
    // Return focus to whatever opened the dialog.
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }, [])

  const project = projects.find((item) => item.slug === openSlug) ?? null

  return (
    <SnackbarProvider>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <SiteHeader />
      <main id="main">
        <HeroSection onOpenProject={openProject} />
        <FeaturedSection onOpenProject={openProject} />
        <IndexSection onOpenProject={openProject} />
        <ProcessSection onOpenProject={openProject} />
        <ActivitySection />
        <ContactSection />
      </main>
      <SiteFooter />
      <ProjectDialog project={project} onClose={closeProject} />
    </SnackbarProvider>
  )
}
