import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'
export const THEME_COLORS: Record<Theme, string> = {
  light: '#fdfdfc',
  dark: '#111110',
}

/**
 * Runs inline in <head> before first paint (see _document), so the page
 * never flashes the wrong theme. Keep it dependency-free and in sync with
 * applyTheme below.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var t=s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var d=document.documentElement;d.classList.toggle('dark',t==='dark');d.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='dark'?'${THEME_COLORS.dark}':'${THEME_COLORS.light}')}catch(e){}})()`

const listeners = new Set<() => void>()

function current(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function stored(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement
  if (theme === current()) return
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (animate && !reduced) {
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 250)
  }
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[theme])
  listeners.forEach((listener) => listener())
}

let systemQuery: MediaQueryList | null = null
const onSystemChange = (event: MediaQueryListEvent) => {
  // Track the OS only while the visitor hasn't picked a theme themselves.
  if (!stored()) applyTheme(event.matches ? 'dark' : 'light', true)
}

function subscribe(listener: () => void) {
  if (!listeners.size) {
    systemQuery = matchMedia('(prefers-color-scheme: dark)')
    systemQuery.addEventListener('change', onSystemChange)
  }
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (!listeners.size) {
      systemQuery?.removeEventListener('change', onSystemChange)
    }
  }
}

/** The active theme ('light' during SSR) and a toggle that persists it. */
export function useTheme() {
  const theme = useSyncExternalStore<Theme>(subscribe, current, () => 'light')
  const toggle = useCallback(() => {
    const next: Theme = current() === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {}
    applyTheme(next, true)
  }, [])
  return { theme, toggle }
}
