'use client'
import { VariantProps } from 'class-variance-authority'
import type { Route } from 'next'
import NextLink from 'next/link'
import { HTMLAttributes, ReactNode, useRef } from 'react'
import { AriaLinkOptions, useLink } from 'react-aria'
import { Link as AriaLink } from 'react-aria-components'

import { linkVariants } from '@/components/elements/variants/link-variants'
import { cn } from '@/lib/utils'

export interface InternalLinkProps
  extends VariantProps<typeof linkVariants>,
    HTMLAttributes<HTMLAnchorElement> {
  href: Route<string> | URL
}

export interface ExternalLinkProps
  extends VariantProps<typeof linkVariants>,
    AriaLinkOptions {
  href: string
  children?: ReactNode
  classes?: string
}

export function ExternalLink({
  href,
  variant,
  decoration,
  hover,
  children,
  classes,
  ...rest
}: ExternalLinkProps) {
  const ref = useRef(null)
  const { linkProps } = useLink({ ...rest }, ref)
  linkProps.className = cn(
    linkVariants({ variant, decoration, hover, className: classes })
  )
  return (
    <a {...linkProps} href={href} target={'_blank'} rel={'noreferrer'}>
      {children}
    </a>
  )
}

export default function InternalLink({
  className,
  href,
  variant,
  decoration,
  hover,
  children,
  ...rest
}: InternalLinkProps) {
  className = cn(linkVariants({ variant, decoration, hover, className }))
  return (
    <NextLink href={href} className={className} {...rest}>
      {children}
    </NextLink>
  )
}

export function AnchorLink(props: InternalLinkProps) {
  return (
    <AriaLink>
      <a
        href={props.href as string}
        className={
          'absolute -ml-10 flex items-center border-0 opacity-0 group-hover:opacity-100'
        }
      >
        <div
          className={
            'flex h-6 w-6 items-center justify-center rounded-md p-1 text-slate-400 shadow-sm ring-1 ring-slate-900/5 hover:text-slate-700 hover:shadow hover:ring-slate-900/10 dark:bg-slate-700 dark:text-slate-300 dark:shadow-none dark:ring-0'
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
            />
          </svg>
          {props.children}
        </div>
      </a>
    </AriaLink>
  )
}
