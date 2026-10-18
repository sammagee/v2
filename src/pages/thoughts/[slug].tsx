import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { Post } from '@/components/post'
import { bundlePost } from '@/lib/post-bundle'
import { listPosts } from '@/lib/posts'

export default function ThoughtsPage({
  meta,
  code,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Post meta={meta} code={code} />
}

export function getStaticPaths() {
  return {
    paths: listPosts().map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  return { props: await bundlePost(params.slug) }
}
