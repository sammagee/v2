import Head from 'next/head'
import Link from 'next/link'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllSlugs, getData } from '../../lib/content'

interface IPostProps {
  post: Post
}

export default function Post({ post }: IPostProps) {
  return (
    <Layout>
      <Head>
        <title>{post.title} &ndash; Sam Magee</title>

        <meta name="title" content={post.title} />
        <meta name="description" content={post.description} />

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

      <div id="content" className="mt-56 mb-32">
        <article className="w-full mx-auto prose prose-lg">
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

            <p className="!mt-3 !mb-0 text-gray-300">{post.author}</p>

            <p className="!my-0 text-base font-medium text-gray-500">
              <Date dateFormat="d LLLL yyyy" dateString={post.date} />
            </p>
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
