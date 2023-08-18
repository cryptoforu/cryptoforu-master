'use client'
import { motion } from 'framer-motion'
import Image, { ImageProps, StaticImageData } from 'next/image'
import NextLink from 'next/link'
import React from 'react'

import { Button } from '@/components/elements'
import { IButtonProps } from '@/components/elements/Button'

type Position = 'left' | 'right'

type IconProps = {
  position?: Position
  label: string
}

type IconComponent<As extends React.ElementType> = {
  as?: As
} & IconProps

function IconComponent<As extends React.ElementType>({
  position = 'left',
  label,
  as,
  ...rest
}: IconComponent<As> &
  Omit<React.ComponentPropsWithoutRef<As>, keyof IconComponent<As>>) {
  const Component = as ?? 'svg'
  return (
    <>
      {position === 'left' && (
        <Component className={'-ml-1 h-5 w-5'} {...rest} />
      )}
      {label}
      {position === 'right' && (
        <Component className={'-mr-1 h-5 w-5'} {...rest} />
      )}
    </>
  )
}

interface ImageIcon extends IconProps, ImageProps {}

function ImageIcon(props: ImageIcon) {
  return <IconComponent as={Image} width={240} height={240} {...props} />
}

const MotionLink = motion(NextLink)

interface IconButtonProps extends IButtonProps<any>, IconProps {
  src?: string | StaticImageData
  alt?: string
}

export default function IconButton(props: IconButtonProps) {
  const { position = 'left', as, label, src, alt, ...rest } = props
  const render =
    src !== undefined ? (
      <ImageIcon
        label={label}
        src={src}
        alt={alt as string}
        position={position}
      />
    ) : (
      <IconComponent label={label} position={position} as={as} />
    )

  return (
    <Button className={'gap-1'} {...rest}>
      {render}
    </Button>
  )
}
