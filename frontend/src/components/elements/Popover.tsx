'use client'
import type { PopoverProps } from 'react-aria-components'
import {
  Dialog,
  OverlayArrow,
  Popover as AriaPopover,
} from 'react-aria-components'
import type { ReactNode } from 'react'

interface IPopoverProps extends Omit<PopoverProps, 'children'> {
  children: ReactNode
}

export default function Popover({ children, ...props }: IPopoverProps) {
  return (
    <AriaPopover
      {...props}
      className={
        'max-w-sm rounded-lg border border-gray-100 bg-white p-8 outline-none dark:border-slate-900 dark:bg-slate-950/80'
      }
    >
      <OverlayArrow>
        <svg className={'display-block'} width={12} height={12}>
          <path d="M0 0,L6 6,L12 0" />
        </svg>
      </OverlayArrow>
      <Dialog>{children}</Dialog>
    </AriaPopover>
  )
}
