import type { Size } from './types'

export function displacementMap({ width, height }: Size) {
  const radius = height / 2
  const inset = Math.min(6, height / 4)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="r" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#200000"/><stop offset="1" stop-color="#df0000"/></linearGradient><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#002000"/><stop offset="1" stop-color="#00df00"/></linearGradient><filter id="b"><feGaussianBlur stdDeviation="${inset / 1.5}"/></filter></defs><rect width="${width}" height="${height}" fill="#808000"/><rect width="${width}" height="${height}" rx="${radius}" fill="url(#r)"/><rect width="${width}" height="${height}" rx="${radius}" fill="url(#g)" style="mix-blend-mode:screen"/><rect x="${inset}" y="${inset}" width="${width - inset * 2}" height="${height - inset * 2}" rx="${Math.max(radius - inset, 0)}" fill="#808000" filter="url(#b)"/></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
