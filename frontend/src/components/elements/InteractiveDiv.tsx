'use client'
import { AriaRole, ReactNode } from 'react'
import type { PressHookProps } from 'react-aria'
import { usePress } from 'react-aria'

interface InteractiveDivProps extends PressHookProps {
  className?: string
  children: ReactNode
  role?: AriaRole
  tabIndex?: number
}

export default function InteractiveDiv(props: InteractiveDivProps) {
  const { pressProps } = usePress(props)
  const { className, children, role = 'button', tabIndex = 0 } = props
  return (
    <div {...pressProps} className={className} role={role} tabIndex={tabIndex}>
      {children}
    </div>
  )
}
