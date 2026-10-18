import { useState } from 'react'

export default function Counter({ start = 0 }: { start?: number }) {
  const [count, setCount] = useState(start)
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-400 bg-gray-200 px-4 py-3">
      <button
        type="button"
        onClick={() => setCount((value) => value - 1)}
        aria-label="Decrement"
        className="size-8 rounded-full bg-gray-300 font-medium text-gray-1200 transition-colors hover:bg-gray-400"
      >
        −
      </button>
      <output
        aria-live="polite"
        className="min-w-8 text-center font-medium text-gray-1200 tabular-nums"
      >
        {count}
      </output>
      <button
        type="button"
        onClick={() => setCount((value) => value + 1)}
        aria-label="Increment"
        className="size-8 rounded-full bg-gray-300 font-medium text-gray-1200 transition-colors hover:bg-gray-400"
      >
        +
      </button>
    </div>
  )
}
