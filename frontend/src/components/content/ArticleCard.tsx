'use client'
import { clsx } from 'clsx'
import { Heading, ProseMarkdown } from '@/components/typography'
import type { IHeadingProps } from '@/components/typography/Heading'
import type { PropsWithChildren, ReactNode } from 'react'

import { Button } from 'react-aria-components'
import type { AriaButtonProps } from 'react-aria'
import { LazyImage } from '@/components/elements'

function ChevronRightIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type ArticleComponent = 'div' | 'article' | 'section'

interface ArticleCardProps {
  className?: string
  children: ReactNode
  as?: ArticleComponent
}

export function ArticleCard({
  as: Component = 'div',
  className,
  children,
}: ArticleCardProps) {
  return (
    <Component
      className={clsx(className, 'group relative flex flex-col items-start')}
    >
      {children}
    </Component>
  )
}

export function ArticleLink({
  children,
  ...props
}: PropsWithChildren<AriaButtonProps>) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-slate-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-slate-800/50 sm:-inset-x-6 sm:rounded-2xl" />

      <Button {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Button>
    </>
  )
}

interface ArticleTitleProps extends IHeadingProps {
  onClick?: () => void
  children: ReactNode
}

export function ArticleTitle({
  as: Component = 'h2',
  onClick,
  children,
}: ArticleTitleProps) {
  return (
    <Heading as={Component} size={'sm'} variant={'slate'}>
      {onClick ? (
        <ArticleLink onFocus={onClick}>{children}</ArticleLink>
      ) : (
        children
      )}
    </Heading>
  )
}

export function ArticleDescription({ children }: { children: string }) {
  return <ProseMarkdown className={'line-clamp-4'}>{children}</ProseMarkdown>
}

export function ArticleCta({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  )
}

type IconProps = {
  src: string
  alt: string
  imageKit?: boolean
}

export function ArticleIcon({ src, alt, imageKit }: IconProps) {
  return (
    <div className={'absolute left-0 top-0 flex h-6 w-6 items-center pl-3.5'}>
      <LazyImage
        src={src}
        alt={alt}
        width={16}
        height={16}
        className={'h-auto max-w-full'}
        filter={'icon'}
        imageKit={imageKit}
      />
    </div>
  )
}

type EyeComponent = 'p' | 'span' | 'div' | 'time'

interface EyeProps extends Partial<IconProps> {
  className?: string
  children: ReactNode
  decorate?: boolean
  as?: EyeComponent
  icon?: boolean
}

export function ArticleEye({
  as: Component = 'p',
  decorate = true,
  icon = false,
  src,
  alt,
  imageKit,
  className,
  children,
}: EyeProps) {
  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-slate-400 dark:text-slate-500',
        decorate && 'pl-3.5'
      )}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-slate-200 dark:bg-slate-500" />
        </span>
      )}
      {!decorate && icon && (
        <ArticleIcon
          src={src as string}
          alt={alt as string}
          imageKit={imageKit}
        />
      )}
      {children}
    </Component>
  )
}
