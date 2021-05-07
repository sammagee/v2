import Head from 'next/head'
import Link from 'next/link'
import Date from '../../components/date'
import Layout from '../../components/layout'
import Tooltip from '../../components/tooltip'
import { getAllSlugs, getData } from '../../lib/content'

interface IPostProps {
  post: Post
}

export default function Post({ post }: IPostProps) {
  const copy = () => (typeof window !== 'undefined' || typeof navigator.clipboard !== 'undefined') && navigator.clipboard.writeText(window.location.href)

  return (
    <Layout>
      <Head>
        <title>{post.title} &ndash; Sam Magee</title>

        <meta name="title" content={post.title} />
        <meta name="description" content={post.description} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://sammagee.me/posts/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content="https://sammagee.me/images/social/social-square.jpg" />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={`https://sammagee.me/images/posts/${post.slug}`} />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.description} />
        <meta property="twitter:image" content="https://sammagee.me/images/social/social-square.jpg" />
      </Head>

      <div id="content" role="main" aria-label="Main content" className="mt-48 mb-32 md:mt-56">
        <article className="w-full px-12 mx-auto prose prose-lg sm:pl-32 lg:pl-0">
          <Link href="/#words">
            <a className="inline-flex items-center space-x-2 !text-gray-400 !no-underline focus:outline-none border-2 border-transparent border-dashed focus:border-brand-500 -ml-0.5">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>

              <span>Back</span>
            </a>
          </Link>

          <header className="mt-3">
            <h1 className="!m-0">{post.title}</h1>

            <div className="flex items-end justify-between mt-3">
              <div className="flex-1">
                <p className="!mt-3 !mb-0 text-gray-300" aria-label={`Published by: ${post.author}`}>{post.author}</p>

                <p className="!my-0 text-base font-medium text-gray-500">
                  <Date ariaLabel="Published date: " dateFormat="d LLLL yyyy" dateString={post.date} />
                </p>
              </div>

              <Tooltip
                content={
                  <span className="flex items-center space-x-2">
                    <span>Copy link to clipboard</span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </span>
                }
                placement="left"
              >
                <button className="flex-shrink-0 p-2 -mb-1.5 text-gray-500 transition-colors duration-200 ease-in-out border-2 border-transparent border-dashed rounded-full focus:bg-gray-500 focus:bg-opacity-10 hover:bg-gray-500 hover:bg-opacity-10 hover:text-gray-400 focus:outline-none focus:border-brand-500" onClick={copy}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </Tooltip>
            </div>
          </header>

          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllSlugs('posts')

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = await getData('posts', params.slug)

  return {
    props: {
      post,
    },
  }
}
