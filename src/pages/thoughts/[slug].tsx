import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { Post } from '@/components/post'
import { bundlePost } from '@/lib/post-bundle'
import { listPosts } from '@/lib/posts'
import { postPath } from '@/lib/site'

export default function ThoughtsPage({
  meta,
  code,
  postLinks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Post meta={meta} code={code} postLinks={postLinks} />
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
  return {
    props: {
      ...(await bundlePost(params.slug)),
      postLinks: collectPostLinks(),
    },
  }
}

function collectPostLinks() {
  return Object.fromEntries(
    listPosts().map(({ slug, title, subtitle }) => [
      postPath(slug),
      { title, subtitle },
    ])
  )
}
