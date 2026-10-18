import type { Theme } from '@/lib/theme'

import { PALETTES } from './constants'
import { getHighlightApi, TrailHighlights } from './highlights'
import { listenToPointer } from './input'
import { watchLayout } from './layout'
import { Trail } from './trail'
import { Twinkle } from './twinkle'

export function startCharTrail(theme: Theme) {
  const api = getHighlightApi()
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (!api || reducedMotion.matches) return
  const palette = PALETTES[theme]
  const highlights = new TrailHighlights(api, palette)
  const trail = new Trail(highlights, palette.length)
  const twinkle = new Twinkle(trail, reducedMotion)
  const stopWatchingLayout = watchLayout(trail)
  const stopListening = listenToPointer(trail)
  return () => {
    trail.dispose()
    twinkle.dispose()
    stopWatchingLayout()
    stopListening()
    highlights.dispose()
  }
}
