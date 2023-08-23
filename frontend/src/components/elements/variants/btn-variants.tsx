import { cva, VariantProps } from 'class-variance-authority'

export const btnVariants = cva(
  'inline-flex rounded-lg outline outline-offset-2 outline-transparent',
  {
    variants: {
      solid: {
        primary:
          'bg-primary-gradient text-primary-dark focus:ring-emerald-300/50 active:bg-emerald-500',
        secondary: 'bg-slate-900/90 text-slate-300',
        transparent: 'text-slate-900 dark:text-white',
        danger: 'bg-danger text-primary-dark',
        fb: 'bg-fb-blue text-white hover:bg-fb-blue/90 focus:outline-none focus:ring-4 focus:ring-fb-blue/50 dark:focus:ring-fb-blue/50',
        tw: 'bg-tw-blue text-white hover:bg-tw-blue/90 focus:outline-none focus:ring-4 focus:ring-tw-blue/50 dark:focus:ring-tw-blue',
        reddit:
          'bg-reddit-orange text-white hover:bg-reddit-orange/90 focus:outline-none focus:ring-4 focus:ring-reddit-orange/50 dark:focus:ring-reddit-orange',
      },
      outline: {
        primary:
          'border border-emerald-400 text-primary-dark hover:text-white focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:border-emerald-600 dark:text-slate-400 dark:hover:text-primary-white dark:focus:ring-emerald-800',
        secondary:
          'border border-slate-800 text-slate-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-slate-300 dark:border-slate-600 dark:text-slate-400 dark:hover:text-primary-white dark:focus:ring-slate-800',
        transparent: 'text-primary-dark dark:text-white',
      },
      size: {
        xl: 'px-5 py-3 text-base font-medium',
        lg: 'p-3 text-sm font-semibold',
        md: 'p-2.5 text-sm font-semibold',
        sm: 'px-3 py-1.5 text-sm font-semibold',
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
    outlineColor: 'rgba(0,0,0,0)',
    backgroundColor: 'rgba(0,0,0,0)',
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
