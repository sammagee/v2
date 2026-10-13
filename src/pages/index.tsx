import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import Where from '../components/sections/where'
import Profile from '../components/sections/profile'
import ProjectList from '../components/sections/project-list'
import { getPositions, getPosts, getProjects } from '../lib/content'

const TITLE = 'Sam Magee – Web Engineer'
const DESCRIPTION =
  "Hey, I'm Sam Magee. My goal is to craft beautiful experiences that solve your problems."

interface IHomeProps {
  positions: Position[]
  posts: Post[]
  projects: Project[]
}

export default function Home({ positions, posts, projects }: IHomeProps) {
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
        <meta
          property="og:image"
          content="https://sammagee.me/images/social/social-card.jpg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sammagee.me" />
        <meta property="twitter:title" content={TITLE} />
        <meta property="twitter:description" content={DESCRIPTION} />
        <meta
          property="twitter:image"
          content="https://sammagee.me/images/social/social-card.jpg"
        />
      </Head>

      <Layout showLinks={false}>
        <div
          id="content"
          className="w-full px-6 pt-32 mx-auto xs:px-12 sm:pt-40 max-w-7xl"
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-start lg:gap-20">
            <Profile />
            <ProjectList projects={projects} />
          </div>
        </div>

        <Where positions={positions} />
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const positions = await getPositions()
  const posts = await getPosts()
  const projects = await getProjects()

  return {
    props: {
      positions,
      posts,
      projects,
    },
  }
}
