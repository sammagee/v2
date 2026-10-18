import {
  FADE_STEPS,
  MIN_TIMER_MS,
  POINTER_RADIUS_REM,
  TAP_RADIUS_PX,
} from './constants'
import { fadeState, isNearPath, randomIndex, takeRandom } from './geometry'
import type { TrailHighlights } from './highlights'
import { measureChars, rootFontSize } from './measure'
import type { Char, Point, Pointer } from './types'

export class Trail {
  private chars: Char[] = []
  private active = new Set<Char>()
  private pointer: Pointer | null = null
  private last: Point | null = null
  private sequence = 0
  private frame = 0
  private fadeTimer = 0
  private rootSize = 16

  constructor(
    private readonly highlights: TrailHighlights,
    private readonly paletteSize: number
  ) {}

  measure = () => {
    this.rootSize = rootFontSize()
    this.chars.forEach((char) => this.highlights.clear(char))
    this.chars = measureChars(this.highlights)
  }

  moveMouse(x: number, y: number) {
    this.moveTo({ x, y, radius: POINTER_RADIUS_REM * this.rootSize })
  }

  moveTo(pointer: Pointer) {
    this.pointer = pointer
    this.start()
  }

  tap(x: number, y: number) {
    this.last = null
    this.moveTo({ x, y, radius: TAP_RADIUS_PX })
  }

  release = () => {
    this.pointer = null
    this.last = null
  }

  twinkle(count: number) {
    const top = window.scrollY
    const bottom = top + window.innerHeight
    const idle = this.chars.filter(
      (char) => !this.active.has(char) && char.y > top && char.y < bottom
    )
    const now = performance.now()
    takeRandom(idle, count).forEach((char) => {
      char.color = randomIndex(this.paletteSize)
      char.touched = now
      this.active.add(char)
    })
    if (this.active.size) this.start()
  }

  dispose() {
    cancelAnimationFrame(this.frame)
    window.clearTimeout(this.fadeTimer)
  }

  private start() {
    if (this.frame) return
    window.clearTimeout(this.fadeTimer)
    this.fadeTimer = 0
    this.frame = requestAnimationFrame(this.tick)
  }

  private tick = (now: number) => {
    this.sweep(now)
    const wakeIn = this.advance(now)
    this.frame = 0
    this.scheduleNext(wakeIn)
  }

  private sweep(now: number) {
    const pointer = this.movingPointer()
    if (!pointer) return
    const from = this.last ?? pointer
    this.chars
      .filter((char) => isNearPath(char, from, pointer))
      .forEach((char) => this.light(char, now))
    this.last = pointer
  }

  private movingPointer() {
    return this.pointer === this.last ? null : this.pointer
  }

  private light(char: Char, now: number) {
    if (!this.active.has(char)) {
      char.color = this.sequence++ % this.paletteSize
      this.active.add(char)
    }
    char.touched = now
  }

  private advance(now: number) {
    let wakeIn = Infinity
    const stillLit = new Set<Char>()
    for (const char of this.active) {
      const state = fadeState(char, now)
      wakeIn = Math.min(wakeIn, state.wakeIn)
      if (this.render(char, state.step)) stillLit.add(char)
    }
    this.active = stillLit
    return wakeIn
  }

  private render(char: Char, step: number) {
    if (step >= FADE_STEPS) {
      this.highlights.clear(char)
      return false
    }
    this.highlights.show(char, step)
    return true
  }

  private scheduleNext(wakeIn: number) {
    if (this.pointer !== this.last) {
      this.frame = requestAnimationFrame(this.tick)
      return
    }
    if (!this.active.size) return
    this.fadeTimer = window.setTimeout(
      this.wake,
      Math.max(MIN_TIMER_MS, Math.ceil(wakeIn))
    )
  }

  private wake = () => {
    this.fadeTimer = 0
    this.tick(performance.now())
  }
}
