import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const prose = cva(
  'prose prose-slate dark:prose-invert dark:text-slate-400 dark:prose-hr:border-slate-800',
  {
    variants: {
      img: {
        base: 'prose-img:rounded-lg prose-img:shadow-lg dark:prose-img:shadow-slate-950',
      },
      link: {
        emerald:
          'prose-a:text-emerald-600 prose-a:transition prose-a:duration-500 prose-a:hover:text-emerald-900 prose-a:hover:underline prose-a:hover:decoration-emerald-600/30 prose-a:dark:text-emerald-300 prose-a:dark:hover:text-emerald-100 prose-a:dark:hover:decoration-emerald-400/50',
        slate:
          'prose-a:text-slate-700 prose-a:transition prose-a:duration-500 prose-a:hover:text-slate-900 prose-a:hover:underline prose-a:hover:decoration-slate-800/60 prose-a:dark:text-slate-300 prose-a:dark:hover:text-slate-100',
      },
      headings: {
        base: 'prose-headings:scroll-mt-28 prose-headings:font-serif  lg:prose-headings:scroll-mt-[8.5rem]',
      },
    },
    defaultVariants: {
      img: 'base',
      link: 'emerald',
      headings: 'base',
    },
  }
)

export interface IProseProps
  extends VariantProps<typeof prose>,
    HTMLAttributes<HTMLElement> {}

const Prose = forwardRef<HTMLDivElement, IProseProps>(function Prose(
  props,
  ref
) {
  const { className, img, link, children, ...rest } = props
  const proseClass = cn(prose({ img, link, className }))
  return (
    <article ref={ref} className={proseClass} {...rest}>
      {children}
    </article>
  )
})
export default Prose
