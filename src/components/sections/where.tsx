import { useMemo } from 'react'
import AnchorButton from '../anchor-button'
import { Lifeline } from '../lifeline'
import { registerCompanyIcons } from '../lifeline/company-icon'
import type { LifelineMarker } from '../lifeline/types'
import {
  defineLifeline,
  type LifelineMilestones,
} from '../../lib/lifeline-data'

interface IWhereProps {
  positions: Position[]
}

const toUrl = (value: string) =>
  value.startsWith('http') ? value : `https://${value}`

const yearOf = (date: string) => parseInt(date.slice(0, 4), 10)

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-')

// Each position's existing SVG logo becomes a Lifeline company mark.
function registerLogos(positions: Position[]) {
  registerCompanyIcons(
    Object.fromEntries(
      positions
        .filter((position) => position.companyLogo)
        .map((position) => [
          slugify(position.company),
          {
            icon: ({ className }: { className?: string }) => (
              <svg
                className={className}
                fill="currentColor"
                viewBox="0 0 96 96"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: position.companyLogo }}
              />
            ),
          },
        ])
    )
  )
}

function buildCareer(positions: Position[]) {
  const sorted = [...positions].sort((a, b) => (a.date < b.date ? -1 : 1))
  const birthYear = yearOf(sorted[0].date)
  const milestones: LifelineMilestones = {}

  for (const position of sorted) {
    const year = yearOf(position.date)
    const milestone = (milestones[year] ??= {
      id: `year-${year}`,
      events: [],
      companies: [],
    })

    milestone.events.push([
      { type: 'text', value: `${position.title} at ` },
      {
        type: 'link',
        value: position.company,
        href: toUrl(position.companyLink),
      },
    ])
    milestone.companies.push({
      id: slugify(position.company),
      name: position.company,
    })
  }

  return defineLifeline({
    slug: 'career',
    name: 'Where I’ve worked',
    birthYear,
    description: 'The places I’ve worked',
    milestones,
  })
}

export default function Where({ positions }: IWhereProps) {
  const career = useMemo(() => {
    registerLogos(positions)
    return buildCareer(positions)
  }, [positions])

  return (
    <section
      id="where"
      aria-labelledby="where-heading"
      className="relative w-full pt-32 pb-32"
    >
      <div className="w-full px-6 mx-auto xs:px-12 max-w-7xl">
        <div className="flex items-end gap-3">
          <div>
            <h2 id="where-heading" className="text-5xl font-bold text-white">
              Where
            </h2>
            <p className="mt-2 text-lg font-semibold text-gray-500">
              The places I&apos;ve worked
            </p>
          </div>

          <div className="h-[2px] flex-1 mb-2 border-gray-500 border border-dashed opacity-25 rounded-full" />

          <AnchorButton
            className="mb-2"
            href="/resume.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Résumé</span>
            <svg
              className="w-4 h-4 text-brand-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </AnchorButton>
        </div>

        <div className="mt-10 h-[70vh] md:h-[460px]">
          <Lifeline
            mode="embed"
            className="h-full"
            markers={career.markers as LifelineMarker[]}
            birthYear={career.birthYear}
            title={career.name}
          />
        </div>
      </div>
    </section>
  )
}
