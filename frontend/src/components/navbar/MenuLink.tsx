'use client'
import { Button } from '@/components/elements'
import { useRouter } from 'next/navigation'
import { Route } from 'next'
import { ReactNode } from 'react'
import MenuLabel from '@/components/navbar/MenuLabel'
import {
  useActiveLink,
  useNavHover,
} from '@/store/controllers/useNavController'

export type MenuLinkProps = {
  href: Route | string
  title: string | ReactNode
}
const MenuLink = ({ href, title }: MenuLinkProps) => {
  const { isHovered, hoverProps } = useNavHover()
  const isActive = useActiveLink()
  const router = useRouter()
  return (
    <div {...hoverProps} className={'relative -mx-3 -my-2'} id={href}>
      <Button
        colorScheme={'transparent'}
        size={'md'}
        onPress={() => router.push(href as Route)}
      >
        <MenuLabel
          selected={isHovered(href)}
          title={title}
          isActive={isActive(href)}
        />
      </Button>
    </div>
  )
}
export default MenuLink
