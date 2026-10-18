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
