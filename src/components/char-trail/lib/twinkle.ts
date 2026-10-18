import {
  TRAIL_SELECTOR,
  TWINKLE_MAX_MS,
  TWINKLE_MIN_MS,
  TWINKLE_PAIR_CHANCE,
} from './constants'
import type { Trail } from './trail'

export class Twinkle {
  private timer = 0
  private contentVisible = true
  private readonly viewport: IntersectionObserver

  constructor(
    private readonly trail: Trail,
    private readonly reducedMotion: MediaQueryList
  ) {
    this.viewport = new IntersectionObserver(this.onIntersect)
    document
      .querySelectorAll(TRAIL_SELECTOR)
      .forEach((element) => this.viewport.observe(element))
    document.addEventListener('visibilitychange', this.schedule)
  }

  dispose() {
    window.clearTimeout(this.timer)
    this.viewport.disconnect()
    document.removeEventListener('visibilitychange', this.schedule)
  }

  private get paused() {
    return document.hidden || !this.contentVisible || this.reducedMotion.matches
  }

  private onIntersect = (entries: IntersectionObserverEntry[]) => {
    this.contentVisible = entries.some((entry) => entry.isIntersecting)
    this.schedule()
  }

  private schedule = () => {
    window.clearTimeout(this.timer)
    this.timer = 0
    if (this.paused) return
    this.timer = window.setTimeout(this.fire, twinkleDelay())
  }

  private fire = () => {
    this.trail.twinkle(twinkleCount())
    this.schedule()
  }
}

const twinkleDelay = () =>
  TWINKLE_MIN_MS + Math.random() * (TWINKLE_MAX_MS - TWINKLE_MIN_MS)

const twinkleCount = () => (Math.random() < TWINKLE_PAIR_CHANCE ? 2 : 1)
