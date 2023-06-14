'use client'

import NextLink from 'next/link'
import { Link as AriaLink } from 'react-aria-components'
import { cn } from '@/lib/utils'
import { btnVariants } from '@/components/elements/Button'
import { VariantProps } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

interface LinkProps
  extends VariantProps<typeof btnVariants>,
    HTMLAttributes<HTMLElement> {
  isInternal: boolean
  href: string
  label: string
}

const Link = ({
  isInternal,
  className,
  solid,
  size,
  href,
  label,
}: LinkProps) => {
  if (isInternal) {
    return (
      <AriaLink className={cn(btnVariants({ solid, size, className }))}>
        <NextLink href={href}>{label}</NextLink>
      </AriaLink>
    )
  } else {
    return (
      <AriaLink className={cn(btnVariants({ solid, size, className }))}>
        <a href={href} target={'_blank'} rel={'noreferrer'}>
          {label}
        </a>
      </AriaLink>
    )
  }
}
export default Link
