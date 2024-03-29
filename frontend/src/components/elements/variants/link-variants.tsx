import { cva } from 'class-variance-authority'

export const linkVariants = cva('font-semibold', {
  variants: {
    variant: {
      primary:
        'text-slate-700 transition duration-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100',
      emerald:
        'text-emerald-600 transition duration-500 hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100',
      secondary:
        'text-teal-700 transition duration-500 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100',
    },
    decoration: {
      primary: 'underline',
      emerald:
        'underline decoration-emerald-600/30 dark:decoration-emerald-400/50',
      no_underline: 'no-underline',
    },
    hover: {
      primary:
        'hover:underline hover:decoration-slate-800/60 dark:hover:decoration-slate-200/60',
      emerald:
        'hover:underline hover:decoration-emerald-600/30 hover:underline-offset-2 dark:hover:decoration-emerald-400/50',
      no_underline: 'hover:no-underline',
    },
  },
  defaultVariants: {
    variant: 'primary',
    decoration: 'no_underline',
    hover: 'primary',
  },
})
