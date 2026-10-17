import type { CSSProperties } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export interface ICompany {
  name: string
  href: string
  logo: string
}

// Round badges built from each company's official mark
// (public/images/logos/round).
export const COMPANIES = {
  vanta: {
    name: 'Vanta',
    href: 'https://vanta.com',
    logo: '/images/logos/round/vanta.png',
  },
  uber: {
    name: 'Uber',
    href: 'https://uber.com',
    logo: '/images/logos/round/uber.svg',
  },
  marqeta: {
    name: 'Marqeta',
    href: 'https://marqeta.com',
    logo: '/images/logos/round/marqeta.svg',
  },
  principal: {
    name: 'Principal',
    href: 'https://principal.com',
    logo: '/images/logos/round/principal.svg',
  },
  imt: {
    name: 'IMT Insurance',
    href: 'https://imtins.com',
    logo: '/images/logos/round/imt.svg',
  },
  central: {
    name: 'Central College',
    href: 'https://central.edu',
    logo: '/images/logos/round/central.png',
  },
  leantech: {
    name: 'Lean Technologies',
    href: 'https://leantech.com',
    logo: '/images/logos/round/leantech.svg',
  },
} satisfies Record<string, ICompany>

/** A logo with the same cursor-following glass tooltip as the links. */
export function CompanyLogoWithTooltip({
  company,
  className,
}: {
  company: ICompany
  className?: string
}) {
  return (
    <Tooltip trackCursorAxis="both">
      <TooltipTrigger render={<span className={className} />}>
        <CompanyLogo company={company} />
      </TooltipTrigger>
      <TooltipContent>{company.name}</TooltipContent>
    </Tooltip>
  )
}

/**
 * A 22px round logo inside a 2px ring. The ring is the wrapper's own
 * background (padding), not a box-shadow spread, and the art is opaque
 * full-bleed square artwork clipped once by the img's radius, with no fill
 * under it (a fill would get anti-aliased twice and fringe the edge). So
 * there's one anti-aliased edge between art and ring and one between ring
 * and page, never two coincident ones. The shadow is a drop-shadow filter
 * on the ring circle (follows its painted edge, adds no second edge) and
 * grows a hair on hover/focus. -m-[2px] keeps the layout box at 22px.
 */
export function CompanyLogo({ company }: { company: ICompany }) {
  return (
    <span className="-m-[2px] block size-[26px] rounded-full bg-(--logo-ring) p-[2px] drop-shadow-[0_1px_1px_var(--logo-shadow)] transition-[filter] duration-200 ease-out group-hover:drop-shadow-[0_1.5px_2px_var(--logo-shadow)] group-focus-visible:drop-shadow-[0_1.5px_2px_var(--logo-shadow)] motion-reduce:transition-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={company.logo}
        alt=""
        width={22}
        height={22}
        className="block size-[22px] rounded-full object-cover"
      />
    </span>
  )
}

// Earlier (more recent) companies sit on top, like an avatar stack.
export function CompanyStack({ companies }: { companies: ICompany[] }) {
  return (
    <span className="inline-flex -translate-y-px whitespace-nowrap align-middle">
      {companies.map((company, index) => (
        <Tooltip key={company.name} trackCursorAxis="both">
          <TooltipTrigger
            render={
              <a
                href={company.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={company.name}
                style={{ '--z': companies.length - index } as CSSProperties}
                className={`group relative z-(--z) rounded-full transition-transform duration-200 ease-out hover:z-20 hover:-translate-y-0.5 hover:scale-110 focus-visible:z-20 focus-visible:-translate-y-0.5 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:focus-visible:translate-y-0 motion-reduce:focus-visible:scale-100 ${
                  index > 0 ? '-ml-[0.25em]' : ''
                }`}
              />
            }
          >
            <CompanyLogo company={company} />
          </TooltipTrigger>
          <TooltipContent>{company.name}</TooltipContent>
        </Tooltip>
      ))}
    </span>
  )
}
