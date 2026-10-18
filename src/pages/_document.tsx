import { Head, Html, Main, NextScript } from 'next/document'

import { THEME_COLORS, themeInitScript } from '@/lib/theme'

export default function Document() {
  return (
    <Html lang="en-US" suppressHydrationWarning>
      <Head>
        <meta name="theme-color" content={THEME_COLORS.light} />
        {/* Must stay a blocking inline script: it sets the theme before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
