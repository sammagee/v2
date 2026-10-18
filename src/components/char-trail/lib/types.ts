export interface Point {
  x: number
  y: number
}

export interface Pointer extends Point {
  radius: number
}

export interface Char extends Point {
  range: Range
  base: number
  touched: number
  color: number
  highlight: string | null
}
