import '../styles/app.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'

import { useAnimatedHistory } from '@/hooks/use-animated-history'
import { APPLE_SPLASH_SCREENS } from '@/lib/apple-splash-screens'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  axes: ['opsz'],
})

export default function App({ Component, pageProps }: AppProps) {
  useAnimatedHistory()
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <AppHead />
      {/* On :root, not a wrapper, so portaled tooltips also get Inter. */}
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

function AppHead() {
  return (
    <Head>
      <meta name="author" content="Sam Magee" />
      <meta name="copyright" content="Sam Magee" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link rel="manifest" href="/pwa/site.webmanifest" />
      <link rel="apple-touch-icon" href="/pwa/images/apple-icon-180.png" />
      {APPLE_SPLASH_SCREENS.map(({ href, media }) => (
        <link
          key={href}
          rel="apple-touch-startup-image"
          href={href}
          media={media}
        />
      ))}
    </Head>
  )
}
