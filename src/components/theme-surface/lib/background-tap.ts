const DRAG_TOLERANCE_PX = 6
const MODIFIER_KEYS = ['metaKey', 'ctrlKey', 'shiftKey', 'altKey'] as const

export interface PressStart {
  x: number
  y: number
  hadSelection: boolean
}

export function isBackgroundTap(event: MouseEvent, start: PressStart | null) {
  if (!start || start.hadSelection) return false
  return [
    isBackground(event),
    isPlainPrimaryClick(event),
    isStill(start, event),
    !hasSelection(),
  ].every(Boolean)
}

export function pressStart(event: PointerEvent): PressStart | null {
  return isBackground(event)
    ? { x: event.clientX, y: event.clientY, hadSelection: hasSelection() }
    : null
}

function hasSelection() {
  return Boolean(window.getSelection()?.toString())
}

function isBackground(event: Event) {
  return (
    event.target === event.currentTarget ||
    (event.target instanceof HTMLElement &&
      event.target.dataset.themeBg !== undefined)
  )
}

function isPlainPrimaryClick(event: MouseEvent) {
  return event.button === 0 && !MODIFIER_KEYS.some((key) => event[key])
}

function isStill(start: PressStart, event: MouseEvent) {
  return (
    Math.hypot(event.clientX - start.x, event.clientY - start.y) <=
    DRAG_TOLERANCE_PX
  )
}
