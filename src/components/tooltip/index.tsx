import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { useContext, useState } from 'react'

import { GlassPopup } from './glass-popup'
import { useDragReveal } from './hooks/use-drag-reveal'
import { useNestedHover } from './hooks/use-nested-hover'
import {
  anchorAt,
  cursorSideOffset,
  definedOnly,
  POSITION_DEFAULTS,
  TOUCH_SIDE_OFFSET_PX,
  type PositionProps,
} from './lib/position'
import { RevealContext } from './lib/reveal-context'

export function Tooltip({
  trackCursorAxis,
  onOpenChange,
  ...props
}: TooltipPrimitive.Root.Props) {
  const [open, setOpen] = useState(false)
  const [trigger, setTrigger] = useState<Element | null>(null)
  const point = useDragReveal(trigger)
  const nested = useNestedHover(trigger)

  const handleOpenChange: TooltipPrimitive.Root.Props['onOpenChange'] = (
    next,
    details
  ) => {
    setOpen(next)
    onOpenChange?.(next, details)
  }

  return (
    <RevealContext.Provider value={{ point, setTrigger }}>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        open={isOpen(open, nested, point)}
        onOpenChange={handleOpenChange}
        trackCursorAxis={point ? 'none' : trackCursorAxis}
        {...props}
      />
    </RevealContext.Provider>
  )
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
  const { setTrigger } = useContext(RevealContext)
  return (
    <TooltipPrimitive.Trigger
      ref={setTrigger}
      data-slot="tooltip-trigger"
      {...props}
    />
  )
}

export function TooltipContent({
  side,
  sideOffset,
  align,
  alignOffset,
  ...props
}: TooltipPrimitive.Popup.Props & PositionProps) {
  const { point } = useContext(RevealContext)
  const position = {
    ...POSITION_DEFAULTS,
    ...definedOnly({ side, sideOffset, align, alignOffset }),
  }

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={position.side}
        align={point ? 'center' : position.align}
        alignOffset={position.alignOffset}
        sideOffset={
          point ? TOUCH_SIDE_OFFSET_PX : cursorSideOffset(position.sideOffset)
        }
        anchor={anchorAt(point)}
        className="isolate z-50 transition-[top,left] duration-100 ease-out motion-reduce:transition-none"
      >
        <GlassPopup {...props} />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

function isOpen(open: boolean, nested: boolean, point: unknown) {
  return (open && !nested) || point !== null
}
