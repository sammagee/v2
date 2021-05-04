import Link from 'next/link'
import Tooltip from './tooltip'

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="max-w-6xl py-16 mx-auto">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-500">
            &copy; <Link href="/"><a className="transition-colors duration-200 border-2 border-transparent border-dashed hover:text-gray-600 focus:outline-none focus:border-brand-500">Sam Magee</a></Link>
          </p>

          <div className="flex items-center space-x-6">
            <p className="font-semibold text-gray-400">Got an idea?</p>

            <Tooltip
              content={
                <span className="flex items-center space-x-2">
                  <span>hi@sammagee.me</span>
                  <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              }
              placement="left"
            >
              <a className="inline-flex items-center justify-center h-12 px-5 space-x-3 font-semibold transition duration-200 ease-in-out origin-bottom transform border-2 rounded-lg hover:bg-brand-400 focus:bg-brand-400 focus:bg-opacity-10 hover:bg-opacity-10 hover:scale-105 border-brand-400 text-brand-400 active:scale-100 focus:outline-none focus:border-dashed" href="mailto:hi@sammagee.me">
                <span>Let's Talk</span>

                <svg className="w-4 h-4 transform rotate-90 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </footer>
  )
}
