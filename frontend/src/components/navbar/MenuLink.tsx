import { DOMAttributes } from '@react-types/shared'
import { Route } from 'next'
import { ReactNode } from 'react'

import { BtnLink } from '@/components/elements'

export type MenuLinkProps = {
  href: Route | string
  children: ReactNode
  hoverProps: DOMAttributes
}
const MenuLink = ({ href, children, hoverProps }: MenuLinkProps) => {
  return (
    <div {...hoverProps} className={'relative -my-2'} id={href}>
      <BtnLink
        colorScheme={'transparent'}
        hoverAnimation={'none'}
        size={'md'}
        href={href as Route}
        className={'relative z-10'}
      >
        {children}
      </BtnLink>
    </div>
  )
}
export default MenuLink
