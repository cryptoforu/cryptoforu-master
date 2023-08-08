import { cva, VariantProps } from 'class-variance-authority'

export const btnVariants = cva(
  'inline-flex rounded-lg outline outline-transparent outline-offset-2',
  {
    variants: {
      solid: {
        primary:
          'text-primary-dark bg-primary-gradient active:bg-emerald-500 focus:ring-emerald-300/50',
        secondary: 'text-slate-300 bg-slate-900/90',
        transparent: 'text-slate-900 dark:text-white',
        danger: 'text-primary-dark bg-danger',
        fb: 'bg-fb-blue text-white hover:bg-fb-blue/90 focus:outline-none focus:ring-4 focus:ring-fb-blue/50 dark:focus:ring-fb-blue/50',
        tw: 'text-white bg-tw-blue hover:bg-tw-blue/90 focus:ring-4 focus:outline-none focus:ring-tw-blue/50 dark:focus:ring-tw-blue/55',
        reddit:
          'text-white bg-reddit-orange hover:bg-reddit-orange/90 focus:ring-4 focus:outline-none focus:ring-reddit-orange/50 dark:focus:ring-reddit-orange/55',
      },
      outline: {
        primary:
          'text-primary-dark hover:text-white border border-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:border-emerald-600 dark:text-slate-400 dark:hover:text-primary-white dark:focus:ring-emerald-800',
        secondary:
          'text-slate-900 hover:text-white border border-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:border-slate-600 dark:text-slate-400 dark:hover:text-primary-white dark:focus:ring-slate-800',
        transparent: 'text-primary dark:text-white',
      },
      size: {
        xl: 'px-5 py-3 text-base font-medium',
        lg: 'px-3 py-3 text-sm font-semibold',
        md: 'p-2.5 font-semibold text-sm',
        sm: 'py-1.5 px-3 text-sm font-semibold',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)
type ColorScheme =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'transparent'
  | 'fb'
  | 'tw'
  | 'reddit'

export type BtnVariantsProps = {
  colorScheme?: ColorScheme
  variant?: keyof VariantProps<typeof btnVariants>
  hoverAnimation?: 'outlineColor' | 'backgroundColor' | 'none'
} & VariantProps<typeof btnVariants>

export const btnAnimation = {
  primary: {
    outlineColor: '#34d399',
    backgroundColor: 'rgb(15 23 42 / 0.5)',
  },
  secondary: {
    outlineColor: '#1e293b',
    backgroundColor: 'rgb(15 23 42 / 0.5)',
  },
  danger: {
    outlineColor: '#e11d48',
    backgroundColor: 'rgba(225, 29, 72, 0.5)',
  },
  transparent: {
    outlineColor: 'transparent',
    backgroundColor: 'transparent',
  },
  fb: {
    outlineColor: '#3b5998',
    backgroundColor: 'rgba(59, 89, 152, 0.5)',
  },
  tw: {
    outlineColor: '#1DA1F2',
    backgroundColor: 'rgba(29, 161, 242, 0.5)',
  },
  reddit: {
    outlineColor: '#FF5700',
    backgroundColor: 'rgba(255, 87, 0, 0.5)',
  },
}
