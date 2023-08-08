import { cva } from 'class-variance-authority'

export const linkVariants = cva('font-semibold', {
  variants: {
    variant: {
      primary:
        'text-slate-700 dark:text-slate-300 transition duration-500 hover:text-slate-900 dark:hover:text-slate-100',
      emerald:
        'text-emerald-600 dark:text-emerald-300 transition duration-500 hover:text-emerald-900 dark:hover-text-emerald-100',
      secondary:
        'text-teal-700 dark:text-teal-300 transition duration-500 hover:text-teal-900 dark:hover:text-teal-100',
    },
    decoration: {
      primary: 'underline decoration-inherit',
      emerald:
        'underline decoration-emerald-600/30 dark:decoration-emerald-400/50',
      no_underline: 'no_underline',
    },
    hover: {
      primary: 'hover:underline hover:decoration-inherit',
      emerald:
        'hover:underline hover:underline-offset-2 hover:decoration-emerald-600/30 dark:hover:decoration-emerald-400/50',
      no_underline: 'hover:no_underline',
    },
  },
  defaultVariants: {
    variant: 'primary',
    decoration: 'no_underline',
    hover: 'primary',
  },
})
