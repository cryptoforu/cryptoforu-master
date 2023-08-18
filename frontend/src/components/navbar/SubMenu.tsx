'use client'
import { useRouter } from 'next/navigation'
import { Item } from 'react-stately'

import { Button } from '@/components/elements'
import { MenuTrigger } from '@/components/elements/MenuV2'
import MenuLabel from '@/components/navbar/MenuLabel'
import useMenuAnimation from '@/motion/useMenuAnimation'
import {
  useActiveLink,
  useNavHover,
} from '@/store/controllers/useNavController'
import { MenuItem } from '@/types/shared-types'

const SubMenu = ({
  items,
  href,
  title,
  index,
}: {
  items: MenuItem[]
  href: string
  title: string
  index: number
}) => {
  const { isHovered, hoverProps } = useNavHover()
  const isActive = useActiveLink()
  const scope = useMenuAnimation(isHovered(href))
  const router = useRouter()
  return (
    <div
      {...hoverProps}
      id={href}
      ref={scope}
      className={'relative -my-2 inline-block'}
    >
      <MenuTrigger
        shouldFocusWrap={true}
        label={
          <MenuLabel
            selected={isHovered(href)}
            title={title}
            isActive={isActive(index)}
          />
        }
        isOpen={isHovered(href)}
        withIcon={true}
        items={items}
        variant={'navLink'}
        focused={'navLink'}
      >
        {(item) => (
          <Item key={item.route} textValue={item.label}>
            <Button
              colorScheme={'transparent'}
              hoverAnimation={'none'}
              size={'md'}
              onPress={() => router.push(item.route)}
              className={'relative z-10 whitespace-nowrap text-left'}
            >
              {item.label}
            </Button>
          </Item>
        )}
      </MenuTrigger>
    </div>
  )
}
export default SubMenu
