import React, { forwardRef } from 'react'
import { clsx } from 'clsx'

const sectionVariants = {
  primary: 'relative py-20 sm:py-24',
  secondary: 'relative md:py-24 py-16',
  small: 'relative py-4 sm:py-8',
}

export interface ISectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string
  ariaLabel: string
  variant?: keyof typeof sectionVariants
}

const Section = forwardRef<HTMLElement, ISectionProps>(
  ({ id, ariaLabel, className, variant = 'primary', ...props }, ref) => {
    className = clsx(sectionVariants[variant], className)
    return (
      <section
        id={id}
        aria-label={ariaLabel}
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
Section.displayName = 'Section'
export default Section
