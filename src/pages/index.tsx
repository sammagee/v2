import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getSortedData } from '../lib/content'
import Layout from '../components/layout'
import Links from '../components/links'
import Where from '../components/sections/where'
import Who from '../components/sections/who'
import Words from '../components/sections/words'
import Work from '../components/sections/work'

export default function Home({ posts, projects }) {
  return (
    <>
      <Head>
        <title>Sam Magee &ndash; Devsigner</title>
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
