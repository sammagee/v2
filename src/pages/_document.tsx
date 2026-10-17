import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="196x196"
          href="/images/favicon.png"
        />
      </Head>

      <body className="bg-gray-100 font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
