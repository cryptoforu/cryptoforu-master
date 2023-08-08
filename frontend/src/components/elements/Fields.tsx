'use client'
import clsx from 'clsx'
import type { AriaTextFieldProps, LabelAriaProps } from 'react-aria'
import { useTextField } from 'react-aria'
import { PropsWithChildren, useRef } from 'react'
import { Label } from 'react-aria-components'
import { motion } from 'framer-motion'

const inputVariants = {
  base: 'block w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-teal-400 dark:focus:border-teal-400 focus:outline-none focus:ring-teal-400 dark:focus:ring-teal-400 sm:text-sm',
  primary:
    'block w-full appearance-none rounded-lg border border-gray-200 dark:border-gray-900 bg-white py-[calc(theme(spacing.3)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm dark:bg-primary-dark dark:focus-border-teal-300 dark:focus-ring-teal-400 dark:placeholder-text-slate-500 dark:text-gray-200',
}

export function FieldsLabel({
  children,
  ...props
}: PropsWithChildren<LabelAriaProps>) {
  return (
    <Label
      {...props}
      className={
        'mb-3 block text-base font-medium text-slate-700 dark:text-slate-400'
      }
    >
      {children}
    </Label>
  )
}

interface TextFieldProps extends AriaTextFieldProps {
  className?: string
  variant?: keyof typeof inputVariants
  inputClass?: string
}

export function TextField(props: TextFieldProps) {
  let { label, variant = 'base', inputClass } = props
  let ref = useRef(null)
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref)
  return (
    <div className={props.className}>
      {props.label && <FieldsLabel {...labelProps}>{label}</FieldsLabel>}
      <motion.input
        placeholder={props.placeholder}
        whileFocus={{ outline: 'solid 1.5px teal' }}
        className={clsx(inputVariants[variant], inputClass)}
        ref={ref}
      />
      {props.description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} style={{ color: 'red', fontSize: 12 }}>
          {props.errorMessage}
        </div>
      )}
    </div>
  )
}
