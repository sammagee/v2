import type { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'

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

function rootFontScale() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize) / 16
}
