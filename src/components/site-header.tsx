import { Masthead } from '@/components/masthead'
import { JOB_TITLE, NAME } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="mb-21 md:mb-14">
      <Masthead title={NAME} subtitle={JOB_TITLE} href="/" />
    </header>
  )
}
