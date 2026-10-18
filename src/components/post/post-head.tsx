import Head from 'next/head'

import type { PostMeta } from '@/lib/posts'

import {
  openGraph,
  pageTitle,
  postUrl,
  structuredData,
  twitter,
} from './lib/metadata'

export function PostHead({ meta }: { meta: PostMeta }) {
  return (
    <Head>
      <title>{pageTitle(meta)}</title>
      <meta name="description" content={meta.description} />
      {meta.draft && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={postUrl(meta.slug)} />
      {Object.entries(openGraph(meta)).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}
      {Object.entries(twitter(meta)).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData(meta) }}
      />
    </Head>
  )
}
