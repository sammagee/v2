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
  projects: Project[]
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

function buildCareer(positions: Position[], projects: Project[]) {
  const sorted = [...positions].sort((a, b) => (a.date < b.date ? -1 : 1))
  const birthYear = yearOf(sorted[0].date)
  const milestones: LifelineMilestones = {}
  const milestoneFor = (year: number) =>
    (milestones[year] ??= { id: `year-${year}`, events: [], companies: [] })

  for (const position of sorted) {
    const year = yearOf(position.date)
    const milestone = milestoneFor(year)

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

  // Projects sit on the same rail as the jobs. They read "Launched …" and
  // carry their screenshot as a Lifeline hover image (the image icon marks
  // them apart from roles, which carry a company logo instead).
  for (const project of projects) {
    const href = project.link || project.git
    milestoneFor(yearOf(project.date)).events.push({
      text: [
        { type: 'text', value: 'Launched ' },
        href
          ? { type: 'link', value: project.title, href: toUrl(href) }
          : { type: 'text', value: project.title },
      ],
      ...(project.image && {
        image: {
          src: `/images/projects/${project.image}`,
          alt: `${project.title} screenshot`,
        },
      }),
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

export default function Where({ positions, projects }: IWhereProps) {
  const career = useMemo(() => {
    registerLogos(positions)
    return buildCareer(positions, projects)
  }, [positions, projects])

  return (
    <section
      id="where"
      aria-label="Where I’ve worked, and what I’ve built"
      className="relative w-full mt-4"
    >
      <div className="h-[380px] md:h-[420px]">
        <Lifeline
          mode="embed"
          layout="horizontal"
          className="h-full"
          markers={career.markers as LifelineMarker[]}
          birthYear={career.birthYear}
          title={career.name}
        />
      </div>

      {/* Soft edge fades into the page background */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-30 w-8 pointer-events-none sm:w-16 lg:w-32 bg-gradient-to-r from-gray-900 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 z-30 w-8 pointer-events-none sm:w-16 lg:w-32 bg-gradient-to-l from-gray-900 to-transparent"
      />
    </section>
  )
}
