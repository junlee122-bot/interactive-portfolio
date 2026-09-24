import { Badge, Text } from '@seed-design/react'
import { useEffect, useState } from 'react'
import { Callout } from 'seed-design/ui/callout'
import { DialogBody, DialogContent, DialogFooter, DialogRoot } from 'seed-design/ui/dialog'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'seed-design/ui/tabs'
import { categoryLabels, type Project } from '../data/projects'
import { ProjectLinks } from './ProjectLinks'

interface ProjectDialogProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  // Keep the last project rendered while the exit animation runs.
  const [shown, setShown] = useState<Project | null>(project)
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    if (project) setShown(project)
    setTab('overview')
  }, [project])

  const hasEngineering = (shown?.engineering.length ?? 0) > 0

  return (
    <DialogRoot open={project !== null} onOpenChange={(open) => !open && onClose()} closeOnInteractOutside>
      {shown && (
        <DialogContent
          className="project-dialog"
          title={shown.name}
          description={shown.tagline}
          // Above the sticky site header (z-index 20).
          layerIndex={30}
        >
          <DialogBody>
            <div className="project-dialog__meta">
              <Badge tone="brand" variant="weak">
                {categoryLabels[shown.category]}
              </Badge>
              {shown.badges.map((badge) => (
                <Badge key={badge} tone="neutral" variant="outline">
                  {badge}
                </Badge>
              ))}
              <Text textStyle="t3Regular" color="fg.neutralSubtle">
                {shown.period}
              </Text>
            </div>

            {shown.image && (
              <img className="project-dialog__image" src={shown.image} alt={shown.imageAlt ?? ''} loading="lazy" />
            )}

            <TabsRoot value={tab} onValueChange={setTab} triggerLayout="fill" size="medium">
              <TabsList>
                <TabsTrigger value="overview">개요</TabsTrigger>
                <TabsTrigger value="built">만든 것</TabsTrigger>
                {hasEngineering && <TabsTrigger value="engineering">설계</TabsTrigger>}
                <TabsTrigger value="limits">한계</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="project-dialog__panel">
                  <Text as="p" textStyle="t5Regular">
                    {shown.problem}
                  </Text>
                  {shown.numbers && (
                    <dl className="number-row">
                      {shown.numbers.map((number) => (
                        <div key={number.label}>
                          <dt>{number.label}</dt>
                          <dd>{number.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <ul className="stack-list" aria-label="사용 기술">
                    {shown.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {shown.credit && <Callout tone="informative" title="함께 만든 사람" description={shown.credit} />}
                </div>
              </TabsContent>

              <TabsContent value="built">
                <ul className="project-dialog__panel bullet-list">
                  {shown.built.map((item) => (
                    <li key={item}>
                      <Text textStyle="t4Regular">{item}</Text>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              {hasEngineering && (
                <TabsContent value="engineering">
                  <ol className="project-dialog__panel decision-list">
                    {shown.engineering.map((item) => (
                      <li key={item.title} className="decision">
                        <Text as="h4" textStyle="t5Bold">
                          {item.title}
                        </Text>
                        <Text as="p" textStyle="t4Regular" color="fg.neutralMuted">
                          {item.body}
                        </Text>
                      </li>
                    ))}
                  </ol>
                </TabsContent>
              )}

              <TabsContent value="limits">
                <div className="project-dialog__panel">
                  {shown.limits.map((limit) => (
                    <Callout key={limit} tone="warning" description={limit} />
                  ))}
                </div>
              </TabsContent>
            </TabsRoot>
          </DialogBody>
          {shown.links.length > 0 && (
            <DialogFooter>
              <ProjectLinks project={shown} size="large" />
            </DialogFooter>
          )}
        </DialogContent>
      )}
    </DialogRoot>
  )
}
