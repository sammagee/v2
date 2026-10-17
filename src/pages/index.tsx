import { format, parseISO } from 'date-fns'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getPositions } from '../lib/content'

const TITLE = 'Sam Magee'
const DESCRIPTION =
  'Senior Software Engineer at Vanta, building the future of trust and compliance software.'
const URL = 'https://sammagee.me'
const IMAGE = `${URL}/images/social/social-card.jpg`

interface IHomeProps {
  positions: Position[]
}

const toUrl = (value: string) =>
  value.startsWith('http') ? value : `https://${value}`

const formatDate = (value: string) =>
  /^present$/i.test(value) ? 'Present' : format(parseISO(value), 'MMM yyyy')

const listItem =
  '-mx-3 flex flex-col rounded-md px-3 no-underline hover:bg-hover sm:py-3'

export default function Home({ positions }: IHomeProps) {
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

      <div className="mx-auto max-w-[692px] overflow-x-hidden px-6 py-12 text-gray-1200 antialiased sm:py-32 md:overflow-x-visible md:py-16">
        <header className="mb-32 flex flex-col items-start">
          <Link href="/" className="inline-block font-medium no-underline">
            Sam Magee
          </Link>
          <span className="font-medium leading-none text-gray-1100">
            Senior Software Engineer
          </span>
        </header>

        <main>
          <h2 className="mb-5 block font-medium sm:mb-6">Today</h2>
          <p className="text-gray-1100">
            I&apos;m a Senior Software Engineer at Vanta, building the future of
            trust and compliance software.
          </p>
          <p className="mt-4 text-gray-1100">
            I design and build software that makes complex work feel simple.
          </p>

          <section className="-mb-3 mt-16 sm:mt-32" aria-labelledby="work">
            <h2 id="work" className="mb-5 block font-medium sm:mb-4">
              Work
            </h2>
            <ul className="flex flex-col gap-7 sm:gap-4">
              {positions.map((position) => {
                const content = (
                  <>
                    <span>{position.company}</span>
                    <span className="text-gray-1100">
                      {position.title} &middot; {formatDate(position.date)}{' '}
                      &ndash; {formatDate(position.endDate || 'Present')}
                    </span>
                  </>
                )

                return (
                  <li key={position.slug} className="flex flex-col">
                    {position.companyLink ? (
                      <a
                        href={toUrl(position.companyLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={listItem}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={listItem}>{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>

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

export const getStaticProps: GetStaticProps<IHomeProps> = async () => ({
  props: { positions: getPositions() },
})
