import type { Theme } from '@/lib/theme'

const TOGGLE_LABELS: Record<Theme, string> = {
  light: 'Switch to dark mode',
  dark: 'Switch to light mode',
}

export function ThemeToggleButton({
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
