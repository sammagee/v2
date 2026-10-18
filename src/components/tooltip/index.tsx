import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'

import { GlassPopup } from './glass-popup'
import {
  cursorSideOffset,
  definedOnly,
  POSITION_DEFAULTS,
  type PositionProps,
} from './lib/position'

export function Tooltip(props: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

export function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

export function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

export function TooltipContent({
  side,
  sideOffset,
  align,
  alignOffset,
  ...props
}: TooltipPrimitive.Popup.Props & PositionProps) {
  const position = {
    ...POSITION_DEFAULTS,
    ...definedOnly({ side, sideOffset, align, alignOffset }),
  }

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={position.side}
        align={position.align}
        alignOffset={position.alignOffset}
        sideOffset={cursorSideOffset(position.sideOffset)}
        className="isolate z-50 transition-[top,left] duration-100 ease-out motion-reduce:transition-none"
      >
        <GlassPopup {...props} />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}
