'use client'
import { Route } from 'next'

import MenuLabel from '@/components/navbar/MenuLabel'
import MenuLink from '@/components/navbar/MenuLink'
import SubMenu from '@/components/navbar/SubMenu'
import useMenuController, {
  useActiveLink,
} from '@/store/controllers/useMenuController'
import { useNavHover } from '@/store/controllers/useNavController'

const MainMenu = () => {
  const menu = useMenuController()
  const activeItem = useActiveLink()
  const { isHovered, hoverProps } = useNavHover()
  if (menu) {
    return menu.map((item, index) =>
      item.childs.length === 0 ? (
        <MenuLink
          key={item.route}
          href={item.route as Route}
          hoverProps={hoverProps}
        >
          <MenuLabel
            selected={isHovered(item.route)}
            isActive={activeItem(index)}
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
              isActive={activeItem(index)}
              title={item.label}
            />
          }
          isOpen={isHovered(item.route)}
        />
      )
    )
  }
}
export default MainMenu
