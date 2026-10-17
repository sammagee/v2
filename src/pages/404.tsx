import Head from 'next/head'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not Found – Sam Magee</title>
      </Head>

      {/* From md up the block is vertically centered in the viewport
          (safe-centered: taller content falls back to top-aligned flow with
          the normal padding, never clipped); the top spacer that mirrors
          Emil's announcement bar only applies to the top-aligned mobile
          layout. */}
      <div className="md:flex md:min-h-dvh md:flex-col md:justify-center-safe">
        <div
          aria-hidden="true"
          className="h-[71px] min-[440px]:h-12 md:hidden"
        />
        <div className="mx-auto w-full max-w-[692px] px-6 py-12 text-gray-1200 antialiased sm:py-32 md:py-16">
          <header className="mb-21 md:mb-14 flex flex-col items-start">
            <Link href="/" className="inline-block font-medium no-underline">
              Sam Magee
            </Link>
            <span className="font-medium leading-none text-gray-1100">
              Senior Software Engineer
            </span>
          </header>

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
