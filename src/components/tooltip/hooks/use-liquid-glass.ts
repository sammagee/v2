import { useEffect, useId, useState, useSyncExternalStore } from 'react'

import type { Size } from '../lib/types'

export function useLiquidGlass(el: HTMLElement | null) {
  const id = `liquid-glass-${useId().replace(/:/g, '')}`
  const supported = useSvgBackdropSupport()
  const size = useSize(el)
  if (!supported || !hasArea(size)) return null
  const backdrop = `url(#${id}) blur(0.4px) saturate(1.8)`
  return {
    id,
    size,
    style: {
      backdropFilter: backdrop,
      WebkitBackdropFilter: backdrop,
      backgroundColor: 'var(--glass-tint)',
    },
  }
}

function useSvgBackdropSupport() {
  return useSyncExternalStore(subscribeToNothing, isChromium, () => false)
}

function useSize(el: HTMLElement | null) {
  const [size, setSize] = useState<Size | null>(null)
  useEffect(() => {
    if (!el) return
    const observer = new ResizeObserver(() =>
      setSize({ width: el.offsetWidth, height: el.offsetHeight })
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [el])
  return el ? size : null
}

function subscribeToNothing() {
  return () => {}
}

function isChromium() {
  const { userAgentData } = navigator as Navigator & {
    userAgentData?: { brands: { brand: string }[] }
  }
  return (userAgentData?.brands ?? []).some(({ brand }) => brand === 'Chromium')
}

function hasArea(size: Size | null): size is Size {
  return Boolean(size?.width && size.height)
}
