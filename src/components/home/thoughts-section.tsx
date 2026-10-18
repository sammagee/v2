import Link from 'next/link'
import { ViewTransition } from 'react'

import type { PostMeta } from '@/lib/posts'
import { postPath, postTitleTransition } from '@/lib/site'

import { useRelativeTime } from './hooks/use-relative-time'

const FULL_DATE = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'UTC',
})

export function ThoughtsSection({
  posts,
  builtAt,
}: {
  posts: PostMeta[]
  builtAt: number
}) {
  if (!posts.length) return null
  return (
    <section className="mt-21 md:mt-14" aria-labelledby="thoughts">
      <h2 id="thoughts" className="mb-4 block font-medium">
        Thoughts
      </h2>
      <ul className="flex flex-col gap-2">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} builtAt={builtAt} />
        ))}
      </ul>
    </section>
  )
}

function PostRow({ post, builtAt }: { post: PostMeta; builtAt: number }) {
  const age = useRelativeTime(post.date, builtAt)
  return (
    <ViewTransition name={postTitleTransition(post.slug)}>
      <li>
        <Link
          href={postPath(post.slug)}
          className="rounded-sm text-gray-1100 no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-1200"
        >
          <span className="font-medium">{post.title}</span>{' '}
          <time
            dateTime={post.date}
            title={FULL_DATE.format(new Date(post.date))}
            className="text-gray-1000 tabular-nums"
          >
            {age}
          </time>
        </Link>
      </li>
    </ViewTransition>
  )
}
