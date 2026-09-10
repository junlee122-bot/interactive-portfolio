import type { ReactNode, SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 24, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ArrowDown(props: IconProps) {
  return <Icon {...props}><path d="M12 4v16M6 14l6 6 6-6" /></Icon>
}

export function ArrowRight(props: IconProps) {
  return <Icon {...props}><path d="M5 12h14M14 6l6 6-6 6" /></Icon>
}

export function ArrowUpRight(props: IconProps) {
  return <Icon {...props}><path d="M7 17 17 7M7 7h10v10" /></Icon>
}

export function Brackets(props: IconProps) {
  return <Icon {...props}><path d="M8 3H4v18h4M16 3h4v18h-4" /></Icon>
}

export function Check(props: IconProps) {
  return <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>
}

export function Close(props: IconProps) {
  return <Icon {...props}><path d="M5 5l14 14M19 5 5 19" /></Icon>
}

export function Command(props: IconProps) {
  return <Icon {...props}><path d="M9 6V5a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v14a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6Z" /></Icon>
}

export function Copy(props: IconProps) {
  return <Icon {...props}><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></Icon>
}

export function Github(props: IconProps) {
  return <Icon {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.5A5.8 5.8 0 0 0 19.2 3 5.5 5.5 0 0 0 19 0s-1.2-.4-4 1.5a13.5 13.5 0 0 0-7 0C5.2-.4 4 0 4 0a5.5 5.5 0 0 0-.2 3A5.8 5.8 0 0 0 2.2 7c0 5.9 3.5 7.1 6.8 7.5A4.8 4.8 0 0 0 8 18v4" /><path d="M8 19c-3 .9-3-1.5-4-2" /></Icon>
}

export function Menu(props: IconProps) {
  return <Icon {...props}><path d="M4 8h16M4 16h16" /></Icon>
}

export function Spark(props: IconProps) {
  return <Icon {...props}><path d="M12 2c.7 5.5 4.5 9.3 10 10-5.5.7-9.3 4.5-10 10-.7-5.5-4.5-9.3-10-10 5.5-.7 9.3-4.5 10-10Z" /></Icon>
}

export function Sound(props: IconProps) {
  return <Icon {...props}><path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 10v4" /></Icon>
}
