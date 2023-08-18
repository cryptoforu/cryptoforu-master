import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const badge = cva('rounded-full', {
  variants: {
    variant: {
      primary:
        'text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20 dark:text-slate-300 dark:ring-slate-900/95 dark:hover:ring-slate-900/80',
      secondary:
        'text-slate-600 ring-1 ring-emerald-900/10 hover:ring-emerald-900/20 dark:text-slate-300 dark:ring-emerald-900/95 dark:hover:ring-emerald-900/80',
    },
    size: {
      xs: 'px-2.5 py-1 text-sm',
      md: 'px-3 py-1 text-sm leading-6',
      lg: 'px-4 py-2 text-lg leading-6',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export interface IBadgeProps
  extends VariantProps<typeof badge>,
    HTMLAttributes<HTMLDivElement> {}

const Badge = forwardRef<HTMLDivElement, IBadgeProps>(
  ({ className, variant, size, ...rest }, ref) => {
    return (
      <div
        className={cn(badge({ variant, size, className }))}
        ref={ref}
        {...rest}
      />
    )
  }
)
Badge.displayName = 'Badge'
export default Badge
