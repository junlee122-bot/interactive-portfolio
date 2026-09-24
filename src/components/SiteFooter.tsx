import { Text } from '@seed-design/react'
import { profile } from '../data/profile'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <Text textStyle="t3Regular" color="fg.neutralSubtle">
          © 2026 {profile.latinName}. Built with React, TypeScript and{' '}
          <a href="https://github.com/daangn/seed-design" target="_blank" rel="noreferrer">
            SEED Design
          </a>
          .
        </Text>
        <a className="site-footer__top" href="#top">
          맨 위로 ↑
        </a>
      </div>
    </footer>
  )
}
