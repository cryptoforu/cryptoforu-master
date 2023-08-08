'use client'

import { Button } from '@/components/elements'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { IButtonProps } from '@/components/elements/Button'
import type { Route } from 'next'
import { ReactNode } from 'react'

const MotionLink = motion(NextLink)

export interface BtnLinkProps extends IButtonProps<typeof MotionLink> {
  href: Route
  children: ReactNode
}

export default function BtnLink(props: BtnLinkProps) {
  return (
    <Button as={MotionLink} {...props}>
      {props.children}
    </Button>
  )
}

export interface ExternalBtnLinkProps extends IButtonProps<'a'> {
  href: string
  children: ReactNode
}

export function BtnExternalLink(props: ExternalBtnLinkProps) {
  return (
    <Button as={motion.a} target={'_blank'} {...props}>
      {props.children}
    </Button>
  )
}
