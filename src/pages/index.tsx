import { CharTrail } from '@/components/char-trail'
import { HomeHead } from '@/components/home/home-head'
import { MoreSection } from '@/components/home/more-section'
import { WhoSection } from '@/components/home/who-section'
import { SiteHeader } from '@/components/site-header'
import { ThemeSurface } from '@/components/theme-surface'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function Home() {
  return (
    <>
      <HomeHead />
      <CharTrail />
      <TooltipProvider>
        <ThemeSurface className="min-h-dvh md:flex md:flex-col md:justify-center-safe">
          <div
            aria-hidden="true"
            data-theme-bg=""
            className="h-[4.4375rem] min-[440px]:h-12 md:hidden"
          />
          <div className="mx-auto w-full max-w-[43.25rem] overflow-x-hidden px-6 py-12 text-gray-1200 antialiased sm:py-32 md:overflow-x-visible md:py-16">
            <SiteHeader />
            <main>
              <WhoSection />
              <MoreSection />
            </main>
          </div>
        </ThemeSurface>
      </TooltipProvider>
    </>
  )
}
