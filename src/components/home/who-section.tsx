import {
  COMPANIES,
  CompanyLogoWithTooltip,
  CompanyStack,
} from '@/components/company-logo'
import { InlineAvatar } from '@/components/inline-avatar'

const PREVIOUS = [
  COMPANIES.uber,
  COMPANIES.marqeta,
  COMPANIES.principal,
  COMPANIES.imt,
  COMPANIES.central,
  COMPANIES.leantech,
]

function VantaLink() {
  return (
    <a
      href={COMPANIES.vanta.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-baseline gap-[0.3em] no-underline"
    >
      <CompanyLogoWithTooltip
        company={COMPANIES.vanta}
        className="self-center"
      />
      <span className="link-dotted">Vanta</span>
    </a>
  )
}

export function WhoSection() {
  return (
    <>
      <h2 className="mb-3.5 block font-medium sm:mb-4">Who</h2>
      <p className="text-gray-1100">
        Hey, my name is{' '}
        <span className="inline-flex items-baseline gap-[0.3em]">
          <InlineAvatar className="self-center" />
          <span>Sam</span>
        </span>
        ! I&apos;m a senior software engineer at <VantaLink />, building
        compliance and trust software for the future. I design and build
        software that makes complex work feel simple.
      </p>
      <p className="mt-4 text-gray-1100">
        Previously, I worked at <CompanyStack companies={PREVIOUS} />.
      </p>
    </>
  )
}
