import { useOverlayTrigger } from 'react-aria'
import { OverlayTriggerProps, OverlayTriggerState } from 'react-stately'
import { cloneElement, ReactElement, ReactNode } from 'react'
import type { ModalProps } from '@/components/overlays/Modal'
import Modal from '@/components/overlays/Modal'
import { Button } from '@/components/elements'
import { AnimatePresence } from 'framer-motion'
import type { BtnVariantsProps } from '@/components/elements/variants/btn-variants'

interface ModalTriggerProps {
  children: (close: OverlayTriggerState['close']) => ReactElement
  label: string | ReactNode
  btnColor?: BtnVariantsProps['colorScheme']
  btnVariant?: BtnVariantsProps['variant']
}

const ModalTrigger = ({
  label,
  children,
  btnColor,
  btnVariant,
  state,
  ...props
}: ModalTriggerProps &
  OverlayTriggerProps &
  Omit<ModalProps, keyof ModalTriggerProps>) => {
  let { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state
  )
  return (
    <>
      <Button {...triggerProps} colorScheme={btnColor} variant={btnVariant}>
        {label}
      </Button>
      <AnimatePresence mode={'wait'}>
        {state.isOpen && (
          <Modal
            state={state}
            variant={props.variant}
            size={props.size}
            isDismissable
          >
            {cloneElement(children(state.close), overlayProps)}
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
export default ModalTrigger
