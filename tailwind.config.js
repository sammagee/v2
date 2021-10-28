const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'media',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.neutral,
          1000: '#101010',
        },
        brand: colors.amber,
      },
      backgroundImage: (theme) => ({
        dots: `radial-gradient(rgba(0, 0, 0, 0) 1px, ${theme(
          'colors.gray.900'
        )} 1px)`,
        'dark-dots': `radial-gradient(rgba(0, 0, 0, 0) 1px, ${theme(
          'colors.gray.1000'
        )} 1px)`,
        'brand-dots': `radial-gradient(${theme(
          'colors.brand.500'
        )} 1px, rgba(0, 0, 0, 0) 1px)`,
      }),
      backgroundSize: {
        dots: '4px 4px',
        'dark-dots': '4px 4px',
        'brand-dots': '4px 4px',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '3xs': ['0.5rem', { lineHeight: '1rem' }],
      },
      screens: {
        xs: '400px',
        vsm: { raw: '(min-height: 640px)' },
        print: { raw: 'print' },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              color: theme('colors.gray.400'),
              '[class~="lead"]': {
                color: theme('colors.gray.500'),
              },
              a: {
                border: theme('borderWidth.2'),
                borderColor: theme('borderColor.transparent'),
                borderStyle: 'dashed',
                color: theme('colors.brand.400'),
              },
              'a:focus': {
                outline: 'none',
                borderColor: theme('borderColor.brand.400'),
              },
              strong: {
                color: theme('colors.gray.300'),
              },
              'ol > li::before': {
                color: theme('colors.gray.500'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.500'),
              },
              hr: {
                borderColor: theme('colors.gray.800'),
              },
              blockquote: {
                color: theme('colors.gray.400'),
                borderLeftColor: theme('colors.gray.500'),
              },
              h1: {
                color: theme('colors.white'),
              },
              h2: {
                color: theme('colors.gray.100'),
              },
              h3: {
                color: theme('colors.gray.200'),
              },
              h4: {
                color: theme('colors.gray.300'),
              },
              'figure figcaption': {
                color: theme('colors.gray.500'),
              },
              code: {
                color: theme('colors.gray.100'),
              },
              'a code': {
                color: theme('colors.gray.100'),
              },
              pre: {
                backgroundColor: theme('colors.gray.800'),
                borderRadius: theme('borderRadius.lg'),
                boxShadow: theme('boxShadow.lg'),
                color: theme('colors.gray.100'),
              },
              'pre code': {
                backgroundColor: 'transparent',
                color: 'inherit',
              },
              thead: {
                color: theme('colors.gray.900'),
                borderBottomColor: theme('colors.gray.300'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.200'),
              },
            },
          ],
        },
      }),
    },
  },
  groupVariants: {
    'group-active': ['group', 'active', ':active'],
  },
  variants: {
    extend: {
      animation: ['group-active'],
      filter: ['group-hover'],
      opacity: ['focus-within', 'group-hover', 'group-focus'],
      scale: ['active'],
      translate: ['focus-within', 'group-hover', 'group-focus'],
      visibility: ['focus-within', 'group-hover', 'group-focus'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('tailwindcss-font-inter')(),
    require('tailwindcss-group-variants'),
  ],
}
