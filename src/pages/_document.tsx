import NextDocument, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html className="text-sm bg-white dark:bg-gray-900 sm:text-base" lang="en-US">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        </Head>
        <body className="antialiased bg-white font-inter dark:bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
