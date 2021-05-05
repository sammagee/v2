import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getSortedData } from '../lib/content'
import Layout from '../components/layout'
import Links from '../components/links'
import Where from '../components/sections/where'
import Who from '../components/sections/who'
import Words from '../components/sections/words'
import Work from '../components/sections/work'

const TITLE = 'Sam Magee – Devsigner'
const DESCRIPTION = "Hey, I'm Sam Magee. My goal is to craft beautiful experiences that solve your problems."

export default function Home({ posts, projects }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>

        <meta name="description" content={DESCRIPTION} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sammagee.me" />
        <meta property="og:site_name" content={TITLE} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content="https://me-new.vercel.app/images/social/social-card.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sammagee.me" />
        <meta property="twitter:title" content={TITLE} />
        <meta property="twitter:description" content={DESCRIPTION} />
        <meta property="twitter:image" content="https://me-new.vercel.app/images/social/social-card.jpg" />
      </Head>

      <Layout home={true}>
        <Links />

        <Who />

        <div id="content" className="mt-56">
          <Work projects={projects} />
          <Words posts={posts} />
          <Where />
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  const posts = await getSortedData('posts')
  const projects = await getSortedData('projects')

  return {
    props: {
      posts,
      projects,
    },
  }
}
