import Head from 'next/head'
import type { ReactNode } from 'react'
import Link from 'next/link'

import { ThemeToggleAvatar } from '@/components/theme-toggle-avatar'
import { CharTrail } from '../components/char-trail'
import {
  COMPANIES,
  CompanyLogoWithTooltip,
  CompanyStack,
} from '../components/company-logo'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip'

const TITLE = 'Sam Magee'
const DESCRIPTION =
  'Senior Software Engineer at Vanta, building the future of trust and compliance software.'
const URL = 'https://sammagee.me'
const IMAGE = `${URL}/images/social/social-card.jpg`

const PREVIOUS = [
  'uber',
  'marqeta',
  'principal',
  'imt',
  'central',
  'leantech',
].map((key) => COMPANIES[key])

interface ISocialLinkProps {
  href: string
  hint: string
  children: ReactNode
  external?: boolean
}

// A text link with a liquid-glass tooltip that follows the cursor (or the
// finger, on touch); keyboard focus still shows it.
function SocialLink({
  href,
  hint,
  children,
  external = true,
}: ISocialLinkProps) {
  return (
    <Tooltip trackCursorAxis="both">
      <TooltipTrigger
        render={
          <a
            href={href}
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          />
        }
      >
        {children}
        <span className="sr-only"> ({hint})</span>
      </TooltipTrigger>
      <TooltipContent>{hint}</TooltipContent>
    </Tooltip>
  )
}

export default function Home() {
  const email = process.env.NEXT_PUBLIC_EMAIL

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:site_name" content={TITLE} />
        <meta property="og:locale" content="en-US" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={IMAGE} />
      </Head>

      <CharTrail />
      <TooltipProvider>
        <div
          aria-hidden="true"
          className="h-[71px] min-[440px]:h-12 md:h-[53px]"
        />
        <div className="mx-auto max-w-[692px] overflow-x-hidden px-6 py-12 text-gray-1200 antialiased sm:py-32 md:overflow-x-visible md:py-16">
          <header className="mb-21 flex items-center gap-3">
            <ThemeToggleAvatar />
            <div className="flex flex-col items-start">
              <Link href="/" className="inline-block font-medium no-underline">
                Sam Magee
              </Link>
              <span className="font-medium leading-none text-gray-1100">
                Senior Software Engineer
              </span>
            </div>
          </header>

          <main>
            <h2 className="mb-3.5 block font-medium sm:mb-4">Who</h2>
            <p className="text-gray-1100">
              I&apos;m a Senior Software Engineer at{' '}
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
              , building compliance and trust software for the future. I design
              and build software that makes complex work feel simple.
            </p>
            <p className="mt-4 text-gray-1100">
              Previously, I&apos;ve worked at{' '}
              <CompanyStack companies={PREVIOUS} />.
            </p>

            <section className="mt-16 sm:mt-32" aria-labelledby="more">
              <h2 id="more" className="mb-4 block font-medium">
                More
              </h2>
              <p className="text-gray-1100">
                Find me on{' '}
                <SocialLink href="https://x.com/sammagee" hint="@sammagee">
                  X
                </SocialLink>
                ,{' '}
                <SocialLink
                  href="https://linkedin.com/in/sammagee"
                  hint="in/sammagee"
                >
                  LinkedIn
                </SocialLink>
                , and{' '}
                <SocialLink href="https://github.com/sammagee" hint="@sammagee">
                  GitHub
                </SocialLink>
                {email ? ', see' : ', or see'} my{' '}
                <SocialLink href="/resume.pdf" hint="resume.pdf">
                  resume
                </SocialLink>
                {email ? (
                  <>
                    , or{' '}
                    <SocialLink
                      href={`mailto:${email}`}
                      hint={email}
                      external={false}
                    >
                      email me
                    </SocialLink>
                    .
                  </>
                ) : (
                  '.'
                )}
              </p>
            </section>
          </main>
        </div>
      </TooltipProvider>
    </>
  )
}
