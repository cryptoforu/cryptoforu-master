import { DOMAttributes } from '@react-types/shared'
import { Route } from 'next'
import { ReactNode } from 'react'
import { Item } from 'react-stately'

import { BtnLink } from '@/components/elements'
import { MenuTrigger } from '@/components/elements/MenuV2'
import { MenuItem } from '@/types/shared-types'

const SubMenu = ({
  items,
  href,
  label,
  isOpen,
  hoverProps,
}: {
  items: MenuItem[]
  href: string
  label: ReactNode
  isOpen: boolean
  hoverProps: DOMAttributes
}) => {
  return (
    <div {...hoverProps} id={href} className={'relative -my-2 inline-block'}>
      <MenuTrigger
        shouldFocusWrap={true}
        label={label}
        isOpen={isOpen}
        withIcon={true}
        items={items}
        variant={'navLink'}
        focused={'navLink'}
      >
        {(item) => (
          <Item key={item.route} textValue={item.label}>
            <BtnLink
              colorScheme={'transparent'}
              hoverAnimation={'none'}
              size={'md'}
              href={item.route as Route}
              className={'relative z-10 whitespace-nowrap text-left'}
            >
              {item.label}
            </BtnLink>
          </Item>
        )}
      </MenuTrigger>
    </div>
  )
}
export default SubMenu
