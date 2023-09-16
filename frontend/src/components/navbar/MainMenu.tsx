'use client'
import { menu as menuData } from 'contentlayer/generated'
import { Route } from 'next'

import MenuLabel from '@/components/navbar/MenuLabel'
import MenuLink from '@/components/navbar/MenuLink'
import SubMenu from '@/components/navbar/SubMenu'
import useActive from '@/hooks/useActive'
import { useNavHover } from '@/store/controllers/useNavController'

const MainMenu = () => {
  const getActive = useActive()
  const { isHovered, hoverProps } = useNavHover()
  return menuData.menu.map((item) =>
    item.childs.length === 0 ? (
      <MenuLink
        key={item.route}
        href={item.route as Route}
        hoverProps={hoverProps}
      >
        <MenuLabel
          selected={isHovered(item.route)}
          title={item.label}
          isActive={getActive(item.route)}
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
            title={item.label}
            isActive={getActive(item.route)}
          />
        }
        isOpen={isHovered(item.route)}
      />
    )
  )
}
export default MainMenu
