import type { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'

import type { Point } from './types'

export const TOUCH_SIDE_OFFSET_PX = 28

export const POSITION_DEFAULTS = {
  side: 'top',
  sideOffset: 6,
  align: 'center',
  alignOffset: 0,
} satisfies PositionProps

export type PositionProps = Pick<
  TooltipPrimitive.Positioner.Props,
  'align' | 'alignOffset' | 'side' | 'sideOffset'
>

export function cursorSideOffset(sideOffset: PositionProps['sideOffset']) {
  return typeof sideOffset === 'number'
    ? () => sideOffset * rootFontScale()
    : sideOffset
}

export function definedOnly<T extends object>(values: T) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined)
  ) as Partial<T>
}

export function anchorAt(point: Point | null) {
  return point ? pointAnchor(point) : undefined
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
