import { Fragment } from 'react'

import { displacementMap } from './lib/displacement-map'
import type { Size } from './lib/types'

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

export function LiquidGlassFilter({ id, size }: { id: string; size: Size }) {
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
