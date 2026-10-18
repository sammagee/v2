import { useSyncExternalStore } from 'react'

import {
  currentTheme,
  subscribeToTheme,
  toggleTheme,
  type Theme,
} from '@/lib/theme'

export function useTheme() {
  const theme = useSyncExternalStore<Theme>(
    subscribeToTheme,
    currentTheme,
    () => 'light'
  )
  return { theme, toggle: toggleTheme }
}
