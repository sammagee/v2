import Link from 'next/link'

import type { PostMeta } from '@/lib/posts'
import { postPath } from '@/lib/site'

import { useRelativeTime } from './hooks/use-relative-time'

const FULL_DATE = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'UTC',
})

export function WordsSection({
  posts,
  builtAt,
}: {
  posts: PostMeta[]
  builtAt: number
}) {
  if (!posts.length) return null
  return (
    <section className="mt-21 md:mt-14" aria-labelledby="words">
      <h2 id="words" className="mb-4 block font-medium">
        Words
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
    <li>
      <Link
        href={postPath(post.slug)}
        className="group flex items-baseline-last gap-1 text-gray-1100 no-underline"
      >
        <span className="min-w-0 transition-colors duration-150 group-hover:text-gray-1200 group-focus-visible:text-gray-1200">
          {post.title}
        </span>
        <span
          aria-hidden="true"
          className="link-dotted min-w-6 flex-1 leading-[normal]"
        >
          &nbsp;
        </span>
        <time
          dateTime={post.date}
          title={FULL_DATE.format(new Date(post.date))}
          className="shrink-0 text-gray-1000 tabular-nums"
        >
          {age}
        </time>
      </Link>
    </li>
  )
}
