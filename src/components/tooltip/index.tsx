import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { useContext, useState } from 'react'

import { GlassPopup } from './glass-popup'
import { useDragReveal } from './hooks/use-drag-reveal'
import { placementFor, type PositionProps } from './lib/position'
import { RevealContext } from './lib/reveal-context'

export function Tooltip({
  trackCursorAxis,
  onOpenChange,
  ...props
}: TooltipPrimitive.Root.Props) {
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(false)
  const [trigger, setTrigger] = useState<Element | null>(null)
  const point = useDragReveal(trigger)

  const handleOpenChange: TooltipPrimitive.Root.Props['onOpenChange'] = (
    next,
    details
  ) => {
    setOpen(next)
    setCursor(details.reason === 'trigger-hover' && Boolean(trackCursorAxis))
    onOpenChange?.(next, details)
  }

  return (
    <RevealContext.Provider value={{ point, cursor, setTrigger }}>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        open={open || point !== null}
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
  const { point, cursor } = useContext(RevealContext)
  const placement = placementFor(
    { side, sideOffset, align, alignOffset },
    { point, cursor }
  )

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        {...placement}
        className="isolate z-50 transition-[top,left] duration-100 ease-out motion-reduce:transition-none"
      >
        <GlassPopup {...props} />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}
