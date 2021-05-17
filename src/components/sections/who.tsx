import Tooltip from '../tooltip'

export default function Who() {
  return (
    <section className="mt-48 sm:mt-56 sm:pl-20 xl:pl-0">
      <div className="w-full px-12 mx-auto lg:max-w-5xl xl:max-w-6xl">
        <h3 className="font-mono text-lg font-semibold text-brand-500">Hey, I'm</h3>
        <h1 className="mt-2 font-bold text-white text-7xl">Sam Magee</h1>
        <p className="mt-3 text-3xl font-medium text-gray-400">
          <span className="text-gray-500">My goal is to craft beautiful experiences that</span>
          <br />
          <span className="text-brand-400">solve your problems</span>
        </p>

        <p className="w-full max-w-xl mt-6 prose prose-xl text-gray-200">
          I am a{' '}full-stack{' '}
          <Tooltip content="Developer + Designer" placement="right"><span className="cursor-help">devsigner</span></Tooltip>.{' '}
          I currently work at IMT Insurance and am also currently working toward my Master's at Vanderbilt University.
          Below, you can find some of my favorite projects, as well as a list of my posts and experience.
        </p>

        <Tooltip
          content={
            <span className="flex items-center space-x-2">
              <span>hi@sammagee.me</span>
              <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          }
          placement="right"
        >
          <a className="inline-flex items-center justify-center h-12 px-5 mt-12 space-x-3 font-semibold transition duration-200 ease-in-out origin-bottom transform border-2 rounded-lg hover:bg-brand-400 focus:bg-brand-400 focus:bg-opacity-10 hover:bg-opacity-10 hover:scale-105 border-brand-400 text-brand-400 active:scale-100 focus:outline-none focus:border-dashed" href="mailto:hi@sammagee.me">
            <span>Let's Talk</span>

            <svg className="w-4 h-4 transform rotate-90 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </a>
        </Tooltip>
      </div>
    </section>
  )
}
