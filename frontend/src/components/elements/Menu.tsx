'use client'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { cva, VariantProps } from 'class-variance-authority'
import { ReactNode } from 'react'
import { useId } from 'react-aria'
import type {
  ItemProps,
  MenuProps,
  MenuTriggerProps,
} from 'react-aria-components'
import { Item, Menu, MenuTrigger, Popover } from 'react-aria-components'

import { Button } from '@/components/elements/index'
import type { BtnVariantsProps } from '@/components/elements/variants/btn-variants'
import { cn } from '@/lib/utils'

interface ButtonTriggerProps extends BtnVariantsProps {
  label?: string | ReactNode
  withIcon?: boolean
  disabled?: boolean
}

interface MyMenuButtonProps<T>
  extends MenuProps<T>,
    ButtonTriggerProps,
    Omit<MenuTriggerProps, 'children'> {}

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
  const btnId = useId(rest.id)

  return (
    <MenuTrigger {...rest}>
      <Button
        id={btnId}
        isDisabled={disabled}
        colorScheme={colorScheme}
        variant={variant}
        hoverAnimation={hoverAnimation}
      >
        <span>{label}</span>
        {withIcon && <ChevronDownIcon className={'ml-1 h-5 w-5'} />}
      </Button>
      <Popover shouldUpdatePosition={true}>
        <Menu
          className={
            'max-h-fit w-fit overflow-y-auto rounded-md bg-white shadow-lg backdrop-blur-lg focus:outline-none dark:divide-slate-900 dark:bg-gray-950/60'
          }
          {...props}
        >
          {children}
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}

const menuItem = cva('', {
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

interface MenuItemProps extends VariantProps<typeof menuItem>, ItemProps {
  className?: string
}

export function MenuItem(props: MenuItemProps) {
  const { className, variant, focused, ...rest } = props

  return (
    <Item
      {...rest}
      className={({ isFocused }) =>
        `${cn(
          menuItem({
            variant,
            focused: isFocused ? focused : 'secondary',
            className,
          })
        )}`
      }
    />
  )
}
