import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { useLiquidGlass } from './hooks/use-liquid-glass'
import { LiquidGlassFilter } from './liquid-glass-filter'

export function GlassPopup({
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
        'liquid-glass z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap text-gray-1200 transition-[opacity,scale] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-90 data-starting-style:opacity-0 motion-reduce:transition-none motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100',
        className
      )}
      style={{ ...glass?.style, ...(style as object) }}
      {...props}
    >
      {glass && <LiquidGlassFilter id={glass.id} size={glass.size} />}
      {children}
    </TooltipPrimitive.Popup>
  )
}
