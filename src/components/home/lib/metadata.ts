import { NAME, SITE_URL, SOCIAL_CARD, X_HANDLE } from '@/lib/site'

export const TITLE = 'Sam Magee – Senior Software Engineer at Vanta'
export const DESCRIPTION =
  'Sam Magee is a senior software engineer at Vanta, building compliance and trust software. Previously at Uber, Marqeta, and Principal.'
export const PROFILES = [
  'https://github.com/sammagee',
  'https://www.linkedin.com/in/sammagee',
  'https://x.com/sammagee',
]
export const OPEN_GRAPH = {
  'og:type': 'profile',
  'og:url': SITE_URL,
  'og:site_name': NAME,
  'og:locale': 'en_US',
  'og:title': TITLE,
  'og:description': DESCRIPTION,
  'og:image': SOCIAL_CARD.url,
  'og:image:width': SOCIAL_CARD.width,
  'og:image:height': SOCIAL_CARD.height,
  'og:image:alt': SOCIAL_CARD.alt,
  'profile:first_name': 'Sam',
  'profile:last_name': 'Magee',
}
export const TWITTER = {
  'twitter:card': 'summary_large_image',
  'twitter:site': X_HANDLE,
  'twitter:creator': X_HANDLE,
  'twitter:title': TITLE,
  'twitter:description': DESCRIPTION,
  'twitter:image': SOCIAL_CARD.url,
  'twitter:image:alt': SOCIAL_CARD.alt,
}
