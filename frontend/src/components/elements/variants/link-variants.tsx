import { cva } from 'class-variance-authority'

export const linkVariants = cva('font-semibold', {
  variants: {
    variant: {
      primary:
        'text-slate-700 transition duration-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100',
      emerald:
        'dark:hover-text-emerald-100 text-emerald-600 transition duration-500 hover:text-emerald-900 dark:text-emerald-300',
      secondary:
        'text-teal-700 transition duration-500 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100',
    },
    decoration: {
      primary: 'decoration-inherit underline',
      emerald:
        'underline decoration-emerald-600/30 dark:decoration-emerald-400/50',
      no_underline: 'no_underline',
    },
    hover: {
      primary: 'hover:decoration-inherit hover:underline',
      emerald:
        'hover:underline hover:decoration-emerald-600/30 hover:underline-offset-2 dark:hover:decoration-emerald-400/50',
      no_underline: 'hover:no_underline',
    },
  },
  defaultVariants: {
    variant: 'primary',
    decoration: 'no_underline',
    hover: 'primary',
  },
})
