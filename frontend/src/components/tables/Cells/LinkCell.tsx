import { Route } from 'next'

import { ExternalLink, InternalLink } from '@/components/elements'

type LinkCellProps = {
  href?: string
  to?: string
  label: string
}

const LinkCell = (props: LinkCellProps) => {
  const { href, to, label } = props

  if (href) {
    return (
      <ExternalLink href={href} classes={'text-lg'} hover={'emerald'}>
        {label}
      </ExternalLink>
    )
  }
  return (
    <InternalLink href={to as Route} className={'text-lg'} hover={'emerald'}>
      {label}
    </InternalLink>
  )
}
export default LinkCell
