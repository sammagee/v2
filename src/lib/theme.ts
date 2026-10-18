const THEMES: readonly string[] = ['light', 'dark'] satisfies Theme[]
const TRANSITION_MS = 250
const DARK_QUERY = '(prefers-color-scheme: dark)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export const THEME_STORAGE_KEY = 'theme'
export const THEME_COLORS: Record<Theme, string> = {
  light: '#fdfdfc',
  dark: '#111110',
}

export const themeInitScript = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var t=s==='light'||s==='dark'?s:(matchMedia('${DARK_QUERY}').matches?'dark':'light');var d=document.documentElement;d.classList.toggle('dark',t==='dark');d.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='dark'?'${THEME_COLORS.dark}':'${THEME_COLORS.light}')}catch(e){}})()`

const listeners = new Set<() => void>()
let systemQuery: MediaQueryList | null = null

export type Theme = 'light' | 'dark'

export const currentTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'

export function subscribeToTheme(listener: () => void) {
  if (!listeners.size) {
    systemQuery = matchMedia(DARK_QUERY)
    systemQuery.addEventListener('change', onSystemChange)
  }
  listeners.add(listener)
  return () => unsubscribe(listener)
}

export function toggleTheme() {
  const next = opposite(currentTheme())
  persist(next)
  applyTheme(next)
}

const isTheme = (value: string | null): value is Theme =>
  THEMES.includes(value as string)

const opposite = (theme: Theme): Theme => (theme === 'dark' ? 'light' : 'dark')

function stored(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(value) ? value : null
  } catch {
    return null
  }
}

function persist(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {}
}

function animateThemeChange() {
  if (matchMedia(REDUCED_MOTION_QUERY).matches) return
  const root = document.documentElement
  root.classList.add('theme-transition')
  window.setTimeout(
    () => root.classList.remove('theme-transition'),
    TRANSITION_MS
  )
}

function applyTheme(theme: Theme) {
  if (theme === currentTheme()) return
  animateThemeChange()
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[theme])
  listeners.forEach((listener) => listener())
}

const onSystemChange = (event: MediaQueryListEvent) => {
  if (!stored()) applyTheme(event.matches ? 'dark' : 'light')
}

function unsubscribe(listener: () => void) {
  listeners.delete(listener)
  if (!listeners.size)
    systemQuery?.removeEventListener('change', onSystemChange)
}
