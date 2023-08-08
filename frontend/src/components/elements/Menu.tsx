'use client'

import type {
  ItemProps,
  MenuProps,
  MenuTriggerProps,
} from 'react-aria-components'
import { Item, Menu, MenuTrigger, Popover } from 'react-aria-components'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import type { BtnVariantsProps } from '@/components/elements/variants/btn-variants'
import { Button } from '@/components/elements/index'

interface MyMenuButtonProps<T>
  extends MenuProps<T>,
    BtnVariantsProps,
    Omit<MenuTriggerProps, 'children'> {
  label?: string
  withIcon?: boolean
  disabled?: boolean
}

export function MenuButton<T extends object>({
  label,
  withIcon = true,
  disabled,
  children,
  ...props
}: MyMenuButtonProps<T>) {
  const {
    colorScheme = 'primary',
    variant = 'solid',
    hoverAnimation,
    ...rest
  } = props
  return (
    <MenuTrigger {...rest}>
      <Button
        isDisabled={disabled}
        colorScheme={colorScheme}
        variant={variant}
        hoverAnimation={hoverAnimation}
      >
        <span>{label}</span>
        {withIcon && <ChevronDownIcon className={'ml-1 h-5 w-5'} />}
      </Button>
      <Popover>
        <Menu
          className={
            'max-h-fit w-fit origin-top-left overflow-y-auto rounded-md bg-white shadow-lg backdrop-blur-lg focus:outline-none dark:divide-slate-900 dark:bg-gray-950/60'
          }
          {...props}
        >
          {children}
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}

export function MenuItem(props: ItemProps) {
  return (
    <Item
      {...props}
      className={({ isFocused, isSelected }) =>
        `relative m-2 cursor-pointer rounded-md p-2  outline-none transition-all duration-500  ${
          isFocused
            ? 'bg-emerald-600 text-gray-950 dark:bg-emerald-400 dark:text-primary-dark'
            : 'text-slate-700 dark:text-slate-300'
        }`
      }
    />
  )
}
