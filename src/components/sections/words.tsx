export default function Words() {
  return (
    <section id="words" className="relative w-full py-24">
      <div className="py-24 -my-8">
        <div className="relative w-full h-64 max-w-6xl mx-auto">
          <div className="flex items-end space-x-3">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
                <span>Words</span>
              </h2>
              <p className="mt-2 text-lg font-semibold text-gray-500">These are some of my most recent posts.</p>
            </div>

            <div className="h-[2px] flex-1 mb-2 border-gray-500 border border-dashed opacity-25 rounded-full" />
          </div>

          <span className="absolute bottom-0 left-0 font-mono font-black opacity-40 dark:opacity-25 text-8xl text-brand-500">02.</span>
        </div>
      </div>
    </section>
  )
}
