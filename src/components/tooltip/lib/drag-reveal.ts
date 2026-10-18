import type { Point } from './types'

const TRIGGER_SELECTOR = '[data-slot="tooltip-trigger"]'
const PASSIVE = { passive: true }
const EMPTY: Reveal = { trigger: null, point: null }
const listeners = new Set<() => void>()
const session = { armed: false, reveal: EMPTY }

export interface Reveal {
  trigger: Element | null
  point: Point | null
}

type Binding = [string, EventListener]

export function subscribeToDragReveal(listener: () => void) {
  if (listeners.size === 0) bindings().forEach(listen)
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) bindings().forEach(unlisten)
  }
}

export const currentReveal = () => session.reveal

const bindings = (): Binding[] => [
  ['touchstart', onTouchStart as EventListener],
  ['touchmove', onTouchMove as EventListener],
  ['touchend', onTouchEnd],
  ['touchcancel', onTouchEnd],
]

const listen = ([type, listener]: Binding) =>
  window.addEventListener(type, listener, PASSIVE)

const unlisten = ([type, listener]: Binding) =>
  window.removeEventListener(type, listener)

export const triggerOf = (target: EventTarget | null) =>
  target instanceof Element ? target.closest(TRIGGER_SELECTOR) : null

function onTouchStart(event: TouchEvent) {
  session.armed = event.touches.length === 1 && !triggerOf(event.target)
}

function onTouchMove(event: TouchEvent) {
  const [touch] = event.touches
  if (session.armed && touch) revealAt({ x: touch.clientX, y: touch.clientY })
}

function onTouchEnd() {
  session.armed = false
  publish(EMPTY)
}

function revealAt(point: Point) {
  const trigger = triggerOf(document.elementFromPoint(point.x, point.y))
  publish(trigger ? { trigger, point } : EMPTY)
}

function publish(reveal: Reveal) {
  if (reveal === session.reveal) return
  session.reveal = reveal
  listeners.forEach((listener) => listener())
}
