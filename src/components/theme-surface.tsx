import { useEffect, useRef, type ReactNode } from 'react'

import { useTheme, type Theme } from '@/lib/theme'
import { cn } from '@/lib/utils'

const DRAG_TOLERANCE_PX = 6
const MODIFIER_KEYS = ['metaKey', 'ctrlKey', 'shiftKey', 'altKey'] as const

const TOGGLE_LABELS: Record<Theme, string> = {
  light: 'Switch to dark mode',
  dark: 'Switch to light mode',
}

interface PressStart {
  x: number
  y: number
  hadSelection: boolean
}

const hasSelection = () => Boolean(window.getSelection()?.toString())

const isBackground = (event: Event) =>
  event.target === event.currentTarget ||
  (event.target instanceof HTMLElement &&
    event.target.dataset.themeBg !== undefined)

const isPlainPrimaryClick = (event: MouseEvent) =>
  event.button === 0 && !MODIFIER_KEYS.some((key) => event[key])

const isStill = (start: PressStart, event: MouseEvent) =>
  Math.hypot(event.clientX - start.x, event.clientY - start.y) <=
  DRAG_TOLERANCE_PX

function isBackgroundTap(event: MouseEvent, start: PressStart | null) {
  if (!start || start.hadSelection) return false
  return [
    isBackground(event),
    isPlainPrimaryClick(event),
    isStill(start, event),
    !hasSelection(),
  ].every(Boolean)
}

function useBackgroundToggle(toggle: () => void) {
  const surface = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = surface.current
    if (!element) return
    let start: PressStart | null = null
    const onPointerDown = (event: PointerEvent) => {
      start = isBackground(event)
        ? { x: event.clientX, y: event.clientY, hadSelection: hasSelection() }
        : null
    }
    const onClick = (event: MouseEvent) => {
      if (isBackgroundTap(event, start)) toggle()
      start = null
    }
    element.addEventListener('pointerdown', onPointerDown)
    element.addEventListener('click', onClick)
    return () => {
      element.removeEventListener('pointerdown', onPointerDown)
      element.removeEventListener('click', onClick)
    }
  }, [toggle])
  return surface
}

function ThemeToggleButton({
  theme,
  toggle,
}: {
  theme: Theme
  toggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === 'dark'}
      className="sr-only rounded-full bg-gray-1200 px-3 py-1 text-sm font-medium text-gray-100 focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50"
    >
      {TOGGLE_LABELS[theme]}
    </button>
  )
}

export function ThemeSurface({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const { theme, toggle } = useTheme()
  const surface = useBackgroundToggle(toggle)
  return (
    <div
      ref={surface}
      className={cn('[-webkit-tap-highlight-color:transparent]', className)}
    >
      <ThemeToggleButton theme={theme} toggle={toggle} />
      {children}
    </div>
  )
}
