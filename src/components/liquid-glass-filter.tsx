import { useEffect, useId, useState, useSyncExternalStore } from 'react'

const noop = () => () => {}

function isChromium() {
  const brands =
    (
      navigator as Navigator & {
        userAgentData?: { brands: { brand: string }[] }
      }
    ).userAgentData?.brands ?? []
  return brands.some(({ brand }) => brand === 'Chromium')
}

/** True in Chromium, the only engine that applies SVG filters via backdrop-filter. */
function useSvgBackdropSupport() {
  return useSyncExternalStore(noop, isChromium, () => false)
}

function useSize(el: HTMLElement | null) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null
  )
  useEffect(() => {
    if (!el) return
    const observer = new ResizeObserver(() =>
      setSize({ width: el.offsetWidth, height: el.offsetHeight })
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [el])
  return el ? size : null
}

// Displacement map sized to the element in px: red encodes x, green y, and
// a blurred 50% gray core leaves the middle untouched so only the rim bends
// what's behind it (after Jhey Tompkins' liquid glass technique).
function displacementMap(width: number, height: number, radius: number) {
  const inset = Math.min(6, height / 4)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="r" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#200000"/><stop offset="1" stop-color="#df0000"/></linearGradient><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#002000"/><stop offset="1" stop-color="#00df00"/></linearGradient><filter id="b"><feGaussianBlur stdDeviation="${inset / 1.5}"/></filter></defs><rect width="${width}" height="${height}" fill="#808000"/><rect width="${width}" height="${height}" rx="${radius}" fill="url(#r)"/><rect width="${width}" height="${height}" rx="${radius}" fill="url(#g)" style="mix-blend-mode:screen"/><rect x="${inset}" y="${inset}" width="${width - inset * 2}" height="${height - inset * 2}" rx="${Math.max(radius - inset, 0)}" fill="#808000" filter="url(#b)"/></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/**
 * Liquid glass for an element (pass it via a callback ref / state): returns the backdrop-filter to apply plus the
 * SVG filter to render next to it. Outside Chromium it returns no filter so
 * the CSS frosted fallback (.liquid-glass) stays in charge.
 */
export function useLiquidGlass(
  el: HTMLElement | null,
  { scale = -16, radius }: { scale?: number; radius?: number } = {}
) {
  const id = `liquid-glass-${useId().replace(/:/g, '')}`
  const supported = useSvgBackdropSupport()
  const size = useSize(el)

  if (!supported || !size || !size.width || !size.height) {
    return { style: undefined, filter: null }
  }

  const { width, height } = size
  const r = radius ?? height / 2
  const channel = (k: number, values: string, result: string) => (
    <>
      <feDisplacementMap
        in="SourceGraphic"
        in2="map"
        scale={scale * k}
        xChannelSelector="R"
        yChannelSelector="G"
        result={`${result}-d`}
      />
      <feColorMatrix
        in={`${result}-d`}
        type="matrix"
        values={values}
        result={result}
      />
    </>
  )

  return {
    style: {
      backdropFilter: `url(#${id}) blur(0.4px) saturate(1.8)`,
      WebkitBackdropFilter: `url(#${id}) blur(0.4px) saturate(1.8)`,
      backgroundColor: 'rgb(253 253 252 / 0.12)',
    },
    filter: (
      <svg aria-hidden="true" className="pointer-events-none absolute size-0">
        <filter
          id={id}
          x="0"
          y="0"
          width={width}
          height={height}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={displacementMap(width, height, r)}
            x="0"
            y="0"
            width={width}
            height={height}
            preserveAspectRatio="none"
            result="map"
          />
          {/* Slightly different strength per channel for a faint chromatic rim. */}
          {channel(1, '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0', 'red')}
          {channel(0.96, '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0', 'green')}
          {channel(0.92, '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0', 'blue')}
          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" />
        </filter>
      </svg>
    ),
  }
}
