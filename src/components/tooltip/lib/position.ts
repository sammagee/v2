import type { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'

import type { Point } from './types'

const TOUCH_SIDE_OFFSET_PX = 28
const TOUCH_SIDE_OFFSETS_PX: Partial<Record<Side, number>> = { bottom: 44 }
const CURSOR_CLEARANCE_PX: Partial<Record<Side, number>> = { bottom: 18 }
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

export interface PlacementSource {
  point: Point | null
  cursor: boolean
}

type Side = NonNullable<PositionProps['side']>
type Placement = Required<PositionProps>

export function placementFor(
  props: PositionProps,
  { point, cursor }: PlacementSource
) {
  const placement = { ...POSITION_DEFAULTS, ...definedOnly(props) } as Placement
  return point
    ? touchPlacement(placement, point)
    : {
        ...placement,
        sideOffset: cursorSideOffset(
          placement.sideOffset,
          cursorClearance(placement.side, cursor)
        ),
      }
}

function touchPlacement({ side, alignOffset }: Placement, point: Point) {
  return {
    side,
    align: 'center' as const,
    alignOffset,
    sideOffset: TOUCH_SIDE_OFFSETS_PX[side] ?? TOUCH_SIDE_OFFSET_PX,
    anchor: pointAnchor(point),
  }
}

function cursorClearance(side: Side, cursor: boolean) {
  return cursor ? (CURSOR_CLEARANCE_PX[side] ?? 0) : 0
}

function cursorSideOffset(
  sideOffset: PositionProps['sideOffset'],
  clearance: number
) {
  return typeof sideOffset === 'number'
    ? () => sideOffset * rootFontScale() + clearance
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
