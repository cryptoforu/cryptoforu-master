'use client'
import React, { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import { Button as AriaButton } from 'react-aria-components'
import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion'
import type { BtnVariantsProps } from '@/components/elements/variants/btn-variants'
import {
  btnAnimation,
  btnVariants,
} from '@/components/elements/variants/btn-variants'

export interface IButtonProps<As extends React.ElementType>
  extends BtnVariantsProps,
    HTMLMotionProps<'button'> {
  as?: As
}

const MotionButton = motion(AriaButton)
export default function Button<
  As extends
    | React.ElementType
    | typeof motion.button
    | ForwardRefComponent<HTMLElement, HTMLElement>
>(
  props: PropsWithChildren<
    IButtonProps<As> &
      Omit<React.ComponentPropsWithoutRef<As>, keyof IButtonProps<As>>
  >
) {
  const {
    children,
    colorScheme = 'primary',
    variant = 'solid',
    className,
    size,
    hoverAnimation = 'outlineColor',
    as,
    ...rest
  } = props
  const Component = as ?? MotionButton

  let hover =
    hoverAnimation && hoverAnimation === 'outlineColor'
      ? {
          outline: `2.5px solid ${
            btnAnimation[colorScheme as keyof typeof btnAnimation].outlineColor
          }`,
        }
      : {
          backgroundColor:
            btnAnimation[colorScheme as keyof typeof btnAnimation]
              .backgroundColor,
        }
  return (
    <Component
      whileHover={hover}
      whileTap={{ scale: 1.1 }}
      className={cn(btnVariants({ [variant]: [colorScheme], size, className }))}
      {...rest}
    >
      {children}
    </Component>
  )
}
