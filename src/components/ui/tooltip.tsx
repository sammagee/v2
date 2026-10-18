import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
} from 'react'

import { useLiquidGlass } from '@/components/liquid-glass-filter'
import { cn } from '@/lib/utils'

import {
  moveTouch,
  releaseTouch,
  replaceTrigger,
  startTouch,
  TouchController,
  touchOwnsTooltips,
  touchPoint,
  type Point,
} from './tooltip-touch'

const TOUCH_SIDE_OFFSET_PX = 28
const POSITION_DEFAULTS = {
  side: 'top',
  sideOffset: 6,
  align: 'center',
  alignOffset: 0,
} satisfies PositionProps

type PositionProps = Pick<
  TooltipPrimitive.Positioner.Props,
  'align' | 'alignOffset' | 'side' | 'sideOffset'
>

interface TouchHandlers {
  onTouchStart: (event: TouchEvent) => void
  onTouchMove: (event: TouchEvent) => void
  onTouchEnd: () => void
  onTouchCancel: () => void
}

interface TouchTooltip {
  point: Point | null
  handlers: TouchHandlers | null
  triggerRef: ((node: Element | null) => void) | null
}

const TouchTooltipContext = createContext<TouchTooltip>({
  point: null,
  handlers: null,
  triggerRef: null,
})

function TooltipProvider({
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

function useTouchTooltip(controller: TouchController) {
  const entry = useRef<ReturnType<typeof replaceTrigger>>(null)
  const triggerRef = useCallback(
    (node: Element | null) => {
      entry.current = replaceTrigger(entry.current, node, controller)
    },
    [controller]
  )
  const handlers = useMemo<TouchHandlers>(
    () => ({
      onTouchStart: (event) => startTouch(entry.current, touchPoint(event)),
      onTouchMove: (event) => moveTouch(touchPoint(event)),
      onTouchEnd: releaseTouch,
      onTouchCancel: releaseTouch,
    }),
    []
  )
  useEffect(() => () => controller.dispose(), [controller])
  return { triggerRef, handlers }
}

function useHideOnScroll(active: boolean, hide: () => void) {
  useEffect(() => {
    if (!active) return
    const options = { passive: true, capture: true }
    window.addEventListener('scroll', hide, options)
    return () => window.removeEventListener('scroll', hide, options)
  }, [active, hide])
}

function Tooltip({
  trackCursorAxis,
  onOpenChange,
  ...props
}: TooltipPrimitive.Root.Props) {
  const [open, setOpen] = useState(false)
  const [point, setPoint] = useState<Point | null>(null)
  const [controller] = useState(() => new TouchController(setOpen, setPoint))
  const { triggerRef, handlers } = useTouchTooltip(controller)
  useHideOnScroll(open && point !== null, controller.hide)

  const handleOpenChange = useCallback<
    NonNullable<TooltipPrimitive.Root.Props['onOpenChange']>
  >(
    (next, details) => {
      if (touchOwnsTooltips()) return
      setPoint(null)
      setOpen(next)
      onOpenChange?.(next, details)
    },
    [onOpenChange]
  )

  const context = useMemo(
    () => ({ point, handlers, triggerRef }),
    [point, handlers, triggerRef]
  )

  return (
    <TouchTooltipContext.Provider value={context}>
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

function TooltipTrigger({
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

const rootFontScale = () =>
  parseFloat(getComputedStyle(document.documentElement).fontSize) / 16

const cursorSideOffset = (sideOffset: PositionProps['sideOffset']) =>
  typeof sideOffset === 'number'
    ? () => sideOffset * rootFontScale()
    : sideOffset

const definedOnly = <T extends object>(values: T) =>
  Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined)
  ) as Partial<T>

const pointAnchor = ({ x, y }: Point) => ({
  getBoundingClientRect: () => DOMRect.fromRect({ x, y, width: 0, height: 0 }),
})

function GlassPopup({
  className,
  style,
  children,
  ...props
}: TooltipPrimitive.Popup.Props & { children?: ReactNode }) {
  const [popup, setPopup] = useState<HTMLDivElement | null>(null)
  const glass = useLiquidGlass(popup)
  return (
    <TooltipPrimitive.Popup
      ref={setPopup}
      data-slot="tooltip-content"
      className={cn(
        'liquid-glass z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap text-gray-1200 transition-[opacity,scale] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 data-instant:transition-none motion-reduce:transition-none motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100',
        className
      )}
      style={{ ...glass.style, ...(style as object) }}
      {...props}
    >
      {glass.filter}
      {children}
    </TooltipPrimitive.Popup>
  )
}

function TooltipContent({
  side,
  sideOffset,
  align,
  alignOffset,
  ...props
}: TooltipPrimitive.Popup.Props & PositionProps) {
  const { point } = useContext(TouchTooltipContext)
  const anchor = useMemo(
    () => (point ? pointAnchor(point) : undefined),
    [point]
  )
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

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
