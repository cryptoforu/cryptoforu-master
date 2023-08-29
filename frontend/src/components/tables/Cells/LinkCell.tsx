import { Route } from 'next'

import {
  BtnExternalLink,
  BtnLink,
  ExternalLink,
  InternalLink,
} from '@/components/elements'

type LinkCellProps = {
  href?: string
  to?: string
  label: string
  as?: 'link' | 'btn'
}

const LinkCell = (props: LinkCellProps) => {
  const { href, to, label, as = 'link' } = props

  if (href) {
    return as === 'link' ? (
      <ExternalLink href={href} classes={'text-lg'} hover={'emerald'}>
        {label}
      </ExternalLink>
    ) : (
      <div className={'p-2'}>
        <BtnExternalLink
          href={href}
          className={'z-10 overflow-hidden rounded-full'}
          size={'sm'}
        >
          {label}
        </BtnExternalLink>
      </div>
    )
  }
  return as === 'link' ? (
    <InternalLink href={to as Route} className={'text-lg'} hover={'emerald'}>
      {label}
    </InternalLink>
  ) : (
    <div className={'p-2'}>
      <BtnLink
        href={to as Route}
        className={'z-10 overflow-hidden rounded-full'}
        size={'sm'}
      >
        {label}
      </BtnLink>
    </div>
  )
}
export default LinkCell
