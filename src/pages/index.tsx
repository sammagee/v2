import Head from 'next/head'
import Layout from '../components/layout'
import Links from '../components/links'
import Where from '../components/sections/where'
import Who from '../components/sections/who'
import Words from '../components/sections/words'
import Work from '../components/sections/work'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sam Magee &ndash; Devsigner</title>
      </Head>

      <Layout home={true}>
        <Links />

        <Who />

        <div id="content" className="mt-56">
          <Work />
          <Words />
          <Where />
        </div>
      </Layout>
    </>
  )
}
