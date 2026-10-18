const DAY_MS = 86_400_000
const UNITS = [
  { suffix: 'y', days: 365 },
  { suffix: 'mo', days: 30 },
  { suffix: 'w', days: 7 },
  { suffix: 'd', days: 1 },
]

export function relativeTime(date: string, now: number) {
  const days = daysBetween(date, new Date(now))
  const unit = UNITS.find(({ days: size }) => days >= size)
  return unit ? `${Math.floor(days / unit.days)}${unit.suffix}` : 'Today'
}

function daysBetween(date: string, now: Date) {
  const [year, month, day] = date.split('-').map(Number)
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.max(0, (today - Date.UTC(year, month - 1, day)) / DAY_MS)
}
