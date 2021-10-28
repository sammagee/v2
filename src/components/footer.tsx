import Link from 'next/link'
import AnchorButton from './anchor-button'
import Tooltip from './tooltip'

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="w-full py-16 mx-auto sm:pl-20 lg:max-w-5xl xl:max-w-6xl xl:pl-0">
        <div className="px-12">
          <div className="flex flex-col-reverse items-center justify-between sm:flex-row">
            <p className="mt-12 font-semibold text-gray-500 sm:mt-0">
              &copy;{' '}
              <Link href="/">
                <a className="border-2 border-transparent border-dashed focus:outline-none focus-visible:border-brand-500">
                  Sam Magee
                </a>
              </Link>
            </p>

            <div className="flex items-center space-x-6">
              <p className="font-semibold text-gray-400">Got an idea?</p>

              <Tooltip
                content={
                  <span className="flex items-center space-x-2">
                    <span>{process.env.NEXT_PUBLIC_EMAIL}</span>
                    <svg
                      className="w-3 h-3 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                }
                placement="left"
              >
                <AnchorButton href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
                  <span>Let's Talk</span>

                  <svg
                    className="w-4 h-4 transform rotate-90 text-brand-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </AnchorButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
