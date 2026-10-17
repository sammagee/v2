import { useEffect } from 'react'

// A comet-like trail: characters near the cursor light up and fade back.
//
// Uses the CSS Custom Highlight API, so the DOM is never touched: no span
// splitting, no layout shift or kerning changes, and selection, copy/paste,
// links, SSR text and screen readers behave exactly as before. Works with a
// mouse and with touch (passive listeners only, so scrolling and taps are
// untouched). Reduced motion and browsers without the API get nothing.

const SELECTOR = 'header a, header span, main h2, main p'
const PALETTE = [
  '#4f7cff',
  '#8b5cf6',
  '#e8559b',
  '#f2784b',
  '#13a983',
  '#2aa7d6',
]
const RADIUS = 11 // px from the cursor path, about a character or two
const TOUCH_RADIUS = 18 // fingers hide the exact spot
const TAP_RADIUS = 26 // a small burst on tap
const DURATION = 800 // ms back to the normal color
const STEPS = 10 // fade steps (one highlight per color x base x step)

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
  useEffect(() => {
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
      if (!pointer) return
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
      for (const char of active) {
        const step = Math.floor(((now - char.touched) / DURATION) * STEPS)
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
      frame = active.size || pointer !== last ? requestAnimationFrame(tick) : 0
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick)
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

    let resizeTimer = 0
    const remeasure = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(measure, 100)
    }
    const observer = new ResizeObserver(remeasure)
    observer.observe(document.body)
    document.fonts?.ready.then(measure)
    measure()

    const passive = { passive: true }
    window.addEventListener('pointermove', onMove, passive)
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('touchstart', onTouchStart, passive)
    window.addEventListener('touchmove', onTouchMove, passive)
    window.addEventListener('touchend', onLeave, passive)
    window.addEventListener('touchcancel', onLeave, passive)
    return () => {
      cancelAnimationFrame(frame)
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
  }, [])

  return null
}
