import { useEffect } from 'react'

import { useTheme } from '@/lib/theme'

// A comet-like trail: characters near the cursor light up and fade back,
// plus an ambient twinkle of a random character or two every 250-600ms.
//
// Uses the CSS Custom Highlight API, so the DOM is never touched: no span
// splitting, no layout shift or kerning changes, and selection, copy/paste,
// links, SSR text and screen readers behave exactly as before. Works with a
// mouse and with touch (passive listeners only, so scrolling and taps are
// untouched). Reduced motion and browsers without the API get nothing.

const SELECTOR = 'header a, header span, main h2, main p'
const PALETTES = {
  light: ['#4f7cff', '#8b5cf6', '#e8559b', '#f2784b', '#13a983', '#2aa7d6'],
  // Lighter, brighter tints of the same hues so they read on near-black.
  dark: ['#8aa8ff', '#b79cff', '#ff8cc0', '#ffa47a', '#4fdcb0', '#6fd0f5'],
}
const RADIUS = 11 // px from the cursor path, about a character or two
const TOUCH_RADIUS = 18 // fingers hide the exact spot
const TAP_RADIUS = 26 // a small burst on tap
const HOLD = 600 // ms at full color before the fade starts
const DURATION = 800 // ms of fade back to the normal color
const STEPS = 10 // fade steps (one highlight per color x base x step)
// Ambient twinkle: now and then a random visible character lights up on its
// own, holds and fades like the trail. Timer-driven; rAF only runs while the
// pointer moves.
const TWINKLE_MIN_MS = 250
const TWINKLE_MAX_MS = 600
const TWINKLE_PAIR_CHANCE = 0.3 // otherwise a single character

interface Char {
  range: Range
  x: number
  y: number
  base: number
  touched: number
  color: number
  key: string | null
}

type HighlightRegistry = Map<string, unknown> & {
  set(name: string, highlight: unknown): void
}

export function CharTrail() {
  const { theme } = useTheme()

  // Re-runs on theme change: the base text colors and palette both change.
  useEffect(() => {
    const PALETTE = PALETTES[theme]
    const css = window.CSS as typeof CSS & { highlights?: HighlightRegistry }
    const HighlightCtor = (
      window as unknown as { Highlight?: new () => Set<Range> }
    ).Highlight
    if (!css.highlights || !HighlightCtor) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    // One highlight per (base text color, palette color, fade step).
    const bases: string[] = []
    const highlights = new Map<string, Set<Range>>()
    const style = document.createElement('style')
    document.head.appendChild(style)
    const highlightFor = (base: number, color: number, step: number) => {
      const name = `trail-${base}-${color}-${step}`
      let highlight = highlights.get(name)
      if (!highlight) {
        highlight = new HighlightCtor()
        highlights.set(name, highlight)
        css.highlights!.set(name, highlight)
        const mix = Math.round(100 * Math.pow(1 - step / STEPS, 1.6))
        style.sheet!.insertRule(
          `::highlight(${name}) { color: color-mix(in oklab, ${PALETTE[color]} ${mix}%, ${bases[base]}); }`
        )
      }
      return highlight
    }

    let chars: Char[] = []
    const measure = () => {
      chars.forEach(
        (char) => char.key && highlights.get(char.key)?.delete(char.range)
      )
      chars = []
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((root) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
          acceptNode: (node) =>
            node.parentElement?.closest(
              '.sr-only, [data-slot=tooltip-content]'
            ) ||
            // Nested matches (e.g. a span inside a p) are walked once.
            node.parentElement?.closest(SELECTOR) !== root
              ? NodeFilter.FILTER_REJECT
              : NodeFilter.FILTER_ACCEPT,
        })
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const text = node.textContent ?? ''
          const color = getComputedStyle(node.parentElement!).color
          let base = bases.indexOf(color)
          if (base === -1) base = bases.push(color) - 1
          for (let i = 0; i < text.length; i++) {
            if (/\s/.test(text[i])) continue
            const range = document.createRange()
            range.setStart(node, i)
            range.setEnd(node, i + 1)
            const rect = range.getBoundingClientRect()
            if (!rect.width) continue
            chars.push({
              range,
              x: rect.left + rect.width / 2 + window.scrollX,
              y: rect.top + rect.height / 2 + window.scrollY,
              base,
              touched: -Infinity,
              color: 0,
              key: null,
            })
          }
        }
      })
    }

    // Positions are page coordinates (char rects are cached with the scroll
    // offset added), so a page that scrolls mid-drag still lines up.
    let pointer: { x: number; y: number; r: number } | null = null
    let last: { x: number; y: number } | null = null
    let sequence = 0
    let frame = 0
    let active = new Set<Char>()

    const touch = (now: number) => {
      // Only a moving pointer lights characters; a resting one lets them fade.
      if (!pointer || pointer === last) return
      const from = last ?? pointer
      const dx = pointer.x - from.x
      const dy = pointer.y - from.y
      const length2 = dx * dx + dy * dy
      for (const char of chars) {
        // Distance from the char to the segment the cursor travelled this
        // frame, so fast moves still leave a continuous trail.
        const t = length2
          ? Math.max(
              0,
              Math.min(
                1,
                ((char.x - from.x) * dx + (char.y - from.y) * dy) / length2
              )
            )
          : 0
        const ex = char.x - (from.x + t * dx)
        const ey = char.y - (from.y + t * dy)
        if (ex * ex + ey * ey > pointer.r * pointer.r) continue
        if (!active.has(char)) {
          char.color = sequence++ % PALETTE.length
          active.add(char)
        }
        char.touched = now
      }
      last = pointer
    }

    const tick = (now: number) => {
      touch(now)
      const next = new Set<Char>()
      let wake = Infinity // ms until the soonest step change
      for (const char of active) {
        const fading = now - char.touched - HOLD
        const step = fading < 0 ? 0 : Math.floor((fading / DURATION) * STEPS)
        wake = Math.min(
          wake,
          fading < 0 ? -fading : ((step + 1) * DURATION) / STEPS - fading
        )
        const key =
          step < STEPS ? `trail-${char.base}-${char.color}-${step}` : null
        if (key !== char.key) {
          if (char.key) highlights.get(char.key)?.delete(char.range)
          if (key) highlightFor(char.base, char.color, step).add(char.range)
          char.key = key
        }
        if (key) next.add(char)
      }
      active = next
      frame = 0
      if (pointer !== last) {
        // Cursor/finger moving: track it every frame.
        frame = requestAnimationFrame(tick)
      } else if (active.size) {
        // Only holds/fades left: wake exactly when the next character changes
        // step (end of a hold, or the next of STEPS fade steps), never per frame.
        fadeTimer = window.setTimeout(
          () => {
            fadeTimer = 0
            tick(performance.now())
          },
          Math.max(16, Math.ceil(wake))
        )
      }
    }

    let fadeTimer = 0
    const start = () => {
      if (frame) return
      window.clearTimeout(fadeTimer)
      fadeTimer = 0
      frame = requestAnimationFrame(tick)
    }
    const onMove = (event: PointerEvent) => {
      // Touch is handled by the touch listeners, which keep firing while the
      // page scrolls (pointer events get cancelled when a pan starts).
      if (event.pointerType === 'touch') return
      pointer = { x: event.pageX, y: event.pageY, r: RADIUS }
      start()
    }
    const onLeave = () => {
      pointer = null
      last = null
    }
    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      pointer = { x: touch.pageX, y: touch.pageY, r: TAP_RADIUS }
      last = null
      start()
    }
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      pointer = { x: touch.pageX, y: touch.pageY, r: TOUCH_RADIUS }
      start()
    }

    // Ambient twinkle. Skips while the tab is hidden or no text is on
    // screen; never touches a character the cursor/finger already lit.
    let twinkleTimer = 0
    let contentVisible = true
    const twinkle = () => {
      const top = window.scrollY
      const bottom = top + window.innerHeight
      const idle = chars.filter(
        (char) => !active.has(char) && char.y > top && char.y < bottom
      )
      const count = Math.random() < TWINKLE_PAIR_CHANCE ? 2 : 1
      const now = performance.now()
      for (let i = 0; i < count && idle.length; i++) {
        const [char] = idle.splice(Math.floor(Math.random() * idle.length), 1)
        char.color = Math.floor(Math.random() * PALETTE.length)
        char.touched = now
        active.add(char)
      }
      if (active.size) start()
    }
    const scheduleTwinkle = () => {
      window.clearTimeout(twinkleTimer)
      twinkleTimer = 0
      if (document.hidden || !contentVisible || reduced.matches) return
      twinkleTimer = window.setTimeout(
        () => {
          twinkle()
          scheduleTwinkle()
        },
        TWINKLE_MIN_MS + Math.random() * (TWINKLE_MAX_MS - TWINKLE_MIN_MS)
      )
    }
    const onVisibility = () => scheduleTwinkle()
    const viewport = new IntersectionObserver((entries) => {
      contentVisible = entries.some((entry) => entry.isIntersecting)
      scheduleTwinkle()
    })
    document
      .querySelectorAll(SELECTOR)
      .forEach((element) => viewport.observe(element))
    document.addEventListener('visibilitychange', onVisibility)

    let resizeTimer = 0
    const remeasure = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(measure, 100)
    }
    const observer = new ResizeObserver(remeasure)
    observer.observe(document.body)
    document.fonts?.ready.then(measure)
    // Mid crossfade, computed text colors are in-between values; wait it out.
    const settle = document.documentElement.classList.contains(
      'theme-transition'
    )
      ? window.setTimeout(measure, 260)
      : (measure(), 0)

    const passive = { passive: true }
    window.addEventListener('pointermove', onMove, passive)
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('touchstart', onTouchStart, passive)
    window.addEventListener('touchmove', onTouchMove, passive)
    window.addEventListener('touchend', onLeave, passive)
    window.addEventListener('touchcancel', onLeave, passive)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(fadeTimer)
      window.clearTimeout(twinkleTimer)
      viewport.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.clearTimeout(settle)
      window.clearTimeout(resizeTimer)
      observer.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onLeave)
      window.removeEventListener('touchcancel', onLeave)
      highlights.forEach((_, name) => css.highlights!.delete(name))
      style.remove()
    }
  }, [theme])

  return null
}
