export const SITE_ORIGIN = 'https://sammagee.me'
export const SITE_URL = `${SITE_ORIGIN}/`
export const NAME = 'Sam Magee'
export const JOB_TITLE = 'Senior Software Engineer'
export const X_HANDLE = '@sammagee'
export const PERSON_ID = `${SITE_URL}#person`
export const WEBSITE_ID = `${SITE_URL}#website`
export const AVATAR_URL = `${SITE_URL}images/social/avatar.png`
export const SOCIAL_CARD = {
  url: `${SITE_URL}images/social/card.png`,
  width: '1200',
  height: '630',
  alt: "Sam Magee, Senior Software Engineer. Hey, my name is Sam! I'm a senior software engineer at Vanta, building compliance and trust software for the future.",
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function postPath(slug: string) {
  return `/words/${slug}`
}
