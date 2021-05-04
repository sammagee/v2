const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.trueGray,
          1000: '#101010',
        },
        brand: colors.yellow,
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '3xs': ['0.5rem', { lineHeight: '1rem' }],
      },
      screens: {
        print: {'raw': 'print'},
      },
    },
  },
  groupVariants: {
    'group-active': ['group', 'active', ':active'],
  },
  variants: {
    extend: {
      animation: ['group-active'],
      opacity: ['group-hover', 'group-focus'],
      scale: ['active'],
      translate: ['focus-within', 'group-hover', 'group-focus'],
      visibility: ['group-hover', 'group-focus'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-font-inter')(),
    require('tailwindcss-group-variants'),
  ],
}
