import { ViewTransition, type ReactNode } from 'react'

import { CharTrail } from '@/components/char-trail'
import { ThemeSurface } from '@/components/theme-surface'
import { TooltipProvider } from '@/components/tooltip'

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CharTrail />
      <TooltipProvider>
        <ThemeSurface className="min-h-dvh py-[7.4375rem] min-[440px]:py-24 sm:py-44 md:py-[14.75rem]">
          <ViewTransition name="site-content">
            <div className="mx-auto w-full max-w-[44.75rem] overflow-x-clip px-8 text-gray-1200 antialiased md:overflow-x-visible md:px-9">
              {children}
            </div>
          </ViewTransition>
        </ThemeSurface>
      </TooltipProvider>
    </>
  )
}
