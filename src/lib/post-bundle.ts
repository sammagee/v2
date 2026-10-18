import rehypeShiki from '@shikijs/rehype'
import { bundleMDX } from 'mdx-bundler'
import remarkGfm from 'remark-gfm'

import { readPost, type PostMeta } from './posts'

const SHIKI_OPTIONS = {
  themes: { light: 'github-light', dark: 'github-dark' },
  defaultColor: false,
} as const

export interface BundledPost {
  meta: PostMeta
  code: string
}

type MdxOptions = Parameters<typeof bundleMDX>[0]['mdxOptions']
type ProcessorOptions = Parameters<NonNullable<MdxOptions>>[0]

export async function bundlePost(slug: string): Promise<BundledPost> {
  const { meta, source, directory } = readPost(slug)
  const { code } = await bundleMDX({
    source,
    cwd: directory,
    mdxOptions: withPlugins,
    esbuildOptions: (options) => ({ ...options, minify: true }),
  })
  return { meta, code }
}

function withPlugins(options: ProcessorOptions) {
  return {
    ...options,
    remarkPlugins: [...(options.remarkPlugins ?? []), remarkGfm],
    rehypePlugins: [
      ...(options.rehypePlugins ?? []),
      [rehypeShiki, SHIKI_OPTIONS],
    ],
  } as ProcessorOptions
}
