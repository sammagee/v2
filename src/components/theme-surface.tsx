import {
  useRef,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react'

import { useTheme } from '@/lib/theme'

/**
 * The page background is the light/dark switch: a click or tap on the
 * empty page around the content toggles the theme (system default until
 * then; the choice is kept in localStorage).
 *
 * Scope: only clicks whose target is this wrapper itself or an element
 * marked data-theme-bg (the mobile top spacer) count. The content column
 * (including its padding) and everything inside it, plus the portaled
 * tooltips, are other targets, so they never toggle. Drags (moved > 6px)
 * and clicks that start while text is selected (i.e. a click to deselect)
 * are ignored, as are modified and non-primary clicks.
 *
 * Keyboard users get a visually hidden button, shown when focused, as the
 * first tab stop.
 */
export function ThemeSurface({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const { theme, toggle } = useTheme()
  const label =
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  const down = useRef<{ x: number; y: number; selected: boolean } | null>(null)

  const isBackground = (event: {
    target: EventTarget
    currentTarget: EventTarget
  }) =>
    event.target === event.currentTarget ||
    (event.target instanceof HTMLElement &&
      event.target.dataset.themeBg !== undefined)

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    down.current = isBackground(event)
      ? {
          x: event.clientX,
          y: event.clientY,
          selected: !!window.getSelection()?.toString(),
        }
      : null
  }

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const start = down.current
    down.current = null
    if (!isBackground(event) || !start || start.selected) return
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 6) return
    if (window.getSelection()?.toString()) return
    toggle()
  }

  return (
    <div
      onPointerDown={onPointerDown}
      onClick={onClick}
      className={`[-webkit-tap-highlight-color:transparent] ${className ?? ''}`}
    >
      <button
        type="button"
        onClick={toggle}
        aria-pressed={theme === 'dark'}
        className="sr-only rounded-full bg-gray-1200 px-3 py-1 text-sm font-medium text-gray-100 focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50"
      >
        {label}
      </button>
      {children}
    </div>
  )
}
