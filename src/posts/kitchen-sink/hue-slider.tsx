import { useState } from 'react'

export default function HueSlider() {
  const [hue, setHue] = useState(210)
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-400 bg-gray-200 px-4 py-3">
      <span
        aria-hidden="true"
        className="size-8 shrink-0 rounded-full"
        style={{ backgroundColor: `oklch(70% 0.15 ${hue})` }}
      />
      <input
        type="range"
        min={0}
        max={360}
        value={hue}
        onChange={(event) => setHue(Number(event.target.value))}
        aria-label="Hue"
        className="w-full accent-gray-1200"
      />
      <output className="w-10 text-right text-gray-1200 tabular-nums">
        {hue}°
      </output>
    </div>
  )
}
