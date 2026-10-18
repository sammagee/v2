import type { TouchEvent } from 'react'

export interface Point {
  x: number
  y: number
}

const LINGER_MS = 600
const TOLERANCE_PX = 6
const MOUSE_COMPAT_MS = 800
const TRIGGER_SELECTOR = '[data-slot="tooltip-trigger"]'

type SetOpen = (open: boolean) => void
type SetPoint = (point: Point | null) => void

interface TouchEntry {
  trigger: Element
  controller: TouchController
}

const entries = new Map<Element, TouchEntry>()

const session: {
  active: TouchEntry | null
  gesture: boolean
  lastTouchAt: number
} = { active: null, gesture: false, lastTouchAt: 0 }

function releaseIfActive(controller: TouchController) {
  if (session.active?.controller === controller) session.active = null
}

export class TouchController {
  private closeTimer = 0
  private frame = 0

  constructor(
    private readonly setOpen: SetOpen,
    private readonly setPoint: SetPoint
  ) {}

  showNow(point: Point) {
    this.setPoint(point)
    this.show(point)
  }

  show(point: Point) {
    this.cancel()
    this.frame = requestAnimationFrame(() => this.setPoint(point))
    this.setOpen(true)
  }

  hide = () => {
    this.cancel()
    this.setOpen(false)
  }

  linger() {
    window.clearTimeout(this.closeTimer)
    this.closeTimer = window.setTimeout(this.close, LINGER_MS)
  }

  dispose() {
    this.cancel()
    releaseIfActive(this)
  }

  private close = () => {
    this.setOpen(false)
    releaseIfActive(this)
  }

  private cancel() {
    window.clearTimeout(this.closeTimer)
    cancelAnimationFrame(this.frame)
  }
}

export function replaceTrigger(
  previous: TouchEntry | null,
  node: Element | null,
  controller: TouchController
): TouchEntry | null {
  if (previous) entries.delete(previous.trigger)
  if (!node) return null
  const entry = { trigger: node, controller }
  entries.set(node, entry)
  return entry
}

const within = (value: number, start: number, end: number) =>
  value >= start - TOLERANCE_PX && value <= end + TOLERANCE_PX

const nearTrigger = (trigger: Element, { x, y }: Point) =>
  Array.from(trigger.getClientRects()).some(
    (rect) =>
      within(x, rect.left, rect.right) && within(y, rect.top, rect.bottom)
  )

const isOnActive = (hit: Element | null) =>
  session.active !== null &&
  hit !== null &&
  session.active.trigger.contains(hit)

const entryUnder = (hit: Element | null) =>
  entries.get(hit?.closest(TRIGGER_SELECTOR) as Element) ?? null

const activeNear = (point: Point) =>
  session.active && nearTrigger(session.active.trigger, point)
    ? session.active
    : null

function entryAt(point: Point) {
  const hit = document.elementFromPoint(point.x, point.y)
  return isOnActive(hit)
    ? session.active
    : (entryUnder(hit) ?? activeNear(point))
}

function switchTo(entry: TouchEntry | null) {
  session.active?.controller.hide()
  session.active = entry
}

function takeOver(entry: TouchEntry) {
  if (session.active !== entry) switchTo(entry)
}

function routeTouch(point: Point) {
  const entry = entryAt(point)
  if (entry !== session.active) switchTo(entry)
  session.active?.controller.show(point)
}

export function touchPoint(event: TouchEvent): Point | null {
  const touch = event.touches[0]
  return touch ? { x: touch.clientX, y: touch.clientY } : null
}

export function startTouch(entry: TouchEntry | null, point: Point | null) {
  if (!entry || !point) return
  session.lastTouchAt = Date.now()
  session.gesture = true
  takeOver(entry)
  entry.controller.showNow(point)
}

export function moveTouch(point: Point | null) {
  if (!point || !session.gesture) return
  session.lastTouchAt = Date.now()
  routeTouch(point)
}

export function releaseTouch() {
  session.gesture = false
  session.lastTouchAt = Date.now()
  session.active?.controller.linger()
}

export const touchOwnsTooltips = () =>
  session.gesture ||
  session.active !== null ||
  Date.now() - session.lastTouchAt < MOUSE_COMPAT_MS
