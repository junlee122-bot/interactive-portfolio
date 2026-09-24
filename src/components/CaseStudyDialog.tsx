import IconArrowRightLine from '@karrotmarket/react-monochrome-icon/IconArrowRightLine'
import { Badge, SuffixIcon, Text } from '@seed-design/react'
import { useEffect, useState } from 'react'
import { Callout } from 'seed-design/ui/callout'
import { DialogAction, DialogBody, DialogContent, DialogFooter, DialogRoot } from 'seed-design/ui/dialog'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'seed-design/ui/tabs'
import { ActionButton } from 'seed-design/ui/action-button'
import type { Project } from '../data'

interface CaseStudyDialogProps {
  project: Project | null
  onClose: () => void
  onNext: () => void
}

export function CaseStudyDialog({ project, onClose, onNext }: CaseStudyDialogProps) {
  // Keep the last project rendered while the exit animation runs.
  const [shown, setShown] = useState<Project | null>(project)
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    if (project) setShown(project)
    setTab('overview')
  }, [project])

  return (
    <DialogRoot open={project !== null} onOpenChange={(open) => !open && onClose()} closeOnInteractOutside>
      {shown && (
        <DialogContent
          className="case-dialog"
          title={`${shown.id} · ${shown.name}`}
          description={shown.headline.replace('\n', ' ')}
        >
          <DialogBody>
            <div className="case-dialog__meta">
              <Badge tone={shown.tone} variant="weak">
                {shown.category}
              </Badge>
              <Badge tone="neutral" variant="outline">
                {shown.year} · {shown.status}
              </Badge>
            </div>
            <TabsRoot value={tab} onValueChange={setTab} triggerLayout="fill" size="medium">
              <TabsList>
                <TabsTrigger value="overview">개요</TabsTrigger>
                <TabsTrigger value="decisions">결정</TabsTrigger>
                <TabsTrigger value="build">구현</TabsTrigger>
                <TabsTrigger value="verify">검증</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="case-dialog__panel">
                  <CaseBlock title="문제">{shown.challenge}</CaseBlock>
                  <CaseBlock title="가설">{shown.hypothesis}</CaseBlock>
                  <CaseBlock title="역할">{shown.role.join(' · ')}</CaseBlock>
                </div>
              </TabsContent>

              <TabsContent value="decisions">
                <ol className="case-dialog__panel decision-list">
                  {shown.decisions.map((decision, index) => (
                    <li key={decision.title} className="decision">
                      <span className="decision__index">{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <Text as="h4" textStyle="t5Bold">
                          {decision.title}
                        </Text>
                        <Text as="p" textStyle="t4Regular" color="fg.neutralMuted">
                          {decision.description}
                        </Text>
                        <p className="decision__tradeoff">
                          <strong>트레이드오프</strong> {decision.tradeoff}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </TabsContent>

              <TabsContent value="build">
                <ul className="case-dialog__panel engineering-list">
                  {shown.engineering.map((item) => (
                    <li key={item}>
                      <Text textStyle="t4Regular">{item}</Text>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="verify">
                <div className="case-dialog__panel">
                  <Callout tone="warning" title="확인한 범위" description={shown.validation} />
                  <CaseBlock title="다음 실험">{shown.next}</CaseBlock>
                </div>
              </TabsContent>
            </TabsRoot>
          </DialogBody>
          <DialogFooter>
            <div className="case-dialog__actions">
              <DialogAction variant="neutralWeak" size="large">
                닫기
              </DialogAction>
              <ActionButton variant="brandSolid" size="large" onClick={onNext} flexGrow>
                다음 사례
                <SuffixIcon svg={<IconArrowRightLine />} />
              </ActionButton>
            </div>
          </DialogFooter>
        </DialogContent>
      )}
    </DialogRoot>
  )
}

function CaseBlock({ title, children }: { title: string; children: string }) {
  return (
    <section className="case-block">
      <Text as="h4" textStyle="t3Bold" color="fg.brand">
        {title}
      </Text>
      <Text as="p" textStyle="t4Regular">
        {children}
      </Text>
    </section>
  )
}
