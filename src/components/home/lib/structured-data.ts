import { AVATAR_URL, NAME, PROFILES, SITE_URL, TITLE } from './metadata'

export const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}#profile`,
      url: SITE_URL,
      name: TITLE,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE_URL}#website` },
      mainEntity: {
        '@type': 'Person',
        '@id': `${SITE_URL}#person`,
        name: NAME,
        url: SITE_URL,
        image: AVATAR_URL,
        jobTitle: 'Senior Software Engineer',
        worksFor: {
          '@type': 'Organization',
          name: 'Vanta',
          url: 'https://www.vanta.com',
        },
        alumniOf: [
          {
            '@type': 'CollegeOrUniversity',
            name: 'Vanderbilt University',
            url: 'https://www.vanderbilt.edu',
          },
          {
            '@type': 'CollegeOrUniversity',
            name: 'Central College',
            url: 'https://central.edu',
          },
        ],
        sameAs: PROFILES,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: NAME,
      inLanguage: 'en-US',
      publisher: { '@id': `${SITE_URL}#person` },
    },
  ],
}

export const STRUCTURED_DATA_JSON = JSON.stringify(STRUCTURED_DATA).replace(
  /</g,
  '\\u003c'
)
