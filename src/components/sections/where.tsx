import { useMemo } from 'react'
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
      aria-label="Where I’ve worked"
      className="relative w-full pt-24 pb-32"
    >
      <div className="w-full px-6 mx-auto xs:px-12 max-w-7xl">
        <div className="h-[70vh] md:h-[460px]">
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
