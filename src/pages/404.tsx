import Head from 'next/head'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not Found – Sam Magee</title>
      </Head>

      <div
        aria-hidden="true"
        className="h-[71px] min-[440px]:h-12 md:h-[53px]"
      />
      <div className="mx-auto max-w-[692px] px-6 py-12 text-gray-1200 antialiased sm:py-32 md:py-16">
        <header className="mb-21 flex flex-col items-start">
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
    </>
  )
}
