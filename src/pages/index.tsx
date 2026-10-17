import Head from 'next/head'
import Link from 'next/link'
import {
  COMPANIES,
  CompanyLogo,
  CompanyStack,
} from '../components/company-logo'

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

      <div
        aria-hidden="true"
        className="h-[71px] min-[440px]:h-12 md:h-[53px]"
      />
      <div className="mx-auto max-w-[692px] overflow-x-hidden px-6 py-12 text-gray-1200 antialiased sm:py-32 md:overflow-x-visible md:py-16">
        <header className="mb-32 flex items-center justify-between gap-4">
          <div className="flex flex-col items-start">
            <Link href="/" className="inline-block font-medium no-underline">
              Sam Magee
            </Link>
            <span className="font-medium leading-none text-gray-1100">
              Senior Software Engineer
            </span>
          </div>
          {/* -my-0.5 keeps the row at the text block's 40px height so the name doesn't move. */}
          <span className="-my-0.5 block size-11 shrink-0 overflow-hidden rounded-full bg-[linear-gradient(135deg,#ffd9c7_0%,#ffcfe0_35%,#e1d3ff_68%,#c4e4ff_100%)] shadow-[0_0_0_2px_#fff,0_1px_3px_rgba(33,32,28,0.2)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/favicon.png"
              alt="Sam Magee"
              width={44}
              height={44}
              className="block size-full translate-y-[3px] scale-[0.92] object-contain"
            />
          </span>
        </header>

        <main>
          <h2 className="mb-5 block font-medium sm:mb-6">Today</h2>
          <p className="text-gray-1100">
            I&apos;m a Senior Software Engineer at{' '}
            <a
              href={COMPANIES.vanta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-[0.3em] no-underline"
            >
              <span className="self-center">
                <CompanyLogo company={COMPANIES.vanta} />
              </span>
              <span className="underline decoration-gray-800 decoration-[0.08em] [text-underline-position:from-font]">
                Vanta
              </span>
            </a>
            , building the future of trust and compliance software. I design and
            build software that makes complex work feel simple.
          </p>
          <p className="mt-4 text-gray-1100">
            Previously, I&apos;ve worked at{' '}
            <CompanyStack companies={PREVIOUS} />.
          </p>

          <section className="mt-16 sm:mt-32" aria-labelledby="more">
            <h2 id="more" className="mb-6 block font-medium sm:mb-6">
              More
            </h2>
            <p className="text-gray-1100">
              You can see more of my work on{' '}
              <a
                href="https://x.com/sammagee"
                target="_blank"
                rel="noopener noreferrer"
              >
                X
              </a>{' '}
              and{' '}
              <a
                href="https://linkedin.com/in/sammagee"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              , and more of my code on{' '}
              <a
                href="https://github.com/sammagee"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              . Here&apos;s my{' '}
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                resume
              </a>
              {email ? (
                <>
                  , or say hi by <a href={`mailto:${email}`}>email</a>.
                </>
              ) : (
                '.'
              )}
            </p>
          </section>
        </main>
      </div>
    </>
  )
}
