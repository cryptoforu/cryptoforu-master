'use client'
import { MenuItem } from '@/types/shared-types'
import { MenuButton, MenuItem as Item } from '@/components/elements/Menu'
import {
  useActiveLink,
  useNavHover,
} from '@/store/controllers/useNavController'
import MenuLabel from '@/components/navbar/MenuLabel'
import { useRouter } from 'next/navigation'
import { Route } from 'next'

const SubMenu = ({
  items,
  href,
  title,
}: {
  items: MenuItem[]
  href: string
  title: string
}) => {
  const { isHovered, hoverProps } = useNavHover()
  const isActive = useActiveLink()
  const router = useRouter()

  return (
    <div {...hoverProps} className={'relative -mx-3 -my-2'} id={href}>
      <MenuButton
        id={href}
        colorScheme={'transparent'}
        size={'md'}
        items={items}
        onAction={(key) => router.push(key as Route)}
        label={
          <MenuLabel
            selected={isHovered(href)}
            title={title}
            isActive={isActive(href)}
          />
        }
      >
        {(item) => (
          <Item
            id={item.route}
            key={item.route}
            variant={'navLink'}
            focused={'navLink'}
          >
            {item.label}
          </Item>
        )}
      </MenuButton>
    </div>
  )
}
export default SubMenu
