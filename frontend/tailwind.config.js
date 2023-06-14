/** @type {import("tailwindcss").Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      'primary-dark': '#00040f',
      'primary-white': '#f0fdfa',
      white: colors.white,
      black: colors.black,
      danger: '#e11d48',
      success: '#22c55e',
      warning: '#d97706',
      transparent: 'transparent',
      current: 'currentColor',
      slate: colors.slate,
      emerald: colors.emerald,
      teal: colors.teal,
      green: colors.green,
      cyan: colors.cyan,
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'primary-gradient':
          'linear-gradient(to right, rgb(153, 246, 228), rgb(217, 249, 157))',
        'secondary-gradient':
          'linear-gradient(0deg, rgba(2,44,34,1) 0%, rgba(15,23,42,1) 100%)',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      opacity: {
        1: '0.01',
        2.5: '0.025',
        7.5: '0.075',
        15: '0.15',
      },
      boxShadow: {
        glow: '0 0 4px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
