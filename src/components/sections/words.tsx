import Link from 'next/link'
import Date from '../date'

interface IWordsProps {
  posts: Post[]
}

export default function Words({ posts }: IWordsProps) {
  return (
    <section id="words" className="relative w-full py-24">
      <div className="py-24 -my-8 sm:pl-20 xl:pl-0">
        <div className="relative w-full px-12 mx-auto lg:max-w-5xl xl:max-w-6xl">
          <div className="flex items-end space-x-3">
            <div>
              <h2 className="text-5xl font-bold text-white">
                <span>Words</span>
              </h2>
              <p className="mt-2 text-lg font-semibold text-gray-500">These are some of my most recent posts.</p>
            </div>

            <div className="h-[2px] flex-1 mb-2 border-gray-500 border border-dashed opacity-25 rounded-full" />
          </div>

          <div className="py-10">
            {posts.length ? (
              <div className="space-y-3">
                {posts.map(post => (
                  <article key={post.slug}>
                    <h3 className="-ml-0.5 text-xl font-semibold">
                      <Link
                        href={`/posts/${post.slug}`}
                        key={post.slug}
                      >
                        <a className="text-white border-2 border-transparent border-dashed focus:outline-none focus:border-brand-500">{post.title}</a>
                      </Link>
                    </h3>

                    <div className="flex items-end w-full space-x-2">
                      <p className="!my-0 text-base font-medium text-gray-500">
                        <Date dateFormat="d LLLL yyyy" dateString={post.date} />
                      </p>

                      <div className="flex-1 mb-1.5 border-b opacity-75 border-gray-800 border-dashed" />
                      <span className="font-mono text-lg text-gray-400">{(post.number).toString().padStart(2, '0')}.</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-brand-400 bg-opacity-10 text-brand-400">Posts coming soon</span>
              </div>
            )}
          </div>

          <div className="mt-20 font-mono font-black opacity-25 text-8xl text-brand-500">02.</div>
        </div>
      </div>
    </section>
  )
}
