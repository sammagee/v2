import {
  AVATAR_URL,
  JOB_TITLE,
  NAME,
  PERSON_ID,
  serializeJsonLd,
  SITE_URL,
  WEBSITE_ID,
} from '@/lib/site'

import { PROFILES, TITLE } from './metadata'

export const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}#profile`,
      url: SITE_URL,
      name: TITLE,
      inLanguage: 'en-US',
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: NAME,
        url: SITE_URL,
        image: AVATAR_URL,
        jobTitle: JOB_TITLE,
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
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: NAME,
      inLanguage: 'en-US',
      publisher: { '@id': PERSON_ID },
    },
  ],
}

export const STRUCTURED_DATA_JSON = serializeJsonLd(STRUCTURED_DATA)
