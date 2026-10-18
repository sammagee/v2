import { createContext, type TouchEvent } from 'react'

import type { Point } from './types'

export const TouchTooltipContext = createContext<TouchTooltip>({
  point: null,
  handlers: null,
  triggerRef: null,
})

export interface TouchHandlers {
  onTouchStart: (event: TouchEvent) => void
  onTouchMove: (event: TouchEvent) => void
  onTouchEnd: () => void
  onTouchCancel: () => void
}

interface TouchTooltip {
  point: Point | null
  handlers: TouchHandlers | null
  triggerRef: ((node: Element | null) => void) | null
}
