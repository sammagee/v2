import { useEffect } from 'react'

import { useTheme } from '@/hooks/use-theme'

import { startCharTrail } from './lib/start-char-trail'

export function CharTrail() {
  const { theme } = useTheme()
  useEffect(() => startCharTrail(theme), [theme])
  return null
}
