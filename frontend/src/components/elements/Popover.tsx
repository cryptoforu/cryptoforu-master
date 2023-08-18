'use client'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import type { AriaPopoverProps } from 'react-aria'
import { usePopover } from 'react-aria'
import type { OverlayTriggerState } from 'react-stately'

const positionVariant = {
  left: 'absolute left-0 w-fit max-w-fit z-50 overflow-hidden focus:outline-none',
  right:
    'absolute right-0 mt-2 w-56 max-w-fit rounded-md bg-black/60 shadow-lg z-50 overflow-hidden',
  center:
    'absolute left-1/2 z-10 mt-2 flex w-screen max-w-max -translate-x-1/2 bg-black/60',
}

interface IPopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
  children: ReactNode
  popoverVariant?: keyof typeof positionVariant
  state: OverlayTriggerState
}

export default function Popover({
  children,
  popoverVariant = 'left',
  state,
  ...props
}: IPopoverProps) {
  const popoverRef = useRef(null)
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state
  )
  return (
    <div {...underlayProps}>
      <div
        {...popoverProps}
        ref={popoverRef}
        className={clsx(positionVariant[popoverVariant])}
      >
        {children}
      </div>
    </div>
  )
}
