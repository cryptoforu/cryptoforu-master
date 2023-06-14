'use client'

import { PropsWithChildren } from 'react'
import { clsx } from 'clsx'
import Image from 'next/image'
import { Link } from 'react-aria-components'

type CardProps = {
  className?: string
}
const Card = ({ className, children }: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={clsx(
        'group relative rounded-xl border border-slate-200  dark:border-slate-800',
        className
      )}
    >
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 transition-all duration-500 ease-linear [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.emerald.50)),var(--quick-links-hover-bg,theme(colors.emerald.50)))_padding-box,linear-gradient(to_top,theme(colors.green.400),theme(colors.teal.400),theme(colors.emerald.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.950)]" />
      <div className={'relative overflow-hidden rounded-xl'}>{children}</div>
    </div>
  )
}
export default Card

export const ListCard = ({ children }: PropsWithChildren) => {
  return (
    <Card className={'flex-auto'}>
      <div className={'divide-y divide-slate-100 dark:divide-slate-800'}>
        {children}
      </div>
    </Card>
  )
}

type ListCardRowProps = {
  icon: string
  title: string
  link?: string
  date?: string
  price?: string
  change?: string
  linkLabel?: string
}

export function ListCardRow({
  icon,
  title,
  link,
  date,
  price,
  change,
  linkLabel,
}: ListCardRowProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <div className={'flex-none rounded-full'}>
        <Image
          src={icon}
          alt={title}
          className="h-10 w-10 rounded-full"
          width={40}
          height={40}
        />
      </div>
      <div className="line-clamp-2 flex-auto whitespace-normal break-normal text-sm text-slate-900 dark:text-slate-100">
        {title}
      </div>
      <div className="flex-none text-right">
        <Link>
          <a
            href={link}
            target="_blank"
            className="text-sm font-medium text-slate-900 dark:text-slate-100"
          >
            {linkLabel ? linkLabel : 'Read More'}
          </a>
        </Link>
        {date ? (
          <div className={'text-xs leading-5 text-emerald-400'}>{date}</div>
        ) : (
          <div
            className={clsx('text-xs leading-5', {
              'text-danger': change && change.startsWith('-'),
              'text-success': change && change,
            })}
          >
            {price}
          </div>
        )}
      </div>
    </div>
  )
}
