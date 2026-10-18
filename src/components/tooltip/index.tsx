import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { useContext, useState } from 'react'

import { cn } from '@/lib/utils'

import { GlassPopup } from './glass-popup'
import { useTouchTooltip } from './hooks/use-touch-tooltip'
import {
  anchorAt,
  cursorSideOffset,
  definedOnly,
  POSITION_DEFAULTS,
  TOUCH_SIDE_OFFSET_PX,
  type PositionProps,
} from './lib/position'
import { TouchTooltipContext } from './lib/touch-context'
import { TouchController, touchOwnsTooltips } from './lib/touch-controller'
import type { Point } from './lib/types'

export function Tooltip({
  trackCursorAxis,
  onOpenChange,
  ...props
}: TooltipPrimitive.Root.Props) {
  const [open, setOpen] = useState(false)
  const [point, setPoint] = useState<Point | null>(null)
  const [controller] = useState(() => new TouchController(setOpen, setPoint))
  const { triggerRef, handlers } = useTouchTooltip(controller)

  const handleOpenChange: TooltipPrimitive.Root.Props['onOpenChange'] = (
    next,
    details
  ) => {
    if (touchOwnsTooltips()) return
    setPoint(null)
    setOpen(next)
    onOpenChange?.(next, details)
  }

  return (
    <TouchTooltipContext.Provider value={{ point, handlers, triggerRef }}>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        open={open}
        onOpenChange={handleOpenChange}
        trackCursorAxis={point ? 'none' : trackCursorAxis}
        {...props}
      />
    </TouchTooltipContext.Provider>
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

export function TooltipTrigger({
  className,
  ...props
}: TooltipPrimitive.Trigger.Props) {
  const { handlers, triggerRef } = useContext(TouchTooltipContext)
  return (
    <TooltipPrimitive.Trigger
      ref={triggerRef ?? undefined}
      data-slot="tooltip-trigger"
      // Stops iOS's long-press link preview from covering the tooltip.
      className={cn('[-webkit-touch-callout:none]', className as string)}
      {...handlers}
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
  const { point } = useContext(TouchTooltipContext)
  const anchor = anchorAt(point)
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
        anchor={anchor}
        className="isolate z-50 transition-[top,left] duration-100 ease-out motion-reduce:transition-none"
      >
        <GlassPopup {...props} />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}
