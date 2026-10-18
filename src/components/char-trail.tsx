import { useEffect } from 'react'

import { startCharTrail } from '@/lib/char-trail'
import { useTheme } from '@/lib/theme'

export function CharTrail() {
  const { theme } = useTheme()
  useEffect(() => startCharTrail(theme), [theme])
  return null
}
