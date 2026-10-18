import { SiteHeader } from '@/components/site-header'
import { SiteLayout } from '@/components/site-layout'
import type { PostMeta } from '@/lib/posts'

import { HomeHead } from './home-head'
import { MoreSection } from './more-section'
import { WhoSection } from './who-section'
import { WordsSection } from './words-section'

export function Home({
  posts,
  builtAt,
}: {
  posts: PostMeta[]
  builtAt: number
}) {
  return (
    <>
      <HomeHead />
      <SiteLayout>
        <SiteHeader />
        <main>
          <WhoSection />
          <WordsSection posts={posts} builtAt={builtAt} />
          <MoreSection />
        </main>
      </SiteLayout>
    </>
  )
}
