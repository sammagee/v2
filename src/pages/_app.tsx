import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/app.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="author" content="Sam Magee" />
        <meta name="copyright" content="Sam Magee" />
        <meta name="keywords" content="sam magee, sam, magee, devsigner, designer, developer, web designer, web developer, full stack, full stack developer, full-stack, fullstack" />
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover, user-scalable=no" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
