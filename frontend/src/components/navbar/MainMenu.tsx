import MenuLink from '@/components/navbar/MenuLink'
import SubMenu from '@/components/navbar/SubMenu'
import { MainMenu } from '@/types/shared-types'
import { Route } from 'next'

const MainMenu = ({ menu }: { menu: MainMenu[] }) => {
  return (
    <div className={'hidden lg:flex lg:gap-10'}>
      {menu.map((item) =>
        item.childs.length === 0 ? (
          <MenuLink
            key={item.route}
            href={item.route as Route}
            title={item.label}
          />
        ) : (
          <SubMenu
            key={item.route}
            href={item.route as Route}
            title={item.label}
            items={item.childs}
          />
        )
      )}
    </div>
  )
}
export default MainMenu
