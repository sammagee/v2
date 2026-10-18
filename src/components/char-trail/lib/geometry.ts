import { FADE_MS, FADE_STEPS, HOLD_MS } from './constants'
import type { Char, Point, Pointer } from './types'

export function isNearPath(char: Point, from: Point, to: Pointer) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length2 = dx * dx + dy * dy
  const along = length2
    ? clamp01(((char.x - from.x) * dx + (char.y - from.y) * dy) / length2)
    : 0
  const ex = char.x - (from.x + along * dx)
  const ey = char.y - (from.y + along * dy)
  return ex * ex + ey * ey <= to.radius * to.radius
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))

export function fadeState(char: Char, now: number) {
  const fading = now - char.touched - HOLD_MS
  if (fading < 0) return { step: 0, wakeIn: -fading }
  const step = Math.floor((fading / FADE_MS) * FADE_STEPS)
  return { step, wakeIn: ((step + 1) * FADE_MS) / FADE_STEPS - fading }
}

export const randomIndex = (length: number) =>
  Math.floor(Math.random() * length)

export function takeRandom<T>(items: T[], count: number): T[] {
  const taken: T[] = []
  for (let i = 0; i < count && items.length; i++) {
    taken.push(...items.splice(randomIndex(items.length), 1))
  }
  return taken
}
