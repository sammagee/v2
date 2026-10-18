import { createContext } from 'react'

import type { Point } from './types'

export const RevealContext = createContext<RevealContextValue>({
  point: null,
  cursor: false,
  setTrigger: undefined,
})

export interface RevealContextValue {
  point: Point | null
  cursor: boolean
  setTrigger: ((node: Element | null) => void) | undefined
}
