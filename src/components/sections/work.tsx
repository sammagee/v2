export default function Work() {
  return (
    <section id="work" className="relative w-full py-32 overflow-x-hidden">
      <div className="absolute inset-x-0 w-full h-32 transform bg-gray-100 top-8 dark:bg-gray-1000 skew-y-1"></div>

      <div className="py-32 -my-8 bg-gray-100 dark:bg-gray-1000">
        <div className="relative w-full h-64 max-w-6xl mx-auto">
          <div className="flex items-end space-x-3">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
                Work
              </h2>
              <p className="mt-2 text-lg font-semibold text-gray-500">These are some of my favorite projects I've worked on.</p>
            </div>

            <div className="h-[2px] flex-1 mb-2 border-gray-500 border border-dashed opacity-25 rounded-full" />
          </div>

          <span className="absolute bottom-0 left-0 font-mono font-black opacity-40 dark:opacity-25 text-8xl text-brand-500">01.</span>
        </div>
      </div>

      <div className="absolute inset-x-0 w-full h-32 transform bg-gray-100 bottom-8 dark:bg-gray-1000 skew-y-1"></div>
    </section>
  )
}
