import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Seoul',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export function SeoulClock() {
  const [time, setTime] = useState(() => formatter.format(new Date()))

  useEffect(() => {
    const updateTime = () => setTime(formatter.format(new Date()))
    const timer = window.setInterval(updateTime, 30_000)
    document.addEventListener('visibilitychange', updateTime)

    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', updateTime)
    }
  }, [])

  return <time dateTime={time}>{time} KST</time>
}
