'use client'
import { cva, VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import { HTMLMotionProps, motion } from 'framer-motion'
import { btnOutline } from '@/motion/variants'

const btnVariants = cva('inline-flex justify-center rounded-lg', {
  variants: {
    solid: {
      primary:
        'text-primary-dark bg-primary-gradient active:bg-emerald-500 focus:ring-emerald-300/50',
      secondary: 'text-slate-300 bg-slate-900/90',
      transparent: 'text-slate-900 dark:text-white',
    },
    outline: {
      primary:
        'text-primary-dark hover:text-white border border-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:border-emerald-600 dark:text-slate-400 dark:hover:text-primary-white dark:focus:ring-emerald-800',
      secondary:
        'text-slate-900 hover:text-white border border-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:border-slate-600 dark:text-slate-400 dark:hover:text-primary-white dark:focus:ring-slate-800',
      transparent: 'text-primary dark:text-white',
    },
    size: {
      lg: 'px-3.5 py-2.5 text-sm font-semibold',
      md: 'p-2.5 font-semibold text-sm',
      sm: 'py-1.5 px-3 text-sm font-semibold',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface IButtonProps
  extends VariantProps<typeof btnVariants>,
    HTMLMotionProps<'button'> {}

const SolidButton = (props: PropsWithChildren<IButtonProps>) => {
  const { className, solid, size, ...rest } = props
  return (
    <motion.button
      initial={false}
      whileHover={'hover'}
      whileTap={'tap'}
      custom={solid === 'primary' ? '#059669' : '#0f172a'}
      variants={btnOutline}
      className={cn(btnVariants({ solid, size, className }))}
      {...rest}
    >
      {props.children}
    </motion.button>
  )
}

const OutlineButton = (props: PropsWithChildren<IButtonProps>) => {
  const { className, outline, size, ...rest } = props
  return (
    <motion.button
      initial={'initial'}
      whileHover={'hover'}
      whileTap={'tap'}
      variants={btnOutline}
      custom={outline === 'primary' ? '#059669' : '#0f172a'}
      className={cn(btnVariants({ outline, size, className }))}
      {...rest}
    >
      {props.children}
    </motion.button>
  )
}

export { SolidButton, OutlineButton, btnVariants }
