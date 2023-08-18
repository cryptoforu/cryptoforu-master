import { cva, VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import type { AriaModalOverlayProps } from 'react-aria'
import { Overlay, useModalOverlay } from 'react-aria'
import type { OverlayTriggerState } from 'react-stately'

import { cn } from '@/lib/utils'
import { modalVariants, underlayVariants } from '@/motion/variants'

const modal = cva('z-1 relative top-[10%] w-full focus:outline-none', {
  variants: {
    variant: {
      primary:
        'rounded-lg border border-gray-300 bg-white/90 shadow-2xl dark:border-gray-900 dark:bg-gray-950/90',
      transparent: 'shadow-2xl shadow-slate-600/50',
    },
    size: {
      sm: 'h-fit max-h-[50vh] max-w-sm',
      md: 'h-fit max-h-[70vh] max-w-md',
      lg: 'h-fit max-h-[80vh] max-w-2xl',
      xl: 'h-fit max-h-[80vh] max-w-5xl',
      xxl: 'max-w-screen h-fit max-h-screen',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export interface ModalProps
  extends AriaModalOverlayProps,
    VariantProps<typeof modal> {
  className?: string
  children: ReactNode
  state: OverlayTriggerState
}

const Modal = ({
  state,
  className,
  children,
  variant = 'primary',
  size = 'md',
  ...props
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { modalProps, underlayProps } = useModalOverlay(props, state, modalRef)

  return (
    <Overlay>
      <motion.div
        initial={'hidden'}
        animate={'show'}
        exit={'exit'}
        variants={underlayVariants}
        className={
          'fixed inset-0 z-[100] flex justify-center bg-white/10 backdrop-blur-lg dark:bg-slate-950/30'
        }
      >
        <div {...underlayProps} className={'fixed inset-0 overflow-y-auto'}>
          <motion.div
            variants={modalVariants}
            className={
              'flex min-h-full items-center justify-center p-4 text-center'
            }
          >
            <div
              {...modalProps}
              ref={modalRef}
              className={cn(modal({ variant, size, className }))}
            >
              {children}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Overlay>
  )
}
export default Modal
