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

interface TouchHandlers {
  onTouchStart: (event: TouchEvent) => void
  onTouchMove: (event: TouchEvent) => void
  onTouchEnd: () => void
  onTouchCancel: () => void
}

interface TouchTooltip {
  /** Finger position while a touch is holding this tooltip open. */
  point: Point | null
  handlers: TouchHandlers | null
  /** Registers the trigger element so a sliding finger can find it. */
  triggerRef: ((node: Element | null) => void) | null
}

const TouchTooltipContext = createContext<TouchTooltip>({
  point: null,
  handlers: null,
  triggerRef: null,
})

/** How long a touch-opened tooltip lingers after the finger lifts. */
const TOUCH_LINGER_MS = 600
/** Slack around a trigger before a panning finger counts as "outside". */
const TOUCH_TOLERANCE_PX = 6

interface TouchController {
  show: (point: Point) => void
  hide: () => void
  linger: () => void
}

// One finger drives at most one tooltip at a time, shared across instances:
// touch events keep firing on the element where the touch started, so the
// tooltip that started the gesture routes each move to whichever trigger is
// under the finger now.
const touchTriggers = new Map<Element, TouchController>()
let activeTouch: { trigger: Element; controller: TouchController } | null = null
let lastTouchAt = 0
/** True from touchstart on any trigger until that finger lifts. */
let touchGesture = false

function nearTrigger(trigger: Element, { x, y }: Point) {
  const t = TOUCH_TOLERANCE_PX
  // getClientRects so a link wrapped over two lines is two boxes, not one.
  return Array.from(trigger.getClientRects()).some(
    (r) =>
      x >= r.left - t && x <= r.right + t && y >= r.top - t && y <= r.bottom + t
  )
}

function triggerAt(point: Point): Element | null {
  const hit = document.elementFromPoint(point.x, point.y)
  if (activeTouch && hit && activeTouch.trigger.contains(hit)) {
    return activeTouch.trigger
  }
  const other = hit?.closest('[data-slot="tooltip-trigger"]')
  if (other && touchTriggers.has(other)) return other
  if (activeTouch && nearTrigger(activeTouch.trigger, point)) {
    return activeTouch.trigger
  }
  return null
}

function routeTouch(point: Point) {
  const trigger = triggerAt(point)
  if (trigger !== activeTouch?.trigger) {
    activeTouch?.controller.hide()
    const controller = trigger ? touchTriggers.get(trigger) : undefined
    activeTouch = trigger && controller ? { trigger, controller } : null
  }
  activeTouch?.controller.show(point)
}

/**
 * Tooltip root. Mouse and keyboard use Base UI's own hover/focus logic
 * (cursor-following via trackCursorAxis). On touch, Base UI never opens a
 * tooltip, so we take over with controlled open state: open immediately on
 * touchstart, float above the finger and follow it while it stays on the
 * trigger, hand over to another trigger the finger slides onto, hide when it
 * leaves, and close ~600ms after the finger lifts or as soon as the page
 * scrolls. Listeners are passive and never call preventDefault, so a tap
 * still activates the link.
 */
function Tooltip({
  trackCursorAxis,
  onOpenChange,
  ...props
}: TooltipPrimitive.Root.Props) {
  const [open, setOpen] = useState(false)
  const [point, setPoint] = useState<Point | null>(null)
  const trigger = useRef<Element | null>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const frame = useRef(0)

  const controller = useMemo<TouchController>(
    () => ({
      show: (next) => {
        window.clearTimeout(closeTimer.current)
        cancelAnimationFrame(frame.current)
        frame.current = requestAnimationFrame(() => setPoint(next))
        setOpen(true)
      },
      hide: () => {
        window.clearTimeout(closeTimer.current)
        cancelAnimationFrame(frame.current)
        setOpen(false)
      },
      linger: () => {
        window.clearTimeout(closeTimer.current)
        closeTimer.current = window.setTimeout(() => {
          setOpen(false)
          if (activeTouch?.controller === controller) activeTouch = null
        }, TOUCH_LINGER_MS)
      },
    }),
    []
  )

  const triggerRef = useCallback(
    (node: Element | null) => {
      if (trigger.current) touchTriggers.delete(trigger.current)
      trigger.current = node
      if (node) touchTriggers.set(node, controller)
    },
    [controller]
  )

  const handlers = useMemo<TouchHandlers>(() => {
    const at = (event: TouchEvent): Point | null => {
      const touch = event.touches[0]
      return touch ? { x: touch.clientX, y: touch.clientY } : null
    }
    const release = () => {
      touchGesture = false
      lastTouchAt = Date.now()
      activeTouch?.controller.linger()
    }
    return {
      onTouchStart: (event) => {
        const next = at(event)
        if (!next || !trigger.current) return
        lastTouchAt = Date.now()
        touchGesture = true
        if (activeTouch?.controller !== controller) {
          activeTouch?.controller.hide()
        }
        activeTouch = { trigger: trigger.current, controller }
        setPoint(next) // first frame: no rAF, open right away
        controller.show(next)
      },
      onTouchMove: (event) => {
        const next = at(event)
        if (!next || !touchGesture) return
        lastTouchAt = Date.now()
        routeTouch(next)
      },
      onTouchEnd: release,
      onTouchCancel: release,
    }
  }, [controller])

  // Any scroll dismisses a touch-opened tooltip.
  useEffect(() => {
    if (!open || !point) return
    window.addEventListener('scroll', controller.hide, {
      passive: true,
      capture: true,
    })
    return () =>
      window.removeEventListener('scroll', controller.hide, { capture: true })
  }, [open, point, controller])

  useEffect(
    () => () => {
      window.clearTimeout(closeTimer.current)
      cancelAnimationFrame(frame.current)
      if (activeTouch?.controller === controller) activeTouch = null
    },
    [controller]
  )

  const handleOpenChange = useCallback<
    NonNullable<TooltipPrimitive.Root.Props['onOpenChange']>
  >(
    (next, details) => {
      // While (or just after) a touch owns the tooltips, ignore Base UI's
      // hover/press changes, including the compatibility mouse events.
      if (touchGesture || activeTouch || Date.now() - lastTouchAt < 800) return
      setPoint(null)
      setOpen(next)
      onOpenChange?.(next, details)
    },
    [onOpenChange]
  )

  // Keep the touch anchor through the fade-out so it doesn't jump.
  const touchActive = point !== null

  return (
    <TouchTooltipContext.Provider
      value={{ point: touchActive ? point : null, handlers, triggerRef }}
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
  const { handlers, triggerRef } = useContext(TouchTooltipContext)
  return (
    <TooltipPrimitive.Trigger
      ref={triggerRef ?? undefined}
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
        // Cursor offset is in px at a 16px root and scales with the fluid
        // root size; the touch offset is physical (fingers don't scale).
        sideOffset={
          point
            ? 28
            : typeof sideOffset === 'number'
              ? () =>
                  (sideOffset *
                    parseFloat(
                      getComputedStyle(document.documentElement).fontSize
                    )) /
                  16
              : sideOffset
        }
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
