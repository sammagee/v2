import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 &ndash; Not Found &ndash; Sam Magee</title>
      </Head>

      <Layout>
        <div className="relative flex items-center justify-center flex-1 mt-24">
          <div className="space-y-3 text-center">
            <h1 className="text-5xl font-bold text-white">
              404 &ndash; Not Found
            </h1>

            <p className="text-xl text-gray-500">
              This page does not seem to exist.
            </p>

            <Link href="/">
              <a className="inline-flex mr-6 items-center space-x-2 !text-gray-400 !no-underline focus:outline-none border-2 border-transparent border-dashed focus-visible:border-brand-500 -ml-0.5">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>

                <span>Return Home</span>
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  )
}
