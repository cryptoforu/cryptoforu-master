import { XMarkIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import { ReactNode, useRef } from 'react'
import type { AriaDialogProps, DialogAria } from 'react-aria'
import { useDialog } from 'react-aria'

import { Button } from '@/components/elements'
import { Heading } from '@/components/typography'

type DialogHeaderProps = {
  title: string | ReactNode
  onClose: () => void
} & DialogAria['titleProps']

function DialogHeader({ title, onClose, ...props }: DialogHeaderProps) {
  return (
    <div
      className={
        'flex items-center justify-between border-b border-slate-100 px-3 py-4 dark:border-slate-900'
      }
    >
      <Heading as={'h3'} {...props}>
        {title}
      </Heading>
      <Button colorScheme={'danger'} onPress={onClose}>
        <XMarkIcon className={'h-5 w-5'} />
      </Button>
    </div>
  )
}

interface DialogProps extends AriaDialogProps {
  title?: ReactNode
  className?: string
  children: ReactNode
  onClose: () => void
}

const Dialog = ({
  title,
  children,
  className,
  onClose,
  ...props
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const { dialogProps, titleProps } = useDialog(props, dialogRef)

  return (
    <div
      {...dialogProps}
      ref={dialogRef}
      style={{ padding: 30 }}
      className={clsx('outline-none', className)}
    >
      {title && (
        <DialogHeader title={title} onClose={onClose} {...titleProps} />
      )}
      {children}
    </div>
  )
}
export default Dialog
