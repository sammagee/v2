import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta charSet="utf-8" />

          <link
            rel="icon"
            type="image/png"
            sizes="196x196"
            href="/images/favicon.png"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: "document.documentElement.classList.add('js')",
            }}
          />
        </Head>

        <body>
          <Main />
          <script src="/overview.js" defer />
          <NextScript />
        </body>
      </Html>
    )
  }
}
