const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.trueGray,
          1000: '#101010',
        },
        brand: colors.cyan,
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '3xs': ['0.5rem', { lineHeight: '1rem' }],
      },
      screens: {
        print: {'raw': 'print'},
      },
      typography: theme => ({
        DEFAULT: {
          css: [
            {
              color: theme('colors.gray.400'),
              '[class~="lead"]': {
                color: theme('colors.gray.500'),
              },
              a: {
                color: theme('colors.brand.500'),
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
      opacity: ['group-hover', 'group-focus'],
      scale: ['active'],
      translate: ['focus-within', 'group-hover', 'group-focus'],
      visibility: ['group-hover', 'group-focus'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('tailwindcss-font-inter')(),
    require('tailwindcss-group-variants'),
  ],
}
