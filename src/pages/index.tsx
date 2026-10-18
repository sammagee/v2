import type { InferGetStaticPropsType } from 'next'

import { Home } from '@/components/home'
import { listPosts } from '@/lib/posts'

export default function IndexPage({
  posts,
  builtAt,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Home posts={posts} builtAt={builtAt} />
}

export function getStaticProps() {
  return { props: { posts: listPosts(), builtAt: Date.now() } }
}
