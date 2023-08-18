'use client'

import { motion } from 'framer-motion'
import type { Route } from 'next'
import NextLink from 'next/link'
import { ReactNode } from 'react'

import { Button } from '@/components/elements'
import { IButtonProps } from '@/components/elements/Button'

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
