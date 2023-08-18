import { clsx } from 'clsx'
import React from 'react'

type ListProps<Item, As extends React.ElementType> = {
  items: Item[]
  renderItem: (item: Item) => React.ReactNode
  as?: As
}

export default function List<Item, As extends React.ElementType>({
  items,
  renderItem,
  as,
  ...rest
}: ListProps<Item, As> &
  Omit<React.ComponentPropsWithoutRef<As>, keyof ListProps<Item, As>>) {
  const Component = as ?? 'ul'
  return <Component {...rest}>{items.map(renderItem)}</Component>
}

type ListItemProps<As extends React.ElementType> = {
  as?: As
  activeClasses?: string
}

export function ListItem<As extends React.ElementType>({
  as,
  activeClasses,
  ...rest
}: ListItemProps<As> &
  Omit<React.ComponentPropsWithoutRef<As>, keyof ListItemProps<As>>) {
  const Component = as ?? 'a'
  return (
    <Component
      className={clsx(
        'block w-full pl-3.5 text-start before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full hover:transition hover:delay-150 hover:duration-300 focus:outline-none',
        activeClasses
      )}
      {...rest}
    />
  )
}
