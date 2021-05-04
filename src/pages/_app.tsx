import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/app.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" sizes="196x196" href="/images/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
