import { FADE_STEPS } from './constants'
import type { Char } from './types'

type HighlightRegistry = Map<string, unknown> & {
  set(name: string, highlight: unknown): void
}
type HighlightConstructor = new () => Set<Range>

export interface HighlightApi {
  registry: HighlightRegistry
  Highlight: HighlightConstructor
}

export function getHighlightApi(): HighlightApi | null {
  const { highlights } = window.CSS as typeof CSS & {
    highlights?: HighlightRegistry
  }
  const { Highlight } = window as unknown as {
    Highlight?: HighlightConstructor
  }
  return highlights && Highlight ? { registry: highlights, Highlight } : null
}

const highlightName = (base: number, color: number, step: number) =>
  `trail-${base}-${color}-${step}`

const paletteShare = (step: number) =>
  Math.round(100 * Math.pow(1 - step / FADE_STEPS, 1.6))

export class TrailHighlights {
  private readonly baseColors: string[] = []
  private readonly ranges = new Map<string, Set<Range>>()
  private readonly style = document.head.appendChild(
    document.createElement('style')
  )

  constructor(
    private readonly api: HighlightApi,
    private readonly palette: readonly string[]
  ) {}

  baseIndex(color: string) {
    const index = this.baseColors.indexOf(color)
    return index === -1 ? this.baseColors.push(color) - 1 : index
  }

  show(char: Char, step: number) {
    const name = highlightName(char.base, char.color, step)
    if (name === char.highlight) return
    this.clear(char)
    this.rangesFor(name, char, step).add(char.range)
    char.highlight = name
  }

  clear(char: Char) {
    if (char.highlight) this.ranges.get(char.highlight)?.delete(char.range)
    char.highlight = null
  }

  dispose() {
    this.ranges.forEach((_, name) => this.api.registry.delete(name))
    this.style.remove()
  }

  private rangesFor(name: string, char: Char, step: number) {
    return this.ranges.get(name) ?? this.create(name, char, step)
  }

  private create(name: string, char: Char, step: number) {
    const ranges = new this.api.Highlight()
    this.ranges.set(name, ranges)
    this.api.registry.set(name, ranges)
    this.style.sheet?.insertRule(
      `::highlight(${name}) { color: color-mix(in oklab, ${this.palette[char.color]} ${paletteShare(step)}%, ${this.baseColors[char.base]}); }`
    )
    return ranges
  }
}
