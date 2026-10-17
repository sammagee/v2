import type { CSSProperties } from 'react'

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
    logo: '/images/logos/round/vanta.svg',
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
  krafted: {
    name: 'Krafted',
    href: 'https://krafted.dev',
    logo: '/images/logos/round/krafted.svg',
  },
} satisfies Record<string, ICompany>

export function CompanyLogo({ company }: { company: ICompany }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={company.logo}
      alt=""
      width={22}
      height={22}
      className="block size-[1.375em] rounded-full bg-white shadow-[0_0_0_2px_#fff,0_1px_3px_rgba(33,32,28,0.2)]"
    />
  )
}

// Earlier (more recent) companies sit on top, like an avatar stack.
export function CompanyStack({ companies }: { companies: ICompany[] }) {
  return (
    <span className="inline-flex -translate-y-px whitespace-nowrap align-middle">
      {companies.map((company, index) => (
        <a
          key={company.name}
          href={company.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={company.name}
          title={company.name}
          style={{ '--z': companies.length - index } as CSSProperties}
          className={`relative z-(--z) rounded-full transition-transform duration-200 ease-out hover:z-20 hover:-translate-y-0.5 hover:scale-110 focus-visible:z-20 focus-visible:-translate-y-0.5 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:focus-visible:translate-y-0 motion-reduce:focus-visible:scale-100 ${
            index > 0 ? '-ml-[0.25em]' : ''
          }`}
        >
          <CompanyLogo company={company} />
        </a>
      ))}
    </span>
  )
}
