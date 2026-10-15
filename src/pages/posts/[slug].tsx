import Head from 'next/head'
import Layout from '../../components/layout'
import { Content, getAllSlugs } from '../../lib/content'
import { getPost } from '../../lib/posts'

interface PostPageProps {
  post: Post
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <Layout>
      <Head>
        <title>{post.title} – Sam Magee</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
      </Head>

      <article className="article" id="content" data-chapter="paper">
        <a className="back" href="/">
          Back
        </a>
        <header>
          <h1>{post.title}</h1>
          <p className="meta">
            {post.author} · <time dateTime={post.date}>{post.date}</time>
            {post.readTime ? ` · ${post.readTime}` : ''}
          </p>
        </header>
        <p className="lead">{post.description}</p>
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: getAllSlugs(Content.Posts),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug)

  return {
    props: {
      post,
    },
  }
}
