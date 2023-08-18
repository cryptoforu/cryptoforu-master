import { Route } from 'next'

import MenuLink from '@/components/navbar/MenuLink'
import SubMenu from '@/components/navbar/SubMenu'
import { getMenu } from '@/requests/getMenu'
import { MenuProvider } from '@/store/useNavStore'

const MainMenu = async () => {
  const menu = await getMenu()
  return (
    <MenuProvider menu={menu}>
      {menu.map((item, index) =>
        item.childs.length === 0 ? (
          <MenuLink
            key={item.route}
            href={item.route as Route}
            title={item.label}
            index={index}
          />
        ) : (
          <SubMenu
            key={item.route}
            href={item.route as Route}
            title={item.label}
            items={item.childs}
            index={index}
          />
        )
      )}
    </MenuProvider>
  )
}
export default MainMenu
