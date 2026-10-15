import Head from 'next/head'
import Layout from '../components/layout'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found – Sam Magee</title>
      </Head>
      <Layout>
        <main className="missing" id="content" data-chapter="paper">
          <h1>Page not found</h1>
          <p>That address is not on this site.</p>
          <a href="/">Back to Sam Magee</a>
        </main>
      </Layout>
    </>
  )
}
