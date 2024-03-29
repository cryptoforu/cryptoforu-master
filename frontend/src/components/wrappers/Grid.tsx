import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const grid = cva('mx-auto grid', {
  variants: {
    cols: {
      two: 'max-w-2xl grid-cols-1 gap-x-4 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2',
      three:
        'mx-auto grid max-w-2xl gap-8 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3',
    },
  },
})

export interface IGridProps
  extends VariantProps<typeof grid>,
    HTMLAttributes<HTMLDivElement> {}

const Grid = forwardRef<HTMLDivElement, IGridProps>((props, ref) => {
  const { className, cols, ...rest } = props
  return <div className={cn(grid({ cols, className }))} ref={ref} {...rest} />
})
Grid.displayName = 'Grid'
export default Grid
