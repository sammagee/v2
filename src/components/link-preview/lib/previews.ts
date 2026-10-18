import previews from './link-previews.json'

const PREVIEWS: Record<string, LinkPreview> = previews

export interface LinkPreview {
  title: string
  host: string
  icon: string | null
}

export function linkPreview(href: string): LinkPreview {
  return PREVIEWS[href] ?? fallbackPreview(href)
}

function fallbackPreview(href: string): LinkPreview {
  const host = new URL(href).host.replace(/^www\./, '')
  return { title: host, host, icon: null }
}
