import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TouchEvent,
} from 'react'

import { useLiquidGlass } from '@/components/liquid-glass-filter'

import { cn } from '@/lib/utils'

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

type Point = { x: number; y: number }

interface TouchTooltip {
  /** Finger position while a touch is holding this tooltip open. */
  point: Point | null
  handlers: {
    onTouchStart: (event: TouchEvent) => void
    onTouchMove: (event: TouchEvent) => void
    onTouchEnd: () => void
    onTouchCancel: () => void
  } | null
}

const TouchTooltipContext = createContext<TouchTooltip>({
  point: null,
  handlers: null,
})

/** How long a touch-opened tooltip lingers after the finger lifts. */
const TOUCH_LINGER_MS = 600

/**
 * Tooltip root. Mouse and keyboard use Base UI's own hover/focus logic
 * (cursor-following via trackCursorAxis). On touch, Base UI never opens a
 * tooltip, so we take over with controlled open state: open immediately on
 * touchstart, float above the finger and follow it, close ~600ms after the
 * finger lifts or as soon as the page scrolls. Listeners are passive and
 * never call preventDefault, so a tap still activates the link.
 */
function Tooltip({
  trackCursorAxis,
  onOpenChange,
  ...props
}: TooltipPrimitive.Root.Props) {
  const [open, setOpen] = useState(false)
  const [point, setPoint] = useState<Point | null>(null)
  const touching = useRef(false)
  const lastTouch = useRef(0)
  const closeTimer = useRef<number | undefined>(undefined)
  const frame = useRef(0)

  const closeTouch = useCallback(() => {
    window.clearTimeout(closeTimer.current)
    touching.current = false
    setOpen(false)
  }, [])

  const handlers = useMemo<TouchTooltip['handlers']>(() => {
    const at = (event: TouchEvent): Point | null => {
      const touch = event.touches[0]
      return touch ? { x: touch.clientX, y: touch.clientY } : null
    }
    const release = () => {
      lastTouch.current = Date.now()
      cancelAnimationFrame(frame.current)
      window.clearTimeout(closeTimer.current)
      closeTimer.current = window.setTimeout(closeTouch, TOUCH_LINGER_MS)
    }
    return {
      onTouchStart: (event) => {
        const next = at(event)
        if (!next) return
        window.clearTimeout(closeTimer.current)
        touching.current = true
        lastTouch.current = Date.now()
        setPoint(next)
        setOpen(true)
      },
      onTouchMove: (event) => {
        const next = at(event)
        if (!next || !touching.current) return
        lastTouch.current = Date.now()
        cancelAnimationFrame(frame.current)
        frame.current = requestAnimationFrame(() => setPoint(next))
      },
      onTouchEnd: release,
      onTouchCancel: release,
    }
  }, [closeTouch])

  // Any scroll dismisses a touch-opened tooltip.
  useEffect(() => {
    if (!open || !point) return
    window.addEventListener('scroll', closeTouch, {
      passive: true,
      capture: true,
    })
    return () =>
      window.removeEventListener('scroll', closeTouch, { capture: true })
  }, [open, point, closeTouch])

  useEffect(
    () => () => {
      window.clearTimeout(closeTimer.current)
      cancelAnimationFrame(frame.current)
    },
    []
  )

  const handleOpenChange = useCallback<
    NonNullable<TooltipPrimitive.Root.Props['onOpenChange']>
  >(
    (next, details) => {
      // While (or just after) a touch owns the tooltip, ignore Base UI's
      // hover/press changes, including the compatibility mouse events.
      if (touching.current || Date.now() - lastTouch.current < 800) return
      setPoint(null)
      setOpen(next)
      onOpenChange?.(next, details)
    },
    [onOpenChange]
  )

  const touchActive = open && point !== null

  return (
    <TouchTooltipContext.Provider
      value={{ point: touchActive ? point : null, handlers }}
    >
      <TooltipPrimitive.Root
        data-slot="tooltip"
        open={open}
        onOpenChange={handleOpenChange}
        trackCursorAxis={touchActive ? 'none' : trackCursorAxis}
        {...props}
      />
    </TouchTooltipContext.Provider>
  )
}

function TooltipTrigger({
  className,
  ...props
}: TooltipPrimitive.Trigger.Props) {
  const { handlers } = useContext(TouchTooltipContext)
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      // Holding a link on iOS would otherwise pop the link-preview callout
      // over the tooltip.
      className={cn('[-webkit-touch-callout:none]', className as string)}
      {...handlers}
      {...props}
    />
  )
}

/**
 * shadcn/ui tooltip content (Base UI), restyled as a liquid-glass pill.
 * Arrowless, since it is meant to float next to the cursor.
 */
function TooltipContent({
  className,
  side = 'top',
  sideOffset = 6,
  align = 'center',
  alignOffset = 0,
  children,
  style,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  >) {
  const [popup, setPopup] = useState<HTMLDivElement | null>(null)
  const glass = useLiquidGlass(popup)
  const { point } = useContext(TouchTooltipContext)
  // On touch, anchor to a zero-size point under the finger so the pill floats
  // ~28px above it (clear of the fingertip) and follows as it moves.
  const anchor = useMemo(
    () =>
      point
        ? {
            getBoundingClientRect: () =>
              DOMRect.fromRect({ x: point.x, y: point.y, width: 0, height: 0 }),
          }
        : undefined,
    [point]
  )

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={point ? 'center' : align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={point ? 28 : sideOffset}
        anchor={anchor}
        className="isolate z-50 transition-[top,left] duration-100 ease-out motion-reduce:transition-none"
      >
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
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
