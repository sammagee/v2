import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import CompanyPins from '../components/company-pins'
import Profile from '../components/sections/profile'
import { getPositions, getPosts } from '../lib/content'

const TITLE = 'Sam Magee – Web Engineer'
const DESCRIPTION =
  "Hey, I'm Sam Magee. My goal is to craft beautiful experiences that solve your problems."

interface IHomeProps {
  positions: Position[]
  posts: Post[]
}

export default function Home({ positions }: IHomeProps) {
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
        <div id="content" className="flex flex-col pt-16 pb-16 sm:pt-20">
          <div className="w-full px-6 mx-auto xs:px-12 max-w-7xl">
            <div className="md:max-w-[29rem]">
              <Profile />
              <CompanyPins positions={positions} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const positions = await getPositions()
  const posts = await getPosts()

  return {
    props: {
      positions,
      posts,
    },
  }
}
