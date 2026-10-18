import { RESIZE_DEBOUNCE_MS, THEME_SETTLE_MS } from './constants'
import type { Trail } from './trail'

const isThemeTransitioning = () =>
  document.documentElement.classList.contains('theme-transition')

function measureWhenColorsSettle(trail: Trail) {
  if (isThemeTransitioning()) {
    return window.setTimeout(trail.measure, THEME_SETTLE_MS)
  }
  trail.measure()
  return 0
}

export function watchLayout(trail: Trail) {
  let resizeTimer = 0
  const observer = new ResizeObserver(() => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(trail.measure, RESIZE_DEBOUNCE_MS)
  })
  observer.observe(document.body)
  document.fonts?.ready.then(trail.measure)
  const settleTimer = measureWhenColorsSettle(trail)
  return () => {
    window.clearTimeout(settleTimer)
    window.clearTimeout(resizeTimer)
    observer.disconnect()
  }
}
