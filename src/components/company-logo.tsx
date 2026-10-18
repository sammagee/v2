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

export function CompanyLogo({ company }: { company: ICompany }) {
  return (
    <span className="-m-[2px] block size-[calc(1.375rem+4px)] rounded-full bg-(--logo-ring) p-[2px] drop-shadow-[0_1px_1px_var(--logo-shadow)] transition-[filter] duration-200 ease-out group-hover:drop-shadow-[0_1.5px_2px_var(--logo-shadow)] group-focus-visible:drop-shadow-[0_1.5px_2px_var(--logo-shadow)] motion-reduce:transition-none">
      <img
        src={company.logo}
        alt=""
        width={22}
        height={22}
        className="block size-[1.375rem] rounded-full object-cover"
      />
    </span>
  )
}

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
