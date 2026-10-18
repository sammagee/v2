import Head from 'next/head'

import { SITE_URL } from '@/lib/site'

import { DESCRIPTION, OPEN_GRAPH, TITLE, TWITTER } from './lib/metadata'
import { STRUCTURED_DATA_JSON } from './lib/structured-data'

export function HomeHead() {
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={SITE_URL} />
      {Object.entries(OPEN_GRAPH).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}
      {Object.entries(TWITTER).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA_JSON }}
      />
    </Head>
  )
}
