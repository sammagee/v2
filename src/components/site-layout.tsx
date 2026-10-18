import type { ReactNode } from 'react'

import { CharTrail } from '@/components/char-trail'
import { ThemeSurface } from '@/components/theme-surface'
import { TooltipProvider } from '@/components/tooltip'

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CharTrail />
      <TooltipProvider>
        <ThemeSurface className="min-h-dvh py-[7.4375rem] min-[440px]:py-24 sm:py-44 md:py-[14.75rem]">
          <div className="mx-auto w-full max-w-[43.25rem] overflow-x-hidden px-6 text-gray-1200 antialiased md:overflow-x-visible">
            {children}
          </div>
        </ThemeSurface>
      </TooltipProvider>
    </>
  )
}
