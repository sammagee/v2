import Head from 'next/head'

const TITLE = 'Sam Magee'
const DESCRIPTION =
  'Senior Software Engineer at Vanta, building the future of trust and compliance software.'
const URL = 'https://sammagee.me'
const IMAGE = `${URL}/images/social/social-card.jpg`

const OPEN_GRAPH = {
  'og:type': 'website',
  'og:url': URL,
  'og:site_name': TITLE,
  'og:locale': 'en-US',
  'og:title': TITLE,
  'og:description': DESCRIPTION,
  'og:image': IMAGE,
}

const TWITTER = {
  'twitter:card': 'summary_large_image',
  'twitter:title': TITLE,
  'twitter:description': DESCRIPTION,
  'twitter:image': IMAGE,
}

export function HomeHead() {
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      {Object.entries(OPEN_GRAPH).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}
      {Object.entries(TWITTER).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
    </Head>
  )
}
