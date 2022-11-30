import AnchorButton from '../anchor-button'
import Dots from '../dots'
import Tooltip from '../tooltip'

export default function Who() {
  return (
    <section className="mt-48 sm:mt-56 sm:pl-20 xl:pl-0">
      <div className="relative w-full px-12 mx-auto lg:max-w-5xl xl:max-w-6xl">
        <Dots />

        <div className="relative z-10">
          <h3 className="font-mono text-lg font-semibold text-brand-500">
            Hey, I'm
          </h3>
          <h1 className="mt-2 font-bold text-white text-7xl">Sam Magee</h1>
          <p className="mt-3 text-3xl font-medium text-gray-400">
            <span className="text-gray-500">
              I craft elegant experiences that intuitively
            </span>
            <br />
            <span className="text-brand-400">solve your problems</span>
          </p>

          <p className="w-full max-w-xl mt-6 prose prose-xl text-gray-200">
            I am a frontend engineer at Uber, working on solving complex and
            interesting problems in the marketplace. I am also currently working
            on achieving my Master's in Computer Science at Vanderbilt
            University (last semester, woohoo!).
          </p>

          <Tooltip
            content={
              <span className="flex items-center space-x-2">
                <span>sam@magee.one</span>
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
            <AnchorButton className="mt-12" href="mailto:sam@magee.one">
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
    </section>
  )
}
