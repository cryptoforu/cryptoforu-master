'use client'
import { Route } from 'next'

import MenuLabel from '@/components/navbar/MenuLabel'
import MenuLink from '@/components/navbar/MenuLink'
import SubMenu from '@/components/navbar/SubMenu'
import {
  useActiveLink,
  useNavHover,
} from '@/store/controllers/useNavController'
import { useMenuContext } from '@/store/useNavStore'

const MainMenu = () => {
  const menu = useMenuContext((state) => state.menu)
  const isActive = useActiveLink()
  const { isHovered, hoverProps } = useNavHover()
  return menu.map((item, index) =>
    item.childs.length === 0 ? (
      <MenuLink
        key={item.route}
        href={item.route as Route}
        hoverProps={hoverProps}
      >
        <MenuLabel
          selected={isHovered(item.route)}
          isActive={isActive(index)}
          title={item.label}
        />
      </MenuLink>
    ) : (
      <SubMenu
        key={item.route}
        href={item.route as Route}
        hoverProps={hoverProps}
        items={item.childs}
        label={
          <MenuLabel
            selected={isHovered(item.route)}
            isActive={isActive(index)}
            title={item.label}
          />
        }
        isOpen={isHovered(item.route)}
      />
    )
  )
}
export default MainMenu
