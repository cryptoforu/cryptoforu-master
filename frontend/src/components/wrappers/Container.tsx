import { clsx } from 'clsx'
import React, { forwardRef } from 'react'

const containerVariants = {
  primary:
    'container mx-auto max-w-5xl px-4 lg:max-w-8xl lg:px-12 xl:gap-x-16 xl:px-16',
  secondary: 'container mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8',
  small: 'container mx-auto max-w-2xl px-2 sm:px-4 lg:max-w-5xl lg:px-6',
  container: 'container mx-auto sm:px-6 lg:px-16 xl:px-24',
  base: 'mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8',
  flex: 'mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12',
}

export interface IContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof containerVariants
}

const Container = forwardRef<HTMLDivElement, IContainerProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    className = clsx(containerVariants[variant], className)
    return <div className={className} ref={ref} {...props} />
  }
)
Container.displayName = 'Container'
export default Container
