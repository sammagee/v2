import { useEffect, useState } from 'react'

import { triggerOf } from '../lib/drag-reveal'

export function useNestedHover(trigger: Element | null) {
  const [nested, setNested] = useState(false)
  useEffect(() => {
    if (!trigger) return
    const onOver = (event: Event) =>
      setNested(triggerOf(event.target) !== trigger)
    const onLeave = () => setNested(false)
    trigger.addEventListener('pointerover', onOver)
    trigger.addEventListener('pointerleave', onLeave)
    return () => {
      trigger.removeEventListener('pointerover', onOver)
      trigger.removeEventListener('pointerleave', onLeave)
    }
  }, [trigger])
  return nested
}
