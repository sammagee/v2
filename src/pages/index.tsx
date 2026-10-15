import { GetStaticProps } from 'next'
import Head from 'next/head'
import HomeOverview from '../components/home-overview'
import Layout from '../components/layout'
import { getPositions, getProjects, getSchools } from '../lib/content'

const TITLE = 'Sam Magee'
const DESCRIPTION =
  'Sam Magee is a design engineer and senior software engineer at Vanta. He designs and builds software that makes complex work feel simple.'

interface HomeProps {
  positions: Array<Position & { slug: string }>
  projects: Project[]
  schools: Array<School & { slug: string }>
}

export default function Home({ positions, projects, schools }: HomeProps) {
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
      <Layout>
        <HomeOverview positions={positions} projects={projects} schools={schools} />
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const positions = await getPositions()
  const projects = await getProjects()
  const schools = await getSchools()

  return {
    props: {
      positions,
      projects,
      schools,
    },
  }
}
