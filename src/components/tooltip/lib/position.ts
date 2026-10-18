import type { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'

import type { Point } from './types'

const TOUCH_SIDE_OFFSET_PX = 28
const TOUCH_SIDE_OFFSETS_PX: Partial<Record<Side, number>> = { bottom: 44 }
const POSITION_DEFAULTS = {
  side: 'top',
  sideOffset: 6,
  align: 'center',
  alignOffset: 0,
} satisfies PositionProps

export type PositionProps = Pick<
  TooltipPrimitive.Positioner.Props,
  'align' | 'alignOffset' | 'side' | 'sideOffset'
>

export interface TouchPlacementProps {
  touchSide?: Side
}

type Side = NonNullable<PositionProps['side']>
type Placement = Required<PositionProps>

export function placementFor(
  props: PositionProps,
  { touchSide = 'top' }: TouchPlacementProps,
  point: Point | null
) {
  const placement = { ...POSITION_DEFAULTS, ...definedOnly(props) } as Placement
  return point
    ? touchPlacement(placement.alignOffset, touchSide, point)
    : { ...placement, sideOffset: cursorSideOffset(placement.sideOffset) }
}

function touchPlacement(
  alignOffset: Placement['alignOffset'],
  touchSide: Side,
  point: Point
) {
  return {
    side: touchSide,
    align: 'center' as const,
    alignOffset,
    sideOffset: TOUCH_SIDE_OFFSETS_PX[touchSide] ?? TOUCH_SIDE_OFFSET_PX,
    anchor: pointAnchor(point),
  }
}

function cursorSideOffset(sideOffset: PositionProps['sideOffset']) {
  return typeof sideOffset === 'number'
    ? () => sideOffset * rootFontScale()
    : sideOffset
}

function definedOnly<T extends object>(values: T) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined)
  ) as Partial<T>
}

function rootFontScale() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize) / 16
}

function pointAnchor({ x, y }: Point) {
  return {
    getBoundingClientRect: () =>
      DOMRect.fromRect({ x, y, width: 0, height: 0 }),
  }
}
