export default function Where() {
  return (
    <section id="where" className="relative w-full pt-32 overflow-x-hidden">
      <div className="absolute inset-x-0 w-full h-32 transform bg-gray-100 top-8 dark:bg-gray-1000 -skew-y-1"></div>

      <div className="pt-32 pb-40 -mt-8 bg-gray-100 dark:bg-gray-1000">
        <div className="relative w-full max-w-6xl mx-auto">
          <div className="flex items-end space-x-3">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
                Where
              </h2>
              <p className="mt-2 text-lg font-semibold text-gray-500">These are the places I've worked.</p>
            </div>

            <div className="h-[2px] flex-1 mb-2 border-gray-500 border border-dashed opacity-25 rounded-full" />

            <a
              className="inline-flex items-center justify-center h-12 px-5 mb-2 space-x-3 font-semibold transition duration-200 ease-in-out origin-bottom transform border-2 rounded-lg hover:bg-brand-400 focus:bg-brand-400 focus:bg-opacity-10 hover:bg-opacity-10 hover:scale-105 border-brand-400 text-brand-400 active:scale-100 focus:outline-none focus:border-dashed"
              href="/resume"
              rel="noopener"
              target="_blank"
            >
              <span>Résumé</span>

              <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </a>
          </div>

          <div className="absolute bottom-0 left-0 flex items-end justify-between w-full">
            <span className="font-mono font-black opacity-40 dark:opacity-25 text-8xl text-brand-500">
              03.
            </span>
          </div>

          <div className="py-32">
            
          </div>
        </div>
      </div>
    </section>
  )
}
