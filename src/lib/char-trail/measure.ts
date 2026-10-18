import { SKIPPED_TEXT_SELECTOR, TRAIL_SELECTOR } from './constants'
import type { TrailHighlights } from './highlights'
import type { Char } from './types'

const isOwnText = (parent: Element | null, root: Element) =>
  parent !== null &&
  !parent.closest(SKIPPED_TEXT_SELECTOR) &&
  parent.closest(TRAIL_SELECTOR) === root

function* textNodes(root: Element) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      isOwnText(node.parentElement, root)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT,
  })
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    yield node as Text
  }
}

function charAt(node: Text, index: number, base: number): Char | null {
  if (/\s/.test(node.data[index])) return null
  const range = document.createRange()
  range.setStart(node, index)
  range.setEnd(node, index + 1)
  const rect = range.getBoundingClientRect()
  if (!rect.width) return null
  return {
    range,
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 2 + window.scrollY,
    base,
    touched: -Infinity,
    color: 0,
    highlight: null,
  }
}

function charsOf(node: Text, highlights: TrailHighlights) {
  const base = highlights.baseIndex(
    getComputedStyle(node.parentElement as Element).color
  )
  return Array.from({ length: node.data.length }, (_, index) =>
    charAt(node, index, base)
  ).filter((char) => char !== null)
}

export function measureChars(highlights: TrailHighlights): Char[] {
  return Array.from(document.querySelectorAll(TRAIL_SELECTOR)).flatMap((root) =>
    Array.from(textNodes(root)).flatMap((node) => charsOf(node, highlights))
  )
}

export const rootFontSize = () =>
  parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
