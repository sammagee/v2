import { useEffect, useRef } from 'react'

import {
  isBackgroundTap,
  pressStart,
  type PressStart,
} from '../lib/background-tap'

export function useBackgroundToggle(toggle: () => void) {
  const surface = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = surface.current
    if (!element) return
    let start: PressStart | null = null
    const onPointerDown = (event: PointerEvent) => {
      start = pressStart(event)
    }
    const onClick = (event: MouseEvent) => {
      if (isBackgroundTap(event, start)) toggle()
      start = null
    }
    element.addEventListener('pointerdown', onPointerDown)
    element.addEventListener('click', onClick)
    return () => {
      element.removeEventListener('pointerdown', onPointerDown)
      element.removeEventListener('click', onClick)
    }
  }, [toggle])
  return surface
}
