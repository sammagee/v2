import { TOUCH_RADIUS_PX } from './constants'
import type { Trail } from './trail'

const passive = { passive: true }

type Binding = [EventTarget, string, EventListener, AddEventListenerOptions?]

export function listenToPointer(trail: Trail) {
  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return
    trail.moveMouse(event.pageX, event.pageY)
  }
  const onTouchStart = (event: TouchEvent) => {
    const [touch] = event.touches
    if (touch) trail.tap(touch.pageX, touch.pageY)
  }
  const onTouchMove = (event: TouchEvent) => {
    const [touch] = event.touches
    if (touch) {
      trail.moveTo({ x: touch.pageX, y: touch.pageY, radius: TOUCH_RADIUS_PX })
    }
  }
  const bindings: Binding[] = [
    [window, 'pointermove', onPointerMove as EventListener, passive],
    [document, 'pointerleave', trail.release],
    [window, 'touchstart', onTouchStart as EventListener, passive],
    [window, 'touchmove', onTouchMove as EventListener, passive],
    [window, 'touchend', trail.release, passive],
    [window, 'touchcancel', trail.release, passive],
  ]
  bindings.forEach(([target, type, listener, options]) =>
    target.addEventListener(type, listener, options)
  )
  return () =>
    bindings.forEach(([target, type, listener]) =>
      target.removeEventListener(type, listener)
    )
}
