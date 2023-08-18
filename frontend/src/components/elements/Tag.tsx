import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const tag = cva('mr-2 rounded px-2.5 py-0.5 text-sm font-medium', {
  variants: {
    variant: {
      slate:
        'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
      emerald:
        'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
      teal: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
    },
  },
  defaultVariants: {
    variant: 'slate',
  },
})

export interface ITagProps
  extends VariantProps<typeof tag>,
    HTMLAttributes<HTMLSpanElement> {}

const Tag = forwardRef<HTMLSpanElement, ITagProps>((props, ref) => {
  const { className, variant, ...rest } = props
  return (
    <span ref={ref} className={cn(tag({ variant, className }))} {...rest} />
  )
})
Tag.displayName = 'Tag'

export default Tag
