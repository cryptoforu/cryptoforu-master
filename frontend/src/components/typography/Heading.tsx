import { cva, VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'

import { cn } from '@/lib/utils'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'

const heading = cva('font-bold tracking-tight', {
  variants: {
    variant: {
      primary: 'text-primary-dark dark:text-primary-white',
      slate: 'text-slate-800 dark:text-slate-200',
      gradient: 'bg-primary-gradient bg-clip-text text-transparent',
      gradientFrom:
        'bg-gradient-to-r from-slate-100 to-emerald-400 bg-clip-text text-transparent',
      secondary: 'text-slate-600 dark:text-slate-400',
      emerald: 'text-emerald-600 dark:text-emerald-400',
    },
    size: {
      sm: `text-lg`,
      md: `text-xl sm:text-2xl`,
      lg: `text-2xl sm:text-4xl`,
      xl: `text-4xl sm:text-6xl`,
      xxl: `text-5xl sm:text-8xl`,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export interface IHeadingProps
  extends VariantProps<typeof heading>,
    React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel
}

const Heading = forwardRef<HTMLHeadingElement, IHeadingProps>(
  ({ className, as: Component = 'h1', variant, size, ...props }, ref) => {
    return (
      <Component
        className={cn(heading({ size, variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Heading.displayName = 'Heading'
export default Heading
