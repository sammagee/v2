import clsx from 'clsx'
import useScrollDirection from '../hooks/useScrollDirection'
import AnchorButton from './anchor-button'
import Button from './button'
import Tooltip from './tooltip'

const SCROLL_OFFSET = 250

export default function Links() {
  const [scrollPos] = useScrollDirection()

  const handleScrollToTop = () =>
    scrollPos > SCROLL_OFFSET && window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="fixed z-20 flex-col items-center hidden space-y-3 sm:flex bottom-4 left-11 h-[calc(100%-8rem)] vsm:h-2/5">
      <Tooltip
        content={
          <span className="flex items-center space-x-2">
            <span>@sammagee</span>
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
        placement="right"
      >
        <AnchorButton
          href="https://github.com/sammagee"
          rel="noopener noreferrer"
          target="_blank"
          icon
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>

          <span className="sr-only">GitHub</span>
        </AnchorButton>
      </Tooltip>

      <Tooltip
        content={
          <span className="flex items-center space-x-2">
            <span>@sammagee</span>
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
        placement="right"
      >
        <AnchorButton
          href="https://twitter.com/sammagee"
          rel="noopener noreferrer"
          target="_blank"
          icon
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>

          <span className="sr-only">Twitter</span>
        </AnchorButton>
      </Tooltip>

      <Tooltip
        content={
          <span className="flex items-center space-x-2">
            <span>@sammagee</span>
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
        placement="right"
      >
        <AnchorButton
          href="https://linkedin.com/in/sammagee"
          rel="noopener noreferrer"
          target="_blank"
          icon
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>

          <span className="sr-only">LinkedIn</span>
        </AnchorButton>
      </Tooltip>

      <div className="flex-1 w-[2px] opacity-25 border border-dashed border-brand-400 rounded-full" />

      <Button
        className={clsx(
          '!mt-0 opacity-25',
          scrollPos > SCROLL_OFFSET && 'hover:opacity-100'
        )}
        disabled={scrollPos <= SCROLL_OFFSET}
        onClick={handleScrollToTop}
        icon
      >
        <svg
          className={clsx(
            'w-6 h-6 transform transition-transform ease-in-out duration-200',
            scrollPos <= SCROLL_OFFSET ? 'cursor-default' : 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 13l-5 5m0 0l-5-5m5 5V6"
          />
        </svg>

        <span className="sr-only">Scroll to Top</span>
      </Button>
    </div>
  )
}
