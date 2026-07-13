import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode, type SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 24, children, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>{children}</svg>
}

function ArrowDown(props: IconProps) { return <Icon {...props}><path d="M12 4v16M6 14l6 6 6-6" /></Icon> }
function ArrowUpRight(props: IconProps) { return <Icon {...props}><path d="M7 17 17 7M7 7h10v10" /></Icon> }
function MoveDownRight(props: IconProps) { return <Icon {...props}><path d="M5 5l14 14M9 19h10V9" /></Icon> }
function Copy(props: IconProps) { return <Icon {...props}><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></Icon> }
function Mail(props: IconProps) { return <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon> }
function Github(props: IconProps) { return <Icon {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.5A5.8 5.8 0 0 0 19.2 3 5.5 5.5 0 0 0 19 0s-1.2-.4-4 1.5a13.5 13.5 0 0 0-7 0C5.2-.4 4 0 4 0a5.5 5.5 0 0 0-.2 3A5.8 5.8 0 0 0 2.2 7c0 5.9 3.5 7.1 6.8 7.5A4.8 4.8 0 0 0 8 18v4" /><path d="M8 19c-3 .9-3-1.5-4-2" /></Icon> }

const projects = [
  {
    id: '01',
    name: 'PULSE',
    category: 'AI MUSIC DISCOVERY PLATFORM',
    title: '취향이 흐르고,\n음악이 반응하는 경험.',
    description: '감정과 시간대에 따라 달라지는 인터랙티브 음악 큐레이션 플랫폼.',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'MOTION'],
    metric: '+42% SESSION TIME',
    className: 'pulse',
  },
  {
    id: '02',
    name: 'ORBIT',
    category: '3D DIGITAL SHOWROOM',
    title: '보는 순간부터,\n탐험이 시작되는 공간.',
    description: '제품과 브랜드의 서사를 공간감 있는 웹 경험으로 재구성한 디지털 쇼룸.',
    tags: ['REACT', 'THREE.JS', 'WEBGL'],
    metric: '60 FPS INTERACTION',
    className: 'orbit',
  },
  {
    id: '03',
    name: 'MOMENT',
    category: 'REAL-TIME TRAVEL JOURNAL',
    title: '장소와 감정을,\n하나의 장면으로.',
    description: '사진, 위치, 순간의 감정을 연결해 함께 기록하는 실시간 여행 저널.',
    tags: ['SUPABASE', 'MAPBOX', 'PWA'],
    metric: 'LIGHTHOUSE 98',
    className: 'moment',
  },
]

const capabilities = [
  {
    number: '01',
    word: 'THINK',
    korean: '문제의 본질을 찾습니다.',
    text: '사용자의 흐름과 브랜드의 목표를 연결해, 무엇을 왜 만들어야 하는지 먼저 정의합니다.',
    tags: ['STRATEGY', 'UX', 'PROTOTYPE'],
  },
  {
    number: '02',
    word: 'MAKE',
    korean: '감각을 코드로 번역합니다.',
    text: '디자인의 작은 의도까지 놓치지 않으면서 빠르고 견고한 인터페이스로 구현합니다.',
    tags: ['REACT', 'TYPESCRIPT', 'WEBGL'],
  },
  {
    number: '03',
    word: 'MOVE',
    korean: '움직임에 이유를 만듭니다.',
    text: '모션을 장식이 아니라 정보와 감정을 전달하는 인터페이스의 언어로 사용합니다.',
    tags: ['MOTION', 'INTERACTION', 'DETAIL'],
  },
]

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reducedMotion) return

    const context = canvas.getContext('2d')
    if (!context) return

    let width = 0
    let height = 0
    let frame = 0
    let visible = true
    const pointer = { x: -1000, y: -1000 }
    const particleCount = window.innerWidth < 700 ? 28 : 64
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      size: Math.random() * 1.3 + 0.25,
    }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const movePointer = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const handleVisibility = () => {
      visible = document.visibilityState === 'visible'
      if (visible) frame = requestAnimationFrame(draw)
    }

    const draw = () => {
      if (!visible) return
      context.clearRect(0, 0, width, height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        if (particle.x < -20) particle.x = width + 20
        if (particle.x > width + 20) particle.x = -20
        if (particle.y < -20) particle.y = height + 20
        if (particle.y > height + 20) particle.y = -20

        const px = pointer.x - particle.x
        const py = pointer.y - particle.y
        const pointerDistance = Math.hypot(px, py)
        if (pointerDistance < 150 && pointerDistance > 0) {
          particle.x -= (px / pointerDistance) * 0.12
          particle.y -= (py / pointerDistance) * 0.12
        }

        context.beginPath()
        context.fillStyle = index % 11 === 0 ? 'rgba(199,255,74,.72)' : 'rgba(244,241,232,.38)'
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()

        particles.slice(index + 1).forEach((other) => {
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (distance < 105) {
            context.beginPath()
            context.strokeStyle = `rgba(128,141,179,${0.055 * (1 - distance / 105)})`
            context.lineWidth = 0.5
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.stroke()
          }
        })
      })

      frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', movePointer)
    document.addEventListener('visibilitychange', handleVisibility)
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', movePointer)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [reducedMotion])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return
    let frame = 0
    let x = -100
    let y = -100
    let ringX = -100
    let ringY = -100

    const move = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      dotRef.current?.classList.add('is-visible')
      ringRef.current?.classList.add('is-visible')
    }

    const tick = () => {
      ringX += (x - ringX) * 0.14
      ringY += (y - ringY) * 0.14
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    const hover = (event: Event) => {
      const target = event.target as HTMLElement
      ringRef.current?.classList.toggle('is-hovering', Boolean(target.closest('a, button, .project-card')))
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', hover)
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', hover)
    }
  }, [reducedMotion])

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}

function MagneticLink({ children, href, className = '' }: { children: ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - bounds.left - bounds.width / 2
    const y = event.clientY - bounds.top - bounds.height / 2
    event.currentTarget.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <a ref={ref} href={href} className={`magnetic ${className}`} onMouseMove={move} onMouseLeave={reset}>
      {children}
    </a>
  )
}

function OrbitObject() {
  const ref = useRef<HTMLButtonElement>(null)

  const move = (event: MouseEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty('--tilt-x', `${y * -11}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${x * 14}deg`)
  }

  const reset = () => {
    ref.current?.style.setProperty('--tilt-x', '0deg')
    ref.current?.style.setProperty('--tilt-y', '0deg')
  }

  const pulse = () => {
    if (!ref.current) return
    ref.current.classList.remove('is-pulsing')
    void ref.current.offsetWidth
    ref.current.classList.add('is-pulsing')
  }

  return (
    <button
      ref={ref}
      type="button"
      className="orbit-object"
      aria-label="궤도 오브젝트 애니메이션 실행"
      onMouseMove={move}
      onMouseLeave={reset}
      onClick={pulse}
    >
      <span className="orbit-guide orbit-guide-one" />
      <span className="orbit-guide orbit-guide-two" />
      <span className="orbit-guide orbit-guide-three" />
      <span className="orbit-satellite satellite-one">UI</span>
      <span className="orbit-satellite satellite-two">CODE</span>
      <span className="orbit-satellite satellite-three">MOVE</span>
      <span className="orb">
        <span className="orb-shine" />
        <span className="orb-grid" />
      </span>
      <span className="orbit-pulse" />
      <span className="orbit-coordinate">37.5665° N / 126.9780° E</span>
    </button>
  )
}

function ProjectVisual({ type }: { type: string }) {
  if (type === 'pulse') {
    return (
      <div className="project-visual visual-pulse" aria-hidden="true">
        <span className="pulse-disc disc-back" />
        <span className="pulse-disc disc-front"><span>PULSE</span></span>
        <div className="sound-wave">{Array.from({ length: 28 }, (_, index) => <i key={index} style={{ '--i': index } as CSSProperties} />)}</div>
        <span className="visual-caption">EMOTION / 128 BPM</span>
      </div>
    )
  }

  if (type === 'orbit') {
    return (
      <div className="project-visual visual-orbit" aria-hidden="true">
        <span className="showroom-floor" />
        <span className="product-tower tower-one" />
        <span className="product-tower tower-two" />
        <span className="product-orbit ring-one" />
        <span className="product-orbit ring-two" />
        <span className="visual-caption">DIGITAL OBJECT / 360°</span>
      </div>
    )
  }

  return (
    <div className="project-visual visual-moment" aria-hidden="true">
      <span className="map-line map-line-one" />
      <span className="map-line map-line-two" />
      <span className="map-pin pin-one"><i /></span>
      <span className="map-pin pin-two"><i /></span>
      <span className="moment-photo photo-one" />
      <span className="moment-photo photo-two" />
      <span className="moment-word">MOMENT</span>
      <span className="visual-caption">SEOUL → ANYWHERE</span>
    </div>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const ref = useRef<HTMLElement>(null)

  const move = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--card-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--card-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <article ref={ref} className={`project-card project-${project.className}`} onMouseMove={move} data-reveal>
      <div className="project-glow" aria-hidden="true" />
      <header className="project-header">
        <span>{project.id} / {project.category}</span>
        <span>{project.metric}</span>
      </header>
      <ProjectVisual type={project.className} />
      <div className="project-copy">
        <div>
          <p className="project-name">{project.name}</p>
          <h3>{project.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
        </div>
        <div className="project-meta">
          <p>{project.description}</p>
          <ul aria-label="사용 기술">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </div>
      </div>
      <span className="project-action" aria-hidden="true">
        <span>VIEW CASE</span><ArrowUpRight size={20} />
      </span>
    </article>
  )
}

export function App() {
  const [loaded, setLoaded] = useState(false)
  const [time, setTime] = useState('')
  const [emailCopied, setEmailCopied] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const loadingTimer = window.setTimeout(() => setLoaded(true), reduced ? 80 : 1100)

    const updateTime = () => {
      setTime(new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date()))
    }
    updateTime()
    const clockTimer = window.setInterval(updateTime, 1000)

    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      document.documentElement.style.setProperty('--scroll-progress', `${maxScroll > 0 ? window.scrollY / maxScroll : 0}`)
    }
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-revealed')
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element))

    return () => {
      window.clearTimeout(loadingTimer)
      window.clearInterval(clockTimer)
      window.removeEventListener('scroll', updateScroll)
      revealObserver.disconnect()
    }
  }, [])

  const copyEmail = async () => {
    await navigator.clipboard.writeText('hello@leejun.dev')
    setEmailCopied(true)
    window.setTimeout(() => setEmailCopied(false), 1800)
  }

  return (
    <div className={`site-shell ${loaded ? 'is-loaded' : ''}`}>
      <a className="skip-link" href="#main">본문 바로가기</a>
      <div className="loading-screen" aria-hidden={loaded}>
        <div className="loading-mark"><span>J</span><i /></div>
        <div className="loading-copy">
          <span>INITIALIZING ORBIT</span>
          <span>000 — 100</span>
        </div>
        <div className="loading-line"><i /></div>
      </div>

      <CustomCursor />
      <ParticleField />
      <div className="ambient-glow" aria-hidden="true" />
      <div className="page-grid" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />

      <header className="site-header">
        <a href="#top" className="brand" aria-label="맨 위로">
          <span>JUN.LEE</span><small>/26</small>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#work">WORK</a>
          <a href="#about">PROFILE</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <div className="availability"><i /> AVAILABLE</div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-meta meta-left">
            <span>CREATIVE DEVELOPER</span>
            <span>SEOUL, KR</span>
          </div>
          <div className="hero-meta meta-right">
            <span>LOCAL TIME</span>
            <span>{time || '00:00:00'}</span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow"><span>LEE JUN</span> / FRONTEND DEVELOPER</p>
            <h1 id="hero-title">
              <span className="title-row row-one">화면을 <em>넘어,</em></span>
              <span className="title-row row-two">감각을 <strong>설계합니다.</strong></span>
            </h1>
            <div className="hero-subcopy">
              <p>코드와 모션, 디테일로<br />기억에 남는 디지털 경험을 만듭니다.</p>
              <p className="english-copy">I build interfaces that<br />move, react, and stay.</p>
            </div>
            <div className="hero-actions">
              <MagneticLink href="#work" className="button button-primary">
                <span>SELECTED WORK</span><ArrowDown size={18} />
              </MagneticLink>
              <MagneticLink href="#contact" className="button button-ghost">
                <span>LET'S TALK</span><ArrowUpRight size={18} />
              </MagneticLink>
            </div>
          </div>

          <div className="hero-orbit-wrap"><OrbitObject /></div>

          <div className="hero-footer">
            <span className="scroll-hint"><MoveDownRight size={18} /> SCROLL TO INITIATE</span>
            <span className="signal-line">SIGNAL <i /><i /><i /><i /><i /></span>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>CREATIVE DEVELOPMENT</span><i>✦</i><span>MOTION</span><i>✦</i><span>INTERACTION</span><i>✦</i><span>PERFORMANCE</span><i>✦</i>
            <span>CREATIVE DEVELOPMENT</span><i>✦</i><span>MOTION</span><i>✦</i><span>INTERACTION</span><i>✦</i><span>PERFORMANCE</span><i>✦</i>
          </div>
        </div>

        <section className="work section" id="work" aria-labelledby="work-title">
          <div className="section-heading" data-reveal>
            <div>
              <span className="section-index">01 / SELECTED WORK</span>
              <h2 id="work-title">궤도에 오른<br /><em>프로젝트.</em></h2>
            </div>
            <p>아이디어의 첫 점부터 사용자의 마지막 클릭까지.<br />감도와 목적을 함께 설계한 작업들입니다.</p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        </section>

        <section className="capabilities section" aria-labelledby="capabilities-title">
          <div className="capability-intro" data-reveal>
            <span className="section-index">02 / HOW I WORK</span>
            <h2 id="capabilities-title">IDEAS INTO<br /><span>EXPERIENCES.</span></h2>
          </div>
          <div className="capability-list">
            {capabilities.map((item) => (
              <article className="capability-row" key={item.word} data-reveal>
                <span className="capability-number">{item.number}</span>
                <h3>{item.word}</h3>
                <div className="capability-detail">
                  <strong>{item.korean}</strong>
                  <p>{item.text}</p>
                  <div>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <ArrowUpRight className="capability-arrow" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <div className="about-orbit" aria-hidden="true"><i /><i /><i /></div>
          <div className="about-topline">
            <span>03 / PROFILE</span>
            <span>DESIGN-AWARE · DETAIL-OBSESSED · USER-FIRST</span>
          </div>
          <div className="about-content" data-reveal>
            <p className="about-kicker">PIXEL PERFECT.<br />HUMAN FRIENDLY.</p>
            <div>
              <h2 id="about-title">보기 좋은 화면보다<br /><em>기억에 남는 경험을</em><br />만듭니다.</h2>
              <div className="about-description">
                <p>기획의 의도를 읽고 디자인의 감도를 지키며, 견고한 코드로 현실에 구현하는 크리에이티브 프론트엔드 개발자 이준입니다.</p>
                <p>작은 커서 반응부터 제품 전체의 인터랙션 시스템까지, 아이디어가 실제 감각이 되는 순간을 좋아합니다.</p>
              </div>
            </div>
          </div>
          <div className="about-stats" data-reveal>
            <div><strong>05<sup>+</sup></strong><span>YEARS BUILDING</span></div>
            <div><strong>24</strong><span>PROJECTS SHIPPED</span></div>
            <div><strong>∞</strong><span>CURIOSITY</span></div>
          </div>
        </section>

        <section className="toolkit section" aria-labelledby="toolkit-title">
          <div className="toolkit-heading" data-reveal>
            <span className="section-index">04 / TOOLKIT</span>
            <h2 id="toolkit-title">FAST. FLUID.<br /><em>BUILT TO LAST.</em></h2>
          </div>
          <div className="toolkit-grid" data-reveal>
            <article><span>01 / CORE</span><p>React<br />Next.js<br />TypeScript<br />JavaScript</p></article>
            <article><span>02 / MOTION</span><p>GSAP<br />Framer Motion<br />Three.js<br />WebGL</p></article>
            <article><span>03 / STYLING</span><p>CSS Architecture<br />Tailwind CSS<br />Design Systems<br />Responsive UI</p></article>
            <article><span>04 / DATA & TOOLS</span><p>Supabase<br />TanStack Query<br />Git · Figma<br />Vercel</p></article>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact-star star-one" aria-hidden="true">✦</div>
          <div className="contact-star star-two" aria-hidden="true">✦</div>
          <div className="contact-topline">
            <span>05 / CONTACT</span>
            <span><i /> AVAILABLE FOR SELECTED PROJECTS — 2026</span>
          </div>
          <div className="contact-content" data-reveal>
            <p>HAVE SOMETHING BOLD IN MIND?</p>
            <h2 id="contact-title">좋은 아이디어를<br /><em>함께 움직이게.</em></h2>
            <MagneticLink href="mailto:hello@leejun.dev" className="contact-cta">
              <span>START A<br />PROJECT</span><ArrowUpRight size={34} />
            </MagneticLink>
          </div>
          <div className="contact-details">
            <div>
              <span>GET IN TOUCH</span>
              <a href="mailto:hello@leejun.dev">hello@leejun.dev</a>
              <button type="button" onClick={copyEmail} aria-live="polite"><Copy size={14} /> {emailCopied ? 'COPIED!' : 'COPY EMAIL'}</button>
            </div>
            <div>
              <span>FIND ME ONLINE</span>
              <a href="https://github.com/junlee122-bot" target="_blank" rel="noreferrer"><Github size={15} /> GITHUB <ArrowUpRight size={13} /></a>
              <a href="mailto:hello@leejun.dev"><Mail size={15} /> EMAIL <ArrowUpRight size={13} /></a>
            </div>
            <div>
              <span>BASED IN</span>
              <p>SEOUL, SOUTH KOREA<br />{time} KST</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>DESIGNED WITH INTENTION.<br />BUILT WITH CURIOSITY.</p>
        <a href="#top">BACK TO ORBIT <ArrowUpRight size={15} /></a>
        <p>© 2026 LEE JUN.<br />ALL PIXELS RESERVED.</p>
      </footer>
    </div>
  )
}
