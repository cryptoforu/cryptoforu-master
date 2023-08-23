'use client'
import { motion } from 'framer-motion'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

import type {
  CardBodyVariants,
  CardFooterVariants,
  CardHeaderVariants,
  CardImageVariants,
  CardVariants,
} from '@/components/content/variants/card-variants'
import {
  card,
  cardAnimations,
  cardBody,
  cardFooter,
  cardHeader,
  cardImage,
} from '@/components/content/variants/card-variants'
import { InternalLink, LazyImage } from '@/components/elements'
import { Heading } from '@/components/typography'
import { IHeadingProps } from '@/components/typography/Heading'
import { cn } from '@/lib/utils'

export interface ICard<As extends React.ElementType>
  extends CardVariants,
    HTMLAttributes<HTMLElement> {
  as?: As
  animation?: keyof typeof cardAnimations
}

function Card<As extends React.ElementType>(
  props: PropsWithChildren<
    ICard<As> & Omit<React.ComponentPropsWithoutRef<As>, keyof ICard<As>>
  >
) {
  const {
    children,
    className,
    size,
    variant,
    as: Component = motion.div,
    animation = 'primary',
    ...rest
  } = props
  return (
    <Component
      initial={cardAnimations[animation].initial}
      whileHover={cardAnimations[animation].hover}
      transition={{ type: 'spring', duration: 1 }}
      className={cn(card({ size, variant, className }))}
      {...rest}
    >
      {children}
    </Component>
  )
}

export interface ICardOverlayLink<As extends React.ElementType>
  extends HTMLAttributes<HTMLElement> {
  level?: IHeadingProps['as']
  variant?: IHeadingProps['variant']
  size?: IHeadingProps['size']
  as?: As
}

export function CardOverlayLink<As extends React.ElementType>(
  props: PropsWithChildren<ICardOverlayLink<As>> &
    Omit<React.ComponentPropsWithoutRef<As>, keyof ICardOverlayLink<As>>
) {
  const {
    className,
    children,
    level = 'h2',
    as: Component = InternalLink,
    href,
    variant,
    size,
  } = props
  return (
    <Heading as={level} variant={variant} size={size} className={className}>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
      <Component href={href}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Component>
    </Heading>
  )
}

export interface ICardHeader<As extends React.ElementType>
  extends CardHeaderVariants,
    HTMLAttributes<HTMLElement> {
  as?: As
}

export function CardHeader<As extends React.ElementType>(
  props: PropsWithChildren<
    ICardHeader<As> &
      Omit<React.ComponentPropsWithoutRef<As>, keyof ICardHeader<As>>
  >
) {
  const {
    children,
    className,
    size,
    variant,
    as: Component = 'div',
    ...rest
  } = props
  return (
    <Component
      className={cn(cardHeader({ size, variant, className }))}
      {...rest}
    >
      {children}
    </Component>
  )
}

export interface ICardBody<As extends React.ElementType>
  extends CardBodyVariants,
    HTMLAttributes<HTMLElement> {
  as?: As
}

export function CardBody<As extends React.ElementType>(
  props: PropsWithChildren<
    ICardBody<As> &
      Omit<React.ComponentPropsWithoutRef<As>, keyof ICardBody<As>>
  >
) {
  const {
    children,
    className,
    size,
    variant,
    as: Component = 'div',
    ...rest
  } = props
  return (
    <Component className={cn(cardBody({ size, variant, className }))} {...rest}>
      {children}
    </Component>
  )
}

export interface ICardImage
  extends CardImageVariants,
    HTMLAttributes<HTMLDivElement> {
  image: string
  alt: string
  width: number
  height: number
  imageClass: string
}

export function CardImage(props: ICardImage) {
  const {
    imageClass,
    className,
    size,
    variant,
    alt,
    image,
    height,
    width,
    ...rest
  } = props
  return (
    <div className={cn(cardImage({ variant, size, className }))} {...rest}>
      <LazyImage
        src={image}
        alt={alt}
        width={width}
        height={height}
        className={imageClass}
      />
    </div>
  )
}

export interface ICardFooter
  extends CardFooterVariants,
    HTMLAttributes<HTMLDivElement> {}

export function CardFooter(props: PropsWithChildren<ICardFooter>) {
  const { children, className, variant, border, size, ...rest } = props
  return (
    <div
      className={cn(cardFooter({ variant, border, size, className }))}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Card
