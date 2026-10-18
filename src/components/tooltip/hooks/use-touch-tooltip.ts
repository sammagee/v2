import { useEffect, useRef } from 'react'

import type { TouchHandlers } from '../lib/touch-context'
import {
  moveTouch,
  releaseTouch,
  replaceTrigger,
  startTouch,
  touchPoint,
  type TouchController,
} from '../lib/touch-controller'

export function useTouchTooltip(controller: TouchController) {
  const entry = useRef<ReturnType<typeof replaceTrigger>>(null)
  const triggerRef = (node: Element | null) => {
    entry.current = replaceTrigger(entry.current, node, controller)
  }
  const handlers: TouchHandlers = {
    onTouchStart: (event) => startTouch(entry.current, touchPoint(event)),
    onTouchMove: (event) => moveTouch(touchPoint(event)),
    onTouchEnd: releaseTouch,
    onTouchCancel: releaseTouch,
  }
  useEffect(() => () => controller.dispose(), [controller])
  return { triggerRef, handlers }
}
