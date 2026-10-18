import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import matter from 'gray-matter'

export const POSTS_DIR = join(process.cwd(), 'src', 'posts')
export const POST_FILE = 'post.mdx'
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const SHOW_DRAFTS = process.env.VERCEL_ENV !== 'production'

export interface PostMeta {
  slug: string
  title: string
  subtitle: string | null
  description: string
  date: string
  updated: string | null
  draft: boolean
}

export interface PostSource {
  meta: PostMeta
  source: string
  directory: string
}

type Frontmatter = Record<string, unknown>

export function listPosts(): PostMeta[] {
  return postSlugs()
    .map((slug) => readPost(slug).meta)
    .filter(isVisible)
    .toSorted(newestFirst)
}

export function readPost(slug: string): PostSource {
  const directory = join(POSTS_DIR, slug)
  const source = readFileSync(join(directory, POST_FILE), 'utf8')
  return { meta: parseMeta(slug, matter(source).data), source, directory }
}

export function isVisible(meta: PostMeta) {
  return SHOW_DRAFTS || !meta.draft
}

function postSlugs() {
  if (!existsSync(POSTS_DIR)) return []
  return readdirSync(POSTS_DIR).filter((slug) =>
    existsSync(join(POSTS_DIR, slug, POST_FILE))
  )
}

function parseMeta(slug: string, data: Frontmatter): PostMeta {
  const title = requiredText(slug, data, 'title')
  const subtitle = optionalText(data.subtitle)
  return {
    slug,
    title,
    subtitle,
    description: optionalText(data.description) ?? subtitle ?? title,
    date: requiredDate(slug, data.date),
    updated: optionalDate(slug, data.updated),
    draft: data.draft === true,
  }
}

function requiredText(slug: string, data: Frontmatter, key: string) {
  const value = optionalText(data[key])
  if (value === null) throw new Error(`${slug}/${POST_FILE}: add a ${key}`)
  return value
}

function optionalText(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function requiredDate(slug: string, value: unknown) {
  const date = toDateText(value)
  if (typeof date === 'string' && ISO_DATE.test(date)) return date
  throw new Error(`${slug}/${POST_FILE}: dates must be YYYY-MM-DD`)
}

function toDateText(value: unknown) {
  return value instanceof Date ? value.toISOString().slice(0, 10) : value
}

function optionalDate(slug: string, value: unknown) {
  return value === undefined ? null : requiredDate(slug, value)
}

function newestFirst(a: PostMeta, b: PostMeta) {
  return b.date.localeCompare(a.date) || a.title.localeCompare(b.title)
}
