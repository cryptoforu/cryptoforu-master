import { ChevronDownIcon } from '@heroicons/react/20/solid'
import type { Node } from '@react-types/shared'
import { cva, VariantProps } from 'class-variance-authority'
import { ReactNode, useRef } from 'react'
import {
  AriaMenuItemProps,
  AriaMenuProps,
  useMenu,
  useMenuItem,
  useMenuTrigger,
} from 'react-aria'
import type { MenuTriggerProps, TreeState } from 'react-stately'
import { useMenuTriggerState, useTreeState } from 'react-stately'

import { Button, Popover } from '@/components/elements'
import { cn } from '@/lib/utils'

interface MenuProps<T extends object>
  extends AriaMenuProps<T>,
    MenuTriggerProps {
  label: string | ReactNode
  withIcon: boolean
}

export function MenuTrigger<T extends object>(
  props: MenuProps<T> & VariantProps<typeof menuItemV2>
) {
  const ref = useRef(null)
  const state = useMenuTriggerState(props)
  const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref)

  return (
    <>
      <Button
        buttonRef={ref}
        {...menuTriggerProps}
        colorScheme={'transparent'}
        id={props.id}
      >
        <span>{props.label}</span>
        {props.withIcon && (
          <ChevronDownIcon id={'arrow'} className={'ml-1 h-5 w-5'} />
        )}
      </Button>

      {state.isOpen && (
        <Popover
          triggerRef={ref}
          state={state}
          scrollRef={ref}
          isNonModal={true}
        >
          <MenuItems {...props} {...menuProps}>
            {props.children}
          </MenuItems>
        </Popover>
      )}
    </>
  )
}

interface MenuItemsProps<T extends object>
  extends AriaMenuProps<T>,
    VariantProps<typeof menuItemV2> {}

export function MenuItems<T extends object>(props: MenuItemsProps<T>) {
  const state = useTreeState(props)
  const menuRef = useRef(null)
  const { menuProps } = useMenu(props, state, menuRef)

  return (
    <ul
      ref={menuRef}
      {...menuProps}
      className={
        'mt-2 min-w-full rounded-md bg-white/90 outline-none backdrop-blur dark:bg-gray-900 dark:backdrop-blur-2xl'
      }
    >
      {[...state.collection].map((item) => (
        <MenuItem
          item={item}
          state={state}
          key={item.key}
          variant={props.variant}
          focused={props.focused}
        />
      ))}
    </ul>
  )
}

const menuItemV2 = cva('', {
  variants: {
    variant: {
      primary:
        'relative m-2 cursor-pointer rounded-md p-2 outline-none transition-all duration-500',
      navLink:
        'cursor-pointer rounded-lg p-2.5 outline outline-offset-2 outline-transparent',
      secondary: '',
    },
    focused: {
      primary:
        'bg-emerald-600 text-gray-950 dark:bg-emerald-400 dark:text-primary-dark',
      navLink:
        'bg-gray-100 text-gray-800 dark:bg-slate-950/50 dark:text-gray-100',
      secondary: 'text-slate-700 dark:text-slate-300',
    },
  },
  defaultVariants: {
    variant: 'primary',
    focused: 'primary',
  },
})

interface MenuItemProps<T>
  extends VariantProps<typeof menuItemV2>,
    AriaMenuItemProps {
  className?: string
  state: TreeState<T>
  item: Node<T>
}

export function MenuItem<T>(props: MenuItemProps<T>) {
  const itemRef = useRef(null)
  const { item, state } = props
  const { menuItemProps, isFocused } = useMenuItem<T>(
    {
      key: item.key,
    },
    state,
    itemRef
  )
  return (
    <li
      {...menuItemProps}
      ref={itemRef}
      className={`${cn(
        menuItemV2({
          variant: props.variant,
          focused: isFocused ? props.focused : 'secondary',
          className: props.className,
        })
      )}`}
    >
      {item.rendered}
    </li>
  )
}
