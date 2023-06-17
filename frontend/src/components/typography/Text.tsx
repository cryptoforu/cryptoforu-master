import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import React, { forwardRef } from 'react'

type TextLevel = 'p' | 'span' | 'div'

const text = cva('font-medium', {
  variants: {
    variant: {
      primary: 'tracking-tight text-slate-700 dark:text-slate-300',
      gradient:
        'tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 via-teal-400 to-emerald-200',
      emerald: 'tracking-tight text-emerald-600 dark:text-emerald-400',
      number: 'lining-nums text-slate-700 dark:text-slate-300',
      danger: 'text-danger',
      success: 'text-success',
    },
    size: {
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-2xl sm:text-4xl',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
  },
})

export interface ITextProps
  extends VariantProps<typeof text>,
    React.HTMLAttributes<HTMLParagraphElement | HTMLDivElement> {
  as?: TextLevel
}

const Text = forwardRef<HTMLParagraphElement | HTMLDivElement, ITextProps>(
  ({ className, as: Component = 'p', variant, size, ...rest }, ref) => {
    return (
      <Component
        className={cn(text({ variant, size, className }))}
        ref={ref}
        {...rest}
      />
    )
  }
)
Text.displayName = 'Text'

export default Text
