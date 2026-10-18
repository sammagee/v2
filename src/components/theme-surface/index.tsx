import type { ReactNode } from 'react'

import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

import { useBackgroundToggle } from './hooks/use-background-toggle'
import { ThemeToggleButton } from './theme-toggle-button'

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
