import { createContext } from 'react'

import type { Point } from './types'

export const RevealContext = createContext<RevealContextValue>({
  point: null,
  setTrigger: undefined,
})

export interface RevealContextValue {
  point: Point | null
  setTrigger: ((node: Element | null) => void) | undefined
}
