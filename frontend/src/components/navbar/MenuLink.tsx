'use client'
import { Route } from 'next'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import { Button } from '@/components/elements'
import MenuLabel from '@/components/navbar/MenuLabel'
import {
  useActiveLink,
  useNavHover,
} from '@/store/controllers/useNavController'

export type MenuLinkProps = {
  href: Route | string
  title: string | ReactNode
  index: number
}
const MenuLink = ({ href, title, index }: MenuLinkProps) => {
  const { isHovered, hoverProps } = useNavHover()
  const isActive = useActiveLink()
  const router = useRouter()
  return (
    <div {...hoverProps} className={'relative -my-2'} id={href}>
      <Button
        colorScheme={'transparent'}
        hoverAnimation={'none'}
        size={'md'}
        onPress={() => router.push(href as Route)}
        className={'relative z-10'}
      >
        <MenuLabel
          selected={isHovered(href)}
          title={title}
          isActive={isActive(index)}
        />
      </Button>
    </div>
  )
}
export default MenuLink
