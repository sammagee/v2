import { useSyncExternalStore } from 'react'

import { currentReveal, subscribeToDragReveal } from '../lib/drag-reveal'

export function useDragReveal(trigger: Element | null) {
  return useSyncExternalStore(
    subscribeToDragReveal,
    () => pointFor(trigger),
    serverPoint
  )
}

function pointFor(trigger: Element | null) {
  const reveal = currentReveal()
  return trigger && reveal.trigger === trigger ? reveal.point : null
}

function serverPoint() {
  return null
}
