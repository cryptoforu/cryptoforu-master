module.exports = {
  singleQuote: true,
  semi: false,
  printWidth: 80,
  tabWidth: 2,
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindFunctions: ['clsx', 'cn'],
}
