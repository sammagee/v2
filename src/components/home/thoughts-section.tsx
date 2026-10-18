import { ViewTransition } from 'react'

import { PostLink } from '@/components/link-preview'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip'
import type { PostMeta } from '@/lib/posts'
import { postPath, postTitleTransition } from '@/lib/site'

import { useRelativeTime } from './hooks/use-relative-time'

const FULL_DATE = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
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
        <PostLink
          href={postPath(post.slug)}
          title={post.title}
          subtitle={post.subtitle}
          className="rounded-sm text-gray-1100 no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-1200"
        >
          <span className="font-medium">{post.title}</span>{' '}
          <RelativeDate date={post.date} age={age} />
        </PostLink>
      </li>
    </ViewTransition>
  )
}

function RelativeDate({ date, age }: { date: string; age: string }) {
  return (
    <Tooltip trackCursorAxis="both">
      <TooltipTrigger
        render={
          <time dateTime={date} className="text-gray-1000 tabular-nums" />
        }
      >
        {age}
      </TooltipTrigger>
      <TooltipContent>{FULL_DATE.format(new Date(date))}</TooltipContent>
    </Tooltip>
  )
}
