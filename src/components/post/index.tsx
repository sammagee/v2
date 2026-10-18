import { Masthead } from '@/components/masthead'
import { SiteLayout } from '@/components/site-layout'
import type { BundledPost } from '@/lib/post-bundle'
import { JOB_TITLE, NAME } from '@/lib/site'

import { BackLink } from './back-link'
import { MdxContent } from './mdx-content'
import { PostHead } from './post-head'

export function Post({ meta, code }: BundledPost) {
  return (
    <>
      <PostHead meta={meta} />
      <SiteLayout>
        <header className="relative mb-21 md:mb-14">
          <BackLink />
          <Masthead title={meta.title} subtitle={meta.subtitle} />
        </header>
        <main>
          <article className="post-body text-gray-1100">
            <MdxContent code={code} />
          </article>
        </main>
        <footer className="mt-21 md:mt-14">
          <Masthead heading="p" title={NAME} subtitle={JOB_TITLE} href="/" />
        </footer>
      </SiteLayout>
    </>
  )
}
