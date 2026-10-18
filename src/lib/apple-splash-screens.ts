const DEVICES = [
  [1024, 1366, 2],
  [834, 1194, 2],
  [768, 1024, 2],
  [834, 1112, 2],
  [810, 1080, 2],
  [428, 926, 3],
  [390, 844, 3],
  [375, 812, 3],
  [414, 896, 3],
  [414, 896, 2],
  [414, 736, 3],
  [375, 667, 2],
  [320, 568, 2],
] as const

const ORIENTATIONS = ['portrait', 'landscape'] as const

const imageSize = (
  width: number,
  height: number,
  ratio: number,
  orientation: (typeof ORIENTATIONS)[number]
) => {
  const size = [width * ratio, height * ratio]
  return (orientation === 'portrait' ? size : size.reverse()).join('-')
}

export const APPLE_SPLASH_SCREENS = DEVICES.flatMap(([width, height, ratio]) =>
  ORIENTATIONS.map((orientation) => ({
    href: `/pwa/images/apple-splash-${imageSize(width, height, ratio, orientation)}.jpg`,
    media: `(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${ratio}) and (orientation: ${orientation})`,
  }))
)
