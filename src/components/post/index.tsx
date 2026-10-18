import { ViewTransition } from 'react'

import { Masthead } from '@/components/masthead'
import { SiteLayout } from '@/components/site-layout'
import type { BundledPost } from '@/lib/post-bundle'
import { JOB_TITLE, NAME, postTitleTransition } from '@/lib/site'

import { BackLink } from './back-link'
import { PostLinksContext, type PostSummary } from './lib/post-links'
import { MdxContent } from './mdx-content'
import { PostHead } from './post-head'

export function Post({
  meta,
  code,
  postLinks,
}: BundledPost & { postLinks: Record<string, PostSummary> }) {
  return (
    <>
      <PostHead meta={meta} />
      <SiteLayout>
        <header className="relative mb-21 md:mb-14">
          <BackLink />
          <ViewTransition name={postTitleTransition(meta.slug)}>
            <Masthead title={meta.title} subtitle={meta.subtitle} />
          </ViewTransition>
        </header>
        <main>
          <article className="post-body text-gray-1100">
            <PostLinksContext.Provider value={postLinks}>
              <MdxContent code={code} />
            </PostLinksContext.Provider>
          </article>
        </main>
        <footer className="mt-21 md:mt-14">
          <Masthead heading="p" title={NAME} subtitle={JOB_TITLE} href="/" />
        </footer>
      </SiteLayout>
    </>
  )
}
