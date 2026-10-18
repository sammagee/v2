import { useSyncExternalStore } from 'react'

import { relativeTime } from '../lib/relative-time'

const REFRESH_MS = 60_000

export function useRelativeTime(date: string, builtAt: number) {
  return useSyncExternalStore(
    subscribe,
    () => relativeTime(date, Date.now()),
    () => relativeTime(date, builtAt)
  )
}

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, REFRESH_MS)
  return () => window.clearInterval(timer)
}
