import IconArrowUpRightLine from '@karrotmarket/react-monochrome-icon/IconArrowUpRightLine'
import IconBracketLeftArrowRightLine from '@karrotmarket/react-monochrome-icon/IconBracketLeftArrowRightLine'
import IconPersonCircleLine from '@karrotmarket/react-monochrome-icon/IconPersonCircleLine'
import IconSquare2StackedLine from '@karrotmarket/react-monochrome-icon/IconSquare2StackedLine'
import { Icon, PrefixIcon, SuffixIcon, Text } from '@seed-design/react'
import { ActionButton } from 'seed-design/ui/action-button'
import { List, ListLinkItem } from 'seed-design/ui/list'
import { Snackbar, useSnackbarAdapter } from 'seed-design/ui/snackbar'
import { profile } from '../data'

export function ContactSection() {
  const snackbar = useSnackbarAdapter()

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(profile.source)
      snackbar.create({ render: () => <Snackbar variant="positive" message="소스 링크를 복사했어요" /> })
    } catch {
      snackbar.create({
        render: () => <Snackbar variant="critical" message="복사하지 못했어요. 링크를 직접 열어 주세요." />,
      })
    }
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__copy reveal">
          <Text as="p" textStyle="t4Bold" color="fg.brand">
            Let’s talk
          </Text>
          <h2 id="contact-title" className="contact__title">
            풀고 싶은 문제,
            <br />
            하나부터 이야기해요.
          </h2>
          <Text as="p" textStyle="t5Regular" color="fg.neutralMuted">
            완성된 기획서가 아니어도 좋습니다. 어떤 사용자가 어디에서 막히는지, 어떤 경험을 더 낫게 만들고 싶은지. 그 질문에서
            출발하고 싶습니다.
          </Text>
          <div className="hero__actions">
            <ActionButton asChild variant="brandSolid" size="large">
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub에서 이어 보기
                <SuffixIcon svg={<IconArrowUpRightLine />} />
              </a>
            </ActionButton>
            <ActionButton variant="neutralWeak" size="large" onClick={copySource}>
              <PrefixIcon svg={<IconSquare2StackedLine />} />
              소스 링크 복사
            </ActionButton>
          </div>
        </div>

        <div className="contact__card reveal">
          <List>
            <ListLinkItem
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              prefix={<Icon svg={<IconPersonCircleLine />} size="x6" />}
              title="GitHub"
              detail="junlee122-bot"
              suffix={<Icon svg={<IconArrowUpRightLine />} size="x4" />}
            />
            <ListLinkItem
              href={profile.source}
              target="_blank"
              rel="noreferrer"
              prefix={<Icon svg={<IconBracketLeftArrowRightLine />} size="x6" />}
              title="이 포트폴리오의 소스"
              detail="React · TypeScript · SEED Design"
              suffix={<Icon svg={<IconArrowUpRightLine />} size="x4" />}
            />
          </List>
          <div className="contact__brief">
            <Text as="p" textStyle="t2Bold" color="fg.neutralSubtle">
              대화를 시작하기 좋은 재료
            </Text>
            <Text as="p" textStyle="t4Medium">
              문제의 맥락 · 함께 확인할 범위 · 생각하고 있는 일정
            </Text>
          </div>
        </div>
      </div>
    </section>
  )
}
