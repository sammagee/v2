import Head from 'next/head'
import Link from 'next/link'

import { SiteHeader } from '@/components/site-header'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not Found – Sam Magee</title>
      </Head>

      <div className="md:flex md:min-h-dvh md:flex-col md:justify-center-safe">
        <div
          aria-hidden="true"
          className="h-[4.4375rem] min-[440px]:h-12 md:hidden"
        />
        <div className="mx-auto w-full max-w-[43.25rem] px-6 py-12 text-gray-1200 antialiased sm:py-32 md:py-16">
          <SiteHeader />

          <main>
            <h1 className="mb-3.5 block font-medium sm:mb-4">Not found</h1>
            <p className="text-gray-1100">
              This page doesn&apos;t exist. <Link href="/">Go home</Link>.
            </p>
          </main>
        </div>
      </div>
    </>
  )
}
