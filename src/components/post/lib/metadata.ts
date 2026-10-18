import type { PostMeta } from '@/lib/posts'
import {
  NAME,
  PERSON_ID,
  postPath,
  serializeJsonLd,
  SITE_ORIGIN,
  SITE_URL,
  SOCIAL_CARD,
  WEBSITE_ID,
  X_HANDLE,
} from '@/lib/site'

export function postUrl(slug: string) {
  return `${SITE_ORIGIN}${postPath(slug)}`
}

export function pageTitle(meta: PostMeta) {
  return `${meta.title} – ${NAME}`
}

export function openGraph(meta: PostMeta) {
  return {
    'og:type': 'article',
    'og:url': postUrl(meta.slug),
    'og:site_name': NAME,
    'og:locale': 'en_US',
    'og:title': meta.title,
    'og:description': meta.description,
    'og:image': SOCIAL_CARD.url,
    'og:image:width': SOCIAL_CARD.width,
    'og:image:height': SOCIAL_CARD.height,
    'og:image:alt': SOCIAL_CARD.alt,
    'article:published_time': meta.date,
    'article:modified_time': meta.updated ?? meta.date,
    'article:author': SITE_URL,
  }
}

export function twitter(meta: PostMeta) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:site': X_HANDLE,
    'twitter:creator': X_HANDLE,
    'twitter:title': meta.title,
    'twitter:description': meta.description,
    'twitter:image': SOCIAL_CARD.url,
    'twitter:image:alt': SOCIAL_CARD.alt,
  }
}

export function structuredData(meta: PostMeta) {
  const url = postUrl(meta.slug)
  return serializeJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    url,
    mainEntityOfPage: url,
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    inLanguage: 'en-US',
    image: SOCIAL_CARD.url,
    author: { '@type': 'Person', '@id': PERSON_ID, name: NAME, url: SITE_URL },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  })
}
