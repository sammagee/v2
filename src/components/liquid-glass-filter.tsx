import {
  Fragment,
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
} from 'react'

const DISPLACEMENT_SCALE = -16
const CHANNELS = [
  {
    name: 'red',
    strength: 1,
    matrix: '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0',
  },
  {
    name: 'green',
    strength: 0.96,
    matrix: '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0',
  },
  {
    name: 'blue',
    strength: 0.92,
    matrix: '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0',
  },
]

interface Size {
  width: number
  height: number
}

const subscribeToNothing = () => () => {}

function isChromium() {
  const { userAgentData } = navigator as Navigator & {
    userAgentData?: { brands: { brand: string }[] }
  }
  return (userAgentData?.brands ?? []).some(({ brand }) => brand === 'Chromium')
}

function useSvgBackdropSupport() {
  return useSyncExternalStore(subscribeToNothing, isChromium, () => false)
}

function useSize(el: HTMLElement | null) {
  const [size, setSize] = useState<Size | null>(null)
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

const hasArea = (size: Size | null): size is Size =>
  Boolean(size?.width && size.height)

function displacementMap({ width, height }: Size) {
  const radius = height / 2
  const inset = Math.min(6, height / 4)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="r" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#200000"/><stop offset="1" stop-color="#df0000"/></linearGradient><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#002000"/><stop offset="1" stop-color="#00df00"/></linearGradient><filter id="b"><feGaussianBlur stdDeviation="${inset / 1.5}"/></filter></defs><rect width="${width}" height="${height}" fill="#808000"/><rect width="${width}" height="${height}" rx="${radius}" fill="url(#r)"/><rect width="${width}" height="${height}" rx="${radius}" fill="url(#g)" style="mix-blend-mode:screen"/><rect x="${inset}" y="${inset}" width="${width - inset * 2}" height="${height - inset * 2}" rx="${Math.max(radius - inset, 0)}" fill="#808000" filter="url(#b)"/></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function LiquidGlassFilter({ id, size }: { id: string; size: Size }) {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute size-0">
      <filter
        id={id}
        x="0"
        y="0"
        width={size.width}
        height={size.height}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feImage
          href={displacementMap(size)}
          x="0"
          y="0"
          width={size.width}
          height={size.height}
          preserveAspectRatio="none"
          result="map"
        />
        {CHANNELS.map(({ name, strength, matrix }) => (
          <Fragment key={name}>
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale={DISPLACEMENT_SCALE * strength}
              xChannelSelector="R"
              yChannelSelector="G"
              result={`${name}-d`}
            />
            <feColorMatrix
              in={`${name}-d`}
              type="matrix"
              values={matrix}
              result={name}
            />
          </Fragment>
        ))}
        <feBlend in="red" in2="green" mode="screen" result="rg" />
        <feBlend in="rg" in2="blue" mode="screen" />
      </filter>
    </svg>
  )
}

export function useLiquidGlass(el: HTMLElement | null) {
  const id = `liquid-glass-${useId().replace(/:/g, '')}`
  const supported = useSvgBackdropSupport()
  const size = useSize(el)
  if (!supported || !hasArea(size)) return { style: undefined, filter: null }
  const backdrop = `url(#${id}) blur(0.4px) saturate(1.8)`
  return {
    style: {
      backdropFilter: backdrop,
      WebkitBackdropFilter: backdrop,
      backgroundColor: 'var(--glass-tint)',
    },
    filter: <LiquidGlassFilter id={id} size={size} />,
  }
}
